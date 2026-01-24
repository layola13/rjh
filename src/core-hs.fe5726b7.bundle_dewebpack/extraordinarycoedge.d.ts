/**
 * Represents a coedge (an edge with directional information) in a topological structure.
 * A coedge references an edge and maintains orientation information (forward or reversed).
 */
export interface ExtraordinaryCoedge {
  /**
   * Gets the reversed state of this coedge.
   * @returns True if the coedge is reversed relative to its underlying edge, false otherwise.
   */
  readonly isRev: boolean;

  /**
   * Sets the reversed state of this coedge.
   * @param isRev - True to mark this coedge as reversed, false for forward orientation.
   */
  setIsRev(isRev: boolean): void;

  /**
   * Gets the underlying edge that this coedge references.
   */
  readonly edge: Edge;

  /**
   * Gets the other coedge sharing the same edge.
   * An edge typically has two coedges with opposite orientations.
   * @returns The other coedge on the same edge, or undefined if not found.
   */
  readonly another: ExtraordinaryCoedge | undefined;

  /**
   * Gets the topological name identifier for this coedge.
   * Format: "{edgeTopoName}_{isRev}"
   * @returns A string uniquely identifying this coedge including its orientation.
   */
  readonly topoName: string;

  /**
   * Converts this coedge to a mathematical curve representation.
   * If the coedge is reversed, returns the reversed curve.
   * @returns The mathematical curve, oriented according to the coedge's direction.
   */
  toMathCurve(): MathCurve;
}

/**
 * Constructor for ExtraordinaryCoedge.
 */
export interface ExtraordinaryCoedgeConstructor {
  /**
   * Creates a new ExtraordinaryCoedge instance.
   * @param isRev - True if the coedge is reversed relative to the edge.
   * @param edge - The underlying edge this coedge references.
   */
  new (isRev: boolean, edge: Edge): ExtraordinaryCoedge;

  /**
   * Decodes a topological name string into its constituent parts.
   * @param topoName - The topological name string to decode (format: "{edgeId}_{edgeTopoName}_{isRev}" or "background").
   * @returns An object containing the decoded edge ID, edge topological name, and reversed flag.
   */
  decodeTopoName(topoName: string): DecodedTopoName;
}

/**
 * Result of decoding a topological name.
 */
export interface DecodedTopoName {
  /**
   * The numeric identifier of the edge (-1 for background edges).
   */
  edgeId: number;

  /**
   * The topological name of the edge, or undefined if not specified.
   */
  edgeTopoName: string | undefined;

  /**
   * Whether the coedge is reversed.
   */
  isRev: boolean;
}

/**
 * Represents a topological edge in the model.
 */
export interface Edge {
  /**
   * The topological name of this edge.
   */
  readonly topoName: string;

  /**
   * All coedges associated with this edge.
   */
  readonly coedges: ExtraordinaryCoedge[];

  /**
   * The geometric curve representation of this edge.
   */
  readonly curve: Curve;
}

/**
 * Represents a geometric curve.
 */
export interface Curve {
  /**
   * Converts this curve to a mathematical curve representation.
   */
  toMathCurve(): MathCurve;
}

/**
 * Represents a mathematical curve with geometric operations.
 */
export interface MathCurve {
  /**
   * Returns a reversed version of this curve.
   */
  reversed(): MathCurve;
}

export const ExtraordinaryCoedge: ExtraordinaryCoedgeConstructor;