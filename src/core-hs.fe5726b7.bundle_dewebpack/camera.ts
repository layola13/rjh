import { EntityField } from './decorators';
import { Entity_IO, Entity } from './Entity';
import { Logger } from './Logger';

enum CameraTypeEnum {
  FirstPerson = "firstperson",
  OrbitView = "orbitview",
  OrthView = "orthview"
}

Object.freeze(CameraTypeEnum);

enum CameraViewTypeEnum {
  Perspective = "perspective",
  Orthographic = "orthographic"
}

Object.freeze(CameraViewTypeEnum);

enum CameraFlagEnum {
  toggleOff = 256
}

Object.freeze(CameraFlagEnum);

interface CameraData {
  type: CameraTypeEnum;
  view_type: CameraViewTypeEnum;
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
  horizontal_fov: number;
  pitch: number;
  near: number;
  clip: number;
  zoom: number;
}

interface Point2D {
  x: number;
  y: number;
}

class Camera_IO extends Entity_IO {
  dump(
    entity: Camera,
    callback?: (result: any[], entity: Camera) => void,
    includeMetadata: boolean = true,
    options: Record<string, any> = {}
  ): any[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const data = result[0];
    
    data.type = entity.type;
    data.view_type = entity.view_type;
    data.x = entity.x;
    data.y = entity.y;
    data.z = entity.z;
    data.target_x = entity.target_x;
    data.target_y = entity.target_y;
    data.target_z = entity.target_z;
    data.horizontal_fov = entity.horizontal_fov;
    data.pitch = entity.pitch;
    data.near = entity.near;
    data.clip = entity.clip;
    data.zoom = entity.zoom;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(entity: Camera, data: Partial<CameraData>, context?: any): void {
    super.load(entity, data, context);
    
    let horizontalFov = data.horizontal_fov ?? 0;
    if (horizontalFov < HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN) {
      horizontalFov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV;
    }
    
    entity.type = data.type ?? CameraTypeEnum.FirstPerson;
    entity.view_type = data.view_type ?? CameraViewTypeEnum.Perspective;
    
    const cameraEntity = entity as any;
    cameraEntity.__x = data.x;
    cameraEntity.__y = data.y;
    cameraEntity.__z = data.z;
    cameraEntity.__target_x = data.target_x;
    cameraEntity.__target_y = data.target_y;
    cameraEntity.__target_z = data.type === CameraTypeEnum.OrbitView 
      ? HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT 
      : data.target_z;
    cameraEntity.__horizontal_fov = horizontalFov;
    cameraEntity.__pitch = data.pitch;
    cameraEntity.__near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
    cameraEntity.__clip = HSConstants.Constants.FIRSTPERSON_CAMERA_CLIP;
    cameraEntity.__zoom = data.zoom ?? 1;
    
    if (!cameraEntity.isValid()) {
      cameraEntity.reset(true);
    }
  }
}

class Camera extends Entity {
  type: CameraTypeEnum = CameraTypeEnum.FirstPerson;
  
  private __view_type: CameraViewTypeEnum = CameraViewTypeEnum.Perspective;
  private __x: number = 0;
  private __y: number = 0;
  private __z: number = 0;
  private __target_x: number = 0;
  private __target_y: number = 0;
  private __target_z: number = 0;
  private __horizontal_fov: number = 0;
  private __render_fov: number | undefined = undefined;
  private __pitch: number = 0;
  private __near: number = 0;
  private __clip: number = 0;
  private __zoom: number = 1;

  constructor(id: string = "", context?: any) {
    super(id, context);
  }

  @EntityField({ noTransaction: true })
  get view_type(): CameraViewTypeEnum {
    return this.__view_type;
  }
  set view_type(value: CameraViewTypeEnum) {
    this.__view_type = value;
  }

  @EntityField({ noTransaction: true })
  get x(): number {
    return this.__x;
  }
  set x(value: number) {
    this.__x = value;
  }

  @EntityField({ noTransaction: true })
  get y(): number {
    return this.__y;
  }
  set y(value: number) {
    this.__y = value;
  }

  @EntityField({ noTransaction: true })
  get z(): number {
    return this.__z;
  }
  set z(value: number) {
    this.__z = value;
  }

