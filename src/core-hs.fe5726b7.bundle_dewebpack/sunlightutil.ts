export interface SunlightOption {
  sunlight?: boolean;
  autoPosition?: boolean;
  temperature?: number;
  intensity: number;
  intensityFactor?: number;
  sizeMultiplier: number;
  sizeMultiplierFactor?: number;
  heightAngle: number;
  horizontalAngle: number;
  volumeLight?: boolean;
}

export interface SunlightExportFormat {
  sunlight: boolean;
  autoPosition?: boolean;
  temperature?: number;
  intensity?: number;
  sizeMultiplier?: number;
  heightAngle?: number;
  horizontalAngle?: number;
  volumeLight?: boolean;
}

export const DefaultSunlightOptions: SunlightOption = new HSCore.Model.SunlightOption.Params();

const TEMPERATURE_SUNLIGHT_PRESETS: Record<string, Partial<SunlightOption>> = {
  [HSConstants.Render.TEMPERATURE_NAME.NATURE_3]: {
    intensity: 0.1
  },
  [HSConstants.Render.TEMPERATURE_NAME.REALISTIC]: {
    intensity: 0.04
  },
  [HSConstants.Render.TEMPERATURE_NAME.CHILLY_3]: {
    intensity: 0.1
  },
  [HSConstants.Render.TEMPERATURE_NAME.OUTDOOR]: {
    intensity: 0.1
  },
  [HSConstants.Render.TEMPERATURE_NAME.NIGHT]: {
    sunlight: false,
    intensity: 0
  },
  [HSConstants.Render.TEMPERATURE_NAME.NIGHT_WARM]: {
    sunlight: false,
    intensity: 0
  },
  [HSConstants.Render.TEMPERATURE_NAME.NIGHT_WARMWHITE]: {
    sunlight: false,
    intensity: 0
  },
  [HSConstants.Render.TEMPERATURE_NAME.NIGHT_CHILLY]: {
    sunlight: false,
    intensity: 0
  },
  [HSConstants.Render.TEMPERATURE_NAME.NIGHT_COLD]: {
    sunlight: false,
    intensity: 0
  }
};

const HDR_SUNLIGHT_PRESETS: Record<string, Partial<SunlightOption>> = {
  eilenriede_park: {
    intensity: 0.02,
    sizeMultiplier: 30,
    heightAngle: 0.6109,
    horizontalAngle: 3.0892
  },
  bergen: {
    intensity: 0.025,
    sizeMultiplier: 6,
    heightAngle: 0.6981,
    horizontalAngle: 0.6283
  },
  o_city_park: {
    intensity: 0.015,
    sizeMultiplier: 6,
    heightAngle: 0.7854,
    horizontalAngle: -1.9199
  },
  lilienstein: {
    intensity: 0.025,
    sizeMultiplier: 15,
    heightAngle: 0.6981,
    horizontalAngle: 0.6283
  },
  felsenlabyrinth: {
    intensity: 0.02,
    sizeMultiplier: 20,
    heightAngle: 0.6981,
    horizontalAngle: 0.6283
  },
  o_sea_sky: {
    intensity: 0.03,
    sizeMultiplier: 6,
    heightAngle: 0.6981,
    horizontalAngle: -1.9199
  },
  red_hill_curve: {
    intensity: 0.025,
    sizeMultiplier: 10,
    heightAngle: 0.6981,
    horizontalAngle: 0.3316
  },
  railway_bridges: {
    intensity: 0.025,
    sizeMultiplier: 15,
    heightAngle: 0.4363,
    horizontalAngle: 0.6283
  },
  qwantani: {
    intensity: 0.02,
    sizeMultiplier: 8,
    heightAngle: 0.6981,
    horizontalAngle: 0.6283
  },
  hilltop: {
    intensity: 0.016,
    sizeMultiplier: 6,
    heightAngle: 0.78539,
    horizontalAngle: 3.0281
  },
  rustig: {
    intensity: 0.2,
    sizeMultiplier: 6,
    heightAngle: 0.6981,
    horizontalAngle: 0.6109
  },
  o_blank: {
    intensity: 0.2,
    sizeMultiplier: 8,
    heightAngle: 0.6981,
    horizontalAngle: 0.6109
  }
};

export class SunlightUtil {
  /**
   * Convert sunlight options to export format
   */
  static getSunlightOptionInExportFormat(option: SunlightOption): SunlightExportFormat {
    if (option.sunlight === false) {
      return {
        sunlight: option.sunlight
      };
    }

    const intensityFactor = option.intensityFactor ?? 1;
    const sizeMultiplierFactor = option.sizeMultiplierFactor ?? 1;

    return {
      sunlight: option.sunlight ?? true,
      autoPosition: option.autoPosition,
      temperature: option.temperature,
      intensity: option.intensity * intensityFactor,
      sizeMultiplier: Math.round(option.sizeMultiplier * sizeMultiplierFactor),
      heightAngle: option.heightAngle,
      horizontalAngle: option.horizontalAngle,
      volumeLight: !!option.volumeLight
    };
  }

  /**
   * Set or update sunlight preset for a specific temperature
   */
  static setTemplateSunlight(temperatureName: string, options: Partial<SunlightOption>): void {
    const currentPreset = TEMPERATURE_SUNLIGHT_PRESETS[temperatureName] ?? DefaultSunlightOptions;
    TEMPERATURE_SUNLIGHT_PRESETS[temperatureName] = {
      ...currentPreset,
      ...options
    };
  }

  /**
   * Set or update sunlight preset for a specific HDR environment
   */
  static setHdrSunlight(hdrName: string, options: Partial<SunlightOption>): void {
    const currentPreset = HDR_SUNLIGHT_PRESETS[hdrName] ?? DefaultSunlightOptions;
    HDR_SUNLIGHT_PRESETS[hdrName] = {
      ...currentPreset,
      ...options
    };
  }

  /**
   * Get default sunlight configuration based on temperature and HDR presets
   */
  static getDefaultSunlight(temperatureName?: string, hdrName?: string): SunlightOption {
    let result: SunlightOption = { ...DefaultSunlightOptions };

    if (temperatureName && TEMPERATURE_SUNLIGHT_PRESETS[temperatureName]) {
      result = {
        ...result,
        ...TEMPERATURE_SUNLIGHT_PRESETS[temperatureName]
      };
    }

    if (hdrName && HDR_SUNLIGHT_PRESETS[hdrName]) {
      result = {
        ...result,
        ...HDR_SUNLIGHT_PRESETS[hdrName]
      };
    }

    return result;
  }
}