/**
 * Base signal class for event dispatching and listening
 */
export class Signal extends HSCore.Util.Signal {
  constructor(name: string) {
    super(name);
  }

  /**
   * Dispatch an event to all listeners
   */
  dispatch(event: unknown): void {
    return super.dispatch(event);
  }

  /**
   * Register an event listener
   */
  listen(callback: (event: unknown) => void, context?: unknown): void {
    return super.listen(callback, context);
  }

  /**
   * Unregister an event listener
   */
  unlisten(callback: (event: unknown) => void, context?: unknown): void {
    return super.unlisten(callback, context);
  }
}

/**
 * Signal specialized for save operations
 */
export class SaveSignal extends Signal {
  constructor(name: string) {
    super(name);
  }
}

/**
 * Signal specialized for task operations
 */
export class TaskSignal extends Signal {
  constructor(name: string) {
    super(name);
  }
}