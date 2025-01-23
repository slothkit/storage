export function base64UrlEncode(input: string): string {
  // 将输入字符串转换为 UTF-8 编码的字节数组
  const utf8Bytes = utf8Encode(input)
  // 将字节数组转换为 Base64 字符串
  const base64String = btoa(String.fromCharCode(...utf8Bytes))
  // 将 Base64 字符串转换为 Base64URL 字符串
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function base64UrlDecode(input: string): string {
  // 将 Base64URL 字符串转换为 Base64 字符串
  const base64String = input.replace(/-/g, '+').replace(/_/g, '/')
  // 将 Base64 字符串转换为字节数组
  const utf8Bytes = new Uint8Array(
    atob(base64String)
      .split('')
      .map((char) => char.charCodeAt(0))
  )
  // 将字节数组转换为 UTF-8 编码的字符串
  return utf8Decode(utf8Bytes)
}

// 兼容性处理：实现 UTF-8 编码和解码函数
function utf8Encode(str: string): Uint8Array {
  const utf8 = []
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i)
    if (charcode < 0x80) utf8.push(charcode)
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f))
    } else {
      i++
      charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      )
    }
  }
  return new Uint8Array(utf8)
}

function utf8Decode(bytes: Uint8Array): string {
  let str = ''
  let i = 0
  while (i < bytes.length) {
    const byte1 = bytes[i++]
    if (byte1 < 0x80) {
      str += String.fromCharCode(byte1)
    } else if (byte1 < 0xe0) {
      const byte2 = bytes[i++]
      str += String.fromCharCode(((byte1 & 0x1f) << 6) | (byte2 & 0x3f))
    } else if (byte1 < 0xf0) {
      const byte2 = bytes[i++]
      const byte3 = bytes[i++]
      str += String.fromCharCode(((byte1 & 0x0f) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f))
    } else {
      const byte2 = bytes[i++]
      const byte3 = bytes[i++]
      const byte4 = bytes[i++]
      const codepoint =
        (((byte1 & 0x07) << 18) | ((byte2 & 0x3f) << 12) | ((byte3 & 0x3f) << 6) | (byte4 & 0x3f)) -
        0x10000
      str += String.fromCharCode((codepoint >> 10) | 0xd800, (codepoint & 0x3ff) | 0xdc00)
    }
  }
  return str
}
