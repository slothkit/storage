import { init, set, get, getExp, remove, flush, clear } from '../localStorage'
import { ConfigManager } from '../config'
import { Encryptor } from '../encryptor'
import type { GlobalConfig } from '../type'

describe('Storage Module', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('init', () => {
    it('should init correctly', () => {
      init()

      expect(ConfigManager.getInstance().config).toEqual({})
    })

    it('should initialize ConfigManager and Encryptor instances', () => {
      const mockEncrypt = jest.fn()
      const mockDecrypt = jest.fn()
      const config: GlobalConfig = { encryptor: { encrypt: mockEncrypt, decrypt: mockDecrypt } }

      init(config)

      expect(ConfigManager.getInstance().config).toEqual(config)
      const encryptorInstance = Encryptor.getInstance()
      const someData = 'data'
      encryptorInstance.encrypt(someData)
      expect(mockEncrypt).toHaveBeenCalledWith(someData)
      encryptorInstance.decrypt(someData)
      expect(mockDecrypt).toHaveBeenCalledWith(someData)
    })
  })

  describe('set and get', () => {
    it('should set and get an item without encryption or compression', () => {
      const key = 'testKey'
      const value = 'testValue'

      set(key, value)
      const result = get<string>(key)

      expect(result).toBe(value)
      expect(getExp(key)).toBe(undefined)
    })

    it('should set and get an item with encryption and compression', () => {
      const key = 'testKey'
      const value = 'testValue'
      const mockEncrypt = jest.fn((str) => `encrypted(${str})`)
      const mockDecrypt = jest.fn((str) => str.replace('encrypted(', '').replace(')', ''))

      Encryptor.setInstance(mockEncrypt, mockDecrypt)

      set(key, value, { encrypt: true, compress: true })
      const result = get<string>(key)

      expect(mockEncrypt).toHaveBeenCalled()
      expect(mockDecrypt).toHaveBeenCalled()
      expect(result).toBe(value)
    })

    it('should handle item expiration (use ttl)', () => {
      const key = 'testKey'
      const value = 'testValue'
      const ttl = 60

      set(key, value, { ttl })

      const resultBeforeExpiry = get<string>(key)
      expect(resultBeforeExpiry).toBe(value)

      // Simulate expiration
      const originalDateNow = Date.now
      jest.spyOn(Date, 'now').mockImplementation(() => originalDateNow() + 60000 + 1)
      const resultAfterExpiry = get<string>(key)
      expect(resultAfterExpiry).toBeNull()
    })

    it('should handle item expiration (use expires)', () => {
      const key = 'testKey'
      const value = 'testValue'
      const expires = Date.now() + 1000

      expect(getExp(key)).toBeNull()

      set(key, value, { expires })

      expect(getExp(key)).toBe(expires)

      const resultBeforeExpiry = get<string>(key)
      expect(resultBeforeExpiry).toBe(value)

      // Simulate expiration
      const originalDateNow = Date.now
      jest.spyOn(Date, 'now').mockImplementation(() => originalDateNow() + expires + 1)
      const resultAfterExpiry = get<string>(key)
      expect(resultAfterExpiry).toBeNull()
    })

    it('should handle error correctly', () => {
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify').mockImplementation(() => {
        throw new Error('Failed to stringify')
      })
      set('testKey', 'testValue', { encrypt: true })

      expect(jsonStringifySpy).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalledWith('Failed to set item: ', expect.any(Error))

      const jsonParseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => {
        throw new Error('Failed to parse')
      })
      localStorage.setItem('testKey', 'e:testValue')
      get('testKey')

      expect(jsonParseSpy).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalledWith('Failed to get item: ', expect.any(Error))
    })
  })

  describe('remove', () => {
    it('should remove an item from localStorage', () => {
      const key = 'testKey'
      const value = 'testValue'

      set(key, value)
      remove(key)
      const result = get<string>(key)

      expect(result).toBeNull()
    })
  })

  describe('flush', () => {
    it('should flush expired items from localStorage', () => {
      const key = 'testKey'
      const value = 'testValue'
      const expiredKey = 'expiredKey'
      const expiredValue = 'expiredValue'

      set(key, value)
      set(expiredKey, expiredValue, { ttl: -1000 })

      flush()

      const result = get<string>(key)
      const expiredResult = get<string>(expiredKey)

      expect(result).toBe(value)
      expect(expiredResult).toBeNull()
    })

    it('should flush all items with expiration when force is true', () => {
      const key1 = 'testKey1'
      const value1 = 'testValue1'
      const key2 = 'testKey2'
      const value2 = 'testValue2'

      set(key1, value1, { ttl: 10000 })
      set(key2, value2, { expires: Date.now() + 200000 })
      
      flush(true)

      expect(get<string>(key1)).toBeNull()
      expect(get<string>(key2)).toBeNull()
    })

    it('should handle error correctly', () => {
      const jsonParseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => {
        throw new Error('Failed to parse')
      })
      set('testKey', 'testValue', { ttl: 1000 })

      flush(true)

      expect(jsonParseSpy).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalledWith('Failed to flush item: ', expect.any(Error))
    })
  })

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      const key = 'testKey'
      const value = 'testValue'

      set(key, value)
      clear()
      const result = get<string>(key)

      expect(result).toBeNull()
      expect(localStorage.length).toBe(0)
    })
  })
})
