![NPM Version](https://img.shields.io/npm/v/%40slothkit%2Fstorage)
![GitHub last commit](https://img.shields.io/github/last-commit/slothkit/storage)
![NPM Downloads](https://img.shields.io/npm/d18m/%40slothkit%2Fstorage)

# Storage Manager

The Storage Manager is a utility library that extends the functionality of the browser's `localStorage`, adding support for expiration management, data encryption, and data compression.

## Features

- **Expiration Management**: Automatically manage the expiration time of stored data.
- **Encryption**: Protect your stored data with encryption.
- **Compression**: Reduce the size of stored data.

## Installation

Install the Storage Manager using npm:

```bash
npm install @slothkit/storage
```

## Usage

### Initialization

Before using the Storage Manager, you need to initialize it with optional global configuration.

```javascript
import { init } from '@slothkit/storage'

init({
  // Custom encryptor, if not configured, the built-in encryptor will be used
  encryptor: {
    encrypt: yourEncryptFunction,
    decrypt: yourDecryptFunction
  },
  // Whether to encrypt all data
  encrypt: true,
  // Whether to compress all data
  compress: true
})
```

You can alse import by this way:

```javascript
import { storage } from '@slothkit/storage'
storage.init({/** your config */})
```

### Saving Data

You can save data in `localStorage` with optional configuration for encryption, compression, and expiration time.

```javascript
import { set } from '@slothkit/storage'

// Expires in 1 hour, and encrypts, compresses the data
set('myKey', 'myValue', { encrypt: true, compress: true, ttl: 3600000 })

// Expires in 1000ms
set('myKey2', 'myValue2', { expires: Date.now() + 1000 })
```

### Retrieving Data

Retrieve data from `localStorage`, automatically handling encryption, compression, and expiration.

```javascript
import { get } from '@slothkit/storage'

// If the data has expired, you will get null
const value = get('myKey')
```

### Removing Items

Remove items from `localStorage`.

```javascript
import { remove } from '@slothkit/storage'

remove('myKey')
```

### Flushing Expired Items

Remove all expired items from `localStorage`. You can also force remove all items with expiration times.

```javascript
import { flush } from '@slothkit/storage'

// Removes only expired items
flush()

// Removes all items with expiration times, regardless of whether they have expired or not
flush(true)
```

### Clearing All Items

Clear all items from `localStorage`.

```javascript
import { clear } from '@slothkit/storage'

clear()
```

## API

### `init(config: GlobalConfig = {})`

Initialize the Storage Manager with global configuration.

- `config`: Global configuration object.
  - `encryptor`: Object containing `encrypt` and `decrypt` functions.
  - `encrypt`: Boolean indicating whether to enable encryption by default.
  - `compress`: Boolean indicating whether to enable compression by default.

### `set<T = any>(key: string, value: T, config: StorageConfig = {})`

Save data in `localStorage`.

- `key`: The key for the item.
- `value`: The value to store.
- `config`: Configuration object.
  - `encrypt`: Boolean indicating whether to encrypt the item.
  - `compress`: Boolean indicating whether to compress the item.
  - `ttl`: Time to live in milliseconds.
  - `expires`: Expiration timestamp.

### `get<T = any>(key: string): T | null`

Retrieve data from `localStorage`.

- `key`: The key for the item.

### `remove(key: string)`

Remove an item from `localStorage`.

- `key`: The key for the item.

### `flush(force: boolean = false)`

Remove expired items from `localStorage`.

- `force`: Boolean indicating whether to force remove all items with expiration times.

### `clear()`

Clear all items from `localStorage`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
