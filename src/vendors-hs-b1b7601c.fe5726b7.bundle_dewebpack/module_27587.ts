import { bindCallbackInternals } from './bindCallbackInternals';

export function bindCallback<T extends (...args: any[]) => any>(
  callbackFunc: T,
  scheduler?: any,
  resultSelector?: (...args: any[]) => any
): (...args: Parameters<T>) => any {
  return bindCallbackInternals(false, callbackFunc, scheduler, resultSelector);
}