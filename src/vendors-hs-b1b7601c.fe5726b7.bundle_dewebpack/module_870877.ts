export const observable: string | symbol = 
  (typeof Symbol === "function" && Symbol.observable) || "@@observable";