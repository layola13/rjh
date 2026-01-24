/**
 * ArcSnapGeometry Module
 * Provides geometry snapping functionality for architectural elements
 * @module ArcSnapGeometry
 */

import { Vector2, Line2d, Arc2d, Circle2d, Loop, CONST, MathAlg } from './GeometryCore';
import { HSCore } from './HSCore';

/**
 * Enumeration of snap geometry types
 */
export enum SnapGeomType {
  /** Center point of an element */
  CenterPoint = 1,
  /** Corner point of an element */
  CornerPoint = 2,
  /** Center line of an element */
  CenterLine = 3,
  /** Linear edge */
  LineEdge = 4,
  /** Circular edge */
  CircleEdge = 5,
  /** Arc edge */
  ArcEdge = 6,
}

/**
 * Base class for all snap geometries
 */
export declare abstract class SnapGeometry {
  /** Source element this geometry comes from */
  from: any;
  
  /** Type of snap geometry */
  type: SnapGeomType;
  
  /** User-defined identifier */
  private _userID: string;
  
  /** Related geometries that share relationships with this one */
  relatedGeometries?: SnapGeometry[];

  /**
   * Creates a new snap geometry
   * @param from - Source element
   * @param type - Geometry type
   */
  constructor(from: any, type: SnapGeomType);

  /**
   * Gets unique identifier combining source tag, type, and user ID
   * @returns Composite ID string
   */
  getID(): string;

  /** Gets or sets user-defined identifier */
  get userID(): string;
  set userID(value: string);

  /**
   * Establishes relationships with other geometries
   * @param geometries - Array of related geometries
   */
  setupRelationShip(geometries: SnapGeometry[]): void;
}

/**
 * Point-based snap geometry
 */
export declare class PointSnapGeometry extends SnapGeometry {
  /** The geometric point */
  geo: Vector2;

  /**
   * Creates a point snap geometry
   * @param geo - Geometric point
   * @param from - Source element
   * @param type - Geometry type
   */
  constructor(geo: Vector2, from: any, type: SnapGeomType);

  /**
   * Gets related line geometries connected to this point
   * @returns Array of connected line geometries
   */
  getRelatedLineGeometry(): LineSnapGeometry[];
}

/**
 * Line-based snap geometry
 */
export declare class LineSnapGeometry extends SnapGeometry {
  /** The geometric line */
  geo: Line2d;

  /**
   * Creates a line snap geometry
   * @param geo - Geometric line
   * @param from - Source element
   * @param type - Geometry type
   */
  constructor(geo: Line2d, from: any, type: SnapGeomType);
}

/**
 * Circle-based snap geometry
 */
export declare class CircleSnapGeometry extends SnapGeometry {
  /** The geometric circle */
  geo: Circle2d;

  /**
   * Creates a circle snap geometry
   * @param geo - Geometric circle
   * @param from - Source element
   * @param type - Geometry type
   */
  constructor(geo: Circle2d, from: any, type: SnapGeomType);
}

/**
 * Arc-based snap geometry
 */
export declare class ArcSnapGeometry extends SnapGeometry {
  /** The geometric arc */
  geo: Arc2d;

  /**
   * Creates an arc snap geometry
   * @param geo - Geometric arc
   * @param from - Source element
   * @param type - Geometry type
   */
  constructor(geo: Arc2d, from: any, type: SnapGeomType);
}

/**
 * Options for extracting snap geometries from a room
 */
interface RoomExtractionOptions {
  /** Whether to include room boundary curves */
  includeRoomCurves?: boolean;
}

/**
 * Scene data containing architectural elements
 */
interface SceneData {
  /** Walls in the scene */
  walls: any[];
  /** Structural elements (columns, flues, etc.) */
  structures: any[];
  /** Beams in the scene */
  beams: any[];
  /** Openings/holes in elements */
  holes: any[];
  /** Room data */
  room?: any;
}

/**
 * Helper class for extracting snap geometries from architectural elements
 * Implements singleton pattern
 */
export declare class SnapGeomHelper {
  private static _instance?: SnapGeomHelper;

  private constructor();

  /**
   * Gets the singleton instance
   * @returns The singleton helper instance
   */
  static getInstance(): SnapGeomHelper;

  /**
   * Extracts all snap geometries from scene data
   * @param scene - Scene containing architectural elements
   * @param options - Extraction options
   * @returns Array of extracted snap geometries
   */
  extract(scene: SceneData, options?: RoomExtractionOptions): SnapGeometry[];

  /**
   * Extracts snap geometries from a wall element
   * @param wall - Wall element
   * @returns Array of snap geometries from the wall
   */
  extractFromWall(wall: any): SnapGeometry[];

  /**
   * Extracts snap geometries from a structural element
   * @param structure - Structural element (column, flue, riser, outlet)
   * @returns Array of snap geometries from the structure
   */
  extractFromStructure(structure: any): SnapGeometry[];

  /**
   * Extracts snap geometries from a beam element
   * @param beam - Beam element
   * @returns Array of snap geometries from the beam
   */
  extractFromBeam(beam: any): SnapGeometry[];

  /**
   * Extracts snap geometries from a square structural element
   * @param structure - Square column, flue, or riser
   * @returns Array of snap geometries
   */
  extractFromSquareStructure(structure: any): SnapGeometry[];

  /**
   * Extracts snap geometries from a circular structural element
   * @param structure - Circular column or outlet
   * @returns Array of snap geometries
   */
  extractFromCircleStructure(structure: any): SnapGeometry[];

  /**
   * Extracts snap geometries from an opening/hole
   * @param hole - Opening element
   * @returns Array of snap geometries from the hole
   */
  extractFromHole(hole: any): SnapGeometry[];

  /**
   * Extracts snap geometries from a room
   * @param room - Room element
   * @param options - Extraction options
   * @returns Array of snap geometries from the room
   */
  extractFromRoom(room: any, options?: RoomExtractionOptions): SnapGeometry[];
}