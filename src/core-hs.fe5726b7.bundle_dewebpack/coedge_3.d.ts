/**
 * CoEdge module - Represents a co-edge in a topological boundary representation
 * A co-edge is a directed use of an edge in a face boundary loop
 */

/**
 * Interface representing the initialization parameters for a CoEdge
 */
export interface CoEdgeParams {
  /** Unique identifier of the underlying edge */
  edgeId: string;
  /** Flag indicating if this co-edge has reversed orientation relative to the edge */
  isRev: boolean;
  /** Topological name/identifier for this co-edge */
  topoName: TopoName;
  /** Geometric curve definition of this co-edge */
  curve: Curve;
}

/**
 * Interface for objects that can be cloned
 */
interface Cloneable {
  clone(): this;
}

/**
 * Topological name interface with cloning capability
 */
interface TopoName extends Cloneable {
  clone(): TopoName;
}

/**
 * Geometric curve interface with cloning capability
 */
interface Curve extends Cloneable {
  clone(): Curve;
}

/**
 * Type for co-edge-like objects that can be used to generate IDs
 */
type CoEdgeLike = CoEdge | { id: string; isRev: boolean };

/**
 * Generates a unique identifier for a co-edge
 * 
 * @param coEdge - The co-edge or co-edge-like object to generate an ID for
 * @param separator - The separator character to use between edge ID and orientation flag (default: "_")
 * @returns A string identifier in the format "edgeId_isRev" or empty string on failure
 * 
 * @example
 *