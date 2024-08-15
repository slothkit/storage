export declare class Encryptor {
    private static instance;
    private encryptFn;
    private decryptFn;
    constructor(encryptFn: (value: any) => string, decryptFn: (encryptedValue: string) => any);
    static getInstance(): Encryptor;
    static setInstance(encryptFn: (value: any) => string, decryptFn: (encryptedValue: string) => any): void;
    encrypt(value: any): string;
    decrypt(encryptedValue: string): any;
}
