/**
 * Performs polygon tessellation using GLU tessellation API.
 * Processes input polygons and holes to generate triangulated output.
 * 
 * @param polygons - Array of polygon contours, where each contour is an array of vertices
 * @param holes - Array of hole contours, where each contour is an array of vertices
 * 
 * @remarks
 * This method:
 * 1. Initializes tessellation state (_current and _out arrays)
 * 2. Begins a new polygon tessellation session
 * 3. Processes all input polygon contours
 * 4. Processes all hole contours
 * 5. Finalizes tessellation to generate output geometry
 * 
 * Each vertex is passed to gluTessVertex with the vertex data used as both
 * the coordinate and the associated data payload.
 * 
 * @throws May throw errors from the underlying GLU tessellation implementation
 */
declare function tessellatePolygonWithHoles(
  polygons: Iterable<Iterable<TessellationVertex>>,
  holes: Iterable<Iterable<TessellationVertex>>
): void;

/**
 * Represents a vertex used in tessellation operations.
 * Typically a coordinate array or object with position data.
 */
type TessellationVertex = number[] | { x: number; y: number; z?: number } | unknown;

/**
 * Internal state: current working data during tessellation
 */
declare const _current: unknown[];

/**
 * Internal state: output tessellation results
 */
declare const _out: unknown[];

/**
 * Begins a new polygon tessellation session.
 * Must be called before defining polygon contours.
 */
declare function gluTessBeginPolygon(): void;

/**
 * Begins a new contour within the current polygon.
 * A contour represents either an outer boundary or an inner hole.
 */
declare function gluTessBeginContour(): void;

/**
 * Adds a vertex to the current contour.
 * 
 * @param coords - The vertex coordinates
 * @param data - Associated vertex data (can be the same as coords)
 */
declare function gluTessVertex(coords: TessellationVertex, data: TessellationVertex): void;

/**
 * Ends the current contour definition.
 * Must be called after all vertices for a contour have been added.
 */
declare function gluTessEndContour(): void;

/**
 * Completes the polygon tessellation and generates output.
 * Must be called after all contours have been defined.
 */
declare function gluTessEndPolygon(): void;