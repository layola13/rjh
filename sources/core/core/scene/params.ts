export class Params {
  sunlight: boolean;
  autoPosition: boolean;
  temperature: number;
  intensity: number;
  intensityFactor: number;
  sizeMultiplier: number;
  sizeMultiplierFactor: number;
  volumeLight: boolean;
  heightAngle: number;
  horizontalAngle: number;

  constructor() {
    this.sunlight = true;
    this.autoPosition = true;
    this.temperature = 6500;
    this.intensity = 0.04;
    this.intensityFactor = 1;
    this.sizeMultiplier = 6;
    this.sizeMultiplierFactor = 1;
    this.volumeLight = false;
    this.heightAngle = 0.6109;
    this.horizontalAngle = 0.5236;
  }
}