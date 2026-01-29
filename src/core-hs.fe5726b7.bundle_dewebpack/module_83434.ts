interface PropertyDescriptor {
  value?: any;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  get?: () => any;
  set?: (value: any) => void;
}

interface ObjectConstructor {
  assign<T extends object, U extends object>(target: T, source: U): T & U;
  assign<T extends object>(target: T, ...sources: any[]): any;
  defineProperty<T>(obj: T, prop: PropertyKey, descriptor: PropertyDescriptor): T;
  keys(obj: object): string[];
  getOwnPropertySymbols(obj: object): symbol[];
}

const NATIVE_ASSIGN = Object.assign;
const DEFINE_PROPERTY = Object.defineProperty;

const hasDescriptorsSupport: boolean = checkDescriptorsSupport();
const getOwnPropertyNames = Object.keys;
const getOwnPropertySymbols = Object.getOwnPropertySymbols;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

const concat = <T>(arr: T[], ...items: T[][]): T[] => arr.concat(...items);

function toObject<T>(value: T): object {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object(value);
}

function checkDescriptorsSupport(): boolean {
  return typeof DEFINE_PROPERTY === 'function';
}

const ALPHABET = 'abcdefghijklmnopqrst';

const shouldUsePolyfill = !NATIVE_ASSIGN || (() => {
  if (hasDescriptorsSupport && 1 !== NATIVE_ASSIGN(
    { b: 1 },
    NATIVE_ASSIGN(
      DEFINE_PROPERTY({}, 'a', {
        enumerable: true,
        get: function (this: any) {
          DEFINE_PROPERTY(this, 'b', {
            value: 3,
            enumerable: false
          });
        }
      }),
      { b: 2 }
    )
  ).b) {
    return true;
  }

  const testObj: Record<string | symbol, any> = {};
  const testObj2: Record<string, string> = {};
  const testSymbol = Symbol();
  
  testObj[testSymbol] = 7;
  ALPHABET.split('').forEach((char: string) => {
    testObj2[char] = char;
  });

  return NATIVE_ASSIGN({}, testObj)[testSymbol] !== 7 || 
         getOwnPropertyNames(NATIVE_ASSIGN({}, testObj2)).join('') !== ALPHABET;
})();

function polyfillAssign<T extends object>(target: T, ...sources: any[]): T {
  const targetObj = toObject(target);
  const sourceCount = sources.length;

  for (let sourceIndex = 0; sourceIndex < sourceCount; sourceIndex++) {
    const source = sources[sourceIndex];
    if (source === null || source === undefined) {
      continue;
    }

    const indexedSource = Object(source);
    const sourceKeys = getOwnPropertySymbols 
      ? concat(getOwnPropertyNames(indexedSource), getOwnPropertySymbols(indexedSource))
      : getOwnPropertyNames(indexedSource);
    
    const keyCount = sourceKeys.length;

    for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
      const key = sourceKeys[keyIndex];
      
      if (!hasDescriptorsSupport || propertyIsEnumerable.call(indexedSource, key)) {
        (targetObj as any)[key] = indexedSource[key];
      }
    }
  }

  return targetObj as T;
}

export default shouldUsePolyfill ? polyfillAssign : NATIVE_ASSIGN;