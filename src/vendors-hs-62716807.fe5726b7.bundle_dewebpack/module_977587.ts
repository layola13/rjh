type TypeName = 'Function' | 'Object' | 'Array' | 'String' | 'Number' | 'Boolean' | 'Undefined' | 'Null';

function getTypeName(value: unknown): TypeName {
  return Object.prototype.toString.call(value).slice(8, -1) as TypeName;
}

function extractFunction<T extends Function>(func: T): T {
  return func;
}

export default function convertIfFunction<T>(value: T): T | undefined {
  if (getTypeName(value) === 'Function') {
    return extractFunction(value as unknown as Function) as T;
  }
  return undefined;
}