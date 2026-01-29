interface Camera {
  type: CameraType;
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z?: number;
  horizontal_fov: number;
  pitch: number;
}

enum CameraType {
  FirstPerson = 'FirstPerson',
  OrbitView = 'OrbitView'
}

interface Constants {
  FIRSTPERSON_CAMERA_HEIGHT: number;
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV: number;
  FIRSTPERSON_CAMERA_TARGET_X: number;
  FIRSTPERSON_CAMERA_TARGET_Y: number;
  ORBITVIEW_CAMERA_HEIGHT: number;
  ORBITVIEW_CAMERA_HORIZONTAL_FOV: number;
  ORBITVIEW_CAMERA_TARGET_X: number;
  ORBITVIEW_CAMERA_TARGET_Y: number;
  ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT: number;
}

declare const HSCore: {
  Model: {
    CameraTypeEnum: typeof CameraType;
  };
};

declare const HSConstants: {
  Constants: Constants;
};

declare const THREE: {
  Vector2: new (x: number, y: number) => Vector2;
  Vector3: new (x: number, y: number, z: number) => Vector3;
  Math: {
    radToDeg: (radians: number) => number;
  };
};

interface Vector2 {
  normalize(): Vector2;
  setLength(length: number): Vector2;
  add(vector: Vector2): Vector2;
  x: number;
  y: number;
}

interface Vector3 {
  setLength(length: number): Vector3;
  angleTo(vector: Vector3): number;
  x: number;
  y: number;
  z: number;
}

declare namespace HSApp.Cmd {
  class Command {
    constructor();
  }
}

/**
 * Camera configuration command that adjusts camera parameters based on camera type
 */
export default class CameraConfigCommand extends HSApp.Cmd.Command {
  private camera: Camera;

  constructor(camera: Camera) {
    super();
    this.camera = camera;
  }

  public onExecute(): void {
    const camera = this.camera;
    
    if (!camera) {
      return;
    }

    switch (camera.type) {
      case HSCore.Model.CameraTypeEnum.FirstPerson:
        this.configureFirstPersonCamera();
        break;
      case HSCore.Model.CameraTypeEnum.OrbitView:
        this.configureOrbitViewCamera();
        break;
    }
  }

  private configureFirstPersonCamera(): void {
    const camera = this.camera;
    camera.z = HSConstants.Constants.FIRSTPERSON_CAMERA_HEIGHT;
    camera.horizontal_fov = HSConstants.Constants.FIRSTPERSON_CAMERA_HORIZONTAL_FOV;

    const targetX = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_X;
    const targetY = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_Y;
    
    const direction = new THREE.Vector2(
      camera.target_x - camera.x,
      camera.target_y - camera.y
    ).normalize();
    
    const targetDistance = Math.sqrt(targetX * targetX + targetY * targetY);
    direction.setLength(targetDistance);
    
    const newTarget = new THREE.Vector2(camera.x, camera.y).add(direction);
    camera.target_x = newTarget.x;
    camera.target_y = newTarget.y;
  }

  private configureOrbitViewCamera(): void {
    const camera = this.camera;
    camera.z = HSConstants.Constants.ORBITVIEW_CAMERA_HEIGHT;
    camera.horizontal_fov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV;
    camera.target_x = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_X;
    camera.target_y = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_Y;
    this.updatePitch();
  }

  private updatePitch(): void {
    const cameraToTarget = new THREE.Vector3(
      this.camera.x - this.camera.target_x,
      this.camera.y - this.camera.target_y,
      this.camera.z - this.getTargetHeight()
    );
    
    cameraToTarget.setLength(1);
    
    const upVector = new THREE.Vector3(0, 0, 1);
    const angleInDegrees = THREE.Math.radToDeg(cameraToTarget.angleTo(upVector));
    this.camera.pitch = angleInDegrees - 90;
  }

  private getTargetHeight(): number {
    return this.camera.target_z ?? HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT;
  }

  public isTransient(): boolean {
    return true;
  }
}