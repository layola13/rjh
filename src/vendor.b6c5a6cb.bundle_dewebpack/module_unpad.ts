/**
 * Removes PKCS#7 padding from the data by reading the last byte value
 * and reducing the signature bytes accordingly.
 * 
 * @param data - The word array data structure containing words and signature bytes
 */
function unpad(data: WordArray): void {
  const lastByteValue = 255 & data.words[(data.sigBytes - 1) >>> 2];
  data.sigBytes -= lastByteValue;
}

interface WordArray {
  words: number[];
  sigBytes: number;
}