import { Command } from 'HSApp/Cmd/Command';
import { App } from 'HSApp/App';
import { Helper as SnappingHelper } from 'HSApp/Snapping/Helper';
import { SnapToFloor3D, SnapToWall3D, SnapToCeiling3D, SnapToWall2D } from 'HSApp/Snapping';
import { HSCore } from 'HSCore';
import { RequestType, PluginType } from 'HSFPConstants';
import { ViewModeEnum } from 'HSApp/View';
import { Manager as SelectionManager } from 'HSApp/Selection';
import { CustomizedPMModel } from 'HSApp/Util';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface MetaAttribute {
  id: string;
  free: string[];
}

interface CommandMeta {
  userFreeData?: ModelData;
  attributes: MetaAttribute[];
  contentType: string;
}

interface ModelInfo {
  pos: Position;
  XLength: number;
  YLength: number;
  ZLength: number;
  scale: number;
  rotation: number;
}

interface ModelData {
  model3d: unknown;
  modelInfo: ModelInfo;
}

interface MouseEventData {
  position: number[];
  event: {
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
  };
  vectors?: unknown;
  linearMove?: unknown;
  pickedLayer?: unknown;
  mouseOver?: unknown;
  modelToScreen?: number;
  keyCode?: number;
}

interface SnappingContext {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  vectors: unknown;
  linearMove: unknown;
  mousePosition: Position;
  pickedLayer: unknown;
  pickResults: unknown;
  defaultGround?: unknown;
  freeMoveSnap?: unknown;
}

interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  vectors: unknown;
  notZ: boolean;
  fixedZValue?: number;
  freeMove: boolean;
  stretchInSpace: boolean;
  constraintInRoom: boolean;
  constraintInPolygon: boolean;
  polygon: undefined;
  room: undefined;
  trySnapToAllContents: boolean;
  defaultGround?: unknown;
  freeMoveSnap?: unknown;
  pickResults: unknown;
  linearMove: unknown;
  mousePosition: Position;
}

const ESCAPE_KEY_CODE = 27;
const CUSTOM_MODEL_URL_ATTR_ID = 'attr-personal-custom-model-url';
const DEFAULT_SNAP_SCREEN_OFFSET = 15;
const DEFAULT_SNAP_OFFSET = 0.1;

export class CmdImportCustomizedPMInstance extends Command {
  private _app: App;
  private _session: unknown;
  private _meta: CommandMeta;
  private _userInputPlugin: unknown;
  private _fp: unknown;
  private _originMousePos: Position;
  private _preMousePos?: Position;
  private _previewEntity?: any;
  private _previewCreate: boolean = false;
  private _request?: unknown;
  private snappingHelper?: SnappingHelper;
  private snappingResult?: unknown;
  private snapScreenOffset: number;
  private defaultSnapOffset: number;
  private snapOffset: number;

  constructor(meta: CommandMeta) {
    super();
    this._app = (HSApp.App as any).getApp();
    this._meta = meta;
    this._userInputPlugin = this._app.pluginManager.getPlugin(PluginType.UserInput);
    this._fp = HSCore.Doc.getDocManager().activeDocument;
    this._originMousePos = { x: 0, y: 0, z: 0 };
    this.snapScreenOffset = DEFAULT_SNAP_SCREEN_OFFSET;
    this.defaultSnapOffset = DEFAULT_SNAP_OFFSET;
    this.snapOffset = this.defaultSnapOffset;
  }

