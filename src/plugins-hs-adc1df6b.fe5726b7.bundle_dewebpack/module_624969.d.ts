/**
 * 3D roof initialization edge triangle gizmo module
 * Provides interactive visual controls for adjusting roof start positions
 */

import { Node, Vector3, Quaternion, MeshBasicMaterial, LineMeshMaterial } from 'three';
import { HSCore } from '@/core';
import { Arc2d, DiscreteParameter, MathUtil } from '@/geometry';
import { Euler, Math as ThreeMath, Shape, ShapeBufferGeometry, Vector2, Quaternion as ThreeQuaternion } from 'three';

/**
 * Color scheme for default (unselected, unhovered) state
 */
interface ColorScheme {
  /** Line color in RGB hex format */
  line: number;
  /** Circle fill color in RGB hex format */
  circle: number;
  /** Triangle fill color in RGB hex format */
  triangle: number;
}

/**
 * Default colors when gizmo is in normal state
 */
declare const DEFAULT_COLORS: ColorScheme;

/**
 * Colors when gizmo is in hover state
 */
declare const HOVER_COLORS: ColorScheme;

/**
 * Colors when gizmo is in selected state
 */
declare const SELECTED_COLORS: ColorScheme;

/**
 * Opacity constants for visual feedback
 */
declare const OPACITY_FULL: 1;
declare const OPACITY_HOVER: 0.7;
declare const OPACITY_DEFAULT: 0.7;

/**
 * Represents a 2D line segment with geometric operations
 */
interface Line2D {
  /**
   * Get the direction vector of the line
   */
  getDirection(): Vector2D;
  
  /**
   * Get the midpoint of the line
   */
  getMidPt(): Vector2D;
  
  /**
   * Clone and scale the line
   */
  clone(): Line2D;
  
  /**
   * Scale the line by a factor
   */
  scale(factor: number): Line2D;
}

/**
 * 2D vector with geometric operations
 */
interface Vector2D {
  x: number;
  y: number;
  
  /**
   * Rotate vector by angle in radians
   */
  vecRotated(angleRadians: number): Vector2D;
  
  /**
   * Multiply vector by scalar
   */
  multiply(scalar: number): Vector2D;
  
  /**
   * Add another vector
   */
  add(other: Vector2D): Vector2D;
  added(other: Vector2D): Vector2D;
  
  /**
   * Subtract another vector
   */
  subtracted(other: Vector2D): Vector2D;
  
  /**
   * Clone the vector
   */
  clone(): Vector2D;
}

/**
 * Roof model interface
 */
interface RoofModel {
  /**
   * Room loop parameters for the roof
   */
  parameters: {
    roomLoop?: unknown;
  };
  
  /**
   * Get the unique parent of the roof
   */
  getUniqueParent(): unknown;
}

/**
 * Camera model with position and type
 */
interface CameraModel {
  type: HSCore.Model.CameraTypeEnum;
  x: number;
  y: number;
  z: number;
}

/**
 * Mouse event data from the canvas
 */
interface MouseEventData {
  event: MouseEvent;
}

/**
 * Base gizmo class from the application framework
 */
declare class BaseGizmo {
  constructor(canvas: unknown, layer: unknown, context?: unknown);
  
  /** Associated canvas */
  canvas?: { context?: { cursorStatus: { setCurrentStatus(cursor: unknown): void } } };
  
  /** Layer containing this gizmo */
  layer?: { addChild(child: unknown): void; removeChild(child: unknown): void };
  
  /** Rendering context */
  context?: { needsRendering: boolean };
  
  /** Lifecycle hook called on deactivation */
  onDeactivate(): void;
  
  /** Lifecycle hook called on cleanup */
  onCleanup(): void;
}

/**
 * 3D Roof Initialization Edge Triangle Gizmo
 * 
 * An interactive visual control that allows users to adjust the start position
 * of a roof edge. Consists of a triangle pointer, circular handle, and connecting lines.
 * Supports hover states, selection, and dynamic scaling based on camera distance.
 */
