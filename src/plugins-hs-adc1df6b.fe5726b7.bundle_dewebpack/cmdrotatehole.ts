import { Command } from './Command';

interface Hole {
  // Define hole properties based on your application context
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
  abort(request: TransactionRequest): void;
}

interface TransactionRequest {
  receive(eventType: string, data: EventData): void;
}

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface Context {
  transManager: {
    startSession(): TransactionSession;
  };
}

interface EventData {
  delta?: number;
  [key: string]: unknown;
}

declare const HSApp: {
  App: {
    getApp(): {
      transManager: TransactionManager;
    };
  };
  Cmd: {
    Command: typeof Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    RotateHole: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

/**
 * Command for rotating a hole in the application
 */
export class CmdRotateHole extends Command {
  private hole: Hole;
  private transMgr: TransactionManager;
  private _session?: TransactionSession;
  private _request?: TransactionRequest;
  private rotated: boolean = false;
  protected context!: Context;

  constructor(hole: Hole) {
    super();
    this.hole = hole;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(eventData?: EventData): void {
    this._session = this.context.transManager.startSession();
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.RotateHole,
      [this.hole]
    );
    
    if (eventData) {
      this.onReceive('dragmove', eventData);
    }
  }

  onReceive(eventType: string, eventData: EventData): boolean {
    let continueProcessing = true;

    switch (eventType) {
      case 'mouseup':
      case 'sliderdragend':
      case 'hotkeyend':
      case 'sliderdragmove':
        break;

      case 'dragmove':
      case 'hotkey':
        const delta = eventData.delta;
        if (delta === undefined || isNaN(delta)) {
          break;
        }
        this.rotated = true;
        this._request?.receive(eventType, eventData);
        break;

      default:
        continueProcessing = super.onReceive(eventType, eventData);
    }

    return continueProcessing;
  }

  onComplete(): void {
    if (this.rotated && this._request) {
      this.transMgr.commit(this._request);
    }
    
    if (this._session) {
      this._session.commit();
    }
  }

  onCancel(): void {
    if (this._request) {
      this.transMgr.abort(this._request);
      this._request = undefined;
    }
    
    if (this._session) {
      this._session.abort();
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}