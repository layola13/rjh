interface BooleanTypeDescriptor {
  name: string;
  fromWireType: (value: number) => boolean;
  toWireType: (destructors: unknown, value: boolean) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => boolean;
  destructorFunction: null;
}

function registerBooleanType(
  exports: unknown,
  rawTypeName: string,
  size: number,
  trueValue: number,
  falseValue: number
): void {
  const shift = calculateShiftFromSize(size);
  const typeName = readLatin1String(rawTypeName);

  const descriptor: BooleanTypeDescriptor = {
    name: typeName,
    
    fromWireType(value: number): boolean {
      return !!value;
    },
    
    toWireType(_destructors: unknown, value: boolean): number {
      return value ? trueValue : falseValue;
    },
    
    argPackAdvance: 8,
    
    readValueFromPointer(pointer: number): boolean {
      let heap: Int8Array | Int16Array | Int32Array;
      
      if (size === 1) {
        heap = HEAP8;
      } else if (size === 2) {
        heap = HEAP16;
      } else if (size === 4) {
        heap = HEAP32;
      } else {
        throw new TypeError(`Unknown boolean type size: ${typeName}`);
      }
      
      return this.fromWireType(heap[pointer >> shift]);
    },
    
    destructorFunction: null
  };

  registerType(exports, descriptor);
}

declare const HEAP8: Int8Array;
declare const HEAP16: Int16Array;
declare const HEAP32: Int32Array;

declare function calculateShiftFromSize(size: number): number;
declare function readLatin1String(pointer: string): string;
declare function registerType(exports: unknown, descriptor: BooleanTypeDescriptor): void;