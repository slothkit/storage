import * as ls from './localStorage';
export declare const init: (config?: import("./type").GlobalConfig) => void, get: <T = any>(key: string) => T | null, set: <T = any>(key: string, value: T, config?: import("./type").StorageConfig) => void, remove: typeof ls.remove, clear: typeof ls.clear, flush: typeof ls.flush;
export default ls;
export declare const storage: {
    init: (config?: import("./type").GlobalConfig) => void;
    get: <T = any>(key: string) => T | null;
    set: <T = any>(key: string, value: T, config?: import("./type").StorageConfig) => void;
    remove: typeof ls.remove;
    clear: typeof ls.clear;
    flush: typeof ls.flush;
};
