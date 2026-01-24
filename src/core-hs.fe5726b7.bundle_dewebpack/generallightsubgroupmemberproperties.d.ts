/**
 * Utility classes for managing light sub-group member properties and comparison operations.
 * Provides type definitions for various light types including point, spot, mesh, physical, and area lights.
 * 
 * @module GeneralLightSubGroupMemberProperties
 */

/**
 * Base class representing general light sub-group member properties.
 * Contains common light attributes that can be enabled or disabled for sub-group members.
 */
export declare class GeneralLightSubGroupMemberProperties {
  /** Z-axis position or depth property */
  z: boolean;
  
  /** Light closure/occlusion property */
  close: boolean;
  
  /** Whether the light affects specular reflections */
  affectSpecular: boolean;
  
  /** Light intensity property */
  intensity: boolean;
  
  /** Light rotation property */
  rotation: boolean;
  
  /** Color temperature property (in Kelvin) */
  temperature: boolean;
  
  /** RGB color property */
  rgb: boolean;
  
  /** Volumetric light property (for fog/atmosphere effects) */
  volumeLight: boolean;

  constructor();
}

/**
 * Properties specific to point light sources in a sub-group.
 * Extends general light properties with radius control.
 */
export declare class PointLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  /** Light source radius/size */
  radius: boolean;

  constructor();
}

/**
 * Properties specific to mesh light sources in a sub-group.
 * Mesh lights emit light from geometry surfaces.
 */
export declare class MeshLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  constructor();
}

/**
 * Properties specific to physical light sources in a sub-group.
 * Physical lights simulate real-world lighting behavior.
 */
export declare class PhysicalLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  constructor();
}

/**
 * Properties specific to spot light sources in a sub-group.
 * Includes directional rotation controls and IES profile support.
 */
export declare class SpotLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  /** Rotation around X-axis */
  XRotation: boolean;
  
  /** Rotation around Y-axis */
  YRotation: boolean;
  
  /** Rotation around Z-axis */
  ZRotation: boolean;
  
  /** IES light profile (Illuminating Engineering Society photometric data) */
  IES: boolean;

  constructor();
}

/**
 * Properties specific to physically-based spot light sources in a sub-group.
 * Combines physical lighting with directional spot light characteristics.
 */
export declare class SpotPhysicalLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  /** Rotation around X-axis */
  XRotation: boolean;
  
  /** Rotation around Y-axis */
  YRotation: boolean;
  
  /** Rotation around Z-axis */
  ZRotation: boolean;
  
  /** IES light profile (Illuminating Engineering Society photometric data) */
  IES: boolean;

  constructor();
}

/**
 * Properties for spot lights with distance attenuation controls.
 * Extends spot light properties with near/far falloff and cone angle settings.
 */
export declare class AttenuatedSpotLightSubGroupMemberProperties extends SpotLightSubGroupMemberProperties {
  /** Distance where near attenuation begins */
  nearAttenuationStart: boolean;
  
  /** Distance where near attenuation reaches full effect */
  nearAttenuationEnd: boolean;
  
  /** Distance where far attenuation begins */
  farAttenuationStart: boolean;
  
  /** Distance where far attenuation reaches full effect */
  farAttenuationEnd: boolean;
  
  /** Inner cone angle (bright center spot) */
  hotspotAngle: boolean;
  
  /** Outer cone angle (edge falloff) */
  falloffAngle: boolean;

  constructor();
}

/**
 * Properties specific to virtual area light sources in a sub-group.
 * Area lights emit from a rectangular surface with width and height.
 */
export declare class VirtualAreaLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  /** Rotation around X-axis */
  XRotation: boolean;
  
  /** Rotation around Y-axis */
  YRotation: boolean;
  
  /** Rotation around Z-axis */
  ZRotation: boolean;
  
  /** Width of the light-emitting surface */
  width: boolean;
  
  /** Height of the light-emitting surface */
  height: boolean;
  
  /** Whether the light emits from both sides of the surface */
  double_flat: boolean;

  constructor();
}

/**
 * Properties specific to flat area light sources in a sub-group.
 * Flat lights are planar area lights with rectangular emission.
 */
export declare class FlatLightSubGroupMemberProperties extends VirtualAreaLightSubGroupMemberProperties {
  constructor();
}

/**
 * Utility class for comparing and updating light sub-group member properties.
 * Provides methods to synchronize property states across multiple light instances.
 */
export declare class LightSubGroupCompareUtil {
  /**
   * Sets a specific property value on a properties object.
   * 
   * @param propertyName - Name of the property to set
   * @param properties - Target properties object
   * @param value - Value to assign to the property
   */
  static setPropertyByValue(
    propertyName: string,
    properties: Record<string, boolean>,
    value: boolean
  ): void;

  /**
   * Updates property flags based on comparison of multiple light instances.
   * Sets a property to true only if all instances have matching values (within epsilon for numbers).
   * 
   * @param properties - Properties object to update with comparison results
   * @param lightInstances - Array of light instances to compare
   * 
   * @remarks
   * - For numeric properties: values must match within 0.0001 tolerance
   * - For RGB arrays: all three components must match exactly
   * - For other types: values must be strictly equal
   * - Properties are set to true only when all instances agree
   */
  static updateProperty(
    properties: Record<string, boolean>,
    lightInstances: Array<Record<string, unknown>>
  ): void;
}