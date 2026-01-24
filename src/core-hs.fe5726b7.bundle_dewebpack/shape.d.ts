/**
 * Shape module - Defines geometric shapes with materials and patterns
 * Provides base class for all shape entities in the system
 */

import { Entity, Entity_IO } from './Entity';
import { Pattern } from './Pattern';
import { PavingOption, PavingPointTypeEnum } from './PavingOption';
import { MaterialData, ColorModeEnum } from './Material';
import { SignalHook } from './SignalHook';
import { Point2D, BoundingBox } from './Geometry';
import { MixPaint } from './MixPaint';

/**
 * Configuration options for EntityField decorator
 */
interface EntityFieldOptions<T> {
  /** Property name prefix (e.g., "_" for private backing fields) */
  prefix?: string;
  /** Custom setter logic executed before main set */
  partialSet?(value: T): void;
  /** Custom equality comparison */
  equals?(value: T): boolean;
  /** Hook executed before setting value */
  preSet?(): void;
  /** Hook executed after setting value */
  postSet?(oldValue: T, newValue: T): void;
}

/**
 * Options for dumping entity data
 */
interface DumpOptions {
  /** Application version for compatibility */
  version?: string;
  /** Material data cache */
  materialDataCache?: Record<string, MaterialData>;
  /** List of invalid entity IDs to skip */
  invalidIds?: string[];
}

/**
 * Serialized shape data structure
 */
interface ShapeDumpData {
  /** Material ID reference */
  material?: string;
  /** Paving options configuration */
  pavingOption?: Record<string, unknown>;
  /** Pattern ID reference */
  pattern?: string;
}

/**
 * Base class for all geometric shapes with material and pattern support
 * Extends Entity to provide shape-specific functionality including:
 * - Material management
 * - Pattern application
 * - Paving options
 * - Bounding box calculation
 */
export declare class Shape extends Entity {
  /** Material applied to this shape */
  private _material: MaterialData | null;
  
  /** Pattern applied to this shape */
  private _pattern: Pattern | null;
  
  /** Public pattern accessor/mutator */
  pattern: Pattern | null | undefined;
  
  /** Paving configuration options */
  private _pavingOption: PavingOption;
  
  /** Original control points defining the shape */
  originPoints: Point2D[];
  
  /** Signal hook for pattern dirty state changes */
  private _patternDirtySignalHook: SignalHook;
  
  /** Signal hook for pattern reset events */
  private _patternResetSignalHook: SignalHook;
  
  /** Signal hook for pattern reset override events */
  private _patternResetOverrideSignalHook: SignalHook;
  
  /** Signal hook for pattern seam width changes */
  private _patternSeamWidthChangeHook: SignalHook;

  /**
   * Creates a new Shape instance
   * @param id - Unique identifier for the shape
   * @param parent - Parent entity in the scene hierarchy
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Deep copies properties from another shape
   * @param source - Source shape to copy from
   */
  copyFrom(source: Shape): void;

  /**
   * Sets the material for this shape
   * @param material - Material to apply
   */
  setMaterial(material: MaterialData): void;

  /**
   * Gets the current pattern applied to this shape
   * @returns Current pattern or null
   */
  getPattern(): Pattern | null;

  /**
   * Sets the pattern for this shape
   * @param pattern - Pattern to apply
   */
  setPattern(pattern: Pattern | null): void;

  /**
   * Internal pattern setter with optional change notification
   * @param pattern - Pattern to set
   * @param notifyChange - Whether to trigger change callbacks
   */
  private _setPattern(pattern: Pattern | null, notifyChange?: boolean): void;

  /**
   * Callback invoked when pattern changes
   * @param pattern - New pattern value
   */
  protected _onPatternChanged(pattern: Pattern | null): void;

  /**
   * Handler for pattern seam width changes
   * Updates the mix grid accordingly
   */
  onPatternSeamWidthChange(): void;