  @EntityField({ noTransaction: true })
  get target_x(): number {
    return this.__target_x;
  }
  set target_x(value: number) {
    this.__target_x = value;
  }

  @EntityField({ noTransaction: true })
  get target_y(): number {
    return this.__target_y;
  }
  set target_y(value: number) {
    this.__target_y = value;
  }

  @EntityField({ noTransaction: true })
  get target_z(): number {
    return this.__target_z;
  }
  set target_z(value: number) {
    this.__target_z = value;
  }

  @EntityField({ noTransaction: true })
  get horizontal_fov(): number {
    return this.__horizontal_fov;
  }
  set horizontal_fov(value: number) {
    this.__horizontal_fov = value;
  }

  @EntityField({ noTransaction: true })
  get render_fov(): number | undefined {
    return this.__render_fov;
  }
  set render_fov(value: number | undefined) {
    this.__render_fov = value;
  }

  @EntityField({ noTransaction: true })
  get pitch(): number {
    return this.__pitch;
  }
  set pitch(value: number) {
    this.__pitch = value;
  }

  @EntityField({ noTransaction: true })
  get near(): number {
    return this.__near;
  }
  set near(value: number) {
    this.__near = value;
  }

  @EntityField({ noTransaction: true })
  get clip(): number {
    return this.__clip;
  }
  set clip(value: number) {
    this.__clip = value;
  }

  @EntityField({ noTransaction: true })
  get zoom(): number {
    return this.__zoom;
  }
  set zoom(value: number) {
    this.__zoom = value;
  }

  verify(): boolean {
    const values = [
      this.__target_x,
      this.__target_y,
      this.__x,
      this.__y,
      this.__z,
      this.__pitch,
      this.__near,
      this.__zoom
    ];
    
    if (!values.every(HSCore.Util.Object.isNumber)) {
      log.error(`${this.tag}: invalid data.`, "HSCore.Verify.Error", true);
      this.reset();
    }
    
    return super.verify();
  }

