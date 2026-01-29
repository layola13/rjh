function isFunction(value: unknown): boolean {
  const tag = Object.prototype.toString.call(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || 
         tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
}

function isMasked(func: unknown): boolean {
  // Check if function is masked/hidden from detection
  return false; // Simplified - actual implementation would check internal slots
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

function toSource(func: Function): string {
  if (func !== null) {
    try {
      return Function.prototype.toString.call(func);
    } catch (e) {
      // Ignore error
    }
    try {
      return `${func}`;
    } catch (e) {
      // Ignore error
    }
  }
  return '';
}

const CONSTRUCTOR_PATTERN = /^\[object .+?Constructor\]$/;
const funcProto = Function.prototype;
const objectProto = Object.prototype;
const funcToString = funcProto.toString;
const hasOwnProperty = objectProto.hasOwnProperty;

const nativePattern = RegExp(
  `^${funcToString
    .call(hasOwnProperty)
    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')}$`
);

export default function isNative(value: unknown): boolean {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  
  const pattern = isFunction(value) ? nativePattern : CONSTRUCTOR_PATTERN;
  return pattern.test(toSource(value as Function));
}