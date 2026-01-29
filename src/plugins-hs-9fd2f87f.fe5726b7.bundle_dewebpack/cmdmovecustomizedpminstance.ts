import { Vector3 } from './Vector3';
import { HSCore } from './HSCore';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface RotationData extends Position {
  XRotation: number;
  YRotation: number;
  Zrotation: number;
}

interface DragEventData {
  position?: number[];
  offset?: number[];
  moveby?: string;
  modelToScreen?: number;
  event: {
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
  };
  vectors?: unknown;
  linearMove?: unknown;
  pickedLayer?: unknown;
  mouseOver?: unknown;
}

interface MoveOptions {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  vectors?: unknown;
  linearMove?: unknown;
  mousePosition: Position;
  pickedLayer: unknown;
  pickResults?: unknown;
}

interface MoveOffsetAndOptions {
  offset: number[];
  op?: MoveOptions;
}

interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  vectors?: unknown;
  notZ: boolean;
  fixedZValue?: number;
  freeMove: boolean;
  stretchInSpace: boolean;
  constraintInRoom: boolean;
  constraintInPolygon: boolean;
  polygon: unknown;
  room: unknown;
  trySnapToAllContents: boolean;
  defaultGround?: unknown;
  freeMoveSnap?: unknown;
  pickResults?: unknown;
  linearMove?: unknown;
  mousePosition: Position;
}

interface SnappingStrategy {
  clean(): void;
}

interface SnappingHelper {
  strategies: SnappingStrategy[];
  activateLayer(layer: unknown): void;
  doSnapping(options: SnappingOptions): unknown;
}

interface CustomizedPMInstance {
  x: number;
  y: number;
  z: number;
  Zrotation: number;
  XRotation: number;
  YRotation: number;
  refreshBoundInternal?(): void;
}

