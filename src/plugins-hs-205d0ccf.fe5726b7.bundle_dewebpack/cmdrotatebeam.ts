import { Command } from './Command';
import { TransactionManager, TransactionRequest, TransactionSession } from './TransactionManager';

interface RotateBeamEvent {
  delta?: number;
  [key: string]: unknown;
}

interface Beam {
  id?: string;
  [key: string]: unknown;
}

export class CmdRotateBeam extends Command {
  private beam: Beam;
  private snapEnabled: boolean;
  private transMgr: TransactionManager;
  private _session?: TransactionSession;
  private _request?: TransactionRequest;
  private rotated: boolean = false;

  constructor(beam: Beam, snapEnabled: boolean = true) {
    super();
    this.beam = beam;
    this.snapEnabled = snapEnabled;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(event?: RotateBeamEvent): void {
    this._session = this.context.transManager.startSession();
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.RotateBeam,
      [this.beam]
    );
    
    if (event) {
      this.onReceive('dragmove', event);
    }
  }

  onReceive(eventType: string, event: RotateBeamEvent): boolean {
    let shouldContinue = true;

    switch (eventType) {
      case 'mouseup':
      case 'sliderdragend':
      case 'hotkeyend':
      case 'sliderdragmove':
        break;

      case 'dragmove':
      case 'hotkey':
        const delta = event.delta;
        if (isNaN(delta)) {
          break;
        }
        this.rotated = true;
        this._request?.receive(eventType, event);
        break;

      default:
        shouldContinue = super.onReceive(eventType, event);
    }

    return shouldContinue;
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