import type { Vec2, Vector3 } from './math-types';
import type { Wall, WallFaceType } from './wall-types';
import type { Face, Loop, FaceHoleType } from './face-types';
import type { Opening, Content } from './content-types';
import type { Layer, Slab, Floor } from './layer-types';
import type { Surface, Curve3d, Curve2d, Matrix4, Plane, Cylinder } from './geometry-types';
import type { Material } from './material-types';
import type { Baseboard } from './molding-types';

/**
 * Utility class for face-related operations
 * Provides methods for face manipulation, intersection detection, material application, and UV mapping
 */
export declare class FaceUtil {
  /**
   * Find the midpoint of a face's outer loop
   * @param face - Target face to analyze
   * @returns The midpoint vector or undefined if not found
   */
  static findFaceMidPoint(face: Face): Vector3 | undefined;

  /**
   * Get the host face from a wall edge
   * @param edge - Wall edge
   * @param point - Reference point
   * @returns The nearest wall face
   */
  static getHostFaceFromWall(edge: any, point: Vec2): Face | undefined;

  /**
   * Find the nearest wall face to a given point
   * @param edge - Wall edge to search from
   * @param point - Reference point for distance calculation
   * @returns The nearest face or undefined
   */
  static findNearestWallFace(edge: any, point: Vec2): Face | undefined;

  /**
   * Find neighboring faces (previous and next)
   * @param face - Target face
   * @returns Object containing pre and next face information with intersection points
   */
  static findNeighborFace(face: Face): {
    pre?: { face: Face; intersected: Vec2 };
    next?: { face: Face; intersected: Vec2 };
  };

  /**
   * Find all coplanar faces connected to the given face
   * @param face - Starting face
   * @returns Array of coplanar connected faces
   */
  static findCoplanarFaces(face: Face): Face[];

  /**
   * Check if a molding intersects with clip holes
   * @param molding - Molding instance (typically Baseboard)
   * @returns True if intersection exists
   */
  static isMoldingIntersectClipHole(molding: Baseboard): boolean;

  /**
   * Get room information associated with a face
   * @param face - Target face
   * @returns Array of room info objects
   */
  static getRoomInfosByFace(face: Face): any[];

  /**
   * Get room information associated with a wall
   * @param wall - Target wall
   * @returns Array of room info objects
   */
  static getRoomInfosByWall(wall: Wall): any[];

  /**
   * Get the floor wall face containing a given face
   * @param face - Target face
   * @returns The containing floor wall face or undefined
   */
  static getFloorWallFaceIn(face: Face): Face | undefined;

  /**
   * Check if a point is inside a face
   * @param point - Point to test
   * @param face - Target face
   * @param includeEdge - Whether to include points on the edge
   * @returns True if point is inside face
   */
  static isPointInFace(point: Vec2, face: Face, includeEdge?: boolean): boolean;

  /**
   * Get face polygon with outer loop and holes
   * @param face - Target face
   * @returns Object containing outer polygon and hole polygons
   */
  static getFacePolygon(face: Face): {
    outer: Vec2[];
    holes: Vec2[][];
  };

  /**
   * Get all holes (openings) on a wall face
   * @param face - Target wall face
   * @returns Array of opening entities
   */
  static getHolesOnWallFace(face: Face): Opening[];

  /**
   * Check if a hole is on a specific wall face
   * @param face - Target wall face
   * @param hole - Opening/hole to check
   * @returns True if hole is on the face
   */
  static isHoleOnWallFace(face: Face, hole: Opening): boolean;

  /**
   * Find walls forming a loop with a floor
   * @param floor - Target floor
   * @returns Array of wall faces forming the loop
   */
  static findWallsLoopWithFloor(floor: Floor): Face[] | undefined;

  /**
   * Update an isolated face with new points and holes
   * @param face - Face to update
   * @param outerPoints - New outer loop points
   * @param holePoints - New hole points array
   */
  static updateIsolateFace(
    face: Face,
    outerPoints: Vec2[],
    holePoints: Vec2[][]
  ): void;

