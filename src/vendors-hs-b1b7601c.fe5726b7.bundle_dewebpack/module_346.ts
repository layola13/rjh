function toFunctionString(value: unknown): string {
  const functionToString = Function.prototype.toString;
  
  if (value != null) {
    try {
      return functionToString.call(value);
    } catch (error) {
      // Fallback if toString call fails
    }
    
    try {
      return value + "";
    } catch (error) {
      // Fallback if string coercion fails
    }
  }
  
  return "";
}

export default toFunctionString;