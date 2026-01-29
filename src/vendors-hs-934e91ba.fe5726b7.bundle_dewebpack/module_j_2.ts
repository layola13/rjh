interface EmscriptenType {
  name: string;
  constructor: EnumConstructor;
  fromWireType: (value: number) => EnumValue;
  toWireType: (destructors: unknown, value: EnumValue) => number;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => EnumValue;
  destructorFunction: null;
}

interface EnumConstructor {
  values: Record<number, EnumValue>;
}

interface EnumValue {
  value: number;
}

function registerEnumType(
  rawType: unknown,
  name: string,
  shift: number,
  isSigned: boolean
): void {
  const size = sA(shift);

  class EnumClass {
    static values: Record<number, EnumValue> = {};
  }

  const normalizedName = CA(name);

  bA(rawType, {
    name: normalizedName,
    constructor: EnumClass,
    fromWireType(wireValue: number): EnumValue {
      return this.constructor.values[wireValue];
    },
    toWireType(_destructors: unknown, enumValue: EnumValue): number {
      return enumValue.value;
    },
    argPackAdvance: 8,
    readValueFromPointer: Dt(normalizedName, size, isSigned),
    destructorFunction: null,
  });

  OA(normalizedName, EnumClass);
}