import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';

class Line2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Line2dController {
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.RoofsDrawing.MoveCurve;
  }
}

export class Line extends HSApp.View.SVG.ExtraordinarySketch2d.Line2d {
  constructor(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown,
    fourthParam: unknown
  ) {
    super(
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      new Line2dController(fourthParam, firstParam)
    );
  }

  protected _updateStyle(): void {
    super._updateStyle();
    
    if (this.entity.srcModel.topos.includes('background')) {
      this.element[0].attr({
        'stroke-width': 2.4
      });
    }
  }

  onFlagChanged(flag: unknown): void {
    super.onFlagChanged(flag);
    
    const entity = this.entity;
    if (entity.srcModel.topos.includes('background')) {
      EdgeUtil.syncPointsFlag(entity, flag);
    }
  }
}