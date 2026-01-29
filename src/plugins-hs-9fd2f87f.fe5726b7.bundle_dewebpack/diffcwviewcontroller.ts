import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { DiffCW } from './DiffCW';
import { DiffCWDisplay2D } from './DiffCWDisplay2D';
import { DiffCWDisplay3D } from './DiffCWDisplay3D';
import { Gizmo2D } from './Gizmo2D';
import { Gizmo3D } from './Gizmo3D';

interface GizmoStyle2DSource {
  strokeColor: string;
  fillColor: string;
  fillOpacity?: number;
}

interface GizmoStyle3DSource {
  strokeColor: string;
  fillColor: string;
  fillOpacity?: number;
}

const SOURCE_GIZMO_STYLE_2D: GizmoStyle2DSource = {
  strokeColor: '#5FE6D7',
  fillColor: '#d8f9f5'
};

const DESTINATION_GIZMO_STYLE_2D: GizmoStyle2DSource = {
  strokeColor: '#FFA023',
  fillColor: '#FFE823',
  fillOpacity: 0.3
};

const SOURCE_GIZMO_STYLE_3D: GizmoStyle3DSource = {
  strokeColor: '0x5fe6d7',
  fillColor: '0xd8f9f5'
};

const DESTINATION_GIZMO_STYLE_3D: GizmoStyle3DSource = {
  strokeColor: '0xffa023',
  fillColor: '0xffe823',
  fillOpacity: 0.3
};

interface DiffRoute {
  srcId: string;
  destId: string;
}

interface Layer {
  id: string;
  getChildrenByType(type: typeof DiffCW): DiffCW[];
}

interface Canvas2D {
  context: unknown;
  displayLayers: { temp: unknown };
  gizmoManager: { addGizmo(gizmo: Gizmo2D): void; removeGizmo(gizmo: Gizmo2D): void };
  getDisplayObjectByID(id: string): any;
  removeDisplayObject(obj: any): void;
}

interface Canvas3D {
  context: unknown;
  displayLayers: { gizmo: unknown };
  gizmoManager: { addGizmo(gizmo: Gizmo3D): void; removeGizmo(gizmo: Gizmo3D): void };
  getDisplayObjectByID(id: string): any;
  removeDisplayObject(obj: any): void;
}

interface App {
  floorplan: {
    scene: {
      activeLayer: Layer;
      forEachLayer(callback: (layer: Layer) => void): void;
    };
  };
  getActive2DView(): Canvas2D;
  getActive3DView(): Canvas3D;
}

interface DiffTool {
  _getCWOriginContent(id: string, layer: Layer): any;
}

export class DiffCWViewController {
  private _app: App;
  private _diffTool: DiffTool | null;
  private _canvas2d: Canvas2D;
  private _canvas3d: Canvas3D;
  private _gizmos2d: Gizmo2D[];
  private _gizmos3d: Gizmo3D[];
  public signalHook: HSCore.Util.SignalHook;

  constructor() {
    this._app = HSApp.App.getApp();
    this._canvas2d = this._app.getActive2DView();
    this._canvas3d = this._app.getActive3DView();
    this.signalHook = new HSCore.Util.SignalHook(this);
    this._gizmos2d = [];
    this._gizmos3d = [];
    this._diffTool = null;
  }

  public init(diffTool: DiffTool, targetLayer?: Layer): void {
    this._diffTool = diffTool;

    if (targetLayer) {
      this.createViewObject(targetLayer);
    } else {
      const activeLayer = this._app.floorplan.scene.activeLayer;
      this.createViewObject(activeLayer);
      this._app.floorplan.scene.forEachLayer((layer: Layer) => {
        if (layer !== activeLayer) {
          this.createViewObject(layer);
        }
      });
    }
  }

  public cleanUp(): void {
    this.destroy();
    this.signalHook?.unlistenAll();
  }

  public createViewObject(layer: Layer): void {
    const diffCWEntities = layer.getChildrenByType(DiffCW);
    
    if (diffCWEntities.length === 0) {
      return;
    }

    const layer2DDisplay = this._canvas2d.getDisplayObjectByID(layer.id);
    const layer3DDisplay = this._canvas3d.getDisplayObjectByID(layer.id);

    diffCWEntities.forEach((diffCWEntity: DiffCW) => {
      this.createCWEntityGizmo(diffCWEntity, layer);

      let display2D = this._canvas2d.getDisplayObjectByID(diffCWEntity.id);
      if (!display2D) {
        display2D = new DiffCWDisplay2D(
          this._canvas2d.context,
          layer2DDisplay,
          layer2DDisplay.groups.concealedwork,
          diffCWEntity
        );
        display2D.init();
      }
      layer2DDisplay.addChild(display2D);

      let display3D = this._canvas3d.getDisplayObjectByID(diffCWEntity.id);
      if (!display3D) {
        display3D = new DiffCWDisplay3D(
          this._canvas3d.context,
          layer3DDisplay,
          layer3DDisplay.groups.concealedwork,
          diffCWEntity
        );
        display3D.init();
      }
      layer3DDisplay.addChild(display3D);
    });
  }

