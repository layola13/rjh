interface TypeDescriptor {
  name: string;
  fromWireType: (value: number) => number;
  toWireType: (destructors: unknown, value: unknown) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => number;
  destructorFunction: null;
}

function registerIntegerType(
  typeId: unknown,
  typeName: string,
  byteSize: number,
  minValue: number,
  maxValue: number = 4294967295
): void {
  const canonicalName = convertToCanonicalTypeName(typeName);
  const shift = 32 - 8 * byteSize;

  const transformValue = (value: number): number => {
    return shift === 0 ? value : (value << shift) >>> shift;
  };

  const isUnsigned = canonicalName.indexOf("unsigned") !== -1;
  const alignment = getTypeAlignment(byteSize);

  registerType(typeId, {
    name: canonicalName,
    fromWireType: transformValue,
    toWireType: (destructors: unknown, value: unknown): number => {
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new TypeError(
          `Cannot convert "${getTypeName(value)}" to ${canonicalName}`
        );
      }

      if (value < minValue || value > maxValue) {
        throw new TypeError(
          `Passing a number "${getTypeName(value)}" from JS side to C/C++ side to an argument of type "${canonicalName}", which is outside the valid range [${minValue}, ${maxValue}]!`
        );
      }

      return isUnsigned ? value >>> 0 : value | 0;
    },
    argPackAdvance: 8,
    readValueFromPointer: createIntegerReader(
      canonicalName,
      alignment,
      minValue !== 0
    ),
    destructorFunction: null
  });
}

declare function convertToCanonicalTypeName(name: string): string;
declare function getTypeAlignment(size: number): number;
declare function registerType(id: unknown, descriptor: TypeDescriptor): void;
declare function getTypeName(value: unknown): string;
declare function createIntegerReader(
  name: string,
  alignment: number,
  isSigned: boolean
): (pointer: number) => number;