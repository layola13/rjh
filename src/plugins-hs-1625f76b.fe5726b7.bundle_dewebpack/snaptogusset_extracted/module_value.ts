interface MoveOptions {
  constraintInRoom?: boolean;
  ignoreSnapOffset?: boolean;
  keepZAxis?: boolean;
  select?: boolean;
  autoFitDirectionEnable?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Content {
  contentType: ContentType;
  z: number;
  x: number;
  y: number;
  isSimulated: boolean;
  getUniqueParent(): unknown;
  needUpdate?: boolean;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface TransactionManager {
  startSession(): unknown;
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
}

interface AppSettings {
  getViewItem(key: string): boolean;
  setViewItem(key: string, value: boolean): void;
}

interface View3D {
  setTrackingEntity(entity: Content): void;
  setDragMoveEntityCenterPos(pos: Point3D): void;
}

interface App {
  activeEnvironmentId: string;
  appSettings: AppSettings;
  floorplan: {
    scene: {
      getLayerAltitude(parent: unknown): number;
    };
  };
  getActive3DView(): View3D | null;
}

interface SnappingHelper {
  strategies: unknown[];
}

class MoveContentOperation {
  private content: Content;
  private context: Context;
  private _app: App;
  private _session: unknown;
  private _option?: MoveOptions;
  private _targetPosition?: Point3D;
  private sketch2dInputControlVisible?: boolean;
  private constraintInRoom: boolean = false;
  private ignoreSnapOffset: boolean = false;
  private keepZAxis: boolean = true;
  private autoFitDirectionEnable: boolean = false;
  private basePoint?: Point3D;
  private beginPoint?: Point3D;
  private snappingHelper?: SnappingHelper;

  execute(options?: MoveOptions): void {
    if (this.content instanceof HSCore.Model.CornerWindow) {
      this.content.needUpdate = false;
    }

    const transManager = this.context.transManager;
    this._session = transManager.startSession();

    if (
      this.content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting) &&
      (this._app.activeEnvironmentId === HSFPConstants.Environment.CustomizedCeilingModel ||
        this._app.activeEnvironmentId === HSFPConstants.Environment.NCustomizedCeilingModel)
    ) {
      this.sketch2dInputControlVisible = this._app.appSettings.getViewItem('sketch2dInputControlVisible');
      if (this.sketch2dInputControlVisible) {
        this._app.appSettings.setViewItem('sketch2dInputControlVisible', false);
      }
    }

    this._saveRestoreData();

    if (this._targetPosition) {
      this.moveto(this._targetPosition);
      this._onComplete(this._targetPosition);
      return;
    }

    const activeView = this._app.getActive3DView();
    if (activeView) {
      activeView.setTrackingEntity(this.content);
      activeView.setDragMoveEntityCenterPos(this._getEntityCenterPos());
    }

    const mergedOptions: MoveOptions = Object.assign(this._option ?? {}, options ?? {});

    this.constraintInRoom = !!mergedOptions && !!mergedOptions.constraintInRoom;
    this.ignoreSnapOffset = mergedOptions?.ignoreSnapOffset ?? this.ignoreSnapOffset;
    this.keepZAxis = mergedOptions ? mergedOptions.keepZAxis !== false : true;

    const shouldSelect = mergedOptions ? mergedOptions.select !== false : true;
    this.autoFitDirectionEnable =
      mergedOptions && mergedOptions.autoFitDirectionEnable !== undefined
        ? !!mergedOptions.autoFitDirectionEnable
        : HSApp.Util.Content.isContentAutoFitEnable(this.content);

    let zPosition = this.content.z;
    const parent = this.content.getUniqueParent();
    zPosition += this._app.floorplan.scene.getLayerAltitude(parent);

    this.basePoint = {
      x: this.content.x,
      y: this.content.y,
      z: zPosition,
    };

    this.beginPoint = {
      x: this.content.x,
      y: this.content.y,
      z: zPosition,
    };

    if (this.content.isSimulated) {
      const restoreRequest = transManager.createRequest(HSFPConstants.RequestType.RestoreSoftCloth, [this.content]);
      transManager.commit(restoreRequest);
    }

    this.snappingHelper = new HSApp.Snapping.Helper(this.content);
    const strategies = this._getSnappingStrategies(this.snappingHelper);
    this.snappingHelper.strategies = strategies;

    if (shouldSelect) {
      const selectionManager = HSApp.Selection.Manager;
      if (!HSApp.Util.Selection.hasOnlySelected(this.content)) {
        selectionManager.unselectAll();
        selectionManager.select(this.content);
      }
    }

    this._onBeginMoveCeilingContent();
    this._createGizmo();
    this._getReplaceContents(this.content);
  }

  private _saveRestoreData(): void {
    // Implementation
  }

  private moveto(position: Point3D): void {
    // Implementation
  }

  private _onComplete(position: Point3D): void {
    // Implementation
  }

  private _getEntityCenterPos(): Point3D {
    // Implementation
    return { x: 0, y: 0, z: 0 };
  }

  private _getSnappingStrategies(helper: SnappingHelper): unknown[] {
    // Implementation
    return [];
  }

  private _onBeginMoveCeilingContent(): void {
    // Implementation
  }

  private _createGizmo(): void {
    // Implementation
  }

  private _getReplaceContents(content: Content): void {
    // Implementation
  }
}