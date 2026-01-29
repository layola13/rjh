/**
 * Geometry size interface for 3D models
 */
interface GeometrySize {
  XSize: number;
  YSize: number;
  ZSize: number;
}

/**
 * Material information
 */
interface Material {
  seekId?: string;
  name?: string;
  paintData?: {
    mixpaint?: {
      data?: {
        paints?: Array<{
          material?: Material;
        }>;
      };
    };
  };
}

/**
 * Material list item
 */
interface MaterialListItem {
  partKey: string;
  seekId?: string;
  name?: string;
}

/**
 * Content dump data
 */
interface ContentDumpData {
  roomId?: string;
  XSize?: number;
  YSize?: number;
  ZSize?: number;
  materialList?: MaterialListItem[];
  seekId?: string;
  flip?: boolean;
  Class?: string;
}

/**
 * Room dump data
 */
interface RoomDumpData {
  id: string;
  roomType: string;
  roomTypeDisplayName?: string;
  area?: number;
}

/**
 * Light dump data
 */
interface LightDumpData {
  roomId?: string;
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Content info for export
 */
interface ContentInfo extends GeometrySize {
  seekId?: string;
  materialList: MaterialListItem[];
  flip?: boolean;
}

/**
 * Room detail info
 */
interface RoomDetailInfo {
  id: string;
  roomType: string;
  roomTypeDisplayName: string;
  area: number;
  seekIdList: string[];
  lightList: LightDumpData[];
  windowList: ContentDumpData[];
  contentList: ContentInfo[];
  materialList: string[];
}

/**
 * Design info export result
 */
interface DesignInfo {
  timeCreated: number;
  count: number;
  room: RoomDetailInfo[];
}

/**
 * Export info intermediate result
 */
interface ExportInfo {
  contentList: ContentDumpData[];
  lightList: LightDumpData[];
  roomList: Array<RoomDumpData & { area: number }>;
  roomIdMaterialMap: Record<string, string[]>;
}

/**
 * Model with materials map
 */
interface ModelWithMaterials {
  materialsMap: Map<string, Material>;
  XSize?: number;
  YSize?: number;
  ZSize?: number;
  Class?: string;
  children?: Record<string, { dump: () => [ContentDumpData | undefined] }>;
  dump: () => [ContentDumpData | undefined];
}

/**
 * Core export handler implementation
 */
class CoreExportHandler {
  private static readonly SEEK_ID_REGEX = /^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/;
  private static readonly GENERIC_MATERIAL_ID = "c53afd8f-6b30-4d1b-8454-0138ff5d7147";

  private static _getRoomArea(room: unknown): number {
    const app = (window as any).HSApp?.App?.getApp();
    if (!app?.geometryManager) return 0;

    const geometry = app.geometryManager.getGeometry(room);
    if (!geometry || geometry.length === 0) return 0;

    geometry.push(geometry[0]);
    const massProperties = (window as any).HSCore?.Util?.Geometry?.getMassProperties(geometry);
    return massProperties ? Math.abs(massProperties[0]) : 0;
  }

  private static _getSeekId(
    material: Material,
    seekIdMap: Record<string, boolean>,
    seekIdList: string[]
  ): void {
    if (material.seekId === undefined) return;

    if (material.paintData?.mixpaint?.data?.paints) {
      for (const paint of material.paintData.mixpaint.data.paints) {
        const paintMaterial = paint.material;
        if (paintMaterial?.seekId) {
          const seekIdUpper = paintMaterial.seekId.toUpperCase();
          if (this.SEEK_ID_REGEX.test(seekIdUpper) && !seekIdMap[paintMaterial.seekId]) {
            seekIdList.push(paintMaterial.seekId);
            seekIdMap[paintMaterial.seekId] = true;
          }
        }
      }
    } else if (material.seekId) {
      const seekIdUpper = material.seekId.toUpperCase();
      if (this.SEEK_ID_REGEX.test(seekIdUpper) && !seekIdMap[material.seekId]) {
        seekIdList.push(material.seekId);
        seekIdMap[material.seekId] = true;
      }
    }
  }

