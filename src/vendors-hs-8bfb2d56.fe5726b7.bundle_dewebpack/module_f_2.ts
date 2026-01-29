interface TypeDescriptor {
  name: string;
  fromWireType: (value: number) => number;
  toWireType: (destructors: unknown, value: unknown) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => number;
  destructorFunction: null;
}

type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;

declare const x: Int8Array;
declare const P: Uint8Array;
declare const E: Int16Array;
declare const M: Uint16Array;
declare const O: Int32Array;
declare const C: Uint32Array;

declare function ee(typeName: string): string;
declare function J(size: number): number;
declare function he(registry: unknown, descriptor: TypeDescriptor): void;
declare function ct(value: unknown): string;

const MAX_UINT32 = 4294967295;
const BITS_PER_BYTE = 8;
const SHIFT_OFFSET_32 = 32;

function registerIntegerType(
  registry: unknown,
  typeName: string,
  size: number,
  minValue: number,
  maxValue: number = MAX_UINT32
): void {
  const normalizedTypeName = ee(typeName);
  const alignedSize = J(size);
  
  let bitShiftOffset: number;
  let normalizeValue: (value: number) => number = (value) => value;
  
  if (minValue === 0) {
    bitShiftOffset = SHIFT_OFFSET_32 - BITS_PER_BYTE * size;
    normalizeValue = (value: number) => (value << bitShiftOffset) >>> bitShiftOffset;
  }
  
  const isUnsigned = typeName.indexOf("unsigned") !== -1;
  
  const readValueFromPointer = createPointerReader(
    normalizedTypeName,
    alignedSize,
    minValue !== 0
  );
  
  he(registry, {
    name: normalizedTypeName,
    fromWireType: normalizeValue,
    toWireType: (destructors: unknown, value: unknown): number => {
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new TypeError(
          `Cannot convert "${ct(value)}" to ${normalizedTypeName}`
        );
      }
      
      if (value < minValue || value > maxValue) {
        throw new TypeError(
          `Passing a number "${ct(value)}" from JS side to C/C++ side to an argument of type "${normalizedTypeName}", which is outside the valid range [${minValue}, ${maxValue}]!`
        );
      }
      
      return isUnsigned ? value >>> 0 : value | 0;
    },
    argPackAdvance: 8,
    readValueFromPointer,
    destructorFunction: null
  });
}

function createPointerReader(
  typeName: string,
  alignedSize: number,
  isSigned: boolean
): (pointer: number) => number {
  switch (alignedSize) {
    case 0:
      return isSigned
        ? (pointer: number) => x[pointer]
        : (pointer: number) => P[pointer];
    
    case 1:
      return isSigned
        ? (pointer: number) => E[pointer >> 1]
        : (pointer: number) => M[pointer >> 1];
    
    case 2:
      return isSigned
        ? (pointer: number) => O[pointer >> 2]
        : (pointer: number) => C[pointer >> 2];
    
    default:
      throw new TypeError(`Unknown integer type: ${typeName}`);
  }
}