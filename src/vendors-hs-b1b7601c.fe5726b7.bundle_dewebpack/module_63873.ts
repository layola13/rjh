import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { defer } from 'rxjs';
import { Subscription } from 'rxjs';

interface ConnectableConfig<T> {
  connector: () => Subject<T>;
  resetOnDisconnect?: boolean;
}

const DEFAULT_CONFIG: ConnectableConfig<any> = {
  connector: () => new Subject(),
  resetOnDisconnect: true
};

export function connectable<T>(
  source: Observable<T>,
  config: ConnectableConfig<T> = DEFAULT_CONFIG
): Observable<T> & { connect: () => Subscription } {
  let connection: Subscription | null = null;
  
  const { connector, resetOnDisconnect = true } = config;
  
  let subject = connector();
  
  const connectableObservable = new Observable<T>((subscriber) => {
    return subject.subscribe(subscriber);
  }) as Observable<T> & { connect: () => Subscription };
  
  connectableObservable.connect = function(): Subscription {
    if (!connection || connection.closed) {
      connection = defer(() => source).subscribe(subject);
      
      if (resetOnDisconnect) {
        connection.add(() => {
          subject = connector();
        });
      }
    }
    
    return connection;
  };
  
  return connectableObservable;
}