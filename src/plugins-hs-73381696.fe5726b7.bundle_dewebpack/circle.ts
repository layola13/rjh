import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';

class Circle2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2dController {
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.SlabEdit.MoveCurve;
  }
}

export class Circle extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2d {
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    radius: number
  ) {
    super(param1, param2, param3, radius, new Circle2dController(radius, param1));
  }

  protected _updateStyle(): void {
    super._updateStyle();
    
    if (this.entity?.srcModel?.topos?.includes('background')) {
      this.element[0].attr({
        'stroke-width': 2.4
      });
    }
  }

  public onFlagChanged(flag: unknown): void {
    super.onFlagChanged(flag);
    
    const entity = this.entity;
    if (entity?.srcModel?.topos?.includes('background')) {
      EdgeUtil.syncPointsFlag(entity, flag);
    }
  }
}