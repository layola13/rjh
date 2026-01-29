function getAllSymbols(obj: object): symbol[] {
  const symbols: symbol[] = [];
  let currentObj: object | null = obj;
  
  while (currentObj) {
    symbols.push(...Object.getOwnPropertySymbols(currentObj));
    currentObj = Object.getPrototypeOf(currentObj);
  }
  
  return symbols;
}

export default Object.getOwnPropertySymbols ? getAllSymbols : () => [];