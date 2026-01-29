import { HSCore, HSCatalog } from './types/HSCore';
import { HSApp } from './types/HSApp';
import { HSFPConstants } from './types/HSFPConstants';

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface MouseEvent {
  clientX: number;
  clientY: number;
  which: number;
}

interface ExecuteOptions {
  event?: MouseEvent;
  trackingMouse?: boolean;
}

interface ReceiveOptions {
  position?: Position;
  event?: MouseEvent;
  keyCode?: number;
  trackingMouse?: boolean;
}

interface MoveBeamOptions {
  _moveonly?: boolean;
  onPasteSequence?: boolean;
  from?: unknown[];
}

interface Beam {
  x: number;
  y: number;
  z: number;
  contentType?: ContentType;
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

interface ContentType {
  isTypeOf(type: number): boolean;
}

interface TransactionRequest {
  receive(event: string, data: ReceiveOptions): void;
  hideAllSnapAuxilaries(): void;
}

interface TransactionManager {
  createRequest(type: number, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
  abort(request: TransactionRequest): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(item: Beam): void;
}

interface View2D {
  screenPointToModel(point: [number, number]): [number, number];
}

interface CommandManager {
  cancel(command?: CmdMoveBeam): void;
  complete(command: CmdMoveBeam): void;
}

interface CommandOutput {
  content: Beam;
}

export class CmdMoveBeam extends HSApp.Cmd.Command {
  public beam: Beam;
  public targetPosition?: Position;
  public moveonly: boolean;
  public fromBeam?: unknown;
  public mouseBeginPoint?: Position;
  public output: CommandOutput;
  protected _request?: TransactionRequest;
  protected transMgr: TransactionManager;
  protected selectionMgr: SelectionManager;
  protected mgr: CommandManager;

  constructor(beam: Beam, targetPosition: Position | undefined, options: MoveBeamOptions) {
    super();
    
    this.beam = beam;
    this.output = {
      content: this.beam
    };
    this.targetPosition = targetPosition;
    this.moveonly = !!options._moveonly;
    this.transMgr = HSApp.App.getApp().transManager;
    this.selectionMgr = HSApp.App.getApp().selectionManager;
    
    if (options?.onPasteSequence && options.from?.length === 1) {
      this.fromBeam = options.from[0];
    }
  }

  public onExecute(executeOptions?: ExecuteOptions): void {
    if (executeOptions) {
      const activeView = HSApp.App.getApp().getActive2DView() as View2D;
      const event = executeOptions.event!;
      const modelPoint = activeView.screenPointToModel([event.clientX, event.clientY]);
      
      this.mouseBeginPoint = {
        x: modelPoint[0],
        y: modelPoint[1]
      };
    } else {
      this.mouseBeginPoint = {
        x: this.beam.x,
        y: this.beam.y
      };
    }

    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.MoveBeam,
      [this.beam, this.mouseBeginPoint, this.fromBeam]
    );
    
    this.beam.setFlagOn(HSCore.Model.StructureFlagEnum.dragOn, true);
    
    if (this.targetPosition) {
      this.onReceive("moveto", { position: this.targetPosition });
    }
  }

  public onReceive(eventName: string, options: ReceiveOptions): boolean {
    switch (eventName) {
      case "dragstart":
        if (!this.isDraggable() || !options.position) {
          this.mgr.cancel(this);
          return false;
        }
        this._request!.receive(eventName, options);
        break;

      case "mousemove":
        this._request!.receive(eventName, options);
        break;

      case "dragmove":
        this._request!.receive(eventName, options);
        return true;

      case "mousedown":
        if (options.event?.which === 3) {
          this.mgr.cancel();
          return false;
        }
        this._onComplete();
        return true;

      case "mouseup":
        if (!this.moveonly) {
          return false;
        }
        // Fall through to click case
        
      case "click":
        if (options.event?.which === 3) {
          this.mgr.cancel();
          return false;
        }
        // Fall through to dragend case

      case "dragend":
        this._onComplete();
        return !options.trackingMouse;

      case "moveto":
        if (!this._notSamePosition(options.position!)) {
          this.mgr.cancel(this);
          return true;
        }
        this._request!.receive(eventName, options);
        if (this.targetPosition || this.moveonly) {
          this._onComplete();
        }
        return true;

      case "keydown":
      case "keyup":
        if (options.keyCode === 27) {
          this.mgr.cancel(this);
        }
        return true;

      default:
        return super.onReceive?.(eventName, options) ?? false;
    }
    
    return true;
  }

  public onCancel(): void {
    this.beam.setFlagOff(HSCore.Model.StructureFlagEnum.dragOn, true);
    this.selectionMgr.unselectAll();
    this.selectionMgr.select(this.beam);
    
    if (this._request) {
      this._request.hideAllSnapAuxilaries();
      this.transMgr.abort(this._request);
      this._request = undefined;
    }
  }

  public onComplete(): void {
    this._request!.hideAllSnapAuxilaries();
    this.beam.setFlagOff(HSCore.Model.StructureFlagEnum.dragOn, true);
    this.selectionMgr.unselectAll();
    this.selectionMgr.select(this.beam);
  }

  protected _onComplete(): void {
    this.transMgr.commit(this._request!);
    this.mgr.complete(this);
  }

  public isDraggable(): boolean {
    if (!this.beam) {
      return false;
    }
    
    const contentType = this.beam.contentType;
    if (!contentType) {
      return false;
    }
    
    if (!contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam)) {
      return true;
    }
    
    return !HSApp.App.getApp().is3DViewActive();
  }

  protected _notSamePosition(position: Position): boolean {
    return (
      !HSCore.Util.Math.nearlyEquals(position.x, this.beam.x) ||
      !HSCore.Util.Math.nearlyEquals(position.y, this.beam.y) ||
      !HSCore.Util.Math.nearlyEquals(position.z ?? 0, this.beam.z)
    );
  }
}