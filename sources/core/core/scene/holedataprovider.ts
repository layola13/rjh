import { IDataProvider } from './IDataProvider';
import { OpeningFaceType } from './OpeningFaceType';
import { isPointInPolygonFast, isLineSegmentInPolygonsOutline } from './GeometryUtils';
import { Logger } from './Logger';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface GeometryInfo {
  outer: Point2D[];
  holes: Point2D[][];
}

interface FaceInfo {
  geometry: GeometryInfo[];
}

interface GeometryObject {
  isLineOnProfileOuter(point1: Point2D, point2: Point2D): boolean;
  faceInfo?: FaceInfo;
}

interface GeometryManager {
  getGeometryObjectWithoutUpdate(id: string): GeometryObject | null;
}

interface DocManager {
  geometryManager: GeometryManager;
}

interface Face {
  tag: string;
  id: string;
  getOuterLoopPolygon(): Point3D[] | null;
  validateGeometry(): boolean;
  getUniqueParent(): Opening | null;
}

interface FaceCollection {
  top: Record<string, Face>;
}

interface Opening {
  id: string;
  swing: number;
  XScale: number;
  YScale: number;
  ZLength: number;
  x: number;
  y: number;
  faces: FaceCollection;
  getFaceType(face: Face): OpeningFaceType;
  getHost(): Wall | Slab | null;
}

interface Wall {
  id: string;
}

interface Slab {
  id: string;
  faces: FaceCollection;
}

declare namespace HSCore {
  namespace Util {
    namespace Content {
      function isWallOpening(entity: Opening): boolean;
      function isNiche(entity: Opening): boolean;
      function isSlabHole(entity: Opening): boolean;
    }
    namespace Matrix3DHandler {
      function getMatrix4(entity: Opening): THREE.Matrix4;
    }
  }
  namespace Model {
    class Face {}
    class Hole {}
    class Door {}
    class Window {}
    class Wall {}
    class Slab {}
  }
  namespace Doc {
    function getDocManager(): DocManager;
  }
}

declare namespace THREE {
  class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    applyMatrix4(matrix: Matrix4): Vector3;
    clone(): Vector3;
  }
  class Matrix4 {
    makeRotationX(angle: number): Matrix4;
    setPosition(position: Vector3): void;
  }
}

export class HoleDataProvider extends IDataProvider {
  private entity: Opening;

  constructor(entity: Opening) {
    super();
    this.entity = entity;
  }

  public getFacePath(face: Face): Point3D[] {
    let geometry: Point3D[] | null | undefined;

    switch (this.entity.getFaceType(face)) {
      case OpeningFaceType.top:
        geometry = this.getTopFaceGeometry(face);
        break;
      case OpeningFaceType.bottom:
        geometry = this.getBottomFaceGeometry(face);
        break;
      case OpeningFaceType.side:
        geometry = this.getSideFaceGeometry(face);
        break;
    }

    return geometry ? this._convertToWorldSpace(geometry) : [];
  }

  private _convertToWorldSpace(geometry: Point3D[]): Point3D[] {
    let transformedGeometry = geometry;

    if (HSCore.Util.Content.isWallOpening(this.entity)) {
      const rotationAngle = Math.PI / 2;
      const rotationMatrix = new THREE.Matrix4().makeRotationX(rotationAngle);
      rotationMatrix.setPosition(new THREE.Vector3(0, 0, this.entity.ZLength / 2));
      
      transformedGeometry = transformedGeometry.map(point =>
        new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(rotationMatrix)
      );
    }

    if (
      (this.entity instanceof HSCore.Model.Hole ||
        this.entity instanceof HSCore.Model.Door ||
        this.entity instanceof HSCore.Model.Window) &&
      HSCore.Util.Content.isWallOpening(this.entity)
    ) {
      const transformMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(this.entity);
      transformedGeometry = transformedGeometry.map(point =>
        point.clone().applyMatrix4(transformMatrix)
      );
    }

    return transformedGeometry;
  }

  public getTopOrBottomFacePath(face: Face): Point3D[] {
    if (!(face instanceof HSCore.Model.Face)) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return [];
    }

    const polygon = face.getOuterLoopPolygon();
    return polygon ? this._convertToWorldSpace(polygon) : [];
  }

  public getTopFaceGeometry(face: Face): Point3D[] | undefined {
    return undefined;
  }

  public getBottomFaceGeometry(face: Face): Point3D[] | undefined {
    if (!(face instanceof HSCore.Model.Face)) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return [];
    }

    if (HSCore.Util.Content.isNiche(this.entity)) {
      return face.getOuterLoopPolygon() ?? undefined;
    }

    return undefined;
  }

  public getSideFaceGeometry(face: Face): Point3D[] | null {
    if (!(face instanceof HSCore.Model.Face && face.validateGeometry())) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return null;
    }

    const polygon = face.getOuterLoopPolygon();
    const parent = face.getUniqueParent();
    const host = parent?.getHost();

    if (!polygon) {
      return null;
    }

    if (host instanceof HSCore.Model.Slab) {
      if (HSCore.Util.Content.isSlabHole(parent!) && this._isSideFaceHiddenInSlab(host, polygon)) {
        return [];
      }
      return polygon;
    }

    if (!(polygon && host instanceof HSCore.Model.Wall)) {
      return polygon;
    }

    if (parent!.swing === 2 || parent!.swing === 3) {
      for (const point of polygon) {
        point.x *= -1;
      }
      polygon.reverse();
    }

    return polygon;
  }

  private _isSideFaceHiddenInSlab(slab: Slab, polygon: Point3D[]): boolean {
    const scaleX = this.entity.XScale;
    const scaleY = this.entity.YScale;
    const offsetX = this.entity.x;
    const offsetY = this.entity.y;

    const toWorldSpace = (point: Point3D): Point2D => ({
      x: offsetX + point.x * scaleX,
      y: offsetY + point.y * scaleY,
    });

    const worldPoint1 = toWorldSpace(polygon[0]);
    const worldPoint2 = toWorldSpace(polygon[1]);

    const geometryManager = HSCore.Doc.getDocManager().geometryManager;
    const slabGeometry = geometryManager.getGeometryObjectWithoutUpdate(slab.id);

    if (slabGeometry?.isLineOnProfileOuter(worldPoint1, worldPoint2)) {
      return true;
    }

    const containingFace = this._findContainingTopFace(this.entity, Object.values(slab.faces.top));

    if (containingFace) {
      const faceGeometry = geometryManager.getGeometryObjectWithoutUpdate(containingFace.id);

      if (faceGeometry?.faceInfo?.geometry) {
        const allOutlines: Point2D[][] = [];
        
        faceGeometry.faceInfo.geometry.forEach(geom => {
          allOutlines.push(geom.outer);
          allOutlines.push(...geom.holes);
        });

        if (!isLineSegmentInPolygonsOutline(worldPoint1, worldPoint2, allOutlines)) {
          return true;
        }
      }
    }

    return false;
  }

  private _findContainingTopFace(entity: Opening, topFaces: Face[]): Face | null {
    for (const face of topFaces) {
      const polygon = face.getOuterLoopPolygon();
      if (polygon && isPointInPolygonFast(entity, polygon)) {
        return face;
      }
    }
    return null;
  }
}