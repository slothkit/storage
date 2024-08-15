![NPM Version](https://img.shields.io/npm/v/%40slothkit%2Fstorage)
![GitHub last commit](https://img.shields.io/github/last-commit/slothkit/storage)
![NPM Downloads](https://img.shields.io/npm/d18m/%40slothkit%2Fstorage)

# Storage 管理器

Storage 管理器是一个扩展浏览器 `localStorage` 功能的实用库，增加了对过期时间、数据加密和数据压缩的支持。

## 功能

- **过期管理**：自动管理存储数据的过期时间。
- **加密**：加密保护您的存储数据。
- **压缩**：减少存储数据的大小。

## 安装

使用 npm 安装 LocalStorage 管理器：

```bash
npm install @slothkit/storage
```

## 使用

### 初始化

在使用 LocalStorage 管理器之前，需要使用可选的全局配置进行初始化。

```javascript
import { init } from '@slothkit/storage'

init({
  // 自定义加密器，如果没有配置，则使用内置的加密器
  encryptor: {
    encrypt: yourEncryptFunction,
    decrypt: yourDecryptFunction
  },
  // 是否加密全部数据
  encrypt: true,
  // 是否压缩全部数据
  compress: true
})
```

### 保存数据

您可以在 `localStorage` 中保存数据，并可选配置加密、压缩和过期时间。

```javascript
import { set } from '@slothkit/storage'

// 1小时后过期，并加密，压缩数据
set('myKey', 'myValue', { encrypt: true, compress: true, ttl: 3600000 })

// 1000ms后过期
set('myKey2', 'myValue2', { expires: Date.now() + 1000 })
```

### 获取数据

从 `localStorage` 中获取数据，自动处理加密、压缩和过期。

```javascript
import { get } from '@slothkit/storage'

// 如果数据已过期，你将获得null
const value = get('myKey')
```

### 移除项目

从 `localStorage` 中移除项目。

```javascript
import { remove } from '@slothkit/storage'

remove('myKey')
```

### 清除过期项目

从 `localStorage` 中移除所有过期项目。您也可以强制移除所有带有过期时间的项目。

```javascript
import { flush } from '@slothkit/storage'

// 仅移除过期项目
flush()

// 移除所有带有过期时间的项目，无论是否过期
flush(true)
```

### 清除所有项目

清除 `localStorage` 中的所有项目。

```javascript
import { clear } from '@slothkit/storage'

clear()
```

## API

### `init(config: GlobalConfig = {})`

使用全局配置初始化 LocalStorage 管理器。

- `config`：全局配置对象。
  - `encryptor`：包含 `encrypt` 和 `decrypt` 函数的对象。
  - `encrypt`：布尔值，指示是否默认启用加密。
  - `compress`：布尔值，指示是否默认启用压缩。

### `set<T = any>(key: string, value: T, config: StorageConfig = {})`

在 `localStorage` 中保存数据。

- `key`：项目的键。
- `value`：要存储的值。
- `config`：配置对象。
  - `encrypt`：布尔值，指示是否加密项目。
  - `compress`：布尔值，指示是否压缩项目。
  - `ttl`：存活时间，以毫秒为单位。
  - `expires`：过期时间戳。

### `get<T = any>(key: string): T | null`

从 `localStorage` 中获取数据。

- `key`：项目的键。

### `remove(key: string)`

从 `localStorage` 中移除项目。

- `key`：项目的键。

### `flush(force: boolean = false)`

从 `localStorage` 中清除过期项目。

- `force`：布尔值，指示是否强制移除所有带有过期时间的项目。

### `clear()`

清除 `localStorage` 中的所有项目。

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。
