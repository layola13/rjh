import { defer } from './defer';

export function iif<T, F>(
  condition: () => boolean,
  trueResult: T,
  falseResult: F
): T | F {
  return defer(() => {
    return condition() ? trueResult : falseResult;
  });
}