import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { DiffToolUtil } from './DiffToolUtil';
import { WallInfo } from './WallInfo';
import { WallOpeningInfo } from './WallOpeningInfo';
import { StructureInfo } from './StructureInfo';
import { DiffShareWallRegionInfo } from './DiffShareWallRegionInfo';
import { DiffCWNotTubeType } from './DiffCWNotTubeType';

type Layer = HSCore.Model.Layer;
type Wall = HSCore.Model.Wall;
type Content = HSCore.Model.Content;
type Opening = HSCore.Model.Opening;
type ParametricOpening = HSCore.Model.ParametricOpening;
type Structure = HSCore.Model.Structure;
type Floorplan = HSCore.Model.Floorplan;

class LayerInfo {
  layerIndex: number | undefined = undefined;
  wallInfos: WallInfo[] = [];
  wallOpeningInfos: WallOpeningInfo[] = [];
  structureInfos: StructureInfo[] = [];
}

export class FloorplanInfo {
  private readonly _floorplan: Floorplan;
  private readonly _layerInfoArr: LayerInfo[] = [];
  private _modifiedWallOpenings: WallOpeningInfo[] = [];
  private readonly _diffShareWallRegion: Map<string, DiffShareWallRegionInfo> = new Map();
  private readonly _allOpeningAndParametricOpeningsArr: Array<Opening | ParametricOpening> = [];
  private readonly _cwContents: Map<string, Map<string, Map<string, Content[]>>> = new Map();

  constructor(floorplan: Floorplan) {
    this._floorplan = floorplan;
    this.initialize();
  }

  private initialize(): void {
    let layer: Layer | null = DiffToolUtil.getBottomLayer(this._floorplan);
    
    while (layer) {
      const layerInfo = new LayerInfo();
      this._layerInfoArr.push(layerInfo);
      layerInfo.layerIndex = HSCore.Util.Layer.getLayerIndex(layer);

      const wallInfos = this.parseLayer(layer);
      layerInfo.wallInfos = wallInfos;

      const wallOpeningInfos = this.parseLayerOpenings(layer);
      layerInfo.wallOpeningInfos = wallOpeningInfos;

      const structureInfos = this.parseLayerStructures(layer);
      layerInfo.structureInfos = structureInfos;

      this._parseCWDiffConents(layer);
      
      layer = layer.next;
    }
  }

  private parseLayerStructures(layer: Layer): StructureInfo[] {
    const structureInfos: StructureInfo[] = [];
    
    layer.forEachStructure((structure: Structure) => {
      if (structure.isContentValid()) {
        const structureInfo = new StructureInfo(structure);
        structureInfos.push(structureInfo);
      }
    });
    
    return structureInfos;
  }

  private parseLayerOpenings(layer: Layer): WallOpeningInfo[] {
    const openingInfos: WallOpeningInfo[] = [];

    Object.values(layer.openings).forEach((opening: Opening) => {
      if (opening.isContentValid()) {
        const openingInfo = new WallOpeningInfo(opening, this);
        openingInfos.push(openingInfo);
        this._allOpeningAndParametricOpeningsArr.push(opening);
      }
    });

    Object.values(layer.parametricOpenings).forEach((parametricOpening: ParametricOpening) => {
      if (parametricOpening.isContentValid()) {
        const openingInfo = new WallOpeningInfo(parametricOpening, this);
        openingInfos.push(openingInfo);
        this._allOpeningAndParametricOpeningsArr.push(parametricOpening);
      }
    });

    return openingInfos;
  }

  private parseLayer(layer: Layer): WallInfo[] {
    const wallInfos: WallInfo[] = [];
    
    layer.forEachWall((wall: Wall) => {
      const wallInfo = new WallInfo(wall, layer, this);
      wallInfos.push(wallInfo);
    }, this);
    
    return wallInfos;
  }

  getLayerWallInfos(layerIndex: number): WallInfo[] {
    for (const layerInfo of this._layerInfoArr) {
      if (layerInfo.layerIndex === layerIndex) {
        return layerInfo.wallInfos;
      }
    }
    return [];
  }

  computeWallDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void {
    const currentWallInfos = this.getLayerWallInfos(layerIndex);
    
    if (!currentWallInfos) {
      return;
    }

    const otherWallInfos = otherFloorplanInfo.getLayerWallInfos(layerIndex);
    
    if (!otherWallInfos) {
      return;
    }

    otherWallInfos.forEach((otherWallInfo: WallInfo) => {
      currentWallInfos.forEach((currentWallInfo: WallInfo) => {
        if (otherWallInfo.propertyEquals(currentWallInfo)) {
          otherWallInfo.addOverlapInfo(currentWallInfo);
        }
      });
    });

    otherWallInfos.forEach((wallInfo: WallInfo) => {
      wallInfo.preCalcWallRegionInfo();
    });

    otherFloorplanInfo._diffShareWallRegion.forEach((regionInfo: DiffShareWallRegionInfo) => {
      regionInfo.sortDiffInfo();
    });
  }

  computeStructureDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void {
    const currentStructureInfos = this.getLayerStructureInfos(layerIndex);
    
    if (!currentStructureInfos) {
      return;
    }

    const otherStructureInfos = otherFloorplanInfo.getLayerStructureInfos(layerIndex);
    
    if (!otherStructureInfos) {
      return;
    }

    for (const otherStructureInfo of otherStructureInfos) {
      for (const currentStructureInfo of currentStructureInfos) {
        if (otherStructureInfo.id === currentStructureInfo.id && 
            DiffToolUtil.propertyEqual(otherStructureInfo.entity, currentStructureInfo.entity)) {
          otherStructureInfo.changeRemoveAddStatus(false);
          break;
        }
      }
    }
  }

  getLayerStructureInfos(layerIndex: number): StructureInfo[] {
    for (const layerInfo of this._layerInfoArr) {
      if (layerInfo.layerIndex === layerIndex) {
        return layerInfo.structureInfos;
      }
    }
    return [];
  }

  getWallInfoById(wallId: string): WallInfo | undefined {
    for (const layerInfo of this._layerInfoArr) {
      for (const wallInfo of layerInfo.wallInfos) {
        if (wallInfo.getId() === wallId) {
          return wallInfo;
        }
      }
    }
    return undefined;
  }

  getOpeningPathById(openingId: string): Opening[] {
    for (const layerInfo of this._layerInfoArr) {
      for (const openingInfo of layerInfo.wallOpeningInfos) {
        if (openingInfo.getId() === openingId) {
          return openingInfo.originOpenings;
        }
      }
    }
    return [];
  }

  addShareWallRegionInfo(wall: Wall, diffInfo: unknown, regionInfo: unknown): void {
    if (!this._diffShareWallRegion.has(wall.id)) {
      this._diffShareWallRegion.set(wall.id, new DiffShareWallRegionInfo(wall));
    }
    this._diffShareWallRegion.get(wall.id)!.addDiffInfo(diffInfo, regionInfo);
  }

  isWallRegionBelong(wall: Wall, wallId: string): boolean {
    const regionInfo = this._diffShareWallRegion.get(wall.id);
    
    if (!regionInfo) {
      return false;
    }

    const firstWallInfo = regionInfo.getFirstWallInfo();
    return !!firstWallInfo && firstWallInfo.wallId === wallId;
  }

  isSameShareWall(wall1: Wall, wall2: Wall): boolean {
    if (wall1.linkWallIds.length !== wall2.linkWallIds.length) {
      return false;
    }

    for (const linkWallId of wall1.linkWallIds) {
      if (!wall2.linkWallIds.includes(linkWallId)) {
        return false;
      }
    }

    return true;
  }

  computeOpeningDiff(otherFloorplanInfo: FloorplanInfo, layerIndex: number): void {
    const currentOpeningInfos = this.getWallOpeningInfos(layerIndex);
    const otherOpeningInfos = otherFloorplanInfo.getWallOpeningInfos(layerIndex);

    currentOpeningInfos.forEach((currentOpeningInfo: WallOpeningInfo) => {
      if (this.isHostWallSegmentModified(currentOpeningInfo.content)) {
        return;
      }

      for (let i = 0; i < otherOpeningInfos.length; i++) {
        const otherOpeningInfo = otherOpeningInfos[i];
        
        if (currentOpeningInfo.propertyEquals(otherOpeningInfo.content)) {
          currentOpeningInfo.openings = [];
          break;
        }
        
        currentOpeningInfo.addOverlapInfo(otherOpeningInfo);
      }
    });

    this._modifiedWallOpenings = [];
    
    currentOpeningInfos.forEach((openingInfo: WallOpeningInfo) => {
      if (openingInfo?.openings?.length > 0) {
        openingInfo.computeOutline();
        this._modifiedWallOpenings.push(openingInfo);
      }
    });
  }

