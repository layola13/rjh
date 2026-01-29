interface GroupSpec {
  group: string;
  [key: string]: unknown;
}

interface ContentUtil {
  removeGroup(group: string): GroupSpec;
  addGroup(spec: GroupSpec): void;
}

interface TransactionRequest {
  onCommit(args: unknown[]): void;
  onUndo(): void;
  onRedo(): void;
  getDescription(): string;
  getCategory(): string;
}

declare const HSCore: {
  Util: {
    Content: ContentUtil;
  };
  Transaction: {
    Request: new () => TransactionRequest;
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

class UngroupModelRequest extends HSCore.Transaction.Request {
  private _group: string;
  private _spec!: GroupSpec;

  constructor(group: string) {
    super();
    this._group = group;
  }

  onCommit(): void {
    this._spec = HSCore.Util.Content.removeGroup(this._group);
    super.onCommit([]);
  }

  onUndo(): void {
    HSCore.Util.Content.addGroup(this._spec);
  }

  onRedo(): void {
    HSCore.Util.Content.removeGroup(this._spec.group);
  }

  getDescription(): string {
    return "解除模型组合";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default UngroupModelRequest;