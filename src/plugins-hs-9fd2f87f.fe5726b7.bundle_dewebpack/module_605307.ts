interface Content {
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  [key: string]: unknown;
}

interface Context {
  transManager: TransactionManager;
}

interface Command {
  context: Context;
}

declare const HSFPConstants: {
  RequestType: {
    NEditParametricCeiling: string;
  };
};

declare namespace HSApp.Cmd {
  class Command implements Command {
    context: Context;
  }
}

/**
 * Parametric ceiling edit command
 */
export default class ParametricCeilingEditCommand extends HSApp.Cmd.Command {
  private _content: Content;
  private _requestType: string;
  private _request?: Request;

  constructor(content: Content) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.NEditParametricCeiling;
    this._request = undefined;
  }

  /**
   * Commits the current request to the transaction manager
   */
  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  public onExecute(): void {
    // No implementation needed
  }

  public onReceive(eventName: string, eventData: unknown): boolean {
    const transManager = this.context.transManager;

    switch (eventName) {
      case "ceilingchangebegin":
        break;

      case "ceilingchanging":
        return true;

      case "ceilingchangeend":
      case "ceilingReset":
      case "rotationchangeend":
      case "ceilingResetIncludeRotate":
        this._request = transManager.createRequest(
          this._requestType,
          [this._content, eventName, eventData]
        );
        this._commitRequest();
        return true;
    }

    return super.onReceive?.(eventName, eventData) ?? false;
  }
}