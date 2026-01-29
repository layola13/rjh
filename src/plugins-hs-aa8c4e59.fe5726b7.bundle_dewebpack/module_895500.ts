interface CameraState {
  x: number;
  y: number;
  target_x: number;
  target_y: number;
}

interface DragMoveData {
  offset?: number[];
  event?: MouseEvent;
}

interface RotateData {
  degree?: number;
}

type CommandData = DragMoveData | RotateData;

interface ICameraStrategy {
  moveTarget2D(saved: CameraState, offsetX: number, offsetY: number): void;
}

const SNAP_ANGLES = [0, 45, 90, 135, 180, -180, -135, -90, -45] as const;
const DEFAULT_SNAP_THRESHOLD = 3;
const FULL_CIRCLE_DEGREES = 360;
const MOUSE_TIP_OFFSET_X = 10;
const MOUSE_TIP_OFFSET_Y = 45;

export default class CameraCommand extends HSApp.Cmd.Command {
  private camera: HSCore.Model.Camera;
  private saved: Partial<CameraState>;
  private strategy: ICameraStrategy;
  private lastAngle: number = 0;

  constructor(camera: HSCore.Model.Camera) {
    super();
    this.camera = camera;
    this.saved = {};

    switch (camera.type) {
      case HSCore.Model.CameraTypeEnum.FirstPerson:
        this.strategy = new HSApp.Camera.FirstpersonCamera(this.camera);
        break;
      case HSCore.Model.CameraTypeEnum.OrbitView:
        this.strategy = new HSApp.Camera.OrbitCamera(this.camera);
        break;
      default:
        throw new Error(`Unsupported camera type: ${camera.type}`);
    }
  }

  public moveTo(x: number, y: number): void {
    this.camera.target_x = x;
    this.camera.target_y = y;
  }

  public onExecute(): void {
    const { x, y, target_x, target_y } = this.camera;
    this.saved = { x, y, target_x, target_y };
    this.lastAngle = this._calculateAngle(this.saved as CameraState, [0, 0]);
  }

  public onReceive(eventName: string, data: CommandData): void {
    if (eventName === 'dragmove' && 'offset' in data && data.offset && data.offset.length > 1) {
      const offset = data.offset;
      
      if (this._isFirstPersonInTargetEnvironment()) {
        const currentAngle = this._calculateAngle(this.saved as CameraState, offset);
        const snappedAngle = this._findSnappingAngle(Math.round(currentAngle));
        const finalAngle = snappedAngle !== undefined ? snappedAngle : currentAngle;
        this._moveCameraByRadian(finalAngle, data as DragMoveData);
      } else {
        this.strategy.moveTarget2D(this.saved as CameraState, offset[0], offset[1]);
      }
    } else if (eventName === 'dragend') {
      updateMouseTips();
      this.mgr.complete();
    } else if (eventName === 'rotateByDeltaDegree' && 'degree' in data && data.degree !== undefined) {
      this.moveCameraByDeltaDegree(data.degree);
      this.mgr.complete();
    } else {
      super.onReceive?.(eventName, data);
    }
  }

  private _isFirstPersonInTargetEnvironment(): boolean {
    const activeCamera = HSApp.App.getApp().floorplan.active_camera;
    return (
      activeCamera.type === HSCore.Model.CameraTypeEnum.FirstPerson &&
      this._isTargetEnvironment()
    );
  }

  private _isTargetEnvironment(): boolean {
    const envId = HSApp.App.getApp().environmentManager.activeEnvironmentId;
    return (
      envId === HSFPConstants.Environment.Default ||
      envId === HSFPConstants.Environment.Render ||
      envId === HSFPConstants.Environment.ManualLighting ||
      envId === HSFPConstants.Environment.SparkPicEnv
    );
  }

  private _calculateAngle(state: CameraState, offset: number[]): number {
    const deltaX = state.target_x + offset[0] - state.x;
    const deltaY = state.target_y + offset[1] - state.y;
    const vector = new THREE.Vector2(deltaX, deltaY);

    const currentDistance = Math.sqrt(
      Math.pow(this.camera.target_x - this.camera.x, 2) +
      Math.pow(this.camera.target_y - this.camera.y, 2)
    );

    vector.setLength(currentDistance);
    return (180 * Math.atan2(vector.x, vector.y)) / Math.PI;
  }

  private _findSnappingAngle(
    angle: number,
    threshold: number = DEFAULT_SNAP_THRESHOLD
  ): number | undefined {
    return SNAP_ANGLES.find((snapAngle) => {
      const diff = angle - snapAngle;
      return Math.abs(diff) <= threshold && diff !== 0;
    });
  }

  private _moveCameraByRadian(angleInDegrees: number, data: DragMoveData): void {
    this.moveCameraByDeltaDegree(this.lastAngle - angleInDegrees, data);
    this.lastAngle = angleInDegrees;

    const normalizedAngle = Math.round(angleInDegrees < 0 ? angleInDegrees + FULL_CIRCLE_DEGREES : angleInDegrees);
    const displayAngle = normalizedAngle === FULL_CIRCLE_DEGREES ? 0 : normalizedAngle;

    if (data.event) {
      updateMouseTips(`${displayAngle}°`, {
        x: data.event.clientX + MOUSE_TIP_OFFSET_X,
        y: data.event.clientY + MOUSE_TIP_OFFSET_Y,
      });
    }
  }

  public moveCameraByDeltaDegree(deltaDegrees: number, _data?: CommandData): void {
    const radians = HSCore.Util.Math.toRadians(deltaDegrees);
    const rotatedPosition = new HSCore.Util.Math.Vec2(
      this.camera.target_x,
      this.camera.target_y
    ).rotate(radians, {
      x: this.camera.x,
      y: this.camera.y,
    });

    this.moveTo(rotatedPosition.x, rotatedPosition.y);
  }

  public canUndoRedo(): boolean {
    return false;
  }
}