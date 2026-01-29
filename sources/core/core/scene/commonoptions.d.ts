/**
 * Common configuration options and rule definitions for content placement and categorization.
 * Module: CommonOptions
 * Original ID: 22777
 */

/**
 * Content type and category configuration for a specific furniture or fixture rule.
 */
export interface RuleDefinition {
  /** List of content type identifiers that match this rule */
  contentTypes: string[];
  /** List of category UUIDs that match this rule */
  categories: string[];
}

/**
 * Configuration mapping for various furniture and fixture types.
 * Each key represents a specific furniture category with associated content types and categories.
 */
export interface RuleConfigType {
  /** Single-seat furniture items (chairs, coffee tables, side tables, baths) */
  singleSeat: RuleDefinition;
  /** Multiple-seat furniture items (sofas with varying seat counts) */
  multipleSeat: RuleDefinition;
  /** Corner sofa configurations (left/right corner sofas) */
  cornerSofa: RuleDefinition;
  /** Dining table configurations (various shapes and sets) */
  diningTable: RuleDefinition;
  /** Bed furniture items */
  bed: RuleDefinition;
  /** Bathroom cabinet configurations (floor-based and wall-attached) */
  bathroomCabinet: RuleDefinition;
  /** General cabinet and storage unit configurations */
  cabinet: RuleDefinition;
  /** Decorative picture and wall art configurations */
  decorativePicture: RuleDefinition;
  /** TV cabinet and media unit configurations */
  tvCabinet: RuleDefinition;
  /** Toilet fixture configurations */
  toilet: RuleDefinition;
  /** Ceiling-mounted lighting configurations (downlights, pendants, chandeliers) */
  downLight: RuleDefinition;
}

/**
 * Rule configuration object containing placement rules for various furniture types.
 * Maps furniture categories to their respective content types and category identifiers.
 */
export declare const RuleConfig: RuleConfigType;

/**
 * Common global options for spatial calculations and defaults.
 */
export interface CommonOptionsType {
  /** Default ceiling height in meters */
  defaultHeight: number;
  /** Default gap distance from object to ceiling in meters */
  defaultGapToCeiling: number;
}

/**
 * Common options object containing default spatial configuration values.
 */
export declare const CommonOptions: CommonOptionsType;