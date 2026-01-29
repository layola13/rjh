import { HSCore, HSCatalog } from './HSCore';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceLog';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface MousePoint {
  x: number;
  y: number;
}

interface CommandOutput {
  content: Structure;
}

interface MoveOptions {
  _moveonly?: boolean;
}

interface CommandEvent {
  event?: MouseEvent & { which: number; clientX: number; clientY: number };
  position?: Position;
  trackingMouse?: boolean;
  keyCode?: number;
}

interface Structure {
  x: number;
  y: number;
  z: number;
  contentType?: ContentType;
  setFlagOn(flag: HSCore.Model.StructureFlagEnum, value: boolean): void;
  setFlagOff(flag: HSCore.Model.StructureFlagEnum, value: boolean): void;
  hideFaces(): void;
  showFaces(): void;
}

interface ContentType {
  isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
}

interface TransactionRequest {
  receive(event: string, data: CommandEvent): void;
  hideAllSnapAuxilaries(): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: [Structure, MousePoint]): TransactionRequest;
  commit(request: TransactionRequest): void;
  abort(request: TransactionRequest): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(structure: Structure): void;
}

interface View2D {
  screenPointToModel(point: [number, number]): [number, number];
}

interface Application {
  transManager: TransactionManager;
  selectionManager: SelectionManager;
  getActive2DView(): View2D;
  is3DViewActive(): boolean;
}

interface CommandManager {
  cancel(command?: CmdMoveStructure): void;
  complete(command: CmdMoveStructure): void;
}

abstract class Command {
  mgr!: CommandManager;
  output?: CommandOutput;

  protected onReceive?(event: string, data: CommandEvent): boolean;
  protected onCancel?(data: CommandEvent): void;
  protected onComplete?(data: CommandEvent): void;
}

declare namespace HSApp {
  namespace App {
    function getApp(): Application;
  }
  namespace Cmd {
    export { Command };
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    MoveStructure = 'MoveStructure'
  }
}

declare const log: {
  logger(category: string): {
    time(operation: string): void;
    timeEnd(operation: string, log: boolean): void;
  };
};

export class CmdMoveStructure extends Command {
  private structure: Structure;
  private targetPosition?: Position;
  private moveonly: boolean;
  private selectionMgr: SelectionManager;
  private _completed: boolean;
  private beginPosition: Position;
  private mouseBeginPoint?: MousePoint;
  private _request?: TransactionRequest;
  private transMgr: TransactionManager;
  private _perfLog: ReturnType<typeof log.logger>;

  constructor(structure: Structure, targetPosition?: Position, options: MoveOptions = {}) {
    super();

    this._perfLog = log.logger(PerformanceLogCategory.Operation);
    this.structure = structure;
    this.output = {
      content: this.structure
    };
    this.beginPosition = {
      x: this.structure.x,
      y: this.structure.y,
      z: this.structure.z
    };
    this.targetPosition = targetPosition;
    this.moveonly = !!options._moveonly;
    this.transMgr = HSApp.App.getApp().transManager;
    this.selectionMgr = HSApp.App.getApp().selectionManager;
    this._completed = false;
  }

  onExecute(data?: CommandEvent): void {
    if (data?.event) {
      const activeView = HSApp.App.getApp().getActive2DView();
      const event = data.event;
      const modelPoint = activeView.screenPointToModel([event.clientX, event.clientY]);
      this.mouseBeginPoint = {
        x: modelPoint[0],
        y: modelPoint[1]
      };
    } else {
      this.mouseBeginPoint = {
        x: this.structure.x,
        y: this.structure.y
      };
    }

    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.MoveStructure,
      [this.structure, this.mouseBeginPoint]
    );

    this.structure.setFlagOn(HSCore.Model.StructureFlagEnum.dragOn, true);

    if (this.targetPosition) {
      this.onReceive('moveto', { position: this.targetPosition });
    } else {
      this.structure.hideFaces();
    }
  }

  onReceive(event: string, data: CommandEvent): boolean {
    switch (event) {
      case 'dragstart':
        if (!this.isDraggable() || !data.position) {
          this.mgr.cancel(this);
          return false;
        }
        this._request?.receive(event, data);
        break;

      case 'mousemove':
        this._request?.receive(event, data);
        break;

      case 'dragmove':
        this._request?.receive(event, data);
        return true;

      case 'mousedown':
        if (data.event?.which === 3) {
          this.mgr.cancel();
          return false;
        }
        return true;

      case 'mouseup':
        if (!this.moveonly) return false;
        if (!this._notSamePosition(this.beginPosition)) return false;
        this._onComplete();
        return true;

      case 'click':
        if (data.event?.which === 3) {
          this.mgr.cancel();
          return false;
        }
        break;

      case 'dragend':
        if (!this._notSamePosition(this.beginPosition)) return false;
        this._onComplete();
        return !data.trackingMouse;

      case 'moveto':
        if (!data.position || !this._notSamePosition(data.position)) {
          this.mgr.cancel(this);
          return true;
        }
        this._request?.receive(event, data);
        if (this.targetPosition || this.moveonly) {
          this._onComplete();
        }
        return true;

      case 'keydown':
      case 'keyup':
        if (data?.keyCode === 27) {
          this.mgr.cancel(this);
        }
        return true;

      default:
        return super.onReceive?.(event, data) ?? false;
    }

    return true;
  }

  onCancel(data: CommandEvent): void {
    super.onCancel?.(data);

    this.structure.setFlagOff(HSCore.Model.StructureFlagEnum.dragOn, true);
    this.selectionMgr.unselectAll();
    this.selectionMgr.select(this.structure);

    if (this._request) {
      this._request.hideAllSnapAuxilaries();
      this.structure.showFaces();
      this.transMgr.abort(this._request);
      this._request = undefined;
    }
  }

  onComplete(data: CommandEvent): void {
    super.onComplete?.(data);

    this._request?.hideAllSnapAuxilaries();
    this.structure.setFlagOff(HSCore.Model.StructureFlagEnum.dragOn, true);
    this.selectionMgr.unselectAll();
    this.selectionMgr.select(this.structure);
  }

  private _onComplete(): void {
    if (this._completed) return;

    this._perfLog.time(PerformanceOperationTypes.StructrueMoveCompleted);
    this._completed = true;
    this.structure.showFaces();
    
    if (this._request) {
      this.transMgr.commit(this._request);
    }
    
    this.mgr.complete(this);
    this._perfLog.timeEnd(PerformanceOperationTypes.StructrueMoveCompleted, true);
  }

  private isDraggable(): boolean {
    if (!this.structure) return false;

    const contentType = this.structure.contentType;
    if (!contentType) return false;

    if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam)) {
      return !HSApp.App.getApp().is3DViewActive();
    }

    return true;
  }

  private _notSamePosition(position: Position): boolean {
    return (
      !HSCore.Util.Math.nearlyEquals(position.x, this.structure.x) ||
      !HSCore.Util.Math.nearlyEquals(position.y, this.structure.y) ||
      !HSCore.Util.Math.nearlyEquals(position.z, this.structure.z)
    );
  }
}