import { HSApp } from './HSApp';

class Point2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Point2dController {
  protected _getMoveCmdType(): number {
    return HSFPConstants.CommandType.RoofsDrawing.MovePoint;
  }
}

export class Point extends HSApp.View.SVG.ExtraordinarySketch2d.Point2d {
  constructor(
    x: number,
    y: number,
    sketchId: string,
    parentElement: SVGElement,
  ) {
    super(x, y, sketchId, parentElement, new Point2dController(parentElement, x));
  }
}