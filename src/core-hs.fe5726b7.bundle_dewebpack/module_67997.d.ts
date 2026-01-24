/**
 * PModel module - Core model system for 3D entities with positioning, rotation, and material properties
 */

import type { Entity, Entity_IO } from './Entity';
import type { Signal } from './Signal';
import type { PaintMaterial } from './PaintMaterial';

/**
 * Enumeration of available PModel types
 */
export const PModelTypes: {
  readonly eContent: 'content';
  readonly eExtrude: 'extrude';
  readonly eMolding: 'molding';
  readonly eBox: 'box';
  readonly ePAssembly: 'passembly';
  readonly ePSlidingDoor: 'pslidingdoor';
  readonly ePSlidingDoorLeaf: 'pslidingdoorleaf';
  readonly ePSegmentLoft: 'psegmentloft';
};

/**
 * Property names for PModel value fields
 */
export const PModelValueProperties: {
  readonly x: 'x';
  readonly y: 'y';
  readonly z: 'z';
  readonly XLength: 'w';
  readonly YLength: 'd';
  readonly ZLength: 'h';
};

/**
 * Serialization context for dump/load operations
 */
export interface SerializationContext {
  states: Record<string, StateField>;
  [key: string]: unknown;
}

/**
 * Serialized representation of a PModel
 */
export interface PModelDump {
  seekId?: string;
  localId?: string;
  x: string;
  y: string;
  z: string;
  XRotation: string;
  YRotation: string;
  ZRotation: string;
  XAnimationCenter: string;
  YAnimationCenter: string;
  ZAnimationCenter: string;
  Axis: string;
  AnimationRotation: string;
  AnimationOffset: string;
  host?: string;
  material?: string;
  [key: string]: unknown;
}

/**
 * State field wrapper for observable properties
 */
export interface StateField {
  id: string;
  verify(): boolean;
  bindObjectFieldChanged(target: unknown, fieldName: string): void;
}

/**
 * Input/Output handler for PModel serialization
 */
export class PModel_IO extends Entity_IO {
  /**
   * Serialize a PModel instance to a dump format
   * @param entity - The PModel entity to serialize
   * @param callback - Optional callback for post-processing
   * @param deepClone - Whether to perform deep cloning of references
   * @param options - Additional serialization options
   * @returns Array of serialized objects
   */
  dump(
    entity: PModel,
    callback?: (result: unknown[], entity: PModel) => void,
    deepClone?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize a PModel instance from dump format
   * @param entity - The target PModel entity
   * @param dump - The serialized data
   * @param context - Serialization context containing states
   */
  load(entity: PModel, dump: PModelDump, context: SerializationContext): void;

  /**
   * Check if a material reference requires deep cloning
   * @param materialId - The material identifier
   * @returns True if deep cloning is required
   */
  mustDeepClone(materialId: string): boolean;

  /**
   * Get singleton instance of PModel_IO
   */
  static instance(): PModel_IO;
}

/**
 * Core 3D model entity with positioning, rotation, animation, and material properties
 */
export class PModel extends Entity {
  /**
   * Create a new PModel instance
   * @param id - Unique identifier for the model
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Host entity that owns this model
   */
  protected _host: PModel | null;

  /**
   * Model type identifier
   */
  type: string | undefined;

  /**
   * Internal seek identifier
   */
  protected _seekId: string;

  /**
   * Local identifier within scope
   */
  localId: string;

  /**
   * Seek identifier for database queries
   */
  get seekId(): string;
  set seekId(value: string);

  // Position state fields
  protected __x: StateField;
  protected __y: StateField;
  protected __z: StateField;

  /**
   * X-axis position
   */
  get x(): number;
  set x(value: number);

  /**
   * Y-axis position
   */
  get y(): number;
  set y(value: number);

  /**
   * Z-axis position
   */
  get z(): number;
  set z(value: number);

  // Rotation state fields
  protected __XRotation: StateField;
  protected __YRotation: StateField;
  protected __ZRotation: StateField;

  /**
   * Rotation around X-axis (in degrees or radians)
   */
  get XRotation(): number;
  set XRotation(value: number);

  /**
   * Rotation around Y-axis (in degrees or radians)
   */
  get YRotation(): number;
  set YRotation(value: number);

