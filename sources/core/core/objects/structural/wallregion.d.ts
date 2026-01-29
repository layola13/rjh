import { Wall } from './Wall';
import { WallTopoFace } from './WallTopoFace';
import { TopoName } from './TopoName';
import { ExtrudeType } from './ExtrudeType';
import { Region } from './Region';
import { TgWallUtil } from './TgWallUtil';
import { MathUtil } from './MathUtil';
import { alg } from './alg';
import { BuilderUtil } from './BuilderUtil';
import type { FloorPlan } from './FloorPlan';
import type { CoEdge } from './CoEdge';
import type { CoEdgePath } from './CoEdgePath';
import type { Shell } from './Shell';
import type { BrepFace } from './BrepFace';
import type { Curve } from './Curve';
import type { ShellWrapper } from './ShellWrapper';

/**
 * Information linking a wall region to a specific wall
 */
interface WallLinkInfo {
  /** The ID of the wall this region is linked to */
  wallId: string;
  /** The index position within the wall */
  index: number;
}

/**
 * Result of attempting to fix split faces
 */
interface SplitFaceFixResult {
  /** Visible faces after splitting */
  visible: BrepFace[];
  /** Auxiliary faces (typically at z=0) */
  aux: BrepFace[];
}

/**
 * Modified shells information from edge addition
 */
interface ModifiedShellsInfo {
  /** Faces added during the modification */
  addFaces?: BrepFace[];
}

/**
 * Result of shell edge addition operation
 */
interface AddEdgesResult {
  /** Map of original shells to their modified versions */
  modifiedShellsMap?: Map<Shell, ModifiedShellsInfo>;
}

/**
 * Options for body extrusion
 */
interface ExtrudeBodyOptions {
  /** The region being extruded */
  region?: WallRegion;
  [key: string]: unknown;
}

/**
 * Represents a wall region in a floor plan.
 * A wall region is a closed area bounded by wall segments that can be extruded
 * into 3D geometry for rendering and collision detection.
 */
export declare class WallRegion extends Region {
  /** Information about walls linked to this region */
  linkInfo: WallLinkInfo[];
  
  /** Path of co-edges defining the region boundary */
  coEdgePath: CoEdgePath;
  
  /** IDs of all walls that contribute to this region */
  linkWallIds: string[];
  
  /** Wrapper for the 3D shell geometry */
  shellWrapper: ShellWrapper;
  
  /** Topological faces that make up this region */
  topoFaces: WallTopoFace[];
  
  /** Reference to the parent floor plan */
  protected _fp: FloorPlan;

  /**
   * Factory method to create a new WallRegion
   * @param floorPlan - The floor plan this region belongs to
   * @param coEdgePath - The path of co-edges defining the region boundary
   * @param wallIds - IDs of walls that contribute to this region
   * @returns A new WallRegion instance
   */
  static create(
    floorPlan: FloorPlan,
    coEdgePath: CoEdgePath,
    wallIds: string[]
  ): WallRegion;

  /**
   * Gets the ID of the primary target wall for this region
   */
  get targetWallId(): string;

  /**
   * Gets the primary target wall entity
   */
  get targetWall(): Wall;

  /**
   * Gets the index of the target wall within the link info
   */
  get targetWallIndex(): number;

  /**
   * Extrudes the 2D region into a 3D body
   * @param minHeight - Minimum extrusion height (typically 0)
   * @param maxHeight - Maximum extrusion height (wall height)
   * @param options - Additional extrusion options
   */
  extrudeBody(
    minHeight: number,
    maxHeight: number,
    options?: ExtrudeBodyOptions
  ): void;

  /**
   * Attempts to fix split face results by separating visible and auxiliary faces
   * @param faces - Array of faces resulting from a split operation
   * @returns Object containing separated visible and auxiliary faces, or undefined if fix not applicable
   */
  protected _tryFixSplitAddFaces(
    faces: BrepFace[]
  ): SplitFaceFixResult | undefined;

  /**
   * Splits a topological face using a curve
   * @param topoFace - The face to split
   * @param curve - The curve to split with
   * @param wallIdsToRemove - Wall IDs to exclude from the resulting faces
   */
  splitFaceByCurve(
    topoFace: WallTopoFace,
    curve: Curve,
    wallIdsToRemove: string[]
  ): void;

  /**
   * Validates that the region has valid geometry
   * @returns True if all outer path segments have non-zero length
   */
  isValid(): boolean;

  /**
   * Gets a co-edge by its ID
   * @param id - The co-edge ID
   * @returns The co-edge with the specified ID
   */
  protected _getCoEdge(id: string): CoEdge;
}