export default function getObservableSymbol(root: any): symbol | string {
  const symbolConstructor = root.Symbol;
  
  if (typeof symbolConstructor === "function") {
    if (symbolConstructor.observable) {
      return symbolConstructor.observable;
    }
    
    const observableSymbol = symbolConstructor("observable");
    symbolConstructor.observable = observableSymbol;
    return observableSymbol;
  }
  
  return "@@observable";
}