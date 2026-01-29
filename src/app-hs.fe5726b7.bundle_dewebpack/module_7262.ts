function toSource(value: unknown): string {
  if (value != null) {
    try {
      return Function.prototype.toString.call(value);
    } catch (error) {
      // Fall through to next attempt
    }
    
    try {
      return value + "";
    } catch (error) {
      // Fall through to return empty string
    }
  }
  
  return "";
}

export default toSource;