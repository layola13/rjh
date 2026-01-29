interface WallEditHandler {
  onWallEditComplete(data: unknown): Promise<void> | void;
}

interface WallEditData {
  [key: string]: unknown;
}

/**
 * Manages wall edit event handlers and notifies them when wall edits are complete.
 * Implements the singleton pattern to ensure a single instance across the application.
 */
export class WallEditHook {
  private static _hook_instance: WallEditHook | null = null;
  private _handlers: WallEditHandler[] = [];

  constructor() {
    this._handlers = [];
  }

  /**
   * Gets the singleton instance of WallEditHook.
   * Creates a new instance if one doesn't exist.
   */
  public static getInstance(): WallEditHook {
    if (!WallEditHook._hook_instance) {
      WallEditHook._hook_instance = new WallEditHook();
    }
    return WallEditHook._hook_instance;
  }

  /**
   * Registers a new handler to be notified of wall edit events.
   * @param handler - The handler to add
   */
  public addHandler(handler: WallEditHandler): void {
    this._handlers.push(handler);
  }

  /**
   * Removes a previously registered handler.
   * @param handler - The handler to remove
   */
  public removeHandler(handler: WallEditHandler): void {
    const index = this._handlers.indexOf(handler);
    if (index > -1) {
      this._handlers.splice(index, 1);
    }
  }

  /**
   * Notifies all registered handlers that a wall edit has been completed.
   * Executes all handlers in parallel and waits for completion.
   * @param data - The wall edit data to pass to handlers
   */
  public async onWallEditComplete(data: WallEditData): Promise<void> {
    const promises: Array<Promise<void> | void> = [];
    
    this._handlers.forEach((handler) => {
      try {
        promises.push(handler.onWallEditComplete(data));
      } catch (error) {
        // Silently catch errors in DEBUG mode
        if ((globalThis as any).DEBUG) {
          console.error('Handler error:', error);
        }
      }
    });

    await Promise.all(promises);
  }
}