import { Opening_IO, Opening } from './Opening';
import { Entity } from './Entity';
import { Wall } from './Wall';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface AxisDirectory {
  x: number;
  y: number;
  z: number;
}

interface AxisInfo {
  directory: AxisDirectory;
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

enum DoorSwing {
  Default = 0,
  SwingOne = 1,
  SwingTwo = 2,
  SwingThree = 3
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value === Object(value);
}

export class Door_IO extends Opening_IO {
  load(door: Door | null, t: unknown, o: unknown): void {
    super.load(door, t, o);
    door?.updateOpenStatus();
  }
}

export class Door extends Opening {
  private __isOpened: boolean = false;
  private __angle: number = 0;
  private __anchor: [number, number, number] = [0, 0, 0];
  private __anchorAxis: [number, number, number] = [0, 0, 0];
  
  public topView: string;
  public metadata?: DoorMetadata;
  public swing: DoorSwing = DoorSwing.Default;

  constructor(id: string = "") {
    super(id);
    this.topView = HSConstants.Resources?.svgs.default_door_symbol ?? '';
  }

  getIO(): Door_IO {
    return Door_IO.instance();
  }

  open(angle: number = 90): void {
    if (!this.canOpen()) {
      return;
    }

    this.__isOpened = true;
    this.updateOpenStatus(angle);

    if (angle === 0) {
      this.__isOpened = false;
    }

    this.dirtyPosition();
  }

  close(): void {
    this.isOpened = false;
  }

  getDoorOffset(): number {
    if (this.metadata?.hasPocket) {
      return 0;
    }

    const defaultThickness = HSConstants.Constants.DEFAULT_DOOR_BODY_THICKNESS;
    const host = this.getHost();
    const wallWidth = host instanceof Wall ? host.width : 0;
    const offset = wallWidth > 0 
      ? 0.5 * (wallWidth - defaultThickness) - HSConstants.Constants.DOOR_SHIFT_OFFSET 
      : 0;

    return [DoorSwing.Default, DoorSwing.SwingThree].includes(this.swing) ? -offset : offset;
  }

  canOpen(): boolean {
    const axisInfo = this._getAxisInfo();
    return !!axisInfo && axisInfo.length > 0;
  }

  private _getAxisInfo(): AxisInfo[] | undefined {
    return this._extractAxisFromMetadata(this.metadata);
  }

  private _extractAxisFromMetadata(metadata: DoorMetadata | undefined): AxisInfo[] | undefined {
    let current: unknown = metadata;

    for (const key of ['extension', 'objInfo', 'axis']) {
      if (!isObject(current) || !(key in current)) {
        return undefined;
      }
      current = current[key];
    }

    return current as AxisInfo[];
  }

  updateOpenStatus(angle?: number): void {
    const axisInfo = this._getAxisInfo();

    if (!axisInfo || axisInfo.length < 1) {
      return;
    }

    this.__angle = HSCore.Util.Object.isValidNumber(angle) 
      ? angle! 
      : (this.isOpened ? 90 : 0);

    const firstAxis = axisInfo[0];
    const directory = firstAxis.directory;
    this.__anchorAxis = [directory.x, directory.y, directory.z];

    const point = firstAxis.point;
    const scaledPoint: Point3D = {
      x: 0.01 * point.x,
      y: 0.01 * point.y,
      z: 0.01 * point.z
    };

    const offset = this.getDoorOffset();

    switch (this.swing) {
      case DoorSwing.SwingOne:
        this.__anchor = [scaledPoint.x, -scaledPoint.y + offset, scaledPoint.z];
        break;
      case DoorSwing.SwingTwo:
        this.__anchor = [-scaledPoint.x, -scaledPoint.y + offset, scaledPoint.z];
        break;
      case DoorSwing.SwingThree:
        this.__anchor = [-scaledPoint.x, scaledPoint.y + offset, scaledPoint.z];
        break;
      default:
        this.__anchor = [scaledPoint.x, scaledPoint.y + offset, scaledPoint.z];
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgDoor, Door);