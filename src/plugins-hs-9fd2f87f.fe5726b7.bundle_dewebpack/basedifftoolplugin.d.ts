import { HSApp } from './518193';
import { HSCore } from './635589';
import { DiffTool } from './617057';
import { DiffToolUtil } from './2632';
import { DiffCW } from './939473';

/**
 * Design metadata for loading floorplan designs
 */
interface DesignData {
  data: string;
  [key: string]: unknown;
}

/**
 * Wall outline represented as array of 4 points [x, y, z, w]
 */
type WallOutline = [number, number, number, number];

/**
 * Wall opening data structure
 */
interface WallOpening {
  outline: number[][];
  [key: string]: unknown;
}

/**
 * Wall opening collection for a content entity
 */
interface WallOpeningData {
  content: unknown;
  openings: WallOpening[];
}

/**
 * Entity with associated outline geometry
 */
interface EntityWithOutline<T = unknown> {
  entity: T;
  outline: number[][][];
}

/**
 * Base plugin class for handling floorplan diff/comparison functionality.
 * Compares an original floorplan with the current floorplan to detect changes
 * in walls, openings, structures, and other content.
 */
export class BaseDiffToolPlugin extends HSApp.Plugin.IPlugin {
  /** Application instance reference */
  private readonly _app: ReturnType<typeof HSApp.App.getApp>;
  
  /** Current active floorplan */
  private _currentFloorplan?: unknown;
  
  /** Original floorplan loaded for comparison */
  private _originalFloorplan?: unknown;
  
  /** Diff tool instance for computing differences */
  public diffTool?: DiffTool;

  constructor(...args: unknown[]) {
    super(...args);
    this._app = HSApp.App.getApp();
    this._currentFloorplan = undefined;
    this._originalFloorplan = undefined;
    this.diffTool = undefined;
  }

  /**
   * Preloads the original floorplan from server for comparison.
   * Retrieves the original asset ID from design metadata and creates a DiffTool instance.
   * @returns Promise that resolves when original floorplan is loaded and diff is computed
   */
  public async preloadOriginalFloorplan(): Promise<void> {
    const originalAssetId = this._app.designMetadata.get('originalAccessoryAssetId') as string | undefined;
    
    if (!originalAssetId) {
      return Promise.resolve();
    }

    this._currentFloorplan = this._app.floorplan;
    
    const designData = await this.loadDesignJsonFromServer(originalAssetId, (window as any).adskUser.sid);
    this._originalFloorplan = await this.createFloorplan(designData, originalAssetId);
    
    if (this._originalFloorplan) {
      this.diffTool = new DiffTool(this._originalFloorplan, this._currentFloorplan);
      this.diffTool.compute();
    }
  }

  /**
   * Gets the loaded original floorplan
   * @returns Original floorplan instance or undefined
   */
  public getOriginalFloorplan(): unknown {
    return this._originalFloorplan;
  }

  /**
   * Checks if a layer exists in the original floorplan
   * @param layerId - Layer identifier to check
   * @returns True if layer exists in original floorplan
   */
  public isOriginalLayerExist(layerId: string): boolean {
    return !!this.diffTool && this.diffTool.isOriginalLayerExist(layerId);
  }

  /**
   * Clears the cached original floorplan and diff tool
   */
  public clearOriginalFloorplan(): void {
    if (this._originalFloorplan) {
      (this._originalFloorplan as any).clear();
      this._originalFloorplan = undefined;
      this.diffTool = undefined;
    }
  }

  /**
   * Loads design JSON data from server
   * @param designId - Design asset identifier
   * @param sessionId - User session ID
   * @returns Promise resolving to design data
   */
  public loadDesignJsonFromServer(designId: string, sessionId: string): Promise<DesignData> {
    return HSApp.Io.Request.Design.loadDesign(designId, sessionId).then((data: DesignData) => data);
  }

  /**
   * Creates a floorplan instance from design JSON data
   * @param designData - Design data loaded from server
   * @param designId - Design identifier
   * @returns Promise resolving to floorplan instance or undefined if data is invalid
   */
  public async createFloorplan(designData: DesignData | undefined, designId: string): Promise<unknown> {
    if (!designData) {
      return undefined;
    }

    const metadata = new HSCore.Doc.Metadata();
    metadata.fromObject(HSCore.Doc.Metadata.getDesignMeta(designId, designData));
    
    const app = HSApp.App.getApp();
    const parsedData = JSON.parse(designData.data);
    const document = await app.docManager.newDocument(parsedData, metadata, designId, false);
    
    return document.floorplan;
  }

  /**
   * Gets outlines of walls that were removed from the original floorplan
   * @param wallId - Wall identifier
   * @returns Array of wall outline coordinates
   */
  public getRemovedWallOutlines(wallId: string): WallOutline[] {
    return this.diffTool ? this.diffTool.getRemovedWallOutlines(wallId) : [];
  }

  /**
   * Gets outlines of walls that are new in the current floorplan
   * @param wallId - Wall identifier
   * @returns Array of wall outline coordinates
   */
  public getNewWallOutlines(wallId: string): WallOutline[] {
    return this.diffTool ? this.diffTool.getNewWallOutlines(wallId) : [];
  }

  /**
   * Gets all new wall openings (doors, windows) in current floorplan
   * @returns Array of wall opening data
   */
  public getNewWallOpeings(): WallOpeningData[] {
    return this.diffTool ? this.diffTool.getNewWallOpeings() : [];
  }

