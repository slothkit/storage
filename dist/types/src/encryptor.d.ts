type EncryptFn = (...args: any[]) => string;
type DecryptFn = (encryptedValue: string) => any;
export declare class Encryptor {
    private static instance;
    private encryptFn;
    private decryptFn;
    constructor(encryptFn: EncryptFn, decryptFn: DecryptFn);
    static getInstance(): Encryptor;
    static setInstance(encryptFn: EncryptFn, decryptFn: DecryptFn): void;
    encrypt(...args: any[]): string;
    decrypt(encryptedValue: string): any;
}
export {};
