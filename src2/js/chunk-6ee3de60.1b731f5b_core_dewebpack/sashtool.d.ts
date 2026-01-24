import { ToolType } from './ToolType';
import { FenesTool } from './FenesTool';
import { ShapeType } from './ShapeType';

/**
 * Tool for managing sash, screen, and guard sash elements in the view.
 * Handles adding fenes with configurable hardware types (handles and hinges).
 */
export class SashTool extends FenesTool {
  /**
   * Optional handle hardware type to apply to sashes
   */
  private readonly handleType?: string;

  /**
   * Optional hinge hardware type to apply to sashes
   */
  private readonly hingeType?: string;

  /**
   * Mapping of tool types to their corresponding shape types
   */
  private readonly shapeTypes: Map<ToolType, ShapeType>;

  /**
   * Creates a new SashTool instance
   * 
   * @param view - The view context for rendering shapes
   * @param toolType - The type of tool (sash, screen, or guardSash)
   * @param handleType - Optional handle hardware type
   * @param hingeType - Optional hinge hardware type
   */
  constructor(
    view: unknown,
    toolType: ToolType,
    handleType?: string,
    hingeType?: string
  ) {
    super(view, toolType);
    this.handleType = handleType;
    this.hingeType = hingeType;
    this.shapeTypes = new Map<ToolType, ShapeType>([
      [ToolType.sash, ShapeType.Sash],
      [ToolType.screen, ShapeType.Screen],
      [ToolType.guardSash, ShapeType.GuardSash]
    ]);
  }

  /**
   * Adds fenes (window/door elements) to the view and applies hardware types
   * 
   * @param element - The fenes element to add
   */
  addFenes(element: unknown): void {
    const shapeType = this.shapeTypes.get(this.name);
    this.view.shapeManager.addSash(element, shapeType);

    // Apply hardware types if configured
    if (this.handleType || this.hingeType) {
      this.view.shapeManager.shapem
        .map(shape => shape.sashManager.sashes)
        .flat()
        .filter(sash => sash.hitTest(element))
        .forEach(sash => {
          if (this.handleType) {
            sash.hardwareManager.handleType = this.handleType;
          }
          if (this.hingeType) {
            sash.hardwareManager.hingeType = this.hingeType;
          }
          sash.updatePoly();
          sash.draw(this.view);
        });

      this.view.shapeManager.optimizeHandleDim();
      this.view.refresh();
    }
  }
}