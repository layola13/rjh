/**
 * Module: module_459848
 * Original ID: 459848
 * 
 * Provides a multi-entity selection gizmo for visual selection feedback in the SVG canvas.
 * Displays bounding boxes around selected entities with stroke highlighting.
 */

import type { SignalHook } from 'HSCore.Util';
import type { BrepBound } from 'HSCore.Util';
import type { Matrix } from 'SVG';

/**
 * Represents a 2D bounding rectangle in screen coordinates
 */
interface ScreenBound {
    /** Left position in screen pixels */
    left: number;
    /** Top position in screen pixels */
    top: number;
    /** Width in screen pixels */
    width: number;
    /** Height in screen pixels */
    height: number;
}

/**
 * SVG element attributes for content bounds
 */
interface ContentBoundAttributes extends ScreenBound {
    /** Rotation angle in degrees */
    rotation: number;
}

/**
 * Represents an entity with bounds and change signals
 */
interface Entity {
    /** Bounding box of the entity */
    bound: BrepBound;
    /** Signal emitted when entity fields change */
    signalFieldChanged: Signal<void>;
}

/**
 * SVG element type from the graphics library
 */
interface SVGElement {
    attr(attributes: Record<string, unknown>): SVGElement;
    move(x: number, y: number): SVGElement;
    remove(): void;
}

/**
 * Rendering context for SVG operations
 */
interface RenderContext {
    /** The parent application */
    application: Application;
    /** Creates a rectangle SVG element */
    rect(width: number, height: number): SVGElement;
}

/**
 * SVG layer that can contain child elements
 */
interface Layer {
    /** Adds a child element to the layer */
    appendChild(element: SVGElement): void;
    /** Removes a child element from the layer */
    removeChild(element: SVGElement): void;
}

/**
 * Application instance with command manager
 */
interface Application {
    /** Command manager for undo/redo operations */
    cmdManager: CommandManager;
}

/**
 * Command manager interface
 */
interface CommandManager {
    // Command management methods would be defined here
}

/**
 * Generic signal type for event handling
 */
interface Signal<T> {
    // Signal methods would be defined here
}

/**
 * Base class for gizmos in the application
 */
declare class BaseGizmo {
    /** Whether the gizmo needs redrawing */
    dirty: boolean;
    
    constructor(context: RenderContext, layer: Layer, entity: Entity);
    
    /** Called when gizmo is deactivated */
    onActivate(): void;
    
    /** Renders the gizmo */
    draw(args: unknown[]): void;
    
    /** Cleanup when gizmo is destroyed */
    onCleanup(args: unknown[]): void;
}

/**
 * Multi-entity selection gizmo that displays bounding boxes around multiple selected entities.
 * Provides visual feedback for selection by rendering stroke rectangles around each entity
 * and a combined bounding box around all selected entities.
 */
declare class MultiEntitySelectionGizmo extends BaseGizmo {
    /** Array of entities being displayed */
    entities: Entity[];
    
    /** Rendering context */
    context: RenderContext;
    
    /** SVG layer for rendering */
    layer: Layer;
    
    /** Application instance */
    app: Application;
    
    /** Command manager reference */
    cmdMgr: CommandManager;
    
    /** Array of SVG elements representing the gizmo */
    element: SVGElement[] | undefined;
    
    /** Signal hook for listening to entity changes */
    private _signalHook1: SignalHook;
    
    /** Individual bounding box elements for each entity */
    private _memberBoundElements: SVGElement[];
    
    /**
     * Creates a new multi-entity selection gizmo
     * @param context - The rendering context
     * @param layer - The SVG layer to render into
     * @param entities - Array of entities to display bounds for
     */
    constructor(context: RenderContext, layer: Layer, entities: Entity[]);
    
    /**
     * Called when the gizmo is deactivated.
     * Stops listening to entity change signals.
     */
    onActivate(): void;
    
    /**
     * Renders the selection bounds for all entities.
     * Creates a combined bounding box and individual boxes for each entity member.
     */
    draw(): void;
    
    /**
     * Cleans up resources when the gizmo is destroyed.
     * Disposes signal hooks and removes all SVG elements.
     */
    onCleanup(): void;
    
    /**
     * Removes and cleans up an array of SVG elements
     * @param elements - Array of elements to remove
     */
    private _cleanUpElements(elements: SVGElement[] | undefined): void;
    
    /**
     * Converts model space bounds to screen space coordinates
     * @param bound - Model space bounding box
     * @returns Screen space bounding rectangle
     */
    private _BoundtoScreen(bound: BrepBound): ScreenBound;
}

/**
 * Utility function to get SVG attributes for content bounds of entities
 * @param entities - Array of entities to get bounds for
 * @returns Array of bound attributes including position and rotation
 */
declare function getContentsSVGAttributes(entities: Entity[]): ContentBoundAttributes[];

/**
 * Namespace containing SVG-related constants
 */
declare namespace HSApp.View.SVG.Constants {
    /** Color used for selected content stroke */
    export const COLOR_CONTENT_STROKE_SELECTED: string;
}

/**
 * Utility namespace for SVG coordinate transformations
 */
declare namespace HSApp.View.SVG.Util {
    /**
     * Converts a model space point to canvas screen coordinates
     * @param point - [x, y] coordinates in model space
     * @returns [x, y] coordinates in screen space
     */
    export function ModelPointToCanvas(point: [number, number]): [number, number];
}

export default MultiEntitySelectionGizmo;