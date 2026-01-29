import { v4 as uuidv4 } from 'uuid';
import baseConverter from './base-converter';

const FLICKR_BASE58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

interface ShortIdOptions {
  consistentLength?: boolean;
  shortIdLength?: number;
  paddingChar?: string;
}

interface NormalizeOptions {
  consistentLength: boolean;
  shortIdLength: number;
  paddingChar: string;
}

interface ShortIdInstance {
  new: () => string;
  generate: () => string;
  uuid: () => string;
  fromUUID: (uuid: string) => string;
  toUUID: (shortId: string) => string;
  alphabet: string;
  maxLength: number;
}

interface ShortIdFactory {
  (alphabet?: string, options?: ShortIdOptions): ShortIdInstance;
  constants: {
    flickrBase58: string;
    cookieBase90: string;
  };
  uuid: () => string;
  generate: () => string;
}

const DEFAULT_OPTIONS: ShortIdOptions = {
  consistentLength: true
};

let cachedGenerator: (() => string) | undefined;

const normalizeUUID = (
  uuid: string,
  encoder: (input: string) => string,
  options?: NormalizeOptions
): string => {
  const encoded = encoder(uuid.toLowerCase().replace(/-/g, ""));
  return options?.consistentLength
    ? encoded.padStart(options.shortIdLength, options.paddingChar)
    : encoded;
};

const expandShortId = (shortId: string, decoder: (input: string) => string): string => {
  const hex = decoder(shortId).padStart(32, "0");
  const match = hex.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);
  
  if (!match) {
    throw new Error("Invalid short ID format");
  }
  
  return [match[1], match[2], match[3], match[4], match[5]].join("-");
};

const createShortId = (alphabet?: string, options?: ShortIdOptions): ShortIdInstance => {
  const finalAlphabet = alphabet || FLICKR_BASE58;
  const finalOptions: ShortIdOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  const uniqueChars = [...new Set(Array.from(finalAlphabet))];
  if (uniqueChars.length !== finalAlphabet.length) {
    throw new Error("The provided Alphabet has duplicate characters resulting in unreliable results");
  }

  const alphabetLength = finalAlphabet.length;
  const shortIdLength = Math.ceil(Math.log(2 ** 128) / Math.log(alphabetLength));

  const normalizeOptions: NormalizeOptions = {
    shortIdLength,
    consistentLength: finalOptions.consistentLength ?? true,
    paddingChar: finalAlphabet[0]
  };

  const hexToAlphabet = baseConverter(baseConverter.HEX, finalAlphabet);
  const alphabetToHex = baseConverter(finalAlphabet, baseConverter.HEX);

  const generateShortId = (): string => normalizeUUID(uuidv4(), hexToAlphabet, normalizeOptions);

  const instance: ShortIdInstance = {
    new: generateShortId,
    generate: generateShortId,
    uuid: uuidv4,
    fromUUID: (uuid: string): string => normalizeUUID(uuid, hexToAlphabet, normalizeOptions),
    toUUID: (shortId: string): string => expandShortId(shortId, alphabetToHex),
    alphabet: finalAlphabet,
    maxLength: shortIdLength
  };

  return Object.freeze(instance);
};

const shortIdFactory: ShortIdFactory = createShortId as ShortIdFactory;

shortIdFactory.constants = {
  flickrBase58: FLICKR_BASE58,
  cookieBase90: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~"
};

shortIdFactory.uuid = uuidv4;

shortIdFactory.generate = (): string => {
  if (!cachedGenerator) {
    cachedGenerator = createShortId(FLICKR_BASE58).generate;
  }
  return cachedGenerator();
};

export default shortIdFactory;