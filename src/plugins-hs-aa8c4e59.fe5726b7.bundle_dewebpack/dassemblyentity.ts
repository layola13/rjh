import { CustomizationEntity } from './CustomizationEntity';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { HSConstants } from './HSConstants';
import { Parameter, DataType } from './Parameter';
import { CustomizationParamKey } from './CustomizationParamKey';
import { genMaterialInfoFromMeta } from './MaterialUtils';

interface AssemblyEntityData {
  XSize: number;
  YSize: number;
  ZSize: number;
  isCountertop?: boolean;
  materialId?: string;
  fixK?: number;
  fixS?: number;
}

interface CounterTopInfo {
  width: number;
  depth: number;
}

interface CustomizedProductsPlugin {
  getCounterTopInfo?: (data: AssemblyEntityData) => CounterTopInfo | null;
}

interface ProductMetadata {
  [key: string]: unknown;
}

interface InstanceData {
  addParameter(param: Parameter): void;
}

const MILLIMETERS_TO_METERS = 1000;

export class DAssemblyEntity extends CustomizationEntity {
  getInstanceData(entityData: AssemblyEntityData): InstanceData {
    let dimensions: [number, number, number] = [
      entityData.XSize,
      entityData.YSize,
      entityData.ZSize
    ];

    if (entityData.isCountertop) {
      const customizedProductsPlugin = HSApp.App.getApp()
        .pluginManager
        .getPlugin(HSFPConstants.PluginType.CustomizedProducts) as CustomizedProductsPlugin | null;

      if (customizedProductsPlugin?.getCounterTopInfo) {
        const counterTopInfo = customizedProductsPlugin.getCounterTopInfo(entityData);
        if (counterTopInfo) {
          dimensions = [
            counterTopInfo.width,
            counterTopInfo.depth,
            entityData.ZSize
          ];
        }
      }
    }

    const instanceData = super.getInstanceData(entityData);
    
    instanceData.addParameter(
      new Parameter(
        CustomizationParamKey.Size,
        dimensions,
        DataType.ArrayPoint3D
      )
    );

    const materialId = entityData.materialId;
    if (typeof materialId === 'string') {
      const productMetadata = HSApp.App.getApp()
        .catalogManager
        .getProductBySeekIdSync(materialId) as ProductMetadata | null;
      
      if (productMetadata) {
        instanceData.addParameter(
          new Parameter(
            CustomizationParamKey.Material,
            genMaterialInfoFromMeta(productMetadata),
            DataType.Object
          )
        );
      }
    }

    const fixK = entityData.fixK;
    const fixS = entityData.fixS;
    
    if (typeof fixK === 'number' && typeof fixS === 'number') {
      instanceData.addParameter(
        new Parameter(
          CustomizationParamKey.CornerSize,
          [fixK / MILLIMETERS_TO_METERS, fixS / MILLIMETERS_TO_METERS],
          DataType.ArrayPoint2D
        )
      );
    }

    return instanceData;
  }
}

CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DAssembly,
  DAssemblyEntity
);