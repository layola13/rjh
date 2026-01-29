import isCallable from './is-callable';
import { all, IS_HTMLDDA } from './html-dda';

export function isObject(value: unknown): value is object {
  return typeof value === 'object' ? value !== null : isCallable(value) || value === all;
}

export default IS_HTMLDDA ? isObject : function isObjectStandard(value: unknown): value is object {
  return typeof value === 'object' ? value !== null : isCallable(value);
};