function toPrimitive(input: unknown, hint?: 'string' | 'number' | 'default'): string | number | symbol {
  if (typeof input !== 'object' || input === null) {
    return input as string | number | symbol;
  }

  const toPrimitiveMethod = (input as Record<symbol, unknown>)[Symbol.toPrimitive];
  
  if (toPrimitiveMethod !== undefined) {
    const result = (toPrimitiveMethod as (hint: string) => unknown).call(input, hint ?? 'default');
    
    if (typeof result !== 'object') {
      return result as string | number | symbol;
    }
    
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }

  const converter = hint === 'string' ? String : Number;
  return converter(input) as string | number;
}

export function toPropertyKey(value: unknown): string | symbol {
  const primitive = toPrimitive(value, 'string');
  return typeof primitive === 'symbol' ? primitive : String(primitive);
}

export default toPropertyKey;