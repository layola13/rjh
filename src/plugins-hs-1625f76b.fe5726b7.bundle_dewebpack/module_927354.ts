interface Group {
  toFlatGroupList(): Group[];
  toFlatMemberList(): unknown[];
}

interface RequestManager {
  createRequest(type: string, args: unknown[]): unknown;
}

interface Transaction {
  mgr: RequestManager;
  append(request: unknown): void;
}

declare const HSFPConstants: {
  RequestType: {
    UngroupContents: string;
    DeleteContent: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare namespace HSCore.Transaction.Common {
  class CompositeRequest implements Transaction {
    mgr: RequestManager;
    append(request: unknown): void;
  }
}

class DeleteGroupTransaction extends HSCore.Transaction.Common.CompositeRequest {
  private readonly _group: Group;

  constructor(group: Group) {
    super();
    this._group = group;
  }

  onCommit(): Group {
    this._group.toFlatGroupList().forEach((group: Group) => {
      const request = this.mgr.createRequest(
        HSFPConstants.RequestType.UngroupContents,
        [group]
      );
      this.append(request);
    });

    this._group.toFlatMemberList().forEach((member: unknown) => {
      const request = this.mgr.createRequest(
        HSFPConstants.RequestType.DeleteContent,
        [member]
      );
      this.append(request);
    });

    super.onCommit?.();
    
    return this._group;
  }

  getDescription(): string {
    return "删除模型组合";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default DeleteGroupTransaction;