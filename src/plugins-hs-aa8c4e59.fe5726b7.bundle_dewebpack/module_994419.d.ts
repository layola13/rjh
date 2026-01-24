/**
 * Pave entity collection module
 * Collects paving entities from floor plan scenes including floors, ceilings, structural faces, and beam faces
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Utils } from './Utils';
import { PaveEntity } from './PaveEntity';
import { DIYCollector } from './DIYCollector';
import { OpenCollector } from './OpenCollector';

/**
 * Material mix paint information
 */
export interface MixPaint {
  /** Face group associated with this mix paint */
  faceGroup: FaceGroup;
  // Additional mix paint properties
}

/**
 * Face group interface
 */
export interface FaceGroup {
  /**
   * Get all face IDs in this group
   * @returns Array of face ID strings
   */
  getFaceIds(): string[];
}

/**
 * Material information attached to entities
 */
export interface Material {
  /** Mix paint configuration */
  mixpaint?: MixPaint;
}

/**
 * Face entity (floor, ceiling, structural face, or beam face)
 */
export interface FaceEntity {
  /** Unique identifier for this face */
  id: string;
  /** Material applied to this face */
  material?: Material;
}

/**
 * Space information containing architectural elements
 */
export interface SpaceInfo {
  /** Floor faces in this space */
  floors?: FaceEntity[];
  /** Ceiling faces in this space */
  ceilings?: FaceEntity[];
  /** Structural faces (walls) in this space */
  structureFaces?: FaceEntity[];
  /** Beam faces in this space */
  beamFaces?: FaceEntity[];
}

/**
 * Layer information containing spaces
 */
export interface LayerInfo {
  /**
   * Get all space information objects in this layer
   * @returns Array of space info objects
   */
  getSpaceInfos(): SpaceInfo[];
}

/**
 * Scene layer containing architectural data
 */
export interface SceneLayer {
  /** Layer metadata and space information */
  layerInfo: LayerInfo;
}

/**
 * Floor plan scene
 */
export interface FloorPlanScene {
  /**
   * Iterate over each layer in the scene
   * @param callback Function to execute for each layer
   */
  forEachLayer(callback: (layer: SceneLayer) => void): void;
}

/**
 * Floor plan application
 */
export interface FloorPlan {
  /** Scene containing all layers and entities */
  scene: FloorPlanScene;
}

/**
 * Main application instance
 */
export interface App {
  /** Floor plan data */
  floorplan: FloorPlan;
}

/**
 * Pave configuration data passed to PaveEntity
 */
export interface PaveConfig {
  /** Source mix paint configuration */
  mixPaint: MixPaint;
  /** Original entity being paved */
  srcEntity: FaceEntity;
  /** Type identifier of the face */
  faceType: string;
  /** Optional outline geometry */
  outline?: unknown[];
}

/**
 * Collection context for entity gathering
 */
export interface CollectionContext {
  // Context properties for entity collection
}

/**
 * Entity provider registration options
 */
export interface ProviderOptions {
  /** Type identifier for this provider */
  type: string;
}

/**
 * Entity provider implementation
 */
export interface EntityProvider {
  /**
   * Collect entities based on context
   * @param context Collection context
   * @returns Promise resolving to collected entities
   */
  collectEntity(context: CollectionContext): Promise<PaveEntity[]>;
}

/**
 * Wraps entity arrays in a promise
 * @param entities Array of entities to wrap
 * @returns Promise resolving to the entities
 */
export declare function wrapPromiseEntities(entities: PaveEntity[]): Promise<PaveEntity[]>;

/**
 * Registers an entity provider
 * @param options Provider configuration options
 * @param provider Provider implementation
 */
export declare function registerProvider(
  options: ProviderOptions,
  provider: EntityProvider
): void;

/**
 * Collects all face entities from a layer
 * @param layer Scene layer to process
 * @param context Collection context
 * @returns Array of pave entities
 */
declare function collectFacesFromLayer(
  layer: SceneLayer,
  context: CollectionContext
): PaveEntity[];

/**
 * Processes a face entity and creates a pave entity if applicable
 * @param face Face entity to process
 * @param context Collection context
 * @param processedIds Set of already processed face IDs to avoid duplicates
 * @param entities Output array to append created entities
 */
declare function processFaceEntity(
  face: FaceEntity,
  context: CollectionContext,
  processedIds: string[],
  entities: PaveEntity[]
): void;

/**
 * Main collection function for pave entities
 * Gathers all paving entities from floor plan including:
 * - Floor faces
 * - Ceiling faces
 * - Structural faces (walls)
 * - Beam faces (excluding overlapping ones)
 * - DIY entities
 * - Open entities
 * 
 * @param context Collection context
 * @returns Promise resolving to array of all collected pave entities
 */
export declare function collectPaveEntities(context: CollectionContext): Promise<PaveEntity[]>;