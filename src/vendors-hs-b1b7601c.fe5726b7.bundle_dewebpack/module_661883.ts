import { map } from './map';
import { dateTimestampProvider } from './dateTimestampProvider';

export interface TimestampProvider {
  now(): number;
}

export interface Timestamped<T> {
  value: T;
  timestamp: number;
}

export function timestamp<T>(
  provider: TimestampProvider = dateTimestampProvider
) {
  return map<T, Timestamped<T>>((value: T) => ({
    value,
    timestamp: provider.now()
  }));
}