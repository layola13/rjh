/**
 * Feature extraction utility for processing polygon-based features from floor plans.
 * @module FeatureExtractor
 */

import { Polygon } from './polygon';

/**
 * Represents a feature extracted from a polygon.
 * Contains the original polygon, the matched feature polygon, and the resulting polygon after extraction.
 * 
 * @template T - The feature class type
 */
export interface ExtractedFeature<T = unknown> {
  /** The original polygon before feature extraction */
  fromPolygon: Polygon;
  
  /** The resulting polygon after extracting the feature */
  toPolygon: Polygon;
}

/**
 * Constructor signature for feature classes.
 * Feature classes must implement a static matcher method and be constructible with these parameters.
 * 
 * @template T - The feature instance type
 */
export interface FeatureConstructor<T extends ExtractedFeature = ExtractedFeature> {
  /**
   * Creates a new feature instance.
   * 
   * @param fromPolygon - The source polygon to extract from
   * @param matchedPolygon - The polygon area that matched the feature pattern
   * @param floorContext - Contextual information about the floor plan
   */
  new(fromPolygon: Polygon, matchedPolygon: Polygon, floorContext: unknown): T;
  
  /**
   * Static method to find matching polygon coordinates within a source polygon.
   * 
   * @param polygon - The polygon to search for features
   * @param floorContext - Contextual information about the floor plan
   * @returns Array of coordinates representing the matched feature, or empty array if no match
   */
  matcher(polygon: Polygon, floorContext: unknown): number[][];
}

/**
 * Extracts features from polygons using pattern matching.
 * Iteratively finds and extracts features until no more matches are found.
 * 
 * @template T - The type of feature being extracted
 */
export declare class FeatureExtractor<T extends ExtractedFeature = ExtractedFeature> {
  /** The feature class constructor used for instantiation and matching */
  private readonly featureClazz: FeatureConstructor<T>;
  
  /** Contextual information about the floor plan being processed */
  private readonly floorContext: unknown;
  
  /**
   * Creates a new FeatureExtractor instance.
   * 
   * @param featureClazz - The feature class to use for extraction
   * @param floorContext - Contextual information about the floor plan
   */
  constructor(featureClazz: FeatureConstructor<T>, floorContext: unknown);
  
  /**
   * Extracts all matching features from the given polygon.
   * Iteratively finds features, cuts them out, and continues with the remaining polygon
   * until no more features can be extracted.
   * 
   * @param polygon - The source polygon to extract features from
   * @returns Array of extracted features, in the order they were found
   * 
   * @remarks
   * The extraction process stops if cutting out a feature doesn't change the polygon area,
   * which indicates an error condition.
   */
  extractFrom(polygon: Polygon): T[];
  
  /**
   * Finds a polygon that matches the feature pattern within the source polygon.
   * 
   * @param polygon - The polygon to search for feature matches
   * @returns A Polygon instance representing the matched feature area, or null if no match found
   * 
   * @private
   */
  private _getMatchedPolygon(polygon: Polygon): Polygon | null;
}