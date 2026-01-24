/**
 * Polygon fill type determines how overlapping regions are handled during clipping operations.
 * @see {@link https://sourceforge.net/p/polyclipping/wiki/PolyFillType/}
 */
export enum PolyFillType {
  /** Even-Odd fill rule: alternating fill regions */
  EvenOdd = "evenOdd",
  /** Non-Zero fill rule: filled based on winding number */
  NonZero = "nonZero",
  /** Positive fill rule: only positive winding numbers are filled */
  Positive = "positive",
  /** Negative fill rule: only negative winding numbers are filled */
  Negative = "negative"
}

/**
 * Boolean operation type for clipping polygons.
 */
export enum ClipType {
  /** Intersection: returns the overlapping region of subject and clip polygons */
  Intersection = "intersection",
  /** Union: combines subject and clip polygons */
  Union = "union",
  /** Difference: subtracts clip polygons from subject polygons */
  Difference = "difference",
  /** Exclusive OR: returns regions covered by one but not both polygon sets */
  Xor = "xor"
}

/**
 * Polygon type in a clipping operation.
 */
export enum PolyType {
  /** Subject polygon: the primary polygon being clipped */
  Subject = "subject",
  /** Clip polygon: the polygon used to clip the subject */
  Clip = "clip"
}

/**
 * Join type for offsetting polygon edges.
 * Determines how corners are handled when creating offset polygons.
 */
export enum JoinType {
  /** Square corners with sharp edges */
  Square = "square",
  /** Rounded corners with arc segments */
  Round = "round",
  /** Mitered corners extending to a point */
  Miter = "miter"
}

/**
 * End type for open paths in offset operations.
 * Specifies how the ends of open paths should be capped.
 */
export enum EndType {
  /** Closed polygon: connects last point to first */
  ClosedPolygon = "closedPolygon",
  /** Closed line: treats path as closed but not filled */
  ClosedLine = "closedLine",
  /** Open with butt cap: flat end perpendicular to path */
  OpenButt = "openButt",
  /** Open with square cap: extended square end */
  OpenSquare = "openSquare",
  /** Open with round cap: semicircular end */
  OpenRound = "openRound"
}

/**
 * Result of point-in-polygon test.
 * Indicates the relationship between a point and a polygon boundary.
 */
export enum PointInPolygonResult {
  /** Point is outside the polygon */
  Outside = 0,
  /** Point is inside the polygon */
  Inside = 1,
  /** Point lies exactly on the polygon boundary */
  OnBoundary = -1
}

/**
 * Requested format for loading the native Clipper library.
 * Allows fallback strategies for WebAssembly support.
 */
export enum NativeClipperLibRequestedFormat {
  /** Prefer WebAssembly with asm.js fallback if WASM unavailable */
  WasmWithAsmJsFallback = "wasmWithAsmJsFallback",
  /** Load WebAssembly only, fail if unavailable */
  WasmOnly = "wasmOnly",
  /** Load asm.js only, skip WebAssembly */
  AsmJsOnly = "asmJsOnly"
}

/**
 * Actual format of the loaded native Clipper library.
 * Indicates which binary format was successfully loaded.
 */
export enum NativeClipperLibLoadedFormat {
  /** WebAssembly format loaded */
  Wasm = "wasm",
  /** asm.js format loaded */
  AsmJs = "asmJs"
}