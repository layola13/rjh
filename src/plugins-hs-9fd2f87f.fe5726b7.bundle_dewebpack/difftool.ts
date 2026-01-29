import { HSCore } from './HSCore';
import { FloorplanInfo } from './FloorplanInfo';
import { Line3d, Vector2, Line2d } from './geometry';
import { DiffCWNotTubeType } from './DiffCWNotTubeType';
import { DiffCW } from './DiffCW';
import { DiffCWRoute } from './DiffCWRoute';
import { DiffToolUtil } from './DiffToolUtil';

interface FloorPlan {
  scene: {
    activeLayer: unknown;
    rootLayer: unknown;
  };
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Entity {
  id: string;
  x: number;
  y: number;
  z: number;
  ZSize: number;
}

interface Route {
  type: string;
  srcId: string;
  destId: string;
  path: Line3d[];
  length: number;
  id?: string;
}

interface DiffItem {
  destId: string;
  route: Route;
}

interface DiffCWData {
  diffItems: DiffItem[];
  id?: string;
}

interface CWDiffContent {
  type: string;
  src: Entity;
  dest: Entity;
}

interface CWDiffResult {
  diffTube: CWDiffContent[];
  diffNotTube: CWDiffContent[];
}

interface OpeningInfo {
  isRemoveAdd?: boolean;
}

interface WallInfo {
  getNonOverlappedOutlines(): unknown[];
  getNonOverlappedData(): unknown[];
}

interface StructureInfo {
  isRemoveAdd: boolean;
}

export class DiffTool {
  private readonly _originFloorPlan: FloorPlan;
  private readonly _currentFloorPlan: FloorPlan;
  private readonly _originalFloorplanInfo: FloorplanInfo;
  private readonly _currentFloorplanInfo: FloorplanInfo;

  constructor(originFloorPlan: FloorPlan, currentFloorPlan: FloorPlan) {
    this._originFloorPlan = originFloorPlan;
    this._currentFloorPlan = currentFloorPlan;
    this._originalFloorplanInfo = new FloorplanInfo(this._originFloorPlan);
    this._currentFloorplanInfo = new FloorplanInfo(this._currentFloorPlan);
  }

  compute(): void {
    const activeLayer = this._currentFloorPlan.scene.activeLayer;
    const layerIndex = HSCore.Util.Layer.getLayerIndex(activeLayer);

    this._currentFloorplanInfo.computeWallDiff(this._originalFloorplanInfo, layerIndex);
    this._originalFloorplanInfo.computeWallDiff(this._currentFloorplanInfo, layerIndex);
    this._currentFloorplanInfo.computeOpeningDiff(this._originalFloorplanInfo, layerIndex);
    this._originalFloorplanInfo.computeOpeningDiff(this._currentFloorplanInfo, layerIndex);
    this._currentFloorplanInfo.computeStructureDiff(this._originalFloorplanInfo, layerIndex);
    this._originalFloorplanInfo.computeStructureDiff(this._currentFloorplanInfo, layerIndex);
  }

  isOriginalLayerExist(layerIndex: number): boolean {
    return this._originalFloorplanInfo.getLayerWallInfos(layerIndex).length > 0;
  }

  getCurrentLayerIndex(): number {
    const activeLayer = this._currentFloorPlan.scene.activeLayer;
    return HSCore.Util.Layer.getLayerIndex(activeLayer);
  }

  getRemovedWallOutlines(wallId: string): unknown[] {
    const wallInfo = this._originalFloorplanInfo.getWallInfoById(wallId);
    return wallInfo ? wallInfo.getNonOverlappedOutlines() : [];
  }

  getNewWallOutlines(wallId: string): unknown[] {
    const wallInfo = this._currentFloorplanInfo.getWallInfoById(wallId);
    return wallInfo ? wallInfo.getNonOverlappedOutlines() : [];
  }

  getNewWallOpeings(): OpeningInfo[] {
    return this._originalFloorplanInfo.getModifiedOpeningInfos();
  }

  getRemovedWallOpeings(): OpeningInfo[] {
    return this._currentFloorplanInfo.getModifiedOpeningInfos();
  }

