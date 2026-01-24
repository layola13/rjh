import { Point, Vector } from './geometry';
import { BaseRobot } from './BaseRobot';
import { PolyCraft } from './PolyCraft';
import { ToolType } from './ToolType';
import { Polygon } from './Polygon';
import { Shape } from './Shape';
import { ShapeHelper, DisplayUtils, ShapeColor } from './utils';

/**
 * DragRobot - Interactive drag handle robot for shape manipulation
 * 
 * Provides a visual drag handle that attaches to shapes and allows users
 * to reposition them within the canvas. The robot automatically positions
 * itself relative to the host shape's top-left corner.
 */
export declare class DragRobot extends BaseRobot {
  /**
   * Reference to the canvas view/layer where the robot is rendered
   */
  private view: any;

  /**
   * The shape that this drag robot is currently attached to
   */
  private hostShape?: Shape;

  /**
   * Array of geometric shape definitions (polygons)
   */
  private shapes: Polygon[];

  /**
   * Array of visual shape objects rendered on canvas
   */
  private vshapes: any[];

  /**
   * Size/radius of the drag robot handle
   */
  private rsize: number;

  /**
   * Creates a new DragRobot instance
   * @param view - The canvas view/layer to render the robot on
   */
  constructor(view: any);

  /**
   * Attaches the robot to a parent container or view
   * @param container - The container element to attach to
   */
  attachTo(container: any): void;

  /**
   * Hides the drag robot visual element
   */
  hide(): void;

  /**
   * Attaches the drag robot to a specific shape, positioning it
   * at the top-left corner relative to the shape's bounds
   * @param shape - The target shape to attach the drag handle to
   */
  attach(shape: Shape): void;

  /**
   * Tests if a point hits/intersects the drag robot's clickable area
   * @param point - The point to test for intersection
   * @returns True if the point is within the robot's bounds and visible
   */
  hitBar(point: Point): boolean;

  /**
   * Handles drag movement, translating both the robot and its host shape
   * @param vector - The translation vector representing drag displacement
   */
  drag(vector: Vector): void;

  /**
   * Gets the primary visual object representing the drag robot
   * @returns The visual shape element
   */
  get visualObj(): any;

  /**
   * Creates the geometric polygon shape for the drag handle icon
   * Uses a cross/plus symbol design composed of relative vectors
   * @param size - Base size parameter for scaling the icon
   * @returns A polygon representing the drag handle geometry
   */
  private createDragShape(size: number): Polygon;
}