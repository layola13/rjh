import { isFunction } from './419132';

export function isPromise(value: unknown): value is Promise<unknown> {
    return isFunction(value?.then);
}