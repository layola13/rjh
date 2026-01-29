import { HSCore, HSConstants } from './HSCore';
import { CustomizationEntity } from './CustomizationEntity';
import { Parameter, DataType } from './Parameter';
import { CustomizationParamKey } from './CustomizationParamKey';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { genMaterialInfoFromMeta } from './MaterialUtils';

export class DMoldingEntity extends CustomizationEntity {
  getInstanceData(entity: HSCore.Model.DEntity): CustomizationEntity {
    const baseInstanceData = super.getInstanceData(entity);
    
    let totalLength = 0;
    const firstPath = entity.paths?.[0];
    
    if (firstPath) {
      for (let i = 0; i < firstPath.length; i++) {
        const currentPoint = firstPath[i];
        const nextPoint = firstPath[(i + 1) % firstPath.length];
        totalLength += HSCore.Util.Math.getDistance3(currentPoint, nextPoint);
      }
    }
    
    baseInstanceData.addParameter(
      new Parameter(CustomizationParamKey.Length, totalLength, DataType.Number)
    );
    
    const firstChild = Object.values(entity.children)[0];
    let height = entity.YSize;
    
    if (firstChild instanceof HSCore.Model.DContent) {
      height = firstChild.YSize;
    } else if (firstChild instanceof HSCore.Model.DSweep && firstChild.metadata) {
      height = firstChild.metadata.profileSizeY;
    }
    
    baseInstanceData.addParameter(
      new Parameter(CustomizationParamKey.Height, height, DataType.Number)
    );
    
    let material: HSCore.Model.Material | undefined;
    
    if (firstChild instanceof HSCore.Model.DContent) {
      material = firstChild.getMaterial('');
    } else if (firstChild instanceof HSCore.Model.DSweep) {
      material = firstChild.material;
    }
    
    if (material?.metadata) {
      baseInstanceData.addParameter(
        new Parameter(
          CustomizationParamKey.Material,
          genMaterialInfoFromMeta(material.metadata),
          DataType.Object
        )
      );
    }
    
    return baseInstanceData;
  }
}

CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DMolding,
  DMoldingEntity
);