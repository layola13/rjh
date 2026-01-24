/**
 * Constants module - Central configuration and enumeration exports
 * @module Constants
 * @description Aggregates all constant definitions, enumerations, and configuration objects used throughout the application
 */

/**
 * Core application constants
 * @see module 26668
 */
export { Constants } from './path/to/module-26668';

/**
 * Color mode enumeration for rendering options
 * @see module 26668
 */
export { ColorModeEnum } from './path/to/module-26668';

/**
 * Model class definitions and type identifiers
 * @see module 23142
 */
export { ModelClass } from './path/to/module-23142';

/**
 * Mapping from long class names to short names
 * @see module 23142
 */
export { ClassLNameToSName } from './path/to/module-23142';

/**
 * Mapping from short class names to long names
 * @see module 23142
 */
export { ClassSNameToLName } from './path/to/module-23142';

/**
 * HTTP request type enumeration
 * @see module 73003
 */
export { RequestType } from './path/to/module-73003';

/**
 * Graphics object type definitions
 * @see module 15342
 */
export { GraphicsObjectType } from './path/to/module-15342';

/**
 * Position constants and definitions
 * @see module 48755
 */
export { Position } from './path/to/module-48755';

/**
 * Rendering configuration and utilities
 * @see module 19140
 */
export * as Render from './path/to/module-19140';

/**
 * Lighting configuration for rendering
 * @see module 46558
 */
export * as RenderLight from './path/to/module-46558';

/**
 * Application configuration object
 * @see module 4526
 */
export { Config } from './path/to/module-4526';

/**
 * Customization content type enumeration
 * @see module 75056
 */
export { CustomizationContentType } from './path/to/module-75056';

/**
 * Variable names for parametric door/window systems
 * @see module 88321
 */
export { ParametricDoorWindowSystemVariablesName } from './path/to/module-88321';

/**
 * Application resource definitions
 */
export interface Resources {
  /** SVG resource storage */
  svgs: Record<string, unknown>;
}

/**
 * Resources constant object
 */
export const Resources: Resources;