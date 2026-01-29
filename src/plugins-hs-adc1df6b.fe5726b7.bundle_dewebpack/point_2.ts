import { HSApp } from './HSApp';

class Point2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Point2dController {
  protected _getMoveCmdType(): number {
    return HSFPConstants.CommandType.OutdoorDrawing.MovePoint;
  }
}

export class Point extends HSApp.View.SVG.ExtraordinarySketch2d.Point2d {
  constructor(
    x: number,
    y: number,
    radius: number,
    container: unknown,
  ) {
    super(x, y, radius, container, new Point2dController(container, x));
  }
}