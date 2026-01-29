const INTERNAL_STATE = new WeakMap<RegExp, { dotAll: boolean }>();

function getInternalState(target: RegExp): { dotAll: boolean } {
  const state = INTERNAL_STATE.get(target);
  if (!state) {
    throw new TypeError('Internal state not found');
  }
  return state;
}

function classof(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

const SUPPORTS_DESCRIPTORS = (() => {
  try {
    Object.defineProperty({}, 'test', { value: 1 });
    return true;
  } catch {
    return false;
  }
})();

const NATIVE_SYMBOL = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

const regExpPrototype = RegExp.prototype;

function hasOwnProperty(obj: object, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

if (SUPPORTS_DESCRIPTORS && NATIVE_SYMBOL && !hasOwnProperty(regExpPrototype, 'dotAll')) {
  Object.defineProperty(regExpPrototype, 'dotAll', {
    configurable: true,
    get(this: unknown): boolean {
      if (this !== regExpPrototype) {
        if (classof(this) === 'RegExp') {
          return getInternalState(this as RegExp).dotAll;
        }
        throw new TypeError('Incompatible receiver, RegExp required');
      }
      return false;
    }
  });
}