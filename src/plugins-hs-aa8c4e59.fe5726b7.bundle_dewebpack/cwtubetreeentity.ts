import { InstanceData, Parameter, DataType } from './321465';
import { ParameterNames } from './242448';
import { AcceptEntity } from './306931';
import { CWTubeEntity } from './837235';

interface TubeData {
  id: string;
  parentId: string;
  classType: string;
}

interface TubesCollection {
  tubes: TubeData[];
}

interface TypeConfig {
  classType: string;
}

export class CWTubeTreeEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(collection: TubesCollection): void {
    collection.tubes.forEach((tubeData: TubeData) => {
      this.addChild(new CWTubeEntity().accept(tubeData));
    });
  }

  buildEntityData(data: TubeData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType
    });
  }

  getInstanceData(data: TubeData): InstanceData {
    const instanceData = new InstanceData(data.id);
    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String)
    );
    return instanceData;
  }
}