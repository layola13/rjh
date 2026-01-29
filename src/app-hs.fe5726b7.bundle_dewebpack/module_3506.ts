const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const URI_SAFE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";

interface CharacterPositionCache {
  [key: string]: number;
}

interface AlphabetCache {
  [alphabet: string]: CharacterPositionCache;
}

interface CompressionContext {
  [key: string]: number;
}

interface DecompressionState {
  val: number;
  position: number;
  index: number;
}

const alphabetCache: AlphabetCache = {};

/**
 * Gets the position of a character in the given alphabet
 */
function getCharacterPosition(alphabet: string, character: string): number {
  if (!alphabetCache[alphabet]) {
    alphabetCache[alphabet] = {};
    for (let i = 0; i < alphabet.length; i++) {
      alphabetCache[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return alphabetCache[alphabet][character];
}

/**
 * Compresses a string to Base64 encoded format
 */
export function compressToBase64(input: string | null): string {
  if (input == null) return "";
  const compressed = compress(input, 6, (charCode: number) => BASE64_ALPHABET.charAt(charCode));
  
  switch (compressed.length % 4) {
    case 1:
      return compressed + "===";
    case 2:
      return compressed + "==";
    case 3:
      return compressed + "=";
    default:
    case 0:
      return compressed;
  }
}

/**
 * Decompresses a Base64 encoded string
 */
export function decompressFromBase64(input: string | null): string | null {
  if (input == null) return "";
  if (input === "") return null;
  return decompress(input.length, 32, (index: number) => 
    getCharacterPosition(BASE64_ALPHABET, input.charAt(index))
  );
}

/**
 * Compresses a string to UTF16 format
 */
export function compressToUTF16(input: string | null): string {
  if (input == null) return "";
  return compress(input, 15, (charCode: number) => 
    String.fromCharCode(charCode + 32)
  ) + " ";
}

/**
 * Decompresses a UTF16 encoded string
 */
export function decompressFromUTF16(input: string | null): string | null {
  if (input == null) return "";
  if (input === "") return null;
  return decompress(input.length, 16384, (index: number) => 
    input.charCodeAt(index) - 32
  );
}

/**
 * Compresses a string to Uint8Array
 */
export function compressToUint8Array(input: string): Uint8Array {
  const compressed = compressToString(input);
  const result = new Uint8Array(2 * compressed.length);
  
  for (let i = 0; i < compressed.length; i++) {
    const charCode = compressed.charCodeAt(i);
    result[2 * i] = charCode >>> 8;
    result[2 * i + 1] = charCode % 256;
  }
  
  return result;
}

/**
 * Decompresses a Uint8Array to string
 */
export function decompressFromUint8Array(input: Uint8Array | null): string | null {
  if (input == null) return decompressFromString(input);
  
  const charCodes = new Array<number>(input.length / 2);
  for (let i = 0; i < charCodes.length; i++) {
    charCodes[i] = 256 * input[2 * i] + input[2 * i + 1];
  }
  
  const characters: string[] = [];
  charCodes.forEach((charCode: number) => {
    characters.push(String.fromCharCode(charCode));
  });
  
  return decompressFromString(characters.join(""));
}

/**
 * Compresses a string to URI-safe encoded format
 */
export function compressToEncodedURIComponent(input: string | null): string {
  if (input == null) return "";
  return compress(input, 6, (charCode: number) => URI_SAFE_ALPHABET.charAt(charCode));
}

/**
 * Decompresses a URI-safe encoded string
 */
export function decompressFromEncodedURIComponent(input: string | null): string | null {
  if (input == null) return "";
  if (input === "") return null;
  const normalized = input.replace(/ /g, "+");
  return decompress(normalized.length, 32, (index: number) => 
    getCharacterPosition(URI_SAFE_ALPHABET, normalized.charAt(index))
  );
}

/**
 * Compresses a string to a compressed string format
 */
export function compressToString(input: string): string {
  return compress(input, 16, (charCode: number) => String.fromCharCode(charCode));
}

/**
 * Core compression function using LZW algorithm
 */
function compress(
  input: string | null,
  bitsPerChar: number,
  getCharFromInt: (charCode: number) => string
): string {
  if (input == null) return "";
  
  let loopIndex: number;
  let value: number;
  let currentIndex: number;
  const dictionary: CompressionContext = {};
  const dictionaryToCreate: Record<string, boolean> = {};
  let currentChar = "";
  let phrase = "";
  let nextPhrase = "";
  let dictSize = 2;
  let enlargeIn = 3;
  let numBits = 2;
  const result: string[] = [];
  let data = 0;
  let dataPosition = 0;
  
  for (currentIndex = 0; currentIndex < input.length; currentIndex += 1) {
    currentChar = input.charAt(currentIndex);
    
    if (!Object.prototype.hasOwnProperty.call(dictionary, currentChar)) {
      dictionary[currentChar] = enlargeIn++;
      dictionaryToCreate[currentChar] = true;
    }
    
    nextPhrase = phrase + currentChar;
    
    if (Object.prototype.hasOwnProperty.call(dictionary, nextPhrase)) {
      phrase = nextPhrase;
    } else {
      if (Object.prototype.hasOwnProperty.call(dictionaryToCreate, phrase)) {
        if (phrase.charCodeAt(0) < 256) {
          for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
            data <<= 1;
            if (dataPosition === bitsPerChar - 1) {
              dataPosition = 0;
              result.push(getCharFromInt(data));
              data = 0;
            } else {
              dataPosition++;
            }
          }
          
          value = phrase.charCodeAt(0);
          for (loopIndex = 0; loopIndex < 8; loopIndex++) {
            data = (data << 1) | (1 & value);
            if (dataPosition === bitsPerChar - 1) {
              dataPosition = 0;
              result.push(getCharFromInt(data));
              data = 0;
            } else {
              dataPosition++;
            }
            value >>= 1;
          }
        } else {
          value = 1;
          for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
            data = (data << 1) | value;
            if (dataPosition === bitsPerChar - 1) {
              dataPosition = 0;
              result.push(getCharFromInt(data));
              data = 0;
            } else {
              dataPosition++;
            }
            value = 0;
          }
          
          value = phrase.charCodeAt(0);
          for (loopIndex = 0; loopIndex < 16; loopIndex++) {
            data = (data << 1) | (1 & value);
            if (dataPosition === bitsPerChar - 1) {
              dataPosition = 0;
              result.push(getCharFromInt(data));
              data = 0;
            } else {
              dataPosition++;
            }
            value >>= 1;
          }
        }
        
        dictSize--;
        if (dictSize === 0) {
          dictSize = Math.pow(2, numBits);
          numBits++;
        }
        delete dictionaryToCreate[phrase];
      } else {
        value = dictionary[phrase];
        for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
          data = (data << 1) | (1 & value);
          if (dataPosition === bitsPerChar - 1) {
            dataPosition = 0;
            result.push(getCharFromInt(data));
            data = 0;
          } else {
            dataPosition++;
          }
          value >>= 1;
        }
      }
      
      dictSize--;
      if (dictSize === 0) {
        dictSize = Math.pow(2, numBits);
        numBits++;
      }
      
      dictionary[nextPhrase] = enlargeIn++;
      phrase = String(currentChar);
    }
  }
  
  if (phrase !== "") {
    if (Object.prototype.hasOwnProperty.call(dictionaryToCreate, phrase)) {
      if (phrase.charCodeAt(0) < 256) {
        for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
          data <<= 1;
          if (dataPosition === bitsPerChar - 1) {
            dataPosition = 0;
            result.push(getCharFromInt(data));
            data = 0;
          } else {
            dataPosition++;
          }
        }
        
        value = phrase.charCodeAt(0);
        for (loopIndex = 0; loopIndex < 8; loopIndex++) {
          data = (data << 1) | (1 & value);
          if (dataPosition === bitsPerChar - 1) {
            dataPosition = 0;
            result.push(getCharFromInt(data));
            data = 0;
          } else {
            dataPosition++;
          }
          value >>= 1;
        }
      } else {
        value = 1;
        for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
          data = (data << 1) | value;
          if (dataPosition === bitsPerChar - 1) {
            dataPosition = 0;
            result.push(getCharFromInt(data));
            data = 0;
          } else {
            dataPosition++;
          }
          value = 0;
        }
        
        value = phrase.charCodeAt(0);
        for (loopIndex = 0; loopIndex < 16; loopIndex++) {
          data = (data << 1) | (1 & value);
          if (dataPosition === bitsPerChar - 1) {
            dataPosition = 0;
            result.push(getCharFromInt(data));
            data = 0;
          } else {
            dataPosition++;
          }
          value >>= 1;
        }
      }
      
      dictSize--;
      if (dictSize === 0) {
        dictSize = Math.pow(2, numBits);
        numBits++;
      }
      delete dictionaryToCreate[phrase];
    } else {
      value = dictionary[phrase];
      for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
        data = (data << 1) | (1 & value);
        if (dataPosition === bitsPerChar - 1) {
          dataPosition = 0;
          result.push(getCharFromInt(data));
          data = 0;
        } else {
          dataPosition++;
        }
        value >>= 1;
      }
    }
    
    dictSize--;
    if (dictSize === 0) {
      dictSize = Math.pow(2, numBits);
      numBits++;
    }
  }
  
  value = 2;
  for (loopIndex = 0; loopIndex < numBits; loopIndex++) {
    data = (data << 1) | (1 & value);
    if (dataPosition === bitsPerChar - 1) {
      dataPosition = 0;
      result.push(getCharFromInt(data));
      data = 0;
    } else {
      dataPosition++;
    }
    value >>= 1;
  }
  
  while (true) {
    data <<= 1;
    if (dataPosition === bitsPerChar - 1) {
      result.push(getCharFromInt(data));
      break;
    }
    dataPosition++;
  }
  
  return result.join("");
}

