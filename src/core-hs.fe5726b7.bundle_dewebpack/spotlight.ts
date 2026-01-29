import { DirectionLight_IO, DirectionLight } from './DirectionLight';
import { LightTypeEnum } from './LightTypeEnum';
import { Entity } from './Entity';
import { BrepBound } from './BrepBound';
import { EntityField } from './EntityField';

const DEFAULT_SIZE = 0.3;
const NEAR_OFFSET = -0.15;
const FAR_OFFSET = -0.5;

interface SpotLightData {
  IES?: string;
  iesUrl?: string;
  isPublicIES?: boolean;
  extractSourceId?: string;
  XSize?: number;
  YSize?: number;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  x: number;
  y: number;
  z: number;
  IES: string;
  iesUrl: string;
  isPublicIES: boolean;
  rgb: number[];
  affectSpecular: boolean;
  close: boolean;
  sourceContentType: string;
}

export class SpotLight_IO extends DirectionLight_IO {
  public dump(
    entity: SpotLight,
    callback?: (result: unknown[], entity: SpotLight) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const data = result[0] as SpotLightData;
    
    data.IES = entity.IES;
    data.iesUrl = entity.iesUrl;
    data.isPublicIES = entity.isPublicIES;
    data.extractSourceId = entity.extractSourceId;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  public load(
    entity: SpotLight,
    data: SpotLightData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    const extendedEntity = entity as SpotLight & {
      __IES?: string;
      __iesUrl?: string;
      __isPublicIES?: boolean;
      __extractSourceId?: string;
    };
    
    extendedEntity.__IES = data.IES;
    extendedEntity.__iesUrl = data.iesUrl;
    extendedEntity.__isPublicIES = data.isPublicIES;
    extendedEntity.__extractSourceId = data.extractSourceId;
    
    if (
      (data.XSize !== undefined && data.XSize < DEFAULT_SIZE) ||
      (data.YSize !== undefined && data.YSize < DEFAULT_SIZE)
    ) {
      entity.XSize = DEFAULT_SIZE;
      entity.YSize = DEFAULT_SIZE;
    }
  }
}

export class SpotLight extends DirectionLight {
  public static readonly INNER_IES: string[] = [
    HSConstants.RenderLight.SPOT_LIGHT_NUM_1,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_2,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_3,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_5,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_6,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_7,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_8,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_9,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_10,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_11,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_12,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_13,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_14,
    HSConstants.RenderLight.SPOT_LIGHT_NUM_15,
    HSConstants.RenderLight.FILL_LIGHT_NUM_1,
    HSConstants.RenderLight.FILL_LIGHT_NUM_2,
    HSConstants.RenderLight.FILL_LIGHT_NUM_3,
    HSConstants.RenderLight.FILL_LIGHT_NUM_4,
    HSConstants.RenderLight.FILL_LIGHT_NUM_5,
    HSConstants.RenderLight.FILL_LIGHT_NUM_6,
    HSConstants.RenderLight.FILL_LIGHT_NUM_7,
  ];

  @EntityField()
  public extractSourceId?: string;

  public IES!: string;
  public iesUrl!: string;
  public isPublicIES!: boolean;
  public XSize!: number;
  public YSize!: number;
  public x!: number;
  public y!: number;
  public z!: number;
  public XRotation!: number;
  public YRotation!: number;
  public ZRotation!: number;
  public intensity!: number;
  public rgb!: number[];
  public affectSpecular!: boolean;
  public close!: boolean;
  public sourceContentType!: string;
  public owner?: {
    changeFriendlyIndex(entity: SpotLight, previousValue: unknown): void;
  };
  protected boundInternal!: BrepBound;

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
    this.type = LightTypeEnum.SpotLight;
  }

  public static create(): SpotLight {
    const spotLight = new SpotLight();
    spotLight.reset();
    return spotLight;
  }

  public reset(): void {
    super.reset();
    this.IES = HSConstants.RenderLight.SPOT_LIGHT_NUM_1;
    this.iesUrl = "";
    this.isPublicIES = true;
    this.XSize = DEFAULT_SIZE;
    this.YSize = DEFAULT_SIZE;
  }

  public getIO(): SpotLight_IO {
    return SpotLight_IO.instance();
  }

  protected refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();

    const euler = new THREE.Euler(
      -THREE.Math.degToRad(this.XRotation),
      -THREE.Math.degToRad(this.YRotation),
      -THREE.Math.degToRad(this.ZRotation),
      "XYZ"
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);

    const innerSize = 0.15;
    const outerSize = 0.25;

    const vertices: THREE.Vector3[] = [
      new THREE.Vector3(-innerSize, -innerSize, NEAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(innerSize, -innerSize, NEAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(innerSize, innerSize, NEAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(-innerSize, innerSize, NEAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(-outerSize, -outerSize, FAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(outerSize, -outerSize, FAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(outerSize, outerSize, FAR_OFFSET).applyQuaternion(quaternion),
      new THREE.Vector3(-outerSize, outerSize, FAR_OFFSET).applyQuaternion(quaternion),
    ];

    let minX = vertices[0].x;
    let maxX = vertices[0].x;
    let minY = vertices[0].y;
    let maxY = vertices[0].y;

    for (let i = 1; i < 8; ++i) {
      minX = Math.min(minX, vertices[i].x);
      maxX = Math.max(maxX, vertices[i].x);
      minY = Math.min(minY, vertices[i].y);
      maxY = Math.max(maxY, vertices[i].y);
    }

    const position = HSCore.Util.Math.Vec2.fromCoordinate(this);
    bound.appendBound(
      new BrepBound(
        minX + position.x,
        minY + position.y,
        maxX - minX,
        maxY - minY
      )
    );
  }

  public getRenderParameters(): RenderParameters {
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this);
    
    return {
      ...super.getRenderParameters(),
      temperature: this.getTemperature(),
      intensity: this.intensity,
      x: this.x,
      y: this.y,
      z: this.z + baseHeight,
      IES: this.IES,
      iesUrl: this.iesUrl,
      isPublicIES: this.isPublicIES,
      rgb: this.rgb,
      affectSpecular: this.affectSpecular,
      close: this.close,
      sourceContentType: this.sourceContentType,
    };
  }

  public getFriendlyIndexGroup(): string {
    if (this.iesUrl) {
      const innerIES = SpotLight.INNER_IES.find(
        (ies) => this.iesUrl.endsWith(ies)
      );
      if (innerIES) {
        return innerIES;
      }
    }
    return this.iesUrl || this.IES || "default";
  }

  protected onFieldChanged(
    fieldName: string,
    previousValue: unknown,
    currentValue: unknown
  ): void {
    super.onFieldChanged(fieldName, previousValue, currentValue);
    
    if (this.owner && (fieldName === "iesUrl" || (fieldName === "IES" && !this.iesUrl))) {
      this.owner.changeFriendlyIndex(this, previousValue);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgSpotLight, SpotLight);