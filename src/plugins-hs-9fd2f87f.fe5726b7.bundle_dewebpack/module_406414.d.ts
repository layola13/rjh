/**
 * Assembly data builder for 3D models
 * Converts entity collections into structured assembly metadata with bounding boxes and product positions
 */

/**
 * 3D vector representing spatial dimensions or coordinates
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Bounding box dimensions in centimeters
 */
export interface BoundingBox {
  /** Length along X axis in centimeters */
  xLen: number;
  /** Length along Y axis in centimeters */
  yLen: number;
  /** Length along Z axis in centimeters */
  zLen: number;
}

/**
 * 3D rotation angles (likely Euler angles or quaternion components)
 */
export interface Rotation {
  [key: string]: number;
}

/**
 * Scale factors for each axis
 */
export interface Scale {
  /** Scale factor along X axis */
  XScale: number;
  /** Scale factor along Y axis */
  YScale: number;
  /** Scale factor along Z axis */
  ZScale: number;
}

/**
 * Product instance within an assembly
 */
export interface Product {
  /** Unique identifier for the product */
  id: string | number;
  /** Position in 3D space (in centimeters, relative to assembly center) */
  position: Vector3D;
  /** Rotation transformation */
  rotation: Rotation;
  /** Scale transformation */
  scale: Scale;
  /** Optional variation identifier if different from base product ID */
  variation?: string | number;
}

/**
 * Complete assembly data structure
 */
export interface AssemblyData {
  /** Assembly metadata from HSCore.Doc.AssemblyMeta */
  meta: unknown;
  /** Overall bounding box of the assembly */
  boundingBox: BoundingBox;
  /** Collection of products in the assembly */
  Products: Product[];
}

/**
 * 3D entity with spatial properties and transformation data
 */
export interface Entity {
  /** Unique seek identifier */
  seekId: string | number;
  /** Optional variation identifier */
  variationId?: string | number;
  /** X coordinate in meters */
  x: number;
  /** Y coordinate in meters */
  y: number;
  /** Z coordinate (bottom) in meters */
  z: number;
  /** Size along Z axis in meters */
  ZSize: number;
  /** Bounding volume */
  bound: unknown;
  /** Rotation data */
  rotation: Rotation;
  /** X axis scale factor */
  XScale: number;
  /** Y axis scale factor */
  YScale: number;
  /** Z axis scale factor */
  ZScale: number;
  /**
   * Check if entity has a specific flag set
   * @param flag - Flag to check (e.g., EntityFlagEnum.removed)
   */
  isFlagOn(flag: number): boolean;
}

/**
 * Assembly data builder utility class
 * Converts a collection of 3D entities into structured assembly JSON data
 */
export default class AssemblyDataBuilder {
  /**
   * Builds assembly data from a collection of entities
   * Calculates bounding boxes, normalizes positions to assembly center,
   * and converts units from meters to centimeters
   * 
   * @param entities - Array of 3D entities to process
   * @returns JSON string representation of the assembly data
   */
  buildAssemblyData(entities: Entity[]): string;
}