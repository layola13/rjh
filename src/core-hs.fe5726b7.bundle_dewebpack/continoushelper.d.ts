/**
 * Helper class for working with continuous faces in 3D geometry.
 * Provides utilities for extracting edges, wires, bounding boxes, and calculating areas.
 * @module ContinousHelper
 */

import { Continuous, Wire } from './continuous-module';
import { Box3 } from './box3-module';

/**
 * Represents a vertex in 3D space with a unique identifier.
 */
interface Vertex3D {
  /** Unique identifier for the vertex */
  tag: string | number;
}

/**
 * Represents a co-edge (half-edge) in a 3D boundary representation.
 */
interface Coedge3D {
  /** Gets the unique identifier of the associated edge */
  getEdgeTag(): string | number;
  
  /** Gets the starting vertex of this co-edge */
  getStartVertex(): Vertex3D;
  
  /** Gets the ending vertex of this co-edge */
  getEndVertex(): Vertex3D;
}

/**
 * Represents an edge in 3D geometry.
 */
interface Edge3D {
  /** Unique identifier for the edge */
  tag: string | number;
}

/**
 * Represents a face in 3D geometry.
 */
interface Face3D {
  /** Gets all edges belonging to this face */
  getEdges(): Edge3D[];
  
  /** Gets all co-edges (half-edges) of this face */
  getCoedge3ds(): Coedge3D[];
  
  /** Gets the bounding box of this face */
  getBoundingBox(): BoundingBox;
  
  /** Calculates the polygon representation of this face */
  calcPolygon(): Polygon;
}

/**
 * Represents a continuous face (a collection of connected faces).
 */
interface ContinuousFace {
  /** Gets all individual faces in this continuous face */
  getFaces(): Face3D[];
}

/**
 * Represents a bounding box in 3D space.
 */
interface BoundingBox {
  /** Gets all corner points of the bounding box */
  getCornerPts(): [number, number, number][];
}

/**
 * Represents a polygon in 3D space.
 */
interface Polygon {
  /** Calculates the area of the polygon */
  calcArea(): number;
}

/**
 * Result of continuous edge analysis.
 */
interface ContinuousEdgesResult {
  /** List of interactive edges */
  edges: Edge3D[];
  
  /** List of continuous edge collections */
  contEdges: EdgeCollection[];
}

/**
 * Collection of edges.
 */
interface EdgeCollection {
  /** Gets all edges in this collection */
  getEdges(): Edge3D[];
}

/**
 * Wrapper class for continuous face operations.
 * Provides access to edges from a continuous face.
 */
class ContinuousFaceWrapper {
  private readonly cface: ContinuousFace;

  /**
   * Creates a new continuous face wrapper.
   * @param continuousFace - The continuous face to wrap
   */
  constructor(continuousFace: ContinuousFace) {
    this.cface = continuousFace;
  }

  /**
   * Retrieves all edges from all faces in the continuous face.
   * @returns Array of all edges
   */
  getEdges(): Edge3D[] {
    const edges: Edge3D[] = [];
    for (const face of this.cface.getFaces()) {
      edges.push(...face.getEdges());
    }
    return edges;
  }
}

/**
 * Singleton helper class for continuous face operations.
 * Provides methods to extract wires, calculate bounding boxes, and compute areas.
 */
export class ContinousHelper {
  private static _instance: ContinousHelper | undefined;

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor() {}

