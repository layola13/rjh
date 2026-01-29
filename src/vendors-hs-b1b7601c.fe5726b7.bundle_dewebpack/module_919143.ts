import { ReplaySubject } from 'rxjs';
import { share, OperatorFunction, MonoTypeOperatorFunction } from 'rxjs/operators';
import { SchedulerLike } from 'rxjs';

interface ShareReplayConfig {
  bufferSize?: number;
  windowTime?: number;
  refCount?: boolean;
  scheduler?: SchedulerLike;
}

export function shareReplay<T>(
  config: ShareReplayConfig
): MonoTypeOperatorFunction<T>;
export function shareReplay<T>(
  bufferSize?: number,
  windowTime?: number,
  scheduler?: SchedulerLike
): MonoTypeOperatorFunction<T>;
export function shareReplay<T>(
  configOrBufferSize?: ShareReplayConfig | number,
  windowTime?: number,
  scheduler?: SchedulerLike
): MonoTypeOperatorFunction<T> {
  let bufferSize: number;
  let windowTimeValue: number;
  let resetOnRefCountZero = false;
  let schedulerInstance: SchedulerLike | undefined;

  if (configOrBufferSize && typeof configOrBufferSize === 'object') {
    const config = configOrBufferSize as ShareReplayConfig;
    bufferSize = config.bufferSize ?? Infinity;
    windowTimeValue = config.windowTime ?? Infinity;
    resetOnRefCountZero = config.refCount ?? false;
    schedulerInstance = config.scheduler;
  } else {
    bufferSize = configOrBufferSize ?? Infinity;
    windowTimeValue = windowTime ?? Infinity;
    schedulerInstance = scheduler;
  }

  return share<T>({
    connector: () => new ReplaySubject<T>(bufferSize, windowTimeValue, schedulerInstance),
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero
  });
}