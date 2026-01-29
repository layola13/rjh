import { InstanceData, Parameter, DataType } from './321465';
import { AcceptEntity } from './306931';
import { Utils } from './919367';

interface CustomizedPMInsEdgeEntityData {
  type: string;
  path: string;
  length: number;
}

interface TypeConfig {
  classType: string;
}

export class CustomizedPMInsEdgeEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(): void {
    // Method intentionally empty
  }

  protected buildEntityData(data: CustomizedPMInsEdgeEntityData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: `diy2_${data.type}`
    });
  }

  private getInstanceData(data: CustomizedPMInsEdgeEntityData): InstanceData {
    const instanceData = new InstanceData(data.path);
    const formattedLength = Utils.formatNumberPoints(data.length);
    instanceData.addParameter(new Parameter("length", formattedLength, DataType.Number));
    return instanceData;
  }
}