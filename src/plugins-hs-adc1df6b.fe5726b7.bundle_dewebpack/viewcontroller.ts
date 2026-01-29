import { HSApp } from './518193';
import GizmoDefault from './864193';

interface Canvas3D {
  context: any;
  displayLayers: {
    gizmo: any;
  };
  gizmoManager: GizmoManager;
}

interface GizmoManager {
  addGizmo(gizmo: GizmoDefault): void;
  removeGizmo(gizmo: GizmoDefault): void;
}

interface Curve {
  equals(other: Curve): boolean;
}

interface Loop {
  clone(): Loop;
  scale(factor: number): Loop;
  getAllCurves(): Curve[];
}

interface LoopInfo {
  loop: {
    loop: Loop;
  };
}

interface RoofParameters {
  roomLoop?: Loop;
}

interface RoofEntity {
  parameters: RoofParameters;
  getUniqueParent(): any;
}

export class ViewController {
  private _app: any;
  private _context: any;
  private _canvas3d: Canvas3D;
  private _gizmos3d: GizmoDefault[];

  constructor() {
    this._app = HSApp.App.getApp();
    this._canvas3d = this._app.getActive3DView();
    this._gizmos3d = [];
  }

  createGizmo(gizmoConfigs: any[]): void {
    this._context = this._canvas3d.context;
    gizmoConfigs.forEach((config) => {
      const gizmo = new GizmoDefault(
        this._context,
        this._canvas3d.displayLayers.gizmo,
        config
      );
      this._gizmos3d.push(gizmo);
      this._canvas3d.gizmoManager.addGizmo(gizmo);
    });
  }

  hideGizmo(): void {
    this._gizmos3d.forEach((gizmo) => {
      gizmo.hide();
    });
  }

  showGizmo(): void {
    this._gizmos3d.forEach((gizmo) => {
      gizmo.show();
    });
  }

  deactiveGizmo(): void {
    this._gizmos3d.forEach((gizmo) => {
      gizmo.cleanup();
      this._canvas3d.gizmoManager.removeGizmo(gizmo);
    });
    this._gizmos3d = [];
  }

  updateGizmoByRoof(roof: RoofEntity): void {
    const roomLoop = roof.parameters.roomLoop;
    this.showGizmo();

    if (!roomLoop) {
      return;
    }

    const curves = roomLoop.clone().scale(0.001).getAllCurves();
    const uniqueParent = roof.getUniqueParent();

    if (!uniqueParent) {
      return;
    }

    for (let i = 0; i < this._gizmos3d.length; i++) {
      const gizmo = this._gizmos3d[i];

      if (gizmo.getLevelLayer() === uniqueParent) {
        const gizmoCurves = gizmo.getLoopInfo().loop.loop.getAllCurves();

        if (
          curves.length === gizmoCurves.length &&
          curves.some((curve) =>
            gizmoCurves.some((gizmoCurve) => curve.equals(gizmoCurve))
          )
        ) {
          gizmo.hide();
          break;
        }
      }
    }
  }
}