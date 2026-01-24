/**
 * Microtask Queue Implementation
 * 
 * Provides a polyfill for queueMicrotask functionality across different environments.
 * Supports multiple fallback strategies:
 * - Native queueMicrotask
 * - MutationObserver
 * - Promise.resolve().then()
 * - process.nextTick (Node.js)
 * - setTimeout fallback
 */

/**
 * Queue entry type for microtask callbacks
 */
type MicrotaskCallback = () => void;

/**
 * Queue node structure for linked list implementation
 */
interface QueueNode {
  /** The callback function to execute */
  callback: MicrotaskCallback;
  /** Reference to the next node in the queue */
  next: QueueNode | null;
}

/**
 * Microtask queue implementation using linked list
 */
interface MicrotaskQueue {
  /** Head of the queue */
  head: QueueNode | null;
  /** Tail of the queue */
  tail: QueueNode | null;
  /** Add a callback to the queue */
  add(callback: MicrotaskCallback): void;
  /** Get and remove the next callback from the queue */
  get(): MicrotaskCallback | undefined;
}

/**
 * Global context interface for browser/Node.js environment
 */
interface GlobalContext {
  /** MutationObserver constructor (browser) */
  MutationObserver?: typeof MutationObserver;
  /** WebKit-prefixed MutationObserver (legacy browsers) */
  WebKitMutationObserver?: typeof MutationObserver;
  /** Document object (browser) */
  document?: Document;
  /** Process object (Node.js) */
  process?: NodeJS.Process;
  /** Native Promise constructor */
  Promise?: PromiseConstructor;
  /** Native queueMicrotask function */
  queueMicrotask?: (callback: MicrotaskCallback) => void;
  /** setTimeout function */
  setTimeout: typeof setTimeout;
}

/**
 * Property descriptor for queueMicrotask
 */
interface QueueMicrotaskDescriptor {
  /** The queueMicrotask function value */
  value?: (callback: MicrotaskCallback) => void;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

/**
 * Node.js domain interface
 */
interface Domain {
  /** Exit the current domain context */
  exit(): void;
  /** Enter the domain context */
  enter(): void;
}

/**
 * Node.js process with domain support
 */
interface ProcessWithDomain extends NodeJS.Process {
  /** Current active domain */
  domain?: Domain | null;
  /** Schedule callback on next tick */
  nextTick(callback: MicrotaskCallback): void;
}

/**
 * Queues a microtask to be executed asynchronously.
 * 
 * This function ensures that the provided callback is executed as a microtask,
 * which runs after the current script completes but before control returns to
 * the event loop.
 * 
 * @param callback - The function to execute as a microtask
 * 
 * @example
 *