  getWallOpeningInfos(layerIndex: number): WallOpeningInfo[] {
    for (const layerInfo of this._layerInfoArr) {
      if (layerInfo.layerIndex === layerIndex) {
        return layerInfo.wallOpeningInfos;
      }
    }
    return [];
  }

  private isHostWallSegmentModified(content: Content): boolean {
    const host = content.getHost();
    
    if (host && host instanceof HSCore.Model.Wall) {
      const wallInfo = this.getWallInfoById(host.id);
      if (wallInfo) {
        return wallInfo.isSegmentModified(content);
      }
    }
    
    return false;
  }

  getModifiedOpeningInfos(): WallOpeningInfo[] {
    return this._modifiedWallOpenings;
  }

  findContentByProperties(content: Content): Content | undefined {
    let foundContent: Content | undefined;
    
    this._floorplan.forEachContent((currentContent: Content) => {
      if (DiffToolUtil.propertyEqual(content, currentContent)) {
        foundContent = currentContent;
      }
    });
    
    return foundContent;
  }

  findOpeningByProperties(opening: Opening | ParametricOpening): Opening | ParametricOpening | undefined {
    let foundOpening: Opening | ParametricOpening | undefined;
    
    this._allOpeningAndParametricOpeningsArr.forEach((currentOpening: Opening | ParametricOpening) => {
      if (DiffToolUtil.propertyEqual(opening, currentOpening)) {
        foundOpening = currentOpening;
      }
    });
    
    return foundOpening;
  }

  private _parseCWDiffConents(layer: Layer): void {
    const contentTypeMap = new Map<string, Map<string, Content[]>>();

    const addContent = (content: Content, contentType: string, cwType: string): void => {
      const typeMap = contentTypeMap.get(cwType) ?? new Map<string, Content[]>();
      const contents = typeMap.get(contentType) ?? [];
      contents.push(content);
      typeMap.set(contentType, contents);
      contentTypeMap.set(cwType, typeMap);
    };

    layer.forEachContent((content: Content) => {
      switch (true) {
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.DistributionBox):
          addContent(content, HSCatalog.ContentTypeEnum.DistributionBox, HSCore.Model.CWStrongElecComp.Type);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WeakBox):
          addContent(content, HSCatalog.ContentTypeEnum.WeakBox, HSCore.Model.CWWeakElecComp.Type);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.GassMeter):
          addContent(content, HSCatalog.ContentTypeEnum.GassMeter, DiffCWNotTubeType.GassMeter);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WaterMeter):
          addContent(content, HSCatalog.ContentTypeEnum.WaterMeter, DiffCWNotTubeType.WaterMeter);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ColdWater):
          addContent(content, HSCatalog.ContentTypeEnum.ColdWater, HSCore.Model.CWColdWaterComp.Type);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.HotWater):
          addContent(content, HSCatalog.ContentTypeEnum.HotWater, HSCore.Model.CWHotWaterComp.Type);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ColdHotWater):
          addContent(content, HSCatalog.ContentTypeEnum.ColdHotWater, HSCore.Model.CWColdWaterComp.Type);
          addContent(content, HSCatalog.ContentTypeEnum.ColdHotWater, HSCore.Model.CWHotWaterComp.Type);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FloorDrain):
          addContent(content, HSCatalog.ContentTypeEnum.FloorDrain, DiffCWNotTubeType.FloorDrain);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.NewToiletHole):
          addContent(content, HSCatalog.ContentTypeEnum.NewToiletHole, DiffCWNotTubeType.ToiletFloorHole);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ToiletWallRow):
          addContent(content, HSCatalog.ContentTypeEnum.ToiletWallRow, DiffCWNotTubeType.ToiletWallRow);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.PlatformDrainage):
          addContent(content, HSCatalog.ContentTypeEnum.PlatformDrainage, DiffCWNotTubeType.PlatformDrainage);
          break;
        case content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BasinWallRow):
          addContent(content, HSCatalog.ContentTypeEnum.BasinWallRow, DiffCWNotTubeType.BasinWallRow);
          break;
      }
    });

    this._cwContents.set(layer.id, contentTypeMap);
  }

  getCWContents(layer: Layer): Map<string, Map<string, Content[]>> | undefined {
    return this._cwContents.get(layer.id);
  }
}