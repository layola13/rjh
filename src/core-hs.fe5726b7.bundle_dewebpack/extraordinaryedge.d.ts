/**
 * Module: ExtraordinaryEdge
 * Represents an extraordinary edge in a sketch-based topology system.
 * Manages curve geometry, coedges, and topological relationships.
 */

import { ExtraordinaryCoedge } from './ExtraordinaryCoedge';
import { ExtraordinarySketchBase } from './ExtraordinarySketchBase';

/**
 * Result type for decoded topology name information
 */
export interface DecodedTopoName {
  /** The unique identifier of the edge */
  edgeId: number;
  /** The topological name of the edge, undefined if "null" */
  edgeTopoName?: string;
}

/**
 * Represents a curve interface in the geometry system
 */
export interface Curve {
  // Add specific curve properties based on your implementation
  [key: string]: unknown;
}

/**
 * ExtraordinaryEdge class
 * Extends ExtraordinarySketchBase to represent an edge with curve geometry,
 * coedges, and topological metadata.
 */
export class ExtraordinaryEdge extends ExtraordinarySketchBase {
  private _curve: Curve;
  private _coedges: ExtraordinaryCoedge[];
  
  /** Topological tags associated with this edge */
  public topos: string[];

  /**
   * Creates an instance of ExtraordinaryEdge
   * @param curve - The geometric curve defining this edge
   * @param sketchBase - Base sketch parameter passed to parent class
   * @param topos - Optional array of topological tags (e.g., "background")
   */
  constructor(curve: Curve, sketchBase: unknown, topos?: string[]) {
    super(sketchBase);
    this._curve = curve;
    this.topos = topos ?? [];
    this._coedges = [
      new ExtraordinaryCoedge(true, this),
      new ExtraordinaryCoedge(false, this)
    ];
  }

  /**
   * Gets the curve geometry of this edge
   */
  get curve(): Curve {
    return this._curve;
  }

  /**
   * Sets the curve geometry of this edge
   * @param curve - The new curve to assign
   */
  setCurve(curve: Curve): void {
    this._curve = curve;
  }

  /**
   * Gets the coedges associated with this edge
   * Each edge has two coedges representing opposite traversal directions
   */
  get coedges(): ExtraordinaryCoedge[] {
    return this._coedges;
  }

  /**
   * Sets the coedges for this edge
   * @param coedges - Array of coedges to assign
   */
  setCoedges(coedges: ExtraordinaryCoedge[]): void {
    this._coedges = coedges;
  }

  /**
   * Checks if this edge is tagged as background
   */
  get isBackground(): boolean {
    return this.topos.includes('background');
  }

  /**
   * Generates a unique topological name for this edge
   * Format: "{id}_{topos}" or "{id}_null" if no topos
   * Excludes "background" from the topology list
   */
  get topoName(): string {
    const filteredTopos = this.topos.filter((topo) => topo !== 'background');
    return `${this.id}_${filteredTopos.length ? filteredTopos.join(':') : 'null'}`;
  }

  /**
   * Decodes a topology name string into its components
   * @param topoName - The topology name to decode (format: "id_topoName")
   * @returns Decoded edge information, or undefined if name starts with "background"
   */
  static decodeTopoName(topoName: string): DecodedTopoName | undefined {
    const parts = topoName.split('_');
    
    if (!topoName.startsWith('background')) {
      return {
        edgeId: parseInt(parts[0], 10),
        edgeTopoName: parts[1] === 'null' ? undefined : parts[1]
      };
    }
    
    return undefined;
  }
}