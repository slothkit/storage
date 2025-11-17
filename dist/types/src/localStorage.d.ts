import type { GlobalConfig, StorageConfig } from './type';
type StorageLike = {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(index: number): string | null;
    readonly length: number;
    clear(): void;
};
export declare const createNoopStorage: () => StorageLike;
export declare const init: (config?: GlobalConfig) => void;
export declare const set: <T = any>(key: string, value: T, config?: StorageConfig) => void;
export declare const get: <T = any>(key: string) => T | null;
export declare function getExp(key: string): number | void | null;
export declare function remove(key: string): void;
/**
 * Flush all the expired items.
 * Only items with expiration time will be flushed.
 * @param force If force is true, all items with expiration time will be flushed, no matter whether they are expired or not
 */
export declare function flush(force?: boolean): boolean;
export declare function clear(): void;
export {};
