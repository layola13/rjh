/**
 * Module: ContinuousCurve2d
 * Defines continuous curve classes for 2D and 3D geometric operations
 */

import { SmoothPoly3d, SmoothPoly2d } from './SmoothPoly';

/**
 * Represents a vertex in 3D space
 */
interface Vertex3d {
  /**
   * Gets the 3D point coordinates of this vertex
   */
  getPoint(): Point3d;
}

/**
 * Represents a 3D point with x, y, z coordinates
 */
interface Point3d {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 2D point with x, y coordinates
 */
interface Point2d {
  x: number;
  y: number;
  
  /**
   * Computes the 2D cross product (z-component) with another point
   * @param other - The other point to cross with
   * @returns The scalar cross product value
   */
  cross(other: Point2d): number;
}

/**
 * Represents a geometric edge in 3D space
 */
interface Edge {
  // Edge identifier and properties
}

/**
 * Represents a co-edge (oriented edge reference) in 3D topology
 */
interface Coedge {
  /**
   * Gets the starting vertex of this co-edge
   */
  getStartVertex(): Vertex3d;
  
  /**
   * Gets the ending vertex of this co-edge
   */
  getEndVertex(): Vertex3d;
  
  /**
   * Gets the underlying edge this co-edge references
   */
  getEdge(): Edge;
  
  /**
   * Determines if this co-edge has the same direction as its underlying edge
   * @returns true if directions match, false otherwise
   */
  getSameDirWithEdge(): boolean;
}

/**
 * A continuous 3D curve constructed from a sequence of connected co-edges.
 * Extends SmoothPoly3d to provide smooth interpolation between edge vertices.
 */
export class ContinuousCurve3d extends SmoothPoly3d {
  /** Array of co-edges defining the curve topology */
  private readonly _coedges: Coedge[];
  
  /** Map from edges to their corresponding co-edges for fast lookup */
  private readonly _map: Map<Edge, Coedge>;

  /**
   * Constructs a continuous 3D curve from a sequence of co-edges
   * @param coedges - Ordered array of connected co-edges forming the curve
   */
  constructor(coedges: Coedge[]) {
    const points: Point3d[] = [];
    
    // Extract points from co-edge vertices
    for (let i = 0; i < coedges.length; ++i) {
      points.push(coedges[i].getStartVertex().getPoint());
      
      // Add the last endpoint to close the curve
      if (i + 1 === coedges.length) {
        points.push(coedges[i].getEndVertex().getPoint());
      }
    }
    
    super(points);
    this._coedges = coedges;
    this._map = new Map<Edge, Coedge>();
    
    // Build edge-to-coedge lookup map
    for (let i = 0; i < coedges.length; ++i) {
      this._map.set(coedges[i].getEdge(), coedges[i]);
    }
  }

  /**
   * Creates a clone of this curve as a discrete smooth polygon
   * @returns A new SmoothPoly3d with the same discrete points
   */
  clone(): SmoothPoly3d {
    return new SmoothPoly3d(this.discrete());
  }

  /**
   * Gets the array of co-edges defining this curve
   * @returns The co-edges array
   */
  getCoedges(): Coedge[] {
    return this._coedges;
  }

  /**
   * Checks if a given co-edge has the same direction as the corresponding
   * co-edge stored in this curve
   * @param coedge - The co-edge to check
   * @returns true if directions match, false otherwise
   */
  isSeamDirection(coedge: Coedge): boolean {
    const storedCoedge = this._map.get(coedge.getEdge());
    return coedge.getSameDirWithEdge() === storedCoedge?.getSameDirWithEdge();
  }
}

/**
 * A continuous 2D curve providing area calculation capabilities.
 * Extends SmoothPoly2d for planar geometric operations.
 */
export class ContinuousCurve2d extends SmoothPoly2d {
  /**
   * Creates a clone of this 2D curve with copied points
   * @returns A new SmoothPoly2d instance with the same points
   */
  clone(): SmoothPoly2d {
    return new SmoothPoly2d(this.getPoints().slice());
  }

  /**
   * Calculates the signed area of the sector defined by this curve.
   * Uses the cross product method for polygonal area computation.
   * Positive area indicates counter-clockwise orientation.
   * @returns The signed sector area
   */
  getSectorArea(): number {
    const points = this.getPoints();
    let area = 0;
    
    // Sum cross products of consecutive point pairs
    for (let i = 1; i < points.length; ++i) {
      area += points[i - 1].cross(points[i]);
    }
    
    return 0.5 * area;
  }
}