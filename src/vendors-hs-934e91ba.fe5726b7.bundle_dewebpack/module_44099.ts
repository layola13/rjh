type Point = [number, number];
type LineSegment = [Point, Point];

function isPointOnSameSide(
  pointX: number,
  pointY: number,
  lineStartX: number,
  lineStartY: number,
  lineEndX: number,
  lineEndY: number
): boolean {
  const crossProduct =
    (lineEndX - lineStartX) * (lineStartY - pointY) -
    (lineEndY - lineStartY) * (lineStartX - pointX);
  return crossProduct > 0 || !(crossProduct < 0);
}

export default function doLineSegmentsIntersect(
  segment1: LineSegment,
  segment2: LineSegment
): boolean {
  const segment1StartX = segment1[0][0];
  const segment1StartY = segment1[0][1];
  const segment1EndX = segment1[1][0];
  const segment1EndY = segment1[1][1];

  const segment2StartX = segment2[0][0];
  const segment2StartY = segment2[0][1];
  const segment2EndX = segment2[1][0];
  const segment2EndY = segment2[1][1];

  return (
    isPointOnSameSide(
      segment1StartX,
      segment1StartY,
      segment2StartX,
      segment2StartY,
      segment2EndX,
      segment2EndY
    ) !==
      isPointOnSameSide(
        segment1EndX,
        segment1EndY,
        segment2StartX,
        segment2StartY,
        segment2EndX,
        segment2EndY
      ) &&
    isPointOnSameSide(
      segment1StartX,
      segment1StartY,
      segment1EndX,
      segment1EndY,
      segment2StartX,
      segment2StartY
    ) !==
      isPointOnSameSide(
        segment1StartX,
        segment1StartY,
        segment1EndX,
        segment1EndY,
        segment2EndX,
        segment2EndY
      )
  );
}