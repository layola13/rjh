import type { Extractor } from './Extractor';
import type { HSCore } from './HSCore';
import type { Vector2, Line2d } from './Math';
import type { Meta } from './Meta';

/**
 * Represents the four corner points of an opening's bounding box
 */
export interface OpeningBoundPoints {
  /** Top-left corner coordinate */
  topLeft: Vector2;
  /** Top-right corner coordinate */
  topRight: Vector2;
  /** Bottom-left corner coordinate */
  bottomLeft: Vector2;
  /** Bottom-right corner coordinate */
  bottomRight: Vector2;
}

/**
 * Material data entry with key-value pair
 */
export interface MaterialDataEntry {
  /** Unique identifier for the material */
  key: string;
  /** Material data payload */
  value: unknown;
}

/**
 * Complete dump information for an opening entity
 */
export interface OpeningDumpInfo {
  /** Serialized dump data */
  dump: unknown;
  /** Array of material data entries */
  materialsData: MaterialDataEntry[];
  /** List of product identifiers */
  products: string[];
  /** List of product UUIDs (36 character length) */
  productIds: string[];
  /** Array of generated product JSON representations */
  generatedProducts: unknown[];
  /** Opening width dimension */
  XSize: number;
  /** Opening height dimension */
  YSize: number;
  /** Opening depth dimension */
  ZSize: number;
  /** Arch height for arched openings */
  archHeight?: number;
}

/**
 * Collection of openings grouped by content type
 */
export interface OpeningsByType {
  [contentType: string]: HSCore.Model.Opening[];
}

/**
 * Collection of opening dump infos grouped by content type
 */
export interface OpeningDumpsByType {
  [contentType: string]: OpeningDumpInfo[];
}

/**
 * Categorized openings by entity type
 */
export interface CategorizedOpenings {
  /** Door openings grouped by content type */
  door: OpeningsByType;
  /** Hole openings grouped by content type */
  hole: OpeningsByType;
  /** Window openings grouped by content type */
  window: OpeningsByType;
  /** Parametric openings grouped by content type */
  parametricOpening: OpeningsByType;
}

/**
 * Categorized opening dumps by entity type
 */
export interface CategorizedOpeningDumps {
  /** Door opening dumps grouped by content type */
  door: OpeningDumpsByType;
  /** Hole opening dumps grouped by content type */
  hole: OpeningDumpsByType;
  /** Window opening dumps grouped by content type */
  window: OpeningDumpsByType;
  /** Parametric opening dumps grouped by content type */
  parametricOpening: OpeningDumpsByType;
}

/**
 * Filter mode for opening extraction
 */
export type OpeningExtractionMode = 'all' | 'doorOnly' | 'exculdeDoor';

/**
 * Positioning strategy for extraction
 */
export type PositioningStrategy = 'centroid' | string;

/**
 * Opening with associated material information
 */
export interface OpeningWithMaterial {
  /** The opening entity */
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  /** Material assigned to the opening's link face */
  material?: unknown;
}

/**
 * Structure face with face information
 */
export interface StructureFace {
  /** Face geometric and property information */
  faceInfo?: {
    /** Curve defining the face boundary */
    curve: unknown;
  };
  /** Openings contained in this face */
  openings: Array<HSCore.Model.Door | HSCore.Model.Window | HSCore.Model.Hole>;
  /** Parametric openings contained in this face */
  parametricOpenings: HSCore.Model.ParametricOpening[];
}

/**
 * Floor/Room entity with spatial information
 */
export interface FloorEntity {
  /** Associated room information */
  roomInfo?: {
    /** Ceiling entities */
    ceilings?: unknown[];
    /** Space information collection */
    spaceInfos?: SpaceInfo[];
  };
  /** Room type classification */
  roomType: string;
  /** 2D world path representation */
  worldRawPath2d: {
    /** Outer boundary curves */
    outer: unknown[];
  };
  /** Structure faces associated with this floor */
  structureFaces: StructureFace[];
  /** Link faces for openings */
  linkFaces: StructureFace[];
}

/**
 * Space information containing floors and ceilings
 */
export interface SpaceInfo {
  /** Floors within this space */
  floors: FloorEntity[];
  /** Ceilings within this space */
  ceilings: unknown[];
  /** Structure faces for this space */
  structureFaces?: StructureFace[];
}

