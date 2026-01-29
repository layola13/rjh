import { ComponentTypeDump } from './component-type-dump';
import { TreeComp, TreeCompEnum } from './tree-comp';

export class ColdWaterComp extends TreeComp {
  static readonly Type = TreeCompEnum.ColdWater;

  private _referObject?: unknown;

  get type(): TreeCompEnum {
    return ColdWaterComp.Type;
  }

  dump(): { tp: ComponentTypeDump } {
    return {
      tp: ComponentTypeDump.ColdWater
    };
  }

  static load(data: unknown, referObject: unknown): ColdWaterComp {
    const instance = new ColdWaterComp();
    instance._referObject = referObject;
    return instance;
  }
}