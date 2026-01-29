import { AwaitValue } from './await-value';
import { GeneratorState } from './generator-state';
import { AsyncGeneratorExecutor } from './async-generator-executor';
import { SyncGeneratorExecutor } from './sync-generator-executor';
import { AsyncIterator } from './async-iterator';
import { KeysIterator } from './keys-iterator';
import { ValuesIterator } from './values-iterator';

type AbruptCompletionType = 'throw' | 'return' | 'break' | 'continue';

interface GeneratorContext {
  prev: number;
  next: number;
  sent: unknown;
  done: boolean;
  delegate: Iterator<unknown> | null;
  method: string;
  arg: unknown;
  abruptType?: AbruptCompletionType;
  abruptArg?: unknown;
  rval?: unknown;
  finishLoc?: number;
  catchLoc?: number;
  finallyLoc?: number;
}

interface InternalContext {
  a: { stop: () => unknown; v: unknown; d: unknown; f: unknown; p: number; n: number };
  v: unknown;
  d: unknown;
  p: number;
  n: number;
}

interface GeneratorHelper {
  resultName?: string;
  prev: number;
  next: number;
  sent: unknown;
  stop: () => unknown;
  catch: () => unknown;
  abrupt: (type: AbruptCompletionType, arg?: unknown) => unknown;
  delegateYield: (iterator: Iterator<unknown>, resultName: string, nextLoc: number) => unknown;
  finish: (finallyLoc: number) => unknown;
}

type ContextFunction = (type: unknown, arg?: unknown) => unknown;

interface WrapOptions {
  reverse?: boolean;
}

const ABRUPT_COMPLETION_PRIORITY: Record<AbruptCompletionType, number> = {
  throw: 1,
  return: 2,
  break: 3,
  continue: 3
};

function createRuntime(): RuntimeExports {
  const state = new GeneratorState();
  const markedFunction = state.mark(createRuntime);
  const GeneratorFunctionPrototype = (Object.getPrototypeOf
    ? Object.getPrototypeOf(markedFunction)
    : (markedFunction as any).__proto__
  ).constructor;

  function isGeneratorFunction(fn: unknown): boolean {
    if (typeof fn !== 'function') {
      return false;
    }
    const ctor = fn.constructor;
    if (!ctor) {
      return false;
    }
    return (
      ctor === GeneratorFunctionPrototype ||
      (ctor.displayName || ctor.name) === 'GeneratorFunction'
    );
  }

  function wrapGeneratorBody<T>(bodyFn: (context: GeneratorHelper) => T): (internalContext: InternalContext) => T {
    let helper: GeneratorHelper | undefined;
    let contextFn: ContextFunction | undefined;

    return function (this: unknown, internalContext: InternalContext): T {
      if (!helper) {
        helper = {
          stop: (): unknown => {
            return contextFn!(internalContext.a, 2);
          },
          catch: (): unknown => {
            return internalContext.v;
          },
          abrupt: (type: AbruptCompletionType, arg?: unknown): unknown => {
            return contextFn!(internalContext.a, ABRUPT_COMPLETION_PRIORITY[type], arg);
          },
          delegateYield: (iterator: Iterator<unknown>, resultName: string, nextLoc: number): unknown => {
            helper!.resultName = resultName;
            return contextFn!(internalContext.d, ValuesIterator(iterator), nextLoc);
          },
          finish: (finallyLoc: number): unknown => {
            return contextFn!(internalContext.f, finallyLoc);
          },
          prev: internalContext.p,
          next: internalContext.n,
          sent: internalContext.v
        };

        contextFn = (type: unknown, arg?: unknown, value?: unknown): unknown => {
          internalContext.p = helper!.prev;
          internalContext.n = helper!.next;
          try {
            return (type as any)(arg, value);
          } finally {
            helper!.next = internalContext.n;
          }
        };
      }

      if (helper.resultName) {
        (helper as any)[helper.resultName] = internalContext.v;
        helper.resultName = undefined;
      }

      helper.sent = internalContext.v;
      helper.next = internalContext.n;

      try {
        return bodyFn.call(this, helper);
      } finally {
        internalContext.p = helper.prev;
        internalContext.n = helper.next;
      }
    };
  }

  interface RuntimeExports {
    wrap: <T>(
      innerFn: (context: InternalContext) => T,
      outerFn: GeneratorFunction,
      self: unknown,
      options?: WrapOptions
    ) => Generator<T>;
    isGeneratorFunction: (fn: unknown) => boolean;
    mark: (genFun: GeneratorFunction) => GeneratorFunction;
    awrap: <T>(value: T, unwrap?: boolean) => AwaitValue<T>;
    AsyncIterator: typeof AsyncIterator;
    async: <T>(
      innerFn: (context: InternalContext) => T,
      outerFn: GeneratorFunction,
      self: unknown,
      tryLocsList: unknown,
      promiseImpl?: PromiseConstructor
    ) => Promise<T>;
    keys: typeof KeysIterator;
    values: typeof ValuesIterator;
  }

  return {
    wrap: <T>(
      innerFn: (context: InternalContext) => T,
      outerFn: GeneratorFunction,
      self: unknown,
      options?: WrapOptions
    ): Generator<T> => {
      return state.wrap(wrapGeneratorBody(innerFn), outerFn, self, options?.reverse);
    },
    isGeneratorFunction,
    mark: state.mark.bind(state),
    awrap: <T>(value: T, unwrap?: boolean): AwaitValue<T> => {
      return new AwaitValue(value, unwrap);
    },
    AsyncIterator,
    async: <T>(
      innerFn: (context: InternalContext) => T,
      outerFn: GeneratorFunction,
      self: unknown,
      tryLocsList: unknown,
      promiseImpl?: PromiseConstructor
    ): Promise<T> => {
      const executor = isGeneratorFunction(outerFn)
        ? AsyncGeneratorExecutor
        : SyncGeneratorExecutor;
      return executor(wrapGeneratorBody(innerFn), outerFn, self, tryLocsList, promiseImpl);
    },
    keys: KeysIterator,
    values: ValuesIterator
  };
}

const runtime = createRuntime();

export default runtime;
export const {
  wrap,
  isGeneratorFunction,
  mark,
  awrap,
  AsyncIterator,
  async,
  keys,
  values
} = runtime;