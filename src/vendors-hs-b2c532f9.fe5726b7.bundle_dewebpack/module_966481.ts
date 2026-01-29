export function isImmutable(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;
  
  if (obj.hasOwnProperty('__ownerID')) {
    return true;
  }

  const maybeMapContainer = obj as { _map?: Record<string, unknown> };
  return !!(maybeMapContainer._map && maybeMapContainer._map.hasOwnProperty('__ownerID'));
}

export function denormalizeImmutable<T extends ImmutableMap<string, unknown>>(
  schema: Record<string, unknown>,
  immutableData: T,
  denormalizer: (currentValue: unknown, schemaValue: unknown) => unknown
): T {
  return Object.keys(schema).reduce((accumulator, key) => {
    const stringKey = String(key);
    
    if (!accumulator.has(stringKey)) {
      return accumulator;
    }

    const currentValue = accumulator.get(stringKey);
    const denormalizedValue = denormalizer(currentValue, schema[key]);
    
    return accumulator.set(stringKey, denormalizedValue) as T;
  }, immutableData);
}

interface ImmutableMap<K, V> {
  has(key: K): boolean;
  get(key: K): V | undefined;
  set(key: K, value: V): ImmutableMap<K, V>;
}