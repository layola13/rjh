import { Content } from './Content';
import { NodeComp, NodeCompEnum } from './NodeComp';
import { Vector3 } from './Vector3';
import { ComponentTypeDump } from './ComponentTypeDump';

interface DeviceCompDumpData {
  of: [number, number, number];
  id: string;
  tp: ComponentTypeDump.Device;
}

interface ReferObject {
  doc: {
    getEntityById(id: string): unknown;
  };
}

export class DeviceComp extends NodeComp {
  static readonly Type = NodeCompEnum.Device;

  public offset: Vector3;
  public id: string;
  protected _referObject!: ReferObject;

  constructor(id: string) {
    super();
    this.offset = new Vector3();
    this.id = id;
  }

  get type(): NodeCompEnum {
    return DeviceComp.Type;
  }

  get content(): Content | undefined {
    if (!this.id) {
      return undefined;
    }

    const entity = this._referObject.doc.getEntityById(this.id);
    if (entity instanceof Content) {
      return entity;
    }

    return undefined;
  }

  clone(): DeviceComp {
    const cloned = new DeviceComp(this.id);
    cloned.offset = this.offset.clone();
    return cloned;
  }

  dump(): DeviceCompDumpData {
    return {
      of: this.offset.toArray3(),
      id: this.id,
      tp: ComponentTypeDump.Device
    };
  }

  static load(data: DeviceCompDumpData, referObject: ReferObject): DeviceComp {
    const component = new DeviceComp(data.id);
    component._referObject = referObject;
    component.offset.resetFromArray(data.of);
    return component;
  }
}