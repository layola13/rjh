import { Entity, Entity_IO, EntityFlagEnum } from './Entity';
import { EntityField, getValueByPaths } from './Utils';
import { ContentType } from './ContentType';
import { Logger } from './Logger';

enum LightTypeEnum {
  PointLight = "pointlight",
  FlatLight = "flatlight",
  EllipseLight = "ellipselight",
  SpotLight = "spotlight",
  AttenuatedSpotLight = "attenuatedspotlight",
  MeshLight = "meshlight",
  PhysicalLight = "physicallight",
  SpotPhysicalLight = "spotphysicallight",
  SubGroup = "subgroup",
  AsmPhysicalLight = "asmphysicallight",
  AsmSubGroup = "asmsubgroup"
}

Object.freeze(LightTypeEnum);

enum LightEditFlagEnum {
  multiAction = 1
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface Rotation3D {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface BoundingData {
  x: number;
  y: number;
  z: number;
  rotation: Rotation3D;
}

interface RenderParameters {
  rotationPoint: (x: number, y: number, z: number, rx: number, ry: number, rz: number) => number[];
  volumeLight: boolean;
}

class Light_IO extends Entity_IO {
  dump(
    entity: Light,
    callback?: (dump: unknown[], entity: Light) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpResult = super.dump(entity, undefined, includeMetadata, options);
    const data = dumpResult[0] as Record<string, unknown>;

    if (entity.temperature !== null) {
      data.temperature = entity.temperature;
    }

    data.intensity = entity.intensity;
    data.x = entity.x;
    data.y = entity.y;
    data.z = entity.z;

    if (entity.rgb !== null) {
      data.rgb = entity.rgb;
    }

    if (entity.affectSpecular) {
      data.affectSpecular = entity.affectSpecular;
    }

    if (entity.close) {
      data.close = !!entity.close;
    }

    data.volumeLight = entity.volumeLight;
    data.friendlyIndex = entity.friendlyIndex;

    if (entity.type) {
      data.type = entity.type;
    }

    if (entity.sourceContentType) {
      data.sourceContentType = entity.sourceContentType.getTypeString();
    }

    data.group = entity.group ? entity.group.id : undefined;

    if (callback) {
      callback(dumpResult, entity);
    }

    return dumpResult;
  }

  load(entity: Light, data: Record<string, unknown>, options: LoadOptions = {}): void {
    entity.XSize = entity.YSize = entity.ZSize = Light.DEFAULT_SIZE;
    entity.contentType = new ContentType("virtual light");
    super.load(entity, data, options);

    const lightEntity = entity as unknown as Record<string, unknown>;
    lightEntity.__intensity = data.intensity;
    lightEntity.__x = data.x;
    lightEntity.__y = data.y;
    lightEntity.__z = data.z;
    lightEntity.__close = !!data.close;
    lightEntity.__temperature = data.temperature;
    lightEntity.__rgb = data.rgb;
    lightEntity.__affectSpecular = !!data.affectSpecular;
    lightEntity.__volumeLight = !!data.volumeLight;
    lightEntity.__friendlyIndex = (data.friendlyIndex as number) || Light.INACTIVE_FRIENDLY_INDEX;

    if (data.sourceContentType) {
      lightEntity.__sourceContentType = new ContentType(data.sourceContentType as string);
    }

    if (data.type) {
      entity.type = data.type as LightTypeEnum;
    }

    if (data.group) {
      lightEntity.group = Entity.loadFromDumpById(data.group as string, options);
    }

    lightEntity.__dataChanged = true;
  }
}

class Light extends Entity {
  static readonly INACTIVE_FRIENDLY_INDEX: number = 0;
  static readonly DEFAULT_SIZE: number = 0.1;

  owner: unknown | null = null;
  private __group: Light | null = null;

  @EntityField()
  temperature?: number;

  @EntityField()
  intensity: number = 1;

  @EntityField()
  x: number = 0;

  @EntityField()
  y: number = 0;

  @EntityField()
  z: number = 0;

  @EntityField()
  rotation: number = 0;

  @EntityField()
  close: boolean = false;

  @EntityField()
  IES: string = "";

  @EntityField()
  iesUrl: string = "";

  @EntityField()
  isPublicIES: boolean = true;

  @EntityField()
  rgb?: number;

  @EntityField()
  affectSpecular: boolean = false;

  @EntityField()
  sourceContentType?: ContentType;

  @EntityField()
  friendlyIndex: number = Light.INACTIVE_FRIENDLY_INDEX;

  @EntityField()
  contentID?: string;

  @EntityField()
  volumeLight: boolean = false;

  @EntityField()
  group?: Light;

  @EntityField()
  lightEditFlag: number = 0;

  contentType: ContentType;
  type?: LightTypeEnum;
  outline: Point2D[] = [];
  private _signalHook: unknown;
  private __dataChanged: boolean = false;

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
    this.contentType = new ContentType("virtual light");
    this._signalHook = new HSCore.Util.SignalHook(this);
    (this._signalHook as any).listen(this.signalFlagChanged, this.onFlagChanged);
  }

  private _getLightGroupTemperature(): number | undefined {
    const ownerEntity = this.owner;
    if (ownerEntity && ownerEntity instanceof HSCore.Model.LightGroup) {
      return ownerEntity.temperature;
    }
    return undefined;
  }

  get isLightGroupTemperature(): boolean {
    const temp = this.temperature;
    return (
      temp === undefined ||
      isNaN(temp) ||
      !Number.isFinite(typeof temp === "string" ? parseFloat(temp) : temp)
    );
  }

  getFriendlyIndexGroup(): string {
    return "default";
  }

  getTemperature(): number {
    let temp = this.temperature;
    if (this.isLightGroupTemperature) {
      temp = this._getLightGroupTemperature();
    }
    return temp || 4800;
  }

  hasAreaSize(): boolean {
    return false;
  }

  isVirtual(): boolean {
    return true;
  }

  getInitialIntensity(): number {
    this.attachRealLight();
    if (!this.content) {
      return 0;
    }

    const lights = getValueByPaths(["metadata", "extension", "objInfo", "lights"], this.content);
    if (!lights) {
      return 0;
    }

    const count = lights.length;
    if (!count) {
      return 0;
    }

    let totalIntensity = 0;
    lights.forEach((light: { multiplier?: number }) => {
      if (light.multiplier) {
        totalIntensity += light.multiplier;
      }
    });

    return totalIntensity / count || 0;
  }

  reset(): void {
    this.temperature = undefined;
    this.intensity = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.close = false;
    this.XSize = this.YSize = this.ZSize = 0.1;
    this.rgb = undefined;
    this.affectSpecular = false;
    this.contentType = new ContentType("virtual light");
    this.sourceContentType = undefined;
    this.lightEditFlag = 0;
  }

  static isPhysicalLight(entity: unknown): boolean {
    return [HSCore.Model.PhysicalLight, HSCore.Model.SpotPhysicalLight].some(
      (type) => entity instanceof type
    );
  }

  static isPhysicalAndMeshLight(entity: unknown): boolean {
    return [
      HSCore.Model.PhysicalLight,
      HSCore.Model.SpotPhysicalLight,
      HSCore.Model.MeshLight
    ].some((type) => entity instanceof type);
  }

  static isAreaSourceLight(entity?: Light): boolean {
    if (!entity) {
      return false;
    }

    switch (entity.type) {
      case LightTypeEnum.SubGroup:
      case LightTypeEnum.FlatLight:
      case LightTypeEnum.EllipseLight:
      case LightTypeEnum.MeshLight:
      case LightTypeEnum.PhysicalLight:
      case LightTypeEnum.SpotPhysicalLight:
        return true;
      default:
        return false;
    }
  }

  getIO(): Light_IO {
    return Light_IO.instance();
  }

  clone(): Light | undefined {
    const entityClass = Entity.getClass(this.Class);
    if (!entityClass) {
      return undefined;
    }

    const clonedLight = entityClass.create() as Light;
    clonedLight.load(this.dump()[0]);
    return clonedLight;
  }

  getHost(): null {
    return null;
  }

  isContentInRoom(): boolean {
    return false;
  }

  isDataChanged(): boolean {
    return this.__dataChanged;
  }

  /** @deprecated use isDataChanged instead */
  isDateChanged(): boolean {
    Logger.console.error("deprecated, use isDataChanged instead!");
    return this.isDataChanged();
  }

  setDataInitStatus(): void {
    this.__dataChanged = false;
  }

  attachRealLight(): void {
    if (this.content || !this.contentID) {
      return;
    }

    const document = HSCore.Doc.getDocManager().activeDocument;
    this.content = document.getEntityById(this.contentID);
  }

  refreshBoundInternal(): void {
    const origin: Point2D = { x: 0, y: 0 };
    const bound = this.boundInternal;
    bound.reset();

    const center = HSCore.Util.Math.Vec2.fromCoordinate(this);
    const point1 = HSCore.Util.Math.rotatePointCW(origin, { x: -0.05, y: 0.05 }, 0).add(this);
    const point2 = HSCore.Util.Math.rotatePointCW(origin, { x: 0.05, y: 0.05 }, 0).add(this);

    this.outline[0] = point1;
    this.outline[1] = point2;
    this.outline[2] = {
      x: 2 * center.x - point1.x,
      y: 2 * center.y - point1.y
    };
    this.outline[3] = {
      x: 2 * center.x - point2.x,
      y: 2 * center.y - point2.y
    };

    for (let i = 0; i < 4; ++i) {
      bound.appendPoint(this.outline[i]);
    }
  }

  closeLight(shouldClose: boolean): void {
    this.close = shouldClose;
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    this._invalidateSubgraph();
    this.__dataChanged = true;

    if (["x", "y", "z"].includes(fieldName)) {
      this.dirtyPosition();
    }

    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  isFlagOn(flag: number, checkParent: boolean = true, checkGroup: boolean = false): boolean {
    let groupFlagOn = false;

    if (this.group && checkGroup) {
      groupFlagOn = this.group.isFlagOn(flag, checkParent, checkGroup);
    }

    return groupFlagOn || super.isFlagOn(flag, checkParent);
  }

  isFlagOff(flag: number, checkParent: boolean = true, checkGroup: boolean = false): boolean {
    let groupFlagOff = false;

    if (this.group && checkGroup) {
      groupFlagOff = this.group.isFlagOff(flag, checkParent, checkGroup);
    }

    return groupFlagOff || super.isFlagOff(flag, checkParent);
  }

  onEntityDirty(): void {
    super.onEntityDirty();
    this._boundDirty = true;
  }

  mirror(position: number, isHorizontal: boolean): void {
    if (isHorizontal) {
      HSCore.Util.Object.updateField(this, "x", position - this.x);
    } else {
      HSCore.Util.Object.updateField(this, "y", position - this.y);
    }
    this.onEntityDirty();
  }

  getRenderParameters(): RenderParameters {
    return {
      rotationPoint: (
        x: number,
        y: number,
        z: number,
        rotationX: number,
        rotationY: number,
        rotationZ: number
      ): number[] => {
        const rx = THREE.Math.degToRad(rotationX);
        const ry = THREE.Math.degToRad(rotationY);
        const rz = THREE.Math.degToRad(rotationZ);

        const position = new THREE.Vector3(x, y, z);
        const transform = new THREE.Matrix4();
        const tempMatrix = new THREE.Matrix4();

        transform.multiply(tempMatrix.makeRotationX(-rx));
        tempMatrix.identity();
        transform.multiply(tempMatrix.makeRotationY(-ry));
        tempMatrix.identity();
        transform.multiply(tempMatrix.makeRotationZ(-rz));

        position.applyMatrix4(transform);

        return [position.x, position.y, position.z].map((value) =>
          parseFloat(value.toFixed(5))
        );
      },
      volumeLight: this.volumeLight
    };
  }

  isGroupChildOf(ancestor?: Light): boolean {
    if (!ancestor) {
      return false;
    }

    let currentGroup = this.group;
    while (currentGroup) {
      if (currentGroup === ancestor) {
        return true;
      }
      currentGroup = currentGroup.group;
    }

    return false;
  }

  setLightEditFlag(flag: LightEditFlagEnum, enable: boolean): void {
    this.lightEditFlag = enable
      ? HSCore.Util.Flag.setFlagOn(this.lightEditFlag, flag)
      : HSCore.Util.Flag.setFlagOff(this.lightEditFlag, flag);
  }

  onFlagChanged(event: { data: { flag: number } }): void {
    if (this.owner && event.data.flag & EntityFlagEnum.removed) {
      if (this.isFlagOn(EntityFlagEnum.removed)) {
        (this.owner as any).removeFriendlyIndex(this);
      } else {
        (this.owner as any).addFriendlyIndex(this);
      }
    }
  }

  getBoundingData(): BoundingData {
    const { x, y, z } = this;
    return {
      x,
      y,
      z,
      rotation: {
        XRotation: 0,
        YRotation: 0,
        ZRotation: 0
      }
    };
  }
}

Entity.registerClass(HSConstants.ModelClass.NgLight, Light);

export { Light, LightTypeEnum, Light_IO, LightEditFlagEnum };