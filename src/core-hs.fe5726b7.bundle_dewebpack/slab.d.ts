/**
 * Slab module - Defines floor and ceiling slabs with openings
 * @module Slab
 */

import type { Entity, Entity_IO } from './Entity';
import type { Face } from './Face';
import type { Loop } from './Loop';
import type { Signal } from './Signal';
import type { Layer } from './Layer';
import type { Opening } from './Opening';
import type { Material } from './Material';
import type { Matrix4 } from './Matrix';
import type { Curve } from './Curve';

/**
 * Type of slab face surface
 */
export enum SlabFaceType {
  /** Top surface of the slab */
  top = 'top',
  /** Bottom surface of the slab */
  bottom = 'bottom',
  /** Side surface of the slab */
  side = 'side'
}

/**
 * Slab serialization/deserialization handler
 */
export declare class Slab_IO extends Entity_IO {
  /**
   * Serialize a slab entity to a plain object
   * @param entity - The slab entity to dump
   * @param callback - Optional post-dump callback
   * @param recursive - Whether to recursively dump children
   * @param options - Additional dump options
   * @returns Serialized slab data array
   */
  dump(
    entity: Slab,
    callback?: (data: any[], entity: Slab) => void,
    recursive?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserialize slab data into an entity instance
   * @param entity - Target slab entity to populate
   * @param data - Serialized slab data
   * @param context - Deserialization context
   */
  load(entity: Slab, data: any, context: any): void;

  /**
   * Migrate and load legacy slab data format
   * @param entity - Target slab entity
   * @param data - Legacy serialized data
   * @param context - Migration context
   */
  migrateLoad(entity: Slab, data: any, context: any): void;

  /**
   * Get singleton instance of Slab_IO
   */
  static instance(): Slab_IO;
}

/**
 * Slab entity - Represents a floor or ceiling slab with thickness and openings
 */
export declare class Slab extends Entity {
  /**
   * Height of the slab relative to the layer
   * @internal
   */
  private __height: number;

  /**
   * Thickness of the slab
   * @internal
   */
  private __thickness: number;

  /**
   * Base profile loop defining the slab perimeter
   * @internal
   */
  private __baseProfile: Loop;

  /**
   * Cached path data for performance
   * @internal
   */
  private _pathCache?: any;

  /**
   * Signal emitted when an opening is added to the slab
   */
  signalOpeningAdded: Signal<Slab>;

  /**
   * Signal emitted when an opening is removed from the slab
   */
  signalOpeningRemoved: Signal<Slab>;

  /**
   * Vertical position of the slab
   */
  height: number;

  /**
   * Slab thickness (distance between top and bottom faces)
   */
  thickness: number;

  /**
   * Base profile defining the slab boundary
   */
  baseProfile: Loop;

  /**
   * @param name - Optional entity name
   * @param document - Parent document
   */
  constructor(name?: string, document?: any);

  /**
   * Factory method to create a slab
   * @param baseProfile - Loop defining the slab perimeter
   * @param height - Vertical position
   * @param thickness - Slab thickness
   * @returns Newly created slab instance
   */
  static create(
    baseProfile: Loop,
    height?: number,
    thickness?: number
  ): Slab;

  /**
   * Get parent layers containing this slab
   */
  get parents(): Record<string, Layer>;

  /**
   * Get all side faces of the slab
   */
  get sideFaces(): Record<string, Face>;

  /**
   * Get all bottom faces of the slab
   */
  get bottomFaces(): Record<string, Face>;

  /**
   * Get all top faces of the slab
   */
  get topFaces(): Record<string, Face>;

  /**
   * Get the base profile loop
   */
  getBaseProfile(): Loop;

  /**
   * Set the base profile loop
   * @param profile - New base profile
   */
  setBaseProfile(profile: Loop): void;

  /**
   * Internal base profile setter
   * @internal
   */
  private _setBaseProfile(profile: Loop): void;

  /**
   * Get slab thickness
   */
  getThickness(): number;

  /**
   * Set slab thickness
   * @param thickness - New thickness value
   */
  setThickness(thickness: number): void;

  /**
   * Handle thickness change event
   * @internal
   */
  private _onThicknessChanged(oldValue: number, newValue: number): void;

  /**
   * Get the geometric center of the slab
   */
  get center(): { x: number; y: number } | undefined;

