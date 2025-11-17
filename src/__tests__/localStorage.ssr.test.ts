/** @jest-environment node */
import { init, set, get, getExp, remove, flush, clear, createNoopStorage } from '../localStorage'

describe('Storage Module (SSR no-op fallback)', () => {
  it('should import and operate without throwing in node (no window)', () => {
    // init should not throw even when window is not available
    expect(() => init({ version: 1 })).not.toThrow()

    // set/get should be no-op on server: set will not persist, get returns null
    expect(() => set('ssrKey', 'value')).not.toThrow()
    expect(get('ssrKey')).toBeNull()

    // getExp should return null
    expect(getExp('ssrKey')).toBeNull()

    // remove/flush/clear should not throw and behave as no-op
    expect(() => remove('ssrKey')).not.toThrow()
    expect(() => flush()).not.toThrow()
    expect(() => clear()).not.toThrow()
  })

  it('noop storage key and length behaviors are correct', () => {
    const noop = createNoopStorage()
    expect(noop.getItem('any')).toBeNull()
    expect(noop.key(0)).toBeNull()
    expect(noop.length).toBe(0)
    // set/remove/clear should be callable without throwing
    expect(() => noop.setItem('k', 'v')).not.toThrow()
    expect(() => noop.removeItem('k')).not.toThrow()
    expect(() => noop.clear()).not.toThrow()
  })
})
