import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSFPConstants } from './HSFPConstants';

type LayerInsertType = 'up' | 'bottom';

interface FloorSlab {
  dirtyGeometry(): void;
  bound: {
    isValid(): boolean;
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

interface Layer {
  floorSlabs: Record<string, FloorSlab>;
  height: number;
}

interface Camera {
  type: HSCore.Model.CameraTypeEnum;
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
}

interface Scene {
  activeLayer: Layer;
  lastLayer: Layer;
  lowestLayer: Layer;
  getLayerAltitude(layer: Layer): number;
}

interface Floorplan {
  scene: Scene;
  active_camera: Camera;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CmdContext {
  transManager: TransactionManager;
  app: {
    cmdManager: {
      complete(cmd: CmdInsertLayer): void;
    };
  };
}

export class CmdInsertLayer extends HSApp.Cmd.Command {
  private readonly _type: LayerInsertType;
  private readonly _needCopyWall: boolean;
  private _request?: TransactionRequest;
  private _session?: TransactionSession;
  private readonly _topBottom: boolean;

  constructor(type: LayerInsertType, needCopyWall: boolean) {
    super();
    this._type = type;
    this._needCopyWall = needCopyWall;

    const scene = HSApp.App.getApp().floorplan.scene;
    const activeLayer = scene.activeLayer;
    const lastLayer = scene.lastLayer;
    const lowestLayer = scene.lowestLayer;

    this._topBottom =
      (this._type === 'up' && activeLayer === lastLayer) ||
      (this._type === 'bottom' && activeLayer === lowestLayer);
  }

  onExecute(): void {
    this._session = (this.context as CmdContext).transManager.startSession();

    if (!this._topBottom) {
      const removeConcealedRequest = (this.context as CmdContext).transManager.createRequest(
        HSFPConstants.RequestType.RemoveConcealedWork,
        []
      );
      (this.context as CmdContext).transManager.commit(removeConcealedRequest);
    }

    this._request = (this.context as CmdContext).transManager.createRequest(
      HSFPConstants.RequestType.InsertNewLayer,
      [this._type, this._needCopyWall]
    );
    (this.context as CmdContext).transManager.commit(this._request);
  }

  onReceive(event: string, data?: unknown): void {
    switch (event) {
      case 'fitSlab':
        this.fitScreen();
        return;
      case 'complete':
        (this.context as CmdContext).app.cmdManager.complete(this);
        this._session?.commit();
        return;
      default:
        super.onReceive?.(event, data);
    }
  }

  fitScreen(): void {
    const floorplan: Floorplan = HSApp.App.getApp().floorplan;
    const camera = floorplan.active_camera;
    const activeFloorSlab = Object.values(floorplan.scene.activeLayer.floorSlabs)[0];

    if (!activeFloorSlab) {
      return;
    }

    activeFloorSlab.dirtyGeometry();
    const bound = activeFloorSlab.bound;

    if (!bound?.isValid()) {
      return;
    }

    if (camera.type === HSCore.Model.CameraTypeEnum.OrthView) {
      const layerAltitude = floorplan.scene.getLayerAltitude(floorplan.scene.activeLayer);
      camera.z = floorplan.scene.activeLayer.height / 2 + layerAltitude;
      camera.target_z = camera.z;
    } else {
      const deltaX = bound.left + bound.width / 2 - camera.x;
      const deltaY = bound.top + bound.height / 2 - camera.y;

      camera.target_x += deltaX;
      camera.target_y += deltaY;
      camera.x += deltaX;
      camera.y += deltaY;

      const layerAltitude = floorplan.scene.getLayerAltitude(floorplan.scene.activeLayer);
      camera.z = HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT + layerAltitude;
    }
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }

  getDescription(): string {
    return '插入楼层';
  }
}