  static getExportInfo(): ExportInfo {
    const app = (window as any).HSApp?.App?.getApp();
    const contentList: ContentDumpData[] = [];
    const lightList: LightDumpData[] = [];
    const roomList: Array<RoomDumpData & { area: number }> = [];
    const HSCore = (window as any).HSCore;
    const HSConstants = (window as any).HSConstants;

    app.floorplan.forEachRoom((room: any) => {
      const roomData = room.dump()[0];
      if (roomData) {
        roomList.push({
          ...roomData,
          area: this._getRoomArea(room)
        });
      }
    });

    app.floorplan.forEachContent((content: ModelWithMaterials) => {
      const contentData = content.dump()[0];
      if (!contentData) return;

      const parentRoom = HSCore?.Util?.Room?.getRoomContentIn(content);
      if (parentRoom) {
        contentData.roomId = parentRoom.ID;
      }

      contentData.XSize = content.XSize;
      contentData.YSize = content.YSize;
      contentData.ZSize = content.ZSize;
      contentData.materialList = [];

      for (const [partKey, material] of content.materialsMap) {
        contentData.materialList.push({
          partKey,
          seekId: material.seekId,
          name: material.name
        });
      }

      contentList.push(contentData);

      if (content.Class === HSConstants?.ModelClass?.DAssembly && content.children) {
        Object.values(content.children).forEach(child => {
          const childData = child.dump()[0];
          if (childData) {
            childData.roomId = contentData.roomId;
            contentList.push(childData);
          }
        });
      }
    });

    app.floorplan.forEachOpening((opening: any) => {
      const openingData = opening.dump()[0];
      if (!openingData) return;

      const host = opening.getHost();
      if (host?.instanceOf(HSConstants?.ModelClass?.NgWall)) {
        const validCoEdge = host.getValidCoEdge ? host.getValidCoEdge() : host;
        const parentRoom = validCoEdge?.getParentRoom();
        if (parentRoom) {
          openingData.roomId = parentRoom.ID;
        }
      }

      contentList.push(openingData);
    });

    const roomIdMaterialMap: Record<string, string[]> = {};
    const lightgroups = app.floorplan.lightgroups;

    app.floorplan.scene.forEachLayer((layer: any) => {
      Object.keys(lightgroups).forEach(groupKey => {
        const group = lightgroups[groupKey];
        group?.members?.forEach((member: any) => {
          if (member.x !== undefined && member.y !== undefined && member.z !== undefined) {
            const lightData = member.dump()[0];
            if (lightData) {
              const parentRoom = HSCore?.Util?.Room?.getRoomContentIn(member);
              if (parentRoom) {
                lightData.roomId = parentRoom.ID;
              }
              lightList.push(lightData);
            }
          }
        });
      });

      const layerInfo = app.geometryManager.getLayerInfo(layer);

      layer.forEachFloor((floor: any) => {
        const seekIdMap: Record<string, boolean> = {};
        const materialList: string[] = [];
        const roomInfo = layerInfo.getFloorRoomInfo(floor);

        if (roomInfo?.ceilingFace?.material) {
          this._getSeekId(roomInfo.ceilingFace.material, seekIdMap, materialList);
        }

        if (roomInfo?.floor?.material) {
          this._getSeekId(roomInfo.floor.material, seekIdMap, materialList);
        }

        roomInfo?.wallFaces?.faces?.forEach((face: any) => {
          if (face?.material) {
            this._getSeekId(face.material, seekIdMap, materialList);
          }
        });

        layer.forEachContent((content: any) => {
          if (content instanceof HSCore?.Model?.CustomizedModel &&
              HSCore?.Util?.Room?.isEntityInRoom(content, floor)) {
            content.getMaterialData().forEach((material: Material) => {
              if (material?.seekId &&
                  material.seekId !== this.GENERIC_MATERIAL_ID &&
                  !seekIdMap[material.seekId]) {
                const seekIdUpper = material.seekId.toUpperCase();
                if (this.SEEK_ID_REGEX.test(seekIdUpper)) {
                  materialList.push(material.seekId);
                  seekIdMap[material.seekId] = true;
                }
              }
            });
          }
        });

        roomIdMaterialMap[floor.ID] = materialList;
      });
    });

    return { contentList, lightList, roomList, roomIdMaterialMap };
  }

