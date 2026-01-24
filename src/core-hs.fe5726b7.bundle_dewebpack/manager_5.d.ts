/**
 * Material management module
 * Provides interfaces and classes for material system, including material data, decorators, and utilities
 */

// ==================== Interfaces ====================

/**
 * Material dumped data interface
 * Represents serialized material data structure
 */
export interface IMaterialDumpedData {
  // Material dumped data properties will be defined based on actual implementation
}

/**
 * Material data interface
 * Core material data structure
 */
export interface IMaterialData {
  // Material data properties will be defined based on actual implementation
}

/**
 * Material data to JSON result interface
 * Result structure when converting material data to JSON format
 */
export interface IMaterialDataToJsonResult {
  // JSON conversion result properties
}

/**
 * Material save to JSON result interface
 * Result structure when saving material to JSON format
 */
export interface IMaterialSaveToJsonResult {
  // Save to JSON result properties
}

// ==================== Enums ====================

/**
 * Material identifier enumeration
 * Defines unique identifiers for different material types
 */
export enum MaterialIdEnum {
  // Material ID constants
}

/**
 * Texture pave type enumeration
 * Defines how textures are tiled/paved on surfaces
 */
export enum TexturePaveTypeEnum {
  // Texture pave type constants
}

/**
 * Color mode enumeration
 * Defines different color rendering modes for materials
 */
export enum ColorModeEnum {
  // Color mode constants
}

// ==================== Classes ====================

/**
 * Material data class
 * Manages material properties and data storage
 */
export declare class MaterialData {
  constructor();
  // MaterialData methods and properties
}

/**
 * Material input/output class
 * Handles material serialization and deserialization
 */
export declare class Material_IO {
  constructor();
  // Material I/O methods
}

/**
 * Material class
 * Main material representation with rendering properties
 */
export declare class Material {
  constructor();
  // Material methods and properties
}

/**
 * Material manager class
 * Central manager for material lifecycle and operations
 */
export declare class Manager {
  constructor();
  // Manager methods for material operations
}

// ==================== Decorators ====================

/**
 * Material decorator
 * Decorator for enhancing material functionality
 */
export declare class MaterialDecorator {
  constructor();
  // Decorator methods
}

/**
 * Material data object decorator
 * Decorator for material data object enhancement
 */
export declare class MaterialDataObjDecorator {
  constructor();
  // Data object decorator methods
}

// ==================== Utilities ====================

/**
 * Utility class
 * Provides helper functions for material operations
 */
export declare class Util {
  constructor();
  // Utility methods
}

// ==================== Default Export ====================

/**
 * Module exports
 * All material-related types, classes, and utilities
 */
export {
  Manager,
  Material,
  IMaterialSaveToJsonResult,
  IMaterialDataToJsonResult,
  MaterialDecorator,
  MaterialDataObjDecorator,
  MaterialIdEnum,
  TexturePaveTypeEnum,
  ColorModeEnum,
  Material_IO,
  MaterialData,
  IMaterialData,
  Util,
  IMaterialDumpedData
};