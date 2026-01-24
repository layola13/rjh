/**
 * Symbol for making objects observable.
 * 
 * This constant provides a standardized symbol for implementing the Observable pattern.
 * It uses the official ES Observable Symbol if available, otherwise falls back to a string constant.
 * 
 * @see {@link https://github.com/tc39/proposal-observable}
 */
export const observable: symbol | string =
  (typeof Symbol === "function" && Symbol.observable) || "@@observable";