interface PAssemblySpec {
  [key: string]: unknown;
}

interface PAssembly {
  [key: string]: unknown;
}

interface HSCoreUtil {
  Content: {
    getPAssemblySpec(passembly: PAssembly): PAssemblySpec;
    removePAssembly(passembly: PAssembly): void;
    addPAssembly(spec: PAssemblySpec): void;
  };
}

interface HSCoreTransaction {
  Request: new (...args: unknown[]) => TransactionRequest;
}

interface TransactionRequest {
  onCommit?(): unknown;
  onUndo?(): void;
  onRedo?(): void;
  getCategory?(): string;
}

interface HSFPConstantsType {
  LogGroupTypes: {
    ContentOperation: string;
  };
}

declare const HSCore: {
  Util: HSCoreUtil;
  Transaction: HSCoreTransaction;
};

declare const HSFPConstants: HSFPConstantsType;

class RemovePAssemblyRequest extends HSCore.Transaction.Request {
  private _passembly: PAssembly;
  private _spec?: PAssemblySpec;

  constructor(passembly: PAssembly) {
    super();
    this._passembly = passembly;
  }

  onCommit(): PAssembly {
    this._spec = HSCore.Util.Content.getPAssemblySpec(this._passembly);
    HSCore.Util.Content.removePAssembly(this._passembly);
    return this._passembly;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.addPAssembly(this._spec);
    }
  }

  onRedo(): void {
    HSCore.Util.Content.removePAssembly(this._passembly);
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default RemovePAssemblyRequest;