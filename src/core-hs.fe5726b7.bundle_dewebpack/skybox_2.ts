import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

export enum SkyboxTypeEnum {
  Default = 'default',
  Builtin = 'builtin',
  Custom = 'custom',
  Color = 'color'
}

export enum CustomSkyboxFillMode {
  Clamp = 0,
  Repeat = 1
}

export enum SkyboxMappingType {
  ERP = 0,
  CustomBox = 1
}

const DEFAULT_BG_COLOR = 15329769;

interface SkyboxData {
  rotation?: number;
  intensity: number;
  name?: string;
  bgColor?: number;
  type?: SkyboxTypeEnum;
  label?: string;
  mappingType?: SkyboxMappingType;
  fillMode?: CustomSkyboxFillMode;
  imageWidth?: number;
  imageHeight?: number;
  uvScale?: number;
  localOffsetY?: number;
  texelSize?: number;
}

interface SkyboxConfig {
  type?: SkyboxTypeEnum;
  url?: string;
  name?: string;
  rotation?: number;
  intensity?: number;
  mappingType?: SkyboxMappingType;
  bgColor?: number;
  uvScale?: number;
  fillMode?: CustomSkyboxFillMode;
  imageWidth?: number;
  imageHeight?: number;
  localOffsetY?: number;
  label?: string;
  texelSize?: number;
  enabled?: boolean;
  gridEnable?: boolean;
}

interface Vec2 {
  x: number;
  y: number;
}

interface BaseRenderParameters {
  type: SkyboxTypeEnum;
  name: string;
  intensity: number;
  rotationY: number;
}

interface DefaultRenderParameters extends BaseRenderParameters {
  type: SkyboxTypeEnum.Default;
}

interface ColorRenderParameters extends BaseRenderParameters {
  type: SkyboxTypeEnum.Color;
  bgColor: number[];
}

interface BuiltinRenderParameters extends BaseRenderParameters {
  type: SkyboxTypeEnum.Builtin;
  bgColor: number[];
  mappingType: SkyboxMappingType;
}

interface CustomRenderParameters extends BaseRenderParameters {
  type: SkyboxTypeEnum.Custom;
  label: string;
  uvScale: number;
  localOffsetY: number;
  bgColor: number[];
  fillMode: CustomSkyboxFillMode;
  texelSize: number;
  mappingType: SkyboxMappingType;
  uvScaleX: number;
  uvScaleY: number;
  uvOffsetX: number;
  uvOffsetY: number;
}

type RenderParameters = DefaultRenderParameters | ColorRenderParameters | BuiltinRenderParameters | CustomRenderParameters;

export class Skybox_IO extends Entity_IO {
  dump(entity: Skybox, callback?: (data: any, entity: Skybox) => void, includeDefaults: boolean = true, options: Record<string, unknown> = {}): any {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const data = result[0];

    if (entity.rotation) {
      data.rotation = entity.rotation;
    }

    data.intensity = entity.intensity;

    if (entity.name) {
      data.name = entity.name;
    }

    if (entity.bgColor) {
      data.bgColor = entity.bgColor;
    }

    if (entity.type) {
      data.type = entity.type === SkyboxTypeEnum.Custom ? entity.type : SkyboxTypeEnum.Builtin;
    }

    if (entity.label) {
      data.label = entity.type === SkyboxTypeEnum.Custom ? entity.label : '';
    }

    if (entity.mappingType) {
      data.mappingType = entity.mappingType;
    }

    if (entity.fillMode) {
      data.fillMode = entity.fillMode;
    }

    if (entity.imageWidth) {
      data.imageWidth = entity.imageWidth;
    }

    if (entity.imageHeight) {
      data.imageHeight = entity.imageHeight;
    }

    if (entity.uvScale) {
      data.uvScale = entity.uvScale;
    }

    if (entity.localOffsetY) {
      data.localOffsetY = entity.localOffsetY;
    }

    if (entity.texelSize) {
      data.texelSize = entity.texelSize;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Skybox, data: SkyboxData, options?: unknown): void {
    super.load(entity, data, options);

    const skybox = entity as any;
    skybox.__rotation = data.rotation || 0;
    skybox.__intensity = data.intensity;
    skybox.__name = data.name || '';
    skybox.__type = data.type || SkyboxTypeEnum.Builtin;
    skybox.__bgColor = data.bgColor || DEFAULT_BG_COLOR;
    skybox.__fillMode = data.fillMode || CustomSkyboxFillMode.Repeat;
    skybox.__imageWidth = data.imageWidth || 0;
    skybox.__imageHeight = data.imageHeight || 0;
    skybox.__label = data.label || '';
    skybox.__uvScale = data.uvScale || 1;
    skybox.__localOffsetY = data.localOffsetY || 0;
    skybox.__texelSize = data.texelSize || 1024;
  }
}

export class Skybox extends Entity {
  private __enabled: boolean = false;
  private __type: SkyboxTypeEnum = SkyboxTypeEnum.Default;
  private __mappingType: SkyboxMappingType = SkyboxMappingType.ERP;
  private __name: string = '';
  private __label: string = '';
  private __url: string = '';
  private __rotation: number = 0;
  private __indensity: number = 1;
  private __bgColor: number = DEFAULT_BG_COLOR;
  private __imageWidth: number = 0;
  private __imageHeight: number = 0;
  private __uvScale: number = 1;
  private __localOffsetY: number = 0;
  private __texelSize: number = 1024;
  private __fillMode: CustomSkyboxFillMode = CustomSkyboxFillMode.Repeat;
  private __gridEnable: boolean = true;

