import { InstanceData, Parameter, DataType } from './321465';
import { HSCore } from './635589';
import { AcceptEntity } from './306931';
import { Utils } from './919367';

export class FaceEntity extends AcceptEntity {
  roomId: string;

  constructor(roomId?: string) {
    super();
    this.roomId = roomId || '';
  }

  buildChildren(): void {
    // Empty implementation
  }

  buildEntityData(entity: any): void {
    this.setInstanceData(this.getInstanceData(entity));
    this.setType({
      classType: entity.Class
    });
  }

  getInstanceData(entity: any): InstanceData {
    const instanceData = new InstanceData(entity.id);
    const faceType = HSCore.Util.Face.getFaceType(entity);
    const boundingSize = HSCore.Paint.PaintsUtil.getPaintBoundingSize(entity, faceType);
    const formattedSize = Utils.formatNumberPoints([boundingSize.width, boundingSize.height]);
    
    instanceData.addParameter(
      new Parameter('size', formattedSize, DataType.ArrayPoint2D)
    );

    const fullAreaRaw = HSCore.Util.TgWall.getArea(entity.realPath2d);
    const obstacleAreas = Utils.getObstaclePath(entity, true, true).map((path: any) => 
      Utils.getArea(path)
    );
    const totalObstacleArea = obstacleAreas.length > 0 
      ? obstacleAreas.reduce((sum: number, area: number) => sum + area, 0) 
      : 0;

    const openingPaths = Utils.getOpeningPath(entity, true);
    let totalHoleArea = 0;
    const openHoleInfos = openingPaths.map((opening: any) => {
      const area = Utils.getArea(opening.path);
      totalHoleArea += area;
      return {
        id: opening.id,
        type: opening.type,
        area
      };
    });

    let areaData = {
      fullArea: fullAreaRaw + totalHoleArea,
      holeArea: openHoleInfos.map((info: any) => info.area),
      obstacleArea: obstacleAreas,
      validArea: fullAreaRaw - totalObstacleArea,
      openHoleInfos
    };

    const customizedProjectionAreas: number[] = [];

    if (entity instanceof HSCore.Model.Ceiling) {
      const layer = HSCore.Util.Layer.getEntityLayer(entity);
      if (layer) {
        layer.forEachContent((content: any) => {
          if (content instanceof HSCore.Model.CustomizedCeilingModel || 
              content instanceof HSCore.Model.CustomizedModel) {
            const host = content.getHost() || { id: '' };
            if (host.id === entity.id) {
              customizedProjectionAreas.push(Utils.getTotalProjectionArea(content));
            }
          }
        });
      }
    } else if (entity instanceof HSCore.Model.Face && 
               entity.getMaster() instanceof HSCore.Model.Wall) {
      Object.values(entity.contents).forEach((content: any) => {
        if (content instanceof HSCore.Model.CustomizedBackgroundWall || 
            content instanceof HSCore.Model.CustomizedModel) {
          const host = content.host;
          const master = entity.getMaster();
          if (host instanceof HSCore.Model.Face) {
            const hostFace = HSCore.Util.Face.getHostFaceFromWall(master, content);
            if (hostFace?.id === entity.id) {
              customizedProjectionAreas.push(Utils.getTotalProjectionArea(content));
            }
          }
        }
      });
    }

    if (customizedProjectionAreas.length > 0) {
      const totalProjectionArea = customizedProjectionAreas.reduce((sum, area) => sum + area, 0);
      const currentObstacleTotal = areaData.obstacleArea.length > 0 
        ? areaData.obstacleArea.reduce((sum: number, area: number) => sum + area, 0) 
        : 0;

      if (totalProjectionArea + currentObstacleTotal > areaData.fullArea) {
        const newValidArea = areaData.fullArea - totalProjectionArea;
        areaData.obstacleArea = customizedProjectionAreas;
        areaData.validArea = newValidArea > 0 ? newValidArea : 0;
      } else {
        const newValidArea = areaData.fullArea - (totalProjectionArea + currentObstacleTotal);
        areaData.obstacleArea = [...customizedProjectionAreas, ...areaData.obstacleArea];
        areaData.validArea = newValidArea > 0 ? newValidArea : 0;
      }
    }

    const twoDimensionData: any = {};
    if (entity.material.mixpaint) {
      twoDimensionData.paveId = Utils.isFaceGroupIndependentOutput() 
        ? `${entity.id}, ${entity.material.mixpaint.id}` 
        : entity.material.mixpaint.id;
    } else if (entity.material.seekId !== 'local' && entity.material.seekId !== 'generated') {
      twoDimensionData.material = Utils.getCategoryData(entity.material);
    }

    const openings = this.calcWallFaceOpens(entity);
    const firstRoomInfo = entity.roomInfos[0];
    let finalRoomId = this.roomId;
    if (!finalRoomId && firstRoomInfo?.floors?.[0]) {
      finalRoomId = firstRoomInfo.floors[0].id;
    }

    const master = entity.getMaster();
    const parentId = master ? master.id : '';

    const formattedAreaData = {
      ...areaData,
      fullArea: Utils.formatNumberPoints(areaData.fullArea),
      holeArea: Utils.formatNumberPoints(areaData.holeArea),
      obstacleArea: Utils.formatNumberPoints(areaData.obstacleArea),
      validArea: Utils.formatNumberPoints(areaData.validArea)
    };

    instanceData.addParameter(
      new Parameter('area', formattedAreaData, DataType.Object),
      new Parameter('openHoleInfos', openingPaths, DataType.Object),
      new Parameter('2D', twoDimensionData, DataType.Object),
      new Parameter('roomId', finalRoomId, DataType.String),
      new Parameter('parentId', parentId, DataType.String),
      new Parameter('openings', openings, DataType.StringArray)
    );

    return instanceData;
  }

  calcWallFaceOpens(entity: any): string[] {
    const openingIds: string[] = [];
    const allOpenings = [...entity.openings, ...entity.parametricOpenings];

    for (const opening of allOpenings) {
      if (opening instanceof HSCore.Model.Parametrization.WindowHole) {
        if (opening.parent) {
          openingIds.push(opening.parent.id);
        }
      } else {
        openingIds.push(opening.id);
      }
    }

    return openingIds;
  }
}