  public createCWEntityGizmo(entity: DiffCW, layer: Layer): void {
    const diffRoutes = entity.diffRoutes;
    
    if (!diffRoutes.length) {
      return;
    }

    diffRoutes.forEach((route: DiffRoute) => {
      const { srcId, destId } = route;

      const sourceEntity = this._diffTool!._getCWOriginContent(srcId, layer);
      const sourceGizmo2D = new Gizmo2D(
        this._canvas2d.context,
        this._canvas2d.displayLayers.temp,
        { entity: sourceEntity },
        SOURCE_GIZMO_STYLE_2D
      );
      this._gizmos2d.push(sourceGizmo2D);
      this._canvas2d.gizmoManager.addGizmo(sourceGizmo2D);

      const sourceGizmo3D = new Gizmo3D(
        this._canvas3d.context,
        this._canvas3d.displayLayers.gizmo,
        sourceEntity,
        SOURCE_GIZMO_STYLE_3D,
        true
      );
      this._gizmos3d.push(sourceGizmo3D);
      this._canvas3d.gizmoManager.addGizmo(sourceGizmo3D);

      const destEntity = this._canvas2d.getDisplayObjectByID(destId).entity;
      const destGizmo2D = new Gizmo2D(
        this._canvas2d.context,
        this._canvas2d.displayLayers.temp,
        { entity: destEntity },
        DESTINATION_GIZMO_STYLE_2D
      );
      this._gizmos2d.push(destGizmo2D);
      this._canvas2d.gizmoManager.addGizmo(destGizmo2D);

      const destGizmo3D = new Gizmo3D(
        this._canvas3d.context,
        this._canvas3d.displayLayers.gizmo,
        destEntity,
        DESTINATION_GIZMO_STYLE_3D
      );
      this._gizmos3d.push(destGizmo3D);
      this._canvas3d.gizmoManager.addGizmo(destGizmo3D);
    });
  }

  public setVisibility(layer: Layer, isVisible: boolean): void {
    const diffCWEntities = layer.getChildrenByType(DiffCW);
    
    if (diffCWEntities.length === 0) {
      return;
    }

    const updateDisplayVisibility = (displayObject: any): void => {
      displayObject.updateVisibleStatus(isVisible);
    };

    diffCWEntities.forEach((entity: DiffCW) => {
      const display2D = this._canvas2d.getDisplayObjectByID(entity.id);
      if (display2D) {
        updateDisplayVisibility(display2D);
      }

      const display3D = this._canvas3d.getDisplayObjectByID(entity.id);
      if (display3D) {
        updateDisplayVisibility(display3D);
      }
    });

    this._gizmos2d.forEach((gizmo: Gizmo2D) => {
      isVisible ? gizmo.show() : gizmo.hide();
    });

    this._gizmos3d.forEach((gizmo: Gizmo3D) => {
      isVisible ? gizmo.show() : gizmo.hide();
    });
  }

  public destroy(): void {
    this._app.floorplan.scene.forEachLayer((layer: Layer) => {
      this.destroyViewObject(layer);
    });
  }

  public destroyViewObject(layer: Layer): void {
    const diffCWEntities = layer.getChildrenByType(DiffCW);
    
    if (diffCWEntities.length === 0) {
      return;
    }

    const layer2DDisplay = this._canvas2d.getDisplayObjectByID(layer.id);
    const layer3DDisplay = this._canvas3d.getDisplayObjectByID(layer.id);

    diffCWEntities.forEach((entity: DiffCW) => {
      const display2D = this._canvas2d.getDisplayObjectByID(entity.id);
      if (display2D) {
        layer2DDisplay.removeChild(display2D);
        this._canvas2d.removeDisplayObject(display2D);
        layer2DDisplay.groups.concealedwork.removeChild(display2D);
      }

      const display3D = this._canvas3d.getDisplayObjectByID(entity.id);
      if (display3D) {
        layer3DDisplay.removeChild(display3D);
        this._canvas3d.removeDisplayObject(display3D);
        layer3DDisplay.groups.concealedwork.removeChild(display3D);
      }

      this._gizmos2d.forEach((gizmo: Gizmo2D) => {
        gizmo.onCleanup();
        this._canvas2d.gizmoManager.removeGizmo(gizmo);
      });

      this._gizmos3d.forEach((gizmo: Gizmo3D) => {
        gizmo.onCleanup();
        this._canvas3d.gizmoManager.removeGizmo(gizmo);
      });
    });
  }
}