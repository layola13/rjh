import { HSCore } from './HSCore';

interface Edge {
  sketch: Sketch;
  srcModel: unknown;
  isFlagOn(flag: number): boolean;
}

interface Sketch {
  findMapModel(point: unknown): SketchPoint;
}

interface SketchPoint {
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

export class EdgeUtil {
  /**
   * Synchronizes point flags based on edge flag state
   * @param edge - The edge entity to sync flags from
   * @param flag - The flag type to synchronize
   */
  static syncPointsFlag(edge: Edge, flag: number): void {
    if (
      flag === HSCore.Model.ExSketchFlagEnum.hoverOn ||
      flag === HSCore.Model.EntityFlagEnum.selected
    ) {
      const sketch = edge.sketch;
      let drivenFlag = 0;

      if (flag === HSCore.Model.EntityFlagEnum.selected) {
        drivenFlag = HSCore.Model.ExSketchFlagEnum.selectedDriven;
      } else if (flag === HSCore.Model.ExSketchFlagEnum.hoverOn) {
        drivenFlag = HSCore.Model.ExSketchFlagEnum.hoverOnDriven;
      }

      const isFlagActive = edge.isFlagOn(flag);
      const points = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromEdges([edge.srcModel]);
      
      points
        .map((point) => sketch.findMapModel(point))
        .forEach((sketchPoint) => {
          if (isFlagActive) {
            sketchPoint.setFlagOn(drivenFlag, true);
          } else {
            sketchPoint.setFlagOff(drivenFlag, true);
          }
        });
    }
  }
}