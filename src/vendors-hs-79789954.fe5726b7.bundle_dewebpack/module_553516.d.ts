/**
 * K-D Tree (K-Dimensional Tree) implementation for efficient spatial searching
 * @module KDTree
 */

/**
 * Represents a node in the K-D tree
 * @template T - Type of the object stored in the node
 */
export interface KDNode<T = unknown> {
  /** The data object stored in this node */
  obj: T;
  /** Left child node (contains objects with smaller values in the current dimension) */
  left: KDNode<T> | null;
  /** Right child node (contains objects with larger values in the current dimension) */
  right: KDNode<T> | null;
  /** Parent node reference */
  parent: KDNode<T> | null;
  /** The dimension index used for splitting at this node */
  dimension: number;
}

/**
 * Distance function type for calculating distance between two points
 * @template T - Type of the point objects
 * @param a - First point
 * @param b - Second point
 * @returns The distance between the two points
 */
export type DistanceFunction<T = unknown> = (a: T, b: T) => number;

/**
 * Result tuple from nearest neighbor search
 * @template T - Type of the data object
 * @returns [object, distance] tuple
 */
export type NearestResult<T = unknown> = [T, number];

/**
 * Configuration for serialized K-D tree structure
 * @template T - Type of the objects stored in the tree
 */
export interface SerializedKDTree<T = unknown> {
  obj: T;
  left?: SerializedKDTree<T> | null;
  right?: SerializedKDTree<T> | null;
  dimension: number;
}

/**
 * K-D Tree data structure for efficient multi-dimensional spatial searches
 * Supports nearest neighbor queries and dynamic insertions/deletions
 * @template T - Type of objects stored in the tree (must have numeric properties for dimensions)
 */
export declare class KDTree<T extends Record<string, number> = Record<string, number>> {
  /**
   * Root node of the tree
   */
  root: KDNode<T> | null;

  /**
   * Distance function used for calculating distances between points
   */
  readonly distanceFunc: DistanceFunction<T>;

  /**
   * Array of dimension keys used for splitting and comparison
   */
  readonly dimensions: readonly (keyof T)[];

  /**
   * Creates a new K-D Tree
   * @param points - Array of points to build the tree from, or a pre-built tree structure
   * @param distanceFunc - Function to calculate distance between two points
   * @param dimensions - Array of property names representing dimensions for splitting
   * @example
   *