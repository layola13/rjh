import { zip as zipStatic } from './zip-static';
import { operate } from './operate';
import { OperatorFunction, ObservableInput } from './types';

export function zip<T, A extends readonly unknown[]>(
  ...sources: [...ObservableInputTuple<A>]
): OperatorFunction<T, [T, ...A]> {
  return operate((source, subscriber) => {
    zipStatic(source, ...sources).subscribe(subscriber);
  });
}

type ObservableInputTuple<T> = {
  [K in keyof T]: ObservableInput<T[K]>;
};