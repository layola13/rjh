/**
 * Decorator class for MixPaint operations, providing utilities for paint region analysis,
 * bounding box calculations, and gusset model region management.
 */
export declare class MixPaintDecorator {
  /**
   * The associated MixPaint instance
   */
  private readonly mixpaint: MixPaint;

  /**
   * Creates a new MixPaintDecorator instance
   * @param mixpaint - The MixPaint object to decorate
   */
  constructor(mixpaint: MixPaint);

  /**
   * Determines if a region is a gusset-free region based on its content type.
   * A region is considered gusset-free if its first pattern unit's material
   * is of type KitchenCeiling3d.
   * @param region - The region to check
   * @returns True if the region is a gusset-free region, false otherwise
   */
  private isGussetFreeRegion(region: Region): boolean;

  /**
   * Checks if this is a simple mix paint without complex paving regions.
   * Returns true if there are no pave regions, or only one region without a template.
   * @returns True if this is a simple mix paint, false otherwise
   */
  isSimpleMixPaint(): boolean;

  /**
   * Gets the bounding box for the pave area.
   * First attempts to get from face group, falls back to mixPave BBox if unavailable.
   * @param faceId - Optional face identifier for specific face bounding box
   * @returns A 2D bounding box for the pave area
   */
  getPaveBoundingBox(faceId?: string): THREE.Box2;

  /**
   * Finds and groups all gusset model regions by their template identifier.
   * Iterates through free regions and collects those matching gusset criteria.
   * @returns Map of template identifiers to arrays of matching regions
   */
  findGussetModelRegions(): Map<string, Region[]>;

  /**
   * Checks if any gusset model regions exist in the mix pave.
   * @returns True if at least one gusset model region is found, false otherwise
   */
  hasGussetModelRegions(): boolean;

  /**
   * Gets the offset and transformation matrix for a specific face in the face group.
   * @param faceId - The identifier of the face to query
   * @returns Object containing left/bottom offsets and transformation matrix, or undefined if face not found
   */
  getFaceGroupOffset(faceId: string): FaceGroupOffset | undefined;
}

/**
 * Represents a MixPaint object with paving and face group information
 */
interface MixPaint {
  /** The mixed pave configuration containing regions */
  mixPave: MixPave;
  /** The face group containing geometric information */
  faceGroup: FaceGroup;
}

/**
 * Mixed pave configuration with regions and bounding box
 */
interface MixPave {
  /** Array of paving regions */
  regions: Region[];
  /** Overall bounding box for the pave area */
  BBox: BoundingBox3D;
}

/**
 * A paving region with pattern and material information
 */
interface Region {
  /** Pattern configuration for this region */
  pattern: Pattern;
}

/**
 * Pattern configuration containing units with materials
 */
interface Pattern {
  /** Array of pattern units defining the pattern */
  patternUnits: PatternUnit[];
}

/**
 * A single pattern unit with material assignments
 */
interface PatternUnit {
  /** Array of materials applied to this pattern unit */
  materials: Material[];
}

/**
 * Material definition with catalog reference
 */
interface Material {
  /** Catalog seek identifier for the material/product */
  seekId: string;
}

/**
 * 3D bounding box with min/max coordinates
 */
interface BoundingBox3D {
  /** Minimum coordinates */
  min: { x: number; y: number; z: number };
  /** Maximum coordinates */
  max: { x: number; y: number; z: number };
}

/**
 * Face group containing geometric faces and their transformations
 */
interface FaceGroup {
  /**
   * Gets the bounding box for a specific face
   * @param faceId - Optional face identifier
   */
  getPaveBoundingBox(faceId?: string): THREE.Box2 | null;
  
  /**
   * Gets all face identifiers in this group
   */
  getFaceIds(): string[];
  
  /** Map of face IDs to their left-bottom bound information */
  faceGroupBoundMapLeftBottom: Record<string, FaceBoundInfo>;
}

/**
 * Face bound information with position and optional transformation
 */
interface FaceBoundInfo {
  /** Left offset position */
  left: number;
  /** Bottom offset position */
  bottom: number;
  /** Optional 3x3 transformation matrix */
  matrix?: Matrix3;
}

/**
 * 3x3 transformation matrix
 */
interface Matrix3 {
  /** Matrix data as 3x3 array */
  data: [[number, number, number], [number, number, number], [number, number, number]];
}

/**
 * Result of face group offset calculation
 */
interface FaceGroupOffset {
  /** Left offset value */
  left: number;
  /** Bottom offset value */
  bottom: number;
  /** Transformation matrix */
  transform: Matrix3;
}