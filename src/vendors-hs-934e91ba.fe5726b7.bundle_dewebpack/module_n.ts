interface EmscriptenModule {
  name: string;
  fromWireType: (ptr: number) => string;
  toWireType: (destructors: Destructor[] | null, value: string) => number;
  argPackAdvance: number;
  readValueFromPointer: (ptr: number) => unknown;
  destructorFunction: (ptr: number) => void;
}

type Destructor = (ptr: number) => void;

type StringDecoder = (ptr: number, length: number) => string;
type StringEncoder = (str: string, ptr: number, maxLength: number) => void;
type StringLengthCalculator = (str: string) => number;
type HeapAccessor = () => Uint8Array | Uint16Array | Uint32Array;

function registerCppStringType(
  registrar: (config: EmscriptenModule) => void,
  charSize: number,
  moduleName: unknown
): void {
  const normalizedName = CA(moduleName);

  let decoder: StringDecoder;
  let encoder: StringEncoder;
  let lengthCalculator: StringLengthCalculator;
  let heapAccessor: HeapAccessor;
  let shiftAmount: number;

  if (charSize === 2) {
    decoder = K;
    encoder = x;
    lengthCalculator = _;
    heapAccessor = () => R;
    shiftAmount = 1;
  } else if (charSize === 4) {
    decoder = Y;
    encoder = L;
    lengthCalculator = J;
    heapAccessor = () => S;
    shiftAmount = 2;
  } else {
    throw new Error(`Unsupported character size: ${charSize}`);
  }

  registrar({
    name: normalizedName,

    fromWireType(ptr: number): string {
      const heap = heapAccessor();
      const stringLength = S[ptr >> 2];
      let result: string | undefined;
      let currentPos = ptr + 4;

      for (let i = 0; i <= stringLength; ++i) {
        const charPtr = ptr + 4 + i * charSize;

        if (i === stringLength || heap[charPtr >> shiftAmount] === 0) {
          const segment = decoder(currentPos, charPtr - currentPos);

          if (result === undefined) {
            result = segment;
          } else {
            result += String.fromCharCode(0);
            result += segment;
          }

          currentPos = charPtr + charSize;
        }
      }

      _t(ptr);
      return result!;
    },

    toWireType(destructors: Destructor[] | null, value: string): number {
      if (typeof value !== "string") {
        yA(`Cannot pass non-string to C++ string type ${normalizedName}`);
      }

      const byteLength = lengthCalculator(value);
      const ptr = Kt(4 + byteLength + charSize);

      S[ptr >> 2] = byteLength >> shiftAmount;
      encoder(value, ptr + 4, byteLength + charSize);

      if (destructors !== null) {
        destructors.push(_t, ptr);
      }

      return ptr;
    },

    argPackAdvance: 8,
    readValueFromPointer: ZA,

    destructorFunction(ptr: number): void {
      _t(ptr);
    }
  });
}

export { registerCppStringType };