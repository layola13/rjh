import { operate } from './operate';
import { MonoTypeOperatorFunction, Subscriber, TeardownLogic } from './types';

export function finalize<T>(callback: () => void): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}