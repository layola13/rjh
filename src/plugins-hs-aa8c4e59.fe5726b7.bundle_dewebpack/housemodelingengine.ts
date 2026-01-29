import { HSCore } from './HSCore';
import { Utils } from './Utils';
import { BedRoomList, LivingRoomList, BathRoomList } from './RoomConstants';

interface Vec2 {
  x: number;
  y: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface DesignMetadata {
  get(key: string): string | number;
}

interface Room {
  roomInfos: unknown[];
  roomType: string;
  rawPath2d: Vec2[];
}

interface Floorplan {
  forEachRoom(callback: (room: Room) => void): void;
  forEachWall(callback: (wall: Wall) => void): void;
}

interface App {
  designMetadata: DesignMetadata;
  floorplan: Floorplan;
  pluginManager: PluginManager;
}

interface PluginManager {
  getPlugin(pluginType: string): DiffToolPlugin | null;
}

interface DiffToolPlugin {
  getOriginalFloorplan(): Floorplan | null;
  getBomRemovedWallData(wallId: string): WallData[] | null;
  getBomNewWallData(wallId: string): WallData[] | null;
  getNewWallOpeings(): OpeningData[];
  getRemovedWallOpeings(): OpeningData[];
  getAllNewStructures(): Structure[];
  getAllRemoveStructures(): Structure[];
  getCWDiffData(): ConcealedWorkDiffData | null;
  preloadOriginalFloorplan(): Promise<void>;
}

interface WallData {
  center: Vec2;
  rotation: number;
  width: number;
  height: number;
  openingArea: number;
}

interface Wall {
  id: string;
  from: Vec2;
  to: Vec2;
  height3d: number;
}

interface OpeningSegment {
  from: Vec2;
  to: Vec2;
  width: number;
  zFrom: Vec3;
  zTo: Vec3;
  direction?: string;
}

interface OpeningContent {
  id: string;
  contentType: {
    _types: string;
  };
  getHost(): { id: string };
}

interface OpeningData {
  content: OpeningContent;
  openings: OpeningSegment[];
}

interface Structure {
  id: string;
  size: {
    XSize: number;
    YSize: number;
    ZSize: number;
  };
  area: number;
  classType: string;
}

interface ConcealedWorkDiffData {
  diffItems: ConcealedWorkItem[];
}

interface ConcealedWorkItem {
  [key: string]: unknown;
}

interface Section {
  center?: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  area: number;
  direction?: string;
  openingId?: string;
  openingContentType?: string;
  classType?: string;
}

interface ItemWithSections {
  item: {
    id: string;
    sections: Section[];
  };
}

interface HouseModelingData {
  removed: {
    walls: ItemWithSections[];
    slabs: ItemWithSections[];
    structures: ItemWithSections[];
  };
  new: {
    walls: ItemWithSections[];
    slabs: ItemWithSections[];
    structures: ItemWithSections[];
    concealedWork: { item: ConcealedWorkItem }[];
  };
}

interface DesignInfo {
  designId: string | number;
  designName: string | number;
  versionId: string | number;
  designArea: number;
  bedroom: number;
  livingroom: number;
  bathroom: number;
}

interface CombinerResult {
  status: {
    code: number;
    message: string;
  };
  data: {
    designInfo: DesignInfo;
    houseModeling: HouseModelingData;
  };
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    DiffTool: string;
  };
};

const DEGREES_TO_RADIANS = Math.PI / 180;

export function combinerHouseModeling(houseModeling: HouseModelingData): CombinerResult {
  const app = HSApp.App.getApp();
  const metadata = app.designMetadata;
  
  const designInfo: DesignInfo = {
    designId: metadata.get('designId'),
    designName: metadata.get('designName'),
    versionId: metadata.get('designVersion'),
    designArea: 0,
    bedroom: 0,
    livingroom: 0,
    bathroom: 0
  };

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
      message: 'OK'
    },
    data: {
      designInfo,
      houseModeling
    }
  };
}

export class HouseModelingEngine {
  private _dTPlugin?: DiffToolPlugin;

