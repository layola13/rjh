import { MaterialUtil } from './MaterialUtil';
import { Face, Face_IO } from './Face';
import { Entity } from './Entity';
import { EntityField, isValidNumber } from './EntityField';
import { Signal } from './Signal';
import { RoomSurfaceTypeEnum } from './RoomSurfaceTypeEnum';

interface DivideInfo {
  // Define specific properties based on your domain model
  [key: string]: unknown;
}

interface LoadOptions {
  version?: string;
  [key: string]: unknown;
}

interface CeilingData {
  divideInfo?: DivideInfo;
  offsetHeight3D?: number;
  isSplitCeiling?: boolean;
  [key: string]: unknown;
}

interface CeilingInstance extends Face {
  __divideInfo?: DivideInfo;
  __offsetHeight3D?: number;
  __material?: {
    mixpaint?: {
      transform: (matrix: unknown) => void;
    };
  };
  isSplitCeiling?: boolean;
}

export class Ceiling_IO extends Face_IO {
  load(
    entity: CeilingInstance,
    data: CeilingData,
    options: LoadOptions = {},
    context?: unknown
  ): void {
    super.load(entity, data, options, context);

    entity.__divideInfo = data.divideInfo;
    entity.__offsetHeight3D = data.offsetHeight3D;
    entity.isSplitCeiling = !!data.isSplitCeiling;

    if (
      HSCore.Util.Version.isEarlierThan(options.version, '0.14') &&
      entity.__material?.mixpaint &&
      MaterialUtil.isRCP(entity)
    ) {
      const migrationMatrix = MaterialUtil.getMigrateCeilingRCPMatrix(
        entity.__material.mixpaint
      );
      entity.__material.mixpaint.transform(migrationMatrix);
    }
  }
}

export class Ceiling extends Face {
  @EntityField()
  divideInfo?: DivideInfo;

  @EntityField({
    validate: (value: unknown): boolean => isValidNumber(value),
  })
  offsetHeight3D: number = 0;

  private __offsetHeight3D: number = 0;

  signalContentAdded: Signal<this>;
  signalContentRemoved: Signal<this>;
  isSplitCeiling: boolean = false;

  constructor(id: string = '') {
    super(id);
    this.__offsetHeight3D = 0;
    this.signalContentAdded = new Signal(this);
    this.signalContentRemoved = new Signal(this);
    this.isSplitCeiling = false;
  }

  getIO(): Ceiling_IO {
    return Ceiling_IO.instance();
  }

  forEachSurface(
    callback?: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: unknown
  ): void {
    callback?.call(context, RoomSurfaceTypeEnum.floor);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCeiling, Ceiling);