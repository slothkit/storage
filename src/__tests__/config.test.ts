import { ConfigManager } from '../config'

describe('ConfigManager', () => {
  let configManager: ConfigManager

  beforeEach(() => {
    configManager = ConfigManager.getInstance()
  })

  afterEach(() => {
    ConfigManager.setInstance({})
  })

  it('should return the same instance when calling getInstance multiple times', () => {
    const instance1 = ConfigManager.getInstance()
    const instance2 = ConfigManager.getInstance()

    expect(instance1).toBe(instance2)
  })

  it('should set the instance correctly when calling setInstance', () => {
    const config = { encrypt: true }
    ConfigManager.setInstance(config)

    const instance = ConfigManager.getInstance()

    expect(instance.config).toEqual(config)
  })
})
