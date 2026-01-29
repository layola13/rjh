interface DeltaEvent {
  delta: number;
}

interface TransactionRequest {
  receive(eventType: string, data: unknown): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
  abort(request: TransactionRequest): void;
}

interface Application {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): Application;
  };
  Cmd: {
    Command: new (...args: unknown[]) => Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    RotateStructure: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class Command {
  abstract onExecute(data?: unknown): void;
  abstract onReceive(eventType: string, data: unknown): boolean;
  abstract onComplete(): void;
  abstract onCancel(): void;
  abstract canUndoRedo(): boolean;
  abstract getCategory(): string;
}

export class CmdRotateStructure extends Command {
  private structure: unknown;
  private transMgr: TransactionManager;
  private _request?: TransactionRequest;
  private rotated?: boolean;

  constructor(structure: unknown) {
    super();
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(eventData?: DeltaEvent): void {
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.RotateStructure,
      [this.structure]
    );
    
    if (eventData) {
      this.onReceive("dragmove", eventData);
    }
  }

  onReceive(eventType: string, data: unknown): boolean {
    let shouldContinue = true;

    switch (eventType) {
      case "mouseup":
      case "sliderdragend":
      case "hotkeyend":
      case "sliderdragmove":
        break;

      case "dragmove":
      case "hotkey":
        const deltaEvent = data as DeltaEvent;
        const delta = deltaEvent.delta;
        
        if (isNaN(delta)) {
          break;
        }
        
        this.rotated = true;
        this._request?.receive(eventType, data);
        break;

      default:
        shouldContinue = super.onReceive(eventType, data);
    }

    return shouldContinue;
  }

  onComplete(): void {
    if (this.rotated && this._request) {
      this.transMgr.commit(this._request);
    }
  }

  onCancel(): void {
    if (this._request) {
      this.transMgr.abort(this._request);
      this._request = undefined;
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}