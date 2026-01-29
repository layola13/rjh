/**
 * Reads an IEEE 754 floating-point number from a byte array
 * @param buffer - The byte array to read from
 * @param offset - The starting position in the buffer
 * @param isLittleEndian - Whether to read in little-endian byte order
 * @param mantissaBits - Number of bits in the mantissa
 * @param totalBytes - Total number of bytes to read
 * @returns The decoded floating-point number
 */
export function read(
  buffer: number[] | Uint8Array,
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): number {
  const exponentBits = 8 * totalBytes - mantissaBits - 1;
  const maxExponent = (1 << exponentBits) - 1;
  const exponentBias = maxExponent >> 1;
  
  let bitShift = -7;
  let byteIndex = isLittleEndian ? totalBytes - 1 : 0;
  const indexIncrement = isLittleEndian ? -1 : 1;
  
  let currentByte = buffer[offset + byteIndex];
  byteIndex += indexIncrement;
  
  let exponent = currentByte & ((1 << -bitShift) - 1);
  currentByte >>= -bitShift;
  bitShift += exponentBits;
  
  while (bitShift > 0) {
    exponent = 256 * exponent + buffer[offset + byteIndex];
    byteIndex += indexIncrement;
    bitShift -= 8;
  }
  
  let mantissa = exponent & ((1 << -bitShift) - 1);
  exponent >>= -bitShift;
  bitShift += mantissaBits;
  
  while (bitShift > 0) {
    mantissa = 256 * mantissa + buffer[offset + byteIndex];
    byteIndex += indexIncrement;
    bitShift -= 8;
  }
  
  if (exponent === 0) {
    exponent = 1 - exponentBias;
  } else {
    if (exponent === maxExponent) {
      return mantissa ? NaN : (currentByte ? -1 : 1) * Infinity;
    }
    mantissa += Math.pow(2, mantissaBits);
    exponent -= exponentBias;
  }
  
  return (currentByte ? -1 : 1) * mantissa * Math.pow(2, exponent - mantissaBits);
}

/**
 * Writes an IEEE 754 floating-point number to a byte array
 * @param buffer - The byte array to write to
 * @param value - The floating-point number to encode
 * @param offset - The starting position in the buffer
 * @param isLittleEndian - Whether to write in little-endian byte order
 * @param mantissaBits - Number of bits in the mantissa
 * @param totalBytes - Total number of bytes to write
 */
export function write(
  buffer: number[] | Uint8Array,
  value: number,
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): void {
  const exponentBits = 8 * totalBytes - mantissaBits - 1;
  const maxExponent = (1 << exponentBits) - 1;
  const exponentBias = maxExponent >> 1;
  const roundingError = mantissaBits === 23 
    ? Math.pow(2, -24) - Math.pow(2, -77) 
    : 0;
  
  let byteIndex = isLittleEndian ? 0 : totalBytes - 1;
  const indexIncrement = isLittleEndian ? 1 : -1;
  const signBit = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  
  value = Math.abs(value);
  
  let exponent: number;
  let mantissa: number;
  
  if (isNaN(value) || value === Infinity) {
    mantissa = isNaN(value) ? 1 : 0;
    exponent = maxExponent;
  } else {
    exponent = Math.floor(Math.log(value) / Math.LN2);
    const scale = Math.pow(2, -exponent);
    
    if (value * scale < 1) {
      exponent--;
      scale *= 2;
    }
    
    const adjustedValue = exponent + exponentBias >= 1
      ? value + roundingError / scale
      : value + roundingError * Math.pow(2, 1 - exponentBias);
    
    if (adjustedValue * scale >= 2) {
      exponent++;
      scale /= 2;
    }
    
    if (exponent + exponentBias >= maxExponent) {
      mantissa = 0;
      exponent = maxExponent;
    } else if (exponent + exponentBias >= 1) {
      mantissa = (adjustedValue * scale - 1) * Math.pow(2, mantissaBits);
      exponent += exponentBias;
    } else {
      mantissa = adjustedValue * Math.pow(2, exponentBias - 1) * Math.pow(2, mantissaBits);
      exponent = 0;
    }
  }
  
  let remainingMantissaBits = mantissaBits;
  while (remainingMantissaBits >= 8) {
    buffer[offset + byteIndex] = mantissa & 0xff;
    byteIndex += indexIncrement;
    mantissa /= 256;
    remainingMantissaBits -= 8;
  }
  
  exponent = (exponent << remainingMantissaBits) | mantissa;
  let remainingExponentBits = exponentBits + remainingMantissaBits;
  
  while (remainingExponentBits > 0) {
    buffer[offset + byteIndex] = exponent & 0xff;
    byteIndex += indexIncrement;
    exponent /= 256;
    remainingExponentBits -= 8;
  }
  
  buffer[offset + byteIndex - indexIncrement] |= 128 * signBit;
}