type Constructor<T = any> = new (...args: any[]) => T;
type CallableFunction = (...args: any[]) => any;

const uncurryThis = <T extends (...args: any[]) => any>(fn: T): T => {
  return Function.prototype.call.bind(fn) as T;
};

const isCallable = (value: unknown): value is CallableFunction => {
  return typeof value === 'function';
};

const getBuiltIn = (name: string, method?: string): any => {
  const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
  const target = (globalObject as any)[name];
  return method ? target?.[method] : target;
};

const toString = (value: any): string => {
  return Object.prototype.toString.call(value);
};

const getTypeTag = (value: any): string => {
  const tag = toString(value);
  return tag.slice(8, -1);
};

const CONSTRUCTOR_PATTERN = /^\s*(?:class|function)\b/;
const exec = uncurryThis(CONSTRUCTOR_PATTERN.exec);
const EMPTY_FUNCTION = function (): void {};
const EMPTY_ARRAY: any[] = [];
const ReflectConstruct = getBuiltIn('Reflect', 'construct');
const PATTERN_TEST_FAILS_ON_EMPTY = !CONSTRUCTOR_PATTERN.exec(EMPTY_FUNCTION);

/**
 * Checks if value is a constructor using Reflect.construct
 */
const isConstructorViaReflect = (value: unknown): value is Constructor => {
  if (!isCallable(value)) {
    return false;
  }
  
  try {
    ReflectConstruct(EMPTY_FUNCTION, EMPTY_ARRAY, value as Constructor);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if value is a constructor using pattern matching and type checking
 */
const isConstructorViaPattern = (value: unknown): value is Constructor => {
  if (!isCallable(value)) {
    return false;
  }
  
  const typeTag = getTypeTag(value);
  switch (typeTag) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }
  
  try {
    const functionSource = Function.prototype.toString.call(value);
    return PATTERN_TEST_FAILS_ON_EMPTY || !!exec(CONSTRUCTOR_PATTERN, functionSource);
  } catch {
    return true;
  }
};

const hasReflectConstructBug = (): boolean => {
  let wasCalled = false;
  
  const testConstructor = function (): void {
    wasCalled = true;
  };
  
  return (
    isConstructorViaReflect(isConstructorViaReflect.call) ||
    !isConstructorViaReflect(Object) ||
    !isConstructorViaReflect(testConstructor) ||
    wasCalled
  );
};

const shouldUsePatternFallback = !ReflectConstruct || hasReflectConstructBug();

export const isConstructor = shouldUsePatternFallback 
  ? isConstructorViaPattern 
  : isConstructorViaReflect;

(isConstructor as any).sham = true;