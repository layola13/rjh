/**
 * OpeningsExtractor module for extracting and analyzing door and window openings from floor structures.
 * Provides geometric analysis, positioning, and relationship mapping between openings and their host curves.
 */

import type { Extractor } from './Extractor';
import type { HSCore } from './HSCore';
import type { MathAlg, Vector2, Line2d, Loop } from './MathAlg';
import type { WKTUtils } from './WKTUtils';
import type { ConstraintUtil } from './ConstraintUtil';

/**
 * Represents the type of normalization applied to openings
 */
type NormalizeType = 'centroid' | string;

/**
 * Type of opening element
 */
type OpeningType = 'door' | 'window';

/**
 * Group classification for host curves
 */
type CurveGroup = 'invalid' | string;

/**
 * Content type identifier for openings
 */
type ContentType = string;

/**
 * Room type classification
 */
type RoomType = string;

/**
 * Positional parameters describing opening placement on host curve
 */
interface PositionParameter {
  /** Starting position parameter (0-1) on host curve */
  startParam: number;
  /** Ending position parameter (0-1) on host curve */
  endParam: number;
  /** Center position parameter (0-1) on host curve */
  centerParam: number;
}

/**
 * Complete information about an opening's relationship to its host curve
 */
interface OpeningHostInfo {
  /** Index of the host curve in the floor outer boundary */
  hostCurveIndex: number;
  /** Sequential index of this opening along the host curve */
  openingIndex: number;
  /** Group classification of the host curve */
  group: CurveGroup;
  /** Positional parameters along the host curve */
  posParam: PositionParameter;
  /** Overlapping curve segment between opening and floor (translated to 2D) */
  openingFloorOverlapCurve: Line2d;
  /** Unique identifier of the opening */
  openingId: string;
  /** Type of opening (door/window) */
  openingType: OpeningType;
  /** Category identifier from metadata */
  categoryId: string;
  /** Total length of the host curve */
  hostCurveLength: number;
  /** Room type that this opening links to (if any) */
  linkRoomType: RoomType;
  /** Bottom Z-coordinate of the opening */
  zBottom: number;
  /** Top Z-coordinate of the opening */
  zTop: number;
  /** Content type string representation */
  contentType: ContentType;
}

/**
 * Aggregated extraction result for a specific opening type
 */
interface OpeningExtractionInfo {
  /** WKT GeometryCollection of all bottom profile curves */
  bottomProfileGeomCollectionWKT: string;
  /** WKT GeometryCollection of all center points */
  centerPtsGeomCollectionWKT: string;
  /** WKT MultiPoint representation of all center points */
  centerPtsMultiPointWKT: string;
  /** Total count of openings */
  count: number;
  /** Applied normalization type */
  normalizedType: NormalizeType;
  /** Type of openings in this collection */
  openingType: OpeningType;
  /** Comma-separated string of host curve indices */
  hostCurveIndexStr: string;
  /** Detailed host information for each opening */
  hostInfos: OpeningHostInfo[];
}

/**
 * Combined result of opening and host information extraction
 */
interface OpeningHostInfosResult {
  /** Host information for all windows */
  windows: OpeningHostInfo[];
  /** Host information for all doors */
  doors: OpeningHostInfo[];
}

/**
 * Final extraction result with WKT representations
 */
interface ExtractionResult {
  /** WKT representation of all door bottom profiles */
  doorsBottomProfilesWKT: string;
  /** WKT representation of all window bottom profiles */
  windowsBottomProfilesWKT: string;
  /** Combined host information for all openings */
  hostInfos: OpeningHostInfo[];
}

/**
 * Curve metadata with index information
 */
interface CurveWithIndex {
  /** The geometric curve */
  curve: Line2d;
  /** Sequential index in the collection */
  index: number;
}

/**
 * Result of finding a line within grouped curves
 */
interface LineGroupResult {
  /** Index of the line group */
  index: number;
  /** Group classification */
  group: CurveGroup;
  /** The matched line */
  line: Line2d;
}

/**
 * OpeningsExtractor extracts and analyzes door and window openings from building floor structures.
 * 
 * @remarks
 * This class processes structural faces to identify openings, calculate their geometric properties,
 * determine their relationship to floor boundary curves, and generate WKT representations for
 * spatial analysis. It handles both standard OpeningType and ParametricOpening instances.
 * 
 * @example
 *