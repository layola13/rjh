import { SpotLight, SpotLight_IO } from './SpotLight';
import { LightTypeEnum } from './LightTypeEnum';
import { Entity } from './Entity';
import { EntityField } from './EntityField';

interface SerializedAttenuatedSpotLight {
  IES: string;
  nearAttenuationStart: number;
  nearAttenuationEnd: number;
  farAttenuationStart: number;
  farAttenuationEnd: number;
  hotspotAngle: number;
  falloffAngle: number;
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

type DumpCallback = (result: [SerializedAttenuatedSpotLight], entity: AttenuatedSpotLight) => void;

interface RenderParameters {
  nearAttenuationStart: number;
  nearAttenuationEnd: number;
  farAttenuationStart: number;
  farAttenuationEnd: number;
  hotspotAngle: number;
  falloffAngle: number;
  [key: string]: unknown;
}

export class AttenuatedSpotLight_IO extends SpotLight_IO {
  dump(
    entity: AttenuatedSpotLight,
    callback?: DumpCallback,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): [SerializedAttenuatedSpotLight] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const serialized = result[0] as SerializedAttenuatedSpotLight;
    
    serialized.IES = "";
    serialized.nearAttenuationStart = entity.nearAttenuationStart;
    serialized.nearAttenuationEnd = entity.nearAttenuationEnd;
    serialized.farAttenuationStart = entity.farAttenuationStart;
    serialized.farAttenuationEnd = entity.farAttenuationEnd;
    serialized.hotspotAngle = entity.hotspotAngle;
    serialized.falloffAngle = entity.falloffAngle;
    
    callback?.(result as [SerializedAttenuatedSpotLight], entity);
    
    return result as [SerializedAttenuatedSpotLight];
  }

  load(
    entity: AttenuatedSpotLight,
    data: SerializedAttenuatedSpotLight,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    (entity as any).__IES = undefined;
    entity.nearAttenuationStart = data.nearAttenuationStart;
    entity.nearAttenuationEnd = data.nearAttenuationEnd;
    entity.farAttenuationStart = data.farAttenuationStart;
    entity.farAttenuationEnd = data.farAttenuationEnd;
    entity.hotspotAngle = data.hotspotAngle;
    entity.falloffAngle = data.falloffAngle;
  }
}

export class AttenuatedSpotLight extends SpotLight {
  static readonly RangeMin = 0;
  static readonly RangeMax = 5;
  static readonly DefaultNearStart = 0;
  static readonly DefaultNearEnd = 0.5;
  static readonly DefaultFarStart = 2;
  static readonly DefaultFarEnd = 3;
  static readonly AngleMin = 0;
  static readonly AngleMax = 179;
  static readonly DefaultHotspot = 45;
  static readonly DefaultFallOff = 72;

  @EntityField()
  nearAttenuationStart: number;

  @EntityField()
  nearAttenuationEnd: number;

  @EntityField()
  farAttenuationStart: number;

  @EntityField()
  farAttenuationEnd: number;

  @EntityField()
  hotspotAngle: number;

  @EntityField()
  falloffAngle: number;

  constructor(name: string = "", scene?: unknown) {
    super(name, scene);
    
    this.nearAttenuationStart = AttenuatedSpotLight.DefaultNearStart;
    this.nearAttenuationEnd = AttenuatedSpotLight.DefaultNearEnd;
    this.farAttenuationStart = AttenuatedSpotLight.DefaultFarStart;
    this.farAttenuationEnd = AttenuatedSpotLight.DefaultFarEnd;
    this.hotspotAngle = AttenuatedSpotLight.DefaultHotspot;
    this.falloffAngle = AttenuatedSpotLight.DefaultFallOff;
    this.type = LightTypeEnum.AttenuatedSpotLight;
  }

  static create(): AttenuatedSpotLight {
    const light = new AttenuatedSpotLight();
    light.reset();
    return light;
  }

  reset(): void {
    super.reset();
    
    this.IES = "";
    this.nearAttenuationStart = AttenuatedSpotLight.DefaultNearStart;
    this.nearAttenuationEnd = AttenuatedSpotLight.DefaultNearEnd;
    this.farAttenuationStart = AttenuatedSpotLight.DefaultFarStart;
    this.farAttenuationEnd = AttenuatedSpotLight.DefaultFarEnd;
    this.hotspotAngle = AttenuatedSpotLight.DefaultHotspot;
    this.falloffAngle = AttenuatedSpotLight.DefaultFallOff;
  }

  getIO(): AttenuatedSpotLight_IO {
    return AttenuatedSpotLight_IO.instance();
  }

  getRenderParameters(): RenderParameters {
    return {
      ...super.getRenderParameters(),
      nearAttenuationStart: this.nearAttenuationStart,
      nearAttenuationEnd: this.nearAttenuationEnd,
      farAttenuationStart: this.farAttenuationStart,
      farAttenuationEnd: this.farAttenuationEnd,
      hotspotAngle: this.hotspotAngle,
      falloffAngle: this.falloffAngle
    };
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (fieldName !== "IES") {
      super.onFieldChanged(fieldName, newValue, oldValue);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgAttenuatedSpotLight, AttenuatedSpotLight);