declare class RoofInitEdgeTriangleGizmo extends BaseGizmo {
  /**
   * Creates a new roof edge triangle gizmo
   * 
   * @param canvas - The rendering canvas
   * @param layer - The scene layer to attach to
   * @param line - The 2D line segment representing the roof edge
   * @param roof - The roof model this gizmo controls
   * @param height - Vertical offset from ground plane
   * @param offset - Additional offset for positioning
   * @param isSelected - Whether the gizmo starts in selected state
   */
  constructor(
    canvas: unknown,
    layer: unknown,
    line: Line2D,
    roof: RoofModel,
    height: number,
    offset: number,
    isSelected: boolean
  );

  // Private properties
  private _line: Line2D;
  private _roof: RoofModel;
  private _height: number;
  private _offset: number;
  private _scale: number;
  private _isSelected: boolean;
  
  /** Root node containing all visual elements */
  node?: Node;
  
  /** Array of child mesh nodes (triangle, circle, edges) */
  elements: Node[];
  
  // Materials
  private _lineMaterial: LineMeshMaterial;
  private _circleMaterial: MeshBasicMaterial;
  private _triangleMaterial: MeshBasicMaterial;

  /**
   * Transform a node to roof coordinate space
   * Rotates -90° around X-axis and applies height offset
   * 
   * @param node - Node to transform
   * @param additionalOffset - Extra vertical offset (default 0)
   * @returns The transformed node
   */
  private _transformNode(node: Node, additionalOffset?: number): Node;

  /**
   * Create the triangle pointer mesh
   * Constructs a curved triangle shape pointing toward the roof edge
   * 
   * @param segments - Array of line segments with control points
   * @returns Mesh node for the triangle
   */
  private _createTriNode(segments: Array<[Vector2, Vector2, Vector2, Vector2]>): Node;

  /**
   * Create the circular handle mesh
   * A filled circle that users can interact with
   * 
   * @param points - Array of points defining the circle perimeter
   * @returns Mesh node for the circle
   */
  private _createCirNode(points: Vector2D[]): Node;

  /**
   * Create the edge lines mesh
   * Outlines the circle handle
   * 
   * @param points - Array of points defining the line path
   * @returns Mesh node for the edges
   */
  private _createEdgeNode(points: Vector2D[]): Node;

  /**
   * Create the complete gizmo node hierarchy
   * Assembles triangle, circle, and edge elements
   */
  private _createNode(): void;

  /**
   * Update scale based on camera distance
   * Ensures gizmo remains visible at all zoom levels
   */
  private _updateScale(): void;

  /**
   * Draw the gizmo (creates if not exists)
   * Makes the gizmo visible and triggers rendering
   */
  draw(): void;

  /**
   * Show the gizmo
   * Makes an existing gizmo visible
   */
  show(): void;

  /**
   * Hide the gizmo
   * Makes the gizmo invisible without destroying it
   */
  hide(): void;

  /**
   * Cleanup when gizmo is deactivated
   */
  onDeactivate(): void;

  /**
   * Cleanup when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Remove the gizmo node from scene
   * Clears all child elements and resets state
   */
  private _clearNode(): void;

  /**
   * Handle mouse over event
   * Updates cursor and applies hover styling
   * 
   * @param event - Mouse event data
   */
  onMouseOver(event: MouseEventData): void;

  /**
   * Handle mouse out event
   * Restores default cursor and styling
   * 
   * @param event - Mouse event data
   */
  onMouseOut(event: MouseEventData): void;

  /**
   * Handle mouse down event
   * Executes command to update roof direction when clicked
   * 
   * @param event - Mouse event data
   */
  onMouseDown(event: MouseEventData): void;

  /**
   * Check if gizmo is in selected state
   * 
   * @returns True if selected
   */
  isSelected(): boolean;

  /**
   * Recalculate scale and redraw gizmo
   * Called when camera distance changes significantly
   */
  updateScale(): void;
}

export default RoofInitEdgeTriangleGizmo;