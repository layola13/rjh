const SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : undefined;
const symbolValueOf = SymbolProto ? SymbolProto.valueOf : undefined;

export function getSymbolValue(symbol: symbol): symbol | object {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}