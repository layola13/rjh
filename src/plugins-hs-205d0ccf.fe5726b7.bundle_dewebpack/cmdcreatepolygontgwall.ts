import { CreatePolygonTgWallGizmo } from './CreatePolygonTgWallGizmo';

interface WallSettings {
  wallWidth: number;
  wallMode: HSCore.Model.WallMode;
  wallIsBearing: boolean;
  save(): void;
}

interface UpdateSettingParams {
  wallIsBearing?: boolean;
  wallWidth?: number;
  wallMode?: HSCore.Model.WallMode;
}

interface GlobalUpdateData {
  data?: {
    fieldName?: string;
  };
}

interface ReceiveEventData {
  event?: {
    button: number;
  };
  curves?: HSCore.Geometry.Curve[];
  keyCode?: number;
}

interface Canvas2D {
  context: HSApp.Context;
  displayLayers: {
    temp: unknown;
  };
  gizmoManager: {
    addGizmo(gizmo: CreatePolygonTgWallGizmo): void;
    removeGizmo(gizmo: CreatePolygonTgWallGizmo): void;
  };
  getCanvas2d?(): Canvas2D;
}

interface ActiveEnvironment {
  getCanvas2d?(): Canvas2D;
}

declare const appSettingsUtil: WallSettings;
declare const HSApp: any;
declare const HSCore: any;
declare const HSFPConstants: any;

export class CmdCreatePolygonTgWall extends HSApp.Cmd.Command {
  polygon: unknown;
  private _gizmo?: CreatePolygonTgWallGizmo;

  constructor(polygon: unknown) {
    super();
    this.polygon = polygon;
    this._gizmo = undefined;
  }

  get setting(): WallSettings {
    return appSettingsUtil;
  }

  onExecute(): void {
    this.context.app.selectionManager.unselectAll();
    this.context.app.appSettings.signalValueChanged.listen(this._updateByGlobal);
    this.createGizmo();
  }

  onReceive(eventType: string, data: ReceiveEventData): boolean {
    if (eventType === 'click') {
      if (data.event && data.event.button === 2) {
        if (this._gizmo) {
          this._gizmo.onESC();
        }
        return true;
      }
    } else if (eventType === 'gizmo.drawRoom') {
      const curves = data.curves;
      if (curves && curves.length) {
        this.doRequest(curves);
      }
    } else if (eventType === 'gizmo.Complete') {
      this.mgr?.complete(this);
      return true;
    } else if (eventType === 'keydown') {
      this.onKeyDown(data.keyCode);
      return true;
    }

    return super.onReceive(eventType, data);
  }

  private onKeyDown = (keyCode?: number): void => {
    if (keyCode === HSApp.Util.Keyboard.KeyCodes.SPACE) {
      if (this._gizmo) {
        this._gizmo.rotate();
      }
    }
  };

  private _updateByGlobal = (globalData: GlobalUpdateData): void => {
    const fieldName = globalData.data?.fieldName;
    if (fieldName === 'wallWidth') {
      const propertyBar = this.context.app.pluginManager.getPlugin(
        HSFPConstants.PluginType.PropertyBar
      );
      if (propertyBar) {
        propertyBar.update();
      }
    }
  };

  doRequest(curves: HSCore.Geometry.Curve[]): void {
    const halfWallWidth = this.setting.wallWidth / 2;

    if (this.setting.wallMode === HSCore.Model.WallMode.Inner) {
      curves.forEach((curve) => curve.offset(halfWallWidth));
    } else if (this.setting.wallMode === HSCore.Model.WallMode.Outer) {
      curves.forEach((curve) => curve.offset(-halfWallWidth));
    }

    curves.reverse().forEach((curve) => curve.reverse());

    const floorplan = this.context.app.floorplan;
    const requestParams = [
      floorplan,
      floorplan.scene.activeLayer,
      curves,
      this.setting.wallWidth,
      {
        wallIsBearing: this.setting.wallIsBearing,
        wallMode: this.setting.wallMode,
      },
    ];

    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.CreateRectWalls,
      requestParams
    );
    this.context.transManager.commit(request);
  }

  getCanvas2d(): Canvas2D | undefined {
    const app = this.context.app;
    const activeEnvironment: ActiveEnvironment | undefined = app.activeEnvironment;
    
    if (activeEnvironment?.getCanvas2d) {
      return activeEnvironment.getCanvas2d();
    }
    
    return app.getActive2DView();
  }

  createGizmo(): void {
    const canvas = this.getCanvas2d();
    if (!canvas) {
      return;
    }

    const gizmoManager = canvas.gizmoManager;
    this._gizmo = this._create2DGizmo(canvas);
    
    if (this._gizmo) {
      gizmoManager.addGizmo(this._gizmo);
    }
  }

  private _create2DGizmo(canvas: Canvas2D): CreatePolygonTgWallGizmo {
    return new CreatePolygonTgWallGizmo(
      canvas.context,
      canvas.displayLayers.temp,
      this
    );
  }

  destroyGizmo(): void {
    if (!this._gizmo) {
      return;
    }

    const canvas = this.getCanvas2d();
    if (canvas) {
      canvas.gizmoManager.removeGizmo(this._gizmo);
      this._gizmo.onCleanup();
      this._gizmo = undefined;
    }
  }

  onCleanup(): void {
    this.destroyGizmo();
    this.context.app.appSettings.signalValueChanged.unlisten(this._updateByGlobal);
    super.onCleanup();
  }

  getDescription(): string {
    return '画多边形房间';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }

  updateSetting(params: UpdateSettingParams = {}): void {
    const { wallIsBearing, wallWidth, wallMode } = params;

    if (wallWidth !== undefined) {
      this.setting.wallWidth = wallWidth;
    }

    if (wallMode !== undefined) {
      this.setting.wallMode = wallMode;
    }

    if (wallIsBearing !== undefined) {
      this.setting.wallIsBearing = wallIsBearing;
    }

    this.setting.save();
    this._gizmo!.onWallSettingChanged();
    this._gizmo!.dirtyGraph();

    const propertyBar = this.context.app.pluginManager.getPlugin(
      HSFPConstants.PluginType.PropertyBar
    );
    if (propertyBar) {
      propertyBar.update();
    }
  }
}