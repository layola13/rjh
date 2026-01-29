interface SpatialObject {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

function isSameTransform(first: SpatialObject, second: SpatialObject): boolean {
  return (
    this.isSameContent(first, second) &&
    l.HSCore.Util.Math.nearlyEquals(first.x, second.x) &&
    l.HSCore.Util.Math.nearlyEquals(first.y, second.y) &&
    l.HSCore.Util.Math.nearlyEquals(first.z, second.z) &&
    l.HSCore.Util.Math.nearlyEquals(first.XSize, second.XSize) &&
    l.HSCore.Util.Math.nearlyEquals(first.YSize, second.YSize) &&
    l.HSCore.Util.Math.nearlyEquals(first.ZSize, second.ZSize) &&
    l.HSCore.Util.Math.nearlyEquals(first.XRotation, second.XRotation) &&
    l.HSCore.Util.Math.nearlyEquals(first.YRotation, second.YRotation) &&
    l.HSCore.Util.Math.nearlyEquals(first.ZRotation, second.ZRotation)
  );
}