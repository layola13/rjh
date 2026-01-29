enum SkyboxTypeEnum {
  Default = 'default',
  Custom = 'custom',
  Builtin = 'builtin'
}

enum SkyboxMappingType {
  CustomBox = 'customBox',
  ERP = 'erp'
}

enum SkyboxFillMode {
  Stretch = 'stretch',
  Fit = 'fit',
  Fill = 'fill'
}

interface Vector2 {
  x: number;
  y: number;
}

interface SkyboxInput {
  type: SkyboxTypeEnum;
  name: string;
  label?: string;
  intensity: number;
  rotation: number;
  uvScale: number;
  localOffsetY: number;
  bgColor: number;
  fillMode: SkyboxFillMode;
  texelSize: number;
  mappingType?: SkyboxMappingType;
  getUVScale: () => Vector2;
  getUVOffset: () => Vector2;
}

interface SkyboxData {
  type: SkyboxTypeEnum;
  name: string;
  label?: string;
  intensity: number;
  rotationY: number;
  uvScale?: number;
  localOffsetY?: number;
  bgColor?: [number, number, number];
  fillMode?: SkyboxFillMode;
  texelSize?: number;
  mappingType?: SkyboxMappingType;
  uvScaleX?: number;
  uvScaleY?: number;
  uvOffsetX?: number;
  uvOffsetY?: number;
}

export class Skybox {
  /**
   * Get default skybox configuration data
   * @param useBlackVariant - Whether to use the black outdoor variant
   * @returns Default skybox data object
   */
  static getDefaultSkyboxData(useBlackVariant: boolean): SkyboxData {
    const name = useBlackVariant ? 'nooutdoor_black' : 'nooutdoor';
    return {
      type: SkyboxTypeEnum.Default,
      name,
      intensity: 1,
      rotationY: 0
    };
  }

  /**
   * Convert RGB255 color integer to RGB color array with values 0-255
   * @param rgb255 - RGB color as a single integer (e.g., 0xE9E9E9)
   * @returns RGB color as array [r, g, b]
   */
  static getSkyboxColor3FromRGB255(rgb255: number): [number, number, number] {
    const color: [number, number, number] = [233, 233, 233];
    color[0] = rgb255 >> 16;
    color[1] = (rgb255 >> 8) - (color[0] << 8);
    color[2] = rgb255 - (color[0] << 16) - (color[1] << 8);
    return color;
  }

  /**
   * Extract and transform skybox data from input configuration
   * @param input - Source skybox configuration object
   * @returns Processed skybox data
   */
  static getSkyboxData(input: SkyboxInput): SkyboxData {
    const isCustomType = input.type === SkyboxTypeEnum.Custom;
    const type = isCustomType ? SkyboxTypeEnum.Custom : SkyboxTypeEnum.Builtin;
    const bgColor = this.getSkyboxColor3FromRGB255(input.bgColor);
    const mappingType = input.mappingType !== undefined
      ? input.mappingType
      : isCustomType
        ? SkyboxMappingType.CustomBox
        : SkyboxMappingType.ERP;
    const uvScale = input.getUVScale();
    const uvOffset = input.getUVOffset();

    return {
      type,
      name: input.name,
      label: isCustomType ? input.label : '',
      intensity: input.intensity,
      rotationY: input.rotation,
      uvScale: input.uvScale,
      localOffsetY: input.localOffsetY,
      bgColor,
      fillMode: input.fillMode,
      texelSize: input.texelSize,
      mappingType,
      uvScaleX: uvScale.x,
      uvScaleY: uvScale.y,
      uvOffsetX: uvOffset.x,
      uvOffsetY: uvOffset.y
    };
  }
}