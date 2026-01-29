import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './entityUtils';
import { B3ConcealedWorkCircuit } from './B3ConcealedWorkCircuit';

interface Bom3Data {
  entity: unknown;
  circuits: unknown[];
}

interface Entity {
  getChildren(): Entity[];
}

interface Context {
  // Define context properties based on usage
}

export class B3ConcealedWorkPowerSystem extends B3Entity {
  context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
  }

  buildBom3Data(entity: Entity): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity),
      circuits: []
    };

    const children = entity.getChildren();
    data.circuits = children.map((childEntity: Entity) => {
      return new B3ConcealedWorkCircuit(this.context).buildBom3Data(childEntity);
    });

    return data;
  }
}