  getRemovedWallData(wallId: string): unknown[] {
    const wallInfo = this._originalFloorplanInfo.getWallInfoById(wallId);
    return wallInfo ? wallInfo.getNonOverlappedData() : [];
  }

  getNewWallData(wallId: string): unknown[] {
    const wallInfo = this._currentFloorplanInfo.getWallInfoById(wallId);
    return wallInfo ? wallInfo.getNonOverlappedData() : [];
  }

  isRemovedContent(properties: unknown): boolean {
    let content = this._currentFloorplanInfo.findContentByProperties(properties);
    if (!content) {
      content = this._currentFloorplanInfo.findOpeningByProperties(properties);
    }
    return !content;
  }

  isNewContent(properties: unknown): boolean {
    let content = this._originalFloorplanInfo.findContentByProperties(properties);
    if (!content) {
      content = this._originalFloorplanInfo.findOpeningByProperties(properties);
    }
    return !content;
  }

  getNewStructures(): StructureInfo[] {
    const layerIndex = this.getCurrentLayerIndex();
    return this._currentFloorplanInfo.getLayerStructureInfos(layerIndex).filter(
      (structure) => structure.isRemoveAdd
    );
  }

  getRemoveStructures(): StructureInfo[] {
    const layerIndex = this.getCurrentLayerIndex();
    return this._originalFloorplanInfo.getLayerStructureInfos(layerIndex).filter(
      (structure) => structure.isRemoveAdd
    );
  }

  getDiffCWData(): DiffCWData | undefined {
    const rootLayer = this._currentFloorPlan.scene.rootLayer;
    const origFloorplan = this._originFloorPlan;
    const diffContents = this._getCWDiffContents(rootLayer);

    const params = {
      diffContents: diffContents.diffTube,
      origFloorplan
    };

    const cwPlugin = (HSApp.App.getApp() as any).pluginManager.getPlugin(
      (HSFPConstants as any).PluginType.ConcealedWorkV2
    );

    if (cwPlugin) {
      const cwDiffData = cwPlugin.getHelper().getCWDiffData(rootLayer, params);
      const notTubeData = this._getCWDiffDataNotTube(diffContents.diffNotTube);

      const result: DiffCWData = {
        diffItems: cwDiffData.diffItems.concat(notTubeData.diffItems)
      };

      if (result.diffItems.length > 0) {
        this._createDiffCWModel(rootLayer, result);
      }

      return result;
    }
  }

  private _getCWDiffDataNotTube(diffContents: CWDiffContent[]): DiffCWData {
    const diffItems: DiffItem[] = [];

    for (const content of diffContents) {
      const { type, src, dest } = content;

      const srcBaseHeight = HSCore.Util.Layer.getEntityBaseHeight(src);
      const destBaseHeight = HSCore.Util.Layer.getEntityBaseHeight(dest);

      const srcCenterZ = srcBaseHeight + src.z + src.ZSize / 2;
      const destCenterZ = destBaseHeight + dest.z + dest.ZSize / 2;

      const srcPoint: Point3D = {
        x: src.x,
        y: src.y,
        z: srcCenterZ > srcBaseHeight ? srcCenterZ : srcBaseHeight
      };

      const destPoint: Point3D = {
        x: dest.x,
        y: dest.y,
        z: destCenterZ > destBaseHeight ? destCenterZ : destBaseHeight
      };

      const line = new Line3d(srcPoint, destPoint);

      const diffItem: DiffItem = {
        destId: dest.id,
        route: {
          type,
          srcId: src.id,
          destId: dest.id,
          path: [line],
          length: line.getLength()
        }
      };

      diffItems.push(diffItem);
    }

    return { diffItems };
  }

  private _createDiffCWModel(layer: any, diffData: DiffCWData): void {
    const diffCW = new DiffCW();
    const routes: DiffCWRoute[] = [];

    diffData.diffItems.forEach((item) => {
      const route = new DiffCWRoute();
      route.setParams(item.route);
      routes.push(route);
      item.route.id = route.id;
    });

    diffCW.addDiffTubes(routes);
    diffData.id = diffCW.id;
    layer.addChild(diffCW);
  }

