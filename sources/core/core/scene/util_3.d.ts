/**
 * Utility module providing geometric operations, path manipulation, and region processing
 * for rendering and computational geometry tasks.
 */

declare module 'Util' {
  /**
   * Point in 2D space
   */
  interface Point {
    x: number;
    y: number;
  }

  /**
   * Point with uppercase coordinates (Clipper library format)
   */
  interface ClipperPoint {
    X: number;
    Y: number;
  }

  /**
   * Flexible point type accepting both formats
   */
  type FlexiblePoint = Point | ClipperPoint;

  /**
   * Shape definition with outer boundary and optional holes
   */
  interface Shape {
    outer: Point[];
    holes: Point[][];
  }

  /**
   * Clipper library shape with uppercase coordinate points
   */
  interface ClipperShape {
    outer: ClipperPoint[];
    holes: ClipperPoint[][];
  }

  /**
   * Background region definition
   */
  interface BackgroundRegion {
    outer: Point[];
    holes: Point[][];
  }

  /**
   * Bounding box definition
   */
  interface Bound {
    top: number;
    left: number;
    width: number;
    height: number;
  }

  /**
   * Region containing multiple shapes with computed bounds
   */
  interface Region {
    shapes: Shape[];
    bound?: HSCore.Util.BrepBound;
    bg?: BackgroundRegion;
    width?: number;
    height?: number;
    outer?: Point[];
    isNewFGI?: boolean;
  }

  /**
   * Converted region for Clipper operations
   */
  interface ConvertedRegion {
    origin: Region;
    shapes: ClipperShape[];
  }

  /**
   * Clipper data structure for boolean operations
   */
  interface ClipperData {
    regions: ConvertedRegion[];
    bg: ConvertedRegion;
    bound: ClipperLib.IntRect;
  }

  /**
   * Material paving option
   */
  interface PavingOption {
    point: Point;
  }

  /**
   * Paint definition with material and geometry
   */
  interface Paint {
    path: Point[];
    holes?: Point[][];
    material: unknown;
    pavingOption?: PavingOption;
    dataType?: string;
    isBrick?: boolean;
    free?: boolean;
    isSeam?: boolean;
    isDistrict?: boolean;
    isFlatPaint?: boolean;
    uvDescription?: unknown;
    originalMaterial?: unknown;
    matBound?: Bound;
  }

  /**
   * Processed region with material information
   */
  interface ProcessedRegion {
    shapes: Shape[];
    material: unknown;
    pavingOption?: PavingOption;
    dataType?: string;
    isBrick: boolean;
    isFree: boolean;
    isSeam: boolean;
    isDistrict: boolean;
    isFlatPaint: boolean;
    uvDescription?: unknown;
    FreeBlockOriginalMat?: unknown;
    bound: HSCore.Util.BrepBound;
    matBound?: Bound;
  }

  /**
   * Mix paint container
   */
  interface MixPaint {
    paints: Paint[];
  }

  /**
   * Three.js buffer geometry definition
   */
  interface BufferGeometry {
    attributes: {
      position: { array: Float32Array };
      normal: { array: Float32Array };
      uv: { array: Float32Array };
    };
    index: { array: Uint32Array | Uint16Array };
  }

  /**
   * Mesh definition for export
   */
  interface MeshDefinition {
    vertexCount: number;
    vertexPositions: Float32Array;
    vertexNormals: Float32Array;
    vertexUVs: Float32Array;
    indexCount: number;
    indices: Uint32Array | Uint16Array;
  }

  /**
   * Region with computed result shapes
   */
  interface RegionWithShapes {
    resultShapes: Shape[];
  }

  /**
   * Path command element (e.g., ['C', x1, y1, x2, y2, x3, y3])
   */
  type PathCommand = [string, ...number[]];

