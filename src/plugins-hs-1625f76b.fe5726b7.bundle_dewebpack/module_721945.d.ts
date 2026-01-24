/**
 * Transaction state request for removing mesh faces from sketch content
 * 
 * This module defines a state request that handles the deletion of mesh faces
 * from a sketch by their associated tags. It extends the base StateRequest class
 * from HSCore transaction system.
 */

import { HSCore } from './hscore-types';

/**
 * Interface representing a face in the 3D model
 */
export interface IFace {
  /** Unique identifier tag for the face */
  tag: number;
}

/**
 * Interface representing a boundary representation (B-rep) in the 3D model
 */
export interface IBRep {
  /**
   * Get all faces belonging to this B-rep
   * @returns Array of faces
   */
  getFaces(): IFace[];
}

/**
 * Interface for sketch child elements
 */
export interface ISketchChild {
  tag: number;
  [key: string]: unknown;
}

/**
 * Interface representing a sketch containing drawable elements
 */
export interface ISketch {
  /** Child elements indexed by tag */
  children: Record<number, ISketchChild | undefined>;
  
  /**
   * Remove a child element from the sketch
   * @param child - The child element to remove
   */
  removeChild(child: ISketchChild): void;
  
  /**
   * Mark the sketch geometry as needing recalculation
   */
  dirtyGeometry(): void;
}

/**
 * Interface representing the content containing meshes, sketches, and B-reps
 */
export interface IContent {
  /** Array of boundary representations in the content */
  breps: IBRep[];
  
  /** The sketch associated with this content */
  sketch: ISketch;
  
  /**
   * Get the face tag associated with a specific mesh key
   * @param meshName - The name/key of the mesh
   * @returns The tag number associated with the mesh
   */
  getFaceTagByMeshKey(meshName: string): number;
}

/**
 * State request for removing mesh faces from sketch content
 * 
 * This transaction request removes all faces associated with a specific mesh
 * from the sketch. It:
 * 1. Finds the face tag for the given mesh name
 * 2. Collects all faces across B-reps that match this tag
 * 3. Removes the corresponding sketch children
 * 4. Marks the sketch geometry as dirty for recalculation
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *