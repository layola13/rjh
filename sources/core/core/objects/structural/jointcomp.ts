import { ComponentTypeDump } from './ComponentTypeDump';
import { NodeComp, NodeCompEnum } from './NodeComp';

export class JointComp extends NodeComp {
  static readonly Type = NodeCompEnum.Joint;

  private _referObject?: unknown;

  get type(): NodeCompEnum {
    return JointComp.Type;
  }

  dump(): { tp: ComponentTypeDump } {
    return {
      tp: ComponentTypeDump.Joint
    };
  }

  static load(data: unknown, referObject: unknown): JointComp {
    const component = new JointComp();
    component._referObject = referObject;
    return component;
  }
}