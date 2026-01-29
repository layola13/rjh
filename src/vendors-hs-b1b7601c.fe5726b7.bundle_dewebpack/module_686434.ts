import { observable } from './870877';
import { isFunction } from './419132';

export function isInteropObservable(value: unknown): boolean {
  return isFunction((value as any)[observable]);
}