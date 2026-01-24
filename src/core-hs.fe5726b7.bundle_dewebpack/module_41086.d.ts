/**
 * Module: Hole Entity and IO Handler
 * Defines hole/opening entities with parametric profile configurations
 */

import { Opening, Opening_IO } from './opening';
import { Entity } from './entity';
import { EntityField } from './object';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Parameter definition for hole configuration
 */
export interface HoleParameter {
  /** Parameter identifier (e.g., 'w', 'h', 'l') */
  id: string;
  /** Parameter value (e.g., width, height, length in millimeters) */
  value: number | string | undefined | null;
}

/**
 * Profile configuration defining hole shape and dimensions
 */
export interface ProfileConfig {
  /** Expression for X-axis length (width) */
  XLength?: string;
  /** Expression for Y-axis length (depth) */
  YLength?: string;
  /** Expression for Z-axis length (height) */
  ZLength?: string;
  /** SVG path template with parameter placeholders (e.g., ${w}, ${h}) */
  template: string;
  /** Available parameters for this profile */
  parameters: Array<{
    id: string;
    defaultValue: number | string;
  }>;
}

/**
 * Metadata structure for hole entities
 */
export interface HoleMetadata {
  /** Profile configuration for parametric hole shapes */
  profileConfig?: ProfileConfig;
  /** Content type classification */
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  /** Whether this hole already has a pocket */
  hasPocket?: boolean;
}

/**
 * Serialized hole data for persistence
 */
export interface HoleData {
  /** Parameter data for holes without Parameter Manager support */
  paramData?: HoleParameter[];
  /** Additional properties from parent Opening */
  [key: string]: unknown;
}

/**
 * Surface object for baseboard cutting operations
 */
export interface SurfaceObject {
  surface: {
    containsPoint(point: unknown): boolean;
  };
}

/**
 * Baseboard cutter information
 */
export interface BaseboardCutterInfo {
  /** Cutting path segments */
  cutPath: Array<{
    getStartPt(): unknown;
    getEndPt(): unknown;
  }>;
  /** Lines requiring patching */
  patchLines: unknown[];
}

// ============================================================================
// IO Handler Class
// ============================================================================

/**
 * Handles serialization and deserialization of Hole entities
 */
export declare class Hole_IO extends Opening_IO {
  /**
   * Get singleton instance of Hole_IO
   */
  static instance(): Hole_IO;

  /**
   * Apply parameters to a hole entity and update its profile
   * @param hole - Target hole entity
   * @param params - Array of parameter id-value pairs
   */
  setParams(hole: Hole, params: HoleParameter[]): void;

  /**
   * Recalculate hole profile based on current parameters and expressions
   * @param hole - Hole entity to update
   */
  updateProfile(hole: Hole): void;

  /**
   * Serialize hole entity to plain object
   * @param entity - Hole entity to serialize
   * @param callback - Optional callback for additional processing
   * @param includeGeometry - Whether to include geometry data
   * @param options - Additional serialization options
   * @returns Serialized data array
   */
  dump(
    entity: Hole,
    callback?: (data: unknown[], entity: Hole) => void,
    includeGeometry?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize hole entity from plain object
   * @param entity - Target hole entity to populate
   * @param data - Serialized hole data
   * @param context - Deserialization context
   */
  load(entity: Hole, data: HoleData, context: unknown): void;
}

// ============================================================================
// Main Entity Class
// ============================================================================

/**
 * Represents a parametric hole/opening entity in walls, floors, or ceilings
 * Supports dynamic profile generation based on parameter expressions
 */
export declare class Hole extends Opening {
  /**
   * Internal parameter storage (for change detection)
   * @internal
   */
  private __paramValues: Map<string, number | string>;

  /**
   * Active parameter values (decorated with EntityField)
   * @internal
   */
  @EntityField({
    prefix: '_',
    postSet: '_updateProfile',
    noEvent: true
  })
  private _paramValues: Map<string, number | string>;

  /**
   * Cached X-axis length value
   * @internal
   */
  private __XLength?: number;

  /**
   * Cached Y-axis length value
   * @internal
   */
  private __YLength?: number;

  /**
   * Cached Z-axis length value
   * @internal
   */
  private __ZLength?: number;

  /**
   * Cached thickness value
   * @internal
   */
  private __thickness?: number;

