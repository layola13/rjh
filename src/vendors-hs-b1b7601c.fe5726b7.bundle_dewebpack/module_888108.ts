import { Subscription } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { asyncScheduler } from 'rxjs/internal/scheduler/async';
import { popScheduler } from 'rxjs/internal/util/popScheduler';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';
import { Observable, SchedulerLike, OperatorFunction } from 'rxjs';

interface BufferTimeContext<T> {
  buffer: T[];
  subs: Subscription;
}

export function bufferTime<T>(
  bufferTimeSpan: number,
  bufferCreationInterval?: number | null,
  maxBufferSize?: number,
  scheduler?: SchedulerLike
): OperatorFunction<T, T[]>;

export function bufferTime<T>(
  bufferTimeSpan: number,
  ...args: unknown[]
): OperatorFunction<T, T[]> {
  const scheduler = popScheduler(args) ?? asyncScheduler;
  const bufferCreationInterval = args[0] ?? null;
  const maxBufferSize = (args[1] as number) || Infinity;

  return operate((source: Observable<T>, subscriber) => {
    let bufferRecords: BufferTimeContext<T>[] | null = [];
    let restartOnEmit = false;

    const closeBuffer = (record: BufferTimeContext<T>): void => {
      const { buffer, subs } = record;
      subs.unsubscribe();
      arrRemove(bufferRecords!, record);
      subscriber.next(buffer);
      
      if (restartOnEmit) {
        startBuffer();
      }
    };

    const startBuffer = (): void => {
      if (bufferRecords) {
        const subs = new Subscription();
        subscriber.add(subs);
        
        const record: BufferTimeContext<T> = {
          buffer: [],
          subs
        };
        
        bufferRecords.push(record);
        
        executeSchedule(
          subs,
          scheduler,
          () => closeBuffer(record),
          bufferTimeSpan
        );
      }
    };

    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
      executeSchedule(
        subscriber,
        scheduler,
        startBuffer,
        bufferCreationInterval,
        true
      );
    } else {
      restartOnEmit = true;
    }

    startBuffer();

    const bufferSubscriber = createOperatorSubscriber(
      subscriber,
      (value: T) => {
        const recordsCopy = bufferRecords!.slice();
        
        for (const record of recordsCopy) {
          const { buffer } = record;
          buffer.push(value);
          
          if (maxBufferSize <= buffer.length) {
            closeBuffer(record);
          }
        }
      },
      () => {
        while (bufferRecords?.length) {
          subscriber.next(bufferRecords.shift()!.buffer);
        }
        bufferSubscriber?.unsubscribe();
        subscriber.complete();
        subscriber.unsubscribe();
      },
      undefined,
      () => {
        bufferRecords = null;
      }
    );

    source.subscribe(bufferSubscriber);
  });
}