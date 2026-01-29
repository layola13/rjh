interface WordArray {
  init(data?: ArrayBuffer | TypedArray | number[], sigBytes?: number): void;
  prototype: WordArray;
}

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

interface CryptoLib {
  WordArray: WordArray;
}

interface CryptoJS {
  lib: CryptoLib;
}

function extendWordArrayWithTypedArraySupport(cryptoJS: CryptoJS): WordArray {
  if (typeof ArrayBuffer !== "function") {
    return cryptoJS.lib.WordArray;
  }

  const wordArray = cryptoJS.lib.WordArray;
  const originalInit = wordArray.init;

  const enhancedInit = function (
    this: WordArray,
    data?: ArrayBuffer | TypedArray | number[],
    sigBytes?: number
  ): void {
    let processedData = data;

    if (processedData instanceof ArrayBuffer) {
      processedData = new Uint8Array(processedData);
    }

    if (
      processedData instanceof Int8Array ||
      (typeof Uint8ClampedArray !== "undefined" && processedData instanceof Uint8ClampedArray) ||
      processedData instanceof Int16Array ||
      processedData instanceof Uint16Array ||
      processedData instanceof Int32Array ||
      processedData instanceof Uint32Array ||
      processedData instanceof Float32Array ||
      processedData instanceof Float64Array
    ) {
      processedData = new Uint8Array(
        processedData.buffer,
        processedData.byteOffset,
        processedData.byteLength
      );
    }

    if (processedData instanceof Uint8Array) {
      const byteLength = processedData.byteLength;
      const words: number[] = [];

      for (let byteIndex = 0; byteIndex < byteLength; byteIndex++) {
        const wordIndex = byteIndex >>> 2;
        const shiftAmount = 24 - (byteIndex % 4) * 8;
        words[wordIndex] |= processedData[byteIndex] << shiftAmount;
      }

      originalInit.call(this, words, byteLength);
    } else {
      originalInit.apply(this, arguments as unknown as [number[], number?]);
    }
  };

  enhancedInit.prototype = wordArray;

  return cryptoJS.lib.WordArray;
}

export default extendWordArrayWithTypedArraySupport;