  onFieldChanged(fieldName: string, newValue: any, oldValue: any): void {
    if (fieldName === "clip" && !oldValue) {
      this.__near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  static create(cameraType: CameraTypeEnum): Camera {
    const camera = new Camera();
    camera.type = cameraType;
    camera.reset();
    return camera;
  }

  reset(directAssignment: boolean = false): void {
    switch (this.type) {
      case CameraTypeEnum.OrbitView:
        if (directAssignment) {
          this.__x = HSConstants.Constants.ORBITVIEW_CAMERA_X;
          this.__y = HSConstants.Constants.ORBITVIEW_CAMERA_Y;
          this.__z = HSConstants.Constants.ORBITVIEW_CAMERA_Z;
          this.__target_x = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_X;
          this.__target_y = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_Y;
          this.__target_z = HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT;
          this.__horizontal_fov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV;
          this.__pitch = HSConstants.Constants.ORBITVIEW_CAMERA_PITCH;
          this.__near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
          this.__clip = Number(HSConstants.Constants.FIRSTPERSON_CAMERA_CLIP);
          this.__zoom = 1;
        } else {
          this.x = HSConstants.Constants.ORBITVIEW_CAMERA_X;
          this.y = HSConstants.Constants.ORBITVIEW_CAMERA_Y;
          this.z = HSConstants.Constants.ORBITVIEW_CAMERA_Z;
          this.target_x = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_X;
          this.target_y = HSConstants.Constants.ORBITVIEW_CAMERA_TARGET_Y;
          this.target_z = HSConstants.Constants.ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT;
          this.horizontal_fov = HSConstants.Constants.ORBITVIEW_CAMERA_HORIZONTAL_FOV;
          this.pitch = HSConstants.Constants.ORBITVIEW_CAMERA_PITCH;
          this.near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
          this.clip = Number(HSConstants.Constants.FIRSTPERSON_CAMERA_CLIP);
          this.zoom = 1;
        }
        break;
        
      case CameraTypeEnum.FirstPerson:
        if (directAssignment) {
          this.__x = 0;
          this.__y = 0;
          this.__z = HSConstants.Constants.FIRSTPERSON_CAMERA_HEIGHT;
          this.__target_x = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_X;
          this.__target_y = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_Y;
          this.__horizontal_fov = HSConstants.Constants.FIRSTPERSON_CAMERA_HORIZONTAL_FOV;
          this.__pitch = HSConstants.Constants.FIRSTPERSON_CAMERA_PITCH;
          this.__near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
          this.__clip = Number(HSConstants.Constants.FIRSTPERSON_CAMERA_CLIP);
          this.__zoom = 1;
        } else {
          this.x = 0;
          this.y = 0;
          this.z = HSConstants.Constants.FIRSTPERSON_CAMERA_HEIGHT;
          this.target_x = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_X;
          this.target_y = HSConstants.Constants.FIRSTPERSON_CAMERA_TARGET_Y;
          this.horizontal_fov = HSConstants.Constants.FIRSTPERSON_CAMERA_HORIZONTAL_FOV;
          this.pitch = HSConstants.Constants.FIRSTPERSON_CAMERA_PITCH;
          this.near = HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR;
          this.clip = Number(HSConstants.Constants.FIRSTPERSON_CAMERA_CLIP);
          this.zoom = 1;
        }
        break;
        
      case CameraTypeEnum.OrthView:
        break;
    }
  }

  getIO(): Camera_IO {
    return Camera_IO.instance();
  }

  refreshBoundInternal(): void {
    const origin: Point2D = { x: 0, y: 0 };
    const bounds = this.boundInternal;
    bounds.reset();
    
    const centerPoint = HSCore.Util.Math.Vec2.fromCoordinate(this);
    const point1 = HSCore.Util.Math.rotatePointCW(origin, { x: -0.05, y: 0.05 }, 0).add(this);
    const point2 = HSCore.Util.Math.rotatePointCW(origin, { x: 0.05, y: 0.05 }, 0).add(this);
    
    const outlinePoints: Point2D[] = [
      point1,
      point2,
      { x: 2 * centerPoint.x - point1.x, y: 2 * centerPoint.y - point1.y },
      { x: 2 * centerPoint.x - point2.x, y: 2 * centerPoint.y - point2.y }
    ];
    
    for (const point of outlinePoints) {
      bounds.appendPoint(point);
    }
    
    this.outline = outlinePoints;
  }

  isValid(): boolean {
    if (!super.isValid()) {
      return false;
    }
    
    const direction = new THREE.Vector3(
      this.target_x - this.x,
      this.target_y - this.y,
      this.target_z - this.z
    );
    
    if (direction.x === 0 && direction.y === 0 && direction.z !== 0) {
      return false;
    }
    
    const cameraPosition = new THREE.Vector3(this.x, this.y, 0);
    const targetPosition = new THREE.Vector3(this.target_x, this.target_y, this.target_z);
    
    return !GeLib.VectorUtils.isPointEqual(cameraPosition, targetPosition);
  }

  move(deltaX: number, deltaY: number): void {
    const isValidNumber = HSCore.Util.Object.isValidNumber.bind(HSCore.Util.Object);
    
    if (isValidNumber(deltaX) && isValidNumber(deltaY)) {
      this.x += deltaX;
      this.target_x += deltaX;
      this.y += deltaY;
      this.target_y += deltaY;
    } else {
      Logger.console.assert(false, `${this.tag}: invalid values (${deltaX}, ${deltaY}).`);
    }
  }

  moveTo(targetX: number, targetY: number): void {
    const deltaX = targetX - this.x;
    const deltaY = targetY - this.y;
    this.move(deltaX, deltaY);
  }

  clone(): Camera {
    const cloned = new Camera();
    cloned._flag = this._flag;
    cloned.type = this.type;
    cloned.view_type = this.view_type;
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.z = this.z;
    cloned.target_x = this.target_x;
    cloned.target_y = this.target_y;
    cloned.target_z = this.target_z;
    cloned.horizontal_fov = this.horizontal_fov;
    cloned.pitch = this.pitch;
    cloned.near = this.near;
    cloned.clip = this.clip;
    cloned.zoom = this.zoom;
    return cloned;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCamera, Camera);

export { Camera, CameraTypeEnum, CameraViewTypeEnum, CameraFlagEnum, Camera_IO };