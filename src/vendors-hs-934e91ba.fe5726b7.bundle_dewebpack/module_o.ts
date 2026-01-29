interface TypeRegistration {
  name: string;
  fromWireType: (value: unknown) => unknown;
  toWireType: (destructors: unknown, value: unknown) => unknown;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => unknown;
  destructorFunction: null;
}

function registerPrimitiveType(
  exports: unknown,
  rawType: unknown,
  embindModule: unknown
): void {
  const typeShift = sA(embindModule);
  
  bA(exports, {
    name: rawType = CA(rawType),
    fromWireType: function(value: unknown): unknown {
      return value;
    },
    toWireType: function(destructors: unknown, value: unknown): unknown {
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new TypeError(
          `Cannot convert "${bt(value)}" to ${this.name}`
        );
      }
      return value;
    },
    argPackAdvance: 8,
    readValueFromPointer: kt(rawType, typeShift),
    destructorFunction: null
  } as TypeRegistration);
}