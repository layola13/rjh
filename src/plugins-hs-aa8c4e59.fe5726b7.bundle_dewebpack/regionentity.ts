import { InstanceData, Parameter, DataType } from './InstanceData';
import { AcceptEntity } from './AcceptEntity';
import { HSPaveSDK } from './HSPaveSDK';
import { Utils } from './Utils';

interface RegionEntityInput {
  mixPave: unknown;
  region: HSPaveSDK.Region;
  outline?: number[][];
  faceIds: string[];
}

interface RegionInfo {
  classType: string;
  patternInfo: unknown;
  material: unknown;
  blocks: unknown;
  elementIds: unknown;
  component: unknown;
  size: number[];
  parentId: string;
  modifyBricks: unknown;
  path: number[][];
}

interface PaveConfig {
  pave?: {
    isPatternAdaptiveMaterialSize?: boolean;
  };
}

export class RegionEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(input: RegionEntityInput): void {
    if (input.region instanceof HSPaveSDK.Region) {
      let clippedOutline = input.outline
        ? HSPaveSDK.ClipperService.ins.clip(
            [input.region.path],
            input.outline,
            HSPaveSDK.ClipMode.Inter
          )
        : [input.region.path];

      const freeRegionPaths: number[][][] = [];

      input.region.freeRegions.forEach((freeRegion) => {
        this.addChild(
          new RegionEntity().accept({
            mixPave: input.mixPave,
            region: freeRegion,
            outline: clippedOutline,
            faceIds: input.faceIds,
          })
        );
        freeRegionPaths.push(freeRegion.path);
      });

      clippedOutline =
        clippedOutline &&
        HSPaveSDK.ClipperService.ins.clip(
          clippedOutline,
          freeRegionPaths,
          HSPaveSDK.ClipMode.Diff
        );

      input.region.children.forEach((childRegion) => {
        this.addChild(
          new RegionEntity().accept({
            mixPave: input.mixPave,
            region: childRegion,
            outline: clippedOutline,
            faceIds: input.faceIds,
          })
        );
      });
    }
  }

  buildEntityData(input: RegionEntityInput, config?: PaveConfig): void {
    const decorator = new HSPaveSDK.pluginRegionInfoDecorator(
      input.region,
      input.mixPave,
      {
        forBom: true,
        outline: input.outline,
        resizeTemplate: config?.pave?.isPatternAdaptiveMaterialSize,
      }
    );

    const regionInfoList = decorator.getRegionInfo();

    if (regionInfoList.length !== 0) {
      const faceIdsPrefix = input.faceIds.reduce(
        (acc, faceId) => `${acc}${faceId}, `,
        ''
      );

      this.setPrefix(faceIdsPrefix);
      this.setInstanceData(this.getInstanceData(input, regionInfoList[0]));
      this.setType({
        classType: regionInfoList[0].classType,
      });
    }
  }

  getInstanceData(input: RegionEntityInput, regionInfo: RegionInfo): InstanceData {
    const instanceData = new InstanceData(input.region.id);
    let finalOutline = input.outline;

    if (
      input.region instanceof HSPaveSDK.Region &&
      input.region.freeRegions.length
    ) {
      const freeRegionPaths = input.region.freeRegions.map(
        (freeRegion) => freeRegion.path
      );
      finalOutline =
        finalOutline &&
        HSPaveSDK.ClipperService.ins.clip(
          finalOutline,
          freeRegionPaths,
          HSPaveSDK.ClipMode.Diff
        );
    }

    instanceData.addParameter(
      new Parameter('patternInfo', regionInfo.patternInfo, DataType.Object),
      new Parameter('material', regionInfo.material, DataType.Object),
      new Parameter('blocks', regionInfo.blocks, DataType.Object),
      new Parameter('elementIds', regionInfo.elementIds, DataType.Object),
      new Parameter('component', regionInfo.component, DataType.Object),
      new Parameter(
        'size',
        Utils.formatNumberPoints(regionInfo.size),
        DataType.NumberArray
      ),
      new Parameter('parentId', regionInfo.parentId, DataType.String),
      new Parameter('modifyBricks', regionInfo.modifyBricks, DataType.Object),
      new Parameter(
        'area',
        Utils.getArea(regionInfo.path, finalOutline),
        DataType.Number
      ),
      new Parameter(
        'ignoreHoleArea',
        Utils.getAreaIgnoreHoles(regionInfo.path, finalOutline),
        DataType.Number
      )
    );

    return instanceData;
  }
}