const inspectSource = (fn: Function): string => {
  return Function.prototype.toString.call(fn);
};

export { inspectSource };