interface Point2D {
  x: number;
  y: number;
}

interface GeometryIndices {
  [index: number]: number;
}

interface GeometryData {
  geometry: THREE.Vector2[];
  indices?: GeometryIndices;
}

interface FaceGeomInfo {
  faceGeomPath: Point2D[];
}

interface PolygonBound {
  width: number;
  length: number;
}

interface SurfaceMeta {
  outer: Point2D[];
  holes: unknown[];
  bound: HSCore.Util.BrepBound;
  width: number;
  height: number;
}

function calculateRectanglePoints(
  this: GeometryData,
  startIndex: number,
  endIndex: number,
  height: number,
  scale: number = 1
): Point2D[] {
  const startVertex = this.geometry[startIndex];
  const endVertex = this.geometry[endIndex];
  const width = new THREE.Vector2().subVectors(startVertex, endVertex).length() * scale;

  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height }
  ];
}

function getWallSurfacePoints(wall: HSCore.Model.Wall, surfaceType: string): Point2D[] {
  const geometryManager = HSCore.Doc.getDocManager().geometryManager;
  const geometryData = geometryManager.getGeometry(wall);
  const wallHeight = wall.height3d;
  let points: Point2D[] = [];

  if (geometryData?.indices) {
    const indices = geometryData.indices;

    switch (surfaceType) {
      case HSCore.Model.WallSurfaceTypeEnum.outer:
      case "right":
        points = calculateRectanglePoints.call(geometryData, indices[2], indices[3], wallHeight);
        break;

      case HSCore.Model.WallSurfaceTypeEnum.inner:
      case "left":
        points = calculateRectanglePoints.call(geometryData, indices[0], indices[1], wallHeight);
        break;

      case HSCore.Model.WallSurfaceTypeEnum.top:
        points = geometryData.geometry.filter((vertex) => vertex);
        break;

      case HSCore.Model.WallSurfaceTypeEnum.from:
      case HSCore.Model.WallSurfaceTypeEnum.outerfrom:
        points = calculateRectanglePoints.call(geometryData, indices[3], indices[0], wallHeight, 0.5);
        break;

      case HSCore.Model.WallSurfaceTypeEnum.to:
      case HSCore.Model.WallSurfaceTypeEnum.outerto:
        points = calculateRectanglePoints.call(geometryData, indices[1], indices[2], wallHeight, 0.5);
        break;
    }
  }

  return points;
}

function getBackgroundPath(element: HSCore.Model.Wall | HSCore.Model.Floor | HSCore.Model.Ceiling | HSCore.Model.Face, surfaceType: string): Point2D[] {
  const geometryManager = HSCore.Doc.getDocManager().geometryManager;
  let points: Point2D[] = [];

  if (element instanceof HSCore.Model.Wall) {
    return getWallSurfacePoints(element, surfaceType);
  }

  if (element instanceof HSCore.Model.Floor || element instanceof HSCore.Model.Ceiling) {
    const faceGeomInfo = geometryManager.getFaceGeomInfo(element);
    const faceGeomPath = faceGeomInfo?.faceGeomPath;
    const polygonBound = HSCore.Util.Collision.getPolygonBound(faceGeomPath);
    const boundWidth = polygonBound.width;
    const boundLength = polygonBound.length;

    points = [
      { x: 0, y: 0 },
      { x: boundLength, y: 0 },
      { x: boundLength, y: boundWidth },
      { x: 0, y: boundWidth }
    ];
  } else if (element instanceof HSCore.Model.Face) {
    if (surfaceType === HSCore.Model.RoomSurfaceTypeEnum.ceiling) {
      // No operation for ceiling
    } else {
      const parentElement = element.getUniqueParent();
      if (parentElement) {
        const faceType = parentElement.getFaceType(element);
        return getWallSurfacePoints(parentElement, faceType);
      }
    }
  }

  return points;
}

function getSurfaceMeta(element: HSCore.Model.Wall | HSCore.Model.Floor | HSCore.Model.Ceiling | HSCore.Model.Face, surfaceType: string): SurfaceMeta {
  const outerPoints = getBackgroundPath(element, surfaceType);
  const bound = new HSCore.Util.BrepBound();

  bound.reset();
  outerPoints.forEach(bound.appendPoint.bind(bound));

  return {
    outer: outerPoints,
    holes: [],
    bound: bound,
    width: bound.width,
    height: bound.height
  };
}

export { getBackgroundPath, getSurfaceMeta };