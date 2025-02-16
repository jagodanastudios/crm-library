const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? '';
const INTERNAL_SECRET_KEY =
  process.env.INTERNAL_SECRET_KEY ?? 'secret_secret_secret_secret_secret';
const ENCRYPT_DATA = Boolean(process.env.ENCRYPT_DATA) ?? false;

console.log('*** package ****, SERVER_URL', SERVER_URL);
console.log('*** package ****, INTERNAL_SECRET_KEY', INTERNAL_SECRET_KEY);
console.log('*** package ****, ENCRYPT_DATA', ENCRYPT_DATA);

interface ISiteConfig {
  serverUrl: string;
  internalSecretKey: string;
  storageKeys: {
    TOKEN: string;
  };
  encryptData: boolean;
  isServer: boolean;
}

const SiteConfig: ISiteConfig = {
  serverUrl: SERVER_URL,
  internalSecretKey: INTERNAL_SECRET_KEY,
  storageKeys: {
    TOKEN: 'token',
  },
  encryptData: ENCRYPT_DATA,
  isServer: typeof window === 'undefined',
};

export default SiteConfig;
