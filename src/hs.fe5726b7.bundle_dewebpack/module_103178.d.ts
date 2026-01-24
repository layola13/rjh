/**
 * SVG Loader for THREE.js
 * Parses SVG files and converts them to THREE.js ShapePath objects
 */

declare namespace THREE {
  /**
   * Style properties for SVG elements
   */
  interface SVGStyle {
    /** Fill color in CSS format (e.g., "#000", "rgb(0,0,0)", "none") */
    fill?: string;
    /** Fill opacity (0.0 to 1.0) */
    fillOpacity?: number;
    /** Stroke color in CSS format */
    stroke?: string;
    /** Stroke opacity (0.0 to 1.0) */
    strokeOpacity?: number;
    /** Stroke width in pixels */
    strokeWidth?: number;
    /** Line join style */
    strokeLineJoin?: 'miter' | 'round' | 'bevel' | 'miter-clip';
    /** Line cap style */
    strokeLineCap?: 'butt' | 'round' | 'square';
    /** Miter limit for stroke joins */
    strokeMiterLimit?: number;
  }

  /**
   * User data attached to parsed SVG paths
   */
  interface SVGPathUserData {
    /** Original SVG DOM node */
    node: SVGElement;
    /** Computed style properties */
    style: SVGStyle;
  }

  /**
   * Result of SVG parsing
   */
  interface SVGParseResult {
    /** Array of parsed ShapePath objects */
    paths: ShapePath[];
    /** Root SVG element from parsed document */
    xml: SVGSVGElement;
  }

  /**
   * Configuration for stroke rendering
   */
  interface StrokeStyle {
    /** Stroke color in CSS format */
    strokeColor: string;
    /** Stroke width in pixels */
    strokeWidth: number;
    /** Line join style */
    strokeLineJoin: 'miter' | 'round' | 'bevel' | 'miter-clip';
    /** Line cap style */
    strokeLineCap: 'butt' | 'round' | 'square';
    /** Miter limit for stroke joins */
    strokeMiterLimit: number;
  }

  /**
   * Loads and parses SVG files into THREE.js geometry
   */
  class SVGLoader {
    /**
     * Loading manager for handling load events
     */
    manager: LoadingManager;

    /**
     * Base path for loading SVG files
     */
    path?: string;

    /**
     * Creates a new SVGLoader instance
     * @param manager - Optional loading manager (defaults to THREE.DefaultLoadingManager)
     */
    constructor(manager?: LoadingManager);

    /**
     * Loads an SVG file from the specified URL
     * @param url - URL of the SVG file to load
     * @param onLoad - Callback invoked with parsed SVG data on successful load
     * @param onProgress - Optional callback for tracking load progress
     * @param onError - Optional callback invoked on load error
     */
    load(
      url: string,
      onLoad: (data: SVGParseResult) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (error: ErrorEvent) => void
    ): void;

    /**
     * Sets the base path for loading SVG files
     * @param path - Base path (e.g., "/assets/svg/")
     * @returns This loader instance for method chaining
     */
    setPath(path: string): this;

    /**
     * Parses an SVG string into ShapePath objects
     * @param svgString - Raw SVG markup as string
     * @returns Parsed paths and root SVG element
     */
    parse(svgString: string): SVGParseResult;

    /**
     * Creates a stroke style configuration object
     * @param strokeWidth - Width of the stroke (default: 1)
     * @param strokeColor - Color of the stroke (default: "#000")
     * @param strokeLineJoin - Line join style (default: "miter")
     * @param strokeLineCap - Line cap style (default: "butt")
     * @param strokeMiterLimit - Miter limit (default: 4)
     * @returns Stroke style configuration
     */
    static getStrokeStyle(
      strokeWidth?: number,
      strokeColor?: string,
      strokeLineJoin?: 'miter' | 'round' | 'bevel' | 'miter-clip',
      strokeLineCap?: 'butt' | 'round' | 'square',
      strokeMiterLimit?: number
    ): StrokeStyle;

    /**
     * Converts an array of 2D points into a stroke mesh geometry
     * @param points - Array of 2D points defining the path
     * @param style - Stroke style configuration
     * @param arcDivisions - Number of divisions for arc rendering (default: 12)
     * @param minDistance - Minimum distance between points (default: 0.001)
     * @returns BufferGeometry with position, normal, and UV attributes, or null if no geometry generated
     */
    static pointsToStroke(
      points: Vector2[],
      style: StrokeStyle,
      arcDivisions?: number,
      minDistance?: number
    ): BufferGeometry | null;

    /**
     * Converts points to stroke geometry using provided buffers (advanced usage)
     * @param points - Array of 2D points defining the path
     * @param style - Stroke style configuration
     * @param arcDivisions - Number of divisions for arc rendering (default: 12)
     * @param minDistance - Minimum distance between points (default: 0.001)
     * @param positions - Output array for vertex positions (x,y,z triplets)
     * @param normals - Output array for vertex normals (x,y,z triplets)
     * @param uvs - Output array for UV coordinates (u,v pairs)
     * @param vertexOffset - Starting vertex index in buffers (default: 0)
     * @returns Number of vertices added to buffers
     */
    static pointsToStrokeWithBuffers(
      points: Vector2[],
      style: StrokeStyle,
      arcDivisions: number,
      minDistance: number,
      positions: number[],
      normals: number[],
      uvs: number[],
      vertexOffset?: number
    ): number;
  }

  /**
   * Extended ShapePath with SVG metadata
   */
  interface ShapePath {
    /** User-defined data (contains SVG node and style info) */
    userData?: SVGPathUserData;
    /** Fill color (if specified) */
    color?: Color;
  }
}