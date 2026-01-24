/**
 * MixPaint module provides utilities for managing paint data, grids, materials, and polygon operations.
 * Used for tile/material paving, grid generation, and geometric transformations.
 */

import { PavingOption } from './PavingOption';

/**
 * Represents a 2D point with x and y coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Represents a bounding box with min/max coordinates and dimensions
 */
export interface BoundingBox {
  /** Maximum X coordinate */
  maxx: number;
  /** Maximum Y coordinate */
  maxy: number;
  /** Minimum X coordinate */
  minx: number;
  /** Minimum Y coordinate */
  miny: number;
  /** Width of the bounding box (maxx - minx) */
  length: number;
  /** Height of the bounding box (maxy - miny) */
  width: number;
  /** Center X coordinate */
  centerx: number;
  /** Center Y coordinate */
  centery: number;
  /** Alias for minx */
  x: number;
  /** Alias for miny */
  y: number;
}

/**
 * Represents material data with tiling, offset, rotation, and flip properties
 */
export interface Material {
  /** Tile size in X direction (default: 1) */
  tileSize_x?: number;
  /** Tile size in Y direction (default: 1) */
  tileSize_y?: number;
  /** Legacy tile size property */
  tileSize?: number;
  /** Material rotation in degrees */
  rotation?: number;
  /** Offset in X direction (default: 0) */
  offsetX?: number;
  /** Offset in Y direction (default: 0) */
  offsetY?: number;
  /** Flip horizontally (default: false) */
  flipX?: boolean;
  /** Flip vertically (default: false) */
  flipY?: boolean;
  /** Seam color as integer */
  seamColor?: number;
  /** Seam width */
  seamWidth?: number;
  /** Material for seams */
  seamMaterial?: Material | { color?: unknown };
  /** Parent material reference */
  parent?: {
    seekId?: string | number;
  };
  /** Unique identifier for the material */
  seekId?: string | number;
  /** MixPaint specific data */
  mixpaint?: {
    faceGroupId?: string | number;
    faceGroupBoundMap?: Record<string, BoundingBox & { left: number; top: number; height: number }>;
  };
}

/**
 * Represents a grid material mapping with polygons and percentage coverage
 */
export interface GridMaterial {
  /** Unique identifier */
  seekId: string | number;
  /** List of polygon IDs using this material */
  polygons: (string | number)[];
  /** Percentage of total grid covered by this material (0-1) */
  percent: number;
}

/**
 * Represents a grid polygon with material and paving options
 */
export interface GridPolygon {
  /** Unique identifier */
  id: string | number;
  /** Material applied to this polygon */
  material: Material;
  /** Holes within the polygon */
  holes?: Point[][];
  /** Original points before transformation */
  originPoints?: Point[];
  /** Polygon boundary path */
  path: Point[];
  /** Paving configuration */
  pavingOption: PavingOption;
}

/**
 * Represents a grid structure with polygons and materials
 */
export interface Grid {
  /** List of grid polygons */
  gridPolygons: GridPolygon[];
  /** Materials used in the grid */
  materials: GridMaterial[];
  /** Tile size in X direction */
  tileSizeX: number;
  /** Tile size in Y direction */
  tileSizeY: number;
  /** Flag indicating if this is a pattern-based grid */
  isPatternGrid?: boolean;
}

/**
 * Represents a waistline polygon with optional grid
 */
export interface WaistlinePolygon {
  /** Polygon boundary path */
  path: Point[];
  /** Optional grid structure */
  grid?: Grid | null;
}

/**
 * Represents waistline configuration
 */
export interface Waistline {
  /** List of waistline polygons */
  waistlinePolygons: WaistlinePolygon[];
}

/**
 * Represents a paint layer with path, material, and optional grid/pattern
 */
export interface Paint {
  /** Polygon boundary path */
  path: Point[];
  /** Material applied to this paint */
  material?: Material;
  /** Paving configuration */
  pavingOption?: PavingOption;
  /** Optional grid structure */
  grid?: Grid | null;
  /** Optional pattern configuration */
  pattern?: unknown;
  /** Optional waistline configuration */
  waistline?: Waistline;
}

/**
 * Represents an entity with paints and background material
 */
export interface PaintEntity {
  /** List of paint layers */
  paints?: Paint[];
  /** Background material */
  backgroundMaterial?: Material;
  /** Entity dimensions */
  width?: number;
  height?: number;
}

/**
 * Represents polygon data with outer boundary
 */
export interface PolygonData {
  /** Outer boundary points */
  outer: Point[];
}

/**
 * Represents a wall polygon
 */
export interface WallPolygon {
  /** Polygon boundary points */
  points: Point[];
}

/**
 * Represents a boundary with wall polygons
 */
export interface Boundary {
  /** List of wall polygons */
  wallPolygons?: WallPolygon[];
  /** Boundary width */
  width?: number;
}

/**
 * Represents offset calculation details for polygon edges
 */
