/**
 * Module: SlabRegion
 * Defines slab region geometry and extrusion behavior for building floor/ceiling slabs.
 */

import { Region } from './Region';
import { SlabTopoFace } from './SlabTopoFace';
import { TopoName } from './TopoName';
import type { Vector3 } from './Vector3';
import type { Mirror } from './Mirror';

/**
 * Enumeration of slab extrusion face types
 */
export enum SlabExtrudeType {
  /** Side face of the extruded slab */
  Side = 'side'
}

/**
 * Represents a co-edge in the slab boundary path
 */
export interface CoEdge {
  /** The curve geometry of this edge */
  curve: Curve;
  /** Creates a deep copy of this co-edge */
  clone(): CoEdge;
}

/**
 * Path definition for slab region boundaries
 */
export interface CoEdgePath {
  /** Outer boundary loop */
  outer: CoEdge[];
  /** Inner hole boundaries */
  holes: CoEdge[][];
}

/**
 * Geometric curve with transformation capabilities
 */
export interface Curve {
  /** Apply a 3x3 transformation matrix */
  transform(matrix: Matrix3): void;
  /** Reverse the curve direction */
  reverse(): void;
  /** Translate the curve by a vector */
  translate(offset: Vector3): void;
}

/**
 * 3x3 transformation matrix
 */
export interface Matrix3 {
  // Matrix properties would be defined here
}

/**
 * Mirror transformation data
 */
export interface Mirror {
  /** The transformation matrix for mirroring */
  matrix3: Matrix3;
}

/**
 * Layer definition containing slab thickness
 */
export interface Layer {
  /** Thickness of the slab in model units */
  slabThickness: number;
}

/**
 * Shell wrapper containing generated face geometry
 */
export interface ShellWrapper {
  /** Side faces generated during extrusion, organized in groups */
  sideFaces: TopoFace[][];
}

/**
 * Topological face reference
 */
export interface TopoFace {
  // Face properties would be defined here
}

/**
 * Represents a slab region that can be extruded to create 3D geometry.
 * Manages boundary paths, extrusion behavior, and topological face generation.
 */
export declare class SlabRegion extends Region {
  /** The layer definition containing thickness information */
  private readonly _layer: Layer;

  /** The boundary path defining outer loop and holes */
  coEdgePath: CoEdgePath;

  /** IDs of walls linked to this slab region */
  linkWallIds: string[];

  /** Shell geometry generated during extrusion */
  shellWrapper: ShellWrapper;

  /** Topological faces created during extrusion */
  topoFaces: SlabTopoFace[];

  /**
   * Creates a new slab region instance
   * @param id - Unique identifier for this region
   * @param layer - Layer definition with thickness data
   */
  constructor(id: string, layer: Layer);

  /**
   * Factory method to create a configured slab region
   * @param id - Unique identifier
   * @param coEdgePath - Boundary path definition
   * @param layer - Layer with thickness information
   * @param linkWallIds - Array of linked wall identifiers
   * @returns Newly created and configured slab region
   */
  static create(
    id: string,
    coEdgePath: CoEdgePath,
    layer: Layer,
    linkWallIds: string[]
  ): SlabRegion;

  /**
   * Extrudes the 2D region boundary into a 3D slab body.
   * Generates side faces and creates topological face wrappers.
   */
  extrudeBody(): void;

  /**
   * Creates a deep copy of this slab region
   * @returns Cloned slab region with copied paths and references
   */
  clone(): SlabRegion;

  /**
   * Mirrors the slab region geometry across a plane
   * @param mirror - Mirror transformation data containing the reflection matrix
   */
  mirror(mirror: Mirror): void;

  /**
   * Translates the slab region by a vector offset
   * @param offset - Translation vector
   */
  translate(offset: Vector3): void;
}