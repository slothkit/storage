import { vigenereEncrypt, vigenereDecrypt } from '../lib/vigenere'

describe('Vigenere Cipher', () => {
  const plainText = 'Hello, World!'
  const key = 'KEY'
  const defaultKey = 'storage'

  it('should encrypt text using default key', () => {
    const encryptedText = vigenereEncrypt(plainText)
    expect(encryptedText).not.toBe(plainText)
    expect(encryptedText).toBe(vigenereEncrypt(plainText, defaultKey))
  })

  it('should encrypt text using custom key', () => {
    const encryptedText = vigenereEncrypt(plainText, key)
    expect(encryptedText).not.toBe(plainText)
    expect(encryptedText).not.toBe(vigenereEncrypt(plainText, defaultKey))
  })

  it('should decrypt text using default key', () => {
    const encryptedText = vigenereEncrypt(plainText)
    const decryptedText = vigenereDecrypt(encryptedText)
    expect(decryptedText).toBe(plainText)
  })

  it('should decrypt text using custom key', () => {
    const encryptedText = vigenereEncrypt(plainText, key)
    const decryptedText = vigenereDecrypt(encryptedText, key)
    expect(decryptedText).toBe(plainText)
  })

  it('should handle empty string', () => {
    const emptyText = ''
    expect(vigenereEncrypt(emptyText)).toBe('')
    expect(vigenereDecrypt(emptyText)).toBe('')
  })

  it('should handle non-ASCII characters', () => {
    const textWithEmoji = 'Hello, 🌍!'
    const encryptedText = vigenereEncrypt(textWithEmoji)
    const decryptedText = vigenereDecrypt(encryptedText)
    expect(decryptedText).toBe(textWithEmoji)
  })
})
