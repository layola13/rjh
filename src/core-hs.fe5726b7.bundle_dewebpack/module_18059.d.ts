/**
 * Hole module - Defines parametric hole entities and their I/O operations
 * Used for creating openings in walls, floors, and other building elements
 */

import { Opening, Opening_IO } from './opening';
import { Entity } from './entity';
import { EntityField } from './object';
import { ContentUtil } from './content';

/**
 * Parameter definition for hole configuration
 */
interface HoleParameter {
  /** Unique identifier for the parameter */
  id: string;
  /** Current value of the parameter */
  value: number | string | undefined;
}

/**
 * Profile configuration structure for parametric holes
 */
interface ProfileConfig {
  /** Expression for calculating X dimension */
  XLength?: string;
  /** Expression for calculating Y dimension */
  YLength?: string;
  /** Expression for calculating Z dimension */
  ZLength?: string;
  /** Template string with ${expression} placeholders */
  template: string;
  /** Array of available parameters for this profile */
  parameters: Array<{
    id: string;
    defaultValue: number | string;
  }>;
}

/**
 * Metadata structure for hole entities
 */
interface HoleMetadata {
  /** Profile configuration defining hole shape and parameters */
  profileConfig?: ProfileConfig;
  [key: string]: unknown;
}

/**
 * Serialized hole data structure
 */
interface HoleData {
  /** Array of parameter values to restore */
  paramData?: HoleParameter[];
  /** X dimension of the hole */
  XLength?: number;
  /** Z dimension of the hole */
  ZLength?: number;
  [key: string]: unknown;
}

/**
 * I/O handler for Hole entities
 * Manages serialization/deserialization and profile updates
 */
export declare class Hole_IO extends Opening_IO {
  /**
   * Singleton instance accessor
   */
  static instance(): Hole_IO;

  /**
   * Apply parameter values to a hole and update its profile
   * @param hole - The hole entity to update
   * @param params - Array of parameters to set
   */
  setParams(hole: Hole, params: HoleParameter[]): void;

  /**
   * Recalculate hole profile based on current parameters
   * Evaluates expressions in profileConfig and generates final profile string
   * @param hole - The hole entity to update
   */
  updateProfile(hole: Hole): void;

  /**
   * Load hole data from serialized format
   * @param hole - Target hole entity
   * @param data - Serialized hole data
   * @param context - Loading context
   */
  load(hole: Hole, data: HoleData, context: unknown): void;
}

/**
 * Parametric hole entity
 * Represents configurable openings in building elements (walls, floors, roofs)
 * with expression-based dimensions and custom profile templates
 */
export declare class Hole extends Opening {
  /**
   * Internal storage for parameter values (decorated field)
   * @private
   */
  private __paramValues: Map<string, number | string>;

  /**
   * Active parameter values map
   * Changes trigger profile recalculation via @EntityField decorator
   */
  @EntityField({
    prefix: '_',
    postSet(hole: Hole, newValue: Map<string, number | string>): void;
    noEvent: true;
  })
  _paramValues: Map<string, number | string>;

  /**
   * Cached X dimension (evaluated from expression)
   * @private
   */
  __XLength?: number;

  /**
   * Cached Y dimension (evaluated from expression)
   * @private
   */
  __YLength?: number;

  /**
   * Cached Z dimension (evaluated from expression)
   * @private
   */
  __ZLength?: number;

  /**
   * Cached thickness value (evaluated from #h# or #l# expression)
   * @private
   */
  __thickness?: number;

  /**
   * Cached profile string (after template evaluation)
   * @private
   */
  __profile?: string;

  /**
   * Current hole metadata including profile configuration
   */
  metadata?: HoleMetadata;

  /**
   * Get profile configuration from metadata
   */
  get profileConfig(): ProfileConfig | undefined;

  /**
   * X dimension of the hole
   */
  XLength: number;

  /**
   * Y dimension of the hole
   */
  YLength?: number;

  /**
   * Z dimension of the hole
   */
  ZLength: number;

  /**
   * Thickness of the host element
   */
  thickness: number;

  /**
   * Final profile string defining hole geometry
   */
  profile: string;

  /**
   * Create a new hole entity
   * @param id - Optional unique identifier
   */
  constructor(id?: string);

  /**
   * Factory method to create hole from metadata
   * @param metadata - Hole configuration metadata
   * @returns Initialized hole instance
   */
  static create(metadata: HoleMetadata): Hole;

  /**
   * Initialize hole from metadata definition
   * @param metadata - Configuration metadata
   * @param parent - Optional parent entity
   * @param skipProfileUpdate - Whether to skip initial profile update
   * @param isTemplate - Whether this is a template instance
   */
  initByMeta(
    metadata: HoleMetadata,
    parent?: Entity,
    skipProfileUpdate?: boolean,
    isTemplate?: boolean
  ): void;

  /**
   * Get set of metadata keys that should be filtered during serialization
   * @returns Set of keys to exclude
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Get I/O handler for this entity type
   */
  getIO(): Hole_IO;

  /**
   * Set a single parameter value
   * Triggers profile recalculation if value changes
   * @param paramId - Parameter identifier
   * @param value - New parameter value
   */
  setParamValue(paramId: string, value: number | string): void;

  /**
   * Get current value of a parameter
   * @param paramId - Parameter identifier
   * @returns Current parameter value or undefined
   */
  getParamValue(paramId: string): number | string | undefined;

  /**
   * Get all current parameters as array
   * @returns Array of parameter objects
   */
  getParams(): HoleParameter[];

  /**
   * Batch set multiple parameters
   * @param params - Array of parameters to update
   */
  setParams(params: HoleParameter[]): void;

  /**
   * Initialize parameters from metadata defaults
   * @param metadata - Metadata containing parameter definitions
   */
  updateProfile(metadata: HoleMetadata): void;

  /**
   * Recalculate hole geometry from current parameters
   * Evaluates all expressions and updates dimensions
   * @private
   */
  _updateProfile(): void;

  /**
   * Evaluate a parameter expression
   * Replaces #paramId# placeholders with values and executes expression
   * @param expression - Expression string to evaluate
   * @returns Evaluated result
   * @private
   */
  _evaluateExp(expression: string): number | string | undefined;

  /**
   * Check if this entity supports Parametric Modeling
   */
  supportPM(): boolean;

  /**
   * Update hole using Parametric Modeling system
   */
  updateByPM(): void;
}

/**
 * Global utility namespace (external dependency)
 */
declare namespace HSCore.Util.Math {
  /**
   * Convert number to persistent precision format
   */
  function toPersistentPrecision(value: number): string;
}

/**
 * Global constants (external dependency)
 */
declare namespace HSConstants {
  enum ModelClass {
    NgHole = 'NgHole'
  }
}