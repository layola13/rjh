import { InstanceData, Parameter, DataType } from './321465';
import { ParameterNames } from './242448';
import { AcceptEntity } from './306931';
import { CWCircuitEntity } from './525084';

interface PowerSystemData {
  id: string;
  parentId: string;
  classType: string;
  circuits: CircuitData[];
}

interface CircuitData {
  [key: string]: unknown;
}

interface TypeConfig {
  classType: string;
}

export class CWPowerSystemEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(data: PowerSystemData): void {
    data.circuits.forEach((circuitData: CircuitData) => {
      this.addChild(new CWCircuitEntity().accept(circuitData));
    });
  }

  protected buildEntityData(data: PowerSystemData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType
    });
  }

  private getInstanceData(data: PowerSystemData): InstanceData {
    const instanceData = new InstanceData(data.id);
    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String)
    );
    return instanceData;
  }
}