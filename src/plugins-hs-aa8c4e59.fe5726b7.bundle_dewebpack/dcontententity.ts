import { HSConstants } from './HSConstants';
import { CustomizationEntity } from './CustomizationEntity';
import { Parameter, DataType } from './Parameter';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { CustomizationParamKey } from './CustomizationParamKey';

interface EntityData {
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface InstanceData {
  addParameter(parameter: Parameter): void;
}

export class DContentEntity extends CustomizationEntity {
  getInstanceData(entityData: EntityData): InstanceData {
    const instanceData = super.getInstanceData(entityData);
    
    instanceData.addParameter(
      new Parameter(
        CustomizationParamKey.Size,
        [entityData.XSize, entityData.YSize, entityData.ZSize],
        DataType.ArrayPoint3D
      )
    );
    
    return instanceData;
  }
}

CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DContent,
  DContentEntity
);