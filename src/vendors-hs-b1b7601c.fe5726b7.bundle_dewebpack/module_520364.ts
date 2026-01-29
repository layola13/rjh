import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { noop } from './noop';
import { MonoTypeOperatorFunction, Observer } from './types';

export function ignoreElements<T>(): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, noop));
  });
}