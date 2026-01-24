/**
 * Sliding door leaf assembly module
 * Provides configuration and management for sliding door leaf components including mullions, transoms, and materials
 */

import type { PAssembly } from './PAssembly';
import type { Entity } from './Entity';
import type { PSegmentLoft } from './PSegmentLoft';
import type { Material } from './Material';

/**
 * Interlace type enumeration for sliding door leaves
 */
export enum PSlidingDoorLeafInterlaceTypeEnum {
  /** Inner-outer interlace pattern */
  InnerOuter = 1,
  /** Symmetrical interlace pattern */
  Symmetry = 2
}

/**
 * Metadata interface for profile components (mullions and transoms)
 */
export interface ProfileMetadata {
  /** Unique identifier for the metadata */
  seekId: string;
  /** Profile width dimension (X-axis) */
  profileSizeX: number;
  /** Profile height dimension (Y-axis) */
  profileSizeY: number;
  /** Slot configurations for the profile */
  slotsMap?: {
    slot1: SlotConfig;
    slot2: SlotConfig;
  };
}

/**
 * Slot configuration for profile components
 */
export interface SlotConfig {
  /** Horizontal position offset */
  x: number;
  /** Vertical position offset */
  y: number;
  /** Slot width */
  width: number;
  /** Slot height */
  height: number;
}

/**
 * Update parameters for loft metadata
 */
export interface LoftMetasUpdateParams {
  /** Mullion (vertical divider) metadata */
  mullionMetaData?: ProfileMetadata;
  /** Upper transom (horizontal divider) metadata */
  upTransomMetaData?: ProfileMetadata;
  /** Middle transom metadata */
  middleTransomMetaData?: ProfileMetadata;
  /** Lower transom metadata */
  downTransomMetaData?: ProfileMetadata;
  /** Material metadata for door leaf border */
  doorLeafBorderMaterialMetaData?: ProfileMetadata;
}

/**
 * Internal metadata count tracker
 */
interface MetadataCounter {
  count: number;
  metadata: ProfileMetadata;
}

/**
 * Internal material count tracker
 */
interface MaterialCounter {
  count: number;
  material: Material;
}

/**
 * Property descriptor for dynamic fields
 */
interface PropertyDescriptor<T> {
  readonly: boolean;
  get: () => T;
  set: (value: T) => void;
}

/**
 * Sliding door leaf assembly class
 * Manages the configuration and components of a sliding door leaf including profiles, materials, and structural elements
 */
export declare class PSlidingDoorLeaf extends PAssembly {
  /**
   * Creates a new PSlidingDoorLeaf instance
   * @param name - Optional name for the assembly
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: Entity);

  /**
   * Factory method to create and optionally initialize a sliding door leaf
   * @param metadata - Profile metadata for initialization
   * @param contentType - Content type identifier
   * @returns New PSlidingDoorLeaf instance
   */
  static create(metadata?: ProfileMetadata, contentType?: unknown): PSlidingDoorLeaf;

  /**
   * Gets the most commonly used mullion metadata across all lofts
   * @returns Mullion metadata or null if none found
   */
  getMullionMetaData(): ProfileMetadata | null;

  /**
   * Sets mullion metadata for all applicable lofts
   * @param metadata - Mullion metadata to apply
   */
  setMullionMetaData(metadata: ProfileMetadata): void;

  /**
   * Gets the most commonly used upper transom metadata
   * @returns Upper transom metadata or null if none found
   */
  getUpTransomMetaData(): ProfileMetadata | null;

  /**
   * Sets upper transom metadata for all applicable lofts
   * @param metadata - Upper transom metadata to apply
   */
  setUpTransomMetaData(metadata: ProfileMetadata): void;

  /**
   * Gets the most commonly used middle transom metadata
   * @returns Middle transom metadata or null if none found
   */
  getMiddleTransomMetaData(): ProfileMetadata | null;

