import type { SpotLight, SpotLight_IO } from './SpotLight';
import type { LightTypeEnum } from './LightTypeEnum';
import type { Entity } from './Entity';

/**
 * Serialization/deserialization handler for AttenuatedSpotLight entities.
 * Extends SpotLight_IO to handle additional attenuation and angle properties.
 */
export declare class AttenuatedSpotLight_IO extends SpotLight_IO {
  /**
   * Serializes an AttenuatedSpotLight instance to a plain object.
   * @param entity - The AttenuatedSpotLight entity to serialize
   * @param callback - Optional callback to modify the serialized data
   * @param includeDefaults - Whether to include default values in the output
   * @param options - Additional serialization options
   * @returns Serialized representation of the entity
   */
  dump(
    entity: AttenuatedSpotLight,
    callback?: (result: any, entity: AttenuatedSpotLight) => void,
    includeDefaults?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserializes a plain object into an AttenuatedSpotLight instance.
   * @param entity - The target AttenuatedSpotLight entity to populate
   * @param data - The serialized data to load from
   * @param options - Additional deserialization options
   */
  load(
    entity: AttenuatedSpotLight,
    data: AttenuatedSpotLightData,
    options?: Record<string, any>
  ): void;
}

/**
 * Serialized data structure for AttenuatedSpotLight.
 */
export interface AttenuatedSpotLightData {
  /** IES light profile identifier */
  IES?: string;
  /** Near attenuation start distance */
  nearAttenuationStart: number;
  /** Near attenuation end distance */
  nearAttenuationEnd: number;
  /** Far attenuation start distance */
  farAttenuationStart: number;
  /** Far attenuation end distance */
  farAttenuationEnd: number;
  /** Hotspot cone angle in degrees */
  hotspotAngle: number;
  /** Falloff cone angle in degrees */
  falloffAngle: number;
}

/**
 * Render parameters for AttenuatedSpotLight, including all attenuation and angle settings.
 */
export interface AttenuatedSpotLightRenderParameters {
  /** Near attenuation start distance */
  nearAttenuationStart: number;
  /** Near attenuation end distance */
  nearAttenuationEnd: number;
  /** Far attenuation start distance */
  farAttenuationStart: number;
  /** Far attenuation end distance */
  farAttenuationEnd: number;
  /** Hotspot cone angle in degrees */
  hotspotAngle: number;
  /** Falloff cone angle in degrees */
  falloffAngle: number;
}

/**
 * Spotlight with distance-based attenuation and configurable cone angles.
 * Supports IES light profiles and near/far attenuation ranges.
 */
export declare class AttenuatedSpotLight extends SpotLight {
  /** Minimum valid value for attenuation range parameters */
  static readonly RangeMin: 0;
  /** Maximum valid value for attenuation range parameters */
  static readonly RangeMax: 5;
  /** Default near attenuation start distance */
  static readonly DefaultNearStart: 0;
  /** Default near attenuation end distance */
  static readonly DefaultNearEnd: 0.5;
  /** Default far attenuation start distance */
  static readonly DefaultFarStart: 2;
  /** Default far attenuation end distance */
  static readonly DefaultFarEnd: 3;
  /** Minimum valid angle in degrees */
  static readonly AngleMin: 0;
  /** Maximum valid angle in degrees */
  static readonly AngleMax: 179;
  /** Default hotspot angle in degrees */
  static readonly DefaultHotspot: 45;
  /** Default falloff angle in degrees */
  static readonly DefaultFallOff: 72;

  /** Distance where near attenuation begins */
  nearAttenuationStart: number;
  /** Distance where near attenuation completes */
  nearAttenuationEnd: number;
  /** Distance where far attenuation begins */
  farAttenuationStart: number;
  /** Distance where far attenuation completes */
  farAttenuationEnd: number;
  /** Inner cone angle (full intensity) in degrees */
  hotspotAngle: number;
  /** Outer cone angle (zero intensity) in degrees */
  falloffAngle: number;
  /** Light type identifier */
  type: LightTypeEnum.AttenuatedSpotLight;

  /**
   * Creates a new AttenuatedSpotLight instance.
   * @param name - Optional name for the light entity
   * @param scene - Optional parent scene
   */
  constructor(name?: string, scene?: any);

  /**
   * Factory method to create and initialize an AttenuatedSpotLight.
   * @returns A new AttenuatedSpotLight instance with default values
   */
  static create(): AttenuatedSpotLight;

  /**
   * Resets all properties to their default values.
   */
  reset(): void;

  /**
   * Gets the IO handler for serialization/deserialization.
   * @returns The AttenuatedSpotLight_IO singleton instance
   */
  getIO(): AttenuatedSpotLight_IO;

  /**
   * Retrieves all parameters needed for rendering this light.
   * @returns Combined render parameters including attenuation and angles
   */
  getRenderParameters(): AttenuatedSpotLightRenderParameters;

  /**
   * Handles field change notifications.
   * @param fieldName - Name of the changed field
   * @param newValue - New value of the field
   * @param oldValue - Previous value of the field
   */
  onFieldChanged(fieldName: string, newValue: any, oldValue: any): void;
}