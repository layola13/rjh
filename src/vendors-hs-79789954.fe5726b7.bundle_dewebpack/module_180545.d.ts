/**
 * Constraint rules and completion steps configuration module
 * Defines spatial relationships between furniture items, regions, and completion workflow steps
 */

import { ConstraintType, RegionType } from './module_288839';
import { HSCatalog } from './module_635589';

/**
 * Constraint rule defining spatial relationship between two content items
 */
export interface ContentToContentConstraintRule {
  /** Type(s) of the content item being constrained */
  contentType: string[];
  /** Type of the reference content item */
  refContentType: string;
  /** Type of spatial constraint to apply */
  constraintType: ConstraintType;
}

/**
 * Constraint rule defining spatial relationship between content and region
 */
export interface ContentToRegionConstraintRule {
  /** Type(s) of the content item being constrained */
  contentType: string[];
  /** Type of the reference region or content */
  refContentType?: RegionType;
  /** Type of the reference region */
  refRegionType?: RegionType;
  /** Type of spatial constraint to apply */
  constraintType: ConstraintType;
}

/**
 * Constraint rule defining spatial relationship between two regions
 */
export interface RegionToRegionConstraintRule {
  /** Type of the region being constrained */
  regionType: RegionType;
  /** Type of the reference region */
  refRegionType: RegionType;
  /** Type of spatial constraint to apply */
  constraintType: ConstraintType;
}

/**
 * Rules defining spatial constraints between furniture content items
 * Used to maintain proper distances and relationships (e.g., night table near bed)
 */
export declare const contentToContentConstraintRules: ContentToContentConstraintRule[];

/**
 * Rules defining spatial constraints between content items and regions
 * Used to position furniture within or relative to room regions (e.g., bed in bedroom area)
 */
export declare const contentToRegionConstraintRules: ContentToRegionConstraintRule[];

/**
 * Rules defining spatial constraints between regions
 * Used to align or position regions relative to each other
 */
export declare const regionToRegionConstraintRules: RegionToRegionConstraintRule[];

/**
 * Completion workflow steps organized by category IDs
 * Each step contains an array of category UUIDs to process in sequence
 * Used for guided room completion and furniture placement workflows
 */
export declare const completionCategoryIdSteps: string[][];