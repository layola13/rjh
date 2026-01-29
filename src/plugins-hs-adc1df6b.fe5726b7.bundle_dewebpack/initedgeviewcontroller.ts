import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { ENParamRoofType } from './ENParamRoofType';
import { InitEdgeGizmo } from './InitEdgeGizmo';
import { isFunction } from './utils';

interface RoomParameters {
  roomLoop?: RoomLoop;
  roofType?: ENParamRoofType;
  roomHeight?: number;
}

interface RoomLoop {
  clone(): RoomLoop;
  scale(factor: number): RoomLoop;
  getAllCurves(): Curve[];
}

interface Curve {
  equals(other: Curve): boolean;
}

interface Entity {
  id: string;
  parameters: RoomParameters;
  getUniqueParent(): unknown;
}

interface RoofParamNode {
  name: string;
  value?: number;
}

interface DisplayListItem {
  getChoiceFaceName?: () => string | undefined;
}

interface Canvas3D {
  context: Context3D;
  displayList: Record<string, DisplayListItem>;
  displayLayers: {
    gizmo: unknown;
  };
  gizmoManager: {
    addGizmo(gizmo: InitEdgeGizmo): void;
    removeGizmo(gizmo: InitEdgeGizmo): void;
  };
}

interface Context3D {
  signalCameraChanged: unknown;
}

export class InitEdgeViewController {
  private _app: HSApp.App;
  private _context?: Context3D;
  private _canvas3d: Canvas3D;
  private _gizmos3d: InitEdgeGizmo[] = [];
  private _signalHook: HSCore.Util.SignalHook;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._app = HSApp.App.getApp();
    this._canvas3d = this._app.getActive3DView();
    this._signalHook.listen(
      this._canvas3d.context.signalCameraChanged,
      this._onCameraChanged
    );
  }

  /**
   * Refresh the edge view controller with the given entity
   */
  public refresh(entity?: Entity): void {
    this._clear();

    if (!entity) {
      return;
    }

    const displayItem = this._canvas3d.displayList[entity.id];
    const hasChoiceFace =
      isFunction(displayItem?.getChoiceFaceName) && displayItem.getChoiceFaceName();

    if (!hasChoiceFace) {
      this._init(entity);
    }
  }

  private _init(entity: Entity): void {
    this._context = this._canvas3d.context;

    const { roomLoop, roofType, roomHeight } = entity.parameters;

    if (!roomLoop || roofType !== ENParamRoofType.Pitched) {
      return;
    }

    const roofParamNodes = HSCore.Util.Roof.getRoofParamNodes(entity);
    const offsetNode = roofParamNodes.find((node: RoofParamNode) => node.name === 'offset');
    const offsetMeters = 0.001 * (offsetNode?.value ?? 0);

    const parentAltitude = HSCore.Util.Layer.getAltitude(entity.getUniqueParent());
    const altitude = parentAltitude + 0.001 * (roomHeight ?? 0);

    const curves = roomLoop.clone().scale(0.001).getAllCurves();
    const initialCurves = HSCore.Util.Roof.getInitialCurves(curves);

    initialCurves.forEach((curve: Curve) => {
      const isFirstCurve = curve.equals(curves[0]);
      const gizmo = new InitEdgeGizmo(
        this._context!,
        this._canvas3d.displayLayers.gizmo,
        curve,
        entity,
        altitude,
        offsetMeters,
        isFirstCurve
      );

      this._gizmos3d.push(gizmo);
      this._canvas3d.gizmoManager.addGizmo(gizmo);
    });
  }

  private _clear(): void {
    this._gizmos3d.forEach((gizmo: InitEdgeGizmo) => {
      gizmo.cleanup();
      this._canvas3d.gizmoManager.removeGizmo(gizmo);
    });

    this._gizmos3d = [];
  }

  private _onCameraChanged = (): void => {
    this._gizmos3d.forEach((gizmo: InitEdgeGizmo) => {
      gizmo.updateScale();
    });
  };
}