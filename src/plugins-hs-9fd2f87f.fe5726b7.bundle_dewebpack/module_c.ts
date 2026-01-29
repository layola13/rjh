function setErrno(errorCode: number): number {
    if (globalContext.___errno_location) {
        const errnoPointer = globalContext.___errno_location() >> 2;
        heapInt32[errnoPointer] = errorCode;
    }
    return errorCode;
}