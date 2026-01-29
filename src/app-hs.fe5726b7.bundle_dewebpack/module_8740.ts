export function createPropertyMatcher<T>(
  property: string | number | symbol,
  value: T
): (obj: unknown) => boolean {
  return function(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }
    
    const typedObj = obj as Record<string | number | symbol, unknown>;
    return typedObj[property] === value && (value !== undefined || property in Object(obj));
  };
}