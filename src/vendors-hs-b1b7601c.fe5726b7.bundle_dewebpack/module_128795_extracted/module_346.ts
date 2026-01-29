function toSource(value: unknown): string {
  if (value != null) {
    try {
      return Function.prototype.toString.call(value);
    } catch (error) {
      // Ignore error and try alternative
    }

    try {
      return value + "";
    } catch (error) {
      // Ignore error
    }
  }

  return "";
}

export default toSource;