  /**
   * Update face geometry with curves
   * @param face - Face to update
   * @param outerCurves - Outer loop curves
   * @param holeCurves - Hole curves array
   * @param surface - Surface object
   * @param sameDirWithSurface - Direction flag
   * @param materialParams - Material parameters
   * @param forceRecreate - Force recreation of loops
   */
  static updateFace(
    face: Face,
    outerCurves: Curve3d[],
    holeCurves: Curve3d[][],
    surface: Surface,
    sameDirWithSurface: boolean,
    materialParams?: any,
    forceRecreate?: boolean
  ): void;

  /**
   * Get material UV parameters
   * @param material - Material object
   * @param mapType - Map type ('normal' or 'diffuse')
   * @returns UV parameter object
   */
  static getMaterialUvParam(
    material: Material,
    mapType: 'normal' | 'diffuse'
  ): {
    override: {
      offset_x: number;
      offset_y: number;
      tileSize_x: number;
      tileSize_y: number;
      normalTileSizeX: number;
      normalTileSizeY: number;
      srcTileSize_x: number;
      srcTileSize_y: number;
    };
    textureRotation: number;
    rotateCenter: { x: number; y: number };
  } | undefined;

  /**
   * Get UV transform matrix from UV parameters
   * @param uvParam - UV parameters
   * @returns Diffuse and normal map UV transform matrices
   */
  static getUvTransformFromUvParam(uvParam: any): {
    diffuseMapUvTransform: Matrix4;
    normalMapUvTransform: Matrix4;
  };

  /**
   * Get UV transform matrices from material
   * @param material - Material object
   * @param mapType - Map type ('normal' or 'diffuse')
   * @returns Diffuse and normal map UV transform matrices
   */
  static getUvTransformFromMaterial(
    material: Material,
    mapType: 'normal' | 'diffuse'
  ): {
    diffuseMapUvTransform: Matrix4;
    normalMapUvTransform: Matrix4;
  };

  /**
   * Apply material transformations to UV coordinates
   * @param meshData - Mesh data containing UV coordinates
   * @param material - Material to apply
   * @param mapType - Map type ('normal' or 'diffuse')
   * @returns Updated mesh data with transformed UVs
   */
  static applyMaterialToUV(
    meshData: any,
    material: Material,
    mapType: 'normal' | 'diffuse'
  ): any;

  /**
   * Get the bottom edge of a face
   * @param face - Target face
   * @returns Bottom edge or undefined
   */
  static getBottomEdgeOfFace(face: Face): any | undefined;

  /**
   * Check if a face is in preview mode (has moving holes)
   * @param face - Target face
   * @returns True if face is in preview
   */
  static isFacePreview(face: Face): boolean;

  /**
   * Get moving holes from current face
   * @param face - Target face
   * @returns Array of moving holes/openings
   */
  static getMovingHolesFromCurFace(face: Face): Opening[];

  /**
   * Check if molding can be added to face
   * @param face - Target face
   * @returns True if molding can be added
   */
  static canAddMolding(face: Face): boolean;

  /**
   * Check if a space is outdoor
   * @param floor - Floor to check
   * @returns True if outdoor space
   */
  static isOutdoorSpace(floor: Floor): boolean;

  /**
   * Advanced point-in-face test using BREP
   * @param point - Point to test
   * @param face - Target face
   * @returns True if point is inside face
   */
  static isPointInFace2(point: Vector3, face: Face): boolean;

  /**
   * Check if content is inside a polygon
   * @param content - Content entity
   * @param polygon - Polygon with outer and holes
   * @param surface - Surface object
   * @returns True if content is inside
   */
  static isContentInPolygon(
    content: Content,
    polygon: { outer: Curve3d[]; holes: Curve3d[][] },
    surface: Surface
  ): boolean;

  /**
   * Check if content is inside a face
   * @param content - Content entity
   * @param face - Target face
   * @returns True if content is inside
   */
  static isContentInFace(content: Content, face: Face): boolean;

  /**
   * Check if content is inside face clip holes
   * @param content - Content entity
   * @param face - Target face
   * @returns True if content is inside clip holes
   */
  static isContentInFaceClipHoles(content: Content, face: Face): boolean;

  /**
   * Reassign contents to new faces after face operations
   * @param faceMap - Map of old faces to new faces
   */
  static reassignContent(faceMap: Map<Face, Face[]>): void;

