export class CancellationToken {
  promise: Promise<CancelReason>;
  reason?: CancelReason;

  constructor(executor: (cancel: (message?: string) => void) => void) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolve: (reason: CancelReason) => void;
    
    this.promise = new Promise<CancelReason>((res) => {
      resolve = res;
    });

    executor((message?: string) => {
      if (!this.reason) {
        this.reason = new CancelReason(message);
        resolve(this.reason);
      }
    });
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }

  static source(): CancellationTokenSource {
    let cancel: (message?: string) => void;

    const token = new CancellationToken((cancelFn) => {
      cancel = cancelFn;
    });

    return {
      token,
      cancel: cancel!
    };
  }
}

interface CancellationTokenSource {
  token: CancellationToken;
  cancel: (message?: string) => void;
}

class CancelReason extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'CancelReason';
  }
}