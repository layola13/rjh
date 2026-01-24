/**
 * Module: ParametricModel
 * Provides parametric modeling capabilities for architectural elements like walls, windows, and extrusions.
 */

import { MaterialData } from './MaterialData';
import { EntityField } from './EntityField';
import { Version } from './Version';
import { Entity, Entity_IO } from './Entity';

/**
 * Enum defining types of parametric models
 */
export enum ParametricModelType {
  /** Extruded body geometry */
  extrudedBody = "extrudedBody",
  /** Window element */
  window = "window",
  /** Window frame element */
  windowFrame = "window",
  /** Wall element */
  wall = "wall",
  /** Wall with window cutout */
  windowWall = "wall",
  /** Window sill element */
  windowSill = "windowSill",
  /** Window ceiling element */
  windowCeiling = "windowCeiling",
  /** Window opening/hole */
  windowHole = "windowHole",
  /** Window pocket/recess */
  windowPocket = "windowPocket"
}

/**
 * Material data configuration for frame elements
 */
interface FrameMaterialConfig {
  materialData?: MaterialData;
  [key: string]: unknown;
}

/**
 * Material data configuration for window elements
 */
interface WindowMaterialConfig {
  materialData?: MaterialData;
  [key: string]: unknown;
}

/**
 * Parameters defining the parametric model's properties
 */
interface ParametricModelParameters {
  /** Primary material data */
  materialData?: MaterialData;
  /** Inner surface material data */
  innerMaterialData?: MaterialData;
  /** Side surface material data */
  sideMaterialData?: MaterialData;
  /** Top surface material data */
  topMaterialData?: MaterialData;
  /** Bottom surface material data */
  bottomMaterialData?: MaterialData;
  /** Frame configuration */
  frame?: FrameMaterialConfig;
  /** Window configuration */
  window?: WindowMaterialConfig;
  [key: string]: unknown;
}

/**
 * Serialization options for dump/load operations
 */
interface DumpOptions {
  /** Version string for compatibility checks */
  version?: string;
  [key: string]: unknown;
}

/**
 * Serialized representation of a parametric model
 */
interface ParametricModelDump {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
  /** Rotation around X axis */
  XRotation?: number;
  /** Rotation around Y axis */
  YRotation?: number;
  /** Rotation around Z axis */
  ZRotation?: number;
  /** Serialized parameters with material IDs */
  parameters: Record<string, unknown>;
  /** Host entity ID if assigned */
  host?: string;
  [key: string]: unknown;
}

/**
 * Input/Output handler for ParametricModel serialization
 * Manages conversion between runtime objects and serialized data
 */
export declare class ParametricModel_IO extends Entity_IO {
  /**
   * Serializes a ParametricModel instance to a portable format
   * @param entity - The parametric model to serialize
   * @param callback - Optional callback for custom serialization logic
   * @param includeDefaults - Whether to include default values
   * @param options - Serialization options including material tracking
   * @returns Array containing the serialized data
   */
  dump(
    entity: ParametricModel,
    callback?: (result: unknown[], entity: ParametricModel) => void,
    includeDefaults?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes data into a ParametricModel instance
   * @param entity - The target parametric model instance
   * @param data - Serialized parametric model data
   * @param options - Deserialization options including version info
   */
  load(
    entity: ParametricModel,
    data: ParametricModelDump,
    options?: DumpOptions
  ): void;

  /**
   * Gets the singleton instance of the IO handler
   */
  static instance(): ParametricModel_IO;
}

/**
 * Base class for parametric architectural models
 * Supports position, rotation, materials, and custom parameters
 */
export declare class ParametricModel extends Entity {
  /** X coordinate in 3D space */
  private __x: number;
  
  /** Y coordinate in 3D space */
  private __y: number;
  
  /** Z coordinate in 3D space */
  private __z: number;
  
  /** Rotation around X axis in degrees */
  private __XRotation: number;
  
  /** Rotation around Y axis in degrees */
  private __YRotation: number;
  
  /** Rotation around Z axis in degrees */
  private __ZRotation: number;
  
  /** Model parameters including materials and dimensions */
  private __parameters: ParametricModelParameters;
  
  /** Flag indicating geometry needs regeneration */
  private __needUpdate: boolean;
  
  /** Parent entity this model is assigned to */
  private _host: Entity | null;
  
  /** Map of materials by type identifier */
  readonly materials: Map<string, MaterialData>;

  /**
   * Creates a new parametric model
   * @param id - Unique identifier
   * @param type - Model type/class identifier
   */
  constructor(id?: string, type?: string);

  /** X coordinate in 3D space */
  @EntityField()
  x: number;

  /** Y coordinate in 3D space */
  @EntityField()
  y: number;

  /** Z coordinate in 3D space */
  @EntityField()
  z: number;

  /** Rotation around X axis */
  @EntityField()
  XRotation: number;

  /** Rotation around Y axis */
  @EntityField()
  YRotation: number;

  /** Rotation around Z axis */
  @EntityField()
  ZRotation: number;

  /** Model parameters */
  @EntityField()
  parameters: ParametricModelParameters;

  /** Geometry update flag */
  @EntityField()
  needUpdate: boolean;

  /** Parent/host entity */
  @EntityField({ prefix: "_" })
  host: Entity | null;

  /**
   * Initializes model with parameter configuration
   * @param params - Parameter object defining model properties
   */
  initByParameters(params: ParametricModelParameters): void;

  /**
   * Gets the host entity this model is assigned to
   * @returns The host entity or null
   */
  getHost(): Entity | null;

  /**
   * Called when parameters change, override for custom behavior
   */
  onParametersChanged(): void;

  /**
   * Assigns this model to a host entity
   * @param entity - The entity to assign to
   */
  assignTo(entity: Entity): void;

  /**
   * Retrieves a material by type identifier
   * @param type - Material type key
   * @returns The material data or undefined
   */
  getMaterial(type: string): MaterialData | undefined;

  /**
   * Sets a material for a specific type
   * @param type - Material type key
   * @param material - Material data to set
   */
  setMaterial(type: string, material: MaterialData): void;

  /**
   * Gets materials in JSON format for FGI export
   * @returns Map of material type to JSON representation
   */
  get materialsForFGI(): Map<string, Record<string, unknown>>;

  /**
   * Gets the IO handler for this model class
   * @returns The IO handler instance
   */
  getIO(): ParametricModel_IO;

  /**
   * Refreshes internal bounding box (override in subclasses)
   */
  protected refreshBoundInternal(): void;

  /**
   * Copies properties from another parametric model
   * @param source - Source model to copy from
   */
  protected _copyFrom(source: ParametricModel): void;

  /**
   * Called when a field value changes
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  protected onFieldChanged(
    fieldName: string,
    oldValue: unknown,
    newValue: unknown
  ): void;
}