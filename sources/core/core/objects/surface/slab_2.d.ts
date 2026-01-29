/**
 * Module: Slab
 * 
 * Represents a slab entity in a building model (floor/ceiling structural element).
 * A slab has a base profile (outline), thickness, height, and can contain openings.
 * It has three types of faces: top, bottom, and side faces.
 */

import { Entity, Entity_IO, EntityFlagEnum } from './Entity';
import { Face } from './Face';
import { Loop } from './Loop';
import { Signal } from './Signal';

/**
 * Enum defining the three types of faces a slab can have
 */
export enum SlabFaceType {
  /** Top surface of the slab */
  top = 'top',
  /** Bottom surface of the slab */
  bottom = 'bottom',
  /** Vertical edges around the perimeter */
  side = 'side'
}

/**
 * Data structure for serialized slab data
 */
interface SlabDumpData {
  height: number;
  thickness: number;
  baseProfile: string;
  faces: Record<string, string[]>;
  openings?: string[];
}

/**
 * Map of face ID to Face entity
 */
type FaceMap = Record<string, Face>;

/**
 * Map of face types to their respective face collections
 */
type FacesCollection = Record<SlabFaceType, FaceMap>;

/**
 * 2D point coordinate
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Signal payload when opening is added/removed
 */
interface OpeningSignalPayload {
  entity: Entity;
}

/**
 * I/O handler for serializing and deserializing Slab entities
 */
export declare class Slab_IO extends Entity_IO {
  /**
   * Load a slab from serialized data
   * @param entity - The slab entity to populate
   * @param data - Serialized slab data
   * @param context - Loading context
   * @param options - Additional loading options
   */
  load(
    entity: Slab,
    data: SlabDumpData,
    context: unknown,
    options: unknown
  ): void;

  /**
   * Get singleton instance of Slab_IO
   */
  static instance(): Slab_IO;
}

/**
 * Slab entity class
 * 
 * Represents a horizontal structural element (floor or ceiling slab) with:
 * - A 2D base profile defining its outline
 * - Height and thickness properties
 * - Top, bottom, and side faces for rendering
 * - Support for openings (holes) like stairs or shafts
 */
export declare class Slab extends Entity {
  /**
   * Private height value
   */
  private __height: number;

  /**
   * Private thickness value
   */
  private __thickness: number;

  /**
   * Private base profile (outline loop)
   */
  private __baseProfile?: Loop;

  /**
   * Collection of faces organized by type
   */
  private _faces: FacesCollection;

  /**
   * Map of openings (holes) in the slab
   */
  private __openings: Record<string, Entity>;

  /**
   * Signal dispatched when an opening is added
   */
  readonly signalOpeningAdded: Signal<OpeningSignalPayload>;

  /**
   * Signal dispatched when an opening is removed
   */
  readonly signalOpeningRemoved: Signal<OpeningSignalPayload>;

  /**
   * Create a new slab
   * @param tag - Optional identifier tag
   */
  constructor(tag?: string);

  /**
   * Get parent entities (layers) this slab belongs to
   */
  get parents(): Record<string, Entity>;

  /**
   * Set entity flags (prevents setting hidden flag on slabs)
   * @param flag - Flag(s) to set
   * @param value - Whether to enable the flag
   */
  setFlagOn(flag: EntityFlagEnum, value?: boolean): void;

  /**
   * Get the base profile (2D outline) of the slab
   */
  getBaseProfile(): Loop | undefined;

  /**
   * Internal method to set the base profile
   * @param profile - New base profile
   */
  private _setBaseProfile(profile?: Loop): void;

  /**
   * Get the thickness of the slab
   */
  getThickness(): number;

  /**
   * Height of the slab from base level
   */
  height: number;

  /**
   * Thickness of the slab
   */
  thickness: number;

  /**
   * Base profile defining the slab outline
   */
  baseProfile?: Loop;

  /**
   * Map of top faces
   */
  topFaces: FaceMap;

  /**
   * Map of bottom faces
   */
  bottomFaces: FaceMap;

  /**
   * Map of side faces
   */
  sideFaces: FaceMap;

  /**
   * Map of openings (holes) in the slab
   */
  openings: Record<string, Entity>;

  /**
   * Calculate the 2D centroid of the slab
   */
  get center(): Point2D | undefined;

  /**
   * Get all faces organized by type
   */
  get faces(): FacesCollection;

  /**
   * Get a specific face by ID
   * @param faceId - Face identifier
   */
  getFace(faceId: string): Face | undefined;

  /**
   * Get all faces of a specific type
   * @param faceType - Type of faces to retrieve
   */
  getFaces(faceType: SlabFaceType): FaceMap;

  /**
   * Internal method to get faces by type
   * @param faceType - Type of faces to retrieve
   */
  private _getFaces(faceType: SlabFaceType): FaceMap;

  /**
   * Get the type of a given face
   * @param face - Face entity
   * @returns Face type or empty string if not found
   */
  getFaceType(face?: Face): string;

  /**
   * Internal method to update faces of a specific type
   * @param faceType - Type of faces to update
   * @param newFaces - New face collection
   */
  private _setFaces(faceType: SlabFaceType, newFaces: FaceMap): void;

  /**
   * Get material from a face
   * @param face - Face entity
   */
  static getMaterial(face?: Face): unknown;

  /**
   * Clean up and destroy the slab
   */
  destroy(): void;

  /**
   * Get the I/O handler for this entity
   */
  getIO(): Slab_IO;

  /**
   * Iterate over all faces
   * @param callback - Function called for each face
   * @param context - Context for callback execution
   */
  forEachFace(callback: (face: Face) => void, context?: unknown): void;

  /**
   * Get the layer this slab serves as a floor for
   */
  getBaseLayer(): Entity | undefined;

  /**
   * Get the layer this slab serves as a ceiling for
   */
  getUnderLayer(): Entity | undefined;

  /**
   * Get the unique parent layer (deprecated - slabs can have 2 parents)
   */
  getUniqueParent(): Entity | undefined;

  /**
   * Verify the integrity of the slab and its children
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Check if an opening belongs to this slab
   * @param opening - Opening entity to check
   */
  hasOpening(opening: Entity): boolean;

  /**
   * Internal method to update openings collection
   * @param newOpenings - New openings map
   */
  private _setOpenings(newOpenings: Record<string, Entity>): void;

  /**
   * Internal method to add an opening
   * @param opening - Opening to add
   */
  private _addOpening(opening: Entity): boolean;

  /**
   * Internal method to remove an opening
   * @param opening - Opening to remove
   */
  private _removeOpening(opening: Entity): boolean;

  /**
   * Verify that the base profile is valid
   * @returns True if base profile forms a valid closed loop with sufficient area
   */
  private _verifyBaseProfile(): boolean;

  /**
   * Iterate over all openings in the slab
   * @param callback - Function called for each opening
   * @param context - Context for callback execution
   */
  forEachOpening(callback: (opening: Entity) => void, context?: unknown): void;
}