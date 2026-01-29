import { defaultMemoize, defaultEqualityCheck } from './memoize';

export { defaultMemoize, defaultEqualityCheck };

type AnyFunction = (...args: any[]) => any;
type Selector<S, R> = (state: S, ...args: any[]) => R;

interface OutputSelector<S, R, C> extends Selector<S, R> {
  resultFunc: C;
  memoizedResultFunc: AnyFunction;
  dependencies: Selector<S, any>[];
  lastResult: () => R;
  recomputations: () => number;
  resetRecomputations: () => number;
}

interface CreateSelectorOptions {
  memoizeOptions?: any;
}

type MemoizeFunction = (func: AnyFunction, ...options: any[]) => AnyFunction;

export function createSelectorCreator(
  memoize: MemoizeFunction,
  ...memoizeOptionsFromArgs: any[]
): (...funcs: any[]) => any {
  return (...funcs: any[]): any => {
    let recomputationCount = 0;
    let selectorOptions: CreateSelectorOptions = {
      memoizeOptions: undefined
    };

    let resultFunc = funcs.pop();

    if (typeof resultFunc === 'object') {
      selectorOptions = resultFunc;
      resultFunc = funcs.pop();
    }

    if (typeof resultFunc !== 'function') {
      throw new Error(
        `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
      );
    }

    const memoizeOptions = selectorOptions.memoizeOptions ?? memoizeOptionsFromArgs;
    const memoizeOptionsArray = Array.isArray(memoizeOptions) 
      ? memoizeOptions 
      : [memoizeOptions];

    const dependencies = extractDependencies(funcs);

    const memoizedResultFunc = memoize(
      function(this: any, ...args: any[]) {
        recomputationCount++;
        return resultFunc.apply(null, args);
      },
      ...memoizeOptionsArray
    );

    const selector = memoize(function(this: any, ...args: any[]) {
      const params: any[] = [];
      const dependenciesLength = dependencies.length;

      for (let i = 0; i < dependenciesLength; i++) {
        params.push(dependencies[i].apply(null, args));
      }

      const lastResult = memoizedResultFunc.apply(null, params);
      return lastResult;
    });

    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      lastResult: () => {
        let result: any;
        return result;
      },
      recomputations: () => recomputationCount,
      resetRecomputations: () => {
        recomputationCount = 0;
        return 0;
      }
    });
  };
}

function extractDependencies(selectors: any[]): AnyFunction[] {
  const dependencies = Array.isArray(selectors[0]) ? selectors[0] : selectors;

  if (!dependencies.every((dep) => typeof dep === 'function')) {
    const dependencyTypes = dependencies
      .map((dep) =>
        typeof dep === 'function'
          ? `function ${dep.name || 'unnamed'}()`
          : typeof dep
      )
      .join(', ');

    throw new Error(
      `createSelector expects all input-selectors to be functions, but received the following types: [${dependencyTypes}]`
    );
  }

  return dependencies;
}

export const createSelector = createSelectorCreator(defaultMemoize);

export function createStructuredSelector<S, T>(
  selectors: { [K in keyof T]: Selector<S, T[K]> },
  selectorCreator: typeof createSelector = createSelector
): Selector<S, T> {
  if (typeof selectors !== 'object') {
    throw new Error(
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof selectors}`
    );
  }

  const objectKeys = Object.keys(selectors) as Array<keyof T>;
  
  const structuredSelector = selectorCreator(
    objectKeys.map((key) => selectors[key]),
    (...values: any[]) => {
      return values.reduce((composition, value, index) => {
        composition[objectKeys[index]] = value;
        return composition;
      }, {} as T);
    }
  );

  return structuredSelector;
}