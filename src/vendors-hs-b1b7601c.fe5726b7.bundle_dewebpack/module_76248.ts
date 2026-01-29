interface LastValueFromConfig<T> {
  defaultValue: T;
}

class EmptyError extends Error {
  constructor() {
    super('no elements in sequence');
    this.name = 'EmptyError';
  }
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export function lastValueFrom<T>(
  source: Observable<T>
): Promise<T>;
export function lastValueFrom<T>(
  source: Observable<T>,
  config: LastValueFromConfig<T>
): Promise<T>;
export function lastValueFrom<T>(
  source: Observable<T>,
  config?: LastValueFromConfig<T>
): Promise<T> {
  const hasDefaultValue = typeof config === 'object' && config !== null;

  return new Promise<T>((resolve, reject) => {
    let lastValue: T;
    let hasValue = false;

    source.subscribe({
      next: (value: T) => {
        lastValue = value;
        hasValue = true;
      },
      error: reject,
      complete: () => {
        if (hasValue) {
          resolve(lastValue);
        } else if (hasDefaultValue) {
          resolve(config.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}