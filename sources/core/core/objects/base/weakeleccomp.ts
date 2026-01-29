import { ComponentTypeDump } from './componenttypedump';
import { TreeComp, TreeCompEnum } from './treecomp';

export class WeakElecComp extends TreeComp {
  static readonly Type = TreeCompEnum.WeakElec;

  private _referObject?: unknown;

  get type(): TreeCompEnum {
    return WeakElecComp.Type;
  }

  dump(): { tp: ComponentTypeDump } {
    return {
      tp: ComponentTypeDump.WeakElec
    };
  }

  static load(data: unknown, referObject: unknown): WeakElecComp {
    const component = new WeakElecComp();
    component._referObject = referObject;
    return component;
  }
}