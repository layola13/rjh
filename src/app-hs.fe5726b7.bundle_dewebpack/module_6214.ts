function isFlattenable(value: unknown): boolean {
  return (
    Array.isArray(value) ||
    isArguments(value) ||
    !!(Symbol.isConcatSpreadable && value && (value as any)[Symbol.isConcatSpreadable])
  );
}

function isArguments(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}

export default isFlattenable;