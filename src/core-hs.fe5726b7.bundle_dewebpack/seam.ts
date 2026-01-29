import { ColorModeEnum } from './ColorModeEnum';
import { MaterialData } from './MaterialData';
import { nearlyEquals } from './nearlyEquals';
import { Util } from './Util';

interface SeamData {
  width?: number;
  material?: {
    blendColor?: number[];
    color?: number[];
    normalTexture?: string;
    textureURI?: string;
    seekId?: string;
    colorMode?: ColorModeEnum;
  };
}

interface SeamDump {
  width: number;
  material: {
    blendColor?: number[];
    color?: number[];
    normalTexture?: string;
    textureURI?: string;
    seekId?: string;
    colorMode: ColorModeEnum;
  };
}

interface SeamForFGI {
  seekId?: string;
  seamWidth: number;
  normalTexture?: string;
  textureURI?: string;
  color?: number[];
  colorMode: ColorModeEnum;
  tileSize_x: number;
  tileSize_y: number;
  normalTileSize_x: number;
  normalTileSize_y: number;
  hashKey: string;
}

export class Seam {
  private _width?: number;
  private _material: MaterialData;

  constructor(data?: SeamData) {
    this._material = new MaterialData();
    this._setFrom(data);
  }

  static create(data?: SeamData): Seam {
    const seam = new Seam();
    if (data) {
      seam._width = data.width;
      seam._material = MaterialData.create(data.material);
    }
    return seam;
  }

  dump(): SeamDump {
    return {
      width: this.width,
      material: {
        blendColor: this.blendColor,
        color: this.color,
        normalTexture: this.normalTexture,
        textureURI: this.textureURI,
        seekId: this.seekId,
        colorMode: this.colorMode
      }
    };
  }

  get width(): number {
    return this._width ?? 0;
  }

  get blendColor(): number[] | undefined {
    return this._material.blendColor;
  }

  get color(): number[] | undefined {
    return this._material.color;
  }

  get normalTexture(): string | undefined {
    return this._material.normalTexture;
  }

  get textureURI(): string | undefined {
    return this._material.textureURI;
  }

  get seekId(): string | undefined {
    return this._material.seekId;
  }

  get colorMode(): ColorModeEnum {
    return this._material.colorMode ?? ColorModeEnum.texture;
  }

  get colorString(): string | undefined {
    return Util.convertColorToString(this.color);
  }

  get useColor(): boolean {
    return this.colorMode === ColorModeEnum.color;
  }

  get useTexture(): boolean {
    return this.colorMode === ColorModeEnum.texture;
  }

  get useBlend(): boolean {
    return this.colorMode === ColorModeEnum.blend;
  }

  get material(): MaterialData {
    return this._material;
  }

  getArgs(): SeamDump {
    return this.dump();
  }

  clone(data?: SeamData): Seam {
    const cloned = new Seam(this);
    if (data) {
      cloned._setFrom(data);
    }
    return cloned;
  }

  equals(other: SeamData): boolean {
    if (!nearlyEquals(this.width, other.width ?? 0)) {
      return false;
    }
    const otherMaterial = MaterialData.create(other.material);
    return this._material.equals(otherMaterial);
  }

  hashKey(): string {
    return JSON.stringify(this.dump());
  }

  getSeamForFGI(): SeamForFGI {
    return {
      seekId: this.seekId,
      seamWidth: this.width,
      normalTexture: this.normalTexture,
      textureURI: this.textureURI,
      color: this.color,
      colorMode: this.colorMode,
      tileSize_x: this.width / 2,
      tileSize_y: 1,
      normalTileSize_x: this.width / 2,
      normalTileSize_y: this.width / 2,
      hashKey: this.hashKey()
    };
  }

  imageSrc(): string | undefined {
    const { colorMode } = this;
    switch (colorMode) {
      case ColorModeEnum.texture:
        return this.textureURI;
      case ColorModeEnum.color:
        return this.colorString ? `#${this.colorString}` : undefined;
      default:
        return undefined;
    }
  }

  isEmpty(): boolean {
    const { colorMode } = this;
    switch (colorMode) {
      case ColorModeEnum.texture:
        return this.textureURI === undefined;
      case ColorModeEnum.color:
        return this.color === undefined;
      case ColorModeEnum.blend:
        return this.blendColor === undefined;
      default:
        return true;
    }
  }

  private _setFrom(data?: SeamData): void {
    if (data) {
      if (data.width !== undefined) {
        this._width = data.width;
      }
      if (data.material !== undefined) {
        this._material = MaterialData.create(data.material);
      }
    }
  }
}