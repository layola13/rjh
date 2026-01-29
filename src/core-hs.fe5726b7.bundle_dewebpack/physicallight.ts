import { Light_IO, Light, LightTypeEnum } from './Light';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

interface PhysicalLightData {
  name: string[];
  contentID?: string;
  topView: string;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  entityId?: string;
  close: boolean;
  rgb: number[];
  affectSpecular: boolean;
  intensityScale: number;
}

export class PhysicalLight_IO extends Light_IO {
  private static _instance: PhysicalLight_IO;

  public static instance(): PhysicalLight_IO {
    if (!PhysicalLight_IO._instance) {
      PhysicalLight_IO._instance = new PhysicalLight_IO();
    }
    return PhysicalLight_IO._instance;
  }

  public dump(
    entity: PhysicalLight,
    callback?: (result: unknown[], entity: PhysicalLight) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const data = result[0] as PhysicalLightData;
    
    data.name = entity.name;
    data.contentID = entity.contentID;
    data.topView = entity.topView;
    
    callback?.(result, entity);
    
    return result;
  }

  public load(
    entity: PhysicalLight,
    data: PhysicalLightData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    entity.name = data.name;
    (entity as any).__contentID = data.contentID;
    (entity as any).__topView = data.topView;
  }
}

export class PhysicalLight extends Light {
  @EntityField()
  public topView: string = '';

  public name: string[] = [];
  public contentID?: string;
  public content?: { bound: unknown };
  public intensity: number = 0;
  public close: boolean = false;
  public rgb: number[] = [255, 255, 255];
  public affectSpecular: boolean = true;

  constructor(name: string = '', parent?: unknown) {
    super(name, parent);
    this.type = LightTypeEnum.PhysicalLight;
  }

  public static create(): PhysicalLight {
    const light = new PhysicalLight();
    light.reset();
    return light;
  }

  public isVirtual(): boolean {
    return false;
  }

  public hasAreaSize(): boolean {
    return true;
  }

  public reset(): void {
    super.reset();
    this.contentID = undefined;
    this.topView = '';
    this.name = [];
  }

  public getIO(): PhysicalLight_IO {
    return PhysicalLight_IO.instance();
  }

  protected refreshBoundInternal(): void {
    if (this.content) {
      this.boundInternal.copy(this.content.bound);
    } else {
      super.refreshBoundInternal();
    }
  }

  public getRenderParameters(): RenderParameters {
    const params = super.getRenderParameters() as RenderParameters;
    
    params.temperature = this.getTemperature();
    params.intensity = this.intensity;
    params.entityId = this.contentID;
    params.close = this.close;
    params.rgb = this.rgb;
    params.affectSpecular = this.affectSpecular;
    
    const initialIntensity = this.getInitialIntensity();
    params.intensityScale = initialIntensity !== 0 ? this.intensity / initialIntensity : 1;
    
    return params;
  }

  public getBoundingData(): unknown {
    Logger.logger('HSCore.Model.Light').warning('Bounding not support for physical light.');
    return super.getBoundingData();
  }

  protected getTemperature(): number {
    return 0;
  }

  protected getInitialIntensity(): number {
    return 0;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPhysicalLight, PhysicalLight);