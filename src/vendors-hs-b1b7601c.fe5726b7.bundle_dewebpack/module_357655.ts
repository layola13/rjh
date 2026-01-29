import { Observable } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';

/**
 * Creates an Observable that subscribes to an ObservableInput only when subscribed to.
 * The factory function is called lazily when the output Observable is subscribed.
 * 
 * @param observableFactory - A function that returns an ObservableInput to be converted to an Observable
 * @returns An Observable that, when subscribed, will subscribe to the Observable returned by the factory
 */
export function defer<T>(observableFactory: () => Observable<T> | PromiseLike<T> | ArrayLike<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        innerFrom(observableFactory()).subscribe(subscriber);
    });
}