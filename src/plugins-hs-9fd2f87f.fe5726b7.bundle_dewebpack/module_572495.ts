interface ViewParams {
  cameraVisible?: boolean;
  gridVisible?: boolean;
  cabinetDoorVisible?: boolean;
  drawerPanelVisible?: boolean;
  backgroundVisible?: boolean;
  dimensionVisible?: boolean;
  roomAreaVisible?: boolean;
  roomTypeVisible?: boolean;
  furnitureVisible?: boolean;
  customizedFurnitureVisible?: boolean;
  customizedAccessoryVisible?: boolean;
}

interface ExportParams {
  format: string;
  width: number;
  height: number;
  center: boolean;
}

interface ExportMessage {
  params: ExportParams;
  callback: (result: unknown) => void;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SavedViewSettings {
  [key: string]: unknown;
  viewBox?: ViewBox;
}

interface Gizmo {
  type: string;
  layer: unknown;
}

interface DisplayLayers {
  temp: unknown;
  floor: unknown;
}

interface View2D {
  displayLayers: DisplayLayers;
  gizmoManager: {
    getAllGizmos(): Gizmo[];
  };
  getViewBox(): ViewBox;
  setViewBox(x: number, y: number, width: number, height: number): void;
  fit(): void;
  signalUnderlayChanged: {
    dispatch(data: { opacity: number }): void;
  };
  removeElementFromLayer(element: Gizmo): void;
  addElementToLayer(element: Gizmo): void;
}

interface Underlay {
  showBackground(visible: boolean): void;
}

interface ActiveLayer {
  underlay?: Underlay;
}

interface AppSettings {
  [key: string]: unknown;
  setViewItem(key: string, value: boolean): void;
  setViewSetting(settings: Array<{ key: string; value: boolean }>): void;
}

interface App {
  appSettings: AppSettings;
  floorplan: {
    scene: {
      activeLayer: ActiveLayer;
    };
  };
  getActive2DView(): View2D;
  updateDocumentWithViewOptions(): void;
  saveDocument(
    type: string,
    options: ExportParams,
    callback: (result: unknown) => void
  ): void;
}

interface SelectionManager {
  selected(): unknown[];
  unselectAll(): void;
  select(item: unknown): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Selection: {
    Manager: SelectionManager;
  };
  Cmd: {
    Command: new () => Command;
  };
};

declare function log(message: string): void;

abstract class Command {
  abstract canUndoRedo(): boolean;
  abstract onExecute(): void;
  abstract onReceive(event: string, data: unknown): void;
  abstract onCleanup(): void;
}

export default class ExportFloorplanCommand extends Command {
  private params: ViewParams;
  private _savedViewSettings?: SavedViewSettings;
  private _savedSelection?: unknown[];

  constructor(params?: ViewParams) {
    super();
    this.params = params || {};
  }

  canUndoRedo(): boolean {
    return false;
  }

  onExecute(): void {
    this._saveViewSettings();
    this._clearSelection();
    this._moveRoomDimensionOnTopLayer();
    this._updateView(this.params);
  }

  onReceive(event: string, data: unknown): void {
    switch (event) {
      case "parametersChanged":
        this._updateView(data as ViewParams);
        break;
      case "export":
        this._export(
          (data as ExportMessage).params,
          (data as ExportMessage).callback
        );
        break;
      default:
        log(`export floorplan command: ${event}`);
        super.onReceive(event, data);
    }
  }

  onCleanup(): void {
    this._restoreViewSettings();
    this._restoreSelection();
    this._restoreRoomDimensionLayer();
  }

  private _updateView(params: ViewParams): void {
    const app = HSApp.App.getApp();
    const appSettings = app.appSettings;

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof ViewParams];