  /**
   * Cached profile SVG path
   * @internal
   */
  private __profile?: string;

  /**
   * Create a new hole entity
   * @param id - Optional entity identifier
   * @param metadata - Optional metadata object
   */
  constructor(id?: string, metadata?: HoleMetadata);

  /**
   * Factory method to create hole from metadata
   * @param metadata - Hole metadata configuration
   * @returns Newly created hole instance
   */
  static create(metadata: HoleMetadata): Hole;

  /**
   * Get profile configuration from metadata
   */
  get profileConfig(): ProfileConfig | undefined;

  /**
   * Get metadata property associated with this hole
   */
  get metadata(): HoleMetadata | undefined;

  /**
   * Initialize hole from metadata
   * @param metadata - Metadata to apply
   * @param parent - Optional parent entity
   * @param skipProfileUpdate - Skip initial profile calculation
   * @param isTemplate - Whether this is a template instance
   */
  initByMeta(
    metadata: HoleMetadata,
    parent?: unknown,
    skipProfileUpdate?: boolean,
    isTemplate?: boolean
  ): void;

  /**
   * Get metadata keys that should be excluded from certain operations
   * @returns Set of filtered key names
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Get IO handler for this entity type
   * @returns Hole_IO singleton instance
   */
  getIO(): Hole_IO;

  /**
   * Check if a pocket can be added to this hole
   * @returns True if pocket addition is allowed
   */
  canAddPocket(): boolean;

  /**
   * Check if this hole supports Parameter Manager
   * @returns True if PM is supported
   */
  supportPM(): boolean;

  /**
   * Set a single parameter value
   * @param paramId - Parameter identifier
   * @param value - New parameter value
   */
  setParamValue(paramId: string, value: number | string): void;

  /**
   * Get a single parameter value
   * @param paramId - Parameter identifier
   * @returns Current parameter value or undefined
   */
  getParamValue(paramId: string): number | string | undefined;

  /**
   * Get all parameters as array
   * @returns Array of parameter objects
   */
  getParams(): HoleParameter[];

  /**
   * Set multiple parameters at once
   * @param params - Array of parameter id-value pairs
   */
  setParams(params: HoleParameter[]): void;

  /**
   * Initialize parameters from profile config defaults
   * @param metadata - Metadata containing profile config
   * @internal
   */
  updateProfile(metadata: HoleMetadata): void;

  /**
   * Recalculate dimensions and profile based on current parameters
   * Evaluates expressions in profileConfig and updates geometry
   * @internal
   */
  protected _updateProfile(): void;

  /**
   * Evaluate a parameter expression (e.g., "#w# * 2 + 10")
   * Replaces #paramId# placeholders with actual values
   * @param expression - Expression string to evaluate
   * @returns Evaluated numeric result
   * @internal
   */
  protected _evaluateExp(expression: string): number;

  /**
   * Update hole profile via Parameter Manager
   * @internal
   */
  protected updateByPM(): void;

  /**
   * Refresh the front-facing profile geometry
   * @param svgPath - SVG path string
   * @internal
   */
  protected refreshFrontProfile(svgPath: string): void;

  /**
   * Get pocket associated with this hole
   * @returns Pocket entity or undefined
   */
  getPocket(): unknown | undefined;

  /**
   * Calculate baseboard cutting information for this hole
   * Handles special cases for floor-level holes without pockets
   * @param surfaceObj - Surface object to cut against
   * @returns Array of cutter info objects
   */
  getBaseboardCutterInfo(surfaceObj: SurfaceObject): BaseboardCutterInfo[];

  /**
   * X-axis dimension (width)
   */
  XLength: number;

  /**
   * Y-axis dimension (depth)
   */
  YLength?: number;

  /**
   * Z-axis dimension (height)
   */
  ZLength: number;

  /**
   * Wall/floor/ceiling thickness at hole location
   */
  thickness: number;

  /**
   * Z-coordinate position of hole
   */
  z: number;
}

// ============================================================================
// Module Registration
// ============================================================================

/**
 * Register Hole class with entity system
 * Model class identifier: HSConstants.ModelClass.NgHole
 */
declare module './entity' {
  interface Entity {
    registerClass(modelClass: string, constructor: typeof Hole): void;
  }
}