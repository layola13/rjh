import { HSCore } from './HSCore';

export class EdgeUtil {
  static syncPointsFlag(
    edge: HSCore.Model.Edge,
    flag: HSCore.Model.ExSketchFlagEnum | HSCore.Model.EntityFlagEnum
  ): void {
    if (
      flag === HSCore.Model.ExSketchFlagEnum.hoverOn ||
      flag === HSCore.Model.EntityFlagEnum.selected
    ) {
      const sketch = edge.sketch;
      let drivenFlag: HSCore.Model.ExSketchFlagEnum;

      if (flag === HSCore.Model.EntityFlagEnum.selected) {
        drivenFlag = HSCore.Model.ExSketchFlagEnum.selectedDriven;
      } else if (flag === HSCore.Model.ExSketchFlagEnum.hoverOn) {
        drivenFlag = HSCore.Model.ExSketchFlagEnum.hoverOnDriven;
      }

      const isFlagActive = edge.isFlagOn(flag);

      HSCore.Util.ExtraordinarySketch2d.getAllPointsFromEdges([edge.srcModel])
        .map((pointModel) => sketch.findMapModel(pointModel))
        .forEach((point) => {
          if (isFlagActive) {
            point.setFlagOn(drivenFlag, true);
          } else {
            point.setFlagOff(drivenFlag, true);
          }
        });
    }
  }
}