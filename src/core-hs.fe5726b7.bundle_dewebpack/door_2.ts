import { Opening_IO, Opening } from './Opening';
import { Entity } from './Entity';
import { Material } from './Material';
import { Manager } from './Manager';
import { getValueByPaths } from './utils';
import { Wall } from './Wall';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Directory3D {
  x: number;
  y: number;
  z: number;
}

interface AxisInfo {
  directory: Directory3D;
  point: Point3D;
}

interface DoorMetadata {
  hasPocket?: boolean;
  extension?: {
    objInfo?: {
      axis?: AxisInfo[];
    };
  };
}

interface SurfaceObject {
  surface: {
    containsPoint(point: Point3D): boolean;
  };
}

interface PathSegment {
  getStartPt(): Point3D;
  getEndPt(): Point3D;
}

interface CutterInfo {
  cutPath: PathSegment[];
  patchLines: PathSegment[];
}

interface BaseboardCutterContext {
  surfaceObj: SurfaceObject;
}

const DEFAULT_DOOR_BODY_THICKNESS = HSConstants.Constants.DEFAULT_DOOR_BODY_THICKNESS;
const DOOR_SHIFT_OFFSET = HSConstants.Constants.DOOR_SHIFT_OFFSET;
const DEFAULT_OPEN_ANGLE = 90;
const CLOSED_ANGLE = 0;
const CENTIMETER_TO_METER = 0.01;

class Door_IO extends Opening_IO {
  load(entity: Door | null, data: unknown, context: unknown): void {
    super.load(entity, data, context);
    
    if (entity) {
      entity.updateOpenStatus();
    }
  }
}

class Door extends Opening {
  private __isOpened: boolean = false;
  private __angle: number = 0;
  private __anchorAxis: [number, number, number] = [0, 0, 0];
  private __anchor: [number, number, number] = [0, 0, 0];
  private _bottomFaceDefaultMaterial?: Material;
  
  override metadata?: DoorMetadata;
  topView: string;
  swing: number = 0;

  constructor(id: string = "", data?: unknown) {
    super(id, data);
    this.topView = HSConstants.Resources?.svgs?.default_door_symbol ?? '';
  }

  getIO(): Door_IO {
    return Door_IO.instance();
  }

  open(angle: number = DEFAULT_OPEN_ANGLE): void {
    if (!this.canOpen()) {
      return;
    }

    this.__isOpened = true;
    this.updateOpenStatus(angle);

    if (angle === CLOSED_ANGLE) {
      this.__isOpened = false;
    }

    this.dirtyPosition();
  }

  close(): void {
    this.isOpened = false;
  }

  set isOpened(value: boolean) {
    this.__isOpened = value;
  }

  get isOpened(): boolean {
    return this.__isOpened;
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (fieldName === 'isOpened') {
      this.updateOpenStatus();
      this.dirtyPosition();
    }
    
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  onHostChanged(): void {
    super.onHostChanged();
    this.updateOpenStatus();
    this.dirtyPosition();
  }

  onSwingChanged(): void {
    this.updateOpenStatus();
  }

  getDoorOffset(): number {
    if (this.metadata?.hasPocket) {
      return 0;
    }

    const host = this.getHost();
    const hostWidth = host instanceof Wall ? host.width : 0;
    const offset = hostWidth > 0 
      ? 0.5 * (hostWidth - DEFAULT_DOOR_BODY_THICKNESS) - DOOR_SHIFT_OFFSET 
      : 0;

    return [0, 3].includes(this.swing) ? -offset : offset;
  }

  canOpen(): boolean {
    const axisInfo = this._getAxisInfo();
    return !!axisInfo && axisInfo.length > 0;
  }

  private _getAxisInfo(): AxisInfo[] | undefined {
    return getValueByPaths<AxisInfo[]>(['extension', 'objInfo', 'axis'], this.metadata);
  }

  updateOpenStatus(angle?: number): void {
    const axisInfo = this._getAxisInfo();
    
    if (!axisInfo || axisInfo.length < 1) {
      return;
    }

    this.__angle = HSCore.Util.Object.isValidNumber(angle) 
      ? angle! 
      : this.isOpened ? DEFAULT_OPEN_ANGLE : CLOSED_ANGLE;

    const firstAxis = axisInfo[0];
    const directory = firstAxis.directory;
    this.__anchorAxis = [directory.x, directory.y, directory.z];

    const point = firstAxis.point;
    const normalizedPoint: Point3D = {
      x: CENTIMETER_TO_METER * point.x,
      y: CENTIMETER_TO_METER * point.y,
      z: CENTIMETER_TO_METER * point.z
    };

    const doorOffset = this.getDoorOffset();

    switch (this.swing) {
      case 1:
        this.__anchor = [normalizedPoint.x, -normalizedPoint.y + doorOffset, normalizedPoint.z];
        break;
      case 2:
        this.__anchor = [-normalizedPoint.x, -normalizedPoint.y + doorOffset, normalizedPoint.z];
        break;
      case 3:
        this.__anchor = [-normalizedPoint.x, normalizedPoint.y + doorOffset, normalizedPoint.z];
        break;
      default:
        this.__anchor = [normalizedPoint.x, normalizedPoint.y + doorOffset, normalizedPoint.z];
    }
  }

  private _getBottomFaceDefaultMaterial(): Material {
    if (!this._bottomFaceDefaultMaterial) {
      const defaultMaterialData = Manager.instance().getDefaultMaterialData('DEFAULT_FLOOR_MATERIAL');
      this._bottomFaceDefaultMaterial = Material.create(defaultMaterialData);
    }
    
    return this._bottomFaceDefaultMaterial;
  }

  getBaseboardCutterInfo(context: BaseboardCutterContext): CutterInfo[] {
    const cutterInfo = super.getBaseboardCutterInfo(context);

    if (this.getPocket()) {
      return cutterInfo;
    }

    cutterInfo.forEach((info) => {
      info.cutPath.forEach((segment) => {
        const startContained = context.surfaceObj.surface.containsPoint(segment.getStartPt());
        const endContained = context.surfaceObj.surface.containsPoint(segment.getEndPt());

        if ((startContained && !endContained) || (!startContained && endContained)) {
          info.patchLines.push(segment);
        }
      });
    });

    return cutterInfo;
  }

  protected getHost(): unknown {
    return undefined;
  }

  protected dirtyPosition(): void {}

  protected getPocket(): unknown {
    return undefined;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgDoor, Door);

export { Door_IO, Door };