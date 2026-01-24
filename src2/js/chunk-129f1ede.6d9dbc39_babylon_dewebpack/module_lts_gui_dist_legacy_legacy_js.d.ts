/**
 * Babylon.js GUI Library - Legacy Module Exports
 * 
 * This module provides backward compatibility for the legacy Babylon.js GUI system.
 * All exports are re-exported from the main GUI index module.
 * 
 * @module @babylonjs/gui/legacy
 */

// ===========================
// Abstract Base Classes
// ===========================

/**
 * Abstract base class for 3D button controls
 */
export class AbstractButton3D {}

/**
 * Abstract base class for slider controls
 */
export class BaseSlider {}

/**
 * Abstract base class for gradient fills
 */
export class BaseGradient {}

// ===========================
// Core GUI Components
// ===========================

/**
 * Advanced dynamic texture for rendering 2D GUI on textures
 * Provides a canvas-like interface for creating interactive UI elements
 */
export class AdvancedDynamicTexture {}

/**
 * Instrumentation tool for monitoring AdvancedDynamicTexture performance
 */
export class AdvancedDynamicTextureInstrumentation {}

/**
 * 3D GUI manager for handling 3D UI controls in the scene
 */
export class GUI3DManager {}

// ===========================
// 2D Controls
// ===========================

/**
 * Base class for all 2D GUI controls
 */
export class Control {}

/**
 * Container control for grouping multiple child controls
 */
export class Container {}

/**
 * Button control for user interactions
 */
export class Button {}

/**
 * Checkbox control for boolean input
 */
export class Checkbox {}

/**
 * Radio button control for single selection from a group
 */
export class RadioButton {}

/**
 * Toggle button control with on/off states
 */
export class ToggleButton {}

/**
 * Button that can receive keyboard focus
 */
export class FocusableButton {}

/**
 * Color picker control for selecting colors
 */
export class ColorPicker {}

/**
 * Single-line text input control
 */
export class InputText {}

/**
 * Password input control with masked characters
 */
export class InputPassword {}

/**
 * Multi-line text area input control
 */
export class InputTextArea {}

/**
 * Text display control
 */
export class TextBlock {}

/**
 * Image display control
 */
export class Image {}

/**
 * Slider control with custom images
 */
export class ImageBasedSlider {}

/**
 * Scrollbar control with custom images
 */
export class ImageScrollBar {}

/**
 * Standard slider control
 */
export class Slider {}

/**
 * Standard scrollbar control
 */
export class ScrollBar {}

/**
 * Scrollable container with automatic scrollbars
 */
export class ScrollViewer {}

/**
 * Virtual keyboard for touch input
 */
export class VirtualKeyboard {}

// ===========================
// Shape Controls
// ===========================

/**
 * Rectangular shape control
 */
export class Rectangle {}

/**
 * Ellipse shape control
 */
export class Ellipse {}

/**
 * Line shape control
 */
export class Line {}

/**
 * Multi-segment line control
 */
export class MultiLine {}

/**
 * Point on a multi-line control
 */
export class MultiLinePoint {}

// ===========================
// Layout Containers
// ===========================

/**
 * Grid layout container with rows and columns
 */
export class Grid {}

/**
 * Stack panel for vertical or horizontal layout
 */
export class StackPanel {}

/**
 * Display grid for showing measurement guides
 */
export class DisplayGrid {}

// ===========================
// 3D Controls
// ===========================

/**
 * Base class for all 3D GUI controls
 */
export class Control3D {}

/**
 * Container for 3D GUI controls
 */
export class Container3D {}

/**
 * 3D button control
 */
export class Button3D {}

/**
 * 3D button backed by a mesh
 */
export class MeshButton3D {}

/**
 * Holographic button control
 */
export class HolographicButton {}

/**
 * Holographic slate control for displaying content
 */
export class HolographicSlate {}

/**
 * Holographic backplate for buttons
 */
export class HolographicBackplate {}

/**
 * 3D slider control
 */
export class Slider3D {}

/**
 * 3D button with touch interaction support
 */
export class TouchButton3D {}

