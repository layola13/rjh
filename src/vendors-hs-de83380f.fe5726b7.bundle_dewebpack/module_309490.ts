function getType(value: unknown): string {
  if (value === null) return 'object';
  if (Array.isArray(value)) return 'object';
  return typeof value;
}

function toPrimitive(input: unknown, hint?: 'string' | 'number' | 'default'): string | number | boolean | symbol | null | undefined | bigint {
  if (getType(input) !== 'object' || !input) {
    return input as string | number | boolean | symbol | null | undefined | bigint;
  }

  const toPrimitiveMethod = (input as any)[Symbol.toPrimitive];
  
  if (toPrimitiveMethod !== undefined) {
    const result = toPrimitiveMethod.call(input, hint ?? 'default');
    
    if (getType(result) !== 'object') {
      return result;
    }
    
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }

  return (hint === 'string' ? String : Number)(input as any);
}

export default toPrimitive;