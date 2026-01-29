interface CipherConfig {
  iv?: Uint8Array;
  format?: any;
  kdf?: KDFAlgorithm;
}

interface KDFAlgorithm {
  execute(
    password: string | Uint8Array,
    keySize: number,
    ivSize: number,
    salt: Uint8Array
  ): KDFResult;
}

interface KDFResult {
  key: Uint8Array;
  iv: Uint8Array;
}

interface CipherParams {
  salt: Uint8Array;
}

interface CipherAlgorithm {
  keySize: number;
  ivSize: number;
}

interface DecryptContext {
  cfg: CipherConfig;
  _parse(data: any, format: any): CipherParams;
}

interface CryptoModule {
  decrypt(
    algorithm: CipherAlgorithm,
    cipherParams: CipherParams,
    key: Uint8Array,
    config: CipherConfig
  ): any;
}

declare const m: CryptoModule;

function moduleDecrypt(
  this: DecryptContext,
  algorithm: CipherAlgorithm,
  data: any,
  password: string | Uint8Array,
  config: CipherConfig
): any {
  const extendedConfig = this.cfg.extend(config);
  const cipherParams = this._parse(data, extendedConfig.format);
  const kdfResult = extendedConfig.kdf.execute(
    password,
    algorithm.keySize,
    algorithm.ivSize,
    cipherParams.salt
  );
  extendedConfig.iv = kdfResult.iv;
  return m.decrypt.call(this, algorithm, cipherParams, kdfResult.key, extendedConfig);
}

export { moduleDecrypt };