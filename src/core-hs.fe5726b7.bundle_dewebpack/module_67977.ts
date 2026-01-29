function checkBindSupport(): boolean {
  try {
    const boundFunction = function () {}.bind();
    return typeof boundFunction === "function" && !boundFunction.hasOwnProperty("prototype");
  } catch {
    return false;
  }
}

export default checkBindSupport();