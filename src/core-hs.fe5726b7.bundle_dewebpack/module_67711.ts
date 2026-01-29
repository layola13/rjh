import WeakMap from './module_81482';
import isNativeFunction from './module_52530';

export default isNativeFunction(WeakMap) && /native code/.test(String(WeakMap));