  /**
   * Map old faces to new faces based on overlap
   * @param oldFaceMap - Map of old faces to their data
   * @param newFaceMap - Map of new faces to their data
   * @returns Map of old faces to matching new faces
   */
  static mapOldFace2NewFaces(
    oldFaceMap: Map<Face, any>,
    newFaceMap: Map<Face, any>
  ): Map<Face, Face[]>;

  /**
   * Get matching faces based on overlap area
   * @param sourceFace - Source face
   * @param targetFaceMap - Map of target faces
   * @returns Array of matching faces
   */
  static getMatchFaces(sourceFace: Face, targetFaceMap: Map<Face, any>): Face[];

  /**
   * Remove holes created for molding
   * @param molding - Molding instance (typically Baseboard)
   */
  static removeHoleForMolding(molding: Baseboard): void;

  /**
   * Create holes for molding
   * @param molding - Molding instance (typically Baseboard)
   */
  static makeHoleForMolding(molding: Baseboard): void;

  /**
   * Calculate vertex positive corner intersections
   * @param face1 - First face
   * @param face2 - Second face
   * @returns Array of intersection curve segments
   */
  static calcVertPositiveCorner(face1: Face, face2: Face): Curve3d[][];

  /**
   * Calculate curve intersection with face
   * @param curve - Curve to test
   * @param face - Target face
   * @param tolerance - Intersection tolerance
   * @returns Array of intersection parameters on curve
   */
  static curveIntersectFace(
    curve: Curve3d,
    face: Face,
    tolerance?: number
  ): number[];

  /**
   * Get face RCP (Reflected Ceiling Plan) background
   * @param face - Target face
   * @returns RCP background with outer and holes as 2D curves
   */
  static getFaceRcpBackground(face: Face): {
    outer: Curve2d[];
    holes: Curve2d[][];
  };

  /**
   * Get face RCP surface object
   * @param face - Target face
   * @returns Surface object for RCP
   */
  static getFaceRcpSurfaceObj(face: Face): any;

  /**
   * Get bottom face holes (openings at floor level)
   * @param floor - Floor entity
   * @returns Array of openings at bottom face
   */
  static getBottomFaceHoles(floor: Floor): Opening[];

  /**
   * Get floor link raw path in 2D
   * @param floor - Floor entity
   * @returns Array of 2D curve paths
   */
  static getFloorLinkRawPath2d(floor: Floor): Curve2d[][];

  /**
   * Check if face is RCP (Reflected Ceiling Plan)
   * @param face - Target face
   * @returns True if face is RCP
   */
  static isRcpFace(face: Face): boolean;

  /**
   * Get face FGI (Floor Geometry Information) data
   * @param face - Target face
   * @param additionalHoles - Additional holes to include
   * @returns FGI data object
   */
  static getFaceFGIData(
    face: Face,
    additionalHoles?: Curve3d[][]
  ): {
    path2ds: Array<{ outer: Curve2d[]; holes?: Curve2d[][] }>;
    surfaceObj: any;
    faceGroupTransform: Matrix4 | undefined;
    mergePaths?: Array<{ outer: Curve2d[] }>;
  };

  /**
   * Handle and process face FGI data
   * @param fgiData - FGI data to process
   */
  static handleFaceFGIData(fgiData: {
    path2ds: Array<{ outer: Curve2d[]; holes?: Curve2d[][] }>;
    surfaceObj: any;
    faceGroupTransform?: Matrix4;
    mergePaths?: Array<{ outer: Curve2d[] }>;
  }): void;

  /**
   * Check if face requires plane discrete control
   * @param face - Target face
   * @returns True if plane discrete control is needed
   */
  static isPlaneDiscreteControl(face: Face): boolean;

  /**
   * Check if face requires cylinder discrete control
   * @param face - Target face
   * @returns True if cylinder discrete control is needed
   */
  static isCylinderDiscreteControl(face: Face): boolean;

  /**
   * Get ceiling boundary from floor face
   * @param floor - Floor face
   * @returns Ceiling bound with outer, holes, and transformation matrix
   */
  static getCeilingBound(floor: Floor): {
    outer: Vector3[];
    holes: Vector3[][];
    convert3dMatrix: Matrix4;
  };
}