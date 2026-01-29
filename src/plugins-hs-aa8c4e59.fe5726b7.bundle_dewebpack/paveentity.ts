import { HSPaveSDK, HSCore } from './sdk-types';
import { InstanceData, Parameter, DataType } from './instance-data';
import { AcceptEntity } from './accept-entity';
import { Utils } from './utils';
import { RegionEntity } from './region-entity';
import { ClipperService } from './clipper-service';

interface MixPave {
  independentRegions: Region[];
  regions: Region[];
  getBackgroundPath(): any;
}

interface Region {
  path: any;
}

interface MixPaint {
  id: string;
  Class: string;
  mixPave: MixPave;
  faceGroup: FaceGroup;
}

interface FaceGroup {
  getFaceIds(): string[];
  transformMap: Record<string, any>;
}

interface BuildChildrenContext {
  mixPaint: MixPaint;
  outline?: any;
  faceType?: string;
  srcEntity?: any;
  faceOwnerId?: string;
}

export class PaveEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(context: BuildChildrenContext, options: any): void {
    const { mixPaint } = context;
    let outline = this._getOutline(context);

    if (context.outline && Utils.isFaceGroupIndependentOutput()) {
      outline = outline
        ? HSPaveSDK.ClipperService.ins.clip(
            context.outline,
            outline,
            HSPaveSDK.ClipMode.Inter
          )
        : context.outline;
    }

    const faceIds = this.getParameterValue('faceIds');
    const regionPaths: any[] = [];

    mixPaint.mixPave.independentRegions.forEach((region: Region) => {
      this.addChild(
        new RegionEntity().accept(
          {
            region,
            outline,
            mixPave: mixPaint.mixPave,
            faceIds
          },
          options
        )
      );
      regionPaths.push(region.path);
    });

    outline =
      outline &&
      HSPaveSDK.ClipperService.ins.clip(
        outline,
        regionPaths,
        HSPaveSDK.ClipMode.Diff
      );

    mixPaint.mixPave.regions.forEach((region: Region) => {
      this.addChild(
        new RegionEntity().accept(
          {
            region,
            outline,
            mixPave: mixPaint.mixPave,
            faceIds
          },
          options
        )
      );
    });
  }

  buildEntityData(context: BuildChildrenContext, options: any): void {
    this.setInstanceData(this.getInstanceData(context));
    this.setType({
      classType: context.mixPaint.Class
    });
  }

  getInstanceData(context: BuildChildrenContext): InstanceData {
    const { mixPaint } = context;
    const isFaceGroupIndependent = Utils.isFaceGroupIndependentOutput();
    const instanceId = isFaceGroupIndependent
      ? `${context.faceType}, ${mixPaint.id}`
      : mixPaint.id;

    const instanceData = new InstanceData(instanceId);
    const faceIds = isFaceGroupIndependent
      ? []
      : mixPaint.faceGroup.getFaceIds().sort();
    const parentId = isFaceGroupIndependent
      ? context.faceType
      : context.srcEntity?.id;
    const faceIdList = faceIds.length === 0 ? [parentId] : faceIds;

    instanceData.addParameter(
      new Parameter('faceIds', faceIdList, DataType.StringArray),
      new Parameter('faceGroupId', faceIds.join('-'), DataType.String),
      new Parameter('parentId', parentId, DataType.String)
    );

    if (context.faceOwnerId) {
      instanceData.addParameter(
        new Parameter('faceOwnerId', context.faceOwnerId, DataType.String)
      );
    }

    return instanceData;
  }

  private _getOutline(context: BuildChildrenContext): any {
    const { mixPaint } = context;
    let outline: any;

    if (context.srcEntity instanceof HSCore.Model.Face) {
      const faceIds = mixPaint.faceGroup.getFaceIds();

      if (faceIds && faceIds.length > 1) {
        const transformMap = mixPaint.faceGroup.transformMap;
        const groupFaces = Utils.getGroupFaces(faceIds);
        const holePaths: any[] = [];

        groupFaces.forEach((face: any) => {
          const paths: any[] = [];
          const holesPath2d = face.holesPath2d;
          const obstaclePath = Utils.getObstaclePath(face);

          paths.push(...holesPath2d, ...obstaclePath);

          const transform = transformMap[face.id];
          if (transform) {
            paths.forEach((path: any) => {
              path.outer.forEach((point: any) => point.transform(transform));
              path.holes.forEach((hole: any) =>
                hole.map((point: any) => point.transform(transform))
              );
            });
          }

          holePaths.push(...paths);
        });

        const backgroundPath = mixPaint.getBackgroundPath();
        if (!backgroundPath) {
          return;
        }

        outline = HSCore.Geometry.TgUtil.clip(
          [backgroundPath],
          holePaths,
          HSPaveSDK.ClipMode.Diff
        );
      }
    } else if (context.srcEntity) {
      const entity = context.srcEntity;
      const rawPath2d = entity.rawPath2d;
      const openingPath = Utils.getOpeningPath(entity);
      const obstaclePath = Utils.getObstaclePath(entity);
      const allPaths = [...openingPath, ...obstaclePath];

      outline = HSCore.Geometry.TgUtil.clip(
        [rawPath2d],
        allPaths,
        HSPaveSDK.ClipMode.Diff
      );
    }

    return outline;
  }
}