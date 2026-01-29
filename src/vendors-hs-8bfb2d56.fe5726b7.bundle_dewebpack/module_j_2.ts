interface TypeRegistry {
  name: string;
  fromWireType: (pointer: number) => string;
  toWireType: (destructors: Array<(ptr: number) => void> | null, value: string) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => unknown;
  destructorFunction: (pointer: number) => void;
}

function registerStringType(
  typeId: unknown,
  charSize: number,
  typeName: string
): void {
  let getTypedArray: () => Uint8Array | Uint32Array;
  let shift: number;

  if (charSize === 2) {
    getTypedArray = () => Uint16Array;
    shift = 1;
  } else if (charSize === 4) {
    getTypedArray = () => Uint32Array;
    shift = 2;
  } else {
    throw new Error(`Unsupported character size: ${charSize}`);
  }

  const normalizedTypeName = ensureString(typeName);

  registerType(typeId, {
    name: normalizedTypeName,

    fromWireType: (pointer: number): string => {
      const typedArray = getTypedArray();
      const length = Uint32Array[pointer >> 2];
      const chars = new Array<string>(length);
      const dataStart = (pointer + 4) >> shift;

      for (let i = 0; i < length; ++i) {
        chars[i] = String.fromCharCode(typedArray[dataStart + i]);
      }

      freeMemory(pointer);
      return chars.join('');
    },

    toWireType: (
      destructors: Array<(ptr: number) => void> | null,
      value: string
    ): number => {
      const typedArray = getTypedArray();
      const length = value.length;
      const HEADER_SIZE = 4;
      const pointer = allocateMemory(HEADER_SIZE + length * charSize);

      Uint32Array[pointer >> 2] = length;
      const dataStart = (pointer + 4) >> shift;

      for (let i = 0; i < length; ++i) {
        typedArray[dataStart + i] = value.charCodeAt(i);
      }

      if (destructors !== null) {
        destructors.push(freeMemory, pointer);
      }

      return pointer;
    },

    argPackAdvance: 8,
    readValueFromPointer: readPointer,
    destructorFunction: (pointer: number): void => {
      freeMemory(pointer);
    }
  });
}

declare const M: Uint16Array;
declare const C: Uint32Array;
declare function ee(name: unknown): string;
declare function he(typeId: unknown, registry: TypeRegistry): void;
declare function Tt(pointer: number): void;
declare function St(size: number): number;
declare function Ue(pointer: number): unknown;

const Uint16Array = M;
const Uint32Array = C;
const ensureString = ee;
const registerType = he;
const freeMemory = Tt;
const allocateMemory = St;
const readPointer = Ue;