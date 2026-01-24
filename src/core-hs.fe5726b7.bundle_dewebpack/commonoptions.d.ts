/**
 * Common options and rule configurations for furniture and fixture placement in interior design.
 * This module defines content type mappings and placement rules for various furniture categories.
 */

/**
 * Configuration for a specific furniture rule.
 * Defines which content types and categories are applicable for placement logic.
 */
export interface RuleConfigItem {
  /** Array of content type identifiers that match this rule */
  contentTypes: string[];
  /** Array of category UUIDs that match this rule */
  categories: string[];
}

/**
 * Complete rule configuration mapping furniture types to their placement rules.
 * Each key represents a furniture category with associated content types and categories.
 */
export interface RuleConfig {
  /** Single-seat furniture items (chairs, coffee tables, side tables, etc.) */
  singleSeat: RuleConfigItem;
  /** Multiple-seat furniture items (sofas of various sizes) */
  multipleSeat: RuleConfigItem;
  /** Corner sofa configurations */
  cornerSofa: RuleConfigItem;
  /** Dining tables and table sets */
  diningTable: RuleConfigItem;
  /** Bed furniture */
  bed: RuleConfigItem;
  /** Bathroom cabinets and vanity units */
  bathroomCabinet: RuleConfigItem;
  /** General cabinets and storage units */
  cabinet: RuleConfigItem;
  /** Decorative pictures and wall art */
  decorativePicture: RuleConfigItem;
  /** TV cabinets and media units */
  tvCabinet: RuleConfigItem;
  /** Toilet fixtures */
  toilet: RuleConfigItem;
  /** Downlights and ceiling lighting fixtures */
  downLight: RuleConfigItem;
}

/**
 * Common configuration options for room and furniture placement.
 * Contains default values for dimensional calculations.
 */
export interface CommonOptions {
  /** Default room height in meters */
  defaultHeight: number;
  /** Default gap between furniture and ceiling in meters */
  defaultGapToCeiling: number;
}

/**
 * Rule configuration instance defining furniture placement rules.
 * Maps furniture categories to their applicable content types and category UUIDs.
 */
export declare const RuleConfig: RuleConfig;

/**
 * Common options instance with default values for room calculations.
 * Provides standard measurements for height and ceiling clearance.
 */
export declare const CommonOptions: CommonOptions;