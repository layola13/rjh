interface TypeRegistration {
  name: string;
  fromWireType: (pointer: number) => string;
  toWireType: (destructors: Array<(ptr: number) => void> | null, value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => string;
  destructorFunction: (pointer: number) => void;
}

function registerStdString(typeId: number, rawType: string): void {
  const typeName = CA(rawType);
  const isStdString = typeName === "std::string";

  bA(typeId, {
    name: typeName,

    fromWireType(pointer: number): string {
      const length = S[pointer >> 2];
      let result: string | undefined;

      if (isStdString) {
        let startOffset = pointer + 4;
        for (let i = 0; i <= length; ++i) {
          const currentOffset = pointer + 4 + i;
          if (i === length || N[currentOffset] === 0) {
            const segment = v(startOffset, currentOffset - startOffset);
            if (result === undefined) {
              result = segment;
            } else {
              result += String.fromCharCode(0);
              result += segment;
            }
            startOffset = currentOffset + 1;
          }
        }
      } else {
        const characters = new Array<string>(length);
        for (let i = 0; i < length; ++i) {
          characters[i] = String.fromCharCode(N[pointer + 4 + i]);
        }
        result = characters.join("");
      }

      _t(pointer);
      return result as string;
    },

    toWireType(destructors: Array<(ptr: number) => void> | null, value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array): number {
      let normalizedValue: string | Uint8Array;
      if (value instanceof ArrayBuffer) {
        normalizedValue = new Uint8Array(value);
      } else {
        normalizedValue = value;
      }

      const isString = typeof normalizedValue === "string";
      if (!isString && 
          !(normalizedValue instanceof Uint8Array) && 
          !(normalizedValue instanceof Uint8ClampedArray) && 
          !(normalizedValue instanceof Int8Array)) {
        yA("Cannot pass non-string to std::string");
      }

      const byteLength = isStdString && isString 
        ? computeUtf8Length(normalizedValue as string)
        : (normalizedValue as string | Uint8Array).length;

      const allocatedPointer = Kt(4 + byteLength + 1);
      S[allocatedPointer >> 2] = byteLength;

      if (isStdString && isString) {
        writeUtf8ToMemory(normalizedValue as string, N, allocatedPointer + 4, byteLength + 1);
      } else if (isString) {
        for (let i = 0; i < byteLength; ++i) {
          const charCode = (normalizedValue as string).charCodeAt(i);
          if (charCode > 255) {
            _t(allocatedPointer);
            yA("String has UTF-16 code units that do not fit in 8 bits");
          }
          N[allocatedPointer + 4 + i] = charCode;
        }
      } else {
        for (let i = 0; i < byteLength; ++i) {
          N[allocatedPointer + 4 + i] = (normalizedValue as Uint8Array)[i];
        }
      }

      if (destructors !== null) {
        destructors.push(_t, allocatedPointer);
      }

      return allocatedPointer;
    },

    argPackAdvance: 8,
    readValueFromPointer: ZA,

    destructorFunction(pointer: number): void {
      _t(pointer);
    }
  });
}

function computeUtf8Length(str: string): number {
  let byteCount = 0;
  for (let i = 0; i < str.length; ++i) {
    let codePoint = str.charCodeAt(i);
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      codePoint = 0x10000 + ((codePoint & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    }
    if (codePoint <= 0x7F) {
      ++byteCount;
    } else {
      byteCount += codePoint <= 0x7FF ? 2 : codePoint <= 0xFFFF ? 3 : 4;
    }
  }
  return byteCount;
}

function writeUtf8ToMemory(str: string, buffer: Uint8Array, offset: number, maxBytes: number): void {
  if (maxBytes <= 0) return;

  const endOffset = offset + maxBytes - 1;
  for (let i = 0; i < str.length; ++i) {
    let codePoint = str.charCodeAt(i);
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      codePoint = 0x10000 + ((codePoint & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    }

    if (codePoint <= 0x7F) {
      if (offset >= endOffset) break;
      buffer[offset++] = codePoint;
    } else if (codePoint <= 0x7FF) {
      if (offset + 1 >= endOffset) break;
      buffer[offset++] = 0xC0 | (codePoint >> 6);
      buffer[offset++] = 0x80 | (codePoint & 0x3F);
    } else if (codePoint <= 0xFFFF) {
      if (offset + 2 >= endOffset) break;
      buffer[offset++] = 0xE0 | (codePoint >> 12);
      buffer[offset++] = 0x80 | ((codePoint >> 6) & 0x3F);
      buffer[offset++] = 0x80 | (codePoint & 0x3F);
    } else {
      if (offset + 3 >= endOffset) break;
      buffer[offset++] = 0xF0 | (codePoint >> 18);
      buffer[offset++] = 0x80 | ((codePoint >> 12) & 0x3F);
      buffer[offset++] = 0x80 | ((codePoint >> 6) & 0x3F);
      buffer[offset++] = 0x80 | (codePoint & 0x3F);
    }
  }
  buffer[offset] = 0;
}

declare const S: Int32Array;
declare const N: Uint8Array;
declare function CA(type: string): string;
declare function bA(typeId: number, registration: TypeRegistration): void;
declare function v(ptr: number, length: number): string;
declare function _t(ptr: number): void;
declare function yA(message: string): never;
declare function Kt(size: number): number;
declare function ZA(pointer: number): string;