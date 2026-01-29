const testResult = (() => {
  try {
    return 7 !== Object.defineProperty({}, 1, {
      get: function (): number {
        return 7;
      }
    })[1];
  } catch {
    return false;
  }
})();

export default testResult;