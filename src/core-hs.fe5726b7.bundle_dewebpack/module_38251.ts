let counter = 0;
const randomSeed = Math.random();
const numberToString = (1).toString;

export function createSymbolPolyfill(description?: string): string {
  const desc = description === undefined ? "" : description;
  return `Symbol(${desc})_${numberToString.call(++counter + randomSeed, 36)}`;
}