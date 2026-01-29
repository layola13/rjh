import { Arc2d, Line2d, Vector2 } from './geometry';
import { HSApp } from './app';
import { HSCore } from './core';

interface DimensionLines {
  length: Line2d;
  height: Line2d;
}

interface WidthOption {
  id: string;
  title: string;
}

interface ArcLike {
  getStartPt(): Vector2;
  getMidPt(): Vector2;
  getEndPt(): Vector2;
}

interface LineLike {
  getDirection(): Vector2;
  getStartPt(): Vector2;
  getEndPt(): Vector2;
  getLength(): number;
}

export function getArcDimensionLines(arc: ArcLike): DimensionLines {
  const points = [arc.getStartPt(), arc.getMidPt(), arc.getEndPt()];
  const startPoint = points[0];
  const midPoint = points[1];
  const endPoint = points[2];

  const lengthLine = new Line2d(startPoint, endPoint);
  const projectedPoint = lengthLine.getProjectedPtBy(midPoint);
  const heightLine = new Line2d(projectedPoint, midPoint);

  if (lengthLine.getDirection().angleTo(heightLine.getDirection()) < Math.PI) {
    lengthLine.reverse();
  }

  return {
    length: lengthLine,
    height: heightLine
  };
}

export function getRadianArc(line: LineLike): Arc2d | undefined {
  const direction = line.getDirection();

  if (HSCore.Util.Math.nearlyEquals(direction.x, 0) || HSCore.Util.Math.nearlyEquals(direction.y, 0)) {
    return undefined;
  }

  const isConcave = direction.x * direction.y > 0;
  const xOffset = Vector2.X(line.getLength()).multiplied(direction.x > 0 ? 1 : -1);
  const midPoint = line.getStartPt().added(xOffset);

  return Arc2d.makeArcByStartEndPoints(
    line.getStartPt().clone(),
    midPoint,
    line.getEndPt().clone(),
    isConcave
  );
}

export function getUnitParam(): number {
  const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;

  switch (displayUnit) {
    case HSCore.Util.Unit.LengthUnitTypeEnum.kilometer:
      return 0.001;
    case HSCore.Util.Unit.LengthUnitTypeEnum.meter:
      return 1;
    case HSCore.Util.Unit.LengthUnitTypeEnum.centimeter:
      return 100;
    case HSCore.Util.Unit.LengthUnitTypeEnum.millimeter:
      return 1000;
    case HSCore.Util.Unit.LengthUnitTypeEnum.foot:
      return 3.2808399;
    case HSCore.Util.Unit.LengthUnitTypeEnum.inch:
      return 39.3700787;
    default:
      return 1;
  }
}

const WIDTH_PRESETS = [100, 120, 200, 240, 300] as const;
const MILLIMETERS_PER_METER = 1000;

export function getWidthOptions(unitParam: number): WidthOption[] {
  return WIDTH_PRESETS.map((widthInMillimeters) => {
    const convertedWidth = ((widthInMillimeters * unitParam) / MILLIMETERS_PER_METER).toFixed(2);
    return {
      id: convertedWidth,
      title: convertedWidth
    };
  });
}