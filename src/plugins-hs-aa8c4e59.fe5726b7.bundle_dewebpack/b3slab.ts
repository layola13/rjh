import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity, setObjectParameterValues } from './utils';

interface B3SlabBom3Data {
  entity: unknown;
  baselayerId?: string;
  underlayerId?: string;
  thickness?: number;
}

interface SlabEntity {
  baselayerId?: string;
  underlayerId?: string;
  thickness?: number;
  [key: string]: unknown;
}

export class B3Slab extends B3Entity {
  constructor(...args: any[]) {
    super(...args);
  }

  buildBom3Data(entity: SlabEntity): B3SlabBom3Data {
    const data: B3SlabBom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };

    setObjectParameterValues(
      data,
      entity,
      {
        baselayerId: "baselayerId",
        underlayerId: "underlayerId",
        thickness: "thickness"
      },
      false
    );

    return data;
  }
}