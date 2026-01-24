/**
 * Light module type definitions
 * Provides types and enums for lighting system, floor plans, and room management
 * @module Light
 */

/**
 * Enum defining empty template types for light groups
 * Used when creating light groups without predefined configurations
 */
export enum LightGroupEmptyTemplateEnum {
  // Add specific enum values based on HSCore.Model.LightGroupEmptyTemplateEnum
}

/**
 * Enum defining predefined template types for light groups
 * Provides standard lighting configurations for different scenarios
 */
export enum LightGroupTemplateEnum {
  // Add specific enum values based on HSCore.Model.LightGroupTemplateEnum
}

/**
 * Enum defining types of lights available in the system
 * Categorizes lights by their function or characteristics
 */
export enum LightTypeEnum {
  // Add specific enum values based on HSCore.Model.LightTypeEnum
}

/**
 * Enum defining different room types
 * Used for categorizing spaces in floor plans
 */
export enum RoomTypeEnum {
  // Add specific enum values based on HSCore.Model.RoomTypeEnum
}

/**
 * Enum defining slab face orientations
 * Represents different faces of structural slabs for lighting placement
 */
export enum SlabFaceType {
  // Add specific enum values based on HSCore.Model.SlabFaceType
}

/**
 * Represents a single light fixture in the system
 * Contains properties for light configuration and state
 */
export interface Light {
  readonly id: string;
  readonly type: LightTypeEnum;
  readonly position: { x: number; y: number; z: number };
  readonly intensity: number;
  readonly color: string;
  readonly enabled: boolean;
  // Add additional properties based on HSCore.Model.Light
}

/**
 * Represents a collection of lights managed as a single unit
 * Allows coordinated control of multiple light fixtures
 */
export interface LightGroup {
  readonly id: string;
  readonly name: string;
  readonly lights: readonly Light[];
  readonly template?: LightGroupTemplateEnum;
  readonly emptyTemplate?: LightGroupEmptyTemplateEnum;
  // Add additional properties based on HSCore.Model.LightGroup
}

/**
 * Represents a floor plan layout
 * Contains spatial information and room definitions
 */
export interface Floorplan {
  readonly id: string;
  readonly name: string;
  readonly rooms: readonly Room[];
  readonly dimensions: { width: number; height: number };
  // Add additional properties based on HSCore.Model.Floorplan
}

/**
 * Represents content associated with lighting or floor plans
 * Generic container for various content types
 */
export interface Content {
  readonly id: string;
  readonly type: string;
  readonly data: unknown;
  // Add additional properties based on HSCore.Model.Content
}

/**
 * Configuration options for sunlight simulation
 * Controls natural light behavior in the scene
 */
export interface SunlightOption {
  readonly enabled: boolean;
  readonly intensity: number;
  readonly direction: { x: number; y: number; z: number };
  readonly color: string;
  readonly timeOfDay?: number;
  // Add additional properties based on HSCore.Model.SunlightOption
}

/**
 * Helper interface for room definitions (referenced by Floorplan)
 */
interface Room {
  readonly id: string;
  readonly type: RoomTypeEnum;
  readonly name: string;
  readonly area: number;
  // Add additional properties as needed
}