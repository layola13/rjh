function createSymbolPolyfill(description?: string): string {
  return `Symbol(${description === undefined ? "" : description})_${(++counter + randomSeed).toString(36)}`;
}

let counter = 0;
const randomSeed = Math.random();

export default createSymbolPolyfill;