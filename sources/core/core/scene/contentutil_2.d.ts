/**
 * Utility functions for content manipulation and validation in HSCore
 * Provides methods for handling openings, walls, slabs, roofs and spatial relationships
 */

import { Bound } from './Bound';
import { WallUtil } from './WallUtil';
import { Group } from './Group';
import { Wall } from './Wall';
import { Slab } from './Slab';
import { Layer } from './Layer';
import { Arc2d, Loop, Matrix4, MatrixUtil, MathAlg } from './Geometry';
import { Logger } from './Logger';
import { NCustomizedParametricRoof } from './Roof';

/**
 * Point in 2D space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Point in 3D space
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * Content position and size information
 */
interface ContentPosSize {
  /** X coordinate in world space */
  x: number;
  /** Y coordinate in world space */
  y: number;
  /** Z coordinate in world space */
  z: number;
  /** Width dimension */
  XSize: number;
  /** Depth dimension */
  YSize: number;
  /** Height dimension */
  ZSize: number;
  /** Left offset from content origin */
  offsetLeft: number;
}

/**
 * Wall side information for content placement
 */
interface CoWallInfo {
  /** The associated wall */
  wall: Wall;
  /** Whether the content is on the outer room side */
  isOuterRoom: boolean;
}

/**
 * Face information with room context
 */
interface FaceRoomInfo {
  /** Loop containing the face */
  loop: {
    /** Path points defining the loop */
    loopPath: Point3D[];
  };
}

/**
 * Content entity with transform properties
 */
interface ContentEntity {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  isClipped?: boolean;
  clippedXOffset?: number;
  clippedYOffset?: number;
  clippedZOffset?: number;
  clippedXLength?: number;
  clippedYLength?: number;
  clippedZLength?: number;
  profile?: string;
  contentType?: HSCatalog.ContentType;
  metadata?: {
    contentType: HSCatalog.ContentType;
  };
  localId?: string;
  isCountertop?: boolean;
  
  getUniqueParent(): ContentEntity | null;
  getHost(): ContentEntity | null;
  getLocalToWorldMatrix(): THREE.Matrix4;
  getChild(name: string): ContentEntity | null;
  getPaths(): Point3D[][];
}

/**
 * Opening entity extending ContentEntity
 */
interface Opening extends ContentEntity {
  profile: string;
}

/**
 * Wall entity with geometric faces
 */
interface WallEntity extends ContentEntity {
  curve: Arc2d | unknown;
  faces: {
    left: Record<string, WallFace>;
    right: Record<string, WallFace>;
    front: Record<string, WallFace>;
    back: Record<string, WallFace>;
  };
}

/**
 * Wall face with geometric information
 */
interface WallFace {
  rawGeometry: {
    outer: Point3D[];
  };
  outerLoop: {
    toPolygon(): Point3D[];
  };
  
  getMaster(): WallEntity;
}

/**
 * ContentUtil - Core utility functions for content management
 */
