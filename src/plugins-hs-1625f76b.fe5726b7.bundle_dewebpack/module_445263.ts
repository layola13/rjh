interface Cabinet {
  forEachPart(callback: (part: any, index: number, array: any[]) => void, context: any): void;
}

interface CabinetSpec {
  // Define cabinet specification structure based on your domain model
  [key: string]: any;
}

interface RequestManager {
  createRequest(type: string, args: any[]): any;
}

interface CompositeRequest {
  mgr: RequestManager;
  append(request: any): void;
  onCommit(args: any[]): any;
  onUndo(args: any[]): void;
  onRedo(args: any[]): void;
}

declare const HSFPConstants: {
  RequestType: {
    DeleteContent: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare const HSCore: {
  Util: {
    Content: {
      removeCustomizedCabinet(cabinet: Cabinet): CabinetSpec;
      addCustomizedCabinet(spec: CabinetSpec): void;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: new () => CompositeRequest;
    };
  };
};

class DeleteCabinetRequest extends (HSCore.Transaction.Common.CompositeRequest as any) {
  private _cabinet: Cabinet;
  private _spec?: CabinetSpec;

  constructor(cabinet: Cabinet) {
    super();
    this._cabinet = cabinet;
  }

  onCommit(): Cabinet {
    this._cabinet.forEachPart((part: any, index: number, array: any[]) => {
      const request = this.mgr.createRequest(HSFPConstants.RequestType.DeleteContent, [part]);
      this.append(request);
    }, this);

    this._spec = HSCore.Util.Content.removeCustomizedCabinet(this._cabinet);
    super.onCommit([]);
    return this._cabinet;
  }

  onUndo(): void {
    super.onUndo([]);
    if (this._spec) {
      HSCore.Util.Content.addCustomizedCabinet(this._spec);
    }
  }

  onRedo(): void {
    HSCore.Util.Content.removeCustomizedCabinet(this._cabinet);
    super.onRedo([]);
  }

  getDescription(): string {
    return "删除橱柜";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default DeleteCabinetRequest;