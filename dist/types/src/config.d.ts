import type { GlobalConfig } from './type';
export declare class ConfigManager {
    private static instance;
    private _config;
    constructor(config: GlobalConfig);
    static getInstance(): ConfigManager;
    static setInstance(config: GlobalConfig): void;
    get config(): GlobalConfig;
}