  private _getCWDiffContents(layer?: any): CWDiffResult {
    const targetLayer = layer || this._currentFloorPlan.scene.rootLayer;
    const originalContents = this._originalFloorplanInfo.getCWContents(targetLayer);
    const currentContents = this._currentFloorplanInfo.getCWContents(targetLayer);

    const diffTube: CWDiffContent[] = [];
    const diffNotTube: CWDiffContent[] = [];

    if (!originalContents || !currentContents) {
      return { diffTube, diffNotTube };
    }

    const processContentType = (
      contentType: string,
      srcContents: Entity[],
      destContents: Entity[]
    ): void => {
      for (const dest of destContents) {
        const rooms = HSCore.Util.Room.getRoomsContentIn(dest, targetLayer);
        if (rooms.length !== 1) continue;

        const room = rooms[0];
        const candidateSrcs = srcContents.filter((src) =>
          DiffToolUtil.isPointInRoom(src, room)
        );

        if (candidateSrcs.length === 0) continue;

        const destVector = new Vector2(dest);
        const exactMatches = candidateSrcs.filter((src) =>
          HSCore.Util.Math.isZero(destVector.distanceTo(src))
        );

        if (exactMatches.length > 0) continue;

        let minDistance = 0;
        let closestSrc: Entity | undefined;

        candidateSrcs.forEach((src) => {
          const distance = destVector.distanceTo(src);
          if (distance > 0 && (!closestSrc || distance < minDistance)) {
            closestSrc = src;
            minDistance = distance;
          }
        });

        if (!closestSrc) continue;

        switch (contentType) {
          case DiffCWNotTubeType.GassMeter:
          case DiffCWNotTubeType.WaterMeter:
          case DiffCWNotTubeType.BasinWallRow:
          case DiffCWNotTubeType.ToiletWallRow:
            if (DiffToolUtil.isContentsOnSameRoomOutline([closestSrc, dest], room)) {
              diffNotTube.push({ type: contentType, src: closestSrc, dest });
            }
            break;

          case DiffCWNotTubeType.FloorDrain:
          case DiffCWNotTubeType.ToiletFloorHole:
          case DiffCWNotTubeType.PlatformDrainage:
            if (!DiffToolUtil.isLine2dCrossStructure(new Line2d(closestSrc, dest), room)) {
              diffNotTube.push({ type: contentType, src: closestSrc, dest });
            }
            break;

          case HSCore.Model.CWColdWaterComp.Type:
          case HSCore.Model.CWHotWaterComp.Type:
          case HSCore.Model.CWStrongElecComp.Type:
          case HSCore.Model.CWWeakElecComp.Type:
            diffTube.push({ type: contentType, src: closestSrc, dest });
            break;
        }
      }
    };

    for (const contentTypeKey of Array.from(originalContents.keys())) {
      const originalTypeContents = originalContents.get(contentTypeKey);
      const currentTypeContents = currentContents.get(contentTypeKey);

      if (originalTypeContents && currentTypeContents) {
        for (const subTypeKey of Array.from(originalTypeContents.keys())) {
          const originalSubContents = originalTypeContents.get(subTypeKey);
          const currentSubContents = currentTypeContents.get(subTypeKey);

          if (
            originalSubContents &&
            currentSubContents &&
            originalSubContents.length > 0 &&
            currentSubContents.length > 0
          ) {
            processContentType(contentTypeKey, originalSubContents, currentSubContents);
          }
        }
      }
    }

    return { diffTube, diffNotTube };
  }

  private _getCWOriginContent(contentId: string, layer: any): Entity | undefined {
    const cwContents = this._originalFloorplanInfo.getCWContents(layer);

    for (const typeContents of cwContents.values()) {
      const subTypeContents = Array.from(typeContents.values());

      for (const contents of subTypeContents) {
        for (const content of contents) {
          if (content.id === contentId) {
            return content;
          }
        }
      }
    }

    return undefined;
  }
}