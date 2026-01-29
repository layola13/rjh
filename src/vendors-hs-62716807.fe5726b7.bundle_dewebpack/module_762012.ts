export default function toString(this: unknown): string {
  const hasNativeToString = typeof Object.prototype.toString === 'function';
  
  if (hasNativeToString) {
    return Object.prototype.toString.call(this);
  }
  
  const classifyType = (value: unknown): string => {
    if (value === null) return 'Null';
    if (value === undefined) return 'Undefined';
    return Object.prototype.toString.call(value).slice(8, -1);
  };
  
  return `[object ${classifyType(this)}]`;
}