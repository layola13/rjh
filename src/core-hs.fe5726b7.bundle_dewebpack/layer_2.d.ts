/**
 * Layer module - Manages building layers (floors/levels) with slabs, walls, and other architectural elements
 */

import { Entity, Entity_IO } from './Entity';
import { Slab, SlabFaceType } from './Slab';
import { Wall } from './Wall';
import { Floor } from './Floor';
import { Signal } from './Signal';
import { EntityField, EntityMapField } from './EntityDecorators';
import { Opening } from './Opening';
import { Logger } from './Logger';

/**
 * Layer type enumeration
 * Defines the functional type of a building layer
 */
export enum LayerTypeEnum {
  /** Standard floor layer */
  LayerTypeNormal = 1,
  /** Basement/foundation layer */
  LayerTypeBasement = 2
}

/**
 * Slab type classification
 * Categorizes slabs by their position in the layer
 */
export enum SlabType {
  /** Floor slab (bottom surface) */
  floor = 'floor',
  /** Ceiling slab (top surface) */
  ceiling = 'ceiling',
  /** Other/unclassified slab */
  other = 'other'
}

/**
 * Child entity type categories
 * Used for organizing and accessing different types of child entities
 */
export type ChildEntityType = 
  | 'slab' 
  | 'molding' 
  | 'opening' 
  | 'content' 
  | 'wall' 
  | 'group' 
  | 'light';

/**
 * Map of entities indexed by their ID
 */
export type EntityMap<T extends Entity = Entity> = Record<string, T>;

/**
 * Children map organizing entities by type
 */
export type ChildrenMap = Record<ChildEntityType, EntityMap>;

/**
 * IO handler for Layer serialization/deserialization
 */
export declare class Layer_IO extends Entity_IO {
  /**
   * Load layer data from serialized dump
   * @param entity - Target layer entity to populate
   * @param dump - Serialized layer data
   * @param entityMap - Map of all entities for reference resolution
   * @param options - Additional loading options
   */
  load(
    entity: Layer,
    dump: LayerDumpData,
    entityMap: EntityMap,
    options?: unknown
  ): void;

  /**
   * Get singleton instance of Layer_IO
   */
  static instance(): Layer_IO;
}

/**
 * Serialized layer data structure
 */
export interface LayerDumpData {
  /** Floor slab entity IDs */
  floorSlabs?: string[];
  /** Ceiling slab entity IDs */
  ceilingSlabs?: string[];
  /** Previous layer ID */
  prev?: string;
  /** Next layer ID */
  next?: string;
  /** Layer height in units */
  height?: number;
  /** Slab thickness in units */
  slabThickness?: number;
  /** Display name for UI */
  displayName?: string;
}

/**
 * Layer entity - Represents a horizontal building level/floor
 * Contains walls, slabs, openings, and other architectural elements
 */
export declare class Layer extends Entity {
  /** Slab type enum (re-exported for convenience) */
  static readonly SlabType: typeof SlabType;

  /** Layer height in units */
  height: number;

  /** Thickness of floor/ceiling slabs */
  slabThickness: number;

  /** Reference to previous (lower) layer */
  prev?: Layer;

  /** Reference to next (upper) layer */
  next?: Layer;

  /** Floor slabs indexed by ID */
  floorSlabs: EntityMap<Slab>;

  /** Ceiling slabs indexed by ID */
  ceilingSlabs: EntityMap<Slab>;

  /** Display name for UI */
  displayName: string;

  /** Signal emitted when slab thickness changes */
  signalSlabThicknessChanged: Signal<Layer>;

  /** Organized map of all child entities by type */
  childrenMap: ChildrenMap;

  /**
   * Create a new Layer instance
   * @param id - Optional entity ID
   */
  constructor(id?: string);

  /**
   * Factory method to create a new layer
   * @param id - Optional entity ID
   */
  static create(id?: string): Layer;

  /**
   * Get the parent building entity
   */
  get parent(): Entity | undefined;

  /**
   * Get all parent entities
   */
  get parents(): Entity[];

  /**
   * @deprecated Use slabThickness instead
   */
  get thickness(): number;

  /**
   * Get layer height
   */
  getHeight(): number;

  /**
   * @deprecated Use slabThickness instead
   */
  getThickness(): number;

  /**
   * Verify layer data integrity
   * @returns true if valid
   */
  verify(): boolean;

  /**
   * Get previous (lower) layer
   */
  getPrev(): Layer | undefined;

  /**
   * Set previous (lower) layer
   * @param layer - Layer to link
   */
  setPrev(layer?: Layer): void;

