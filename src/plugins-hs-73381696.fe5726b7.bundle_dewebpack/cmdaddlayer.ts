import { Command } from './Command';

interface TransactionRequest {
  // Define based on your transaction manager's request structure
}

interface FloorSlab {
  dirtyGeometry(): void;
  bound: {
    isValid(): boolean;
    left: number;
    top: number;
    width: number;
    height: number;
  } | null;
}

interface Layer {
  height: number;
  floorSlabs: Record<string, FloorSlab>;
}

interface Camera {
  type: number;
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
}

interface Scene {
  activeLayer: Layer;
  getLayerAltitude(layer: Layer): number;
}

interface Floorplan {
  active_camera: Camera;
  scene: Scene;
}

interface TransactionManager {
  createRequest(requestType: number, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Context {
  transManager: TransactionManager;
}

interface LogClicksRatio {
  id: string;
  name: string;
}

interface LogParams {
  activeSection: string;
  clicksRatio: LogClicksRatio;
}

export class CmdAddLayer extends Command {
  private context: Context;
  private _layerType: number;
  private needCopyWall: boolean;
  private _request?: TransactionRequest;

  constructor(context: Context, layerType: number, needCopyWall: boolean) {
    super();
    this.context = context;
    this._layerType = layerType;
    this.needCopyWall = needCopyWall;
  }

  onExecute(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.AddNewLayer,
      [floorplan, this._layerType, this.needCopyWall]
    );
    this.context.transManager.commit(this._request);
  }

  onReceive(event: string, data: unknown): void | ((arg: unknown) => unknown) {
    if (event !== 'fitSlab') {
      return super.onReceive(event, data);
    }
    this.fitScreen();
  }

  fitScreen(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    const camera = floorplan.active_camera;
    const firstSlab = Object.values(floorplan.scene.activeLayer.floorSlabs)[0];

    if (!firstSlab) {
      return;
    }

    firstSlab.dirtyGeometry();
    const bound = firstSlab.bound;

    if (!bound || !bound.isValid()) {
      return;
    }

    if (camera.type === HSCore.Model.CameraTypeEnum.OrthView) {
      const altitude = floorplan.scene.getLayerAltitude(floorplan.scene.activeLayer);
      camera.z = floorplan.scene.activeLayer.height / 2 + altitude;
      camera.target_z = camera.z;
    } else {
      const offsetX = bound.left + bound.width / 2 - camera.x;
      const offsetY = bound.top + bound.height / 2 - camera.y;
      camera.target_x += offsetX;
      camera.target_y += offsetY;
      camera.x += offsetX;
      camera.y += offsetY;

      const altitude = floorplan.scene.getLayerAltitude(floorplan.scene.activeLayer);
      camera.z = HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT + altitude;
    }
  }

  onCleanup(): void {
    // Cleanup logic
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    const layerTypeName = this._layerType === 1 ? '楼层' : '地下室';
    return `多层操作-添加${layerTypeName}`;
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }

  getCurrentParams(): LogParams {
    const isFloor = this._layerType === 1;
    return {
      activeSection: HSFPConstants.LogGroupTypes.LayerOperation,
      clicksRatio: {
        id: isFloor ? 'addFloor' : 'addBasement',
        name: isFloor ? '添加楼层' : '添加地下室'
      }
    };
  }

  getMode(): string {
    return this._layerType === 1 ? 'addFloor' : 'addBasement';
  }
}