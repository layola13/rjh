import { Entity } from './entity';
import { PModelTypes } from './model-types';

type EntityClass = any;

export class EntityClassRegistry {
  static getEntityClassByType(type: PModelTypes): EntityClass | null {
    switch (type) {
      case PModelTypes.eExtrude:
        return EntityClassRegistry.PExtruding;
      case PModelTypes.eMolding:
        return EntityClassRegistry.PMolding;
      case PModelTypes.eContent:
        return EntityClassRegistry.PContent;
      case PModelTypes.eBox:
        return EntityClassRegistry.PBox;
      case PModelTypes.ePSegmentLoft:
        return EntityClassRegistry.PSegmentLoft;
      case PModelTypes.ePAssembly:
        return EntityClassRegistry.PAssembly;
      case PModelTypes.ePSlidingDoor:
        return EntityClassRegistry.PSlidingDoor;
      case PModelTypes.ePSlidingDoorLeaf:
        return EntityClassRegistry.PSlidingDoorLeaf;
      default:
        return null;
    }
  }

  static registerClass(className: string, classConstructor: EntityClass): void {
    Entity.registerClass(className, classConstructor);
  }

  static getClass(className: string): EntityClass {
    return Entity.getClass(className);
  }

  static get PExtruding(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPExtruding);
  }

  static get PMolding(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPMolding);
  }

  static get PContent(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPContent);
  }

  static get PBox(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPBox);
  }

  static get PSegmentLoft(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPSegmentLoft);
  }

  static get PAssembly(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPAssembly);
  }

  static get PSlidingDoor(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPSlidingDoor);
  }

  static get PSlidingDoorLeaf(): EntityClass {
    return EntityClassRegistry.getClass(HSConstants.ModelClass.NgPSlidingDoorLeaf);
  }
}