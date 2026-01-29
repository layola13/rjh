import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';

interface Entity {
  srcModel: {
    topos: string[];
  };
}

interface CircleArcController {
  entity: Entity;
  element: Array<{
    attr(attributes: Record<string, number>): void;
  }>;
}

class CircleArc2dController extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2dController {
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.OutdoorDrawing.MoveCurve;
  }
}

export class CircleArc extends HSApp.View.SVG.ExtraordinarySketch2d.CircleArc2d implements CircleArcController {
  entity!: Entity;
  element!: Array<{
    attr(attributes: Record<string, number>): void;
  }>;

  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ) {
    super(param1, param2, param3, param4, new CircleArc2dController(param4, param1));
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