  /**
   * Rotation around Z-axis (in degrees or radians)
   */
  get ZRotation(): number;
  set ZRotation(value: number);

  // Animation center state fields
  protected __XAnimationCenter: StateField;
  protected __YAnimationCenter: StateField;
  protected __ZAnimationCenter: StateField;

  /**
   * X-coordinate of animation pivot point
   */
  get XAnimationCenter(): number;
  set XAnimationCenter(value: number);

  /**
   * Y-coordinate of animation pivot point
   */
  get YAnimationCenter(): number;
  set YAnimationCenter(value: number);

  /**
   * Z-coordinate of animation pivot point
   */
  get ZAnimationCenter(): number;
  set ZAnimationCenter(value: number);

  // Animation state fields
  protected __Axis: StateField;
  protected __AnimationRotation: StateField;
  protected __AnimationOffset: StateField;

  /**
   * Animation rotation axis
   */
  get Axis(): number;
  set Axis(value: number);

  /**
   * Current animation rotation value
   */
  get AnimationRotation(): number;
  set AnimationRotation(value: number);

  /**
   * Animation offset value
   */
  get AnimationOffset(): number;
  set AnimationOffset(value: number);

  /**
   * Material applied to this model
   */
  protected __material: PaintMaterial | undefined;
  
  /**
   * Get or set the material
   */
  get material(): PaintMaterial | undefined;
  set material(value: PaintMaterial | undefined);

  /**
   * Signal dispatched when position or rotation changes
   */
  signalPositionChanged: Signal<PModel>;

  /**
   * Signal dispatched when material changes
   */
  signalMaterialChanged: Signal<PModel>;

  /**
   * Signal dispatched when geometry changes
   */
  signalGeometryChanged: Signal<PModel>;

  /**
   * Outline points for 2D representation
   */
  outline: unknown[];

  /**
   * Define reactive value properties based on PModelValueProperties
   */
  protected defineValueProperties(): void;

  /**
   * Clean up resources and dispose signals
   */
  destroy(): void;

  /**
   * Assign this model to a host entity
   * @param host - The host entity
   */
  assignTo(host: PModel): void;

  /**
   * Set the material for this model
   * @param material - Material instance or material ID
   * @param materialInstance - Actual material instance if first param is ID
   */
  setMaterial(material: PaintMaterial | string, materialInstance?: PaintMaterial): void;

  /**
   * Get the current material
   * @returns The material instance or undefined
   */
  getMaterial(): PaintMaterial | undefined;

  /**
   * Mark material as dirty (needs update)
   */
  protected dirtyMaterial(): void;

  /**
   * Verify the integrity of all state fields
   * @returns True if all fields are valid
   */
  verify(): boolean;

  /**
   * Get the IO handler for this model
   * @returns PModel_IO instance
   */
  getIO(): PModel_IO;

  /**
   * Refresh internal bounding box calculation
   */
  protected refreshBoundInternal(): void;

  /**
   * Get the host entity
   * @returns The host PModel or null
   */
  getHost(): PModel | null;

  /**
   * Set the host entity
   * @param host - The new host entity
   */
  setHost(host: PModel | null): void;

  /**
   * Update model state (called per frame)
   */
  update(): void;

  /**
   * Iterate over all state fields
   * @param callback - Function to call for each state
   */
  forEachState(callback: (state: StateField) => void): void;

  /**
   * Handle field change events
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  protected onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Flip the model (mirror transformation)
   */
  flipSelf(): void;

  /**
   * Iterate over all materials in this model and its children
   * @param callback - Function to call for each material
   * @param context - Context object for the callback
   */
  forEachMaterial(callback: (material: PaintMaterial) => void, context?: unknown): void;

  /**
   * Replace the parent entity
   * @param newParent - The new parent entity
   */
  replaceParent(newParent: Entity): void;

  /**
   * Check if field changes should be transacted (undo/redo)
   * @returns False for PModel (transactions disabled)
   */
  canTransactField(): boolean;

  /**
   * Mark this entity as dirty (needs re-render)
   */
  protected dirty(): void;

  /**
   * Iterate over child entities
   * @param callback - Function to call for each child
   */
  protected forEachChild(callback: (child: PModel) => void): void;
}