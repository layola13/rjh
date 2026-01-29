import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

interface LineEntity {
  srcModel: {
    topos: string[];
  };
}

interface LineElement {
  attr(attributes: Record<string, number>): void;
}

interface LineController {
  entity: LineEntity;
}

export class Line extends HSApp.View.SVG.ExtraordinarySketch2d.Line2d {
  declare entity: LineEntity;
  declare element: LineElement[];

  constructor(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown,
    fourthParam: unknown
  ) {
    const controller = new Line2dControllerExtension(
      fourthParam,
      firstParam
    );
    super(firstParam, secondParam, thirdParam, fourthParam, controller);
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

class Line2dControllerExtension extends HSApp.View.SVG.ExtraordinarySketch2d.Line2dController {
  constructor(...args: unknown[]) {
    super(...args);
  }

  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.OutdoorDrawing.MoveCurve;
  }
}