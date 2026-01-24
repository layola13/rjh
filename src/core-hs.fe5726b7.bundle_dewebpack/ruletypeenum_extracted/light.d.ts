/**
 * Light module type definitions
 * Original Module ID: 62615
 * 
 * This module contains type definitions for lighting system models including
 * light groups, individual lights, floorplans, and related enumerations.
 */

/**
 * Template enumeration for empty light group configurations
 * Defines the available template types when creating empty light groups
 */
export enum LightGroupEmptyTemplateEnum {
  // Add specific enum members based on HSCore.Model.LightGroupEmptyTemplateEnum
}

/**
 * Template enumeration for light group configurations
 * Defines the available template types for standard light groups
 */
export enum LightGroupTemplateEnum {
  // Add specific enum members based on HSCore.Model.LightGroupTemplateEnum
}

/**
 * Represents a collection of lights that can be controlled together
 * Used for organizing and managing multiple lights as a single unit
 */
export interface LightGroup {
  // Add properties based on HSCore.Model.LightGroup
}

/**
 * Represents an individual light fixture in the system
 * Contains properties for light configuration, state, and characteristics
 */
export interface Light {
  // Add properties based on HSCore.Model.Light
}

/**
 * Enumeration of available light types
 * Defines the different categories or classifications of lights
 */
export enum LightTypeEnum {
  // Add specific enum members based on HSCore.Model.LightTypeEnum
}

/**
 * Represents a floorplan layout
 * Contains spatial information and room definitions for lighting placement
 */
export interface Floorplan {
  // Add properties based on HSCore.Model.Floorplan
}

/**
 * Enumeration of room types
 * Defines the different categories of rooms in a floorplan
 */
export enum RoomTypeEnum {
  // Add specific enum members based on HSCore.Model.RoomTypeEnum
}

/**
 * Represents content associated with lighting configuration
 * May contain media, settings, or other related data
 */
export interface Content {
  // Add properties based on HSCore.Model.Content
}

/**
 * Enumeration of slab face types
 * Defines the orientation or surface types for architectural slabs
 * relevant to lighting placement and calculations
 */
export enum SlabFaceType {
  // Add specific enum members based on HSCore.Model.SlabFaceType
}

/**
 * Configuration options for sunlight simulation
 * Contains settings for natural light behavior and rendering
 */
export interface SunlightOption {
  // Add properties based on HSCore.Model.SunlightOption
}