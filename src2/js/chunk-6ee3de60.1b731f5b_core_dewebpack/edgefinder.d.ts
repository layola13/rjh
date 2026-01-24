/**
 * Direction enumeration for edge finding operations.
 * Defines the four cardinal directions plus a None state.
 */
export enum Direction {
  /** Left direction */
  Left = "left",
  /** Right direction */
  Right = "right",
  /** Up direction */
  Up = "up",
  /** Down direction */
  Down = "down",
  /** No direction */
  None = "None"
}

/**
 * Orientation type from the flatten-js library.
 */
export type Orientation = number;

/**
 * Open direction enumeration for polygon operations.
 */
export enum OpenDirection {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down"
}

/**
 * Represents a point in 2D space.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Represents a line segment with start and end points.
 */
export interface Segment {
  start: Point;
  end: Point;
  slope: number;
  intersect(other: Edge): Point[];
}

/**
 * Represents an arc segment.
 */
export interface Arc {
  start: Point;
  end: Point;
  intersect(other: Edge): Point[];
}

/**
 * Union type for geometric edges (segments or arcs).
 */
export type Edge = Segment | Arc;

/**
 * Represents a polygon with edges and orientation.
 */
export interface Polygon {
  /** Array of edges forming the polygon boundary */
  edges: Edge[];
  /** Orientation of the polygon (clockwise or counter-clockwise) */
  orientation: Orientation;
  /**
   * Finds the index of a given edge in the polygon.
   * @param edge - The edge to find
   * @returns The index of the edge, or -1 if not found
   */
  findIndex(edge: Edge): number;
}

/**
 * Represents a bar structure containing a polygon.
 */
export interface Bar {
  polygon: Polygon;
}

/**
 * Result of finding a connected edge operation.
 */
export interface ConnectedEdgeResult {
  /** The bar containing the connected edge */
  bar: Bar | undefined;
  /** Index of the connected edge within the bar's polygon */
  edgeIndex: number;
}

/**
 * EdgeFinder singleton class for finding and analyzing edges in polygons.
 * Provides utilities for direction-based edge finding, connection detection,
 * and geometric analysis of polygon edges.
 */
export class EdgeFinder {
  private static instance?: EdgeFinder;

  /**
   * Gets the singleton instance of EdgeFinder.
   */
  static get Instance(): EdgeFinder {
    if (!EdgeFinder.instance) {
      EdgeFinder.instance = new EdgeFinder();
    }
    return EdgeFinder.instance;
  }

  /**
   * Finds the index of an edge in a given direction within a polygon.
   * @param direction - The direction to search
   * @param polygon - The polygon to search in
   * @param edges - Optional array of edges to search (defaults to polygon.edges)
   * @returns The index of the found edge, or -1 if not found
   */
  findIndex(direction: Direction, polygon: Polygon, edges?: Edge[]): number {
    const edgesToSearch = edges ?? polygon.edges;
    const foundEdge = this.find(direction, edgesToSearch, polygon.orientation);
    return foundEdge ? polygon.findIndex(foundEdge) : -1;
  }

  /**
   * Finds the index of an edge with inverted vertical direction.
   * Up becomes Down and Down becomes Up before searching.
   * @param direction - The direction to search (will be inverted if Up or Down)
   * @param polygon - The polygon to search in
   * @returns The index of the found edge, or -1 if not found
   */
  findIndex2(direction: Direction, polygon: Polygon): number {
    let adjustedDirection = direction;
    if (direction === Direction.Up) {
      adjustedDirection = Direction.Down;
    } else if (direction === Direction.Down) {
      adjustedDirection = Direction.Up;
    }
    
    const foundEdge = this.find(adjustedDirection, polygon.edges, polygon.orientation);
    return foundEdge ? polygon.findIndex(foundEdge) : -1;
  }

