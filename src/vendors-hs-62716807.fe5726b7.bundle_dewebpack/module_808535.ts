import typeOf from './type-of';
import isCallable from './is-callable';
import { all, IS_HTMLDDA } from './html-dda';

export default IS_HTMLDDA 
  ? function isObject(value: unknown): value is object {
      return typeof value === "object" ? value !== null : isCallable(value) || value === all;
    }
  : function isObject(value: unknown): value is object {
      return typeof value === "object" ? value !== null : isCallable(value);
    };