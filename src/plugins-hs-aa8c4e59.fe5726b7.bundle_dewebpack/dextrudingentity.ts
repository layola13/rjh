import { HSConstants } from './635589';
import { CustomizationEntity } from './629716';
import { Parameter, DataType } from './321465';
import { CustomizationEntityFactory } from './889726';
import { CustomizationParamKey } from './796005';
import { genMaterialInfoFromMeta } from './116057';

interface MaterialMetadata {
  [key: string]: unknown;
}

interface Material {
  metadata?: MaterialMetadata;
}

interface ExtrudingEntityData {
  XSize: number;
  YSize: number;
  ZSize: number;
  material: Material;
}

interface InstanceData {
  addParameter(parameter: Parameter): void;
}

export class DExtrudingEntity extends CustomizationEntity {
  public getInstanceData(data: ExtrudingEntityData): InstanceData {
    const baseInstanceData = super.getInstanceData(data);
    
    baseInstanceData.addParameter(
      new Parameter(
        CustomizationParamKey.Size,
        [data.XSize, data.YSize, data.ZSize],
        DataType.ArrayPoint3D
      )
    );
    
    if (data.material.metadata) {
      baseInstanceData.addParameter(
        new Parameter(
          CustomizationParamKey.Material,
          genMaterialInfoFromMeta(data.material.metadata),
          DataType.Object
        )
      );
    }
    
    return baseInstanceData;
  }
}

CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DExtruding,
  DExtrudingEntity
);