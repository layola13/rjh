import { Vector3 } from './Vector3';
import { ActiveContext, ActiveType } from './ActiveContext';
import { Gizmo } from './Gizmo';

/**
 * Represents a position in 3D space with x, y, z coordinates
 */
interface Position3D {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Represents a 3D line segment with directional properties
 */
interface Line3D {
  /**
   * Checks if this route segment is a 3D line
   */
  isLine3d(): boolean;
  
  /**
   * Gets the direction vector of the line
   */
  getDirection(): Vector3;
  
  /**
   * Projects a point onto this line
   * @param point - The point to project
   * @returns The projected point on the line
   */
  getProjectedPtBy(point: Vector3): Vector3;
}

/**
 * Represents a route segment that can be either a line or curve
 */
type RouteSegment = Line3D;

/**
 * Tube geometry object with routing information
 */
interface Tube {
  /**
   * Array of route segments defining the tube's path
   */
  route: RouteSegment[];
  
  /**
   * Gets the center point of the tube
   */
  getCenter(): Vector3;
  
  /**
   * Gets the unique route representation of the tube
   */
  getUniqueRoute(): RouteSegment | null;
}

/**
 * Controller for handling tube interactions
 */
interface TubeController {
  // Controller implementation details
}

/**
 * Configuration options for tube gizmo initialization
 */
interface TubeGizmoOptions {
  /**
   * Z-coordinate override for positioning
   */
  z?: number;
}

/**
 * Context object for graphics rendering
 */
interface RenderContext {
  // Context properties
}

/**
 * Scene or container object for 3D objects
 */
interface Scene {
  // Scene properties
}

/**
 * Options object containing controller reference
 */
interface ControllerOptions {
  /**
   * The tube controller instance
   */
  controller: TubeController;
}

/**
 * Box gizmo for tube visualization
 */
declare class TubeBox {
  constructor(context: RenderContext, scene: Scene, tube: Tube);
}

/**
 * Main manipulation gizmo (likely position/rotation handle)
 */
declare class MainTubeGizmo {
  constructor(
    context: RenderContext,
    scene: Scene,
    tube: Tube,
    activeContext: ActiveContext,
    position: Vector3
  );
}

/**
 * Secondary tube gizmo component
 */
declare class SecondaryTubeGizmo {
  constructor(
    context: RenderContext,
    scene: Scene,
    tube: Tube,
    position: Vector3
  );
}

/**
 * Controller for tube lifting (vertical movement) operations
 */
declare class TubeLiftController {
  constructor(
    tube: Tube,
    context: RenderContext,
    controller: TubeController,
    activeType: ActiveType,
    activeContext: ActiveContext,
    position: Vector3
  );
}

/**
 * Gizmo for lifting tubes vertically
 */
declare class TubeLift {
  constructor(
    context: RenderContext,
    scene: Scene,
    tube: Tube,
    size: number,
    opacity: number,
    controller: TubeLiftController,
    activeType: ActiveType,
    activeContext: ActiveContext
  );
}

/**
 * Controller for tube movement (horizontal translation) operations
 */
declare class TubeMovementController {
  constructor(
    tube: Tube,
    context: RenderContext,
    controller: TubeController,
    activeType: ActiveType,
    activeContext: ActiveContext,
    position: Vector3
  );
}

/**
 * Gizmo for moving tubes horizontally
 */
declare class TubeMovement {
  constructor(
    context: RenderContext,
    scene: Scene,
    rotation: number,
    tube: Tube,
    size: number,
    controller: TubeMovementController,
    activeType: ActiveType,
    activeContext: ActiveContext
  );
}

/**
 * Composite gizmo for tube manipulation
 * Combines multiple child gizmos (box, lift, movement) based on tube geometry
 * 
 * @extends Gizmo
 */
export default class TubeGizmo extends Gizmo {
  /**
   * The tube object being manipulated
   */
  readonly tube: Tube;

  /**
   * Creates a new tube gizmo with appropriate child gizmos based on tube orientation
   * 
   * @param context - The rendering context
   * @param scene - The scene to add gizmos to
   * @param tube - The tube object to manipulate
   * @param options - Controller options
   * @param position - Initial position configuration
   */
  constructor(
    context: RenderContext,
    scene: Scene,
    tube: Tube,
    options: ControllerOptions,
    position: TubeGizmoOptions
  );

  /**
   * Calculates the position on the tube's route
   * Projects the given position onto the tube's unique route if it's a 3D line
   * 
   * @param position - The position to project onto the tube
   * @returns The calculated position on the tube, or the original position if no valid route
   */
  getTubePosition(position: Position3D): Vector3;

  /**
   * Adds a child gizmo to this composite gizmo
   * @param gizmo - The child gizmo to add
   */
  protected addChildGizmo(gizmo: unknown): void;
}