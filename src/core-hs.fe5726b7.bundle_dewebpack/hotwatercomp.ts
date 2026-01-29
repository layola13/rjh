import { ComponentTypeDump } from './ComponentTypeDump';
import { TreeComp, TreeCompEnum } from './TreeComp';

export class HotWaterComp extends TreeComp {
  static readonly Type = TreeCompEnum.HotWater;

  private _referObject?: unknown;

  get type(): TreeCompEnum {
    return HotWaterComp.Type;
  }

  dump(): { tp: ComponentTypeDump } {
    return {
      tp: ComponentTypeDump.HotWater
    };
  }

  static load(data: unknown, referObject: unknown): HotWaterComp {
    const instance = new HotWaterComp();
    instance._referObject = referObject;
    return instance;
  }
}