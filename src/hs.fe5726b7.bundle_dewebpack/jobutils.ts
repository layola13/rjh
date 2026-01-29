import { Observable, of } from 'rxjs';
import { retryWhen, catchError } from 'rxjs/operators';
import { genericRetryStrategy } from './genericRetryStrategy';
import { exportToGlobal } from './exportToGlobal';

interface JobStatus {
  status: 'finish' | 'fail' | 'error' | string;
  error?: unknown;
  err?: unknown;
}

interface WatchOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  staticRetryAttempts?: number;
}

type JobFetcher = () => Promise<JobStatus>;
type SuccessCallback = (result: JobStatus) => void;
type ErrorCallback = (error: unknown) => void;

export class JobUtils {
  private watch$?: ReturnType<typeof Observable.prototype.subscribe>;

  watch(
    jobFetcher: JobFetcher,
    onSuccess: SuccessCallback,
    onError?: ErrorCallback,
    options: WatchOptions = {}
  ): void {
    const {
      maxRetryAttempts = 23,
      scalingDuration = 1500,
      staticRetryAttempts = 5
    } = options;

    if (this.watch$) {
      this.watch$.unsubscribe();
    }

    this.watch$ = Observable.create((observer: any) => {
      jobFetcher()
        .then((result: JobStatus) => {
          const { status } = result;
          if (status === 'finish' || status === 'fail') {
            observer.next(result);
            observer.complete();
          } else {
            observer.error(result);
          }
        })
        .catch((error: unknown) => {
          observer.next({
            status: 'error',
            error
          });
          observer.complete();
        });
    })
      .pipe(
        retryWhen(
          genericRetryStrategy({
            maxRetryAttempts,
            scalingDuration,
            staticRetryAttempts
          })
        ),
        catchError((error: unknown) => {
          return of({
            status: 'error',
            err: error
          });
        })
      )
      .subscribe(
        (result: JobStatus) => {
          onSuccess(result);
        },
        (error: unknown) => {
          if (onError) {
            onError(error);
          }
        }
      );
  }

  unWatch(): void {
    if (this.watch$) {
      this.watch$.unsubscribe();
      this.watch$ = undefined;
    }
  }
}

exportToGlobal('webLib', 'JobUtils', JobUtils);