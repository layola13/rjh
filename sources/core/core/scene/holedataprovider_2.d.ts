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

/**
 * Point in 2D or 3D space
 */
interface Point {
  x: number;
  y: number;
  z?: number;
}

/**
 * Entity with spatial properties and transformations
 */
interface HoleEntity {
  XScale: number;
  YScale: number;
  ZLength: number;
  x: number;
  y: number;
  swing?: number;
  getFaceType(face: Face): OpeningFaceType;
  getHost?(): Wall | Slab | null;
  getUniqueParent?(): HoleEntity | null;
}

/**
 * Slab face collection organized by position
 */
interface SlabFaces {
  top: Record<string, Face>;
}

/**
 * Slab provider with profile analysis capabilities
 */
interface SlabProvider {
  isLineOnProfileOuter(start: Point, end: Point): boolean;
}

/**
 * Provides geometric data extraction and transformation for hole entities.
 * Handles conversion between local and world coordinate spaces for various opening types
 * (holes, doors, windows, niches) in walls and slabs.
 */
export class HoleDataProvider extends IDataProvider {
  private readonly entity: HoleEntity;

  constructor(entity: HoleEntity) {
    super();
    this.entity = entity;
  }

  /**
   * Gets the face geometry path in world space coordinates.
   * @param face - The face to extract geometry from
   * @returns Array of 3D points representing the face boundary
   */
  public getFacePath(face: Face): THREE.Vector3[] {
    let localGeometry: Point[] | undefined;

    switch (this.entity.getFaceType(face)) {
      case OpeningFaceType.top:
        localGeometry = this.getTopFaceGeometry(face);
        break;
      case OpeningFaceType.bottom:
        localGeometry = this.getBottomFaceGeometry(face);
        break;
      case OpeningFaceType.side:
        localGeometry = this.getSideFaceGeometry(face);
        break;
    }

    return localGeometry ? this._convertToWorldSpace(localGeometry) : [];
  }

  /**
   * Converts local geometry points to world space coordinates.
   * Applies entity-specific transformations including rotation and translation.
   * @param localPoints - Points in local coordinate space
   * @returns Points transformed to world coordinate space
   */
  private _convertToWorldSpace(localPoints: Point[]): THREE.Vector3[] {
    let points = localPoints;

    // Apply wall opening specific transformation
    if (ContentUtil.isWallOpening(this.entity)) {
      const rotationAngle = Math.PI / 2;
      const rotationMatrix = new THREE.Matrix4().makeRotationX(rotationAngle);
      rotationMatrix.setPosition(new THREE.Vector3(0, 0, this.entity.ZLength / 2));
      
      points = points.map(point => 
        new THREE.Vector3(point.x, point.y, point.z ?? 0).applyMatrix4(rotationMatrix)
      );
    } else {
      points = points.map(point => 
        new THREE.Vector3(point.x, point.y, point.z ?? 0)
      );
    }

    // Apply entity-specific transformation matrix
    if (
      this.entity instanceof Hole ||
      this.entity instanceof Door ||
      this.entity instanceof Window
    ) {
      const entityMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(this.entity);
      points = points.map(point => point.clone().applyMatrix4(entityMatrix));
    }

    return points as THREE.Vector3[];
  }

  /**
   * Generic method to get top or bottom face path.
   * @param face - The face to process
   * @returns Array of world space points
   */
  public getTopOrBottomFacePath(face: Face): THREE.Vector3[] {
    if (!(face instanceof Face)) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return [];
    }

    const outerLoop = face.getOuterLoopPolygon();
    return outerLoop ? this._convertToWorldSpace(outerLoop) : [];
  }

  /**
   * Gets the geometry for the top face of the opening.
   * @param face - The top face
   * @returns Array of points or undefined
   */
  public getTopFaceGeometry(face: Face): Point[] | undefined {
    return undefined;
  }

  /**
   * Gets the geometry for the bottom face of the opening.
   * @param face - The bottom face
   * @returns Array of points or undefined for non-niche entities
   */
  public getBottomFaceGeometry(face: Face): Point[] | undefined {
    if (!(face instanceof Face)) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return [];
    }

    return ContentUtil.isNiche(this.entity) 
      ? face.getOuterLoopPolygon() 
      : undefined;
  }

  /**
   * Gets the geometry for side faces, handling wall and slab specific logic.
   * @param face - The side face
   * @returns Array of points, empty array if hidden, or null if invalid
   */
  public getSideFaceGeometry(face: Face): Point[] | null {
    if (!(face instanceof Face && face.validateGeometry())) {
      Logger.console.assert(false, `invalid face ${face?.tag ?? ''}!`);
      return undefined as any;
    }

    const outerLoop = face.getOuterLoopPolygon();
    const parent = face.getUniqueParent();
    const host = parent?.getHost();

    if (!outerLoop) {
      return null;
    }

    // Handle slab hole side faces
    if (host instanceof Slab) {
      return ContentUtil.isSlabHole(parent) && this._isSideFaceHiddenInSlab(host, outerLoop)
        ? []
        : outerLoop;
    }

    if (!(outerLoop && host instanceof Wall)) {
      return outerLoop;
    }

    // Handle swing direction (mirror geometry for certain swing types)
    const SWING_TYPE_MIRROR_1 = 2;
    const SWING_TYPE_MIRROR_2 = 3;
    
    if (parent?.swing === SWING_TYPE_MIRROR_1 || parent?.swing === SWING_TYPE_MIRROR_2) {
      for (const point of outerLoop) {
        point.x *= -1;
      }
      outerLoop.reverse();
    }

    return outerLoop;
  }

  /**
   * Determines if a side face should be hidden when inside a slab.
   * Checks if the face edge lies on the slab's outer profile or is fully contained.
   * @param slab - The host slab
   * @param facePolygon - The face boundary polygon in local space
   * @returns True if the face should be hidden
   */
  private _isSideFaceHiddenInSlab(slab: Slab, facePolygon: Point[]): boolean {
    const scaleX = this.entity.XScale;
    const scaleY = this.entity.YScale;
    const offsetX = this.entity.x;
    const offsetY = this.entity.y;

    const toWorldSpace = (point: Point): Point => ({
      x: offsetX + point.x * scaleX,
      y: offsetY + point.y * scaleY
    });

    const startPoint = toWorldSpace(facePolygon[0]);
    const endPoint = toWorldSpace(facePolygon[1]);

    // Check if edge is on slab's outer profile
    const slabProvider = DocManager.instance().slabProviderMap.get(slab.id);
    if (slabProvider?.isLineOnProfileOuter(startPoint, endPoint)) {
      return true;
    }

    // Find which top face contains the entity
    const containingFace = this._findContainingTopFace(this.entity, Object.values(slab.faces.top));
    
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
   * @param entity - The entity to locate
   * @param topFaces - Array of candidate top faces
   * @returns The containing face or null
   */
  private _findContainingTopFace(entity: HoleEntity, topFaces: Face[]): Face | null {
    for (const face of topFaces) {
      const polygon = face.getOuterLoopPolygon();
      if (isPointInPolygonFast(entity as any, polygon)) {
        return face;
      }
    }
    return null;
  }
}