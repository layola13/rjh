class CancellationToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(executor: (cancel: (message?: string) => void) => void) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }

    let resolvePromise: (reason: Cancel) => void;

    this.promise = new Promise<Cancel>((resolve) => {
      resolvePromise = resolve;
    });

    executor((message?: string) => {
      if (!this.reason) {
        this.reason = new Cancel(message);
        resolvePromise(this.reason);
      }
    });
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }

  static source(): CancellationTokenSource {
    let cancelFunction: (message?: string) => void;

    const token = new CancellationToken((cancel) => {
      cancelFunction = cancel;
    });

    return {
      token,
      cancel: cancelFunction!
    };
  }
}

interface CancellationTokenSource {
  token: CancellationToken;
  cancel: (message?: string) => void;
}

class Cancel {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}

export default CancellationToken;