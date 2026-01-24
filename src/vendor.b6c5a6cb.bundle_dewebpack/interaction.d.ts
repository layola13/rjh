/**
 * @pixi/ticker - v5.2.4
 * Ticker system for managing animation loops and frame updates.
 * Licensed under the MIT License.
 */

/**
 * Priority levels for ticker callbacks.
 * Higher values execute first in the update cycle.
 */
export enum UPDATE_PRIORITY {
  /** Interaction events (highest priority) */
  INTERACTION = 50,
  /** High priority updates */
  HIGH = 25,
  /** Normal priority updates (default) */
  NORMAL = 0,
  /** Low priority updates */
  LOW = -25,
  /** Utility updates (lowest priority) */
  UTILITY = -50
}

/**
 * Context type for ticker listener callbacks
 */
type TickerContext = unknown;

/**
 * Callback function signature for ticker listeners
 */
type TickerCallback<T = unknown> = (deltaTime: number) => void;

/**
 * Internal linked list node representing a single ticker listener.
 */
declare class TickerListener<T = unknown> {
  /** The callback function to execute */
  fn: TickerCallback<T> | null;
  
  /** The context (this) to bind when calling the callback */
  context: T | null;
  
  /** Priority level determining execution order */
  priority: number;
  
  /** Whether this listener should only execute once */
  once: boolean;
  
  /** Next listener in the linked list */
  next: TickerListener<T> | null;
  
  /** Previous listener in the linked list */
  previous: TickerListener<T> | null;
  
  /** Internal flag indicating if this listener has been destroyed */
  private _destroyed: boolean;

  /**
   * Creates a new ticker listener node.
   * @param fn - Callback function to execute on each tick
   * @param context - Context to bind to the callback
   * @param priority - Execution priority (higher = earlier)
   * @param once - If true, removes listener after first execution
   */
  constructor(
    fn: TickerCallback<T> | null,
    context?: T | null,
    priority?: number,
    once?: boolean
  );

  /**
   * Checks if this listener matches the given function and context.
   * @param fn - Function to compare
   * @param context - Context to compare
   * @returns True if both match
   */
  match(fn: TickerCallback<T>, context?: T | null): boolean;

  /**
   * Executes the listener callback with the given delta time.
   * @param deltaTime - Time elapsed since last frame
   * @returns The next listener in the chain
   */
  emit(deltaTime: number): TickerListener<T> | null;

  /**
   * Inserts this listener after the specified listener in the chain.
   * @param previous - Listener to insert after
   */
  connect(previous: TickerListener<T>): void;

  /**
   * Removes this listener from the chain and cleans up references.
   * @param hard - If true, completely breaks the chain
   * @returns The next listener in the chain
   */
  destroy(hard?: boolean): TickerListener<T> | null;
}

/**
 * Core ticker class managing the animation loop and frame updates.
 * Maintains a priority-ordered list of listeners and handles RAF scheduling.
 */
export declare class Ticker {
  /** Head of the listener linked list (sentinel node) */
  private _head: TickerListener;
  
  /** Current requestAnimationFrame ID, null when not active */
  private _requestId: number | null;
  
  /** Maximum allowed elapsed time per frame (ms) */
  private _maxElapsedMS: number;
  
  /** Minimum elapsed time between frames (ms, for FPS capping) */
  private _minElapsedMS: number;
  
  /** Timestamp of the last processed frame */
  private _lastFrame: number;
  
  /** Whether this ticker is protected from destruction */
  private _protected: boolean;

  /** If true, starts automatically when listeners are added */
  autoStart: boolean;
  
  /** Scaled time delta (deltaMS * speed * TARGET_FPMS) */
  deltaTime: number;
  
  /** Time elapsed since last frame in milliseconds */
  deltaMS: number;
  
  /** Total elapsed time for the current frame */
  elapsedMS: number;
  
  /** Timestamp of the last update call */
  lastTime: number;
  
