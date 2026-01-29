import cloneObject from './cloneObject';
import getSymbols from './getSymbols';

export default function copySymbols<T extends object>(
  source: T,
  target: Record<string | symbol, any>
): Record<string | symbol, any> {
  if (!source) {
    return target;
  }
  
  const symbols = getSymbols(source);
  return cloneObject(target, symbols, source);
}