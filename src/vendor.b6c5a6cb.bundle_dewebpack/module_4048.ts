import { DisplayObject } from '@pixi/display';
import { Point } from '@pixi/math';

declare module '@pixi/display' {
  interface DisplayObject {
    getGlobalPosition(point?: Point, skipUpdate?: boolean): Point;
  }
}

DisplayObject.prototype.getGlobalPosition = function(
  point?: Point,
  skipUpdate: boolean = false
): Point {
  const resultPoint = point ?? new Point();
  
  if (this.parent) {
    return this.parent.toGlobal(this.position, resultPoint, skipUpdate);
  }
  
  resultPoint.x = this.position.x;
  resultPoint.y = this.position.y;
  
  return resultPoint;
};