import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';

export const hash = (password: string): string => {

    const salt = encodeBase32LowerCaseNoPadding(crypto.getRandomValues(new Uint8Array(16)));
    const key = generateKey(password, salt);
    return `${salt}:${key}`;
};

export const verify = (hashedPassword: string, password: string): boolean => {

    const [salt, key] = hashedPassword.split(':');
    const targetKey = generateKey(password, salt);
    return targetKey === key;
};

const generateKey = (password: string, salt: string): string => {

    const saltedBuffer = new TextEncoder().encode(password + salt);
    return encodeBase32LowerCaseNoPadding(sha256(saltedBuffer));
};
