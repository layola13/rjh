/**
 * House modeling engine module for analyzing structural changes in floor plans.
 * Provides functionality to track additions and removals of walls, slabs, and structures.
 * @module HouseModelingEngine
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 3D vector represented as [x, y, z]
 */
type Vector3 = [number, number, number];

/**
 * Euler rotation angles in radians [rx, ry, rz]
 */
type Rotation3 = [number, number, number];

/**
 * 3D size dimensions [width, height, depth]
 */
type Size3 = [number, number, number];

/**
 * Direction indicator for wall sections
 */
type Direction = 'h' | 'v';

/**
 * Response status information
 */
interface ResponseStatus {
  /** Status code (-1 indicates success) */
  code: number;
  /** Human-readable status message */
  message: string;
}

/**
 * Design metadata information
 */
interface DesignInfo {
  /** Unique identifier for the design */
  designId: string;
  /** Display name of the design */
  designName: string;
  /** Version identifier */
  versionId: string;
  /** Total area of the design in square units */
  designArea: number;
  /** Number of bedrooms */
  bedroom: number;
  /** Number of living rooms */
  livingroom: number;
  /** Number of bathrooms */
  bathroom: number;
}

/**
 * Geometric section data for a structural element
 */
interface Section {
  /** Center position in 3D space */
  center?: Vector3;
  /** Rotation angles */
  rotation?: Rotation3;
  /** Dimensions of the section */
  size: Size3;
  /** Surface area of the section */
  area: number;
  /** Optional direction indicator */
  direction?: Direction;
  /** Opening identifier (for opening sections) */
  openingId?: string;
  /** Content type of the opening */
  openingContentType?: string[];
  /** Class type (for structure sections) */
  classType?: string;
}

/**
 * Item with associated sections
 */
interface ItemWithSections {
  item: {
    /** Unique identifier of the item */
    id: string;
    /** Array of geometric sections */
    sections: Section[];
  };
}

/**
 * Concealed work item
 */
interface ConcealedWorkItem {
  item: unknown; // Type depends on DiffTool plugin implementation
}

/**
 * Collection of removed structural elements
 */
interface RemovedElements {
  /** Removed wall sections */
  walls: ItemWithSections[];
  /** Removed slab sections */
  slabs: ItemWithSections[];
  /** Removed structural elements */
  structures: ItemWithSections[];
}

/**
 * Collection of newly added structural elements
 */
interface NewElements {
  /** New wall sections */
  walls: ItemWithSections[];
  /** New slab sections */
  slabs: ItemWithSections[];
  /** New structural elements */
  structures: ItemWithSections[];
  /** Concealed work items */
  concealedWork: ConcealedWorkItem[];
}

/**
 * Complete house modeling data structure
 */
interface HouseModeling {
  /** Elements that were removed */
  removed: RemovedElements;
  /** Elements that were newly added */
  new: NewElements;
}

/**
 * Combined response containing design info and modeling data
 */
interface CombinedHouseModelingResponse {
  /** Response status */
  status: ResponseStatus;
  /** Response data payload */
  data: {
    /** Design metadata */
    designInfo: DesignInfo;
    /** House modeling changes */
    houseModeling: HouseModeling;
  };
}

/**
 * Wall data from BOM (Bill of Materials)
 */
interface WallData {
  /** Center position (2D) */
  center: { x: number; y: number };
  /** Rotation angle in degrees */
  rotation: number;
  /** Width of the wall section */
  width: number;
  /** Height of the wall section */
  height: number;
  /** Area occupied by openings */
  openingArea: number;
}

/**
 * Wall entity from floorplan
 */
interface Wall {
  /** Wall identifier */
  id: string;
  /** Start point */
  from: { x: number; y: number };
  /** End point */
  to: { x: number; y: number };
  /** 3D height */
  height3d: number;
}

/**
 * Opening data
 */
interface Opening {
  /** Start point */
  from: { x: number; y: number };
  /** End point */
  to: { x: number; y: number };
  /** Width of the opening */
  width: number;
  /** Z-axis start position */
  zFrom: { y: number };
  /** Z-axis end position */
  zTo: { y: number };
  /** Optional direction */
  direction?: Direction;
}

/**
 * Opening entity with content
 */
interface OpeningEntity {
  /** Opening geometries */
  openings: Opening[];
  /** Content information */
  content: {
    /** Content identifier */
    id: string;
    /** Content type information */
    contentType: {
      _types: string[];
    };
    /** Get the host wall */
    getHost(): { id: string };
  };
}

/**
 * Structure entity
 */
interface Structure {
  /** Structure identifier */
  id: string;
  /** Dimensions */
  size: {
    XSize: number;
    YSize: number;
    ZSize: number;
  };
  /** Surface area */
  area: number;
  /** Classification type */
  classType: string;
}

/**
 * Concealed work diff data
 */
interface CWDiffData {
  /** Array of diff items */
  diffItems?: unknown[];
}

/**
 * Room entity
 */
