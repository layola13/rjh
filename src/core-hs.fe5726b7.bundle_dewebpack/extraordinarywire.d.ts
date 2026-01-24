/**
 * Represents an extraordinary wire in a topological structure.
 * An extraordinary wire is a collection of coedges that form a loop on a face.
 * 
 * @module ExtraordinaryWire
 */

import { Loop } from 'some-math-library'; // Replace with actual module path

/**
 * Represents a topological edge with geometric curve information.
 */
export interface Edge {
  /** The geometric curve associated with this edge */
  curve: Curve;
}

/**
 * Represents a geometric curve that can be converted to a mathematical representation.
 */
export interface Curve {
  /**
   * Converts this curve to its mathematical representation.
   * @returns A mathematical curve object
   */
  toMathCurve(): MathCurve;
}

/**
 * Represents a mathematical curve with geometric operations.
 */
export interface MathCurve {
  /**
   * Returns a reversed copy of this curve.
   * @returns A new curve with reversed direction
   */
  reversed(): MathCurve;
}

/**
 * Represents a co-edge (oriented edge usage) in a topological structure.
 * A co-edge references an edge and specifies its orientation relative to a wire.
 */
export interface CoEdge {
  /** The underlying edge */
  edge: Edge;
  
  /** Whether the edge direction is reversed in this usage */
  isRev: boolean;
  
  /** Topological name identifier for this co-edge */
  topoName: string;
}

/**
 * Represents a face in a topological structure.
 */
export interface Face {
  // Add face properties as needed
}

/**
 * Represents a builder curve with topological information.
 */
export interface BuilderCurve {
  /** The mathematical curve */
  curve: MathCurve;
  
  /** Topological identifier */
  topo: string;
}

/**
 * Represents an extraordinary wire - a collection of oriented edges (coedges) 
 * that form a loop on a topological face.
 * 
 * Extraordinary wires are used in advanced geometric modeling to represent
 * complex boundary conditions or internal features on faces.
 */
export declare class ExtraordinaryWire {
  /** Internal storage for co-edges */
  private _coedges: CoEdge[];
  
  /** The face this wire belongs to */
  face: Face;
  
  /**
   * Creates a new ExtraordinaryWire instance.
   * 
   * @param coedges - Array of co-edges that form this wire
   * @param face - The face this wire is associated with
   */
  constructor(coedges: CoEdge[], face: Face);
  
  /**
   * Gets the co-edges that form this wire.
   * 
   * @returns Read-only array of co-edges
   */
  get coedges(): CoEdge[];
  
  /**
   * Updates the co-edges of this wire.
   * 
   * @param coedges - New array of co-edges
   */
  setCoedges(coedges: CoEdge[]): void;
  
  /**
   * Converts this wire to an array of builder curves, optionally excluding specified edges.
   * 
   * Each co-edge is converted to a curve, respecting its orientation. If the co-edge
   * is reversed, the curve is also reversed.
   * 
   * @param excludeEdges - Optional array of edges to exclude from the result
   * @returns Array of builder curves with topological information
   */
  toBuilderCurves(excludeEdges?: Edge[]): BuilderCurve[];
  
  /**
   * Converts this wire to a mathematical loop.
   * 
   * Transforms all co-edges into mathematical curves, respecting their orientation,
   * and constructs a Loop object from them.
   * 
   * @returns A mathematical loop representation of this wire
   */
  toMathLoop(): Loop;
}