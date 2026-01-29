import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';

interface Point2D {
  x: number;
  y: number;
}

interface TopoEntity {
  srcModel: {
    topos: string[];
  };
}

interface LineEntity extends TopoEntity {
  // Add additional entity properties as needed
}

interface SVGElement {
  attr(attributes: Record<string, number | string>): void;
}

/**
 * Line2d component for extraordinary sketch
 * Extends the base Line2d class with custom styling and flag change handling
 */
export class Line extends HSApp.View.SVG.ExtraordinarySketch2d.Line2d {
  declare entity: LineEntity;
  declare element: SVGElement[];

  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ) {
    const controller = new Line2dController(param4, param1);
    super(param1, param2, param3, param4, controller);
  }

  /**
   * Updates the visual style of the line
   * Applies thicker stroke width for background topology elements
   */
  protected _updateStyle(): void {
    super._updateStyle();
    
    if (this.entity.srcModel.topos.includes('background')) {
      this.element[0].attr({
        'stroke-width': 2.4
      });
    }
  }

  /**
   * Handles flag changes for the line entity
   * Synchronizes point flags for background topology elements
   * @param flag - The flag value to set
   */
  onFlagChanged(flag: unknown): void {
    super.onFlagChanged(flag);
    
    const entity = this.entity;
    if (entity.srcModel.topos.includes('background')) {
      EdgeUtil.syncPointsFlag(entity, flag);
    }
  }
}

/**
 * Controller for Line2d interactions
 * Handles move commands for slab editing
 */
class Line2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Line2dController {
  /**
   * Returns the command type for move operations
   * @returns The slab edit move curve command type
   */
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.SlabEdit.MoveCurve;
  }
}