  /**
   * Finds the edge in a given direction from an array of edges.
   * Uses slope comparison based on polygon orientation.
   * @param direction - The direction to search
   * @param edges - Array of edges to search
   * @param orientation - Orientation of the polygon (CW or CCW)
   * @returns The found edge, or undefined if no edges exist
   */
  find(direction: Direction, edges: Edge[], orientation: Orientation): Edge | undefined {
    if (edges.length === 0) {
      return undefined;
    }

    const ORIENTATION_CW = 1; // Clockwise orientation constant
    const TWO_PI = 2 * Math.PI;
    const HALF_PI = Math.PI / 2;
    const THREE_HALF_PI = Math.PI * 3 / 2;
    const EPSILON = 1e-10; // Tolerance for floating point comparison

    const slopeMap = orientation === ORIENTATION_CW
      ? this.slopeInCWRect
      : this.slopeInCCWRect;
    
    const targetSlope = slopeMap.get(direction);

    const sortedEdges = edges.sort((edgeA, edgeB) => {
      const segmentA = this.toSegment(edgeA);
      const segmentB = this.toSegment(edgeB);

      const slopeA = this.normalizeSlope(segmentA.slope, TWO_PI, EPSILON);
      const slopeB = this.normalizeSlope(segmentB.slope, TWO_PI, EPSILON);

      const referenceSl = targetSlope ?? 0;
      const diffA = Math.abs(slopeA - referenceSl);
      const diffB = Math.abs(slopeB - referenceSl);
      const slopeDifference = diffA - diffB;

      if (Math.abs(slopeDifference) < EPSILON) {
        // Slopes are equal, sort by position
        return this.sortByPosition(direction, segmentA, segmentB);
      }

      return slopeDifference;
    });

    return sortedEdges[0];
  }

  /**
   * Normalizes slope values, treating values close to 2π as 0.
   */
  private normalizeSlope(slope: number, twoPi: number, epsilon: number): number {
    return Math.abs(slope - twoPi) < epsilon ? 0 : slope;
  }

  /**
   * Converts an edge to a Segment if needed.
   */
  private toSegment(edge: Edge): Segment {
    return edge as Segment; // Simplified - actual implementation would check type
  }

  /**
   * Sorts segments by position based on direction.
   */
  private sortByPosition(direction: Direction, segA: Segment, segB: Segment): number {
    switch (direction) {
      case Direction.Up:
        return segB.start.y - segA.start.y;
      case Direction.Down:
        return segA.start.y - segB.start.y;
      case Direction.Left:
        return segA.start.x - segB.start.x;
      case Direction.Right:
        return segB.start.x - segA.start.x;
      default:
        return 0;
    }
  }

  /**
   * Finds which direction corresponds to a given edge index in a polygon.
   * @param polygon - The polygon containing the edge
   * @param edgeIndex - The index of the edge to find direction for
   * @param invertVertical - Whether to invert Up/Down directions
   * @returns The direction of the edge, or undefined if not found
   */
  findDirection(polygon: Polygon, edgeIndex: number, invertVertical: boolean = false): Direction | undefined {
    const directions = [Direction.Left, Direction.Right, Direction.Up, Direction.Down];
    
    let foundDirection = directions.find(dir => 
      EdgeFinder.Instance.findIndex(dir, polygon) === edgeIndex
    );

    if (invertVertical && foundDirection) {
      if (foundDirection === Direction.Up) {
        foundDirection = Direction.Down;
      } else if (foundDirection === Direction.Down) {
        foundDirection = Direction.Up;
      }
    }

    return foundDirection;
  }

  /**
   * Finds a connected edge between a given edge and bars.
   * @param edge - The edge to find connections for
   * @param bars - Array of bars to search
   * @returns Result containing the connected bar and edge index
   */
  findConnectedEdge(edge: Edge, bars: Bar[]): ConnectedEdgeResult {
    let connectedEdgeIndex = -1;

    const connectedBar = bars.find(bar => {
      return bar.polygon.edges.some((polygonEdge, index) => {
        const intersections = edge.intersect(polygonEdge);
        if (intersections.length === 2) {
          connectedEdgeIndex = index;
          return true;
        }
        return false;
      });
    });

    return {
      bar: connectedBar,
      edgeIndex: connectedEdgeIndex
    };
  }