  /**
   * Gets all removed wall openings from original floorplan
   * @returns Array of wall opening data
   */
  public getRemovedWallOpeings(): WallOpeningData[] {
    return this.diffTool ? this.diffTool.getRemovedWallOpeings() : [];
  }

  /**
   * Gets BOM (Bill of Materials) data for removed walls
   * @param wallId - Wall identifier
   * @returns Wall data array
   */
  public getBomRemovedWallData(wallId: string): unknown[] {
    return this.diffTool ? this.diffTool.getRemovedWallData(wallId) : [];
  }

  /**
   * Gets BOM data for new walls
   * @param wallId - Wall identifier
   * @returns Wall data array
   */
  public getBomNewWallData(wallId: string): unknown[] {
    return this.diffTool ? this.diffTool.getNewWallData(wallId) : [];
  }

  /**
   * Checks if content was removed from original floorplan
   * @param content - Content entity to check
   * @returns True if content was removed
   */
  public isRemovedContent(content: unknown): boolean {
    return !!(this.diffTool && DiffToolUtil.isNewDiffToolContent(content)) && this.diffTool.isRemovedContent(content);
  }

  /**
   * Checks if content is new in current floorplan
   * @param content - Content entity to check
   * @returns True if content is new
   */
  public isNewContent(content: unknown): boolean {
    return !!(this.diffTool && DiffToolUtil.isNewDiffToolContent(content)) && this.diffTool.isNewContent(content);
  }

  /**
   * Checks if window is new in current floorplan
   * @param window - Window entity to check
   * @returns True if window is new
   */
  public isNewWindow(window: unknown): boolean {
    return !!(this.diffTool && DiffToolUtil.isNewDiffToolWindow(window)) && this.diffTool.isNewContent(window);
  }

  /**
   * Gets all new structures added in current floorplan
   * @returns Array of new structure entities
   */
  public getAllNewStructures(): unknown[] {
    return this.diffTool ? this.diffTool.getNewStructures() : [];
  }

  /**
   * Gets all structures removed from original floorplan
   * @returns Array of removed structure entities
   */
  public getAllRemoveStructures(): unknown[] {
    return this.diffTool ? this.diffTool.getRemoveStructures() : [];
  }

  /**
   * Gets all new walls with their outline geometry
   * @returns Array of walls with outline data
   */
  public getAllNewWalls(): EntityWithOutline[] {
    const result: EntityWithOutline[] = [];
    const floorplan = this._currentFloorplan as any;
    
    if (!floorplan) {
      return result;
    }

    floorplan.forEachWall((wall: any) => {
      const newOutlines = this.getNewWallOutlines(wall.id);
      
      if (newOutlines && newOutlines.length > 0) {
        const processedOutlines: number[][][] = [];
        
        newOutlines.forEach((outline) => {
          const reorderedOutline = [outline[3], outline[0], outline[1], outline[2]];
          processedOutlines.push(reorderedOutline);
        });
        
        result.push({
          entity: wall,
          outline: processedOutlines
        });
      }
    });

    return result;
  }

  /**
   * Gets all removed walls with their outline geometry
   * @returns Array of walls with outline data
   */
  public getAllRemovedWalls(): EntityWithOutline[] {
    const result: EntityWithOutline[] = [];
    const originalFloorplan = this.getOriginalFloorplan() as any;
    
    if (!originalFloorplan) {
      return result;
    }

    originalFloorplan.forEachWall((wall: any) => {
      const removedOutlines = this.getRemovedWallOutlines(wall.id);
      
      if (removedOutlines && removedOutlines.length > 0) {
        const processedOutlines: number[][][] = [];
        
        removedOutlines.forEach((outline) => {
          const reorderedOutline = [outline[3], outline[0], outline[1], outline[2]];
          processedOutlines.push(reorderedOutline);
        });
        
        result.push({
          entity: wall,
          outline: processedOutlines
        });
      }
    });

    return result;
  }

  /**
   * Gets all removed wall openings with geometry
   * @returns Array of openings with outline data
   */
  public getAllRemovedOpenings(): EntityWithOutline[] {
    const openings = this.getRemovedWallOpeings();
    return this.parseOpenings(openings);
  }

  /**
   * Gets all new wall openings with geometry
   * @returns Array of openings with outline data
   */
  public getAllNewOpenings(): EntityWithOutline[] {
    const openings = this.getNewWallOpeings();
    return this.parseOpenings(openings);
  }

  /**
   * Parses wall opening data into structured format
   * @param openingsData - Raw opening data from diff tool
   * @returns Parsed opening entities with outlines
   */
  private parseOpenings(openingsData: WallOpeningData[]): EntityWithOutline[] {
    const result: EntityWithOutline[] = [];
    
    openingsData.forEach((data) => {
      const outlines: number[][][] = [];
      
      data.openings.forEach((opening) => {
        outlines.push(opening.outline);
      });
      
      result.push({
        entity: data.content,
        outline: outlines
      });
    });

    return result;
  }

  /**
   * Gets curtain wall (CW) diff data
   * @returns Curtain wall difference data
   */
  public getCWDiffData(): unknown {
    return this.diffTool!.getDiffCWData();
  }

  /**
   * Destroys diff curtain wall elements from the scene layer
   * @param layer - Optional layer to destroy from, defaults to active layer
   */
  public destroyDiffCW(layer?: any): void {
    const targetLayer = layer ?? HSApp.App.getApp().floorplan.scene.activeLayer;
    this._app.selectionManager.unselectAll();
    
    targetLayer.getChildrenByType(DiffCW).forEach((diffCW: any) => {
      targetLayer.removeChild(diffCW, false);
    });
  }
}