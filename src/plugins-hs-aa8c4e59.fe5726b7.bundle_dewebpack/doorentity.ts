import { OpeningEntity } from './OpeningEntity';
import { Parameter, DataType } from './Parameter';

export class DoorEntity extends OpeningEntity {
  getInstanceData(context: any): any {
    const baseData = super.getInstanceData(context);
    
    if (context.isDoorStoneMaterialEnabled()) {
      baseData.addParameter(
        new Parameter(
          "stoneFaceId",
          context.getDoorStoneFace().id,
          DataType.String
        )
      );
    }
    
    return baseData;
  }
}