import { bindCallbackInternals } from './module_191557';

export function bindNodeCallback<T>(
  callbackFunc: (...args: any[]) => void,
  resultSelector?: (...args: any[]) => T,
  scheduler?: any
): (...args: any[]) => any {
  return bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}