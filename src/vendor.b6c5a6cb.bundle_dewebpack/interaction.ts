/**
 * Ticker system for managing frame-based updates and animations
 */

export enum UPDATE_PRIORITY {
  INTERACTION = 50,
  HIGH = 25,
  NORMAL = 0,
  LOW = -25,
  UTILITY = -50
}

interface Settings {
  TARGET_FPMS: number;
}

const settings: Settings = {
  TARGET_FPMS: 0.06
};

type TickerCallback<T = any> = (deltaTime: number) => void;

/**
 * Internal linked list node representing a ticker listener
 */
class TickerListener<T = any> {
  public fn: TickerCallback<T> | null;
  public context: T | null;
  public priority: number;
  public once: boolean;
  public next: TickerListener<T> | null;
  public previous: TickerListener<T> | null;
  private _destroyed: boolean;

  constructor(
    fn: TickerCallback<T> | null,
    context: T | null = null,
    priority: number = 0,
    once: boolean = false
  ) {
    this.fn = fn;
    this.context = context;
    this.priority = priority;
    this.once = once;
    this.next = null;
    this.previous = null;
    this._destroyed = false;
  }

  /**
   * Check if this listener matches the given function and context
   */
  public match(fn: TickerCallback<T>, context: T | null = null): boolean {
    return this.fn === fn && this.context === context;
  }

  /**
   * Execute the listener callback
   */
  public emit(deltaTime: number): TickerListener<T> | null {
    if (this.fn) {
      if (this.context) {
        this.fn.call(this.context, deltaTime);
      } else {
        this.fn(deltaTime);
      }
    }

    const next = this.next;

    if (this.once) {
      this.destroy(true);
    }

    if (this._destroyed) {
      this.next = null;
    }

    return next;
  }

  /**
   * Connect this listener after the given listener in the linked list
   */
  public connect(previous: TickerListener<T>): void {
    this.previous = previous;

    if (previous.next) {
      previous.next.previous = this;
    }

    this.next = previous.next;
    previous.next = this;
  }

  /**
   * Destroy this listener and remove it from the linked list
   */
  public destroy(hard: boolean = false): TickerListener<T> | null {
    this._destroyed = true;
    this.fn = null;
    this.context = null;

    if (this.previous) {
      this.previous.next = this.next;
    }

    if (this.next) {
      this.next.previous = this.previous;
    }

    const next = this.next;
    this.next = hard ? null : next;
    this.previous = null;

    return next;
  }
}

/**
 * A Ticker class that manages a list of listeners to be called every frame
 */
export class Ticker {
  private _head: TickerListener;
  private _requestId: number | null;
  private _maxElapsedMS: number;
  private _minElapsedMS: number;
  private _protected: boolean;
  private _lastFrame: number;
  private _tick: FrameRequestCallback;

  public autoStart: boolean;
  public deltaTime: number;
  public deltaMS: number;
  public elapsedMS: number;
  public lastTime: number;
  public speed: number;
  public started: boolean;

  private static _shared: Ticker | null;
  private static _system: Ticker | null;

  constructor() {
    this._head = new TickerListener(null, null, Infinity);
    this._requestId = null;
    this._maxElapsedMS = 100;
    this._minElapsedMS = 0;
    this.autoStart = false;
    this.deltaTime = 1;
    this.deltaMS = 1 / settings.TARGET_FPMS;
    this.elapsedMS = 1 / settings.TARGET_FPMS;
    this.lastTime = -1;
    this.speed = 1;
    this.started = false;
    this._protected = false;
    this._lastFrame = -1;

    this._tick = (currentTime: number): void => {
      this._requestId = null;

      if (this.started) {
        this.update(currentTime);

        if (this.started && this._requestId === null && this._head.next) {
          this._requestId = requestAnimationFrame(this._tick);
        }
      }
    };
  }

  private _requestIfNeeded(): void {
    if (this._requestId === null && this._head.next) {
      this.lastTime = performance.now();
      this._lastFrame = this.lastTime;
      this._requestId = requestAnimationFrame(this._tick);
    }
  }

