interface WireTypeConfig {
  name: string;
  fromWireType: (pointer: number) => string;
  toWireType: (destructors: Array<(ptr: number) => void> | null, value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => string;
  destructorFunction: (pointer: number) => void;
}

function registerStringType(typeId: number, rawTypeName: number): void {
  const typeName = getTypeName(rawTypeName);
  const isStdString = typeName === "std::string";

  registerType(typeId, {
    name: typeName,
    
    fromWireType: (pointer: number): string => {
      const length = HEAP32[pointer >> 2];
      
      if (isStdString) {
        const nullTerminator = HEAPU8[pointer + 4 + length];
        let savedByte = 0;
        
        if (nullTerminator !== 0) {
          savedByte = nullTerminator;
          HEAPU8[pointer + 4 + length] = 0;
        }
        
        let startOffset = pointer + 4;
        let result: string | undefined;
        
        for (let i = 0; i <= length; ++i) {
          const currentByte = pointer + 4 + i;
          
          if (HEAPU8[currentByte] === 0) {
            const segment = UTF8ToString(startOffset);
            result = result === undefined 
              ? segment 
              : result + String.fromCharCode(0) + segment;
            startOffset = currentByte + 1;
          }
        }
        
        if (savedByte !== 0) {
          HEAPU8[pointer + 4 + length] = savedByte;
        }
        
        result = result as string;
      } else {
        const charArray = new Array<string>(length);
        for (let i = 0; i < length; ++i) {
          charArray[i] = String.fromCharCode(HEAPU8[pointer + 4 + i]);
        }
        result = charArray.join("");
      }
      
      free(pointer);
      return result;
    },
    
    toWireType: (destructors: Array<(ptr: number) => void> | null, value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array): number => {
      let normalizedValue: string | Uint8Array = value instanceof ArrayBuffer 
        ? new Uint8Array(value) 
        : value;
      
      const isString = typeof normalizedValue === "string";
      
      if (!isString && 
          !(normalizedValue instanceof Uint8Array) && 
          !(normalizedValue instanceof Uint8ClampedArray) && 
          !(normalizedValue instanceof Int8Array)) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      
      const byteLength = (isStdString && isString)
        ? getUTF8Length(normalizedValue as string)
        : (normalizedValue as Uint8Array | string).length;
      
      const pointer = allocate(4 + byteLength + 1);
      HEAP32[pointer >> 2] = byteLength;
      
      if (isStdString && isString) {
        stringToUTF8(normalizedValue as string, pointer + 4, byteLength + 1);
      } else if (isString) {
        for (let i = 0; i < byteLength; ++i) {
          const charCode = (normalizedValue as string).charCodeAt(i);
          if (charCode > 255) {
            free(pointer);
            throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
          }
          HEAPU8[pointer + 4 + i] = charCode;
        }
      } else {
        for (let i = 0; i < byteLength; ++i) {
          HEAPU8[pointer + 4 + i] = (normalizedValue as Uint8Array)[i];
        }
      }
      
      if (destructors !== null) {
        destructors.push(free, pointer);
      }
      
      return pointer;
    },
    
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    
    destructorFunction: (pointer: number): void => {
      free(pointer);
    }
  });
}

function getUTF8Length(str: string): number {
  let length = 0;
  
  for (let i = 0; i < str.length; ++i) {
    let charCode = str.charCodeAt(i);
    
    if (charCode >= 0xD800 && charCode <= 0xDFFF) {
      charCode = 0x10000 + ((charCode & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    }
    
    if (charCode <= 0x7F) {
      ++length;
    } else {
      length += charCode <= 0x7FF ? 2 : (charCode <= 0xFFFF ? 3 : 4);
    }
  }
  
  return length;
}

function stringToUTF8(str: string, outPtr: number, maxBytes: number): void {
  if (maxBytes > 0) {
    const endPtr = outPtr + maxBytes - 1;
    let writeIndex = outPtr;
    
    for (let i = 0; i < str.length; ++i) {
      let charCode = str.charCodeAt(i);
      
      if (charCode >= 0xD800 && charCode <= 0xDFFF) {
        charCode = 0x10000 + ((charCode & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
      }
      
      if (charCode <= 0x7F) {
        if (writeIndex >= endPtr) break;
        HEAPU8[writeIndex++] = charCode;
      } else if (charCode <= 0x7FF) {
        if (writeIndex + 1 >= endPtr) break;
        HEAPU8[writeIndex++] = 0xC0 | (charCode >> 6);
        HEAPU8[writeIndex++] = 0x80 | (charCode & 0x3F);
      } else if (charCode <= 0xFFFF) {
        if (writeIndex + 2 >= endPtr) break;
        HEAPU8[writeIndex++] = 0xE0 | (charCode >> 12);
        HEAPU8[writeIndex++] = 0x80 | ((charCode >> 6) & 0x3F);
        HEAPU8[writeIndex++] = 0x80 | (charCode & 0x3F);
      } else {
        if (writeIndex + 3 >= endPtr) break;
        HEAPU8[writeIndex++] = 0xF0 | (charCode >> 18);
        HEAPU8[writeIndex++] = 0x80 | ((charCode >> 12) & 0x3F);
        HEAPU8[writeIndex++] = 0x80 | ((charCode >> 6) & 0x3F);
        HEAPU8[writeIndex++] = 0x80 | (charCode & 0x3F);
      }
    }
    
    HEAPU8[writeIndex] = 0;
  }
}

declare const HEAP32: Int32Array;
declare const HEAPU8: Uint8Array;
declare function getTypeName(typeId: number): string;
declare function registerType(typeId: number, config: WireTypeConfig): void;
declare function UTF8ToString(ptr: number): string;
declare function free(ptr: number): void;
declare function allocate(size: number): number;
declare function simpleReadValueFromPointer(ptr: number): string;
declare function throwBindingError(message: string): never;