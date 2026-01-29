import { v4 as uuidv4 } from 'uuid';
import baseConverter from 'base-converter';

const FLICKR_BASE58 = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const COOKIE_BASE90 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&\'()*+-./:<=>?@[]^_`{|}~';

interface ShortIdOptions {
  consistentLength?: boolean;
  shortIdLength?: number;
  paddingChar?: string;
}

interface InternalConfig {
  shortIdLength: number;
  consistentLength: boolean;
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

let cachedGenerateFunction: (() => string) | undefined;

const formatShortId = (
  uuid: string,
  encoder: (input: string) => string,
  config?: InternalConfig
): string => {
  const encoded = encoder(uuid.toLowerCase().replace(/-/g, ''));
  return config?.consistentLength
    ? encoded.padStart(config.shortIdLength, config.paddingChar)
    : encoded;
};

const parseShortIdToUUID = (
  shortId: string,
  decoder: (input: string) => string
): string => {
  const hex = decoder(shortId).padStart(32, '0');
  const match = hex.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);
  
  if (!match) {
    throw new Error('Invalid short ID format');
  }
  
  return [match[1], match[2], match[3], match[4], match[5]].join('-');
};

const calculateMaxLength = (alphabetLength: number): number => {
  const UUID_BITS = 128;
  return Math.ceil(Math.log(2 ** UUID_BITS) / Math.log(alphabetLength));
};

const createShortIdInstance = (
  alphabet: string = FLICKR_BASE58,
  options: ShortIdOptions = {}
): ShortIdInstance => {
  const mergedOptions: ShortIdOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  const uniqueChars = [...new Set(Array.from(alphabet))];
  if (uniqueChars.length !== alphabet.length) {
    throw new Error('The provided Alphabet has duplicate characters resulting in unreliable results');
  }

  const maxLength = calculateMaxLength(alphabet.length);

  const config: InternalConfig = {
    shortIdLength: maxLength,
    consistentLength: mergedOptions.consistentLength ?? true,
    paddingChar: alphabet[0]
  };

  const hexToAlphabet = baseConverter(baseConverter.HEX, alphabet);
  const alphabetToHex = baseConverter(alphabet, baseConverter.HEX);

  const generateShortId = (): string => formatShortId(uuidv4(), hexToAlphabet, config);

  const instance: ShortIdInstance = {
    new: generateShortId,
    generate: generateShortId,
    uuid: uuidv4,
    fromUUID: (uuid: string): string => formatShortId(uuid, hexToAlphabet, config),
    toUUID: (shortId: string): string => parseShortIdToUUID(shortId, alphabetToHex),
    alphabet,
    maxLength
  };

  return Object.freeze(instance);
};

const shortIdFactory: ShortIdFactory = createShortIdInstance as ShortIdFactory;

shortIdFactory.constants = {
  flickrBase58: FLICKR_BASE58,
  cookieBase90: COOKIE_BASE90
};

shortIdFactory.uuid = uuidv4;

shortIdFactory.generate = (): string => {
  if (!cachedGenerateFunction) {
    cachedGenerateFunction = createShortIdInstance(FLICKR_BASE58).generate;
  }
  return cachedGenerateFunction();
};

export default shortIdFactory;