/**
 * Decompresses a standard compressed string
 */
export function decompressFromString(input: string | null): string | null {
  if (input == null) return "";
  if (input === "") return null;
  return decompress(input.length, 32768, (index: number) => input.charCodeAt(index));
}

/**
 * Core decompression function using LZW algorithm
 */
function decompress(
  length: number,
  resetValue: number,
  getNextValue: (index: number) => number
): string | null {
  let loopIndex: number;
  let entry: string;
  let bits: number;
  let resb: number;
  let maxpower: number;
  let power: number;
  const dictionary: string[] = [];
  let enlargeIn = 4;
  let dictSize = 4;
  let numBits = 3;
  let currentEntry = "";
  const result: string[] = [];
  
  const data: DecompressionState = {
    val: getNextValue(0),
    position: resetValue,
    index: 1
  };
  
  for (loopIndex = 0; loopIndex < 3; loopIndex += 1) {
    dictionary[loopIndex] = String.fromCharCode(loopIndex);
  }
  
  bits = 0;
  maxpower = Math.pow(2, 2);
  power = 1;
  
  while (power !== maxpower) {
    resb = data.val & data.position;
    data.position >>= 1;
    
    if (data.position === 0) {
      data.position = resetValue;
      data.val = getNextValue(data.index++);
    }
    
    bits |= (resb > 0 ? 1 : 0) * power;
    power <<= 1;
  }
  
  switch (bits) {
    case 0:
      bits = 0;
      maxpower = Math.pow(2, 8);
      power = 1;
      
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        
        if (data.position === 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }
      
      entry = String.fromCharCode(bits);
      break;
      
    case 1:
      bits = 0;
      maxpower = Math.pow(2, 16);
      power = 1;
      
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        
        if (data.position === 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }
      
      entry = String.fromCharCode(bits);
      break;
      
    case 2:
      return "";
  }
  
  dictionary[3] = entry;
  let word = entry;
  result.push(entry);
  
  while (true) {
    if (data.index > length) {
      return "";
    }
    
    bits = 0;
    maxpower = Math.pow(2, numBits);
    power = 1;
    
    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      
      if (data.position === 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }
    
    const code = bits;
    
    switch (code) {
      case 0:
        bits = 0;
        maxpower = Math.pow(2, 8);
        power = 1;
        
        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          
          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        
        dictionary[dictSize++] = String.fromCharCode(bits);
        entry = dictionary[dictSize - 1];
        enlargeIn--;
        break;
        
      case 1:
        bits = 0;
        maxpower = Math.pow(2, 16);
        power = 1;
        
        while (power !== maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          
          if (data.position === 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        
        dictionary[dictSize++] = String.fromCharCode(bits);
        entry = dictionary[dictSize - 1];
        enlargeIn--;
        break;
        
      case 2:
        return result.join("");
    }
    
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits);
      numBits++;
    }
    
    if (dictionary[code]) {
      currentEntry = dictionary[code];
    } else {
      if (code !== dictSize) {
        return null;
      }
      currentEntry = word + word.charAt(0);
    }
    
    result.push(currentEntry);
    dictionary[dictSize++] = word + currentEntry.charAt(0);
    
    enlargeIn--;
    word = currentEntry;
    
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits);
      numBits++;
    }
  }
}