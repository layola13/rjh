import { SpotLight_IO, SpotLight } from './SpotLight';
import { LightTypeEnum } from './LightTypeEnum';
import { Entity, EntityField } from './Entity';
import { Euler } from './Euler';
import { Logger } from './Logger';
import * as THREE from 'three';

interface IESConfig {
  name: string;
  targetDir?: number[];
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

interface LightMetadata {
  extension?: {
    objInfo: {
      lights: IESConfig[];
    };
  };
}

interface LightContent {
  metadata?: LightMetadata;
  x: number;
  y: number;
  z: number;
  ZSize: number;
  XSize: number;
  YSize: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface SerializedLightData {
  name: string[];
  contentID?: string;
  topView: string;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface CreateOptions {
  dirX?: number;
  dirY?: number;
  dirZ?: number;
}

interface IESRotation {
  name: string;
  targetDir: number[];
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  entityId?: string;
  IES?: string;
  iesUrl?: string;
  isPublicIES: boolean;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  close: boolean;
  rgb: number[];
  affectSpecular: boolean;
  intensityScale: number;
  iesRotations?: IESRotation[];
}

interface Point2D {
  x: number;
  y: number;
}

interface BoundingBox {
  reset(): void;
  appendPoint(point: Point2D): void;
}

export class SpotPhysicalLight_IO extends SpotLight_IO {
  private static _instance?: SpotPhysicalLight_IO;

  public static instance(): SpotPhysicalLight_IO {
    if (!SpotPhysicalLight_IO._instance) {
      SpotPhysicalLight_IO._instance = new SpotPhysicalLight_IO();
    }
    return SpotPhysicalLight_IO._instance;
  }

  public dump(
    entity: SpotPhysicalLight,
    callback?: (data: unknown[], entity: SpotPhysicalLight) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpedData = super.dump(entity, undefined, includeChildren, options);
    const serialized = dumpedData[0] as SerializedLightData;
    
    serialized.name = entity.name;
    serialized.contentID = entity.contentID;
    serialized.topView = entity.topView;
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  public load(
    entity: SpotPhysicalLight,
    data: SerializedLightData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data as unknown, options);
    
    entity.name = data.name;
    entity.__contentID = data.contentID;
    entity.__topView = data.topView;
  }
}

export class SpotPhysicalLight extends SpotLight {
  private _iesMatrixCache: THREE.Matrix4;
  private _iesConfig?: IESConfig[];
  
  public name: string[] = [];
  public __IES?: string;
  public __iesUrl?: string;
  public __isPublicIES: boolean = true;
  public __contentID?: string;
  public __topView: string = '';
  
  protected boundInternal!: BoundingBox;
  protected outline: Point2D[] = [];
  public content?: LightContent;
  public targetEnabled: boolean = false;
  public intensity: number = 1;
  public close: boolean = false;
  public rgb: number[] = [255, 255, 255];
  public affectSpecular: boolean = true;
  public XTarget: number = 0;
  public YTarget: number = 0;
  public ZTarget: number = 0;

  @EntityField()
  public topView: string = '';

  public get contentID(): string | undefined {
    return this.__contentID;
  }

  public get IES(): string | undefined {
    return this.__IES;
  }

  public get iesUrl(): string | undefined {
    return this.__iesUrl;
  }

  public get isPublicIES(): boolean {
    return this.__isPublicIES;
  }

  constructor(name: string = '', parent?: Entity) {
    super(name, parent);
    this._iesMatrixCache = new THREE.Matrix4();
    this.type = LightTypeEnum.SpotPhysicalLight;
  }

  public static create(options?: CreateOptions): SpotPhysicalLight {
    const light = new SpotPhysicalLight();
    light.reset();
    light.XRotation = 0;

    const dirX = options?.dirX ?? 0;
    const dirY = options?.dirY ?? 0;
    const dirZ = options?.dirZ ?? 0;

    const horizontalDir = new THREE.Vector3(dirX, 0, dirZ);
    light.YRotation = GeLib.VectorUtils.angleToIn2PI(
      horizontalDir,
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(0, 1, 0)
    );

    const verticalDir = new THREE.Vector3(dirX, dirY, 0);
    light.ZRotation = GeLib.VectorUtils.angleToIn2PI(
      verticalDir,
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1)
    );

    return light;
  }

  public isVirtual(): boolean {
    return false;
  }

  public hasAreaSize(): boolean {
    return true;
  }

  public get iesConfig(): IESConfig[] {
    if (!this._iesConfig) {
      this.attachRealLight();
      this._iesConfig = [];

      if (this.content?.metadata?.extension) {
        const lights = this.content.metadata.extension.objInfo.lights;
        lights?.forEach((light: IESConfig) => {
          if (light.targetDir) {
            this._iesConfig!.push(light);
          }
        });
      }
    }

    return this._iesConfig;
  }

  public reset(): void {
    super.reset();
    
    this.__IES = undefined;
    this.__iesUrl = undefined;
    this.__isPublicIES = true;
    this.__contentID = undefined;
    this.__topView = '';
    this.name = [];
    this._iesConfig = undefined;
  }

  public getIO(): SpotPhysicalLight_IO {
    return SpotPhysicalLight_IO.instance();
  }

  public getIesPosition(config: IESConfig): number[] {
    this.attachRealLight();

    const content = this.content!;
    const offset = new THREE.Vector3(0, -Math.abs(content.ZSize / 2), 0);

    if (config.position) {
      offset.x += config.position.x / 100;
      offset.y += config.position.z / 100;
      offset.z += config.position.y / 100;
    }

    this._iesMatrixCache.identity();
    this._iesMatrixCache.compose(
      new THREE.Vector3(content.x, content.z + Math.abs(content.ZSize / 2), -content.y),
      new THREE.Quaternion().setFromEuler(
        new Euler(
          -content.XRotation * Math.PI / 180,
          -content.ZRotation * Math.PI / 180,
          content.YRotation * Math.PI / 180,
          'XZY'
        )
      ),
      new THREE.Vector3(content.XScale, content.ZScale, content.YScale)
    );

    return offset.applyMatrix4(this._iesMatrixCache).toArray();
  }

  public getIesDir(config: IESConfig, normalize: boolean = true): THREE.Vector3 {
    const position = this.getIesPosition(config);
    const direction = new THREE.Vector3(
      this.XTarget - position[0],
      this.ZTarget - position[1],
      -this.YTarget - position[2]
    );

    if (normalize) {
      direction.normalize();
    }

    return direction;
  }

  public getRenderParameters(): RenderParameters {
    const initialIntensity = this.getInitialIntensity();
    let iesRotations: IESRotation[] | undefined;

    if (this.targetEnabled && this.iesConfig) {
      if (this.iesConfig.length === 1) {
        iesRotations = [{
          name: this.iesConfig[0].name,
          targetDir: this.getIesDir(this.iesConfig[0]).toArray()
        }];
      } else {
        Logger.console.warn('Not support multi IES yet.');
      }
    }

    return {
      ...super.getRenderParameters(),
      temperature: this.getTemperature(),
      intensity: this.intensity,
      entityId: this.contentID,
      IES: this.IES,
      iesUrl: this.iesUrl,
      isPublicIES: this.isPublicIES,
      XRotation: this.XRotation,
      YRotation: this.YRotation,
      ZRotation: this.ZRotation,
      close: this.close,
      rgb: this.rgb,
      affectSpecular: this.affectSpecular,
      intensityScale: initialIntensity !== 0 ? this.intensity / initialIntensity : 1,
      iesRotations
    };
  }

  protected refreshBoundInternal(): void {
    const center: Point2D = { x: 0, y: 0 };
    const halfWidth = 0.3;
    const halfHeight = 0.3;

    const bounds = this.boundInternal;
    bounds.reset();

    const position = HSCore.Util.Math.Vec2.fromCoordinate(this);

    const topLeft = HSCore.Util.Math.rotatePointCW(
      center,
      { x: -halfWidth / 2, y: halfHeight / 2 },
      this.ZRotation
    ).add(this);

    const topRight = HSCore.Util.Math.rotatePointCW(
      center,
      { x: halfWidth / 2, y: halfHeight / 2 },
      this.ZRotation
    ).add(this);

    this.outline[0] = topLeft;
    this.outline[1] = topRight;
    this.outline[2] = {
      x: 2 * position.x - topLeft.x,
      y: 2 * position.y - topLeft.y
    };
    this.outline[3] = {
      x: 2 * position.x - topRight.x,
      y: 2 * position.y - topRight.y
    };

    for (let i = 0; i < 4; ++i) {
      bounds.appendPoint(this.outline[i]);
    }
  }

  public updateRotationToTarget(): boolean {
    return false;
  }

  public getBoundingData(): unknown {
    Logger.logger('HSCore.Model.Light').warning(
      'Bounding not support for physical light.'
    );
    return super.getBoundingData();
  }

  protected attachRealLight(): void {
    // Implementation from parent class
  }

  protected getInitialIntensity(): number {
    // Implementation from parent class
    return 1;
  }

  protected getTemperature(): number {
    // Implementation from parent class
    return 6500;
  }

  protected add(entity: Entity): void {
    // Implementation from parent class
  }
}

Entity.registerClass(HSConstants.ModelClass.NgSpotPhysicalLight, SpotPhysicalLight);

export const XRotation = 'XRotation';
export const YRotation = 'YRotation';
export const ZRotation = 'ZRotation';