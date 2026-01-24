/**
 * MixPaint updater version 2
 * Handles migration and updating of paint data for materials and floorplans
 */
export declare class MixPaintUpdaterV2 {
  /**
   * Updates an entity from paint data
   * @param entity - The entity to update
   * @param paintData - The paint data to load
   * @param options - Additional options for migration
   */
  updateFromPaintData(entity: any, paintData: any, options?: any): void;

  /**
   * Updates an entity from a data dump
   * @param entity - The entity to update
   * @param dump - The data dump to load
   * @param options - Additional options for loading
   */
  updateFromDump(entity: any, dump: any, options?: any): void;

  /**
   * Post-update processing for floorplan
   * Triggers material migration after floorplan update
   * @param floorplan - The floorplan to process
   */
  postUpdateFloorplan(floorplan: Floorplan): void;

  /**
   * Migrates materials to newer format
   * Handles version-based migration and mixpaint entity updates
   * @param floorplan - The floorplan containing materials to migrate
   * @private
   */
  private _migrateMaterial(floorplan: Floorplan): void;
}

/**
 * Floorplan interface representing a floor plan with materials
 */
interface Floorplan {
  /**
   * Gets metadata including version information
   */
  getMeta(): FloorplanMeta;

  /**
   * Iterates over each material in the floorplan
   * @param callback - Function to execute for each material
   */
  forEachMaterial(callback: (material: Material) => void): void;
}

/**
 * Floorplan metadata
 */
interface FloorplanMeta {
  /**
   * Version string (e.g., "0.4")
   */
  version: string;
}

/**
 * Material interface with paint and mixpaint properties
 */
interface Material {
  /**
   * Paint data associated with the material
   */
  paintData?: PaintData;

  /**
   * MixPaint entity data
   */
  mixpaint?: any;
}

/**
 * Paint data structure
 */
interface PaintData {
  /**
   * MixPaint data within paint data
   */
  mixpaint?: any;
}