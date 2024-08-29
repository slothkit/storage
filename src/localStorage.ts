import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { ConfigManager } from './config'
import { Encryptor } from './encryptor'
import type { GlobalConfig, StorageConfig, StorageItem } from './type'

export const init = (config: GlobalConfig = {}) => {
  ConfigManager.setInstance(config)
  if (config.encryptor) {
    Encryptor.setInstance(config.encryptor.encrypt, config.encryptor.decrypt)
  }
}

export const set = <T = any>(key: string, value: T, config: StorageConfig = {}) => {
  const globalConfig = ConfigManager.getInstance().config
  const item: StorageItem = { v: value }
  // The final stored value
  let v = ''
  // The prefix of the key
  // if value has expiration time, the prefix will contain 'exp:'
  // if value has been encrypted, the prefix will contain 'e:'
  // if value has been compressed, the prefix will contain 'c:'
  // if value has been encrypted and compressed, the prefix will contain 'e:c:'
  let prefix = ''

  if (config.ttl) {
    item.exp = Date.now() + config.ttl * 1000
    prefix += 'exp:'
  } else if (config.expires) {
    item.exp = config.expires
    prefix += 'exp:'
  }

  let { encrypt } = config
  if (encrypt === undefined) {
    encrypt = globalConfig.encrypt
  }
  let { compress } = config
  if (compress === undefined) {
    compress = globalConfig.compress
  }

  try {
    if (encrypt) {
      const encryptor = Encryptor.getInstance()
      v = encryptor.encrypt(JSON.stringify(item))
      prefix += 'e:'
    } else {
      v = JSON.stringify(item)
    }
    if (compress) {
      v = compressToUTF16(v)
      prefix += 'c:'
    }
    localStorage.setItem(key, prefix + v)
  } catch (err) {
    console.error('Failed to set item: ', err)
  }
}

export const get = <T = any>(key: string): T | null => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  let item = getStorageItem(key)
  if (item === null) return null
  if (item.exp && Date.now() > item.exp) {
    localStorage.removeItem(key)
    return null
  }
  return item.v as T
}

export function getExp(key: string): number | void | null {
  const item = getStorageItem(key)
  if (item === null) return null
  return item.exp
}

export function remove(key: string) {
  localStorage.removeItem(key)
}

/**
 * Flush all the expired items.
 * Only items with expiration time will be flushed.
 * @param force If force is true, all items with expiration time will be flushed, no matter whether they are expired or not
 */
export function flush(force: boolean = false) {
  let toRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      const value = localStorage.getItem(key)
      if (value) {
        let prefix = getPrefix(value)
        if (prefix.includes('exp:')) {
          try {
            const item = JSON.parse(removePrefix(value)) as StorageItem
            if (force || (item.exp && Date.now() > item.exp)) {
              toRemove.push(key)
            }
          } catch (err) {
            console.error('Failed to flush item: ', err)
          }
        }
      }
    }
  }
  toRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}

export function clear() {
  localStorage.clear()
}

function removePrefix(value: string) {
  return value.replace(/^(e:|c:|exp:)+/, '')
}

function getPrefix(value: string) {
  return value.replace(removePrefix(value), '')
}

function getStorageItem(key: string) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  let oriItemStr = removePrefix(itemStr)
  const prefix = getPrefix(itemStr)

  let item: StorageItem

  try {
    if (prefix.includes('c:')) {
      oriItemStr = decompressFromUTF16(oriItemStr)
    }
    if (prefix.includes('e:')) {
      const encryptor = Encryptor.getInstance()
      const decryptedItemStr = encryptor.decrypt(oriItemStr)
      item = JSON.parse(decryptedItemStr)
    } else {
      item = JSON.parse(oriItemStr)
    }
    return item
  } catch (err) {
    console.error('Failed to get item: ', err)
    return null
  }
}
