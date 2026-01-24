/**
 * Floor cutting and region division module
 * Provides algorithms for extracting architectural features from floor polygons
 * and dividing regions based on geometric patterns.
 */

import type { Loop } from './geometry/Loop';
import type { Polygon } from './geometry/Polygon';
import type { Curve } from './geometry/Curve';
import type { Point } from './geometry/Point';

/**
 * Position parameter describing location along a host curve
 */
interface PositionParameter {
  /** Start position as normalized parameter [0, 1] */
  startParam: number;
  /** End position as normalized parameter [0, 1] */
  endParam: number;
  /** Center position as normalized parameter [0, 1] */
  centerParam: number;
}

/**
 * Information about a feature's relationship to its host curve
 */
interface FeatureHostInfo {
  /** Curve group identifier */
  group: number;
  /** Index of the host curve within the floor polygon */
  hostCurveIndex: number;
  /** Opening index (-1 for features) */
  openingIndex: number;
  /** Position parameters along the host curve */
  posParam: PositionParameter;
  /** Feature type identifier */
  type: string;
  /** The extracted feature instance */
  feature: Feature;
  /** Overlap curve between opening and floor */
  openingFloorOverlapCurve: Curve;
  /** Content type discriminator */
  contentType: 'feature';
  /** Category identifier */
  categoryId: string;
  /** Length of the host curve */
  hostCurveLength: number;
  /** Room type linkage */
  linkRoomType: string;
  /** Bottom elevation */
  zBottom: number;
  /** Top elevation */
  zTop: number;
  /** Opening type */
  openingType: 'feature';
}

/**
 * Collection of feature host information
 */
interface FeatureHostInfoCollection {
  /** WKT geometry collection for bottom profiles */
  bottomProfileGeomCollectionWKT: string;
  /** WKT geometry collection for center points */
  centerPtsGeomCollectionWKT: string;
  /** WKT multi-point for center points */
  centerPtsMultiPointWKT: string;
  /** Comma-separated host curve indices */
  hostCurveIndexStr: string;
  /** Number of features */
  count: number;
  /** Normalization type */
  normalizedType: 'centroid';
  /** Opening type */
  openingType: 'feature';
  /** Array of feature host information */
  hostInfos: FeatureHostInfo[];
}

/**
 * Result of a single floor cutting step
 */
interface FloorCutResult {
  /** Outer loop of the resulting floor polygon */
  floorOuterLoop: Loop;
  /** Collection of extracted feature information */
  featureHostInfos: FeatureHostInfoCollection;
}

/**
 * Context information for floor processing
 */
interface FloorContext {
  /** Opening geometries in the floor */
  openings: unknown[];
  /** Hint boxes for feature extraction */
  hintBoxes: unknown[];
  /** Minimum dimension for bounding boxes */
  minBoxDimension: number;
}

/**
 * Architectural feature extracted from a polygon
 */
interface Feature {
  /** Feature type identifier */
  type: string;
  /** Polygon representing the feature itself */
  selfPolygon: Polygon;
  /** Remaining polygon after feature extraction */
  toPolygon: Polygon;
  /**
   * Get the overlap curve with a set of floor curves
   */
  getOverlapCurveWith(curves: Curve[]): OverlapResult | null;
}

/**
 * Feature constructor type
 */
interface FeatureConstructor {
  new (...args: unknown[]): Feature;
}

/**
 * Result of curve overlap computation
 */
interface OverlapResult {
  /** The overlapping curve segment */
  overlapCurve: Curve;
  /** The curve from the floor polygon */
  floorCurve: Curve;
  /** The associated feature */
  feature: Feature;
}

/**
 * Feature extractor that applies a specific pattern
 */
interface FeatureExtractor {
  /**
   * Extract features from a polygon
   */
  extractFrom(polygon: Polygon): Feature[];
}

/**
 * Default feature types for extraction
 * Ordered by priority for progressive feature detection
 */
const DEFAULT_FEATURE_TYPES: readonly FeatureConstructor[];

/**
 * Floor cutting algorithm that progressively extracts architectural features
 * from a floor polygon until termination conditions are met.
 * 
 * This class implements an iterative feature extraction process:
 * 1. Apply feature extractors to the current polygon
 * 2. Filter features that intersect forbidden areas
 * 3. Update the current polygon by subtracting extracted features
 * 4. Repeat until no more valid features are found
 */
