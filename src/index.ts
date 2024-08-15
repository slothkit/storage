import * as ls from './localStorage'

export const { init, get, set, remove, clear, flush } = ls

export const storage = {
  init,
  get,
  set,
  remove,
  clear,
  flush,
}

export default ls
