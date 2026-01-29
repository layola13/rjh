export interface CryptoUtils {
  randomUUID: (() => string) | undefined;
}

const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);

const cryptoUtils: CryptoUtils = {
  randomUUID
};

export default cryptoUtils;