export interface OffsetInfo {
  /** Index of the point */
  index: number;
  /** Current edge direction vector */
  curDir: { x: number; y: number };
  /** Previous edge direction vector */
  preDir: { x: number; y: number };
  /** Angle in radians between edges */
  radian: number;
  /** Flag indicating convex (yang) vs concave angle */
  isyang: boolean;
}

/**
 * MixPaint utility class for paint data manipulation, grid generation, and geometric operations
 */
export declare class MixPaint {
  /**
   * Updates paint data by scaling paths and materials based on entity dimensions
   * @param entity - The entity containing paints to update
   * @param dimensions - Dimensions object with width and height
   * @param polygonData - Polygon data with outer boundary
   * @param shouldUpdateGrid - Flag to enable grid/pattern updates
   */
  static updatePaintData(
    entity: PaintEntity,
    dimensions: { width: number; height: number },
    polygonData: PolygonData,
    shouldUpdateGrid?: boolean
  ): void;

  /**
   * Creates a grid structure from a polygon with specified tiling parameters
   * @param polygon - The polygon to generate grid for
   * @param material - Material to apply
   * @param tileSizeX - Tile size in X direction
   * @param tileSizeY - Tile size in Y direction
   * @param offsetX - Offset in X direction
   * @param offsetY - Offset in Y direction
   * @param rotation - Rotation angle in degrees
   * @param isCustom - Flag for custom grid generation
   * @returns Generated grid structure
   */
  static createGrid(
    polygon: unknown,
    material: Material,
    tileSizeX: number,
    tileSizeY: number,
    offsetX: number,
    offsetY: number,
    rotation: number,
    isCustom: boolean
  ): unknown;

  /**
   * Creates grid shapes (blocks/tiles) from a polygon
   * @param polygon - The polygon to generate shapes for
   * @param material - Material to apply
   * @param tileSizeX - Tile size in X direction
   * @param tileSizeY - Tile size in Y direction
   * @param offsetX - Offset in X direction
   * @param offsetY - Offset in Y direction
   * @param rotation - Rotation angle in degrees
   * @returns Array of generated shapes
   */
  static createGridShapes(
    polygon: unknown,
    material: Material,
    tileSizeX: number,
    tileSizeY: number,
    offsetX: number,
    offsetY: number,
    rotation: number
  ): unknown[];

  /**
   * Calculates the bounding box of a set of points
   * @param points - Array of points
   * @returns Bounding box with min/max coordinates and dimensions
   */
  static getBoundingBox(points: Point[]): BoundingBox;

  /**
   * Normalizes rotation angle to range [-90, 90] degrees
   * @param rotation - Input rotation angle in degrees
   * @returns Normalized rotation angle
   */
  static gridRotation(rotation: number): number;

  /**
   * Gets the width of the selected boundary
   * @param boundary - Boundary object with wall polygons
   * @returns Boundary width or 0 if invalid
   */
  static getSelectedBoundaryWidth(boundary: Boundary | null | undefined): number;

  /**
   * Calculates offset points for a polygon (inset/outset)
   * @param points - Original polygon points
   * @param offsetDistance - Offset distance (positive = outset, negative = inset)
   * @param offsetInfos - Optional array to receive offset calculation details
   * @returns Array of offset points
   */
  static getPolygonOffsetPoints(
    points: Point[],
    offsetDistance: number,
    offsetInfos?: OffsetInfo[]
  ): Point[];

  /**
   * Gets material tile size in X direction
   * @param material - Material object
   * @returns Tile size X (default: 1)
   */
  static getMaterialTileSizeX(material: Material): number;

  /**
   * Gets material tile size in Y direction
   * @param material - Material object
   * @returns Tile size Y (default: 1)
   */
  static getMaterialTileSizeY(material: Material): number;

  /**
   * Gets material rotation angle
   * @param material - Material object
   * @returns Rotation in degrees (default: 0)
   */
  static getMaterialRotation(material: Material | null | undefined): number;

  /**
   * Gets material offset in X direction
   * @param material - Material object
   * @returns Offset X (default: 0)
   */
  static getMaterialOffsetX(material: Material): number;

  /**
   * Gets material offset in Y direction
   * @param material - Material object
   * @returns Offset Y (default: 0)
   */
  static getMaterialOffsetY(material: Material): number;

  /**
   * Gets material flip flag in X direction
   * @param material - Material object
   * @returns Flip X (default: false)
   */
  static getMaterialFlipX(material: Material): boolean;

  /**
   * Gets material flip flag in Y direction
   * @param material - Material object
   * @returns Flip Y (default: false)
   */
  static getMaterialFlipY(material: Material): boolean;

  /**
   * Calculates tile offset for water jet cutting based on face group bounds
   * @param entity - Entity with position and host material
   * @returns Offset point { x, y } (default: { x: 0, y: 0 })
   */
  static getWaterJetTileOffset(entity: {
    position: Point;
    getHost?: () => { material?: Material } | null | undefined;
  }): Point;
}