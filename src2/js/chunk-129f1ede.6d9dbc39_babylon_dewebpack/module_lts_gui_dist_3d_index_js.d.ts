/**
 * Babylon.js GUI 3D module - Provides 3D user interface components and materials
 * for creating interactive 3D UI elements in immersive experiences.
 */

// ==================== Controls ====================

/**
 * Base class for all 3D button controls
 */
export class AbstractButton3D {}

/**
 * Standard 3D button control
 */
export class Button3D extends AbstractButton3D {}

/**
 * Container for organizing multiple 3D controls
 */
export class Container3D {}

/**
 * Base class for all 3D GUI controls
 */
export class Control3D {}

/**
 * 3D panel with cylindrical layout
 */
export class CylinderPanel extends VolumeBasedPanel {}

/**
 * XR hand-attached menu for quick access controls
 */
export class HandMenu extends Container3D {}

/**
 * Holographic backplate for Mixed Reality UI elements
 */
export class HolographicBackplate {}

/**
 * Holographic-styled button with Mixed Reality Design Language
 */
export class HolographicButton extends AbstractButton3D {}

/**
 * Holographic slate surface for content display
 */
export class HolographicSlate {}

/**
 * 3D button control backed by a mesh geometry
 */
export class MeshButton3D extends AbstractButton3D {}

/**
 * Near-interaction menu optimized for hand tracking
 */
export class NearMenu extends Container3D {}

/**
 * Flat rectangular panel for 3D UI layout
 */
export class PlanePanel extends VolumeBasedPanel {}

/**
 * Panel with scattered/distributed layout of child controls
 */
export class ScatterPanel extends VolumeBasedPanel {}

/**
 * 3D slider control for value selection
 */
export class Slider3D extends Control3D {}

/**
 * Spherical panel wrapping controls on a sphere surface
 */
export class SpherePanel extends VolumeBasedPanel {}

/**
 * Panel organizing controls in a vertical or horizontal stack
 */
export class StackPanel3D extends Container3D {}

/**
 * Touch-enabled 3D button with near interaction support
 */
export class TouchButton3D extends Button3D {}

/**
 * Touch-enabled holographic button for XR experiences
 */
export class TouchHolographicButton extends HolographicButton {}

/**
 * Version 3 of touch-enabled holographic button with enhanced features
 */
export class TouchHolographicButtonV3 extends TouchHolographicButton {}

/**
 * Touch-enabled holographic menu for XR interfaces
 */
export class TouchHolographicMenu extends HandMenu {}

/**
 * Touch-enabled mesh button with near interaction
 */
export class TouchMeshButton3D extends MeshButton3D {}

/**
 * Base class for volume-based 3D panels
 */
export class VolumeBasedPanel extends Container3D {}

// ==================== Materials ====================

/**
 * Fluent Design System backplate material
 */
export class FluentBackplateMaterial {}

/**
 * Fluent Design System button material with hover/press effects
 */
export class FluentButtonMaterial {}

/**
 * Base Fluent Design System material for 3D GUI elements
 */
export class FluentMaterial {}

/**
 * Shader defines for FluentMaterial customization
 */
export class FluentMaterialDefines {}

/**
 * Material for interactive handle controls
 */
export class HandleMaterial {}

/**
 * Mixed Reality Design Language backplate material
 */
export class MRDLBackplateMaterial {}

/**
 * MRDL slider bar track material
 */
export class MRDLSliderBarMaterial {}

/**
 * MRDL slider thumb/handle material
 */
export class MRDLSliderThumbMaterial {}

// ==================== Gizmos & Handles ====================

/**
 * Corner handle for slate/panel manipulation
 */
export class CornerHandle {}

/**
 * Base gizmo handle for interactive transformations
 */
export class GizmoHandle {}

/**
 * State enumeration for handle interaction
 */
export enum HandleState {
    /** Handle is idle */
    Idle = 0,
    /** Handle is being hovered */
    Hover = 1,
    /** Handle is being dragged */
    Drag = 2
}

/**
 * Side handle for slate/panel edge manipulation
 */
export class SideHandle {}

/**
 * Gizmo for manipulating slate controls (move, resize, rotate)
 */
export class SlateGizmo {}

// ==================== Manager ====================

/**
 * Main manager for 3D GUI system - handles picking, interaction, and rendering
 */
export class GUI3DManager {
    /**
     * Creates a new 3D GUI manager
     * @param scene - The Babylon.js scene to attach the manager to
     */
    constructor(scene: any);

    /**
     * Disposes the manager and all associated resources
     */
    dispose(): void;
}

// ==================== Utilities ====================

/**
 * Extended Vector3 class with additional metadata for GUI interactions
 */
export class Vector3WithInfo {
    /** X coordinate */
    x: number;
    
    /** Y coordinate */
    y: number;
    
    /** Z coordinate */
    z: number;
    
    /**
     * Button index associated with this vector (for pointer events)
     */
    buttonIndex: number;
}