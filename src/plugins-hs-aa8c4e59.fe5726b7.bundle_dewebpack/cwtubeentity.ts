import { InstanceData, Parameter, DataType } from './321465';
import { ParameterNames } from './242448';
import { AcceptEntity } from './306931';

interface TypeInfo {
  classType: string;
  subType: string;
}

interface EntityDataInput {
  id: string;
  parentId: string;
  size: number[];
  classType: string;
  subType: string;
}

export class CWTubeEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(data: unknown): void {
    // Implementation needed
  }

  protected buildEntityData(data: EntityDataInput): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType,
      subType: data.subType
    });
  }

  private getInstanceData(data: EntityDataInput): InstanceData {
    const instanceData = new InstanceData(data.id);
    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String),
      new Parameter('size', data.size, DataType.ArrayPoint3D)
    );
    return instanceData;
  }
}