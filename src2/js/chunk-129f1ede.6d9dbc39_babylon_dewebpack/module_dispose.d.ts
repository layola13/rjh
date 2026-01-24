/**
 * Dispose module - Cleans up observable subscriptions
 * @module module_dispose
 */

/**
 * Observer callback type for render events
 */
type RenderObserver<T = void> = (eventData: T) => void;

/**
 * Observer callback type for custom events
 */
type CustomEventObserver<T = unknown> = (eventData: T) => void;

/**
 * Observable collection interface
 */
interface Observable<T> {
  /**
   * Removes an observer from the observable
   * @param observer - The observer to remove
   */
  remove(observer: (eventData: T) => void): void;
}

/**
 * Object with after-render observable
 */
interface RenderTarget {
  /** Observable triggered after rendering completes */
  onAfterRenderObservable: Observable<unknown>;
}

/**
 * Object with custom event observable
 */
interface EventTarget {
  /** Observable for custom events */
  _customEventObservable: Observable<unknown>;
}

/**
 * Cleanup function that removes registered observers
 * @remarks
 * Removes observers from:
 * - After-render observable on the render target
 * - Custom event observable on the event target
 */
declare function dispose(
  t: RenderTarget,
  n: EventTarget,
  o: RenderObserver,
  a: CustomEventObserver
): void;

export default dispose;