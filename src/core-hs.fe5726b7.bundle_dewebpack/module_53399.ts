interface IteratorRecord<T = unknown> {
  iterator: Iterator<T>;
  next: () => IteratorResult<T>;
  done?: boolean;
}

interface IterateOptions {
  IS_RECORD?: boolean;
  INTERRUPTED?: boolean;
}

interface IterateResult {
  stopped: boolean;
  result?: unknown;
}

type IteratorCallback<T> = (value: T, stop: () => void) => void | boolean;

function requireObjectCoercible<T>(value: T): NonNullable<T> {
  if (value == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return value as NonNullable<T>;
}

function isCallable(value: unknown): value is Function {
  return typeof value === "function";
}

function iterate<T>(
  iterator: IteratorRecord<T>,
  callback: IteratorCallback<T>,
  options: IterateOptions
): IterateResult {
  const result: IterateResult = { stopped: false };
  
  while (true) {
    const step = iterator.next();
    
    if (step.done) {
      break;
    }
    
    const stopFn = () => {
      result.stopped = true;
      result.result = step.value;
    };
    
    const callbackResult = callback(step.value, stopFn);
    
    if (result.stopped || callbackResult) {
      result.stopped = true;
      break;
    }
  }
  
  return result;
}

function defineIteratorMethod(
  target: string,
  proto: boolean,
  real: boolean,
  methods: Record<string, Function>
): void {
  const IteratorPrototype = (globalThis as any).Iterator?.prototype;
  
  if (proto && IteratorPrototype) {
    Object.keys(methods).forEach((key) => {
      IteratorPrototype[key] = methods[key];
    });
  }
}

defineIteratorMethod("Iterator", true, true, {
  some<T>(this: Iterator<T>, predicate: (value: T, index: number) => boolean): boolean {
    if (!isCallable(predicate)) {
      throw new TypeError("Predicate must be a function");
    }
    
    const iteratorRecord = requireObjectCoercible(this) as unknown as IteratorRecord<T>;
    let index = 0;
    
    const result = iterate<T>(
      iteratorRecord,
      (value: T, stop: () => void) => {
        if (predicate(value, index++)) {
          stop();
        }
      },
      {
        IS_RECORD: true,
        INTERRUPTED: true,
      }
    );
    
    return result.stopped;
  },
});