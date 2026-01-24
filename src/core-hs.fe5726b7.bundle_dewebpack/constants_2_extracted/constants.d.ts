/**
 * Constants Module
 * Central export module for various constants, enums, and configuration types
 * @module Constants
 */

// Re-exported from module 26668
export { Constants, ColorModeEnum } from './constants-core';

// Re-exported from module 23142
export { ModelClass, ClassLNameToSName, ClassSNameToLName } from './model-class';

// Re-exported from module 73003
export { RequestType } from './request-type';

// Re-exported from module 15342
export { GraphicsObjectType } from './graphics-object-type';

// Re-exported from module 48755
export { Position } from './position';

// Re-exported from module 19140
export * as Render from './render';

// Re-exported from module 46558
export * as RenderLight from './render-light';

// Re-exported from module 4526
export { Config } from './config';

// Re-exported from module 75056
export { CustomizationContentType } from './customization-content-type';

// Re-exported from module 88321
export { ParametricDoorWindowSystemVariablesName } from './parametric-door-window-system-variables-name';

/**
 * Resources configuration object
 * Contains SVG and other static resource references
 */
export const Resources: {
  /** SVG resources collection */
  readonly svgs: Record<string, unknown>;
};