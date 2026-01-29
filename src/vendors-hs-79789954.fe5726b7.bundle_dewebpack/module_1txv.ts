/**
 * Reads an IEEE 754 floating-point number from a byte array
 * @param buffer - The byte array to read from
 * @param offset - The offset in the buffer to start reading
 * @param isLittleEndian - Whether to use little-endian byte order
 * @param mantissaLength - The number of bits in the mantissa
 * @param byteLength - The total number of bytes to read
 * @returns The decoded floating-point number
 */
export function read(
  buffer: Uint8Array | number[],
  offset: number,
  isLittleEndian: boolean,
  mantissaLength: number,
  byteLength: number
): number {
  let exponent: number;
  let mantissa: number;
  
  const exponentLength = 8 * byteLength - mantissaLength - 1;
  const maxExponent = (1 << exponentLength) - 1;
  const exponentBias = maxExponent >> 1;
  
  let bitShift = -7;
  let index = isLittleEndian ? byteLength - 1 : 0;
  const indexDirection = isLittleEndian ? -1 : 1;
  
  let currentByte = buffer[offset + index];
  
  index += indexDirection;
  exponent = currentByte & ((1 << -bitShift) - 1);
  currentByte >>= -bitShift;
  bitShift += exponentLength;
  
  while (bitShift > 0) {
    exponent = 256 * exponent + buffer[offset + index];
    index += indexDirection;
    bitShift -= 8;
  }
  
  mantissa = exponent & ((1 << -bitShift) - 1);
  exponent >>= -bitShift;
  bitShift += mantissaLength;
  
  while (bitShift > 0) {
    mantissa = 256 * mantissa + buffer[offset + index];
    index += indexDirection;
    bitShift -= 8;
  }
  
  if (exponent === 0) {
    exponent = 1 - exponentBias;
  } else if (exponent === maxExponent) {
    return mantissa ? NaN : (currentByte ? -1 : 1) * Infinity;
  } else {
    mantissa += Math.pow(2, mantissaLength);
    exponent -= exponentBias;
  }
  
  return (currentByte ? -1 : 1) * mantissa * Math.pow(2, exponent - mantissaLength);
}

/**
 * Writes an IEEE 754 floating-point number to a byte array
 * @param buffer - The byte array to write to
 * @param value - The floating-point value to encode
 * @param offset - The offset in the buffer to start writing
 * @param isLittleEndian - Whether to use little-endian byte order
 * @param mantissaLength - The number of bits in the mantissa
 * @param byteLength - The total number of bytes to write
 */
export function write(
  buffer: Uint8Array | number[],
  value: number,
  offset: number,
  isLittleEndian: boolean,
  mantissaLength: number,
  byteLength: number
): void {
  let exponent: number;
  let mantissa: number;
  let coefficient: number;
  
  const exponentLength = 8 * byteLength - mantissaLength - 1;
  const maxExponent = (1 << exponentLength) - 1;
  const exponentBias = maxExponent >> 1;
  const roundingError = mantissaLength === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  
  let index = isLittleEndian ? 0 : byteLength - 1;
  const indexDirection = isLittleEndian ? 1 : -1;
  const signBit = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  
  value = Math.abs(value);
  
  if (isNaN(value) || value === Infinity) {
    mantissa = isNaN(value) ? 1 : 0;
    exponent = maxExponent;
  } else {
    exponent = Math.floor(Math.log(value) / Math.LN2);
    coefficient = Math.pow(2, -exponent);
    
    if (value * coefficient < 1) {
      exponent--;
      coefficient *= 2;
    }
    
    if (exponent + exponentBias >= 1) {
      value += roundingError / coefficient;
    } else {
      value += roundingError * Math.pow(2, 1 - exponentBias);
    }
    
    if (value * coefficient >= 2) {
      exponent++;
      coefficient /= 2;
    }
    
    if (exponent + exponentBias >= maxExponent) {
      mantissa = 0;
      exponent = maxExponent;
    } else if (exponent + exponentBias >= 1) {
      mantissa = (value * coefficient - 1) * Math.pow(2, mantissaLength);
      exponent += exponentBias;
    } else {
      mantissa = value * Math.pow(2, exponentBias - 1) * Math.pow(2, mantissaLength);
      exponent = 0;
    }
  }
  
  let remainingMantissaBits = mantissaLength;
  while (remainingMantissaBits >= 8) {
    buffer[offset + index] = mantissa & 0xff;
    index += indexDirection;
    mantissa /= 256;
    remainingMantissaBits -= 8;
  }
  
  exponent = (exponent << remainingMantissaBits) | mantissa;
  let remainingExponentBits = exponentLength + remainingMantissaBits;
  
  while (remainingExponentBits > 0) {
    buffer[offset + index] = exponent & 0xff;
    index += indexDirection;
    exponent /= 256;
    remainingExponentBits -= 8;
  }
  
  buffer[offset + index - indexDirection] |= 128 * signBit;
}