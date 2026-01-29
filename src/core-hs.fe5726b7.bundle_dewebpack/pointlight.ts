import { Light, Light_IO, LightTypeEnum } from './Light';
import { Entity } from './Entity';
import { EntityField } from './decorators';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpResult {
  radius?: number;
  [key: string]: unknown;
}

interface LoadData {
  radius?: number;
  [key: string]: unknown;
}

interface PointLightInternal extends PointLight {
  __radius: number;
  __XSize: number;
  __YSize: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  rgb: unknown;
  affectSpecular: boolean;
  close: boolean;
  sourceContentType: unknown;
}

export class PointLight_IO extends Light_IO {
  dump(
    entity: PointLight,
    callback?: (result: DumpResult[], entity: PointLight) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): DumpResult[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    result[0].radius = entity.radius;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(
    entity: PointLight,
    data: LoadData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    const internalEntity = entity as PointLightInternal;
    internalEntity.__radius = data.radius ?? 0.1;
    internalEntity.__XSize = 2 * entity.radius;
    internalEntity.__YSize = 2 * entity.radius;
  }
}

export class PointLight extends Light {
  @EntityField()
  radius: number = 0.2;

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
    this.type = LightTypeEnum.PointLight;
  }

  static create(): PointLight {
    const light = new PointLight();
    light.reset();
    return light;
  }

  reset(): void {
    super.reset();
    this.radius = 0.2;
  }

  getIO(): PointLight_IO {
    return PointLight_IO.instance();
  }

  refreshBoundInternal(): void {
    const origin: Point2D = { x: 0, y: 0 };
    const bounds = this.boundInternal;
    bounds.reset();
    
    this.YSize = this.XSize = this.ZSize = 2 * this.radius;
    
    const center = HSCore.Util.Math.Vec2.fromCoordinate(this);
    
    const point1 = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: -this.XSize / 2, y: this.XSize / 2 },
      0
    ).add(this);
    
    const point2 = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: this.XSize / 2, y: this.XSize / 2 },
      0
    ).add(this);
    
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
      bounds.appendPoint(this.outline[i]);
    }
  }

  getRenderParameters(): RenderParameters {
    const params = super.getRenderParameters() as RenderParameters;
    params.temperature = this.getTemperature();
    params.intensity = this.intensity;
    params.x = this.x;
    params.y = this.y;
    
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this);
    params.z = this.z + baseHeight;
    params.radius = this.radius;
    params.rgb = this.rgb;
    params.affectSpecular = this.affectSpecular;
    params.close = this.close;
    params.sourceContentType = this.sourceContentType;
    
    return params;
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (fieldName === "radius") {
      this.dirtyPosition();
      this.group?.dirtyPosition();
    }
    
    super.onFieldChanged(fieldName, newValue, oldValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPointLight, PointLight);