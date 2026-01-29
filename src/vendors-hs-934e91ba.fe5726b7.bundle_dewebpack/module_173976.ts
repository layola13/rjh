function getAllSymbols(target: object): symbol[] {
  const symbols: symbol[] = [];
  let currentObject: object | null = target;

  while (currentObject) {
    const ownSymbols = Object.getOwnPropertySymbols(currentObject);
    symbols.push(...ownSymbols);
    currentObject = Object.getPrototypeOf(currentObject);
  }

  return symbols;
}

export default Object.getOwnPropertySymbols ? getAllSymbols : () => [];