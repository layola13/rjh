/**
 * Point-on-Point association constraint.
 * Ensures that one vertex remains coincident with another vertex.
 * When the source vertex moves, the target vertex is updated to maintain the constraint.
 */
export class PointOnPointAssociation extends Association {
    /**
     * Creates a new point-on-point association constraint.
     * @param entity - The source vertex that drives the constraint
     * @param target - The target vertex that follows the source
     */
    constructor(entity: Vertex, target: Vertex);

    /**
     * Computes and applies the constraint, updating the target vertex position.
     * Also updates connected split/inner edges to maintain geometric consistency.
     * @param propagate - Whether to propagate changes to dependent constraints (default: true)
     */
    compute(propagate?: boolean): void;
}

/**
 * Represents a geometric constraint between entities.
 * Base class for all association types in the modeling system.
 */
declare class Association {
    /** The entity driving this constraint */
    protected entity: unknown;
    
    /** The first target entity affected by this constraint */
    protected firstTarget: unknown;

    /**
     * Registers an association class with the modeling system.
     * @param modelClass - The model class identifier constant
     * @param associationClass - The association class constructor
     */
    static registerClass(
        modelClass: string,
        associationClass: new (...args: any[]) => Association
    ): void;

    constructor(entity: unknown, target: unknown);
}

/**
 * Represents a geometric vertex point in 2D space.
 */
declare class Vertex {
    /** X coordinate of the vertex */
    x: number;
    
    /** Y coordinate of the vertex */
    y: number;

    /**
     * Updates the vertex position.
     * @param x - New X coordinate
     * @param y - New Y coordinate
     * @param z - Optional Z coordinate (unused in 2D)
     * @param propagate - Whether to propagate changes to constraints
     */
    set(x: number, y: number, z: undefined, propagate: boolean): void;
}

/**
 * Represents an edge connecting two vertices.
 */
declare interface Edge {
    /** Starting vertex of the edge */
    from: Vertex;
    
    /** Ending vertex of the edge */
    to: Vertex;
    
    /** Whether this edge was created by splitting another edge */
    isSplitEdge: boolean;
    
    /** Whether this edge is internal to a shape (not on the boundary) */
    isInnerEdge: boolean;
}

/**
 * Utility functions for point and vertex operations.
 */
declare namespace PointUtil {
    /**
     * Retrieves all edges connected to a given vertex.
     * @param vertex - The vertex to query
     * @returns Array of edges connected to the vertex
     */
    function getParentEdges(vertex: Vertex): Edge[];
}

/**
 * Core mathematical utilities.
 */
declare namespace HSCore.Util.Math.Vec2 {
    /**
     * Computes the vector difference between two points.
     * @param point1 - The first point
     * @param point2 - The second point
     * @returns Vector representing (point1 - point2)
     */
    function difference(
        point1: { x: number; y: number },
        point2: { x: number; y: number }
    ): { x: number; y: number };
}

/**
 * Model class identifier constants.
 */
declare namespace HSConstants.ModelClass {
    /** Identifier for point-on-point association constraint type */
    const PointOnPointAssociation: string;
}