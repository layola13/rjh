/**
 * WindowHole module - Defines parametric window opening models for walls
 * Handles window hole geometry, profiles, and integration with wall hosts
 */

import { ParametricModel, ParametricModel_IO } from './parametricmodel';
import { Entity } from './entity';
import { Signal } from './signal';
import { Wall } from './wall';

/**
 * Profile configuration for window hole shape generation
 */
interface ProfileConfig {
  /** SVG path template with parameter placeholders like ${expression} and #param# */
  template: string;
  /** Map of parameter names to their current values */
  paramValues: Map<string, number>;
}

/**
 * Parameters for initializing and configuring a WindowHole instance
 */
interface WindowHoleParameters {
  /** Inner edge start point of the opening */
  innerFrom?: THREE.Vector2;
  /** Inner edge end point of the opening */
  innerTo?: THREE.Vector2;
  /** Outer edge start point of the opening */
  outerFrom?: THREE.Vector2;
  /** Outer edge end point of the opening */
  outerTo?: THREE.Vector2;
  /** Whether to fill the top side of the opening */
  topNeedFill?: boolean;
  /** Whether to fill the bottom side of the opening */
  bottomNeedFill?: boolean;
  /** Whether to fill the from-side of the opening */
  fromSideNeedFill?: boolean;
  /** Whether to fill the to-side of the opening */
  toSideNeedFill?: boolean;
  /** X-axis offset from calculated center position */
  x?: number;
  /** Y-axis offset from calculated center position */
  y?: number;
  /** Z-axis offset */
  z?: number;
  /** Elevation from ground level */
  elevation?: number;
  /** Total height of the window opening */
  height?: number;
  /** Material data for the main surface */
  materialData?: unknown;
  /** Material data for side surfaces */
  sideMaterialData?: unknown;
  /** Material data for top surface */
  topMaterialData?: unknown;
  /** Material data for bottom surface */
  bottomMaterialData?: unknown;
}

/**
 * Serialization/deserialization handler for WindowHole entities
 */
export declare class WindowHole_IO extends ParametricModel_IO {
  /**
   * Serialize a WindowHole instance to a plain object
   * @param entity - The WindowHole instance to serialize
   * @param callback - Optional callback for custom serialization logic
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Serialized representation as array
   */
  dump(
    entity: WindowHole,
    callback?: (result: unknown[], source: WindowHole) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize data into a WindowHole instance
   * @param target - The WindowHole instance to populate
   * @param data - Serialized data object
   * @param context - Deserialization context
   */
  load(target: WindowHole, data: SerializedWindowHole, context: unknown): void;

  /**
   * Get singleton instance of WindowHole_IO
   */
  static instance(): WindowHole_IO;
}

/**
 * Serialized representation of WindowHole data
 */
interface SerializedWindowHole {
  /** Width along X-axis */
  XLength: number;
  /** Depth along Y-axis */
  YLength: number;
  /** Height along Z-axis */
  ZLength: number;
  /** Scale factor for X dimension (default: 1) */
  XScale?: number;
  /** Scale factor for Y dimension (default: 1) */
  YScale?: number;
  /** Scale factor for Z dimension (default: 1) */
  ZScale?: number;
  /** SVG path string defining the window profile shape */
  profile: string;
}

/**
 * Parametric window hole model that can be embedded in walls
 * Manages geometry, profile generation, and host wall integration
 */
export declare class WindowHole extends ParametricModel {
  /**
   * Base width of the window opening (before scaling)
   */
  XLength: number;

  /**
   * Base depth of the window opening (before scaling)
   */
  YLength: number;

  /**
   * Base height of the window opening (before scaling)
   */
  ZLength: number;

  /**
   * X-axis scale multiplier
   */
  XScale: number;

  /**
   * Y-axis scale multiplier
   */
  YScale: number;

  /**
   * Z-axis scale multiplier
   */
  ZScale: number;

  /**
   * SVG path string representing the window profile shape
   */
  profile: string;

  /**
   * Configuration for generating the profile path
   */
  readonly profileConfig: ProfileConfig;

  /**
   * Runtime parameters controlling window appearance and placement
   */
  parameters: WindowHoleParameters;

  /**
   * Host entity (typically a Wall) that contains this opening
   */
  host: Wall | undefined;

  /**
   * Signal emitted when a pocket/recess is added to the window
   */
  signalPocketAdded: Signal<WindowHole>;

  /**
   * Signal emitted when a pocket/recess is removed from the window
   */
  signalPocketRemoved: Signal<WindowHole>;

  /**
   * Create a new WindowHole instance
   * @param name - Optional name identifier
   * @param id - Optional unique identifier
   */
  constructor(name?: string, id?: unknown);

  /**
   * Get final width including scale factor
   */
  get XSize(): number;

  /**
   * Get final depth including scale factor
   */
  get YSize(): number;

  /**
   * Get final height including scale factor
   */
  get ZSize(): number;

  /**
   * Rotation is delegated to host entity (setter is no-op)
   */
  set rotation(value: number);

  /**
   * Get rotation from host entity, or 0 if no host
   */
  get rotation(): number;

  /**
   * Clean up resources and dispose signals
   */
  destroy(): void;

  /**
   * Initialize window hole from parameter object
   * Sets up default materials and geometry based on provided parameters
   * @param params - Configuration parameters
   */
  initByParameters(params: WindowHoleParameters): void;

  /**
   * Get the IO handler for this entity type
   */
  getIO(): WindowHole_IO;

  /**
   * React to parameter changes by recalculating geometry and profile
   * Updates position, dimensions, and notifies host wall
   */
  onParametersChanged(): void;

  /**
   * Check if pockets/recesses can be added to this window
   * @returns Always true for WindowHole
   */
  canAddPocket(): boolean;

  /**
   * Update the SVG profile path by evaluating template expressions
   * Substitutes parameter values and evaluates mathematical expressions
   * @private
   */
  private _updateProfile(): void;

  /**
   * Evaluate a mathematical expression with parameter substitution
   * Replaces #paramName# tokens with actual values and evaluates the result
   * @param exp - Expression string to evaluate
   * @returns Computed numerical result
   * @private
   */
  private _evaluateExp(exp: string): number;

  /**
   * Notify the host wall to update its geometry
   * Handles both preview and final update modes
   * @private
   */
  private _notifyHost(): void;

  /**
   * Internal storage for XLength (backing field)
   * @private
   */
  private __XLength: number;

  /**
   * Internal storage for YLength (backing field)
   * @private
   */
  private __YLength: number;

  /**
   * Internal storage for ZLength (backing field)
   * @private
   */
  private __ZLength: number;

  /**
   * Internal storage for XScale (backing field)
   * @private
   */
  private __XScale: number;

  /**
   * Internal storage for YScale (backing field)
   * @private
   */
  private __YScale: number;

  /**
   * Internal storage for ZScale (backing field)
   * @private
   */
  private __ZScale: number;

  /**
   * Internal storage for host reference (backing field)
   * @private
   */
  private _host: Wall | undefined;

  /**
   * Preview parameter state flag
   * @private
   */
  private _previewParams?: boolean;
}