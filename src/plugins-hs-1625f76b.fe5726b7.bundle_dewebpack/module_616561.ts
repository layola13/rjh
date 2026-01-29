interface CornerWindow {
  getHost(): ContentHost | null;
  _host: ContentHost | null;
  assignTo(host: ContentHost): void;
}

interface ContentHost {
  // Define properties as needed based on your application
}

interface TransactionSpec {
  // Define properties as needed based on your application
}

declare namespace HSCore {
  namespace Util {
    namespace Content {
      function removeCornerWindow(cornerWindow: CornerWindow): TransactionSpec;
    }
  }
  
  namespace Transaction {
    namespace Common {
      class StateRequest {
        protected _spec?: TransactionSpec;
        onCommit(args: unknown[]): unknown;
        onUndo(args: unknown[]): void;
      }
    }
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    ContentOperation = "ContentOperation"
  }
}

/**
 * Transaction for removing a corner window from the content
 */
export default class RemoveCornerWindowTransaction extends HSCore.Transaction.Common.StateRequest {
  private _cornerWindow: CornerWindow;
  private _contentHost: ContentHost | null;

  constructor(cornerWindow: CornerWindow) {
    super();
    this._cornerWindow = cornerWindow;
    this._contentHost = this._cornerWindow?.getHost() ?? null;
  }

  onCommit(): CornerWindow {
    this._spec = HSCore.Util.Content.removeCornerWindow(this._cornerWindow);
    super.onCommit([]);
    return this._cornerWindow;
  }

  onUndo(): void {
    super.onUndo([]);
    if (this._cornerWindow && this._contentHost) {
      this._cornerWindow._host = null;
      this._cornerWindow.assignTo(this._contentHost);
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除转角窗";
  }

  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}