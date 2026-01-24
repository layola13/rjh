/**
 * Face utility module for managing isolated face geometry updates.
 * Provides functionality to update face loops based on point collections.
 * 
 * @module FaceUtil
 * @originalId 50922
 */

import { LoopUtil, Loop } from './LoopUtil';

/**
 * Represents a point in 3D space or 2D plane
 */
export interface Point {
  x: number;
  y: number;
  z?: number;
}

/**
 * Represents a geometric loop with vertices
 */
export interface Loop {
  /** Unique identifier for the loop */
  ID: string;
  
  /** Get all vertices that form this loop */
  getLoopVertices(): Point[];
}

/**
 * Represents a face with outer and inner loops
 */
export interface IsolateFace {
  /** The outer boundary loop of the face */
  outerLoop: Loop;
  
  /** Collection of inner loops (holes) indexed by their IDs */
  innerLoops: Record<string, Loop>;
}

/**
 * Utility class for face geometry operations
 */
export declare const FaceUtil: {
  /**
   * Updates an isolated face by replacing its outer loop and inner loops
   * with new loops constructed from provided point collections.
   * 
   * @param face - The face to update
   * @param outerPoints - Points defining the new outer boundary
   * @param innerPointCollections - Array of point arrays, each defining an inner loop
   * 
   * @remarks
   * - The outer loop is always updated with the provided outer points
   * - Inner loops are matched by vertex count or default to first available loop
   * - Unmatched inner loops are removed from the face
   * - New inner loops are added with their generated IDs
   */
  updateIsolateFace(
    face: IsolateFace,
    outerPoints: Point[],
    innerPointCollections: Point[][]
  ): void;
};