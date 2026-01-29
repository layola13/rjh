import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

type Entity = {
  srcModel: {
    topos: string[];
  };
};

type SVGElement = {
  attr(attributes: Record<string, number | string>): void;
};

class Circle extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2d {
  entity: Entity;
  element: SVGElement[];

  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    radius: number
  ) {
    super(param1, param2, param3, radius, new CircleController(radius, param1));
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

class CircleController extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2dController {
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.OutdoorDrawing.MoveCurve;
  }
}

export { Circle };