/**
 * Touch-enabled mesh button
 */
export class TouchMeshButton3D {}

/**
 * Touch-enabled holographic button
 */
export class TouchHolographicButton {}

/**
 * Version 3 of touch holographic button
 */
export class TouchHolographicButtonV3 {}

/**
 * Touch-enabled holographic menu
 */
export class TouchHolographicMenu {}

// ===========================
// 3D Panels
// ===========================

/**
 * Base class for volume-based 3D panels
 */
export class VolumeBasedPanel {}

/**
 * Flat plane panel for 3D controls
 */
export class PlanePanel {}

/**
 * Cylindrical panel for 3D controls
 */
export class CylinderPanel {}

/**
 * Spherical panel for 3D controls
 */
export class SpherePanel {}

/**
 * Scatter panel for random positioning of 3D controls
 */
export class ScatterPanel {}

/**
 * 3D stack panel for organized layout
 */
export class StackPanel3D {}

// ===========================
// XR/VR Menu Controls
// ===========================

/**
 * Hand-attached menu for VR interactions
 */
export class HandMenu {}

/**
 * Near-interaction menu for VR
 */
export class NearMenu {}

// ===========================
// Control Groups
// ===========================

/**
 * Group of checkbox controls
 */
export class CheckboxGroup {}

/**
 * Group of radio button controls
 */
export class RadioGroup {}

/**
 * Group of slider controls
 */
export class SliderGroup {}

/**
 * Base class for selector groups
 */
export class SelectorGroup {}

/**
 * Panel for selecting from multiple options
 */
export class SelectionPanel {}

// ===========================
// Gizmos and Handles
// ===========================

/**
 * Gizmo for manipulating slate controls
 */
export class SlateGizmo {}

/**
 * Handle for gizmo interactions
 */
export class GizmoHandle {}

/**
 * Corner handle for resizing
 */
export class CornerHandle {}

/**
 * Side handle for resizing
 */
export class SideHandle {}

/**
 * Handle state enumeration or configuration
 */
export class HandleState {}

// ===========================
// Materials
// ===========================

/**
 * Fluent Design material base class
 */
export class FluentMaterial {}

/**
 * Material defines for Fluent materials
 */
export class FluentMaterialDefines {}

/**
 * Fluent Design backplate material
 */
export class FluentBackplateMaterial {}

/**
 * Fluent Design button material
 */
export class FluentButtonMaterial {}

/**
 * Material for gizmo handles
 */
export class HandleMaterial {}

/**
 * MRTK (Mixed Reality Toolkit) backplate material
 */
export class MRDLBackplateMaterial {}

/**
 * MRTK slider bar material
 */
export class MRDLSliderBarMaterial {}

/**
 * MRTK slider thumb material
 */
export class MRDLSliderThumbMaterial {}

// ===========================
// Gradients
// ===========================

/**
 * Linear gradient fill
 */
export class LinearGradient {}

/**
 * Radial gradient fill
 */
export class RadialGradient {}

// ===========================
// Styling and Measurement
// ===========================

/**
 * Style configuration for GUI controls
 */
export class Style {}

/**
 * Value with unit (e.g., "10px", "50%")
 */
export class ValueAndUnit {}

/**
 * Measurement information for control dimensions
 */
export class Measure {}

/**
 * 2D transformation matrix
 */
export class Matrix2D {}

// ===========================
// Utility Classes
// ===========================

/**
 * Mathematical utility functions for GUI calculations
 */
export class MathTools {}

/**
 * Vector2 with additional metadata
 */
export class Vector2WithInfo {}

/**
 * Vector3 with additional metadata
 */
export class Vector3WithInfo {}

/**
 * Text wrapping utility
 */
export class TextWrapper {}

/**
 * Text wrapping mode enumeration
 */
export enum TextWrapping {}

/**
 * Keyboard key property set
 */
export class KeyPropertySet {}

/**
 * XML loader for loading GUI definitions from XML
 */
export class XmlLoader {}

// ===========================
// Module Metadata
// ===========================

/**
 * Module name identifier
 */
export const name: string;