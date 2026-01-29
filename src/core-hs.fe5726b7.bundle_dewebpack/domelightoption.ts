export interface DomeLightConfig {
  brightness: number;
  reflection: number;
  toneIndex: number;
  toneTemperature: number;
}

export interface VrayLightConfig {
  intensity: number;
  textureTemperature: number;
  affectSpecular: boolean;
  affectDiffuse: boolean;
  textureType: 'diffuse' | 'specular';
}

export class DomeLightOption {
  static readonly TemperatureMap: ReadonlyArray<number> = [
    6500,
    3800,
    5300,
    6500,
    8700,
    11400
  ];

  private brightness: number;
  private reflection: number;
  private toneIndex: number;
  private toneTemperature: number;

  constructor() {
    this.brightness = 1;
    this.reflection = 1;
    this.toneIndex = 3;
    this.toneTemperature = 6500;
  }

  set(
    brightness: number = 1,
    reflection: number = 1,
    toneIndex: number = 3,
    toneTemperature: number = 6500
  ): void {
    this.brightness = brightness;
    this.reflection = reflection;
    this.toneIndex = toneIndex;
    this.toneTemperature = toneTemperature;
  }

  get(): DomeLightConfig {
    return {
      brightness: this.brightness,
      reflection: this.reflection,
      toneIndex: this.toneIndex,
      toneTemperature: this.toneTemperature
    };
  }

  reset(): void {
    this.brightness = 1;
    this.reflection = 1;
    this.toneIndex = 3;
    this.toneTemperature = 6500;
  }

  getVrayLightOption(): [VrayLightConfig, VrayLightConfig] {
    const temperature = this.toneTemperature;
    
    return [
      {
        intensity: this.brightness,
        textureTemperature: temperature,
        affectSpecular: false,
        affectDiffuse: true,
        textureType: 'diffuse'
      },
      {
        intensity: this.reflection,
        textureTemperature: temperature,
        affectSpecular: true,
        affectDiffuse: false,
        textureType: 'specular'
      }
    ];
  }
}