interface HorizontalFovUpdatePayload {
  value: number;
}

interface HorizontalFovAccumulatePayload {
  delta: number;
}

type CommandPayload = HorizontalFovUpdatePayload | HorizontalFovAccumulatePayload;

enum CameraType {
  FirstPerson = 'FirstPerson',
  OrbitView = 'OrbitView'
}

interface Camera {
  type: CameraType;
  horizontal_fov: number;
}

interface Constants {
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX: number;
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN: number;
  ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX: number;
  ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN: number;
}

declare const HSConstants: {
  Constants: Constants;
};

declare const HSCore: {
  Model: {
    CameraTypeEnum: typeof CameraType;
  };
};

declare const HSApp: {
  Cmd: {
    Command: any;
  };
};

export default class CameraHorizontalFovCommand extends HSApp.Cmd.Command {
  private camera: Camera;
  private _lengthToAngleFactor: number = 0.01;
  private _maxHorizontalFov!: number;
  private _minHorizontalFov!: number;

  constructor(camera: Camera) {
    super();
    this.camera = camera;
    this._buildHorizontalFovRange(camera.type);
  }

  private _buildHorizontalFovRange(cameraType: CameraType): void {
    switch (cameraType) {
      case HSCore.Model.CameraTypeEnum.FirstPerson:
        this._maxHorizontalFov = HSConstants.Constants.FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX;
        this._minHorizontalFov = HSConstants.Constants.FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN;
        break;
      case HSCore.Model.CameraTypeEnum.OrbitView:
        this._maxHorizontalFov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX;
        this._minHorizontalFov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN;
        break;
    }
    this._lengthToAngleFactor = 1 / (this._maxHorizontalFov - this._minHorizontalFov);
  }

  private _updateCameraHorizontalFov(fov: number): void {
    this.camera.horizontal_fov = fov;
  }

  private _accumulateCameraHorizontalFov(delta: number): void {
    let newFov = this.camera.horizontal_fov + Math.ceil(delta * this._lengthToAngleFactor);
    
    if (newFov > this._maxHorizontalFov) {
      newFov = this._maxHorizontalFov;
    }
    
    if (newFov < this._minHorizontalFov) {
      newFov = this._minHorizontalFov;
    }
    
    this.camera.horizontal_fov = newFov;
  }

  onExecute(): void {
    // Empty implementation
  }

  onReceive(command: string, payload: CommandPayload): boolean {
    let handled = true;

    switch (command) {
      case 'update_horizontal_fov':
        this._updateCameraHorizontalFov((payload as HorizontalFovUpdatePayload).value);
        break;
      case 'accumulate_horizontal_fov':
        this._accumulateCameraHorizontalFov((payload as HorizontalFovAccumulatePayload).delta);
        break;
      default:
        handled = super.onReceive(command, payload);
    }

    return handled;
  }

  canUndoRedo(): boolean {
    return false;
  }
}