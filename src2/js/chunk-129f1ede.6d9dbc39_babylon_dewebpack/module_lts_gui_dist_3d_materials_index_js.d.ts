/**
 * 3D GUI Materials Module
 * 
 * This module exports various material classes used for 3D GUI components,
 * including Fluent Design System materials and Mixed Reality Design Language (MRDL) materials.
 * 
 * @module 3D/materials
 * @packageDocumentation
 */

/**
 * Fluent Design backplate material for 3D GUI elements.
 * Provides a styled background surface following Microsoft's Fluent Design System.
 */
export { FluentBackplateMaterial } from './fluent/fluentBackplate';

/**
 * Fluent Design button material for interactive 3D button components.
 * Implements visual states and effects for button interactions.
 */
export { FluentButtonMaterial } from './fluent/fluentButton';

/**
 * Base Fluent Design material for 3D GUI components.
 * Core material implementation following Fluent Design principles.
 */
export { FluentMaterial } from './fluent/fluentMaterial';

/**
 * Material defines and configuration constants for FluentMaterial.
 * Contains shader preprocessor definitions and material parameters.
 */
export { FluentMaterialDefines } from './fluent/fluentMaterial';

/**
 * Handle material for 3D manipulator controls.
 * Used for grab handles, resize controls, and other interactive manipulation widgets.
 */
export { HandleMaterial } from './handle/handleMaterial';

/**
 * MRDL (Mixed Reality Design Language) backplate material.
 * Provides background surfaces optimized for mixed reality experiences.
 */
export { MRDLBackplateMaterial } from './mrdl/mrdlBackplate';

/**
 * MRDL slider bar material for slider track components.
 * Renders the rail/track portion of 3D slider controls.
 */
export { MRDLSliderBarMaterial } from './mrdl/mrdlSlider';

/**
 * MRDL slider thumb material for slider handle components.
 * Renders the draggable thumb/knob portion of 3D slider controls.
 */
export { MRDLSliderThumbMaterial } from './mrdl/mrdlSlider';