import { base64UrlEncode, base64UrlDecode } from '../lib/base64url';

function nodeBase64UrlEncode(str: string): string {
  return Buffer.from(str, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function nodeBase64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString('utf8');
}

describe('base64url', () => {
  it('should encode and decode emoji correctly', () => {
    const emoji = '😊';
    const encoded = base64UrlEncode(emoji);
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe(emoji);
    expect(encoded).toBe(nodeBase64UrlEncode(emoji));
    expect(decoded).toBe(nodeBase64UrlDecode(encoded));
  });

  it('should encode and decode Chinese characters correctly', () => {
    const chinese = '中文';
    const encoded = base64UrlEncode(chinese);
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe(chinese);
    expect(encoded).toBe(nodeBase64UrlEncode(chinese));
    expect(decoded).toBe(nodeBase64UrlDecode(encoded));
  });

  it('should encode and decode strings with special characters correctly', () => {
    const specialChars = 'a-b_c=d';
    const encoded = base64UrlEncode(specialChars);
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe(specialChars);
    expect(encoded).toBe(nodeBase64UrlEncode(specialChars));
    expect(decoded).toBe(nodeBase64UrlDecode(encoded));
  });

  it('should encode and decode 2-byte UTF-8 characters correctly', () => {
    const twoByteChar = 'é'; // U+00E9
    const encoded = base64UrlEncode(twoByteChar);
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe(twoByteChar);
    expect(encoded).toBe(nodeBase64UrlEncode(twoByteChar));
    expect(decoded).toBe(nodeBase64UrlDecode(encoded));
  });

  it('should encode and decode mixed characters correctly', () => {
    const mixedChars = 'aé😊'; // mix of ASCII, 2-byte UTF-8, and 4-byte UTF-8
    const encoded = base64UrlEncode(mixedChars);
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe(mixedChars);
    expect(encoded).toBe(nodeBase64UrlEncode(mixedChars));
    expect(decoded).toBe(nodeBase64UrlDecode(encoded));
  });
});
