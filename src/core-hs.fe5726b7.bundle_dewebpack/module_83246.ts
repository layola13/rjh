import toPropertyKey from './toPropertyKey';
import isSymbol from './isSymbol';

function toPrimitive(value: unknown): string {
  const primitive = toPropertyKey(value, "string");
  return isSymbol(primitive) ? primitive : primitive + "";
}

export default toPrimitive;