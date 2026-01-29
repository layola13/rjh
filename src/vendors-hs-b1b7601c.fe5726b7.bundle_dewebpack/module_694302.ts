const symbolIterator: symbol | string = typeof Symbol === "function" && Symbol.iterator 
  ? Symbol.iterator 
  : "@@iterator";

export function getSymbolIterator(): symbol | string {
  return symbolIterator;
}

export const iterator: symbol | string = symbolIterator;