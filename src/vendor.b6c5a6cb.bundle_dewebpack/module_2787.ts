interface CipherParams {
  ciphertext: WordArray;
}

interface WordArray {
  toString(encoder: HexEncoder): string;
}

interface HexEncoder {
  parse(hexString: string): WordArray;
}

interface CryptoLib {
  lib: {
    CipherParams: {
      create(config: { ciphertext: WordArray }): CipherParams;
    };
  };
  enc: {
    Hex: HexEncoder;
  };
  format: {
    Hex?: HexFormat;
  };
}

interface HexFormat {
  stringify(cipherParams: CipherParams): string;
  parse(hexString: string): CipherParams;
}

export function createHexFormat(crypto: CryptoLib): HexFormat {
  const cipherParamsConstructor = crypto.lib.CipherParams;
  const hexEncoder = crypto.enc.Hex;

  const hexFormat: HexFormat = {
    stringify(cipherParams: CipherParams): string {
      return cipherParams.ciphertext.toString(hexEncoder);
    },

    parse(hexString: string): CipherParams {
      const wordArray = hexEncoder.parse(hexString);
      return cipherParamsConstructor.create({
        ciphertext: wordArray
      });
    }
  };

  crypto.format.Hex = hexFormat;
  return hexFormat;
}