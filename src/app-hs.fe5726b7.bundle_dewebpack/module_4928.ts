interface IEEE754 {
  read(
    buffer: Uint8Array | number[],
    offset: number,
    isLittleEndian: boolean,
    mantissaLength: number,
    byteLength: number
  ): number;
  
  write(
    buffer: Uint8Array | number[],
    value: number,
    offset: number,
    isLittleEndian: boolean,
    mantissaLength: number,
    byteLength: number
  ): void;
}

const BITS_PER_BYTE = 8;
const BYTE_MASK = 255;
const BASE_256 = 256;

export const ieee754: IEEE754 = {
  read(
    buffer: Uint8Array | number[],
    offset: number,
    isLittleEndian: boolean,
    mantissaLength: number,
    byteLength: number
  ): number {
    let exponent: number;
    let mantissa: number;
    
    const exponentBits = BITS_PER_BYTE * byteLength - mantissaLength - 1;
    const exponentMax = (1 << exponentBits) - 1;
    const exponentBias = exponentMax >> 1;
    
    let bitShift = -7;
    let byteIndex = isLittleEndian ? byteLength - 1 : 0;
    const byteStep = isLittleEndian ? -1 : 1;
    
    let currentByte = buffer[offset + byteIndex];
    byteIndex += byteStep;
    
    exponent = currentByte & ((1 << -bitShift) - 1);
    currentByte >>= -bitShift;
    bitShift += exponentBits;
    
    while (bitShift > 0) {
      exponent = BASE_256 * exponent + buffer[offset + byteIndex];
      byteIndex += byteStep;
      bitShift -= BITS_PER_BYTE;
    }
    
    mantissa = exponent & ((1 << -bitShift) - 1);
    exponent >>= -bitShift;
    bitShift += mantissaLength;
    
    while (bitShift > 0) {
      mantissa = BASE_256 * mantissa + buffer[offset + byteIndex];
      byteIndex += byteStep;
      bitShift -= BITS_PER_BYTE;
    }
    
    if (exponent === 0) {
      exponent = 1 - exponentBias;
    } else if (exponent === exponentMax) {
      return mantissa ? NaN : (currentByte ? -1 : 1) * Infinity;
    } else {
      mantissa += Math.pow(2, mantissaLength);
      exponent -= exponentBias;
    }
    
    return (currentByte ? -1 : 1) * mantissa * Math.pow(2, exponent - mantissaLength);
  },

  write(
    buffer: Uint8Array | number[],
    value: number,
    offset: number,
    isLittleEndian: boolean,
    mantissaLength: number,
    byteLength: number
  ): void {
    let exponent: number;
    let mantissa: number;
    
    const exponentBits = BITS_PER_BYTE * byteLength - mantissaLength - 1;
    const exponentMax = (1 << exponentBits) - 1;
    const exponentBias = exponentMax >> 1;
    const roundingError = mantissaLength === 23 
      ? Math.pow(2, -24) - Math.pow(2, -77) 
      : 0;
    
    let byteIndex = isLittleEndian ? 0 : byteLength - 1;
    const byteStep = isLittleEndian ? 1 : -1;
    const sign = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    
    value = Math.abs(value);
    
    if (isNaN(value) || value === Infinity) {
      mantissa = isNaN(value) ? 1 : 0;
      exponent = exponentMax;
    } else {
      exponent = Math.floor(Math.log(value) / Math.LN2);
      let scale = Math.pow(2, -exponent);
      
      if (value * scale < 1) {
        exponent--;
        scale *= 2;
      }
      
      const adjustment = exponent + exponentBias >= 1 
        ? roundingError / scale 
        : roundingError * Math.pow(2, 1 - exponentBias);
      
      if ((value + adjustment) * scale >= 2) {
        exponent++;
        scale /= 2;
      }
      
      if (exponent + exponentBias >= exponentMax) {
        mantissa = 0;
        exponent = exponentMax;
      } else if (exponent + exponentBias >= 1) {
        mantissa = (value * scale - 1) * Math.pow(2, mantissaLength);
        exponent += exponentBias;
      } else {
        mantissa = value * Math.pow(2, exponentBias - 1) * Math.pow(2, mantissaLength);
        exponent = 0;
      }
    }
    
    let remainingMantissaBits = mantissaLength;
    while (remainingMantissaBits >= BITS_PER_BYTE) {
      buffer[offset + byteIndex] = mantissa & BYTE_MASK;
      byteIndex += byteStep;
      mantissa /= BASE_256;
      remainingMantissaBits -= BITS_PER_BYTE;
    }
    
    exponent = (exponent << remainingMantissaBits) | mantissa;
    let remainingExponentBits = exponentBits + remainingMantissaBits;
    
    while (remainingExponentBits > 0) {
      buffer[offset + byteIndex] = exponent & BYTE_MASK;
      byteIndex += byteStep;
      exponent /= BASE_256;
      remainingExponentBits -= BITS_PER_BYTE;
    }
    
    buffer[offset + byteIndex - byteStep] |= sign * 128;
  }
};