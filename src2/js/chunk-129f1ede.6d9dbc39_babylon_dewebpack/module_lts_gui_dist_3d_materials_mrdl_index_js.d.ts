/**
 * MRDL (Mixed Reality Design Language) Materials Module
 * 
 * This module provides specialized materials for 3D GUI components following
 * Microsoft's Mixed Reality Design Language guidelines.
 * 
 * @module @babylonjs/gui/3D/materials/mrdl
 */

/**
 * Material for rendering backplate surfaces in MRDL-style UI components.
 * Typically used as background panels for buttons, sliders, and other interactive elements.
 */
export { MRDLBackplateMaterial } from './mrdlBackplateMaterial';

/**
 * Material for rendering the track/bar portion of MRDL-style slider controls.
 * Provides visual feedback for the slidable range.
 */
export { MRDLSliderBarMaterial } from './mrdlSliderBarMaterial';

/**
 * Material for rendering the draggable thumb/handle of MRDL-style slider controls.
 * Includes hover and interaction states for enhanced user feedback.
 */
export { MRDLSliderThumbMaterial } from './mrdlSliderThumbMaterial';