function copyToMemory(source: Uint8Array, offset: number, length: number): void {
    P.set(P.subarray(offset, offset + length), source);
}