/**
 * Gets the four corner points of an opening's bounding box in world coordinates
 * @param opening - The opening entity (Door, Window, Hole, or ParametricOpening)
 * @returns Object containing topLeft, topRight, bottomLeft, bottomRight coordinates
 */
export declare function getOpeningBoundPts(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
): OpeningBoundPoints;

/**
 * Gets the back boundary line of an opening based on its type and swing direction
 * @param opening - The opening entity
 * @returns Line2d representing the back boundary
 */
export declare function getOpeningBoundBackLine(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
): Line2d;

/**
 * Gets the main boundary lines (top and bottom) of an opening
 * @param opening - The opening entity
 * @returns Array of two Line2d objects representing top and bottom boundaries
 */
export declare function getOpeningBoundMainLines(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
): [Line2d, Line2d];

/**
 * Retrieves structure faces associated with a floor, filtering for valid face curves
 * @param floor - The floor entity
 * @returns Array of structure faces with valid curve information
 */
export declare function getStructureFaces(floor: FloorEntity): StructureFace[];

/**
 * Gets the ceiling associated with a given floor
 * @param floor - The floor entity
 * @returns The corresponding ceiling entity, if found
 */
export declare function getCeilingByFloor(floor: FloorEntity): unknown | undefined;

/**
 * Checks if an opening is connected to only the specified floor
 * @param opening - The opening entity
 * @param floor - The floor to check against
 * @returns True if opening connects only to the given floor
 */
export declare function openingInFloorOnly(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
  floor: FloorEntity
): boolean;

/**
 * Determines if an opening is unique to a specific floor by checking boundary overlaps
 * @param opening - The opening entity
 * @param floor - The floor to check
 * @param structureFaces - Array of structure faces to test against
 * @returns True if opening is unique to the floor
 */
export declare function isOpeningUniqueFloor(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
  floor: FloorEntity,
  structureFaces: StructureFace[]
): boolean;

/**
 * Finds the link face for an opening if it's unique to the given floor
 * @param opening - The opening entity
 * @param floor - The floor entity
 * @param structureFaces - Array of structure faces
 * @returns The matching link face, if found
 */
export declare function getOpeningLinkFace(
  opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
  floor: FloorEntity,
  structureFaces: StructureFace[]
): StructureFace | undefined;

/**
 * Extractor class for dumping opening information from a floor entity.
 * Processes doors, windows, holes, and parametric openings with their associated materials.
 */
export declare class OpeningDumpsExtractor extends Extractor {
  /** Filtered structure faces with valid curve information */
  readonly structureFaces: StructureFace[];

  /**
   * Creates an instance of OpeningDumpsExtractor
   * @param floor - The floor entity to extract openings from
   * @param positioningStrategy - Strategy for positioning, defaults to "centroid"
   */
  constructor(floor: FloorEntity, positioningStrategy?: PositioningStrategy);

  /**
   * Creates a comprehensive dump info object for an opening
   * @param opening - The opening entity to dump
   * @returns Complete opening dump information including materials and products
   * @private
   */
  private _createOpeningDumpInfo(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
  ): OpeningDumpInfo;

  /**
   * Attempts to extract and categorize an opening if it's unique to the current floor
   * @param categorized - The categorized openings collection to populate
   * @param category - Category key ('door', 'hole', 'window', 'parametricOpening')
   * @param opening - The opening entity to extract
   * @returns True if opening was successfully extracted
   * @private
   */
  private _extractOpening(
    categorized: CategorizedOpenings,
    category: keyof CategorizedOpenings,
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening
  ): boolean;

  /**
   * Extracts and dumps all openings, returning categorized dump information
   * @returns Categorized opening dumps organized by type and content type
   */
  extract(): CategorizedOpeningDumps;

  /**
   * Extracts opening entity information without dumping, organized by category
   * @param mode - Extraction mode filter ('all', 'doorOnly', 'exculdeDoor')
   * @returns Categorized opening entities
   */
  extractEntityInfos(mode?: OpeningExtractionMode): CategorizedOpenings;

  /**
   * Retrieves all openings from structure faces with their associated materials
   * @returns Array of openings paired with their link face materials
   */
  getAllOpenings(): OpeningWithMaterial[];
}