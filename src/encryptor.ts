import { vigenereDecrypt, vigenereEncrypt } from './lib/vigenere'

export class Encryptor {
  private static instance: Encryptor | null = null
  private encryptFn: (value: any) => string
  private decryptFn: (encryptedValue: string) => any

  constructor(encryptFn: (value: any) => string, decryptFn: (encryptedValue: string) => any) {
    this.encryptFn = encryptFn
    this.decryptFn = decryptFn
  }

  static getInstance(): Encryptor {
    if (!Encryptor.instance) {
      Encryptor.instance = new Encryptor(vigenereEncrypt, vigenereDecrypt)
    }
    return Encryptor.instance
  }

  static setInstance(
    encryptFn: (value: any) => string,
    decryptFn: (encryptedValue: string) => any
  ) {
    Encryptor.instance = new Encryptor(encryptFn, decryptFn)
  }

  encrypt(value: any): string {
    return this.encryptFn(value)
  }

  decrypt(encryptedValue: string): any {
    return this.decryptFn(encryptedValue)
  }
}