  /**
   * Main utility namespace providing geometric and region processing functions
   */
  export const Util: {
    /**
     * Ensures a region has a valid background definition.
     * If missing, generates a rectangular background from width/height.
     * Adjusts hole coordinates for legacy FGI format.
     * 
     * @param region - The region to process
     * @returns The region with valid background
     */
    getBackground(region: Region): Region;

    /**
     * Draws a closed path on a 2D rendering context
     * 
     * @param path - Array of points defining the path
     * @param context - Canvas 2D rendering context
     * @returns The rendering context for chaining
     */
    drawPath(path: ClipperPoint[], context: CanvasRenderingContext2D): CanvasRenderingContext2D;

    /**
     * Computes and caches the bounding box for all shapes in a region
     * 
     * @param region - The region to compute bounds for
     * @returns The region with computed bound property
     */
    computeBound(region: Region): Region;

    /**
     * Converts points from float coordinates to Clipper integer coordinates
     * by multiplying by DEFAULT_SCALE
     * 
     * @param points - Array of points to convert
     * @returns Array of scaled Clipper points
     */
    toClipperPath(points: Point[]): ClipperPoint[];

    /**
     * Converts a region to Clipper-compatible format with scaled coordinates
     * 
     * @param region - The region to convert
     * @returns Converted region with Clipper paths
     */
    convertRegion(region: Region): ConvertedRegion;

    /**
     * Converts a bounding box to Clipper integer coordinates
     * 
     * @param bound - The bound to convert
     * @param scale - Optional scale factor (defaults to DEFAULT_SCALE)
     * @returns Clipper-compatible bounding rectangle
     */
    convertBound(bound: Bound, scale?: number): ClipperLib.IntRect;

    /**
     * Prepares complete Clipper data structure from region hierarchy
     * 
     * @param data - Object containing regions array and background
     * @returns Complete Clipper data structure
     */
    toClipperData(data: { regions: Region[]; bg: Region; bound: Bound }): ClipperData;

    /**
     * Normalizes point objects to consistent X/Y property format
     * 
     * @param path - Array of points with mixed property names
     * @returns Array of points with uppercase X, Y properties
     */
    preparePath(path: FlexiblePoint[]): ClipperPoint[];

    /**
     * Extracts three points from a flat coordinate array [x1, y1, x2, y2, x3, y3]
     * 
     * @param coordinates - Flat array of coordinates
     * @returns Array of three point objects
     */
    toPoints(coordinates: number[]): Point[];

    /**
     * Performs boolean operations (union, difference, intersection) on polygon paths
     * using the Clipper library
     * 
     * @param subjectPaths - Subject polygon paths
     * @param clipPaths - Clipping polygon paths
     * @param clipType - Type of boolean operation (optional, defaults to difference)
     * @param scale - Coordinate scaling factor (optional, defaults to 100000)
     * @returns Array of resulting shapes with outer boundary and holes
     */
    crop(
      subjectPaths: ClipperPoint[][],
      clipPaths: ClipperPoint[][][],
      clipType?: ClipperLib.ClipType,
      scale?: number
    ): Shape[];

    /**
     * Advanced path preparation with Bezier curve flattening and boolean intersection.
     * Converts curved paths to polygonal paths and clips against material boundaries.
     * 
     * @param subjectPaths - Base paths to process
     * @param curvePaths - Array of path commands (including Bezier curves)
     * @param bound - Bounding box for coordinate transformation
     * @param offset - Offset to apply to coordinates
     * @returns Array of clipped shapes
     */
    preparePathEx(
      subjectPaths: ClipperPoint[][],
      curvePaths: PathCommand[][],
      bound: ClipperLib.IntRect,
      offset: Point
    ): Shape[];

    /**
     * Extracts geometric shapes from a paint object, handling material-specific
     * boundary processing if available
     * 
     * @param paint - Paint definition with path and material
     * @returns Array of shapes (may be subdivided by material pattern)
     */
    getShapes(paint: Paint): Shape[];

    /**
     * Processes a paint object with pattern material ("pinhua"),
     * applying material boundary constraints to the path
     * 
     * @param paint - Paint definition to process
     * @returns Updated paint with processed path
     */
    getPinhuaPaint(paint: Paint): Paint;

    /**
     * Converts a mix paint object to an array of processed regions,
     * applying material-specific shape extraction and bound computation
     * 
     * @param mixPaint - Container with multiple paint definitions
     * @returns Array of processed regions with material data
     */
    mixpaintToRegion(mixPaint: MixPaint): ProcessedRegion[];

    /**
     * Converts a Three.js buffer geometry to a mesh definition structure
     * for serialization or export
     * 
     * @param geometry - Three.js buffer geometry
     * @returns Mesh definition with vertex and index data
     */
    bufferToMeshDef(geometry: BufferGeometry): MeshDefinition;

    /**
     * Normalizes a point to lowercase x, y property format
     * 
     * @param point - Point with either x/y or X/Y properties
     * @returns Point with lowercase x, y properties
     */
    to_xy(point: FlexiblePoint): Point;

    /**
     * Checks if a line segment matches any edge in a region's shape boundaries
     * (outer or holes) within a specified tolerance
     * 
     * @param region - Region with result shapes to test against
     * @param startPoint - Line segment start point
     * @param endPoint - Line segment end point
     * @param tolerance - Optional distance tolerance for matching (defaults to 1e-6)
     * @returns True if the line segment matches any edge
     */
    isLineSegmentInRegionPath(
      region: RegionWithShapes,
      startPoint: FlexiblePoint,
      endPoint: FlexiblePoint,
      tolerance?: number
    ): boolean;

    /**
     * Extracts outline definitions from Clipper shapes,
     * converting from uppercase X/Y to lowercase x/y format
     * 
     * @param data - Object containing Clipper shapes
     * @returns Array of shapes with normalized point format
     */
    getOutlines(data: { shapes: ClipperShape[] }): Shape[];
  };
}