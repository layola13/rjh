function setErrno(errorCode: number): number {
  const wasmModule = globalThis.wasmModule;
  
  if (wasmModule?.___errno_location) {
    const errnoPointer = wasmModule.___errno_location() >> 2;
    wasmModule.HEAP32[errnoPointer] = errorCode;
  }
  
  return errorCode;
}