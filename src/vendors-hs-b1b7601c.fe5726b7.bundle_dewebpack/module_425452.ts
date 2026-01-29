import { Observable } from 'rxjs';

interface AnimationFrameScheduler {
  now(): number;
}

interface AnimationFrameProvider {
  requestAnimationFrame(callback: (timestamp: number) => void): number;
  cancelAnimationFrame(handle: number): void;
}

interface AnimationFrameInfo {
  timestamp: number;
  elapsed: number;
}

const performanceTimestampProvider: AnimationFrameScheduler = {
  now: () => performance.now()
};

const animationFrameProvider: AnimationFrameProvider = {
  requestAnimationFrame: (callback) => requestAnimationFrame(callback),
  cancelAnimationFrame: (handle) => cancelAnimationFrame(handle)
};

function createAnimationFrames(scheduler?: AnimationFrameScheduler): Observable<AnimationFrameInfo> {
  return new Observable<AnimationFrameInfo>((subscriber) => {
    const timestampProvider = scheduler || performanceTimestampProvider;
    const startTime = timestampProvider.now();
    let animationFrameHandle = 0;

    const scheduleNextFrame = (): void => {
      if (subscriber.closed) {
        return;
      }

      animationFrameHandle = animationFrameProvider.requestAnimationFrame((currentTimestamp: number) => {
        animationFrameHandle = 0;
        const currentTime = timestampProvider.now();

        subscriber.next({
          timestamp: scheduler ? currentTime : currentTimestamp,
          elapsed: currentTime - startTime
        });

        scheduleNextFrame();
      });
    };

    scheduleNextFrame();

    return () => {
      if (animationFrameHandle) {
        animationFrameProvider.cancelAnimationFrame(animationFrameHandle);
      }
    };
  });
}

const defaultAnimationFrames = createAnimationFrames();

export function animationFrames(scheduler?: AnimationFrameScheduler): Observable<AnimationFrameInfo> {
  return scheduler ? createAnimationFrames(scheduler) : defaultAnimationFrames;
}