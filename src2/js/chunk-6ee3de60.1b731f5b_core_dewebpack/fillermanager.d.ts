/**
 * Manages filler objects for a host container, handling creation, removal, and type changes.
 * @module FillerManager
 */

import { PolyId } from './PolyId';
import { Filler, ShapeType, FillerCreator } from './Filler';

/**
 * Serialized filler data structure
 */
export interface FillerData {
  /** Polygon identifier */
  pid: PolyId;
  /** Shape type of the filler */
  type: ShapeType;
  /** Optional metadata for shade fillers */
  mm?: {
    /** Count property for shade filler */
    ct?: number;
    /** Width property for shade filler */
    wd?: number;
  };
}

/**
 * Host object that contains fillers and polygons
 */
export interface FillerHost {
  /** Host type identifier */
  type: string | number;
  /** Child elements including fillers */
  children: unknown[];
  /** Available polygons that can have fillers */
  avaiablePoly: Array<{ polyId: PolyId }>;
  /** Polygons currently in use */
  usedPoly: PolyId[];
}

/**
 * Serialized manager state
 */
export interface FillerManagerJSON {
  /** Array of serialized filler data */
  fls: FillerData[];
}

/**
 * Manages lifecycle and properties of filler objects within a host container.
 * Handles creation, removal, type changes, and serialization of fillers.
 */
export declare class FillerManager {
  /** Host container for the fillers */
  private readonly host: FillerHost;
  
  /** Default filler type to use when creating new fillers */
  private _defaultType: ShapeType;
  
  /** Internal storage of filler data */
  private fillerData: FillerData[];

  /**
   * Creates a new FillerManager instance
   * @param host - The host container that will contain the fillers
   * @param defaultType - Default shape type for new fillers
   */
  constructor(host: FillerHost, defaultType: ShapeType);

  /**
   * Removes all fillers from the host
   */
  clear(): void;

  /**
   * Creates fillers for all available polygons that don't already have them
   * @param skipUnused - Whether to skip creating fillers for unused polygons
   */
  createFiller(skipUnused?: boolean): void;

  /**
   * Adds a filler for a specific polygon if it doesn't already exist
   * @param polyId - Polygon identifier to add filler for
   * @returns The created filler or undefined if already exists
   */
  addFiller(polyId: PolyId): Filler | undefined;

  /**
   * Removes a filler by polygon ID
   * @param polyId - Polygon identifier of the filler to remove
   * @param removeFromData - Whether to also remove from internal data storage
   * @returns Index where the filler was removed, or -1 if not found
   */
  removeFiller(polyId: PolyId, removeFromData?: boolean): number;

  /**
   * Finds the type of filler for a given polygon
   * @param polyId - Polygon identifier to lookup
   * @returns The filler type, or default type if not found
   */
  findFillerType(polyId: PolyId): ShapeType;

  /**
   * Changes the type for multiple polygons' fillers
   * @param polygons - Array of polygons to update
   * @param newType - New shape type to apply
   */
  changeType(polygons: Array<{ polyId: PolyId }>, newType: ShapeType): void;

  /**
   * Changes the type of a specific filler, recreating it if necessary
   * @param polygon - Polygon whose filler type should change
   * @param newType - New shape type to apply
   * @returns The updated or recreated filler
   */
  changeFillerType(polygon: { polyId: PolyId }, newType: ShapeType): Filler | undefined;

  /**
   * Changes the count property for a shade-type filler
   * @param polygon - Polygon with shade filler
   * @param count - New count value
   * @returns The updated filler
   */
  changeShadeFillerCount(polygon: { polyId: PolyId }, count: number): Filler | undefined;

  /**
   * Changes the width property for a shade-type filler
   * @param polygon - Polygon with shade filler
   * @param width - New width value
   * @returns The updated filler
   */
  changeShadeFillerWidth(polygon: { polyId: PolyId }, width: number): Filler | undefined;

  /**
   * Merges filler data by removing invalid entries and ensuring all available polygons have data
   */
  mergeFiller(): void;

  /**
   * Gets all active filler instances
   */
  get fillers(): Filler[];

  /**
   * Gets the default filler type
   */
  get defaultType(): ShapeType;

  /**
   * Sets the default filler type and updates all existing fillers
   */
  set defaultType(type: ShapeType);

  /**
   * Serializes the manager state to JSON
   * @returns Serialized filler data
   */
  toJSON(): FillerManagerJSON;

  /**
   * Restores manager state from serialized data
   * @param data - Serialized manager state
   */
  deserialize(data: FillerManagerJSON): void;

  /**
   * Creates a filler instance for a polygon
   * @param polygon - Polygon to create filler for
   * @returns Created filler instance
   */
  private create(polygon: { polyId: PolyId }): Filler;
}