  /**
   * Get next (upper) layer
   */
  getNext(): Layer | undefined;

  /**
   * Set next (upper) layer
   * @param layer - Layer to link
   */
  setNext(layer?: Layer): void;

  /**
   * Get the type classification of a slab
   * @param slab - Slab to classify
   * @returns Slab type (floor, ceiling, or other)
   */
  getSlabType(slab: Slab): SlabType;

  /**
   * Get all slabs of a specific type
   * @param type - Slab type to retrieve
   * @returns Map of slabs by ID
   */
  getSlabs(type: SlabType): EntityMap<Slab>;

  /**
   * Set slabs for a specific type
   * @param type - Slab type to set
   * @param slabs - Array of slabs
   */
  setSlabs(type: SlabType, slabs: Slab[]): void;

  /**
   * Check if a slab is a floor slab
   * @param slab - Slab to check
   */
  isFloorSlab(slab: Slab): boolean;

  /**
   * Check if a slab is a ceiling slab
   * @param slab - Slab to check
   */
  isCeilingSlab(slab: Slab): boolean;

  /**
   * Set floor slabs
   * @param slabs - Array of floor slabs
   */
  setFloorSlabs(slabs: Slab[]): void;

  /**
   * Set ceiling slabs
   * @param slabs - Array of ceiling slabs
   */
  setCeilingSlabs(slabs: Slab[]): void;

  /**
   * Called when a child entity is added
   * @param child - Added entity
   */
  onChildAdded(child: Entity): void;

  /**
   * Called when a child entity is removed
   * @param child - Removed entity
   * @param notifyChild - Whether to notify the child
   */
  onChildRemoved(child: Entity, notifyChild?: boolean): void;

  /**
   * Find a wall matching a predicate
   * @param predicate - Filter function
   * @param thisArg - Context for predicate
   */
  findWall<T>(
    predicate: (this: T, wall: Wall) => boolean,
    thisArg?: T
  ): Wall | undefined;

  /**
   * Iterate over all wall points
   * @param callback - Function called for each point
   * @param thisArg - Context for callback
   */
  forEachPoint<T>(
    callback: (this: T, point: Entity) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all floor slabs
   * @param callback - Function called for each slab
   * @param thisArg - Context for callback
   */
  forEachFloorSlab<T>(
    callback: (this: T, slab: Slab) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all ceiling slabs
   * @param callback - Function called for each slab
   * @param thisArg - Context for callback
   */
  forEachCeilingSlab<T>(
    callback: (this: T, slab: Slab) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all floor faces
   * @param callback - Function called for each floor
   * @param thisArg - Context for callback
   */
  forEachFloor<T>(
    callback: (this: T, floor: Floor) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all rooms (floor faces)
   * @param callback - Function called for each room
   * @param thisArg - Context for callback
   */
  forEachRoom<T>(
    callback: (this: T, room: Floor) => void,
    thisArg?: T
  ): void;

  /**
   * Find a slab matching a predicate
   * @param predicate - Filter function
   * @param thisArg - Context for predicate
   */
  findSlab<T>(
    predicate: (this: T, slab: Slab) => boolean,
    thisArg?: T
  ): Slab | undefined;

  /**
   * Destroy the layer and clean up resources
   */
  destroy(): void;

  /**
   * Get the IO handler for this entity
   */
  getIO(): Layer_IO;

  /**
   * Check if layer is valid (not orphaned or hidden)
   */
  isValid(): boolean;

  /**
   * Remove all children of specific types
   * @param types - Array of child entity types to remove
   */
  removeAllChildrenByTypes(types: ChildEntityType[]): void;

  /**
   * Get all slabs in the layer
   */
  get slabs(): EntityMap<Slab>;

  /**
   * Get all walls in the layer
   */
  get walls(): EntityMap<Wall>;

  /**
   * Iterate over all slabs
   * @param callback - Function called for each slab
   * @param thisArg - Context for callback
   */
  forEachSlab<T>(
    callback: (this: T, slab: Slab) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all walls
   * @param callback - Function called for each wall
   * @param thisArg - Context for callback
   */
  forEachWall<T>(
    callback: (this: T, wall: Wall) => void,
    thisArg?: T
  ): void;

  /**
   * Iterate over all openings (doors, windows, holes)
   * @param callback - Function called for each opening
   * @param thisArg - Context for callback
   */
  forEachOpening<T>(
    callback: (this: T, opening: Opening) => void,
    thisArg?: T
  ): void;
}