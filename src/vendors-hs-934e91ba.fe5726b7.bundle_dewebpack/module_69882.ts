export const length = (obj: unknown): number | undefined => {
  if (obj == null) {
    return undefined;
  }
  
  if (typeof obj === 'string' || Array.isArray(obj)) {
    return obj.length;
  }
  
  if (typeof obj === 'object' && 'length' in obj) {
    return (obj as { length: number }).length;
  }
  
  return undefined;
};

export default length;