  get dTPlugin(): DiffToolPlugin | null {
    if (!this._dTPlugin) {
      this._dTPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.DiffTool) ?? undefined;
    }
    return this._dTPlugin ?? null;
  }

  async process(): Promise<CombinerResult> {
    await this._preProcess();
    return combinerHouseModeling(this._getHouseModeling());
  }

  private _getHouseModeling(): HouseModelingData {
    const result: HouseModelingData = {
      removed: {
        walls: [],
        slabs: [],
        structures: []
      },
      new: {
        walls: [],
        slabs: [],
        structures: [],
        concealedWork: []
      }
    };

    if (!this.dTPlugin) {
      return result;
    }

    const originalFloorplan = this.dTPlugin.getOriginalFloorplan();
    const currentFloorplan = HSApp.App.getApp().floorplan;

    if (!originalFloorplan || !currentFloorplan) {
      return result;
    }

    originalFloorplan.forEachWall((wall: Wall) => {
      const wallData = this.dTPlugin!.getBomRemovedWallData(wall.id);
      if (wallData && wallData.length !== 0) {
        const wallLength = HSCore.Util.Math.Vec2.distance(wall.from, wall.to);
        result.removed.walls.push({
          item: {
            id: wall.id,
            sections: this._asSectionByWallData(wallData, wall.height3d, wallLength)
          }
        });
      }
    });

    currentFloorplan.forEachWall((wall: Wall) => {
      const wallData = this.dTPlugin!.getBomNewWallData(wall.id);
      if (wallData && wallData.length !== 0) {
        const wallLength = HSCore.Util.Math.Vec2.distance(wall.from, wall.to);
        result.new.walls.push({
          item: {
            id: wall.id,
            sections: this._asSectionByWallData(wallData, wall.height3d, wallLength)
          }
        });
      }
    });

    const newOpenings = this.dTPlugin.getNewWallOpeings();
    const removedOpenings = this.dTPlugin.getRemovedWallOpeings();
    this.processOpeningData(newOpenings, result.new.walls);
    this.processOpeningData(removedOpenings, result.removed.walls);

    const newStructures = this.dTPlugin.getAllNewStructures();
    const removedStructures = this.dTPlugin.getAllRemoveStructures();
    this.processStructureData(newStructures, result.new.structures);
    this.processStructureData(removedStructures, result.removed.structures);

    this._processCWDiffData(result.new.concealedWork);

    return result;
  }

  private _preProcess(): Promise<void> {
    return this.dTPlugin!.preloadOriginalFloorplan();
  }

  private _asSectionByWallData(wallData: WallData[], height: number, totalLength: number): Section[] {
    return wallData.map((data: WallData) => {
      const section: Section = {
        center: [data.center.x, data.center.y, 0],
        rotation: [0, 0, data.rotation * DEGREES_TO_RADIANS],
        size: [data.width, data.height, height],
        area: data.width * height - data.openingArea
      };

      if (!HSCore.Util.Math.nearlyEquals(data.width, totalLength)) {
        section.direction = 'h';
      }

      return section;
    });
  }

  private _asSectionByOpeningData(openingData: OpeningData): Section[] {
    return openingData.openings.map((opening: OpeningSegment) => {
      const openingLength = HSCore.Util.Math.getDistance(opening.from, opening.to);
      const openingWidth = opening.width;
      const openingHeight = Math.abs(opening.zFrom.y - opening.zTo.y);

      const section: Section = {
        size: [openingLength, openingWidth, openingHeight],
        area: openingLength * openingHeight,
        openingId: openingData.content.id,
        openingContentType: openingData.content.contentType._types
      };

      if (opening.direction) {
        section.direction = opening.direction;
      }

      return section;
    });
  }

  processOpeningData(openings: OpeningData[], walls: ItemWithSections[]): void {
    openings.forEach((opening: OpeningData) => {
      const hostWallId = opening.content.getHost().id;
      let found = false;

      for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (wall.item.id === hostWallId) {
          const openingSections = this._asSectionByOpeningData(opening);
          wall.item.sections = [...wall.item.sections, ...openingSections];
          found = true;
          break;
        }
      }

      if (!found) {
        walls.push({
          item: {
            id: hostWallId,
            sections: this._asSectionByOpeningData(opening)
          }
        });
      }
    });
  }

  processStructureData(structures: Structure[], targetList: ItemWithSections[]): void {
    structures.forEach((structure: Structure) => {
      const size = structure.size;
      const section: Section = {
        area: structure.area,
        size: [size.XSize, size.YSize, size.ZSize],
        classType: structure.classType
      };

      targetList.push({
        item: {
          id: structure.id,
          sections: [section]
        }
      });
    });
  }

  private _processCWDiffData(concealedWorkList: { item: ConcealedWorkItem }[]): void {
    const diffData = this.dTPlugin!.getCWDiffData();
    if (diffData?.diffItems && diffData.diffItems.length !== 0) {
      diffData.diffItems.forEach((item: ConcealedWorkItem) => {
        concealedWorkList.push({ item });
      });
    }
  }
}