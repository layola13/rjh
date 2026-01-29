interface MessageData {
  messageId: number;
  error: Error | null;
  result: unknown;
}

type CallbackFunction = (error: Error | null, result?: unknown) => void;

type WorkerCallbackMap = Record<number, CallbackFunction>;

type WorkerFunction = (message: unknown) => unknown | Promise<unknown>;

let globalMessageId = 0;

export class PromiseWrapper {
  private readonly _worker: Worker;
  private readonly _callbacks: WorkerCallbackMap;

  constructor(worker: Worker) {
    this._worker = worker;
    this._callbacks = {};
    this._worker.addEventListener('message', this._onMessage.bind(this));
  }

  public postMessage<T = unknown>(message: unknown): Promise<T> {
    const messageId = globalMessageId++;
    const payload: [number, unknown] = [messageId, message];

    return new Promise<T>((resolve, reject) => {
      this._callbacks[messageId] = (error: Error | null, result?: unknown) => {
        if (error) {
          return reject(new Error(error.message || String(error)));
        }
        resolve(result as T);
      };

      this._worker.postMessage(payload);
    });
  }

  private _onMessage(event: MessageEvent): void {
    const data = event.data;

    if (!Array.isArray(data) || data.length < 2) {
      return;
    }

    const [messageId, error, result] = data as [number, Error | null, unknown];
    const callback = this._callbacks[messageId];

    if (callback) {
      delete this._callbacks[messageId];
      callback(error, result);
    }
  }
}

export function registerPromiseWrapperHandle(workerFunction: WorkerFunction): void {
  function logError(error: Error): void {
    if (typeof console !== 'undefined' && 'error' in console) {
      console.error('Worker caught an error:', error);
    }
  }

  function sendResponse(
    messageId: number,
    error: Error | null,
    result?: unknown
  ): void {
    if (error) {
      logError(error);
      self.postMessage([messageId, error]);
    } else {
      self.postMessage([messageId, null, result]);
    }
  }

  function executeCallback(
    callbackFunction: WorkerFunction,
    messageId: number,
    message: unknown
  ): void {
    let executionResult: { res?: unknown; err?: Error };

    try {
      executionResult = { res: callbackFunction(message) };
    } catch (error) {
      executionResult = { err: error as Error };
    }

    if (executionResult.err) {
      sendResponse(messageId, executionResult.err);
      return;
    }

    const result = executionResult.res;
    const isObjectOrFunction =
      result &&
      (typeof result === 'object' || typeof result === 'function');
    const isThenable = isObjectOrFunction && typeof (result as any).then === 'function';

    if (!isThenable) {
      sendResponse(messageId, null, result);
    } else {
      (result as Promise<unknown>)
        .then((resolvedValue: unknown) => {
          sendResponse(messageId, null, resolvedValue);
        })
        .catch((error: Error) => {
          sendResponse(messageId, error);
        });
    }
  }

  self.addEventListener('message', (event: MessageEvent) => {
    const data = event.data;

    if (!Array.isArray(data) || data.length !== 2) {
      logError(
        new Error(
          `Invalid incoming message format. Correct format is [messageId, message]. Received: ${data}`
        )
      );
      return;
    }

    const [messageId, message] = data as [number, unknown];

    if (typeof workerFunction !== 'function') {
      sendResponse(
        messageId,
        new Error(
          'No callback function is registered in worker thread. Call register() to register a callback.'
        )
      );
      return;
    }

    executeCallback(workerFunction, messageId, message);
  });
}