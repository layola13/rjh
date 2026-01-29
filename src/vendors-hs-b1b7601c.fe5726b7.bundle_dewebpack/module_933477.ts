import { ConnectableObservable } from './ConnectableObservable';
import { isFunction } from './utils';
import { connect } from './connect';

export type ConnectorFactory<T> = () => Subject<T>;

export interface Subject<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
  subscribe(observer: Partial<Observer<T>>): Subscription;
}

export interface Observer<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface Observable<T> {
  subscribe(observer: Partial<Observer<T>>): Subscription;
}

export interface MulticastConfig<T> {
  connector: ConnectorFactory<T>;
}

/**
 * Multicasts the source Observable through a subject created by the connector factory.
 * 
 * @param subjectOrSubjectFactory - A Subject instance or factory function that returns a Subject
 * @param selector - Optional selector function for the multicast operation
 * @returns An operator function that returns a ConnectableObservable or applies the selector
 */
export function multicast<T, R>(
  subjectOrSubjectFactory: Subject<T> | ConnectorFactory<T>,
  selector?: (source: Observable<T>) => Observable<R>
): (source: Observable<T>) => ConnectableObservable<T> | Observable<R> {
  const connectorFactory: ConnectorFactory<T> = isFunction(subjectOrSubjectFactory)
    ? subjectOrSubjectFactory
    : () => subjectOrSubjectFactory;

  if (isFunction(selector)) {
    return connect<T, R>(selector, { connector: connectorFactory });
  }

  return (source: Observable<T>) => new ConnectableObservable(source, connectorFactory);
}