  initialSet: boolean = false;
  signalEnabledChanged: Signal<this>;

  @EntityField()
  enabled!: boolean;

  @EntityField()
  type!: SkyboxTypeEnum;

  @EntityField()
  mappingType!: SkyboxMappingType;

  @EntityField()
  name!: string;

  @EntityField()
  label!: string;

  @EntityField()
  url!: string;

  @EntityField()
  rotation!: number;

  @EntityField()
  intensity!: number;

  @EntityField()
  bgColor!: number;

  @EntityField()
  imageWidth!: number;

  @EntityField()
  imageHeight!: number;

  @EntityField()
  uvScale!: number;

  @EntityField()
  localOffsetY!: number;

  @EntityField()
  texelSize!: number;

  @EntityField()
  fillMode!: CustomSkyboxFillMode;

  @EntityField()
  gridEnable!: boolean;

  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
    this.signalEnabledChanged = new Signal(this);
    this.reset();
  }

  static create(): Skybox {
    return new Skybox();
  }

  destroy(): void {
    if (!this._disposed) {
      this.signalEnabledChanged.dispose();
      (this.signalEnabledChanged as any) = undefined;
      super.destroy();
    }
  }

  reset(): void {
    this.type = SkyboxTypeEnum.Default;
    this.mappingType = SkyboxMappingType.ERP;
    this.name = '';
    this.label = '';
    this.url = '';
    this.rotation = 0;
    this.intensity = 1;
    this.bgColor = DEFAULT_BG_COLOR;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.fillMode = CustomSkyboxFillMode.Repeat;
    this.localOffsetY = 0;
    this.texelSize = 1024;
    this.uvScale = 1;
    this.enabled = false;
    this.gridEnable = true;
  }

