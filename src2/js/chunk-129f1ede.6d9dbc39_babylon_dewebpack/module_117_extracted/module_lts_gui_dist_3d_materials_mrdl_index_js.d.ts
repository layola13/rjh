/**
 * MRDL (Mixed Reality Design Language) Materials Module
 * 
 * This module exports MRDL material classes for 3D GUI components in Babylon.js.
 * These materials provide Mixed Reality-optimized visual styles for UI elements.
 * 
 * @module @babylonjs/gui/3D/materials/mrdl
 */

/**
 * Material for MRDL backplate components.
 * Provides a stylized surface material for panel backgrounds and container surfaces
 * following Mixed Reality Design Language specifications.
 */
export { MRDLBackplateMaterial } from './mrdlBackplateMaterial';

/**
 * Material for MRDL slider bar components.
 * Defines the visual appearance of the track/bar portion of slider controls
 * with MRDL-compliant styling and effects.
 */
export { MRDLSliderBarMaterial } from './mrdlSliderBarMaterial';

/**
 * Material for MRDL slider thumb components.
 * Defines the visual appearance of the draggable thumb/handle of slider controls
 * with appropriate hover, press, and interaction states.
 */
export { MRDLSliderThumbMaterial } from './mrdlSliderThumbMaterial';