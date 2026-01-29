import { OpeningEntity } from './OpeningEntity';
import { Parameter, DataType } from './Parameter';
import { HSCore } from './HSCore';
import { Utils } from './Utils';
import { FaceEntity } from './FaceEntity';

interface Point {
  x: number;
  y: number;
}

interface ArcHoleData {
  arcLength: number;
  swing: string;
  baseWidth: string;
  baseHeight: string;
  area: string;
}

interface ContentInstance {
  baseProfile: {
    points: Point[];
  };
  XScale: number;
  ZScale: number;
  faceList: any[];
  contentType: {
    isTypeOf(type: string): boolean;
  };
  isDoorStoneMaterialEnabled(): boolean;
  getDoorStoneFace(): { id: string };
  getFaceType(face: any): string;
}

interface InstanceData {
  addParameter(parameter: Parameter): void;
  getParameterValue(key: string): any;
}

export class HoleEntity extends OpeningEntity {
  constructor() {
    super();
  }

  getInstanceData(content: ContentInstance): InstanceData {
    const instanceData = super.getInstanceData(content);

    if (HSCore.Util.Content.isWallOpening(content)) {
      if (content.isDoorStoneMaterialEnabled()) {
        instanceData.addParameter(
          new Parameter('stoneFaceId', content.getDoorStoneFace().id, DataType.String)
        );
      }

      if (content.baseProfile.points.length > 4) {
        instanceData.addParameter(
          new Parameter('arcHole', this.buildArcHoleData(content), DataType.Object)
        );
      }

      instanceData.addParameter(new Parameter('type', 'wallHole', DataType.String));
    } else if (HSCore.Util.Content.isSlabOpening(content)) {
      const size = instanceData.getParameterValue('size');
      instanceData.addParameter(
        new Parameter('area', Utils.formatNumberPoints(size[0] * size[1]))
      );
      instanceData.addParameter(new Parameter('type', 'slabHole', DataType.String));

      let subType = '';
      if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabNiche)) {
        subType = 'slabNiche';
      } else if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabOpening)) {
        subType = 'slabOpening';
      }
      instanceData.addParameter(new Parameter('subType', subType, DataType.String));
    }

    return instanceData;
  }

  buildChildren(content: ContentInstance): void {
    if (HSCore.Util.Content.isWallOpening(content) || HSCore.Util.Content.isSlabOpening(content)) {
      content.faceList.forEach((face) => {
        const faceEntity = new FaceEntity(this.roomId).accept(face);
        faceEntity.instance.addParameter(
          new Parameter('type', content.getFaceType(face), DataType.String)
        );
        this.addChild(faceEntity);
      });
    } else {
      super.buildChildren(content);
    }
  }

  buildArcHoleData(content: ContentInstance): ArcHoleData {
    const scaledPoints: Point[] = content.baseProfile.points.map((point) => ({
      x: point.x * content.XScale,
      y: point.y * content.ZScale,
    }));

    const basePoints = scaledPoints.slice(0, 4);
    const arcPoints = scaledPoints.slice(4, scaledPoints.length);
    arcPoints.push(arcPoints[0]);

    const totalArea = HSCore.Util.Collision.getPolygonArea(scaledPoints);
    const arcLength = Utils.getPathLength(arcPoints);
    const baseWidth = Math.abs(basePoints[0].x - basePoints[3].x);
    const baseHeight = Math.abs(basePoints[0].y - basePoints[1].y);

    let swing = 0;
    for (let i = 0; i < arcPoints.length; i++) {
      if (arcPoints[i].x === 0) {
        swing = arcPoints[i].y - basePoints[0].y;
        break;
      }
    }

    return {
      arcLength,
      swing: Utils.formatNumberPoints(swing),
      baseWidth: Utils.formatNumberPoints(baseWidth),
      baseHeight: Utils.formatNumberPoints(baseHeight),
      area: Utils.formatNumberPoints(totalArea),
    };
  }
}