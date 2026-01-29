import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { HSCore } from './HSCore';
import {
  genEntityTypeFromContent,
  genCategoryDataFromContent,
  genInstanceDataFromContent
} from './entityUtils';

interface Content {
  id: string;
  parent?: {
    id: string;
  };
}

interface InstanceData {
  addParameter(...parameters: Parameter[]): void;
}

export class ContentEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(content: Content): void {
    // Implementation intentionally empty
  }

  protected buildEntityData(content: Content): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  private getInstanceData(content: Content): InstanceData {
    const instanceData = genInstanceDataFromContent(content);
    const roomContent = HSCore.Util.Room.getRoomContentIn(content);
    const roomId = roomContent?.id;
    const layerId = content.parent?.id;

    instanceData.addParameter(
      new Parameter("roomId", roomId, DataType.String),
      new Parameter("layerId", layerId, DataType.String)
    );

    return instanceData;
  }
}