  private _cancelIfNeeded(): void {
    if (this._requestId !== null) {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
  }

  private _startIfPossible(): void {
    if (this.started) {
      this._requestIfNeeded();
    } else if (this.autoStart) {
      this.start();
    }
  }

  /**
   * Add a listener to the ticker
   */
  public add<T = any>(
    fn: TickerCallback<T>,
    context?: T,
    priority: UPDATE_PRIORITY = UPDATE_PRIORITY.NORMAL
  ): this {
    return this._addListener(new TickerListener(fn, context ?? null, priority));
  }

  /**
   * Add a one-time listener to the ticker
   */
  public addOnce<T = any>(
    fn: TickerCallback<T>,
    context?: T,
    priority: UPDATE_PRIORITY = UPDATE_PRIORITY.NORMAL
  ): this {
    return this._addListener(new TickerListener(fn, context ?? null, priority, true));
  }

  private _addListener<T>(listener: TickerListener<T>): this {
    let current = this._head.next;
    let previous = this._head;

    if (current) {
      while (current) {
        if (listener.priority > current.priority) {
          listener.connect(previous);
          break;
        }
        previous = current;
        current = current.next;
      }

      if (!listener.previous) {
        listener.connect(previous);
      }
    } else {
      listener.connect(previous);
    }

    this._startIfPossible();
    return this;
  }

  /**
   * Remove a listener from the ticker
   */
  public remove<T = any>(fn: TickerCallback<T>, context?: T): this {
    let listener = this._head.next;

    while (listener) {
      listener = listener.match(fn, context ?? null) 
        ? listener.destroy() 
        : listener.next;
    }

    if (!this._head.next) {
      this._cancelIfNeeded();
    }

    return this;
  }

  /**
   * Get the number of listeners
   */
  public get count(): number {
    if (!this._head) {
      return 0;
    }

    let count = 0;
    let current: TickerListener | null = this._head;

    while ((current = current.next)) {
      count++;
    }

    return count;
  }

  /**
   * Start the ticker
   */
  public start(): void {
    if (!this.started) {
      this.started = true;
      this._requestIfNeeded();
    }
  }

  /**
   * Stop the ticker
   */
  public stop(): void {
    if (this.started) {
      this.started = false;
      this._cancelIfNeeded();
    }
  }

  /**
   * Destroy the ticker
   */
  public destroy(): void {
    if (!this._protected) {
      this.stop();

      let listener = this._head.next;
      while (listener) {
        listener = listener.destroy(true);
      }

      this._head.destroy();
    }
  }

  /**
   * Update the ticker with the current time
   */
  public update(currentTime: number = performance.now()): void {
    let elapsedMS: number;

    if (currentTime > this.lastTime) {
      elapsedMS = this.elapsedMS = currentTime - this.lastTime;

      if (elapsedMS > this._maxElapsedMS) {
        elapsedMS = this._maxElapsedMS;
      }

      elapsedMS *= this.speed;

      if (this._minElapsedMS) {
        const delta = (currentTime - this._lastFrame) | 0;

        if (delta < this._minElapsedMS) {
          return;
        }

        this._lastFrame = currentTime - (delta % this._minElapsedMS);
      }

      this.deltaMS = elapsedMS;
      this.deltaTime = this.deltaMS * settings.TARGET_FPMS;

      const head = this._head;
      let listener = head.next;

      while (listener) {
        listener = listener.emit(this.deltaTime);
      }

      if (!head.next) {
        this._cancelIfNeeded();
      }
    } else {
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    }

    this.lastTime = currentTime;
  }

  /**
   * Get the current frames per second
   */
  public get FPS(): number {
    return 1000 / this.elapsedMS;
  }

  /**
   * Get/set the minimum frames per second
   */
  public get minFPS(): number {
    return 1000 / this._maxElapsedMS;
  }

  public set minFPS(fps: number) {
    const minFPS = Math.min(this.maxFPS, fps);
    const minFPMS = Math.min(Math.max(0, minFPS) / 1000, settings.TARGET_FPMS);
    this._maxElapsedMS = 1 / minFPMS;
  }

  /**
   * Get/set the maximum frames per second
   */
  public get maxFPS(): number {
    return this._minElapsedMS ? Math.round(1000 / this._minElapsedMS) : 0;
  }

  public set maxFPS(fps: number) {
    if (fps === 0) {
      this._minElapsedMS = 0;
    } else {
      const maxFPS = Math.max(this.minFPS, fps);
      this._minElapsedMS = 1 / (maxFPS / 1000);
    }
  }

  /**
   * Get the shared ticker instance
   */
  public static get shared(): Ticker {
    if (!Ticker._shared) {
      const ticker = Ticker._shared = new Ticker();
      ticker.autoStart = true;
      ticker._protected = true;
    }

    return Ticker._shared;
  }

  /**
   * Get the system ticker instance
   */
  public static get system(): Ticker {
    if (!Ticker._system) {
      const ticker = Ticker._system = new Ticker();
      ticker.autoStart = true;
      ticker._protected = true;
    }

    return Ticker._system;
  }
}

interface TickerPluginOptions {
  autoStart?: boolean;
  sharedTicker?: boolean;
}

interface TickerPluginTarget {
  _ticker?: Ticker | null;
  ticker: Ticker;
  render: (deltaTime: number) => void;
  start: () => void;
  stop: () => void;
}

/**
 * Plugin for integrating Ticker with a rendering system
 */
export class TickerPlugin {
  /**
   * Initialize the ticker plugin on a target object
   */
  public static init(this: TickerPluginTarget, options?: TickerPluginOptions): void {
    const resolvedOptions = {
      autoStart: true,
      sharedTicker: false,
      ...options
    };

    Object.defineProperty(this, 'ticker', {
      set(newTicker: Ticker) {
        if (this._ticker) {
          this._ticker.remove(this.render, this);
        }

        this._ticker = newTicker;

        if (newTicker) {
          newTicker.add(this.render, this, UPDATE_PRIORITY.LOW);
        }
      },
      get(): Ticker {
        return this._ticker;
      }
    });

    this.stop = (): void => {
      this._ticker?.stop();
    };

    this.start = (): void => {
      this._ticker?.start();
    };

    this._ticker = null;
    this.ticker = resolvedOptions.sharedTicker ? Ticker.shared : new Ticker();

    if (resolvedOptions.autoStart) {
      this.start();
    }
  }

  /**
   * Destroy the ticker plugin
   */
  public static destroy(this: TickerPluginTarget): void {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null as any;
      oldTicker.destroy();
    }
  }
}