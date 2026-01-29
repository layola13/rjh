interface TypedArrayConstructor {
  new (buffer: ArrayBufferLike, byteOffset: number, length: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
}

interface EmscriptenTypeInfo {
  name: string;
  fromWireType: (pointer: number) => TypedArray;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => TypedArray;
}

interface EmscriptenTypeOptions {
  ignoreDuplicateRegistrations: boolean;
}

type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

declare const S: Uint32Array;
declare const b: ArrayBufferLike;
declare function bA(typeId: number, typeInfo: EmscriptenTypeInfo, options: EmscriptenTypeOptions): void;
declare function CA(name: string): string;

function registerTypedArrayType(
  typeId: number,
  typedArrayIndex: number,
  typeName: string
): void {
  const TYPED_ARRAY_CONSTRUCTORS: readonly TypedArrayConstructor[] = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ] as const;

  const TypedArrayConstructor = TYPED_ARRAY_CONSTRUCTORS[typedArrayIndex];

  function fromWireType(pointer: number): TypedArray {
    const heap = S;
    const length = heap[pointer >>> 2];
    const byteOffset = heap[pointer + 1];
    return new TypedArrayConstructor(b, byteOffset, length);
  }

  bA(
    typeId,
    {
      name: CA(typeName),
      fromWireType,
      argPackAdvance: 8,
      readValueFromPointer: fromWireType
    },
    {
      ignoreDuplicateRegistrations: true
    }
  );
}