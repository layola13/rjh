import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';

interface RefCountable {
  _refCount: number;
  _connection: any;
  subscribe(subscriber: any): void;
  connect(): any;
}

export function refCount<T>() {
  return operate((source: RefCountable, subscriber: any) => {
    let connection: any = null;
    source._refCount++;

    const operatorSubscriber = createOperatorSubscriber(
      subscriber,
      undefined,
      undefined,
      undefined,
      () => {
        if (!source || source._refCount <= 0 || --source._refCount > 0) {
          connection = null;
        } else {
          const sourceConnection = source._connection;
          const currentConnection = connection;
          connection = null;

          if (!sourceConnection || (currentConnection && sourceConnection !== currentConnection)) {
            sourceConnection?.unsubscribe();
          }

          subscriber.unsubscribe();
        }
      }
    );

    source.subscribe(operatorSubscriber);

    if (!operatorSubscriber.closed) {
      connection = source.connect();
    }
  });
}