/**
 * Exposed corner gizmo module
 * Provides a visual line gizmo for displaying directional indicators (e.g., sun direction)
 */

import { Node, LineMeshMaterial } from './367441';
import { Vector3, Geometry } from './336612';

declare namespace HSApp.View.Base {
  /**
   * Base gizmo class
   */
  class Gizmo {
    protected context: RenderContext;
    protected layer: LayerNode;
    
    constructor(context: RenderContext, layer: LayerNode, options?: unknown);
  }
}

/**
 * Render context interface
 */
interface RenderContext {
  /** The T3D application instance */
  application: T3DApplication;
  
  /** Flag indicating the scene needs re-rendering */
  needsRendering: boolean;
}

/**
 * T3D application interface
 */
interface T3DApplication {
  // Application-specific properties would be defined here
}

/**
 * Layer node interface for scene graph hierarchy
 */
interface LayerNode {
  /**
   * Add a child gizmo to this layer
   */
  addChild(child: ExposedCornerGizmo): void;
  
  /**
   * Remove a child gizmo from this layer
   */
  removeChild(child: ExposedCornerGizmo): void;
}

/**
 * RGB color tuple
 */
type Color = [number, number, number];

/**
 * 3D position as [x, y, z] array
 */
type Position3D = [number, number, number];

/**
 * Line definition as array of 3D positions
 */
type LinePoints = Position3D[];

/**
 * Gizmo for rendering exposed corner indicators with customizable lines
 * Extends the base HSApp gizmo class to provide line-based visualization
 */
declare class ExposedCornerGizmo extends HSApp.View.Base.Gizmo {
  /** Rendering context */
  protected readonly context: RenderContext;
  
  /** Line geometry data */
  protected readonly line: LinePoints;
  
  /** T3D application reference */
  protected readonly app: T3DApplication;
  
  /** Line color in RGB format */
  protected readonly color: Color;
  
  /** Line width in pixels */
  protected readonly lineWidth: number;
  
  /** Array of mesh elements comprising the gizmo */
  protected elements: Node[];
  
  /** Root scene node for this gizmo */
  protected node: Node | undefined;

  /**
   * Creates a new exposed corner gizmo
   * 
   * @param context - The rendering context
   * @param layer - The layer node to attach to
   * @param line - Array of 3D positions defining the line path
   * @param color - RGB color values for the line
   * @param lineWidth - Width of the line in pixels
   */
  constructor(
    context: RenderContext,
    layer: LayerNode,
    line: LinePoints,
    color: Color,
    lineWidth: number
  );

  /**
   * Show the gizmo by enabling its scene node
   * Triggers a render update
   */
  show(): void;

  /**
   * Hide the gizmo by disabling its scene node
   * Triggers a render update
   */
  hide(): void;

  /**
   * Deactivate the gizmo and clean up its resources
   */
  deactivate(): void;

  /**
   * Clean up resources when the gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Draw the gizmo, creating the scene node if necessary
   * Automatically shows the gizmo after creation
   */
  draw(): void;

  /**
   * Remove all child elements and clear the node from the scene
   * @internal
   */
  protected _clearNode(): void;

  /**
   * Create the scene node and initialize line mesh geometry
   * @internal
   */
  protected _createNode(): void;

  /**
   * Create a line mesh node from geometry data
   * 
   * @param linePoints - Array of 3D positions
   * @param name - Node identifier
   * @param material - Line material configuration
   * @returns The created mesh node
   * @internal
   */
  protected _createLineMesh(
    linePoints: LinePoints,
    name: string,
    material: LineMeshMaterial
  ): Node;

  /**
   * Convert an array of positions to line segment format
   * Duplicates intermediate vertices to create separate segments
   * 
   * @param positions - Array of Vector3 positions
   * @returns Flattened array of coordinates for line segments
   * @internal
   */
  protected _convertPositionsToLineSegments(positions: Vector3[]): number[];
}

export default ExposedCornerGizmo;