  /**
   * Checks if two polygons are connected (share an edge with 2 intersection points).
   * @param polygonA - First polygon
   * @param polygonB - Second polygon
   * @returns True if polygons are connected, false otherwise
   */
  isPolygonConnected(polygonA: Polygon, polygonB: Polygon): boolean {
    const edgesA = polygonA.edges;
    const edgesB = polygonB.edges;

    for (const edgeA of edgesA) {
      for (const edgeB of edgesB) {
        const intersections = edgeA.intersect(edgeB);
        if (intersections.length === 2) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks if a polygon is connected to a specific edge via coinciding segments.
   * @param edge - The edge to check connection with
   * @param polygon - The polygon to check
   * @returns True if connected, false otherwise
   */
  isPolygonConnectedWithEdge(edge: Segment, polygon: Polygon): boolean {
    const polygonEdges = polygon.edges;

    for (const polygonEdge of polygonEdges) {
      if (!(polygonEdge instanceof Object && 'constructor' in polygonEdge)) {
        // Check if segments coincide (simplified - would use Utils.segCoincide)
        if (this.segmentsCoincide(edge, polygonEdge as Segment)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks if two segments coincide (placeholder implementation).
   */
  private segmentsCoincide(segA: Segment, segB: Segment): boolean {
    // Placeholder - actual implementation would check if segments overlap
    return false;
  }

  /**
   * Finds the index of the first connected edge between two polygons.
   * @param polygonA - First polygon
   * @param polygonB - Second polygon
   * @returns Index of connected edge in polygonA, or -1 if not found
   */
  connectedEdgeIndex(polygonA: Polygon, polygonB: Polygon): number {
    const edgesA = polygonA.edges;
    const edgesB = polygonB.edges;

    for (let i = 0; i < edgesA.length; i++) {
      const edgeA = edgesA[i];
      
      for (const edgeB of edgesB) {
        const intersections = edgeA.intersect(edgeB);
        if (intersections.length === 2) {
          return i;
        }
      }
    }

    return -1;
  }

  /**
   * Gets the slope map for clockwise-oriented rectangles.
   * Maps each direction to its expected slope angle in radians.
   */
  private get slopeInCWRect(): Map<Direction, number> {
    const HALF_PI = Math.PI / 2;
    const THREE_HALF_PI = Math.PI * 3 / 2;
    
    return new Map([
      [Direction.Up, 0],
      [Direction.Down, Math.PI],
      [Direction.Left, HALF_PI],
      [Direction.Right, THREE_HALF_PI]
    ]);
  }

  /**
   * Gets the slope map for counter-clockwise-oriented rectangles.
   * Maps each direction to its expected slope angle in radians.
   */
  private get slopeInCCWRect(): Map<Direction, number> {
    const HALF_PI = Math.PI / 2;
    const THREE_HALF_PI = Math.PI * 3 / 2;
    
    return new Map([
      [Direction.Down, 0],
      [Direction.Up, Math.PI],
      [Direction.Right, HALF_PI],
      [Direction.Left, THREE_HALF_PI]
    ]);
  }

  /**
   * Gets the opposite direction for a given direction.
   * @param direction - The input direction
   * @returns The opposite direction
   */
  getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.Left:
        return Direction.Right;
      case Direction.Right:
        return Direction.Left;
      case Direction.Up:
        return Direction.Down;
      case Direction.Down:
        return Direction.Up;
      default:
        return Direction.None;
    }
  }

  /**
   * Converts an OpenDirection to a Direction.
   * @param openDirection - The open direction to convert
   * @returns The corresponding Direction value
   */
  getOpenDirectionToDirection(openDirection: OpenDirection): Direction {
    switch (openDirection) {
      case OpenDirection.Left:
        return Direction.Left;
      case OpenDirection.Right:
        return Direction.Right;
      case OpenDirection.Up:
        return Direction.Up;
      case OpenDirection.Down:
        return Direction.Down;
      default:
        return Direction.None;
    }
  }
}

/**
 * Convenience exports for commonly used Direction values.
 */
export const Right = Direction.Right;
export const Up = Direction.Up;
export const Down = Direction.Down;
export const None = Direction.None;