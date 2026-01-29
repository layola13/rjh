export const INT_BITS = 32;
export const INT_MAX = 2147483647;
export const INT_MIN = -1 << 31;

/**
 * Returns the sign of a number: 1 if positive, -1 if negative, 0 if zero
 */
export function sign(value: number): number {
    return (value > 0 ? 1 : 0) - (value < 0 ? 1 : 0);
}

/**
 * Returns the absolute value of a number using bitwise operations
 */
export function abs(value: number): number {
    const mask = value >> 31;
    return (value ^ mask) - mask;
}

/**
 * Returns the minimum of two numbers using bitwise operations
 */
export function min(a: number, b: number): number {
    return b ^ ((a ^ b) & -(a < b ? 1 : 0));
}

/**
 * Returns the maximum of two numbers using bitwise operations
 */
export function max(a: number, b: number): number {
    return a ^ ((a ^ b) & -(a < b ? 1 : 0));
}

/**
 * Checks if a number is a power of 2
 */
export function isPow2(value: number): boolean {
    return !(value & (value - 1) || !value);
}

/**
 * Calculates the base-2 logarithm of a number (floor)
 */
export function log2(value: number): number {
    let result: number;
    let shift: number;
    
    result = (value > 65535 ? 1 : 0) << 4;
    result |= shift = ((value >>>= result) > 255 ? 1 : 0) << 3;
    result |= shift = ((value >>>= shift) > 15 ? 1 : 0) << 2;
    result |= shift = ((value >>>= shift) > 3 ? 1 : 0) << 1;
    
    return result | ((value >>>= shift) >> 1);
}

/**
 * Calculates the base-10 logarithm of a number (floor)
 */
export function log10(value: number): number {
    return value >= 1000000000 ? 9 :
           value >= 100000000 ? 8 :
           value >= 10000000 ? 7 :
           value >= 1000000 ? 6 :
           value >= 100000 ? 5 :
           value >= 10000 ? 4 :
           value >= 1000 ? 3 :
           value >= 100 ? 2 :
           value >= 10 ? 1 : 0;
}

/**
 * Counts the number of set bits (population count/Hamming weight)
 */
export function popCount(value: number): number {
    value -= (value >>> 1) & 1431655765;
    value = (value & 858993459) + ((value >>> 2) & 858993459);
    return (16843009 * ((value + (value >>> 4)) & 252645135)) >>> 24;
}

/**
 * Counts the number of trailing zero bits
 */
export function countTrailingZeros(value: number): number {
    let count = 32;
    value &= -value;
    
    if (value) count--;
    if (value & 65535) count -= 16;
    if (value & 252645135) count -= 8;
    if (value & 858993459) count -= 4;
    if (value & 1431655765) count -= 2;
    if (value & 1431655765) count -= 1;
    
    return count;
}

/**
 * Returns the next power of 2 greater than or equal to the input
 */
export function nextPow2(value: number): number {
    value += (value === 0 ? 1 : 0);
    value--;
    value |= value >>> 1;
    value |= value >>> 2;
    value |= value >>> 4;
    value |= value >>> 8;
    value |= value >>> 16;
    
    return value + 1;
}

/**
 * Returns the previous power of 2 less than or equal to the input
 */
export function prevPow2(value: number): number {
    value |= value >>> 1;
    value |= value >>> 2;
    value |= value >>> 4;
    value |= value >>> 8;
    value |= value >>> 16;
    
    return value - (value >>> 1);
}

/**
 * Calculates the parity (odd/even number of set bits)
 */
export function parity(value: number): number {
    value ^= value >>> 16;
    value ^= value >>> 8;
    value ^= value >>> 4;
    value &= 15;
    
    return (27030 >>> value) & 1;
}

const REVERSE_TABLE = new Array<number>(256);

(function initReverseTable(table: number[]): void {
    for (let i = 0; i < 256; ++i) {
        let original = i;
        let reversed = i;
        let shift = 7;
        
        for (original >>>= 1; original; original >>>= 1) {
            reversed <<= 1;
            reversed |= original & 1;
            --shift;
        }
        
        table[i] = (reversed << shift) & 255;
    }
})(REVERSE_TABLE);

/**
 * Reverses the bits in a 32-bit integer
 */
export function reverse(value: number): number {
    return (REVERSE_TABLE[value & 255] << 24) |
           (REVERSE_TABLE[(value >>> 8) & 255] << 16) |
           (REVERSE_TABLE[(value >>> 16) & 255] << 8) |
           REVERSE_TABLE[(value >>> 24) & 255];
}

/**
 * Interleaves two 16-bit integers into a 32-bit Morton code
 */
export function interleave2(x: number, y: number): number {
    x &= 65535;
    x = (x | (x << 8)) & 16711935;
    x = (x | (x << 4)) & 252645135;
    x = (x | (x << 2)) & 858993459;
    x = (x | (x << 1)) & 1431655765;
    
    y &= 65535;
    y = (y | (y << 8)) & 16711935;
    y = (y | (y << 4)) & 252645135;
    y = (y | (y << 2)) & 858993459;
    y = (y | (y << 1)) & 1431655765;
    
    return x | (y << 1);
}

/**
 * Deinterleaves a 32-bit Morton code to extract one component
 */
export function deinterleave2(value: number, component: number): number {
    value = (value >>> component) & 1431655765;
    value = (value | (value >>> 1)) & 858993459;
    value = (value | (value >>> 2)) & 252645135;
    value = (value | (value >>> 4)) & 16711935;
    value = (value | (value >>> 16)) & 65535;
    
    return (value << 16) >> 16;
}

/**
 * Interleaves three 10-bit integers into a 30-bit Morton code
 */
export function interleave3(x: number, y: number, z: number): number {
    x &= 1023;
    x = (x | (x << 16)) & 4278190335;
    x = (x | (x << 8)) & 251719695;
    x = (x | (x << 4)) & 3272356035;
    x = (x | (x << 2)) & 1227133513;
    
    y &= 1023;
    y = (y | (y << 16)) & 4278190335;
    y = (y | (y << 8)) & 251719695;
    y = (y | (y << 4)) & 3272356035;
    y = (y | (y << 2)) & 1227133513;
    
    z &= 1023;
    z = (z | (z << 16)) & 4278190335;
    z = (z | (z << 8)) & 251719695;
    z = (z | (z << 4)) & 3272356035;
    z = (z | (z << 2)) & 1227133513;
    
    return x | (y << 1) | (z << 2);
}

/**
 * Deinterleaves a 30-bit Morton code to extract one component
 */
export function deinterleave3(value: number, component: number): number {
    value = (value >>> component) & 1227133513;
    value = (value | (value >>> 2)) & 3272356035;
    value = (value | (value >>> 4)) & 251719695;
    value = (value | (value >>> 8)) & 4278190335;
    value = (value | (value >>> 16)) & 1023;
    
    return (value << 22) >> 22;
}

/**
 * Generates the next combination in lexicographic order (Gosper's hack)
 */
export function nextCombination(value: number): number {
    const temp = value | (value - 1);
    return (temp + 1) | ((~temp & -~temp) - 1) >>> (countTrailingZeros(value) + 1);
}