  /**
   * Sets middle transom metadata for all applicable lofts
   * @param metadata - Middle transom metadata to apply
   */
  setMiddleTransomMetaData(metadata: ProfileMetadata): void;

  /**
   * Gets the most commonly used lower transom metadata
   * @returns Lower transom metadata or null if none found
   */
  getDownTransomMetaData(): ProfileMetadata | null;

  /**
   * Sets lower transom metadata for all applicable lofts
   * @param metadata - Lower transom metadata to apply
   */
  setDownTransomMetaData(metadata: ProfileMetadata): void;

  /**
   * Gets the most commonly used door leaf border material metadata
   * @returns Material metadata or null if none found
   */
  getDoorLeafBorderMaterialMetaData(): ProfileMetadata | null;

  /**
   * Sets door leaf border material for all segment lofts
   * @param metadata - Material metadata to apply
   */
  setDoorLeafBorderMaterialMetaData(metadata: ProfileMetadata): void;

  /**
   * Gets the most commonly used metadata by content type
   * @param contentType - Content type to filter by
   * @returns Most common metadata or null
   */
  getMostMetaByContentType(contentType: unknown): ProfileMetadata | null;

  /**
   * Gets the most commonly used material across all segment lofts
   * @returns Most common material or null
   */
  getLoftsMostMaterial(): Material | null;

  /**
   * Sets material (currently no-op, reserved for future use)
   * @param material - Material to apply
   */
  setMaterial(material: Material): void;

  /**
   * Batch updates loft metadata for multiple profile types
   * @param params - Metadata update parameters
   */
  setLoftMetas(params: LoftMetasUpdateParams): void;

  /**
   * Updates loft states based on provided metadata
   * @param params - Metadata parameters
   * @param shouldCompute - Whether to trigger geometry recomputation (default: true)
   */
  updateLoftStatesFromMetas(params: LoftMetasUpdateParams, shouldCompute?: boolean): void;

  /**
   * Updates mullion-specific states from metadata
   * @param metadata - Mullion metadata
   * @param shouldCompute - Whether to trigger recomputation (default: true)
   */
  updateMullionStatesFromMeta(metadata: ProfileMetadata, shouldCompute?: boolean): void;

  /**
   * Updates upper transom-specific states from metadata
   * @param metadata - Upper transom metadata
   * @param shouldCompute - Whether to trigger recomputation (default: true)
   */
  updateUpTransomStatesFromMeta(metadata: ProfileMetadata, shouldCompute?: boolean): void;

  /**
   * Updates lower transom-specific states from metadata
   * @param metadata - Lower transom metadata
   * @param shouldCompute - Whether to trigger recomputation (default: true)
   */
  updateDownTransomStatesFromMeta(metadata: ProfileMetadata, shouldCompute?: boolean): void;

  /**
   * Updates middle transom-specific states from metadata
   * @param metadata - Middle transom metadata
   * @param shouldCompute - Whether to trigger recomputation (default: true)
   */
  updateMiddleTransomStatesFromMeta(metadata: ProfileMetadata, shouldCompute?: boolean): void;

  /**
   * Retrieves all segment loft entities in the assembly
   * @returns Array of segment loft entities
   */
  getSegmentLofts(): PSegmentLoft[];

  /**
   * Retrieves loft entities filtered by content type
   * @param contentType - Content type to filter by
   * @returns Array of matching loft entities
   */
  getLoftsByContentType(contentType: unknown): PSegmentLoft[];

  /**
   * Mullion metadata accessor property
   */
  mullionMetaData: ProfileMetadata | null;

  /**
   * Upper transom metadata accessor property
   */
  upTransomMetaData: ProfileMetadata | null;

  /**
   * Middle transom metadata accessor property
   */
  middleTransomMetaData: ProfileMetadata | null;

  /**
   * Lower transom metadata accessor property
   */
  downTransomMetaData: ProfileMetadata | null;

  /**
   * Door leaf border material metadata accessor property
   */
  doorLeafBorderMaterialMetaData: ProfileMetadata | null;
}