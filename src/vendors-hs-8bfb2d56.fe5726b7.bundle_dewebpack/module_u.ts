interface EmscriptenType {
  name: string;
  fromWireType: (value: unknown) => unknown;
  toWireType: (destructor: unknown, value: unknown) => unknown;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => unknown;
  destructorFunction: null;
}

type FloatTypeSize = 2 | 3;

const FLOAT32_HEAP: Float32Array = A;
const FLOAT64_HEAP: Float64Array = D;

function registerFloatType(
  rawType: unknown,
  typeName: string,
  typeSize: number
): void {
  const normalizedTypeSize = normalizeTypeSize(typeSize);
  const finalTypeName = getInternalTypeName(typeName);

  registerType(rawType, {
    name: finalTypeName,
    
    fromWireType: function (value: unknown): unknown {
      return value;
    },
    
    toWireType: function (destructor: unknown, value: unknown): unknown {
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new TypeError(
          `Cannot convert "${getTypeName(value)}" to ${this.name}`
        );
      }
      return value;
    },
    
    argPackAdvance: 8,
    
    readValueFromPointer: createFloatReader(finalTypeName, normalizedTypeSize),
    
    destructorFunction: null,
  });
}

function createFloatReader(
  typeName: string,
  typeSize: number
): (pointer: number) => number {
  switch (typeSize as FloatTypeSize) {
    case 2:
      return function (pointer: number): number {
        return this.fromWireType(FLOAT32_HEAP[pointer >> 2]);
      };
    
    case 3:
      return function (pointer: number): number {
        return this.fromWireType(FLOAT64_HEAP[pointer >> 3]);
      };
    
    default:
      throw new TypeError(`Unknown float type: ${typeName}`);
  }
}