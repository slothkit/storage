const KEY = 'storage'

function generateKey(text: string, key: string): string {
  let generatedKey = key
  while (generatedKey.length < text.length) {
    generatedKey += key
  }
  return generatedKey.slice(0, text.length)
}

export function vigenereEncrypt(plainText: string, key = KEY): string {
  const generatedKey = generateKey(plainText, key)
  return [...plainText]
    .map((char, i) =>
      String.fromCodePoint((char.codePointAt(0)! + generatedKey.codePointAt(i)!) % 1114112)
    )
    .join('')
}

export function vigenereDecrypt(cipherText: string, key = KEY): string {
  const generatedKey = generateKey(cipherText, key)
  return [...cipherText]
    .map((char, i) =>
      String.fromCodePoint(
        (char.codePointAt(0)! - generatedKey.codePointAt(i)! + 1114112) % 1114112
      )
    )
    .join('')
}
