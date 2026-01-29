/**
 * Represents a 2D face in the extraordinary sketch system.
 * A face consists of an outer loop and optional inner loops (holes).
 */
export declare class ExtraordinaryFace2d extends ExtraordinarySketchBase {
    /** The outer boundary loop of the face */
    private _outerLoop: ExtraordinaryWire;
    
    /** Collection of inner loops representing holes in the face */
    private _innerLoops: ExtraordinaryWire[];
    
    /** Topology identifiers associated with this face */
    topos: string[];

    /**
     * Creates a new 2D face instance.
     * @param id - Unique identifier for the face
     */
    constructor(id: unknown);

    /**
     * Gets the outer boundary loop of the face.
     */
    get outerLoop(): ExtraordinaryWire;

    /**
     * Sets the outer boundary loop and establishes bidirectional relationship.
     * @param loop - The wire to set as outer loop
     */
    setOuterLoop(loop: ExtraordinaryWire): void;

    /**
     * Gets all inner loops (holes) of the face.
     */
    get innerLoops(): ExtraordinaryWire[];

    /**
     * Sets the inner loops and establishes bidirectional relationships.
     * @param loops - Array of wires representing holes
     */
    setInnerLoops(loops: ExtraordinaryWire[]): void;

    /**
     * Converts the face to a builder region format with proper orientation.
     * Ensures outer loop is counterclockwise and holes are clockwise.
     * @param context - Building context parameter
     * @returns Builder region with outer curve, holes, and topology identifier
     */
    toBuilderRegion(context: unknown): BuilderRegion;

    /**
     * Converts the face to a mathematical polygon representation.
     * Ensures proper orientation: outer loop counterclockwise, holes clockwise.
     * @returns Polygon instance with outer and inner loops
     */
    toMathPolygon(): Polygon;

    /**
     * Converts the face to a polygon structure with curves.
     * @returns Object containing outer curves and hole curves
     */
    toPolygon(): PolygonCurves;

    /**
     * Gets the combined topology name from all topos.
     * @returns Colon-separated topology names, or undefined if empty
     */
    get topoName(): string | undefined;

    /**
     * Replaces occurrences of a topology name with a new name.
     * Removes duplicates while preserving order.
     * @param oldName - Name to replace
     * @param newName - New name to use
     */
    replaceTopoName(oldName: string, newName: string): void;

    /**
     * Reverses the direction of builder curves.
     * @param curves - Array of builder curves to reverse
     * @returns Reversed array with each curve reversed
     */
    private _reverseBuilderCurve(curves: BuilderCurve[]): BuilderCurve[];

    /**
     * Decodes a topology name string into face ID and name components.
     * @param topoString - String in format "faceId_topoName" or "background"
     * @returns Object with faceId and optional topoName
     */
    static decodeTopoName(topoString: string): DecodedTopoName;
}

/**
 * Builder region structure for geometric construction.
 */
export interface BuilderRegion {
    /** Outer boundary curves in counterclockwise order */
    outer: BuilderCurve[];
    
    /** Inner hole curves in clockwise order */
    holes: BuilderCurve[][];
    
    /** Topology identifier string */
    topo: string;
}

/**
 * Builder curve with topology information.
 */
export interface BuilderCurve {
    /** The geometric curve */
    curve: unknown;
    
    /** Topology identifier */
    topo: string;
}

/**
 * Polygon representation with curves.
 */
export interface PolygonCurves {
    /** Outer boundary curves */
    outer: unknown[];
    
    /** Arrays of curves for each hole */
    holes: unknown[][];
}

/**
 * Decoded topology name components.
 */
export interface DecodedTopoName {
    /** Face identifier (-1 for background) */
    faceId: number;
    
    /** Optional topology name (undefined if "null") */
    topoName?: string;
}

/**
 * Base class for extraordinary sketch elements.
 */
declare class ExtraordinarySketchBase {
    /** Unique identifier */
    id: unknown;
    
    constructor(id: unknown);
}

/**
 * Represents a wire (connected sequence of edges) in 2D space.
 */
declare class ExtraordinaryWire {
    /** The face this wire belongs to */
    face?: ExtraordinaryFace2d;
    
    constructor(edges: unknown[], face?: ExtraordinaryFace2d);
    
    /**
     * Converts wire to builder curves.
     */
    toBuilderCurves(context: unknown): BuilderCurve[];
    
    /**
     * Converts wire to mathematical loop.
     */
    toMathLoop(): MathLoop;
}

/**
 * Mathematical loop with orientation operations.
 */
declare class MathLoop {
    /**
     * Checks if the loop is oriented counterclockwise.
     */
    isAnticlockwise(): boolean;
    
    /**
     * Reverses the loop orientation.
     */
    reverse(): void;
    
    /**
     * Gets all curves in the loop.
     */
    getAllCurves(): unknown[];
}

/**
 * Polygon with outer boundary and holes.
 */
declare class Polygon {
    constructor(loops: MathLoop[]);
}