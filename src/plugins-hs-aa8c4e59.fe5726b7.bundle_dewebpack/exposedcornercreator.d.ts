/**
 * ExposedCornerCreator - Creates and manages exposed corner information for building layers
 * 
 * This module identifies exposed corners in walls where two faces meet at a corner point,
 * calculates their lengths, and generates BOM (Bill of Materials) data for corner molding.
 */

/**
 * Represents a 2D or 3D point coordinate
 */
export type Point = [number, number, number];

/**
 * Line segment defined by start and end points
 */
export type Line = Point[];

/**
 * Corner molding paving information
 */
export interface PaveInfo {
  /** Line segments in view space coordinates */
  line: Point[];
  /** Length of the molding segment */
  length: number;
}

/**
 * Corner geometric information
 */
export interface CornerInfo {
  /** Line segments defining the corner in view space */
  line: Point[];
  /** Total length of the corner */
  length: number;
}

/**
 * Entity instance identification
 */
export interface EntityInstance {
  /** Unique identifier for the corner (format: "faceId1-faceId2") */
  id: string;
  /** Parent room identifier */
  parentId: string;
}

/**
 * Entity type classification
 */
export interface EntityType {
  /** Classification type for the entity */
  classType: "ExposedCorner";
}

/**
 * Entity metadata container
 */
export interface Entity {
  /** Instance identification details */
  instance: EntityInstance;
  /** Type classification */
  type: EntityType;
}

/**
 * Exposed corner result data structure for BOM processing
 */
export interface ExposedCornerResult {
  /** Processor result type identifier */
  processorType: string; // BomProcessorResultType.ExposedCornerInfo
  /** Associated room identifier */
  roomId: string;
  /** Corner geometric details */
  cornerInfo: CornerInfo;
  /** Entity metadata */
  entity: Entity;
  /** Optional corner molding paving information */
  paveInfo?: PaveInfo[];
  /** Layer identifier this corner belongs to */
  layerId?: string;
}

/**
 * Geometric curve segment interface
 */
export interface CurveSegment {
  /** Get the starting point of the curve */
  getStartPt(): any; // Vector3-like object
  /** Get the ending point of the curve */
  getEndPt(): any;
  /** Get the midpoint of the curve */
  getMidPt(): any;
  /** Get the tangent vector at the start of the curve */
  getStartTangent(): any; // Vector3-like object
  /** Get the length of the curve segment */
  getLength(): number;
  /** Check if a point lies on the curve */
  containsPoint(point: any): boolean;
  /** Get the projected point on the curve */
  getProjectedPtBy(point: any): any;
}

/**
 * Raw path data containing outer boundary curves
 */
export interface RawPath {
  /** Outer boundary curve segments */
  outer: CurveSegment[];
}

/**
 * Surface object with geometric properties
 */
export interface SurfaceObject {
  /** Get the normal vector of the surface */
  getNormal(): any; // Vector3-like object
}

/**
 * Face information representing a wall or surface segment
 */
export interface FaceInfo {
  /** Unique face identifier */
  id: string;
  /** Raw geometric path data */
  rawPath: RawPath;
  /** Surface geometric object */
  surfaceObj: SurfaceObject;
}

/**
 * Room information container
 */
export interface RoomInfo {
  /** Array of face information for the room */
  faces: FaceInfo[];
}

/**
 * Room entity with geometry and metadata
 */
export interface Room {
  /** Unique room identifier */
  id: string;
  /** Array of room information structures */
  roomInfos: RoomInfo[];
}

/**
 * Layer entity containing rooms
 */
export interface Layer {
  /** Unique layer identifier */
  id: string;
  /**
   * Iterate over each room in the layer
   * @param callback - Function to execute for each room
   */
  forEachRoom(callback: (room: Room) => void): void;
}

/**
 * ExposedCornerCreator - Main class for detecting and creating exposed corner data
 * 
 * Analyzes building geometry to find exposed corners where walls meet at angles,
 * calculates dimensions, and generates BOM data for construction or rendering purposes.
 */
export declare class ExposedCornerCreator {
  /**
   * Current layer being processed
   */
  layer: Layer | undefined;

  /**
   * Creates exposed corner information for all rooms in a layer
   * 
   * Iterates through each room, detects exposed corners, calculates their properties,
   * and returns an array of corner data structures suitable for BOM processing.
   * 
   * @param layer - The building layer to process
   * @returns Array of exposed corner result objects
   */
  create(layer: Layer): ExposedCornerResult[];

  /**
   * Extracts exposed corner information from a single room
   * 
   * Analyzes room geometry to find corners where two faces meet at a point,
   * validates that they form an exposed corner (not parallel surfaces),
   * and calculates corner dimensions and molding requirements.
   * 
   * @param room - The room to analyze
   * @returns Array of exposed corner results for the room
   */
  getExposedCorner(room: Room): ExposedCornerResult[];

  /**
   * Converts model space coordinates to view space coordinates
   * 
   * Transforms 3D geometric points from the model coordinate system
   * to the view/screen coordinate system for rendering or display.
   * 
   * @param line - Array of points in model space
   * @returns Array of points in view space as [x, y, z] tuples
   */
  modelSpaceLineToViewSpace(line: any[]): Point[];
}