export declare const ContentUtil: {
  /**
   * Get the altitude (height) of a content entity based on its layer
   * @param entity - The content entity to query
   * @returns The altitude value in scene units
   */
  getAltitude(entity: ContentEntity): number;

  /**
   * Get the center profile points of an opening
   * @param opening - The opening entity
   * @param parseAsOpening - Whether to parse as opening profile
   * @returns Array of centered profile points, or undefined if no profile exists
   */
  getOpeningCenterProfile(opening: Opening, parseAsOpening?: boolean): Point2D[] | undefined;

  /**
   * Check if an entity is a wall opening
   * @param entity - The entity to check
   * @returns True if the entity is a wall opening
   */
  isWallOpening(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a roof opening
   * @param entity - The entity to check
   * @returns True if the entity is a roof opening (window or door on a roof)
   */
  isRoofOpening(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a slab opening
   * @param entity - The entity to check
   * @returns True if the entity is a slab opening
   */
  isSlabOpening(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a door opening
   * @param entity - The entity to check
   * @returns True if the entity is a door opening
   */
  isDoorOpening(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a wall hole
   * @param entity - The entity to check
   * @returns True if the entity is a wall hole
   */
  isWallHole(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a slab hole
   * @param entity - The entity to check
   * @returns True if the entity is a slab hole
   */
  isSlabHole(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a wall niche
   * @param entity - The entity to check
   * @returns True if the entity is a wall niche
   */
  isWallNiche(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is a slab niche
   * @param entity - The entity to check
   * @returns True if the entity is a slab niche
   */
  isSlabNiche(entity: ContentEntity | null): boolean;

  /**
   * Check if an entity is any type of niche
   * @param entity - The entity to check
   * @returns True if the entity is a wall niche or slab niche
   */
  isNiche(entity: ContentEntity | null): boolean;

  /**
   * Validate if a host can contain a wall opening
   * @param host - The potential host entity
   * @param opening - The wall opening entity
   * @returns True if the host is a valid wall opening host
   */
  isValidWallOpeningHost(host: ContentEntity, opening: ContentEntity): boolean;

  /**
   * Validate if a host can contain a slab opening
   * @param host - The potential host entity
   * @param opening - The slab opening entity
   * @returns True if the host is a valid slab opening host
   */
  isValidSlabOpeningHost(host: ContentEntity, opening: ContentEntity): boolean;

  /**
   * Validate if a host can contain a roof opening
   * @param host - The potential host entity
   * @param opening - The roof opening entity
   * @returns True if the host is a valid roof opening host
   */
  isValidRoofOpeningHost(host: ContentEntity, opening: ContentEntity): boolean;

  /**
   * Validate if a host can contain any type of opening
   * @param host - The potential host entity
   * @param opening - The opening entity
   * @returns True if the host is a valid opening host
   */
  isValidOpeningHost(host: ContentEntity, opening: ContentEntity): boolean;

  /**
   * Check if an entity is a wainscot
   * @param entity - The entity to check
   * @returns True if the entity is a wainscot
   */
  isWainscot(entity: ContentEntity | null): boolean;

  /**
   * Get the floor content at a specific position
   * @param point - The position to query
   * @param layer - The layer to search in
   * @returns The floor content entity, or undefined
   */
  getFloorContentIn(point: Point2D, layer: Layer): ContentEntity | undefined;

  /**
   * Check if content is inside a face boundary
   * @param point - The content position
   * @param face - The face entity
   * @param includeEdge - Whether to include points on the edge
   * @returns True if the content is inside the face
   */
  isContentInFace(point: Point2D, face: ContentEntity, includeEdge?: boolean): boolean;

  /**
   * Check if content is inside a floor boundary
   * @param point - The content position
   * @param floor - The floor entity
   * @param includeEdge - Whether to include points on the edge
   * @returns True if the content is inside the floor
   */
  isContentInFloor(point: Point2D, floor: ContentEntity, includeEdge?: boolean): boolean;

  /**
   * Get the associated wall information for a content entity
   * @param entity - The content entity
   * @returns Wall information including side, or null if not wall-hosted
   */
  getCoWall(entity: ContentEntity): CoWallInfo | null | undefined;

  /**
   * Get position and size information for a content entity
   * Accounts for clipping if applicable
   * @param entity - The content entity
   * @returns Position and size information
   */
  getContentPosSize(entity: ContentEntity): ContentPosSize;

  /**
   * Check if a countertop is inside a loop boundary
   * @param countertop - The countertop entity
   * @param face - The face with loop information
   * @returns True if the countertop is inside the loop
   */
  isCounterTopInloop(countertop: ContentEntity, face: ContentEntity): boolean;

  /**
   * Check if molding is inside a loop boundary
   * @param molding - The molding entity
   * @param face - The face with loop information
   * @returns True if the molding is inside the loop
   */
  isMoldingInLoop(molding: ContentEntity, face: ContentEntity): boolean;

  /**
   * Check if content is inside a loop boundary
   * Handles special cases for moldings, countertops, and accessories
   * @param content - The content entity
   * @param face - The face with loop information
   * @param includeEdge - Whether to include points on the edge
   * @returns True if the content is inside the loop
   */
  isContentInLoop(content: ContentEntity, face: ContentEntity, includeEdge?: boolean): boolean;

  /**
   * Rotate an entity around a world-space axis
   * @param entity - The entity to rotate
   * @param axis - The world-space axis vector
   * @param degrees - Rotation angle in degrees
   */
  rotateAroundWorldAxis(entity: ContentEntity, axis: THREE.Vector3, degrees: number): void;

  /**
   * Get the bounding box path points for content
   * @param entity - The content entity
   * @returns Array of corner points defining the bounding box
   */
  getContentBoundPaths(entity: ContentEntity): Point3D[];

  /**
   * Find the nearest wall face to content position
   * @param wall - The wall entity to search
   * @param content - The content entity
   * @returns The nearest wall face, or undefined
   */
  getNearWallFace(wall: WallEntity, content: ContentEntity): WallFace | undefined;

  /**
   * Check if content area intersects with a loop boundary
   * Used for assemblies and complex content shapes
   * @param content - The content entity
   * @param loopPath - The loop path points
   * @returns True if there is significant area intersection
   */
  isContentAreaInLoop(content: ContentEntity, loopPath: Point3D[]): boolean;
};