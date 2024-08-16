export interface GlobalConfig {
  /**
   * Whether to encrypt the value, if set to true, all values will be encrypted before storing
   */
  encrypt?: boolean
  /**
   * The encryptor used to encrypt and decrypt the value.
   * If not set, the default encryptor will be used.
   */
  encryptor?: {
    encrypt: (text: string) => string
    decrypt: (text: string) => string
  }
  /**
   * Whether to compress the value, if set to true, all values will be compressed before storing
   */
  compress?: boolean
}

export interface StorageItem {
  v: any
  exp?: number
}

export interface StorageConfig {
  /**
   * Remaining time (seconds)
   */
  ttl?: number
  /**
   * Specific expiration time (timestamp)
   */
  expires?: number
  /**
   * Whether to encrypt the value.
   * This will override the global configuration.
   */
  encrypt?: boolean
  /**
   * Whether to compress the value.
   * This will override the global configuration.
   */
  compress?: boolean
}
