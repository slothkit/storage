import { vigenereDecrypt, vigenereEncrypt } from './lib/vigenere'
import { base64UrlDecode, base64UrlEncode } from './lib/base64url'

type EncryptFn = (...args: any[]) => string
type DecryptFn = (encryptedValue: string) => any

function defaultEncryptFn(input: string): string {
  return base64UrlEncode(vigenereEncrypt(input))
}

function defaultDecryptFn(encryptedValue: string): string {
  return vigenereDecrypt(base64UrlDecode(encryptedValue))
}

export class Encryptor {
  private static instance: Encryptor | null = null
  private encryptFn: EncryptFn
  private decryptFn: DecryptFn

  constructor(encryptFn: EncryptFn, decryptFn: DecryptFn) {
    this.encryptFn = encryptFn
    this.decryptFn = decryptFn
  }

  static getInstance(): Encryptor {
    if (!Encryptor.instance) {
      Encryptor.instance = new Encryptor(defaultEncryptFn, defaultDecryptFn)
    }
    return Encryptor.instance
  }

  static setInstance(encryptFn: EncryptFn, decryptFn: DecryptFn): void {
    Encryptor.instance = new Encryptor(encryptFn, decryptFn)
  }

  encrypt(...args: any[]): string {
    return this.encryptFn(...args)
  }

  decrypt(encryptedValue: string): any {
    let decryptedValue = ''
    try {
      decryptedValue = this.decryptFn(encryptedValue)
    } catch (err) {
      console.warn('Failed to decrypt value: ', err)
    }
    return decryptedValue
  }
}