  static getDesignInfo(includeDuplicateSeekIds = false): DesignInfo {
    const { contentList, lightList, roomList, roomIdMaterialMap } = this.getExportInfo();
    const HSConstants = (window as any).HSConstants;
    const HSCore = (window as any).HSCore;

    let windowClasses = [
      HSConstants?.ModelClass?.Window,
      HSConstants?.ModelClass?.CornerWindow,
      HSConstants?.ModelClass?.CornerFlatWindow,
      HSConstants?.ModelClass?.POrdinaryWindow,
      HSConstants?.ModelClass?.ParametricWindow,
      HSConstants?.ModelClass?.BayWindow
    ];

    if (HSCore?.Doc?.FloorplanMeta?.magic === "61cd47b78148") {
      windowClasses = [
        HSConstants?.ModelClass?.NgWindow,
        HSConstants?.ModelClass?.NgCornerWindow,
        HSConstants?.ModelClass?.NgCornerFlatWindow,
        HSConstants?.ModelClass?.NgPOrdinaryWindow,
        HSConstants?.ModelClass?.NgParametricWindow,
        HSConstants?.ModelClass?.NgBayWindow
      ];
    }

    return {
      timeCreated: Date.now(),
      count: roomList.length,
      room: roomList.map(roomData => {
        const seekIdList: string[] = [];
        const roomLightList: LightDumpData[] = [];
        const windowList: ContentDumpData[] = [];
        const roomContentList: ContentInfo[] = [];

        contentList.forEach(content => {
          if (content.roomId === roomData.id) {
            if (content.seekId) {
              seekIdList.push(content.seekId);
            }

            const contentInfo: ContentInfo = {
              XSize: content.XSize ?? 0,
              YSize: content.YSize ?? 0,
              ZSize: content.ZSize ?? 0,
              seekId: content.seekId,
              materialList: content.materialList || []
            };

            if (content.flip) {
              contentInfo.flip = content.flip;
            }

            roomContentList.push(contentInfo);

            if (windowClasses.includes(content.Class)) {
              windowList.push(content);
            }
          }
        });

        lightList.forEach(light => {
          if (light.roomId === roomData.id) {
            roomLightList.push(light);
          }
        });

        let finalSeekIdList = seekIdList;
        if (!includeDuplicateSeekIds) {
          const uniqueSeekIds = new Set(seekIdList);
          finalSeekIdList = Array.from(uniqueSeekIds);
        }

        return {
          id: roomData.id,
          roomType: roomData.roomType,
          roomTypeDisplayName: roomData.roomTypeDisplayName || "",
          area: roomData.area,
          seekIdList: finalSeekIdList,
          lightList: roomLightList,
          windowList,
          contentList: roomContentList,
          materialList: roomIdMaterialMap[roomData.id] || []
        };
      })
    };
  }
}

/**
 * Public API for exporting room detail information
 */
export class ExportHandler {
  /**
   * Export detailed room information including geometry, materials, and lighting
   * @param includeDuplicateSeekIds - Whether to include duplicate seekIds in the result
   * @returns Design information with room details
   */
  static exportRoomDetailInfo(includeDuplicateSeekIds = false): DesignInfo {
    return CoreExportHandler.getDesignInfo(includeDuplicateSeekIds);
  }
}

export type { GeometrySize as XSize, GeometrySize as YSize, GeometrySize as ZSize };