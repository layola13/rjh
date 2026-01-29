import { concat } from './concat';
import { popScheduler } from './popScheduler';
import { operate } from './operate';
import type { SchedulerLike } from './types/SchedulerLike';
import type { OperatorFunction } from './types/OperatorFunction';
import type { Observable } from './types/Observable';

/**
 * Returns an observable that emits the specified values before beginning to emit items from the source observable.
 * 
 * @param values - The values to emit before the source observable
 * @returns An operator function that prepends the specified values
 */
export function startWith<T>(...values: Array<T | SchedulerLike>): OperatorFunction<T, T> {
    const scheduler = popScheduler(values);
    
    return operate((source: Observable<T>, subscriber) => {
        const observable = scheduler 
            ? concat(values as T[], source, scheduler) 
            : concat(values as T[], source);
        
        observable.subscribe(subscriber);
    });
}