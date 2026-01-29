import { InstanceData, Parameter, DataType } from './321465';
import { AcceptEntity } from './306931';
import { RegionEntity } from './237198';
import { HSPaveSDK, ClipMode } from './635589';
import { Utils } from './919367';

interface DecoratorInfo {
  mixPave?: MixPave;
  seekId?: string;
  outline?: any;
}

interface MixPave {
  independentRegions: Region[];
  regions: Region[];
}

interface Region {
  path: string;
}

interface BuildChildrenParams {
  path: string;
  decoratorInfo?: DecoratorInfo;
}

interface BuildEntityDataParams {
  type: string;
  path: string;
  fullArea: number;
  validArea: number;
  decoratorInfo?: DecoratorInfo;
}

interface AreaData {
  fullArea: number;
  validArea: number;
}

interface MaterialData {
  material?: DecoratorInfo;
}

export class CustomizedPMInsFaceEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(params: BuildChildrenParams): void {
    const { decoratorInfo } = params;
    
    if (decoratorInfo?.mixPave) {
      let outline: any[] = [decoratorInfo.outline];
      const regionPaths: string[] = [];

      decoratorInfo.mixPave.independentRegions.forEach((region: Region) => {
        this.addChild(
          new RegionEntity().accept({
            region,
            outline,
            mixPave: decoratorInfo.mixPave,
            faceIds: [params.path]
          })
        );
        regionPaths.push(region.path);
      });

      outline = HSPaveSDK.ClipperService.ins.clip(
        outline,
        regionPaths,
        HSPaveSDK.ClipMode.Diff
      );

      decoratorInfo.mixPave.regions.forEach((region: Region) => {
        this.addChild(
          new RegionEntity().accept({
            region,
            outline,
            mixPave: decoratorInfo.mixPave,
            faceIds: [params.path]
          })
        );
      });
    }
  }

  buildEntityData(params: BuildEntityDataParams): void {
    this.setInstanceData(this.getInstanceData(params));
    this.setType({
      classType: `diy2_${params.type}`
    });
  }

  getInstanceData(params: BuildEntityDataParams): InstanceData {
    const instanceData = new InstanceData(params.path);

    const areaData: AreaData = {
      fullArea: Utils.formatNumberPoints(params.fullArea),
      validArea: Utils.formatNumberPoints(params.validArea)
    };

    const materialData: MaterialData = {};
    const decoratorInfo = params.decoratorInfo;

    if (
      decoratorInfo &&
      !decoratorInfo.mixPave &&
      decoratorInfo.seekId !== 'local' &&
      decoratorInfo.seekId !== 'generated'
    ) {
      materialData.material = decoratorInfo;
    }

    instanceData.addParameter(
      new Parameter('area', areaData, DataType.Object),
      new Parameter('2D', materialData, DataType.Object)
    );

    return instanceData;
  }
}