import { Encryptor } from '../encryptor'

describe('Encryptor', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('getInstance', () => {
    it('should return the same instance', () => {
      const instance1 = Encryptor.getInstance()
      const instance2 = Encryptor.getInstance()

      expect(instance1).toBe(instance2)
    })
  })

  describe('encrypt', () => {
    it('should encrypt the value', () => {
      const encryptor = Encryptor.getInstance()
      const value = 'secret'
      const encryptedValue = encryptor.encrypt(value)

      expect(encryptedValue).toBeDefined()
      expect(encryptedValue).not.toBe(value)
    })
  })

  describe('decrypt', () => {
    it('should decrypt the encrypted value', () => {
      const encryptor = Encryptor.getInstance()
      const value = 'secret'
      const encryptedValue = encryptor.encrypt(value)
      const decryptedValue = encryptor.decrypt(encryptedValue)

      expect(decryptedValue).toBeDefined()
      expect(decryptedValue).toBe(value)
    })
  })

  describe('decrypt', () => {
    it('should return an empty string if the value is not encrypted', () => {
        const encryptor = Encryptor.getInstance()
        const value = undefined
        const decryptedValue = encryptor.decrypt(value as any)

        expect(decryptedValue).toBeDefined()
        expect(decryptedValue).toBe('')
      }
    )
  })
})