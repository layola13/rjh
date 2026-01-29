const hasProperStackProperty: boolean = (() => {
  try {
    const error = new Error("a");
    
    if (!("stack" in error)) {
      return false;
    }
    
    Object.defineProperty(error, "stack", {
      value: 7,
      writable: true,
      enumerable: false,
      configurable: true
    });
    
    return error.stack === 7;
  } catch {
    return false;
  }
})();

export default hasProperStackProperty;