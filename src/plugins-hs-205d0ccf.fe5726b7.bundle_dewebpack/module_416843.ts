import { Curve2d, Arc2d, Point2d } from './geometry-types';

interface CanvasPoint {
  x: number;
  y: number;
}

/**
 * Converts a curve or array of curves to an SVG path string
 */
export function toSvgPath(input: Curve2d | Curve2d[] | Curve2d[][]): string {
  let curveGroups: Curve2d[][];

  if (input instanceof Curve2d) {
    curveGroups = [[input]];
  } else if (input instanceof Array) {
    curveGroups = input[0] instanceof Array ? (input as Curve2d[][]) : [input as Curve2d[]];
  } else {
    return "";
  }

  let pathString = "";

  if (curveGroups && curveGroups.length) {
    curveGroups.forEach((curveGroup) => {
      const processedCurves = processArcSegments(curveGroup);
      const groupPath = curvesToPathString(processedCurves);
      pathString = `${pathString} ${groupPath}`;
    });
  }

  return pathString;
}

/**
 * Converts a model point to canvas coordinates
 */
export function toSvgPoint(point: Point2d): CanvasPoint {
  return HSApp.View.SVG.Util.ModelPointToCanvas(point);
}

/**
 * Processes arc segments, splitting full circles into two arcs
 */
function processArcSegments(curves: Curve2d[]): Curve2d[] {
  const result: Curve2d[] = [];

  curves.forEach((curve) => {
    if (curve.isArc2d()) {
      const startPoint = curve.getStartPt();
      const endPoint = curve.getEndPt();

      if (startPoint.equals(endPoint)) {
        const center = curve.getCenter();
        const midPoint = curve.getMidPt();
        const isCounterClockwise = curve.isCCW();

        result.push(Arc2d.makeArcByStartEndPoints(center, startPoint, midPoint, isCounterClockwise));
        result.push(Arc2d.makeArcByStartEndPoints(center, midPoint, endPoint, isCounterClockwise));
        return;
      }
    }

    result.push(curve);
  });

  return result;
}

/**
 * Converts an array of curves to an SVG path string
 */
function curvesToPathString(curves: Curve2d[]): string {
  return curves.reduce((pathString, curve, index) => {
    const isFirstSegment = index === 0;
    const segmentString = curveToPathSegment(curve, isFirstSegment);
    return `${pathString} ${segmentString}`;
  }, "");
}

/**
 * Converts a single curve to an SVG path segment
 */
function curveToPathSegment(curve: Curve2d, isFirstSegment: boolean): string {
  const startPoint = toSvgPoint(curve.getStartPt());
  const endPoint = toSvgPoint(curve.getEndPt());
  let segmentCommand = "";

  if (curve.isLine2d()) {
    segmentCommand = `L${endPoint.x}, ${endPoint.y}`;
  } else if (curve.isArc2d()) {
    const radius = HSApp.View.SVG.Util.ModelLengthToCanvas(curve.getRadius());
    const isCounterClockwise = curve.isCCW();
    const isLargeArc = curve.getRange().getLength() > Math.PI ? 1 : 0;
    const sweepFlag = isCounterClockwise ? 0 : 1;

    segmentCommand = `A${radius}, ${radius} 0 ${isLargeArc} ${sweepFlag} ${endPoint.x}, ${endPoint.y}`;
  }

  if (isFirstSegment) {
    return `M${startPoint.x}, ${startPoint.y} ${segmentCommand}`;
  }

  return segmentCommand;
}