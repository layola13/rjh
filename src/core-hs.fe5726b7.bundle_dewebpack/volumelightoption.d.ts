/**
 * Configuration options for volumetric lighting effects.
 * Controls density and scattering properties of light volumes in 3D scenes.
 */
export declare class VolumeLightOption {
  /**
   * Whether volumetric lighting is enabled.
   */
  enable: boolean;

  /**
   * The density of the volume light effect.
   * Higher values create thicker, more opaque light volumes.
   * @default 1
   */
  density: number;

  /**
   * Multiplier for light scattering intensity within the volume.
   * Controls how much light is scattered as it passes through the volume.
   * @default 2
   */
  scatteringMultiplier: number;

  /**
   * Creates a new VolumeLightOption instance.
   * 
   * @param enable - Whether to enable volumetric lighting. Defaults to false.
   * @param density - The density of the volume light. Defaults to 1.
   * @param scatteringMultiplier - The scattering intensity multiplier. Defaults to 2.
   */
  constructor(enable?: boolean, density?: number, scatteringMultiplier?: number);

  /**
   * Serializes the current configuration to a plain object.
   * 
   * @returns A plain object containing all configuration properties.
   */
  dump(): {
    enable: boolean;
    density: number;
    scatteringMultiplier: number;
  };

  /**
   * Loads configuration from a plain object.
   * 
   * @param data - Object containing volume light configuration properties.
   */
  load(data: {
    enable: boolean;
    density: number;
    scatteringMultiplier?: number;
  }): void;

  /**
   * Creates a deep copy of this VolumeLightOption instance.
   * 
   * @returns A new VolumeLightOption with identical properties.
   */
  clone(): VolumeLightOption;
}