  /**
   * Get all faces grouped by type (non-auxiliary)
   */
  get faces(): Record<SlabFaceType, Record<string, Face>>;

  /**
   * Get all auxiliary faces grouped by type
   */
  get auxFaces(): Record<SlabFaceType, Record<string, Face>>;

  /**
   * Get flat list of all faces
   */
  get faceList(): Face[];

  /**
   * Get flat list of all auxiliary faces
   */
  get auxFaceList(): Face[];

  /**
   * Get all openings hosted by this slab
   */
  get openings(): Record<string, Opening>;

  /**
   * Get a specific face by ID
   * @param faceId - Face entity ID
   */
  getFace(faceId: string): Face | undefined;

  /**
   * Mark all faces as needing geometry update
   */
  dirtyFaces(): void;

  /**
   * Internal method to get faces organized by type
   * @internal
   */
  private _getFacesObj(includeAux: boolean): Record<SlabFaceType, Record<string, Face>>;

  /**
   * Get faces of a specific type
   * @param faceType - Type of faces to retrieve
   * @param includeAux - Whether to include auxiliary faces
   */
  getFaces(faceType: SlabFaceType, includeAux?: boolean): Record<string, Face>;

  /**
   * Internal implementation of getFaces
   * @internal
   */
  private _getFaces(faceType: SlabFaceType, includeAux?: boolean): Record<string, Face>;

  /**
   * Determine the type of a given face
   * @param face - Face entity or face ID
   */
  getFaceType(face: Face | string): SlabFaceType | undefined;

  /**
   * Get material from a face
   * @param face - Face entity
   */
  static getMaterial(face: Face): Material | undefined;

  /**
   * Get the serialization handler
   */
  getIO(): Slab_IO;

  /**
   * Iterate over all faces
   * @param callback - Function to call for each face
   * @param context - Context for callback execution
   */
  forEachFace(callback: (face: Face) => void, context?: any): void;

  /**
   * Get the layer where this slab is a floor
   */
  getBaseLayer(): Layer | undefined;

  /**
   * Get the layer where this slab is a ceiling
   */
  getUnderLayer(): Layer | undefined;

  /**
   * Get the primary parent layer
   */
  getUniqueParent(): Layer | undefined;

  /**
   * Handle field value changes
   * @internal
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void;

  /**
   * Handle child entity dirty events
   * @internal
   */
  onChildDirty(child: Entity, event: any): void;

  /**
   * Handle child entity removal
   * @internal
   */
  onChildRemoved(child: Entity): void;

  /**
   * Refresh internal bounding box
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * Verify slab integrity and consistency
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Verify base profile validity
   * @internal
   */
  private _verifyBaseProfile(): boolean;

  /**
   * Validate all floor face geometries
   * @returns True if all geometries are valid
   */
  validateFloorGeometries(): boolean;

  /**
   * Mirror the slab across a plane
   * @param mirrorPlane - Mirror transformation data
   */
  mirror(mirrorPlane: { matrix4: Matrix4 }): void;

  /**
   * Update UV mapping for ceiling materials relative to doors
   * @param face - Ceiling face to update
   */
  updateCeilingMaterialUV(face: Face): void;

  /**
   * Add content entity to the slab
   * @param content - Content entity
   */
  addContent(content: Entity): void;

  /**
   * Remove content entity by ID
   * @param contentId - Content entity ID
   */
  removeContent(contentId: string): void;

  /**
   * Set all openings at once
   * @param openings - Map of opening entities
   */
  setOpenings(openings: Record<string, Opening>): void;

  /**
   * Add an opening to the slab
   * @param opening - Opening entity
   */
  addOpening(opening: Opening): void;

  /**
   * Remove an opening from the slab
   * @param opening - Opening entity
   */
  removeOpening(opening: Opening): void;

  /**
   * Check if the slab contains a specific opening
   * @param opening - Opening entity
   */
  hasOpening(opening: Opening): boolean;

  /**
   * Iterate over all openings
   * @param callback - Function to call for each opening
   * @param context - Context for callback execution
   */
  forEachOpening(callback: (opening: Opening) => void, context?: any): void;

  /**
   * Get metadata about this slab in its layer
   */
  get slabInfo(): any;

  /**
   * Get the computed path of the slab (cached)
   */
  get path(): any;

  /**
   * Clean up resources
   */
  destroy(): void;
}