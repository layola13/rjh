/**
 * PromiseWrapper - A utility for wrapping Web Worker communication with Promises
 * Provides bidirectional message passing between main thread and worker threads
 */

type MessageId = number;
type WorkerMessage = [MessageId, unknown];
type WorkerResponse = [MessageId, Error | null, unknown?];
type CallbackFunction = (error: Error | null, result?: unknown) => void;

interface CallbackRegistry {
  [messageId: MessageId]: CallbackFunction;
}

/**
 * Wrapper class that enables Promise-based communication with Web Workers
 * Automatically handles message ID generation and callback management
 */
export class PromiseWrapper {
  private readonly worker: Worker;
  private readonly callbacks: CallbackRegistry = {};
  private messageIdCounter: number = 0;

  /**
   * Creates a new PromiseWrapper instance
   * @param worker - The Web Worker instance to wrap
   */
  constructor(worker: Worker) {
    this.worker = worker;
    this.worker.addEventListener('message', this.onMessage.bind(this));
  }

  /**
   * Posts a message to the worker and returns a Promise that resolves with the response
   * @param message - The message payload to send to the worker
   * @returns Promise that resolves with the worker's response or rejects on error
   */
  postMessage(message: unknown): Promise<unknown> {
    const messageId = this.messageIdCounter++;
    const payload: WorkerMessage = [messageId, message];

    return new Promise((resolve, reject) => {
      this.callbacks[messageId] = (error: Error | null, result?: unknown) => {
        if (error) {
          return reject(new Error(error.message || String(error)));
        }
        resolve(result);
      };

      this.worker.postMessage(payload);
    });
  }

  /**
   * Internal handler for messages received from the worker
   * @param event - The MessageEvent from the worker
   */
  private onMessage(event: MessageEvent<WorkerResponse>): void {
    const data = event.data;

    if (!Array.isArray(data) || data.length < 2) {
      return;
    }

    const [messageId, error, result] = data;
    const callback = this.callbacks[messageId];

    if (callback) {
      delete this.callbacks[messageId];
      callback(error, result);
    }
  }
}

/**
 * Registers a message handler in the worker thread context
 * This function should be called within the Web Worker script
 * @param handler - Function that processes messages from the main thread
 */
export function registerPromiseWrapperHandle(handler: (message: unknown) => unknown | Promise<unknown>): void {
  /**
   * Logs errors to console if available
   * @param error - The error to log
   */
  function logError(error: unknown): void {
    if (typeof console !== 'undefined' && 'error' in console) {
      console.error('Worker caught an error:', error);
    }
  }

  /**
   * Sends response back to main thread
   * @param messageId - ID of the original message
   * @param error - Error object if operation failed
   * @param result - Result data if operation succeeded
   */
  function sendResponse(messageId: MessageId, error: Error | null, result?: unknown): void {
    if (error) {
      logError(error);
      self.postMessage([messageId, error]);
    } else {
      self.postMessage([messageId, null, result]);
    }
  }

  /**
   * Executes handler and manages async/sync response
   * @param handlerFn - The registered message handler
   * @param messageId - ID of the message being processed
   * @param payload - The message payload
   */
  function executeHandler(handlerFn: (message: unknown) => unknown | Promise<unknown>, messageId: MessageId, payload: unknown): void {
    let handlerResult: unknown;

    try {
      handlerResult = handlerFn(payload);
    } catch (error) {
      sendResponse(messageId, error as Error);
      return;
    }

    // Check if result is a Promise
    if (handlerResult && (typeof handlerResult === 'object' || typeof handlerResult === 'function') && typeof (handlerResult as Promise<unknown>).then === 'function') {
      (handlerResult as Promise<unknown>)
        .then((value) => {
          sendResponse(messageId, null, value);
        })
        .catch((error) => {
          sendResponse(messageId, error as Error);
        });
    } else {
      sendResponse(messageId, null, handlerResult);
    }
  }

  self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
    const data = event.data;

    if (!Array.isArray(data) || data.length !== 2) {
      logError(new Error(`Invalid incoming message format. Correct format is [messageId, message]. Received: ${data}`));
      return;
    }

    const [messageId, payload] = data;

    if (typeof handler !== 'function') {
      sendResponse(messageId, new Error('No callback function is registered in worker thread. Call register() to register a callback.'));
      return;
    }

    executeHandler(handler, messageId, payload);
  });
}