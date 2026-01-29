import { mergeAll } from './mergeAll';
import { innerFrom } from './innerFrom';
import { EMPTY } from './EMPTY';
import { popScheduler, popNumber } from './popScheduler';
import { from } from './from';
import type { SchedulerLike } from './types/SchedulerLike';
import type { ObservableInput } from './types/ObservableInput';

/**
 * Merges multiple observables into a single observable that emits values from all source observables.
 * 
 * @param sources - The observable sources to merge
 * @returns An observable that emits values from all source observables
 */
export function merge<T>(...sources: Array<ObservableInput<T> | SchedulerLike | number>): ObservableInput<T> {
    const scheduler = popScheduler(sources);
    const concurrent = popNumber(sources, Infinity);
    const observables = sources as Array<ObservableInput<T>>;

    if (observables.length === 0) {
        return EMPTY;
    }

    if (observables.length === 1) {
        return innerFrom(observables[0]);
    }

    return mergeAll<T>(concurrent)(from(observables, scheduler));
}