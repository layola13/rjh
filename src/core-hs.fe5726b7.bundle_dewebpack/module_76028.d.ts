/**
 * Microtask queue implementation
 * Provides a cross-platform queueMicrotask polyfill
 */

/**
 * Queues a microtask to be executed asynchronously
 * @param callback - The function to be executed as a microtask
 */
export declare function queueMicrotask(callback: () => void): void;

/**
 * Internal queue for managing pending microtasks
 */
declare class MicrotaskQueue {
  /**
   * Reference to the first item in the queue
   */
  head: QueueNode | null;

  /**
   * Adds a callback to the microtask queue
   * @param callback - The function to queue
   */
  add(callback: () => void): void;

  /**
   * Retrieves and removes the next callback from the queue
   * @returns The next queued callback, or undefined if queue is empty
   */
  get(): (() => void) | undefined;
}

/**
 * Internal queue node structure
 */
interface QueueNode {
  /**
   * The callback function to execute
   */
  callback: () => void;

  /**
   * Reference to the next node in the queue
   */
  next: QueueNode | null;
}

/**
 * Platform detection flags
 */
declare const isNode: boolean;
declare const isIOS: boolean;
declare const isWebWorker: boolean;

/**
 * Global environment references
 */
declare const globalThis: Window & typeof globalThis;
declare const MutationObserver: typeof window.MutationObserver | undefined;
declare const WebKitMutationObserver: typeof window.MutationObserver | undefined;
declare const document: Document | undefined;
declare const process: NodeJS.Process | undefined;
declare const Promise: PromiseConstructor | undefined;

/**
 * Microtask scheduling strategy type
 */
type MicrotaskScheduler = () => void;

export default queueMicrotask;