  set(config: SkyboxConfig): void {
    this.type = config.type !== undefined ? config.type : this.type;
    this.url = config.url !== undefined ? config.url : this.url;
    this.name = config.name !== undefined ? config.name : this.name;
    this.rotation = config.rotation !== undefined ? config.rotation : this.rotation;
    this.intensity = config.intensity !== undefined ? config.intensity : this.intensity;
    this.mappingType = config.mappingType !== undefined ? config.mappingType : (this.type === SkyboxTypeEnum.Custom ? SkyboxMappingType.CustomBox : SkyboxMappingType.ERP);
    this.bgColor = config.bgColor !== undefined ? config.bgColor : this.bgColor;
    this.uvScale = config.uvScale !== undefined ? config.uvScale : this.uvScale;
    this.fillMode = config.fillMode !== undefined ? config.fillMode : this.fillMode;
    this.imageWidth = config.imageWidth !== undefined ? config.imageWidth : this.imageWidth;
    this.imageHeight = config.imageHeight !== undefined ? config.imageHeight : this.imageHeight;
    this.localOffsetY = config.localOffsetY !== undefined ? config.localOffsetY : this.localOffsetY;
    this.label = config.label !== undefined ? config.label : this.label;
    this.texelSize = config.texelSize !== undefined ? config.texelSize : this.texelSize;
    this.enabled = config.enabled !== undefined ? config.enabled : this.enabled;
    this.gridEnable = config.gridEnable !== undefined ? config.gridEnable : this.gridEnable;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setImageSize(width: number, height: number): void {
    this.imageWidth = width;
    this.imageHeight = height;
  }

  getUVScale(): Vec2 {
    if (this.imageWidth === 0 || this.imageHeight === 0 || this.uvScale === 0) {
      return { x: 1, y: 1 };
    }

    const scaleX = this.texelSize / this.imageWidth;
    const scaleY = this.texelSize / this.imageHeight;
    const result = { x: 1, y: 1 };
    const minScale = scaleX < scaleY ? scaleX : scaleY;

    result.x = minScale;
    result.y = minScale * this.imageWidth / this.imageHeight;

    return { x: result.x / this.uvScale, y: result.y / this.uvScale };
  }

  getUVOffset(): Vec2 {
    if (this.imageWidth === 0 || this.imageHeight === 0 || this.uvScale === 0) {
      return { x: 0, y: 0 };
    }

    const scale = this.getUVScale();
    const offsetY = this.localOffsetY / scale.y;

    return {
      x: (1 - 1 / scale.x) / 2,
      y: (1 - 1 / scale.y) / 2 + offsetY
    };
  }

  getIO(): Skybox_IO {
    return Skybox_IO.instance() as Skybox_IO;
  }

  verify(): boolean {
    return true;
  }

  static getSkyboxColor3FromRGB255(rgb: number): number[] {
    const result = [233, 233, 233];
    result[0] = rgb >> 16;
    result[1] = (rgb >> 8) - (result[0] << 8);
    result[2] = rgb - (result[0] << 16) - (result[1] << 8);
    return result;
  }

  getRenderParameters(useBlack: boolean): RenderParameters {
    const bgColorArray = Skybox.getSkyboxColor3FromRGB255(this.bgColor);
    let parameters: RenderParameters;

    switch (this.type) {
      case SkyboxTypeEnum.Default:
        parameters = {
          type: SkyboxTypeEnum.Default,
          name: useBlack ? 'nooutdoor_black' : 'nooutdoor',
          intensity: 1,
          rotationY: 0
        };
        break;

      case SkyboxTypeEnum.Color:
        parameters = {
          type: SkyboxTypeEnum.Color,
          name: 'nooutdoor',
          bgColor: bgColorArray,
          intensity: 1,
          rotationY: 0
        };
        break;

      case SkyboxTypeEnum.Builtin:
        parameters = {
          type: SkyboxTypeEnum.Builtin,
          name: this.name,
          intensity: this.intensity,
          rotationY: this.rotation,
          bgColor: bgColorArray,
          mappingType: SkyboxMappingType.ERP
        };
        break;

      case SkyboxTypeEnum.Custom:
        const uvScale = this.getUVScale();
        const uvOffset = this.getUVOffset();
        parameters = {
          type: SkyboxTypeEnum.Custom,
          name: this.name,
          label: this.label,
          intensity: this.intensity,
          rotationY: this.rotation,
          uvScale: this.uvScale,
          localOffsetY: this.localOffsetY,
          bgColor: bgColorArray,
          fillMode: this.fillMode,
          texelSize: this.texelSize,
          mappingType: SkyboxMappingType.CustomBox,
          uvScaleX: uvScale.x,
          uvScaleY: uvScale.y,
          uvOffsetX: uvOffset.x,
          uvOffsetY: uvOffset.y
        };
        break;

      default:
        Logger.console.error('Unknown skybox type: ' + this.type);
        parameters = {
          type: SkyboxTypeEnum.Default,
          name: 'nooutdoor',
          intensity: 1,
          rotationY: 0
        };
    }

    return parameters;
  }
}

Entity.registerClass(HSConstants.ModelClass.Skybox, Skybox);