import { Observable, SchedulerLike } from 'rxjs';

/**
 * Schedules an array to emit its values sequentially using the provided scheduler.
 * 
 * @param array - The array of values to emit
 * @param scheduler - The scheduler to use for timing the emissions
 * @returns An Observable that emits each array element in sequence
 */
export function scheduleArray<T>(array: T[], scheduler: SchedulerLike): Observable<T> {
  return new Observable<T>((subscriber) => {
    let index = 0;
    
    return scheduler.schedule(function() {
      if (index === array.length) {
        subscriber.complete();
      } else {
        subscriber.next(array[index++]);
        
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}