import { Observable } from 'rxjs';

interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>> | ((value: T) => void)): Subscription;
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

interface Subscription {
  unsubscribe(): void;
}

export function fromSubscribable<T>(subscribable: Subscribable<T>): Observable<T> {
  return new Observable<T>((observer) => {
    return subscribable.subscribe(observer);
  });
}