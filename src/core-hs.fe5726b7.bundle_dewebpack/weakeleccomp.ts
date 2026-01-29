import { ComponentTypeDump } from './26005';
import { TreeComp, TreeCompEnum } from './15770';

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