interface Session {
  commit(): void;
  end(): void;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(type: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface View3D {
  setTrackingEntity(entity: unknown): void;
  setDragMoveEntityCenterPos(pos: Vector3): void;
}

interface View2D {
  context: {
    cursorStatus: {
      releaseStatus(): void;
    };
  };
  gizmoManager: {
    addGizmo(gizmo: unknown): void;
  };
  displayLayers: {
    temp: unknown;
  };
}

interface App {
  getActive3DView(): View3D | null;
  getActive2DView(): View2D;
  is3DViewActive(): boolean;
  primaryViewMode: unknown;
  floorplan: {
    scene: {
      activeLayer: unknown;
    };
  };
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(cmd: unknown): void;
  complete(cmd: unknown): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => unknown;
  };
  Snapping: {
    Helper: new (instance: CustomizedPMInstance) => SnappingHelper;
    SnapToFloor3D: new (instance: CustomizedPMInstance, helper: SnappingHelper, ...args: unknown[]) => SnappingStrategy;
    SnapToWall3D: new (instance: CustomizedPMInstance, helper: SnappingHelper, ...args: unknown[]) => SnappingStrategy;
    SnapToCeiling3D: new (instance: CustomizedPMInstance, helper: SnappingHelper, ...args: unknown[]) => SnappingStrategy;
    SnapToWall2D: new (instance: CustomizedPMInstance, helper: SnappingHelper, ...args: unknown[]) => SnappingStrategy;
  };
  View: {
    ViewModeEnum: {
      FirstPerson: unknown;
    };
  };
};

declare const HSFPConstants: {
  RequestType: {
    MoveCustomizedPMInstanceModel: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

class MoveContentGizmo {
  constructor(context: unknown, layer: unknown, command: unknown) {}
}

export class CmdMoveCustomizedPMInstance {
  private readonly _app: App;
  private _session?: Session;
  private readonly _instance: CustomizedPMInstance;
  private readonly _targetZ?: number;
  private readonly _basePosition: RotationData;
  private readonly snapScreenOffset: number = 15;
  private readonly defaultSnapOffset: number = 0.1;
  private snapOffset: number;
  private snappingHelper?: SnappingHelper;
  private snappingResult?: unknown;
  private moveContentGizmo?: MoveContentGizmo;
  private dragged: boolean = false;
  private keepZAxis?: boolean;
  private _option?: { forceKeepZAxis?: boolean };

  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(instance: CustomizedPMInstance, targetZ?: number) {
    this._app = HSApp.App.getApp();
    this._instance = instance;
    this._targetZ = targetZ;
    this._basePosition = this._saveRestoreData();
    this.snapOffset = this.defaultSnapOffset;

    if (instance?.refreshBoundInternal) {
      instance.refreshBoundInternal();
    }
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._session = transManager.startSession();

    const view3D = this._app.getActive3DView();
    if (view3D) {
      view3D.setTrackingEntity(this._instance);
      view3D.setDragMoveEntityCenterPos(this._getEntityCenterPos());
    }

    if (this._targetZ !== undefined) {
      this._instance.z = this._targetZ;
    }

    this.snappingHelper = new HSApp.Snapping.Helper(this._instance);
    const strategies = this._getSnappingStrategies(this.snappingHelper);
    this.snappingHelper.strategies = strategies;

    this._createGizmo();
  }

  onReceive(eventType: string, data: DragEventData): boolean {
    switch (eventType) {
      case 'dragstart':
        if (!data.position) {
          this.mgr.cancel(this);
          return false;
        }
        this.dragged = true;
        return true;

      case 'dragmove':
        if (!data.position) {
          return false;
        }
        const moveData = this._getMoveOffsetAndOptions(data);
        this.move(moveData.offset, moveData.op!);
        this._changeCursorStatus();
        return true;

      case 'moveto':
        this.moveto(data.position as unknown as Position);
        this._onComplete();
        return true;

      case 'mouseup':
      case 'click':
      case 'dragend':
        if (!data.position) {
          return false;
        }
        this._onComplete(data.position as unknown as Position);
        return false;

      default:
        return false;
    }
  }

  private _onComplete(position?: Position): void {
    const transManager = this.context.transManager;

    if (position) {
      this.moveto(position);
    }

    const instance = this._instance;
    const newPosition: RotationData = {
      x: this._instance.x,
      y: this._instance.y,
      z: this._instance.z,
      Zrotation: this._instance.Zrotation,
      XRotation: this._instance.XRotation,
      YRotation: this._instance.YRotation,
    };

    const request = transManager.createRequest(
      HSFPConstants.RequestType.MoveCustomizedPMInstanceModel,
      [instance, this._basePosition, newPosition]
    );

    transManager.commit(request);
    this.mgr.complete(this);
  }

  onComplete(): void {
    if (this._session) {
      this._session.commit();
    }

    if (this.snappingHelper) {
      this.snappingHelper.strategies.forEach((strategy) => {
        strategy.clean();
      });
    }
  }

  onCancel(): void {
    if (this._session) {
      this._session.end();
    }

    if (this.snappingHelper) {
      this.snappingHelper.strategies.forEach((strategy) => {
        strategy.clean();
      });
    }
  }

  private _getSnappingStrategies(helper: SnappingHelper): SnappingStrategy[] {
    const strategyClasses: Array<new (instance: CustomizedPMInstance, helper: SnappingHelper, ...args: unknown[]) => SnappingStrategy> = [];

    if (this._app.is3DViewActive()) {
      strategyClasses.push(HSApp.Snapping.SnapToFloor3D);
      strategyClasses.push(HSApp.Snapping.SnapToWall3D);
      strategyClasses.push(HSApp.Snapping.SnapToCeiling3D);
    } else {
      strategyClasses.push(HSApp.Snapping.SnapToWall2D);
    }

    return strategyClasses.map((StrategyClass) => {
      return new StrategyClass(this._instance, helper);
    });
  }

  private _getMoveOffsetAndOptions(eventData: DragEventData): MoveOffsetAndOptions {
    let offset = eventData.offset;
    const position = eventData.position!;

    if (!offset) {
      if (position.length < 2) {
        return { offset: [0, 0, 0] };
      }

      offset = [
        position[0] - this._basePosition.x,
        position[1] - this._basePosition.y,
        position.length > 2 ? position[2] - this._basePosition.z : 0,
      ];
    }

    if (eventData.moveby !== 'contentlift') {
      offset[2] = 0;
    }

    if (eventData.modelToScreen) {
      this.snapOffset = this.snapScreenOffset / eventData.modelToScreen;
    }

    if (this.snapOffset > this.defaultSnapOffset) {
      this.snapOffset = this.defaultSnapOffset;
    }

    return {
      offset,
      op: {
        ctrlKey: eventData.event.ctrlKey,
        shiftKey: eventData.event.shiftKey,
        altKey: eventData.event.altKey,
        vectors: eventData.vectors,
        linearMove: eventData.linearMove,
        mousePosition: {
          x: position[0],
          y: position[1],
          z: position.length > 2 ? position[2] : this._basePosition.z,
        },
        pickedLayer: eventData.pickedLayer ?? this._app.floorplan.scene.activeLayer,
        pickResults: eventData.mouseOver,
      },
    };
  }

  private _doSnapping(fixedZ: number, keepZAxis: boolean, options: MoveOptions): void {
    if (!this.snappingHelper) {
      return;
    }

    this.snappingHelper.activateLayer(options.pickedLayer);

    const shouldSnapToAllContents = this._app.primaryViewMode !== HSApp.View.ViewModeEnum.FirstPerson;

    const snappingResult = this.snappingHelper.doSnapping({
      snapOffset: this.snapOffset,
      autoFitEnable: false,
      ignoreSnapOffset: false,
      vectors: options.vectors,
      notZ: keepZAxis,
      fixedZValue: keepZAxis ? fixedZ : undefined,
      freeMove: options.ctrlKey,
      stretchInSpace: options.altKey,
      constraintInRoom: false,
      constraintInPolygon: false,
      polygon: undefined,
      room: undefined,
      trySnapToAllContents: shouldSnapToAllContents,
      defaultGround: undefined,
      freeMoveSnap: undefined,
      pickResults: options.pickResults,
      linearMove: options.linearMove,
      mousePosition: options.mousePosition,
    });

    this.snappingResult = snappingResult;
  }

  private _changeCursorStatus(): void {
    this._app.getActive2DView().context.cursorStatus.releaseStatus();
  }

  private _saveRestoreData(): RotationData {
    return {
      x: this._instance.x,
      y: this._instance.y,
      z: this._instance.z,
      XRotation: this._instance.XRotation,
      YRotation: this._instance.YRotation,
      Zrotation: this._instance.Zrotation,
    };
  }

  private _getEntityCenterPos(): Vector3 {
    const centerPos = new Vector3();
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this._instance);
    centerPos.applyMatrix4(globalMatrix);
    centerPos.setZ(centerPos.z);
    return centerPos;
  }

  private _updateContentPosition(offset: number[], keepZAxis: boolean): void {
    if (!offset) {
      return;
    }

    const instance = this._instance;
    const basePosition = this._basePosition;

    instance.x = basePosition.x + offset[0];
    instance.y = basePosition.y + offset[1];

    if (offset[2] && !keepZAxis) {
      instance.z = basePosition.z + offset[2];
    }
  }

  moveto(position: Partial<Position>): void {
    const instance = this._instance;

    if (position.x !== undefined) {
      instance.x = position.x;
    }

    if (position.y !== undefined) {
      instance.y = position.y;
    }

    if (position.z !== undefined) {
      instance.z = position.z;
    }
  }

  move(offset: number[], options: MoveOptions): void {
    const keepZAxis = (options.shiftKey && this.keepZAxis) || 
                      (this._option?.forceKeepZAxis ?? false);
    const currentZ = this._instance.z;

    this._updateContentPosition(offset, keepZAxis);
    this._doSnapping(currentZ, keepZAxis, options);
  }

  private _createGizmo(): void {
    const view2D = this._app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;

    this.moveContentGizmo = new MoveContentGizmo(
      view2D.context,
      view2D.displayLayers.temp,
      this
    );

    gizmoManager.addGizmo(this.moveContentGizmo);
  }

  getDescription(): string {
    return '移动自由造型模型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}