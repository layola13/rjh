/**
 * Babylon.js GUI Module
 * 
 * This module provides both 2D and 3D GUI components for creating user interfaces
 * in Babylon.js applications. It includes controls, buttons, panels, materials,
 * and various interactive elements.
 */

// ============================================================================
// 2D GUI Components (from 2D/index.js)
// ============================================================================

/**
 * Advanced dynamic texture for rendering 2D GUI controls
 */
export class AdvancedDynamicTexture {}

/**
 * Instrumentation for monitoring AdvancedDynamicTexture performance
 */
export class AdvancedDynamicTextureInstrumentation {}

/**
 * Base class for gradient effects
 */
export class BaseGradient {}

/**
 * Base class for slider controls
 */
export class BaseSlider {}

/**
 * Standard button control
 */
export class Button {}

/**
 * Checkbox control for boolean input
 */
export class Checkbox {}

/**
 * Group container for managing multiple checkboxes
 */
export class CheckboxGroup {}

/**
 * Color picker control for selecting colors
 */
export class ColorPicker {}

/**
 * Base container for grouping controls
 */
export class Container {}

/**
 * Base class for all 2D GUI controls
 */
export class Control {}

/**
 * Grid display utility for layout debugging
 */
export class DisplayGrid {}

/**
 * Ellipse shape control
 */
export class Ellipse {}

/**
 * Button control with focus management capabilities
 */
export class FocusableButton {}

/**
 * Grid layout container for arranging controls in rows and columns
 */
export class Grid {}

/**
 * Image control for displaying textures
 */
export class Image {}

/**
 * Slider control with image-based styling
 */
export class ImageBasedSlider {}

/**
 * Scrollbar control with image-based styling
 */
export class ImageScrollBar {}

/**
 * Password input field with masked characters
 */
export class InputPassword {}

/**
 * Single-line text input control
 */
export class InputText {}

/**
 * Multi-line text area input control
 */
export class InputTextArea {}

/**
 * Property set for keyboard key configuration
 */
export class KeyPropertySet {}

/**
 * Line drawing control
 */
export class Line {}

/**
 * Linear gradient effect
 */
export class LinearGradient {}

/**
 * Mathematical utility functions for GUI calculations
 */
export class MathTools {}

/**
 * 2D matrix for transformations
 */
export class Matrix2D {}

/**
 * Measurement utility for control dimensions and positioning
 */
export class Measure {}

/**
 * Multi-line drawing control
 */
export class MultiLine {}

/**
 * Point definition for multi-line controls
 */
export class MultiLinePoint {}

/**
 * Radial gradient effect
 */
export class RadialGradient {}

/**
 * Radio button control for single-choice selection
 */
export class RadioButton {}

/**
 * Group container for managing radio buttons
 */
export class RadioGroup {}

/**
 * Rectangle shape control
 */
export class Rectangle {}

/**
 * Scrollbar control for scrollable content
 */
export class ScrollBar {}

/**
 * Scrollable viewport control with scrollbars
 */
export class ScrollViewer {}

/**
 * Panel for displaying selectable items
 */
export class SelectionPanel {}

/**
 * Base group for selector controls (radio buttons, checkboxes)
 */
export class SelectorGroup {}

/**
 * Slider control for numeric value selection
 */
export class Slider {}

/**
 * Group container for managing multiple sliders
 */
export class SliderGroup {}

/**
 * Vertical or horizontal stack layout container
 */
export class StackPanel {}

/**
 * Style definition for control appearance
 */
export class Style {}

/**
 * Text display control with formatting support
 */
export class TextBlock {}

/**
 * Utility for text wrapping and measurement
 */
export class TextWrapper {}

/**
 * Enumeration for text wrapping modes
 */
export enum TextWrapping {}

/**
 * Toggle button control with on/off states
 */
export class ToggleButton {}

/**
 * Value with associated unit for measurement
 */
export class ValueAndUnit {}

/**
 * 2D vector with additional metadata
 */
export class Vector2WithInfo {}

/**
 * Virtual on-screen keyboard control
 */
export class VirtualKeyboard {}

/**
 * XML-based GUI loader utility
 */
export class XmlLoader {}

/**
 * Module name identifier
 */
export const name: string;

// ============================================================================
// 3D GUI Components (from 3D/index.js)
// ============================================================================

/**
 * Abstract base class for 3D button controls
 */
export class AbstractButton3D {}

/**
 * Standard 3D button control
 */
export class Button3D {}

/**
 * Base container for grouping 3D controls
 */
export class Container3D {}

/**
 * Base class for all 3D GUI controls
 */
export class Control3D {}

/**
 * Corner handle for gizmo manipulation
 */
export class CornerHandle {}

/**
 * Panel arranged on a cylindrical surface
 */
export class CylinderPanel {}

/**
 * Material for Fluent Design backplate elements
 */
export class FluentBackplateMaterial {}

/**
 * Material for Fluent Design button elements
 */
export class FluentButtonMaterial {}

/**
 * Base Fluent Design material
 */
export class FluentMaterial {}

/**
 * Shader defines for Fluent materials
 */
export class FluentMaterialDefines {}

/**
 * Manager for 3D GUI scenes and interactions
 */
export class GUI3DManager {}

/**
 * Handle component for gizmo controls
 */
export class GizmoHandle {}

/**
 * Menu attached to hand tracking in XR
 */
export class HandMenu {}

/**
 * Material for handle rendering
 */
export class HandleMaterial {}

/**
 * Enumeration for handle interaction states
 */
export enum HandleState {}

/**
 * Holographic backplate component following Microsoft MRTK design
 */
export class HolographicBackplate {}

/**
 * Holographic button following Microsoft MRTK design
 */
export class HolographicButton {}

/**
 * Holographic slate surface for content display
 */
export class HolographicSlate {}

/**
 * 3D button based on a mesh
 */
export class MeshButton3D {}

/**
 * Material for MRDL (Mixed Reality Design Language) backplate
 */
export class MRDLBackplateMaterial {}

/**
 * Material for MRDL slider bar component
 */
export class MRDLSliderBarMaterial {}

/**
 * Material for MRDL slider thumb component
 */
export class MRDLSliderThumbMaterial {}

/**
 * Menu positioned near the user in XR
 */
export class NearMenu {}

/**
 * Panel arranged on a planar surface
 */
export class PlanePanel {}

/**
 * Panel with scattered/random control positioning
 */
export class ScatterPanel {}

/**
 * Side handle for gizmo manipulation
 */
export class SideHandle {}

/**
 * Gizmo for slate manipulation and resizing
 */
export class SlateGizmo {}

/**
 * 3D slider control for value selection
 */
export class Slider3D {}

/**
 * Panel arranged on a spherical surface
 */
export class SpherePanel {}

/**
 * 3D stack layout container
 */
export class StackPanel3D {}

/**
 * Touch-enabled 3D button control
 */
export class TouchButton3D {}

/**
 * Touch-enabled holographic button
 */
export class TouchHolographicButton {}

/**
 * Touch-enabled holographic button (version 3)
 */
export class TouchHolographicButtonV3 {}

/**
 * Touch-enabled holographic menu
 */
export class TouchHolographicMenu {}

/**
 * Touch-enabled mesh-based 3D button
 */
export class TouchMeshButton3D {}

/**
 * 3D vector with additional metadata
 */
export class Vector3WithInfo {}

/**
 * Base class for volume-based panel layouts
 */
export class VolumeBasedPanel {}