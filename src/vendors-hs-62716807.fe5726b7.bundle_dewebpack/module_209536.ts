interface InterceptorHandler<T = any> {
  fulfilled: ((value: T) => T | Promise<T>) | null;
  rejected: ((error: any) => any) | null;
}

class InterceptorManager<T = any> {
  private handlers: (InterceptorHandler<T> | null)[];

  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   * @param fulfilled - The function to handle successful requests/responses
   * @param rejected - The function to handle rejected requests/responses
   * @returns The ID of the interceptor for later removal
   */
  use(
    fulfilled: ((value: T) => T | Promise<T>) | null,
    rejected: ((error: any) => any) | null
  ): number {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   * @param id - The ID of the interceptor to remove
   */
  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Iterate over all registered interceptors
   * @param fn - The function to call for each interceptor
   */
  forEach(fn: (handler: InterceptorHandler<T>) => void): void {
    this.handlers.forEach((handler) => {
      if (handler !== null) {
        fn(handler);
      }
    });
  }
}

export default InterceptorManager;