function throttleByAnimationFrame<T extends (...args: any[]) => any>(
  fn: T
): T & { cancel: () => void } {
  let frameId: number | null = null;

  const throttled = function (this: any, ...args: Parameters<T>): void {
    if (frameId === null) {
      frameId = requestAnimationFrame(() => {
        frameId = null;
        fn.apply(this, args);
      });
    }
  } as T & { cancel: () => void };

  throttled.cancel = function (): void {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  return throttled;
}

function throttleByAnimationFrameDecorator() {
  return function <T extends Function>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value;
    let isDefining = false;

    return {
      configurable: true,
      get(this: any): T {
        if (
          isDefining ||
          this === target.prototype ||
          this.hasOwnProperty(propertyKey)
        ) {
          return originalMethod as T;
        }

        const throttledMethod = throttleByAnimationFrame(
          (originalMethod as any).bind(this)
        );

        isDefining = true;
        Object.defineProperty(this, propertyKey, {
          value: throttledMethod,
          configurable: true,
          writable: true,
        });
        isDefining = false;

        return throttledMethod as T;
      },
    } as TypedPropertyDescriptor<T>;
  };
}

export { throttleByAnimationFrame, throttleByAnimationFrameDecorator };