interface Room {
  /** Array of room information */
  roomInfos: unknown[];
  /** Type of room */
  roomType: string;
  /** 2D path defining room boundary */
  rawPath2d: unknown;
}

/**
 * DiffTool plugin interface
 */
interface DiffToolPlugin {
  /** Get the original floorplan state */
  getOriginalFloorplan(): Floorplan | null;
  /** Get removed wall data by wall ID */
  getBomRemovedWallData(wallId: string): WallData[] | null;
  /** Get new wall data by wall ID */
  getBomNewWallData(wallId: string): WallData[] | null;
  /** Get all new wall openings */
  getNewWallOpeings(): OpeningEntity[];
  /** Get all removed wall openings */
  getRemovedWallOpeings(): OpeningEntity[];
  /** Get all new structures */
  getAllNewStructures(): Structure[];
  /** Get all removed structures */
  getAllRemoveStructures(): Structure[];
  /** Get concealed work diff data */
  getCWDiffData(): CWDiffData | null;
  /** Preload the original floorplan data */
  preloadOriginalFloorplan(): Promise<void>;
}

/**
 * Floorplan interface
 */
interface Floorplan {
  /** Iterate over all walls */
  forEachWall(callback: (wall: Wall) => void): void;
  /** Iterate over all rooms */
  forEachRoom(callback: (room: Room) => void): void;
}

/**
 * Combines design information with house modeling data.
 * Extracts room counts and calculates total design area.
 * 
 * @param houseModeling - The house modeling data to combine
 * @returns Combined response with status, design info, and modeling data
 */
export function combinerHouseModeling(houseModeling: HouseModeling): CombinedHouseModelingResponse {
  const app = HSApp.App.getApp();
  const metadata = app.designMetadata;

  const designInfo: DesignInfo = {
    designId: metadata.get('designId'),
    designName: metadata.get('designName'),
    versionId: metadata.get('designVersion'),
    designArea: 0,
    bedroom: 0,
    livingroom: 0,
    bathroom: 0,
  };

  // Calculate room counts and total area
  app.floorplan.forEachRoom((room: Room) => {
    if (room.roomInfos.length > 0) {
      if (BedRoomList.includes(room.roomType)) {
        designInfo.bedroom++;
      } else if (LivingRoomList.includes(room.roomType)) {
        designInfo.livingroom++;
      } else if (BathRoomList.includes(room.roomType)) {
        designInfo.bathroom++;
      }
      designInfo.designArea += Utils.getArea(room.rawPath2d);
    }
  });

  return {
    status: {
      code: -1,
      message: 'OK',
    },
    data: {
      designInfo,
      houseModeling,
    },
  };
}

/**
 * Main engine class for processing house modeling changes.
 * Analyzes differences between original and modified floor plans.
 */
export class HouseModelingEngine {
  private _dTPlugin?: DiffToolPlugin;