  /** Speed multiplier for time progression (1.0 = normal speed) */
  speed: number;
  
  /** Whether the ticker is currently running */
  started: boolean;

  /**
   * Creates a new Ticker instance.
   */
  constructor();

  /**
   * Requests an animation frame if needed and not already requested.
   */
  private _requestIfNeeded(): void;

  /**
   * Cancels the current animation frame request if active.
   */
  private _cancelIfNeeded(): void;

  /**
   * Starts the ticker if possible (based on started/autoStart state).
   */
  private _startIfPossible(): void;

  /**
   * Internal RAF callback that drives the update loop.
   * @param currentTime - Current timestamp from RAF
   */
  private _tick(currentTime: number): void;

  /**
   * Adds a listener to the ticker.
   * @param fn - Callback function to execute each frame
   * @param context - Context to bind to the callback
   * @param priority - Execution priority (default: NORMAL)
   * @returns This ticker instance for chaining
   */
  add<T = unknown>(
    fn: TickerCallback<T>,
    context?: T,
    priority?: UPDATE_PRIORITY
  ): this;

  /**
   * Adds a one-time listener that removes itself after execution.
   * @param fn - Callback function to execute once
   * @param context - Context to bind to the callback
   * @param priority - Execution priority (default: NORMAL)
   * @returns This ticker instance for chaining
   */
  addOnce<T = unknown>(
    fn: TickerCallback<T>,
    context?: T,
    priority?: UPDATE_PRIORITY
  ): this;

  /**
   * Internal method to insert a listener in priority order.
   * @param listener - Listener to add
   * @returns This ticker instance
   */
  private _addListener<T>(listener: TickerListener<T>): this;

  /**
   * Removes all listeners matching the function and context.
   * @param fn - Function to remove
   * @param context - Context that was bound
   * @returns This ticker instance for chaining
   */
  remove<T = unknown>(fn: TickerCallback<T>, context?: T): this;

  /**
   * Gets the total number of listeners attached.
   */
  readonly count: number;

  /**
   * Starts the ticker if not already running.
   */
  start(): void;

  /**
   * Stops the ticker and cancels animation frame requests.
   */
  stop(): void;

  /**
   * Destroys the ticker and removes all listeners.
   * Protected tickers (shared/system) cannot be destroyed.
   */
  destroy(): void;

  /**
   * Processes a single frame update, calculating deltas and invoking listeners.
   * @param currentTime - Current timestamp (default: performance.now())
   */
  update(currentTime?: number): void;

  /**
   * Gets the current frames per second.
   */
  readonly FPS: number;

  /**
   * Gets or sets the minimum FPS (caps maximum elapsed time per frame).
   */
  minFPS: number;

  /**
   * Gets or sets the maximum FPS (throttles frame rate).
   */
  maxFPS: number;

  /**
   * Gets the shared ticker instance (singleton, auto-start enabled).
   */
  static readonly shared: Ticker;

  /**
   * Gets the system ticker instance (singleton, auto-start enabled).
   */
  static readonly system: Ticker;
}

/**
 * Configuration options for TickerPlugin initialization.
 */
interface TickerPluginOptions {
  /** Whether to start the ticker automatically */
  autoStart?: boolean;
  /** If true, uses the shared ticker instance */
  sharedTicker?: boolean;
}

/**
 * Plugin interface for integrating Ticker with a renderer or application.
 */
export declare class TickerPlugin {
  /** The ticker instance driving this plugin */
  private _ticker: Ticker | null;

  /**
   * Initializes the ticker plugin on a target object (e.g., Application).
   * @param options - Configuration options
   */
  static init(this: any, options?: TickerPluginOptions): void;

  /**
   * Cleans up and destroys the ticker (unless it's a shared instance).
   */
  static destroy(this: any): void;

  /**
   * Gets or sets the ticker instance.
   */
  ticker: Ticker;

  /**
   * Stops the ticker.
   */
  stop(): void;

  /**
   * Starts the ticker.
   */
  start(): void;
}