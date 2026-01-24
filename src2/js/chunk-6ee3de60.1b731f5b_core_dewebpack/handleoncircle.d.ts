import type { Vector } from './vector';
import type { Direction } from './direction';
import type { OpenDirection } from './openDirection';
import type { ShapeType } from './shapeType';

/**
 * Represents the shape of hardware components
 */
export enum HardwareShape {
  Handle = 'Handle'
}

/**
 * Base class for hardware elements positioned on a circular path
 */
export declare class HardwareOnCircle {
  /**
   * The manager instance controlling this hardware element
   */
  manager: unknown;

  /**
   * The shape type of the hardware
   */
  hardwareShape: HardwareShape;

  /**
   * Dimension properties for the hardware
   */
  dim: {
    hidden: boolean;
  };

  /**
   * Clone data from another hardware instance
   * @param source - Source hardware instance to clone from
   * @returns This instance for method chaining
   */
  cloneFrom(source: HardwareOnCircle): this;

  /**
   * Fix and normalize hardware data
   * @param data - Raw hardware data to normalize
   * @returns Normalized hardware data
   */
  fixData(data: Partial<HardwareData>): HardwareData;
}

/**
 * Data structure for hardware configuration
 */
export interface HardwareData {
  /**
   * The shape type of the hardware
   */
  hardwareShape: HardwareShape;
  
  // Additional properties can be defined based on actual usage
  [key: string]: unknown;
}

/**
 * Manager interface for controlling hardware elements
 */
export interface HardwareManager {
  /**
   * The direction in which the hardware opens
   */
  openDirection: OpenDirection;
}

/**
 * Handle hardware component positioned on a circular path.
 * Extends HardwareOnCircle to provide handle-specific functionality.
 */
export declare class HandleOnCircle extends HardwareOnCircle {
  /**
   * The manager instance controlling this handle
   */
  manager: HardwareManager;

  /**
   * Creates a new HandleOnCircle instance
   * @param manager - Manager instance that controls this handle
   */
  constructor(manager: HardwareManager);

  /**
   * Gets the docking direction based on the manager's open direction.
   * The dock direction is opposite to the open direction:
   * - Up → Down
   * - Down → Up
   * - Left → Right
   * - Right → Left
   */
  get dockDirection(): Direction;

  /**
   * Clone data from another HandleOnCircle instance
   * @param source - Source handle instance to clone from
   * @returns This instance for method chaining
   */
  cloneFrom(source: HandleOnCircle): this;

  /**
   * Create a new HandleOnCircle instance with cloned data
   * @returns New HandleOnCircle instance with identical properties
   */
  recreate(): HandleOnCircle;

  /**
   * Determines the hardware shape direction vector based on open direction.
   * - For Up/Down: returns horizontal vector (1, 0)
   * - For Left/Right: returns vertical vector (0, 1)
   * @returns Direction vector for the hardware shape
   */
  hardwareShapeDirection(): Vector;

  /**
   * Fix and normalize handle-specific data.
   * Ensures hardwareShape is set to Handle if undefined.
   * @param data - Raw handle data to normalize
   * @returns Normalized handle data
   */
  fixData(data: Partial<HardwareData>): HardwareData;
}