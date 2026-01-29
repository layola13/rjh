import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

/**
 * Circle arc view for 2D sketch in background topology
 * Extends the base CircleArc2d with custom styling and flag handling
 */
export class CircleArc extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2d {
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    model: unknown
  ) {
    super(param1, param2, param3, model, new CircleArcController(model, param1));
  }

  /**
   * Update visual style for the arc element
   * Applies special stroke width for background topology elements
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
   * Handle flag state changes for the arc
   * Synchronizes point flags for background topology elements
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
 * Controller for CircleArc interactions
 * Handles move commands specific to slab editing
 */
class CircleArcController extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2dController {
  /**
   * Returns the command type for moving this curve
   */
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.SlabEdit.MoveCurve;
  }
}