import { mergeAll } from './958144';

export function concatAll<T>(): (source: Observable<Observable<T>>) => Observable<T> {
    return mergeAll(1);
}

interface Observable<T> {
    pipe<R>(operator: (source: Observable<T>) => Observable<R>): Observable<R>;
}