import { IDataProvider } from './IDataProvider';
import { OpeningFaceType } from './OpeningFaceType';
import { isPointInPolygonFast, isLineSegmentInPolygonsOutline } from './GeometryUtils';
import { DocManager } from './DocManager';
import { ContentUtil } from './ContentUtil';
import { Wall } from './Wall';
import { Hole } from './Hole';
import { Face } from './Face';
import { Slab } from './Slab';
import { Door } from './Door';
import { Window } from './Window';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Entity {
  id: string;
  x: number;
  y: number;
  XScale: number;
  YScale: number;
  ZLength: number;
  swing?: number;
  faces?: {
    top: Record<string, Face>;
  };
  getFaceType(face: Face): OpeningFaceType;
  getHost?(): Entity | null;
  getUniqueParent?(): Entity | null;
}

interface SlabProvider {
  isLineOnProfileOuter(start: Point2D, end: Point2D): boolean;
}

const ROTATION_90_DEGREES = Math.PI / 2;
const OPENING_SWING_TYPE_2 = 2;
const OPENING_SWING_TYPE_3 = 3;

/**
 * Provides geometric data for hole entities, including face paths and transformations.
 */
export class HoleDataProvider extends IDataProvider {
  private readonly entity: Entity;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
  }

  /**
   * Gets the world-space path for a given face.
   */
  getFacePath(face: Face): Point3D[] {
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

    return geometry ? this.convertToWorldSpace(geometry) : [];
  }

  /**
   * Converts local geometry coordinates to world space.
   */
  private convertToWorldSpace(geometry: Point3D[]): Point3D[] {
    let transformedGeometry = geometry;

    if (ContentUtil.isWallOpening(this.entity)) {
      const rotationMatrix = new THREE.Matrix4().makeRotationX(ROTATION_90_DEGREES);
      rotationMatrix.setPosition(new THREE.Vector3(0, 0, this.entity.ZLength / 2));
      transformedGeometry = transformedGeometry.map(point =>
        new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(rotationMatrix)
      );
    } else {
      transformedGeometry = transformedGeometry.map(point =>
        new THREE.Vector3(point.x, point.y, point.z)
      );
    }

    if (
      this.entity instanceof Hole ||
      this.entity instanceof Door ||
      this.entity instanceof Window
    ) {
      const entityMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(this.entity);
      transformedGeometry = transformedGeometry.map(point =>
        point.clone().applyMatrix4(entityMatrix)
      );
    }

    return transformedGeometry;
  }

  /**
   * Gets the path for top or bottom face.
   */
  getTopOrBottomFacePath(face: unknown): Point3D[] {
    if (!(face instanceof Face)) {
      Logger.console.assert(false, `invalid face ${face ? (face as Face).tag : ''}!`);
      return [];
    }

    const polygon = face.getOuterLoopPolygon();
    return polygon ? this.convertToWorldSpace(polygon) : [];
  }

  /**
   * Gets the geometry for the top face.
   */
  getTopFaceGeometry(face: Face): Point3D[] | undefined {
    return undefined;
  }

  /**
   * Gets the geometry for the bottom face.
   */
  getBottomFaceGeometry(face: unknown): Point3D[] | undefined {
    if (!(face instanceof Face)) {
      Logger.console.assert(false, `invalid face ${face ? (face as Face).tag : ''}!`);
      return [];
    }

    return ContentUtil.isNiche(this.entity) ? face.getOuterLoopPolygon() : undefined;
  }

  /**
   * Gets the geometry for a side face.
   */
  getSideFaceGeometry(face: unknown): Point3D[] | null {
    if (!(face instanceof Face && face.validateGeometry())) {
      Logger.console.assert(false, `invalid face ${face ? (face as Face).tag : ''}!`);
      return null;
    }

    let polygon = face.getOuterLoopPolygon();
    const parent = face.getUniqueParent();
    const host = parent?.getHost();

    if (!polygon) {
      return null;
    }

    if (host instanceof Slab) {
      return ContentUtil.isSlabHole(parent) && this.isSideFaceHiddenInSlab(host, polygon)
        ? []
        : polygon;
    }

    if (!(polygon && host instanceof Wall)) {
      return polygon;
    }

    if (parent.swing === OPENING_SWING_TYPE_2 || parent.swing === OPENING_SWING_TYPE_3) {
      for (const point of polygon) {
        point.x *= -1;
      }
      polygon.reverse();
    }

    return polygon;
  }

  /**
   * Determines if a side face is hidden within a slab.
   */
  private isSideFaceHiddenInSlab(slab: Slab, polygon: Point3D[]): boolean {
    const scaleX = this.entity.XScale;
    const scaleY = this.entity.YScale;
    const offsetX = this.entity.x;
    const offsetY = this.entity.y;

    const transformToSlabSpace = (point: Point3D): Point2D => ({
      x: offsetX + point.x * scaleX,
      y: offsetY + point.y * scaleY,
    });

    const startPoint = transformToSlabSpace(polygon[0]);
    const endPoint = transformToSlabSpace(polygon[1]);

    const slabProvider = DocManager.instance().slabProviderMap.get(slab.id);
    if (slabProvider?.isLineOnProfileOuter(startPoint, endPoint)) {
      return true;
    }

    const containingFace = this.findContainingTopFace(this.entity, Object.values(slab.faces?.top ?? {}));
    if (containingFace) {
      const facePath = this.getFacePath(containingFace);
      if (facePath) {
        const polygons = [facePath];
        if (!isLineSegmentInPolygonsOutline(startPoint, endPoint, polygons)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Finds the top face that contains the given entity.
   */
  private findContainingTopFace(entity: Entity, topFaces: Face[]): Face | null {
    for (const face of topFaces) {
      const outerPolygon = face.getOuterLoopPolygon();
      if (isPointInPolygonFast(entity, outerPolygon)) {
        return face;
      }
    }
    return null;
  }
}