  /**
   * Updates the mixed grid layout
   * Override in subclasses for specific behavior
   */
  updateMixGrid(): void;

  /**
   * Handler for pattern dirty state changes
   * @param pattern - Pattern that became dirty
   */
  onPatternDirty(pattern: Pattern): void;

  /**
   * Handler for pattern reset events
   * @param pattern - Pattern that was reset
   */
  onPatternReset(pattern: Pattern): void;

  /**
   * Handler for pattern reset override events
   * @param pattern - Pattern with reset override
   */
  onPatternResetOverride(pattern: Pattern): void;

  /**
   * Gets the default paving position based on shape bounds
   * @returns Point at top-left corner of bounding box
   */
  getDefaultPavingPos(): Point2D;

  /**
   * Checks if current paving point is set to default
   * @returns True if using default paving point type
   */
  isDefaultPavingPoint(): boolean;

  /**
   * Updates paving options with new arguments
   * @param args - Partial paving option arguments to merge
   */
  setPavingOptionArgs(args: Partial<PavingOption>): void;

  /**
   * Resets paving options to default configuration
   */
  resetPavingOption(): void;

  /**
   * Calculates the axis-aligned bounding box of this shape
   * @returns Bounding box with min/max coordinates
   */
  bounding(): BoundingBox;

  /**
   * Gets the path defining this shape's geometry
   * Override in subclasses to provide specific path data
   * @returns Array of point arrays defining the shape path
   */
  getPath(): Point2D[][];

  /**
   * Sets the original control points for this shape
   * @param points - Array of control points (deep cloned)
   */
  setOriginPoints(points?: Point2D[]): void;

  /**
   * Finds the parent MixPaint entity in the hierarchy
   * @returns Parent MixPaint or null if not found
   */
  getMixpaint(): MixPaint | null;

  /**
   * Checks if this shape is part of a grid layout
   * @returns False by default, override in subclasses
   */
  partOfGrid(): boolean;

  /**
   * Clears shape data and resets to default state
   * @param material - Optional material to set after clearing
   */
  clear(material?: MaterialData): void;

  /**
   * Marks the material as dirty, triggering re-render
   */
  dirtyMaterial(): void;

  /**
   * Disposes all resources and cleans up event listeners
   */
  destroy(): void;

  /**
   * Callback invoked when entity field changes
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Public accessor for material property
   */
  material: MaterialData | null;

  /**
   * Public accessor for paving option property
   */
  pavingOption: PavingOption;
}

/**
 * Serialization handler for Shape entities
 * Manages conversion between runtime objects and serialized data
 */
export declare class Shape_IO extends Entity_IO {
  /**
   * Determines whether pattern entities should be serialized
   * @returns True to include pattern data in dumps
   */
  get savePatternEntity(): boolean;

  /**
   * Serializes a shape instance to transferable data
   * @param entity - Shape instance to serialize
   * @param callback - Optional post-processing callback
   * @param deep - Whether to perform deep serialization
   * @param options - Serialization options (version, caches, etc.)
   * @returns Array of serialized entity data objects
   */
  dump(
    entity: Shape,
    callback?: (data: unknown[], entity: Shape) => void,
    deep?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes shape data into an entity instance
   * @param entity - Target shape instance to populate
   * @param data - Serialized shape data
   * @param options - Deserialization options (version, caches, etc.)
   */
  load(entity: Shape, data: ShapeDumpData, options?: DumpOptions): void;
}

/**
 * Decorator for marking entity fields with special serialization behavior
 * @param options - Field configuration options
 */
declare function EntityField<T>(options: EntityFieldOptions<T>): PropertyDecorator;

/**
 * Binds material data to an entity's property for reactive updates
 * @param target - Target entity instance
 * @param propertyName - Name of the property to bind
 * @param materialData - Material data to bind
 */
declare function bindMaterialData(
  target: Shape,
  propertyName: string,
  materialData: MaterialData
): void;