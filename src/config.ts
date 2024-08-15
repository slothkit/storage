import type { GlobalConfig } from './type'

export class ConfigManager {
  private static instance: ConfigManager | null = null
  private _config: GlobalConfig

  constructor(config: GlobalConfig) {
    this._config = config
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager({})
    }
    return ConfigManager.instance
  }

  static setInstance(config: GlobalConfig) {
    ConfigManager.instance = new ConfigManager(config)
  }

  get config(): GlobalConfig {
    return this._config
  }
}
