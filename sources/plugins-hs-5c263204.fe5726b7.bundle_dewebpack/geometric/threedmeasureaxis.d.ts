import { Node, Vector3, Quaternion, LineDashedMaterial, MeshBasicMaterial, RasterizerCullMode } from './367441';
import { SignalHook } from './signal-hook';
import { Context3D } from './context';
import { Layer } from './layer';
import { Entity, Group } from './entity';

/**
 * Axis type identifier for coordinate system display
 */
type AxisType = 'x' | 'y' | 'z';

/**
 * Position information for axis line segment
 */
interface AxisLinePosition {
  /** Line type (x, y, or z axis) */
  type: AxisType;
  /** Start point of the line */
  start: Point3D;
  /** End point of the line */
  end: Point3D;
}

/**
 * 3D point coordinates
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Camera information for view transformation
 */
interface Camera {
  x: number;
  y: number;
  z: number;
  /** Camera type: first-person or orbit view */
  type: 'firstperson' | 'orbitview';
}

/**
 * Application context interface
 */
interface AppContext {
  needsRendering: boolean;
  signalCameraChanged: unknown;
}

/**
 * 3D measurement axis gizmo for displaying coordinate system axes and dimension indicators
 * 
 * This class renders visual guides showing the X, Y, and Z axes with directional arrows,
 * dashed bounding boxes, and dynamically scaled indicators based on camera distance.
 * 
 * @extends HSApp.View.T3d.Gizmo
 */
export declare class ThreedmeasureAxis extends HSApp.View.T3d.Gizmo {
  /**
   * Map storing axis line positions keyed by identifier
   */
  positionMap: Map<string, AxisLinePosition>;
  
  /**
   * Array of line mesh nodes representing axis lines and bounding box
   */
  lines: Node[];
  
  /**
   * Map of arrow mesh nodes keyed by position identifier
   */
  arrowMeshs: Map<string, Node>;
  
  /**
   * Signal hook for listening to context changes
   */
  signalHook: SignalHook;
  
  /**
   * Root node containing all visual elements
   */
  node?: Node;
  
  /**
   * Rendering layer for the gizmo
   */
  layer: Layer;
  
  /**
   * 3D rendering context
   */
  context?: AppContext;
  
  /**
   * Entity being measured/displayed
   */
  entity: Entity;
  
  /**
   * Flag indicating if the gizmo needs redrawing
   */
  dirty: boolean;
  
  /**
   * @param entity - The entity to attach the axis gizmo to
   * @param layer - The rendering layer
   * @param context - The 3D rendering context
   */
  constructor(entity: Entity, layer: Layer, context: AppContext);
  
  /**
   * Hides the axis gizmo and removes all visual elements from the scene
   */
  hide(): void;
  
  /**
   * Creates and adds all mesh elements (lines, arrows, bounding box) to the scene
   * @private
   */
  private _drawMesh(): void;
  
  /**
   * Updates or initializes the mesh if needed and marks context for re-rendering
   */
  updateMesh(): void;
  
  /**
   * Checks if the gizmo should be visible based on entity visibility and command state
   * @returns True if the gizmo can be shown
   */
  canShow(): boolean;
  
  /**
   * Validates that a line has valid start and end points
   * @param line - The axis line position to check
   * @returns True if the line is valid
   */
  checkLine(line: AxisLinePosition): boolean;
  
  /**
   * Creates colored line meshes for each axis based on position map
   * - X axis: color 0xF7403C (red)
   * - Y axis: color 0x327FFF (blue)
   * - Z axis: color 0x50C878 (green)
   * @private
   */
  private _createLines(): void;
  
  /**
   * Creates a single line mesh between two points with specified material
   * @param start - Start point in model space
   * @param end - End point in model space
   * @param material - Line material
   * @returns Line mesh node
   * @private
   */
  private _createLine(start: Point3D, end: Point3D, material: unknown): Node;
  
  /**
   * Creates a dashed bounding box mesh from all axis lines
   * @private
   */
  private _createDashBox(): void;
  
  /**
   * Builds arrow meshes at the end of each axis line for directional indication
   * - X axis arrow: color 0xF7403C (red)
   * - Y axis arrow: color 0x327FFF (blue)
   * - Z axis arrow: color 0x50C878 (green)
   * @private
   */
  private _buildArrowMeshs(): void;
  
  /**
   * Constructs a triangular arrow mesh at specified position
   * @param color - RGB color value for the arrow
   * @param position - World position for arrow placement
   * @param height - Arrow height
   * @param width - Arrow width
   * @returns Arrow mesh node
   * @private
   */
  private _buildArrowMesh(
    color: number,
    position: Point3D,
    height: number,
    width: number
  ): Node;
  
  /**
   * Calculates arrow rotation to face the camera
   * @param camera - Camera position
   * @param direction - Direction vector from line start to end
   * @param arrowPosition - Position of the arrow
   * @returns Rotation quaternion
   * @private
   */
  private _getArrowRotation(
    camera: Camera,
    direction: Vector3,
    arrowPosition: Point3D
  ): Quaternion;
  
  /**
   * Handler for camera change events
   * @private
   */
  private _onContentFieldChange(): void;
  
  /**
   * Draws or updates the axis gizmo with proper scaling based on camera distance
   */
  draw(): void;
  
  /**
   * Updates the axis gizmo with new position data
   * @param positionMap - New map of axis line positions
   */
  updateAxisGizmo(positionMap: Map<string, AxisLinePosition>): void;
  
  /**
   * Calculates appropriate scale for gizmo based on camera distance and type
   * @param camera - Active camera
   * @returns Scale vector
   * @private
   */
  private _getGizmoScale(camera: Camera): Vector3;
  
  /**
   * Cleanup method called when gizmo is destroyed
   * Removes all visual elements and disposes resources
   */
  onCleanup(): void;
  
  /**
   * Gets the world position of the entity being measured
   * @returns Entity position as THREE.Vector3
   */
  get contentPosition(): THREE.Vector3;
}