      switch (key) {
        case "cameraVisible":
          appSettings.setViewItem("cameraVisible", value!);
          break;
        case "gridVisible":
          appSettings.setViewItem("gridVisible", value!);
          break;
        case "cabinetDoorVisible":
          appSettings.setViewItem("cabinetDoorVisible", value!);
          break;
        case "drawerPanelVisible":
          appSettings.setViewItem("drawerPanelVisible", value!);
          break;
        case "backgroundVisible":
          appSettings.setViewItem("backgroundVisible", value!);
          app.floorplan.scene.activeLayer.underlay?.showBackground(value!);
          app.getActive2DView().signalUnderlayChanged.dispatch({ opacity: 1 });
          break;
        case "dimensionVisible":
          appSettings.setViewItem("dimensionVisiable", value!);
          break;
        case "roomAreaVisible":
          appSettings.setViewItem("roomAreaVisible", value!);
          break;
        case "roomTypeVisible":
          appSettings.setViewItem("roomTypeVisible", value!);
          break;
        case "furnitureVisible":
          appSettings.setViewSetting([
            { key: "furnitureVisible", value: value! },
            { key: "ceilingLightVisible", value: value! },
            { key: "ceilingVisible", value: value! },
          ]);
          break;
        case "customizedFurnitureVisible":
          appSettings.setViewSetting([
            { key: "customizedFurnitureVisible", value: value! },
            { key: "ceilingLightVisible", value: value! },
            { key: "ceilingVisible", value: value! },
          ]);
          break;
        case "customizedAccessoryVisible":
          appSettings.setViewSetting([
            { key: "customizedAccessoryVisible", value: value! },
            { key: "ceilingLightVisible", value: value! },
            { key: "ceilingVisible", value: value! },
          ]);
          break;
      }
    });

    app.updateDocumentWithViewOptions();
  }

  private _export(
    params: ExportParams,
    callback: (result: unknown) => void
  ): void {
    HSApp.App.getApp().saveDocument(
      "thumbnail 2d",
      {
        format: params.format,
        width: params.width,
        height: params.height,
        center: params.center,
      },
      callback
    );
  }

  private _getAffectedSettingKeys(): string[] {
    return [
      "cameraVisible",
      "gridVisible",
      "cabinetDoorVisible",
      "drawerPanelVisible",
      "backgroundVisible",
      "dimensionVisiable",
      "roomAreaVisible",
      "roomTypeVisible",
      "furnitureVisible",
      "customizedFurnitureVisible",
      "customizedAccessoryVisible",
      "ceilingLightVisible",
      "ceilingVisible",
    ];
  }

  private _saveViewSettings(): void {
    const app = HSApp.App.getApp();
    const appSettings = app.appSettings;
    const savedSettings: SavedViewSettings = {};

    this._getAffectedSettingKeys().forEach((key) => {
      if (appSettings[key] !== undefined) {
        savedSettings[key] = appSettings[key];
      }
    });

    const activeView = app.getActive2DView();
    savedSettings.viewBox = activeView.getViewBox();
    activeView.fit();

    this._savedViewSettings = savedSettings;
  }

  private _restoreViewSettings(): void {
    const app = HSApp.App.getApp();
    const appSettings = app.appSettings;
    const savedSettings = this._savedViewSettings || {};

    this._getAffectedSettingKeys().forEach((key) => {
      if (savedSettings[key] !== undefined) {
        appSettings[key] = savedSettings[key];
      }
    });

    app.updateDocumentWithViewOptions();

    const viewBox = savedSettings.viewBox;
    if (viewBox) {
      app.getActive2DView().setViewBox(
        viewBox.x,
        viewBox.y,
        viewBox.width,
        viewBox.height
      );
    }

    app.floorplan.scene.activeLayer.underlay?.showBackground(true);
    app.getActive2DView().signalUnderlayChanged.dispatch({ opacity: 0.6 });
  }

  private _clearSelection(): void {
    const selectionManager = HSApp.Selection.Manager;
    this._savedSelection = selectionManager.selected();
    selectionManager.unselectAll();
  }

  private _restoreSelection(): void {
    const selectionManager = HSApp.Selection.Manager;
    (this._savedSelection || []).forEach((item) => {
      selectionManager.select(item);
    });
    this._savedSelection = [];
  }

  private _moveRoomDimensionOnTopLayer(): void {
    const activeView = app.getActive2DView();
    const tempLayer = activeView.displayLayers.temp;

    activeView.gizmoManager.getAllGizmos().forEach((gizmo) => {
      if (gizmo.type === "hsw.view.svg.gizmo.RoomDimension") {
        activeView.removeElementFromLayer(gizmo);
        gizmo.layer = tempLayer;
        activeView.addElementToLayer(gizmo);
      }
    });
  }

  private _restoreRoomDimensionLayer(): void {
    const activeView = HSApp.App.getApp().getActive2DView();
    const floorLayer = activeView.displayLayers.floor;

    activeView.gizmoManager.getAllGizmos().forEach((gizmo) => {
      if (gizmo.type === "hsw.view.svg.gizmo.RoomDimension") {
        activeView.removeElementFromLayer(gizmo);
        gizmo.layer = floorLayer;
        activeView.addElementToLayer(gizmo);
      }
    });
  }
}