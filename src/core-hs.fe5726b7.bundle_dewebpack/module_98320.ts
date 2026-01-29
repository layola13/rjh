interface RedefineOptions {
  getter?: boolean;
  setter?: boolean;
  arity?: number;
  constructor?: boolean;
}

interface EnforcedState {
  source?: string;
}

interface InternalStateAccessor {
  enforce: (target: Function) => EnforcedState;
  get: (target: Function) => EnforcedState;
}

const stringSlice = String.prototype.slice.call.bind(String.prototype.slice);
const stringReplace = String.prototype.replace.call.bind(String.prototype.replace);
const arrayJoin = Array.prototype.join.call.bind(Array.prototype.join);

const DESCRIPTORS_SUPPORT = checkDescriptorsSupport();
const FUNCTION_NAME_CONFIGURABLE = checkFunctionNameConfigurable();

const STRING_SPLIT_CACHE = String(String).split("String");

function checkDescriptorsSupport(): boolean {
  try {
    return Object.defineProperty(() => {}, "length", { value: 8 }).length === 8;
  } catch {
    return false;
  }
}

function checkFunctionNameConfigurable(): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(Function.prototype, "name");
  return descriptor?.configurable ?? false;
}

function hasOwnProperty(obj: any, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isCallable(value: unknown): value is Function {
  return typeof value === "function";
}

function getInternalState(target: Function): EnforcedState {
  const state = (target as any).__internalState__;
  return state ?? {};
}

function enforceInternalState(target: Function): EnforcedState {
  if (!(target as any).__internalState__) {
    (target as any).__internalState__ = {};
  }
  return (target as any).__internalState__;
}

function getFunctionSource(fn: Function): string {
  const source = fn.toString();
  return source;
}

const internalState: InternalStateAccessor = {
  enforce: enforceInternalState,
  get: getInternalState
};

export function redefineFunction(
  targetFunction: Function,
  name: string,
  options?: RedefineOptions
): Function {
  let functionName = name;

  if (stringSlice(String(name), 0, 7) === "Symbol(") {
    functionName = "[" + stringReplace(String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
  }

  if (options?.getter) {
    functionName = "get " + functionName;
  }

  if (options?.setter) {
    functionName = "set " + functionName;
  }

  if (
    !hasOwnProperty(targetFunction, "name") ||
    (FUNCTION_NAME_CONFIGURABLE && targetFunction.name !== functionName)
  ) {
    if (DESCRIPTORS_SUPPORT) {
      Object.defineProperty(targetFunction, "name", {
        value: functionName,
        configurable: true
      });
    } else {
      (targetFunction as any).name = functionName;
    }
  }

  if (
    DESCRIPTORS_SUPPORT &&
    options &&
    hasOwnProperty(options, "arity") &&
    targetFunction.length !== options.arity
  ) {
    Object.defineProperty(targetFunction, "length", {
      value: options.arity
    });
  }

  try {
    if (options && hasOwnProperty(options, "constructor") && options.constructor) {
      if (DESCRIPTORS_SUPPORT) {
        Object.defineProperty(targetFunction, "prototype", {
          writable: false
        });
      }
    } else if (targetFunction.prototype) {
      (targetFunction as any).prototype = undefined;
    }
  } catch (error) {
    // Ignore errors when trying to modify prototype
  }

  const state = internalState.enforce(targetFunction);

  if (!hasOwnProperty(state, "source")) {
    state.source = arrayJoin(
      STRING_SPLIT_CACHE,
      typeof functionName === "string" ? functionName : ""
    );
  }

  return targetFunction;
}

Function.prototype.toString = redefineFunction(
  function toString(this: Function): string {
    return isCallable(this) && internalState.get(this).source || getFunctionSource(this);
  },
  "toString"
);