  /**
   * Extracts continuous wire boundaries from a continuous face.
   * Analyzes interactive edges and constructs closed wire loops.
   * 
   * @param continuousFace - The continuous face to process
   * @returns Array of Wire objects representing boundary loops
   */
  getContinousFaceWires(continuousFace: ContinuousFace): Wire[] {
    const allEdges: Edge3D[] = [];
    const wrapper = new ContinuousFaceWrapper(continuousFace);
    
    // Get all interactive edges using continuous utility
    const continuousEdges: ContinuousEdgesResult = 
      Continuous.ContinuousUtil.getAllInteractiveEdges(wrapper);
    
    allEdges.push(...continuousEdges.edges);
    
    // Collect edges from continuous edge collections
    for (const contEdge of continuousEdges.contEdges) {
      allEdges.push(...contEdge.getEdges());
    }
    
    // Extract edge tags for filtering
    const edgeTags = allEdges.map(edge => edge.tag);
    
    // Filter co-edges that match the extracted edge tags
    const matchingCoedges: Coedge3D[] = [];
    for (const face of continuousFace.getFaces()) {
      const filteredCoedges = face
        .getCoedge3ds()
        .filter(coedge => edgeTags.includes(coedge.getEdgeTag()));
      matchingCoedges.push(...filteredCoedges);
    }
    
    // Build wire loops from sorted co-edges
    const processedIndices: number[] = [];
    const wires: Wire[] = [];
    
    while (processedIndices.length !== matchingCoedges.length) {
      const sortedCoedges: Coedge3D[] = [];
      const startIndex = 0;
      
      this.getSortedCoedge3dList(
        matchingCoedges,
        sortedCoedges,
        startIndex,
        processedIndices
      );
      
      if (sortedCoedges.length > 0) {
        wires.push(new Wire(sortedCoedges));
      }
    }
    
    return wires;
  }

  /**
   * Recursively builds a sorted list of connected co-edges forming a continuous path.
   * 
   * @param allCoedges - Complete list of available co-edges
   * @param sortedList - Accumulator for the sorted co-edge sequence
   * @param currentIndex - Current position in the allCoedges array
   * @param processedIndices - Indices of co-edges already processed
   */
  private getSortedCoedge3dList(
    allCoedges: Coedge3D[],
    sortedList: Coedge3D[],
    currentIndex: number,
    processedIndices: number[]
  ): void {
    // Base case: reached end of list or formed a closed loop
    if (currentIndex >= allCoedges.length - 1) {
      return;
    }
    
    // Check if current path forms a closed loop
    if (
      sortedList.length > 1 &&
      sortedList[0].getStartVertex().tag === 
        sortedList[sortedList.length - 1].getEndVertex().tag
    ) {
      return;
    }
    
    // Skip already processed co-edges
    if (processedIndices.includes(currentIndex)) {
      this.getSortedCoedge3dList(
        allCoedges,
        sortedList,
        currentIndex + 1,
        processedIndices
      );
      return;
    }
    
    // Initialize with first co-edge if list is empty
    if (sortedList.length === 0) {
      sortedList.push(allCoedges[0]);
      processedIndices.push(0);
      this.getSortedCoedge3dList(
        allCoedges,
        sortedList,
        currentIndex + 1,
        processedIndices
      );
      return;
    }
    
    // Find next connected co-edge
    const lastEndVertex = sortedList[sortedList.length - 1].getEndVertex();
    const currentCoedge = allCoedges[currentIndex];
    
    if (lastEndVertex.tag === currentCoedge.getStartVertex().tag) {
      sortedList.push(currentCoedge);
      processedIndices.push(currentIndex);
    }
    
    this.getSortedCoedge3dList(
      allCoedges,
      sortedList,
      currentIndex + 1,
      processedIndices
    );
  }

  /**
   * Computes the bounding box that encloses all faces in a continuous face.
   * 
   * @param continuousFace - The continuous face to measure
   * @returns A Box3 representing the minimal bounding box
   */
  getContinousFaceBounding(continuousFace: ContinuousFace): Box3 {
    const boundingBox = new Box3();
    
    for (const face of continuousFace.getFaces()) {
      const faceBoundingBox = face.getBoundingBox();
      boundingBox.expandByPoint(...faceBoundingBox.getCornerPts());
    }
    
    return boundingBox;
  }

  /**
   * Calculates the total surface area of all faces in a continuous face.
   * 
   * @param continuousFace - The continuous face to measure
   * @returns The total area as a number
   */
  getContinousFaceArea(continuousFace: ContinuousFace): number {
    let totalArea = 0;
    
    for (const face of continuousFace.getFaces()) {
      totalArea += face.calcPolygon().calcArea();
    }
    
    return totalArea;
  }

  /**
   * Gets the singleton instance of ContinousHelper.
   * 
   * @returns The singleton instance
   */
  static getInstance(): ContinousHelper {
    if (!ContinousHelper._instance) {
      ContinousHelper._instance = new ContinousHelper();
    }
    return ContinousHelper._instance;
  }
}