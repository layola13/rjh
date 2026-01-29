import getSymbolToStringTag from './module_2705';
import getRawTag from './module_9607';
import objectToString from './module_2333';

const toStringTagSymbol = getSymbolToStringTag ? getSymbolToStringTag.toStringTag : undefined;

export default function baseGetTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  
  return toStringTagSymbol && toStringTagSymbol in Object(value)
    ? getRawTag(value)
    : objectToString(value);
}