  /**
   * Gets the DiffTool plugin instance, lazily initializing if needed.
   */
  private get dTPlugin(): DiffToolPlugin | undefined {
    if (!this._dTPlugin) {
      this._dTPlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.DiffTool
      );
    }
    return this._dTPlugin;
  }

  /**
   * Main processing method. Preloads data and generates house modeling results.
   * 
   * @returns Promise resolving to combined house modeling response
   */
  public async process(): Promise<CombinedHouseModelingResponse> {
    await this._preProcess();
    return combinerHouseModeling(this._getHouseModeling());
  }

  /**
   * Generates house modeling data by comparing original and current floor plans.
   * Tracks removed and newly added walls, openings, and structures.
   * 
   * @returns Complete house modeling data structure
   */
  private _getHouseModeling(): HouseModeling {
    const result: HouseModeling = {
      removed: {
        walls: [],
        slabs: [],
        structures: [],
      },
      new: {
        walls: [],
        slabs: [],
        structures: [],
        concealedWork: [],
      },
    };

    if (!this.dTPlugin) {
      return result;
    }

    const originalFloorplan = this.dTPlugin.getOriginalFloorplan();
    const currentFloorplan = HSApp.App.getApp().floorplan;

    if (!originalFloorplan || !currentFloorplan) {
      return result;
    }

    // Process removed walls
    originalFloorplan.forEachWall((wall: Wall) => {
      const wallData = this.dTPlugin!.getBomRemovedWallData(wall.id);
      if (wallData && wallData.length !== 0) {
        const wallLength = HSCore.Util.Math.Vec2.distance(wall.from, wall.to);
        result.removed.walls.push({
          item: {
            id: wall.id,
            sections: this._asSectionByWallData(wallData, wall.height3d, wallLength),
          },
        });
      }
    });

    // Process new walls
    currentFloorplan.forEachWall((wall: Wall) => {
      const wallData = this.dTPlugin!.getBomNewWallData(wall.id);
      if (wallData && wallData.length !== 0) {
        const wallLength = HSCore.Util.Math.Vec2.distance(wall.from, wall.to);
        result.new.walls.push({
          item: {
            id: wall.id,
            sections: this._asSectionByWallData(wallData, wall.height3d, wallLength),
          },
        });
      }
    });

    // Process openings
    const newOpenings = this.dTPlugin.getNewWallOpeings();
    const removedOpenings = this.dTPlugin.getRemovedWallOpeings();
    this.processOpeningData(newOpenings, result.new.walls);
    this.processOpeningData(removedOpenings, result.removed.walls);

    // Process structures
    const newStructures = this.dTPlugin.getAllNewStructures();
    const removedStructures = this.dTPlugin.getAllRemoveStructures();
    this.processStructureData(newStructures, result.new.structures);
    this.processStructureData(removedStructures, result.removed.structures);

    // Process concealed work
    this._processCWDiffData(result.new.concealedWork);

    return result;
  }

  /**
   * Preloads the original floorplan data.
   * 
   * @returns Promise that resolves when preloading is complete
   */
  private async _preProcess(): Promise<void> {
    return this.dTPlugin?.preloadOriginalFloorplan() ?? Promise.resolve();
  }

  /**
   * Converts wall BOM data into section format.
   * 
   * @param wallDataList - Array of wall data from BOM
   * @param height - 3D height of the wall
   * @param totalLength - Total length of the wall
   * @returns Array of formatted sections
   */
  private _asSectionByWallData(
    wallDataList: WallData[],
    height: number,
    totalLength: number
  ): Section[] {
    return wallDataList.map((wallData) => {
      const rotationRadians = (wallData.rotation * Math.PI) / 180;
      const section: Section = {
        center: [wallData.center.x, wallData.center.y, 0],
        rotation: [0, 0, rotationRadians],
        size: [wallData.width, wallData.height, height],
        area: wallData.width * height - wallData.openingArea,
      };

      // Add direction if section is not full wall length
      if (!HSCore.Util.Math.nearlyEquals(wallData.width, totalLength)) {
        section.direction = 'h';
      }

      return section;
    });
  }

  /**
   * Converts opening data into section format.
   * 
   * @param openingEntity - Opening entity with geometry and content
   * @returns Array of formatted opening sections
   */
  private _asSectionByOpeningData(openingEntity: OpeningEntity): Section[] {
    return openingEntity.openings.map((opening) => {
      const length = HSCore.Util.Math.getDistance(opening.from, opening.to);
      const width = opening.width;
      const height = Math.abs(opening.zFrom.y - opening.zTo.y);

      const section: Section = {
        size: [length, width, height],
        area: length * height,
        openingId: openingEntity.content.id,
        openingContentType: openingEntity.content.contentType._types,
      };

      if (opening.direction) {
        section.direction = opening.direction;
      }

      return section;
    });
  }

  /**
   * Processes opening data and merges it into wall items.
   * 
   * @param openings - Array of opening entities
   * @param wallItems - Array of wall items to update
   */
  public processOpeningData(openings: OpeningEntity[], wallItems: ItemWithSections[]): void {
    openings.forEach((opening) => {
      const hostWallId = opening.content.getHost().id;
      let found = false;

      // Try to find existing wall item
      for (let i = 0; i < wallItems.length; i++) {
        const wallItem = wallItems[i];
        if (wallItem.item.id === hostWallId) {
          const openingSections = this._asSectionByOpeningData(opening);
          wallItem.item.sections = [...wallItem.item.sections, ...openingSections];
          found = true;
          break;
        }
      }

      // Create new wall item if not found
      if (!found) {
        wallItems.push({
          item: {
            id: hostWallId,
            sections: this._asSectionByOpeningData(opening),
          },
        });
      }
    });
  }

  /**
   * Processes structure data and converts it to item format.
   * 
   * @param structures - Array of structure entities
   * @param structureItems - Array of structure items to populate
   */
  public processStructureData(structures: Structure[], structureItems: ItemWithSections[]): void {
    structures.forEach((structure) => {
      const size = structure.size;
      const section: Section = {
        area: structure.area,
        size: [size.XSize, size.YSize, size.ZSize],
        classType: structure.classType,
      };

      structureItems.push({
        item: {
          id: structure.id,
          sections: [section],
        },
      });
    });
  }

  /**
   * Processes concealed work diff data.
   * 
   * @param concealedWorkItems - Array to populate with concealed work items
   */
  private _processCWDiffData(concealedWorkItems: ConcealedWorkItem[]): void {
    const cwDiffData = this.dTPlugin?.getCWDiffData();
    if (cwDiffData?.diffItems && cwDiffData.diffItems.length !== 0) {
      cwDiffData.diffItems.forEach((diffItem) => {
        concealedWorkItems.push({
          item: diffItem,
        });
      });
    }
  }
}

// External module references (assumed to be imported from other modules)
declare const BedRoomList: string[];
declare const LivingRoomList: string[];
declare const BathRoomList: string[];
declare const Utils: { getArea(path: unknown): number };