  private _getLastMousePosition = (): Position => {
    const mousePosition = (this._userInputPlugin as any).getMousePosition();
    return this._app.activeView.pick(mousePosition);
  };

  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._session = transactionManager.startSession();
  }

  onReceive(eventType: string, eventData: MouseEventData): boolean {
    switch (eventType) {
      case 'mousemove':
        this._onMove(eventData);
        break;
      case 'click':
        this._onComplete();
        break;
      case 'keydown':
        if (eventData?.keyCode === ESCAPE_KEY_CODE) {
          this._onCancel();
        }
        break;
    }
    return super.onReceive(eventType, eventData);
  }

  private _getSnappingStrategies(helper: SnappingHelper): any[] {
    const strategies: any[] = [];
    
    if (this._app.is3DViewActive()) {
      strategies.push(SnapToFloor3D);
      strategies.push(SnapToWall3D);
      strategies.push(SnapToCeiling3D);
    } else {
      strategies.push(SnapToWall2D);
    }

    return strategies.map(StrategyClass => 
      new StrategyClass(this._previewEntity, helper, undefined, undefined)
    );
  }

  private async _onMove(eventData: MouseEventData): Promise<void> {
    this.mgr.freezeProcess();

    if (!this._previewCreate) {
      await this._makePreview();
    }

    if (!this._previewEntity) {
      this.mgr.unfreezeProcess();
      return;
    }

    let currentPosition: Position = { x: 0, y: 0, z: 0 };

    if (this._preMousePos) {
      if (eventData.position) {
        currentPosition = {
          x: eventData.position[0],
          y: eventData.position[1],
          z: eventData.position.length > 2 ? eventData.position[2] : 0
        };
      }
    } else {
      currentPosition = this._getLastMousePosition();
      this._preMousePos = this._originMousePos;
    }

    currentPosition.x = currentPosition.x ?? this._preMousePos.x;
    currentPosition.y = currentPosition.y ?? this._preMousePos.y;
    currentPosition.z = currentPosition.z ?? this._preMousePos.z;

    const delta: Position = {
      x: currentPosition.x - this._preMousePos.x,
      y: currentPosition.y - this._preMousePos.y,
      z: currentPosition.z - this._preMousePos.z
    };

    const originalZ = this._previewEntity.z;
    this._previewEntity.x += delta.x;
    this._previewEntity.y += delta.y;
    this._previewEntity.z += delta.z;

    const snappingContext: SnappingContext = {
      ctrlKey: eventData.event.ctrlKey,
      shiftKey: eventData.event.shiftKey,
      altKey: eventData.event.altKey,
      vectors: eventData.vectors,
      linearMove: eventData.linearMove,
      mousePosition: {
        x: eventData.position[0],
        y: eventData.position[1],
        z: eventData.position.length > 2 ? eventData.position[2] : this._previewEntity.z
      },
      pickedLayer: eventData.pickedLayer ?? this._app.floorplan.scene.activeLayer,
      pickResults: eventData.mouseOver
    };

    if (eventData.modelToScreen) {
      this.snapOffset = this.snapScreenOffset / eventData.modelToScreen;
    }

    if (this.snapOffset > this.defaultSnapOffset) {
      this.snapOffset = this.defaultSnapOffset;
    }

    this._doSnapping(originalZ, false, snappingContext);

    this._preMousePos = {
      x: this._previewEntity.x,
      y: this._previewEntity.y,
      z: this._previewEntity.z
    };

    this.mgr.unfreezeProcess();
  }

  private _doSnapping(originalZ: number, fixZ: boolean, context: SnappingContext): void {
    if (!this.snappingHelper) {
      return;
    }

    this.snappingHelper.activateLayer(context.pickedLayer);

    const isNotFirstPerson = this._app.primaryViewMode !== ViewModeEnum.FirstPerson;

    const snappingOptions: SnappingOptions = {
      snapOffset: this.snapOffset,
      autoFitEnable: false,
      ignoreSnapOffset: false,
      vectors: context.vectors,
      notZ: fixZ,
      fixedZValue: fixZ ? originalZ : undefined,
      freeMove: context.ctrlKey,
      stretchInSpace: context.altKey,
      constraintInRoom: false,
      constraintInPolygon: false,
      polygon: undefined,
      room: undefined,
      trySnapToAllContents: isNotFirstPerson,
      defaultGround: context.defaultGround,
      freeMoveSnap: context.freeMoveSnap,
      pickResults: context.pickResults,
      linearMove: context.linearMove,
      mousePosition: context.mousePosition
    };

    this.snappingResult = this.snappingHelper.doSnapping(snappingOptions);
  }

  private _onCancel(): void {
    this._clearPreview();

    if (this._session) {
      (this._session as any).end();
    }

    if (this.snappingHelper) {
      this.snappingHelper.strategies.forEach(strategy => strategy.clean());
    }

    this.context.app.cmdManager.cancel(this);
  }

  private async _onComplete(): Promise<void> {
    if (!this._previewEntity) {
      return;
    }

    this.mgr.complete(this);

    if (this._session) {
      (this._session as any).commit();
    }

    if (this.snappingHelper) {
      this.snappingHelper.strategies.forEach(strategy => strategy.clean());
    }
  }

  private async _makePreview(): Promise<void> {
    const transactionManager = this.context.transManager;
    let userData = this._meta.userFreeData;

    const customModelAttr = this._meta.attributes.find(
      attr => attr.id === CUSTOM_MODEL_URL_ATTR_ID
    );

    if (customModelAttr?.free[0]) {
      const response = await fetch(customModelAttr.free[0]);
      userData = await response.json();
    }

    if (!userData) {
      this._onCancel();
      return;
    }

    const { scale, rotation } = userData.modelInfo;

    this._request = transactionManager.createRequest(
      RequestType.ImportCustomizedPMInstanceModel,
      [
        this._fp,
        userData.model3d,
        this._meta.contentType,
        userData.modelInfo.pos,
        userData.modelInfo.XLength,
        userData.modelInfo.YLength,
        userData.modelInfo.ZLength,
        scale,
        rotation
      ]
    );

    await this.context.transManager.commitAsync(this._request).then((entity: any) => {
      if (!entity) {
        return;
      }

      this._previewEntity = entity;

      SelectionManager.unselectAll();
      SelectionManager.select(this._previewEntity);

      this._originMousePos.x = this._previewEntity.x;
      this._originMousePos.y = this._previewEntity.y;
      this._originMousePos.z = this._previewEntity.z;

      if (entity.refreshBoundInternal) {
        entity.refreshBoundInternal();
      }

      this.snappingHelper = new SnappingHelper(this._previewEntity);
      const strategies = this._getSnappingStrategies(this.snappingHelper);
      this.snappingHelper.strategies = strategies;
    });

    this._previewCreate = true;
  }

  private _clearPreview(): void {
    if (this._previewEntity) {
      CustomizedPMModel.removeCustomizedPMInstance(this._previewEntity);
    }
  }
}