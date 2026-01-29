interface BooleanTypeDescriptor {
  name: string;
  fromWireType: (value: number) => boolean;
  toWireType: (destructors: unknown, value: boolean) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => boolean;
  destructorFunction: null;
}

interface TypedArray {
  [index: number]: number;
}

declare function sA(size: number): number;
declare function bA(exports: unknown, descriptor: BooleanTypeDescriptor): void;
declare function CA(name: string): string;
declare const k: TypedArray;
declare const M: TypedArray;
declare const F: TypedArray;

function registerBooleanType(
  exports: unknown,
  name: string,
  size: number,
  trueValue: number,
  falseValue: number
): void {
  const shift = sA(size);

  bA(exports, {
    name: CA(name),
    fromWireType: (value: number): boolean => {
      return !!value;
    },
    toWireType: (destructors: unknown, value: boolean): number => {
      return value ? trueValue : falseValue;
    },
    argPackAdvance: 8,
    readValueFromPointer: function (pointer: number): boolean {
      let typedArray: TypedArray;

      if (size === 1) {
        typedArray = k;
      } else if (size === 2) {
        typedArray = M;
      } else if (size === 4) {
        typedArray = F;
      } else {
        throw new TypeError(`Unknown boolean type size: ${name}`);
      }

      return this.fromWireType(typedArray[pointer >> shift]);
    },
    destructorFunction: null,
  });
}