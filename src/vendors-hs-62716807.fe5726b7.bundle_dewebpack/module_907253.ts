const testResult = (() => {
  try {
    return 7 !== Object.defineProperty({}, 1, {
      get(): number {
        return 7;
      }
    })[1];
  } catch {
    return true;
  }
})();

export default testResult;