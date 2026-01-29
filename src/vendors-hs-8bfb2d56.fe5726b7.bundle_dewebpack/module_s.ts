interface EmvalType {
  toWireType(destructors: unknown[], value: unknown): unknown;
}

function convertEmvalAs(
  value: unknown,
  targetType: EmvalType,
  resultPointer: number
): unknown {
  const processedValue = lt(value);
  const resolvedType = pt(targetType, "emval::as");
  
  const destructors: unknown[] = [];
  const handle = ut(destructors);
  
  const heapView = new Int32Array(O.buffer);
  heapView[resultPointer >> 2] = handle;
  
  return resolvedType.toWireType(destructors, processedValue);
}

declare function lt(value: unknown): unknown;
declare function pt(type: unknown, context: string): EmvalType;
declare function ut(destructors: unknown[]): number;
declare const O: ArrayBuffer | { buffer: ArrayBuffer };