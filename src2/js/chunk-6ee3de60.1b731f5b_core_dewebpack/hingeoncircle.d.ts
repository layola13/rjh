import { Direction } from './Direction';
import { ShapeType } from './ShapeType';
import { HardwareOnCircle, HardwareShape } from './HardwareOnCircle';

/**
 * Represents a hinge hardware component positioned on a circular path.
 * Extends HardwareOnCircle to provide hinge-specific positioning and behavior.
 */
export class HingeOnCircle extends HardwareOnCircle {
  /**
   * Reference to the manager that controls this hinge instance.
   */
  manager: HingeManager;

  /**
   * Distance from the baseline reference point.
   * @internal
   */
  private _distanceFromBaseline: number;

  /**
   * Creates a new HingeOnCircle instance.
   * @param manager - The manager responsible for controlling this hinge
   */
  constructor(manager: HingeManager) {
    super(manager, ShapeType.Hinge);
    this.manager = manager;
    this._distanceFromBaseline = 0;
    this.hardwareShape = HardwareShape.HingeOnCircle;
    this.dim.hidden = true;
  }

  /**
   * Gets the docking direction based on manager orientation and hinge index.
   * For vertical managers: returns Left or Right direction.
   * For horizontal managers: returns Up or Down direction.
   */
  get dockDirection(): Direction {
    const directions = this.manager.isVertical
      ? [Direction.Left, Direction.Right]
      : [Direction.Up, Direction.Down];
    return directions[this.index];
  }

  /**
   * Gets the index of this hinge within the manager's hinge collection.
   * Returns -1 if the hinge is not found in the collection.
   */
  get index(): number {
    return this.manager.hinges.findIndex((hinge) => hinge === this);
  }

  /**
   * Clones properties from another HingeOnCircle instance.
   * @param source - The source hinge to clone from
   * @returns This instance for method chaining
   */
  cloneFrom(source: HingeOnCircle): this {
    super.cloneFrom(source);
    return this;
  }

  /**
   * Creates a new HingeOnCircle instance with cloned properties.
   * @returns A new HingeOnCircle instance with identical properties
   */
  recreate(): HingeOnCircle {
    return new HingeOnCircle(this.manager).cloneFrom(this);
  }

  /**
   * Determines the directional vector for the hardware shape.
   * Returns horizontal vector (1,0) for left/right open managers.
   * Returns vertical vector (0,1) for other orientations.
   * @returns A 2D vector representing the hardware shape direction
   */
  hardwareShapeDirection(): Vector2D {
    return this.manager.isLeftOpen || this.manager.isRightOpen
      ? createVector(1, 0)
      : createVector(0, 1);
  }

  /**
   * Fixes and validates hardware data, ensuring required properties are set.
   * Sets hardwareShape to HingeOnCircle if undefined.
   * @param data - The hardware data to fix
   * @returns The fixed hardware data with all required properties
   */
  fixData(data: HardwareData): HardwareData {
    const fixedData = super.fixData(data);
    if (fixedData.hardwareShape === undefined) {
      fixedData.hardwareShape = HardwareShape.HingeOnCircle;
    }
    return fixedData;
  }
}

/**
 * Manager interface for controlling hinge instances.
 */
interface HingeManager {
  /** Collection of hinges managed by this manager */
  hinges: HingeOnCircle[];
  /** Indicates if the manager operates in vertical orientation */
  isVertical: boolean;
  /** Indicates if the manager's left side is open */
  isLeftOpen: boolean;
  /** Indicates if the manager's right side is open */
  isRightOpen: boolean;
}

/**
 * 2D vector representation for directional calculations.
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * Hardware data structure for serialization and validation.
 */
interface HardwareData {
  hardwareShape?: HardwareShape;
  [key: string]: unknown;
}

/**
 * Creates a 2D vector with the specified x and y components.
 * @param x - The x component
 * @param y - The y component
 * @returns A new Vector2D instance
 */
declare function createVector(x: number, y: number): Vector2D;