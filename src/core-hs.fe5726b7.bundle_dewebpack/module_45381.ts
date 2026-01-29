type RegExpMethod = (regexp: RegExp, str: string) => unknown;

interface RegExpSubstitution {
  done: boolean;
  value?: unknown;
}

type SubstitutionFunction = (
  nativeMethod: RegExpMethod,
  execMethod: ((str: string) => RegExpExecArray | null) | undefined,
  str: string,
  regexp: RegExp,
  forceStringMethod: boolean
) => RegExpSubstitution;

const SPECIES_SYMBOL = Symbol.species;
const REGEXP_PROTOTYPE = RegExp.prototype;
const NATIVE_EXEC = RegExp.prototype.exec;

function defineRegExpMethod(
  methodName: string,
  stringMethodImpl: RegExpMethod,
  substitution: SubstitutionFunction,
  forceSham: boolean
): void {
  const symbolKey = Symbol.for(methodName);

  const isNativeMethodBroken = testNativeMethodBroken(methodName, symbolKey);
  const isExecMethodBroken = testExecMethodBroken(methodName, symbolKey);

  if (!isNativeMethodBroken || !isExecMethodBroken || forceSham) {
    const nativeRegExpMethod = getUncurryThis(REGEXP_PROTOTYPE[symbolKey]);

    const patchedMethod = substitution(
      symbolKey,
      stringMethodImpl,
      (
        nativeMethod: RegExpMethod,
        execMethod: ((str: string) => RegExpExecArray | null) | undefined,
        str: string,
        regexp: RegExp,
        forceStringMethod: boolean
      ): RegExpSubstitution => {
        const uncurriedNativeMethod = getUncurryThis(nativeMethod);
        const regexpExec = regexp.exec;

        if (regexpExec === NATIVE_EXEC || regexpExec === REGEXP_PROTOTYPE.exec) {
          if (isNativeMethodBroken && !forceStringMethod) {
            return {
              done: true,
              value: nativeRegExpMethod(regexp, str, execMethod)
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, execMethod)
          };
        }

        return {
          done: false
        };
      }
    );

    defineProperty(String.prototype, methodName, patchedMethod[0]);
    defineProperty(REGEXP_PROTOTYPE, symbolKey, patchedMethod[1]);
  }

  if (forceSham) {
    createNonEnumerableProperty(REGEXP_PROTOTYPE[symbolKey], "sham", true);
  }
}

function testNativeMethodBroken(methodName: string, symbolKey: symbol): boolean {
  try {
    const testObject: Record<symbol, () => number> = {} as any;
    testObject[symbolKey] = (): number => 7;
    return ""[methodName](testObject) !== 7;
  } catch {
    return false;
  }
}

function testExecMethodBroken(methodName: string, symbolKey: symbol): boolean {
  try {
    let execCalled = false;
    let testRegExp: RegExp | Record<string, any> = /a/;

    if (methodName === "split") {
      testRegExp = {} as any;
      (testRegExp as any).constructor = {} as any;
      (testRegExp as any).constructor[SPECIES_SYMBOL] = function (): RegExp {
        return testRegExp as RegExp;
      };
      (testRegExp as any).flags = "";
      (testRegExp as any)[symbolKey] = REGEXP_PROTOTYPE[symbolKey];
    }

    (testRegExp as any).exec = function (): null {
      execCalled = true;
      return null;
    };

    (testRegExp as any)[symbolKey]("");
    return !execCalled;
  } catch {
    return false;
  }
}

function getUncurryThis<T extends (...args: any[]) => any>(method: T): T {
  return Function.prototype.call.bind(method) as T;
}

function defineProperty<T extends object>(
  target: T,
  key: string | symbol,
  value: unknown
): void {
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

function createNonEnumerableProperty<T extends object>(
  target: T,
  key: string | symbol,
  value: unknown
): void {
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

export default defineRegExpMethod;