export declare class Floorcutter {
  /** Target polygon to extract features from */
  protected readonly targetPolygon: Polygon;
  
  /** Current working polygon (updated after each extraction) */
  protected currentPolygon: Polygon;
  
  /** Areas where feature extraction is forbidden */
  protected readonly forbiddenAreaLoops: Loop[];
  
  /** Context information for floor processing */
  protected readonly floorContext: FloorContext;
  
  /** Feature extractors to apply */
  protected readonly extractors: FeatureExtractor[];
  
  /** History of extracted features by step */
  protected readonly featureLists: Feature[][];
  
  /** Features extracted in the current step */
  protected currentStepExtractedFeatures: Feature[];

  /**
   * Create a new floor cutter
   * 
   * @param floorPoints - Points defining the floor polygon boundary
   * @param openings - Opening geometries (doors, windows, etc.)
   * @param forbiddenAreas - Areas where feature extraction is forbidden (default: empty)
   * @param featureTypes - Feature types to extract (default: standard architectural features)
   */
  constructor(
    floorPoints: Point[],
    openings: unknown[],
    forbiddenAreas?: Polygon[],
    featureTypes?: FeatureConstructor[]
  );

  /**
   * Check if termination conditions are met
   * 
   * Terminates when:
   * - Target polygon has fewer than 5 edges (too simple)
   * - No features extracted in current step
   * - Current polygon has fewer than 5 edges
   */
  protected get isMeetTerminateCondition(): boolean;

  /**
   * Execute the floor cutting algorithm
   * 
   * Iteratively extracts features until termination conditions are met
   * or maximum iteration count (100) is reached.
   * 
   * @returns Array of floor cut results, one per cumulative extraction step
   */
  execute(): FloorCutResult[];

  /**
   * Filter out features that are not adjacent to the most recent feature
   * 
   * @param features - Feature host infos to filter
   * @returns Filtered array containing only adjacent features
   */
  protected _filterOutNonAdjacentFeature(features: FeatureHostInfo[]): FeatureHostInfo[];

  /**
   * Update a feature host info with new host curves
   * 
   * @param hostInfo - Feature host info to update
   * @param curves - New set of host curves
   * @returns Updated host info, or null if update fails
   */
  protected _updateFeatureHostInfo(
    hostInfo: FeatureHostInfo,
    curves: Curve[]
  ): FeatureHostInfo | null;

  /**
   * Convert feature host infos to a collection structure
   * 
   * @param hostInfos - Array of feature host information
   * @returns Collection structure for serialization
   */
  protected _getFeatureHostInfos(hostInfos: FeatureHostInfo[]): FeatureHostInfoCollection;

  /**
   * Get valid feature host information from extracted features
   * 
   * Filters and sorts features that have valid overlap with floor curves.
   * 
   * @param features - Extracted features to process
   * @returns Sorted array of valid feature host information
   */
  protected _getValidFeatureHostInfos(features: Feature[]): FeatureHostInfo[];

  /**
   * Get host information for a single feature
   * 
   * Computes the relationship between a feature and the floor curves,
   * including overlap curves and position parameters.
   * 
   * @param feature - Feature to analyze
   * @param curves - Host curves from the floor polygon
   * @param minOverlapLength - Minimum overlap length to consider valid (default: 0.5)
   * @returns Feature host info, or null if no valid overlap found
   */
  protected _getFeatureHostInfo(
    feature: Feature,
    curves: Curve[],
    minOverlapLength?: number
  ): FeatureHostInfo | null;

  /**
   * Check if a feature intersects any forbidden area
   * 
   * @param feature - Feature to check
   * @returns True if feature intersects a forbidden area
   */
  protected _isFeatureIntersectForbiddenArea(feature: Feature): boolean;
}

/**
 * Region divider that extends floor cutting without forbidden area constraints
 * 
 * This variant allows feature extraction without respecting forbidden areas,
 * useful for region division where all geometric patterns should be detected.
 */
export declare class RegionDivider extends Floorcutter {
  /**
   * Execute the region division algorithm
   * 
   * Similar to Floorcutter.execute(), but ignores forbidden areas
   * during feature extraction.
   * 
   * @returns Array of region division results
   */
  execute(): FloorCutResult[];

  /**
   * Override to disable forbidden area checking
   * 
   * @param feature - Feature to check (ignored)
   * @returns Always false
   */
  protected _isFeatureIntersectForbiddenArea(feature: Feature): false;
}