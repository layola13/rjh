import WeakMap from './module_339192';
import isCallable from './module_170452';

const isNativeWeakMap: boolean = isCallable(WeakMap) && /native code/.test(String(WeakMap));

export default isNativeWeakMap;