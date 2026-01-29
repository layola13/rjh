const call: <T, A extends unknown[], R>(
  this: (this: T, ...args: A) => R,
  thisArg: T,
  ...args: A
) => R = Function.prototype.call;

export default call.bind(call);