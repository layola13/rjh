/**
 * Module: DoubleSashTool
 * Tool for creating and managing double sash windows with hardware configurations
 */

import { FenesTool, ToolType } from './FenesTool';
import { ShapeType } from './ShapeType';

/**
 * Represents a sash element within a double sash configuration
 */
interface ISash {
  /**
   * Tests if a point intersects with this sash
   * @param point - The point to test for intersection
   * @returns True if the point hits the sash
   */
  hitTest(point: unknown): boolean;

  /**
   * Manager for hardware components (handles, hinges)
   */
  hardwareManager: IHardwareManager;

  /**
   * Updates the polygon geometry of the sash
   */
  updatePoly(): void;

  /**
   * Renders the sash in the given view
   * @param view - The view context for rendering
   */
  draw(view: IView): void;
}

/**
 * Manages hardware components like handles and hinges
 */
interface IHardwareManager {
  /**
   * Type of handle attached to the sash
   */
  handleType?: string | number;

  /**
   * Type of hinge attached to the sash
   */
  hingeType?: string | number;
}

/**
 * Represents a double sash configuration containing multiple sash elements
 */
interface IDoubleSash {
  /**
   * Array of sash elements in this configuration
   */
  sashes: ISash[];

  /**
   * Renders the double sash in the given view
   * @param view - The view context for rendering
   */
  draw(view: IView): void;
}

/**
 * Manages sash elements within a shape
 */
interface ISashManager {
  /**
   * Collection of double sash configurations
   */
  doubleSashes: IDoubleSash[];
}

/**
 * Represents a shape element in the scene
 */
interface IShape {
  /**
   * Manager for sash configurations within this shape
   */
  sashManager: ISashManager;
}

/**
 * Manages all shapes in the scene
 */
interface IShapeManager {
  /**
   * Collection of all shapes
   */
  shapem: IShape[];

  /**
   * Adds a double sash configuration to the scene
   * @param position - Position or configuration data for the double sash
   * @param shapeType - Type of shape to create
   */
  addDoubleSash(position: unknown, shapeType: ShapeType): void;

  /**
   * Optimizes handle dimensions across all shapes
   */
  optimizeHandleDim(): void;
}

/**
 * Represents the rendering view context
 */
interface IView {
  /**
   * Manager for all shapes in the view
   */
  shapeManager: IShapeManager;

  /**
   * Refreshes the view to reflect changes
   */
  refresh(): void;
}

/**
 * Tool for creating and configuring double sash windows with hardware options.
 * Extends FenesTool to provide specialized double sash functionality.
 */
export class DoubleSashTool extends FenesTool {
  /**
   * Type of handle to apply to sashes (optional)
   */
  handleType?: string | number;

  /**
   * Type of hinge to apply to sashes (optional)
   */
  hingeType?: string | number;

  /**
   * Mapping of tool types to their corresponding shape types
   */
  shapeTypes: Map<ToolType, ShapeType>;

  /**
   * Creates a new DoubleSashTool instance
   * @param view - The view context for rendering
   * @param toolType - The type of tool (doubleSash or doubleScreen)
   * @param handleType - Optional handle type to apply
   * @param hingeType - Optional hinge type to apply
   */
  constructor(
    view: IView,
    toolType: ToolType,
    handleType?: string | number,
    hingeType?: string | number
  ) {
    super(view, toolType);
    this.handleType = handleType;
    this.hingeType = hingeType;
    this.shapeTypes = new Map([
      [ToolType.doubleSash, ShapeType.DoubleSash],
      [ToolType.doubleScreen, ShapeType.DoubleScreen]
    ]);
  }

  /**
   * Adds a new double sash configuration to the scene at the specified position.
   * If hardware types are configured, applies them to all sashes in the configuration.
   * @param position - Position or configuration data for the new double sash
   */
  addFenes(position: unknown): void {
    // Add the double sash shape to the scene
    this.view.shapeManager.addDoubleSash(
      position,
      this.shapeTypes.get(this.name)!
    );

    // Apply hardware types if configured
    if (this.handleType || this.hingeType) {
      // Find all double sashes that intersect with the given position
      const affectedDoubleSashes = this.view.shapeManager.shapem
        .map((shape: IShape) => shape.sashManager.doubleSashes)
        .flat()
        .filter((doubleSash: IDoubleSash) =>
          doubleSash.sashes.find((sash: ISash) => sash.hitTest(position))
        );

      // Update hardware for each affected sash
      affectedDoubleSashes.forEach((doubleSash: IDoubleSash) => {
        doubleSash.sashes.forEach((sash: ISash) => {
          if (this.handleType) {
            sash.hardwareManager.handleType = this.handleType;
          }
          if (this.hingeType) {
            sash.hardwareManager.hingeType = this.hingeType;
          }
          sash.updatePoly();
          sash.draw(this.view);
        });
        doubleSash.draw(this.view);
      });

      // Optimize handle dimensions across all shapes
      this.view.shapeManager.optimizeHandleDim();
      this.view.refresh();
    }
  }
}