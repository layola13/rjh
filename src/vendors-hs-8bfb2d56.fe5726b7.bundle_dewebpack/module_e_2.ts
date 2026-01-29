interface TypedArrayConstructor {
  new (buffer: ArrayBufferLike, byteOffset: number, length: number): 
    | Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;
}

interface EmscriptenHeap {
  buffer: ArrayBufferLike;
  [index: number]: number;
}

interface TypeRegistration {
  name: string;
  fromWireType: (pointer: number) => TypedArray;
  argPackAdvance: number;
  readValueFromPointer: (pointer: number) => TypedArray;
}

interface TypeRegistrationOptions {
  ignoreDuplicateRegistrations?: boolean;
}

type TypedArray = 
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

declare const C: EmscriptenHeap;
declare function he(
  handle: unknown,
  registration: TypeRegistration,
  options: TypeRegistrationOptions
): void;
declare function ee(name: string): string;

export function registerTypedArray(
  handle: unknown,
  typeIndex: number,
  rawName: string
): void {
  const TYPED_ARRAY_CONSTRUCTORS: TypedArrayConstructor[] = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ];

  const TypedArrayClass = TYPED_ARRAY_CONSTRUCTORS[typeIndex];

  function fromWireType(pointer: number): TypedArray {
    const heap = C;
    const length = heap[pointer >>> 2];
    const byteOffset = heap[pointer + 1];
    return new TypedArrayClass(heap.buffer, byteOffset, length);
  }

  const normalizedName = ee(rawName);

  he(
    handle,
    {
      name: normalizedName,
      fromWireType,
      argPackAdvance: 8,
      readValueFromPointer: fromWireType,
    },
    {
      ignoreDuplicateRegistrations: true,
    }
  );
}