interface CipherConfig {
  iv?: Uint8Array;
  kdf: {
    execute(
      password: string,
      keySize: number,
      ivSize: number
    ): { key: Uint8Array; iv: Uint8Array };
  };
  extend(options: Partial<CipherConfig>): CipherConfig;
}

interface Cipher {
  keySize: number;
  ivSize: number;
}

interface CipherResult {
  mixIn(data: { key: Uint8Array; iv: Uint8Array }): CipherResult;
}

interface EncryptContext {
  cfg: CipherConfig;
  encrypt: {
    call(
      context: EncryptContext,
      cipher: Cipher,
      message: string,
      key: Uint8Array,
      config: CipherConfig
    ): CipherResult;
  };
}

function moduleEncrypt(
  this: EncryptContext,
  cipher: Cipher,
  message: string,
  password: string,
  options: Partial<CipherConfig>
): CipherResult {
  const config = this.cfg.extend(options);
  const derivedKey = config.kdf.execute(password, cipher.keySize, cipher.ivSize);
  config.iv = derivedKey.iv;

  const encryptedResult = this.encrypt.call(
    this,
    cipher,
    message,
    derivedKey.key,
    config
  );

  return encryptedResult.mixIn(derivedKey);
}

export { moduleEncrypt };