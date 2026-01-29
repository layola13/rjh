import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { 
  genEntityTypeFromContent, 
  genCategoryDataFromContent, 
  getPathLength, 
  getEntityLayer 
} from './EntityUtils';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface MaterialCategory {
  seekId: string;
  aliModelId: string;
  categoryType: string;
  displayName: string;
  textureUrl: string;
}

interface MaterialData {
  seekId: string;
  aliModelId: string;
  name: string;
  textureURI: string;
}

interface ContentEntity {
  id: string;
  path?: Point3D[];
  XSize: number;
  YSize: number;
  parent?: CustomizedModelEntity;
}

interface CustomizedModelEntity {
  id: string;
}

interface LayerData {
  id: string;
}

export class CustomizedMoldingEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(): void {
    // No implementation needed
  }

  protected buildEntityData(content: ContentEntity): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  private getInstanceData(content: ContentEntity): InstanceData {
    const instanceData = new InstanceData(content.id);
    
    let path = content.path;
    if (!path) {
      console.error('CustomizedMoldingEntity path 为空: ', content);
      path = [];
    }

    const pathLength = getPathLength(path, false);
    
    const materialData: MaterialData | undefined = 
      content instanceof HSCore.Model.Molding 
        ? content.getMaterialData() 
        : undefined;

    const layer: LayerData | undefined = getEntityLayer(content);
    const layerId: string | undefined = layer?.id;

    const materialParameter = materialData 
      ? {
          category: {
            seekId: materialData.seekId,
            aliModelId: materialData.aliModelId,
            categoryType: '',
            displayName: materialData.name,
            textureUrl: materialData.textureURI
          }
        }
      : {};

    instanceData.addParameter(
      new Parameter('layerId', layerId, DataType.String),
      new Parameter('roomId', this.getRoomId(content), DataType.String),
      new Parameter('parentId', content.parent?.id, DataType.String),
      new Parameter('path', path, DataType.Object),
      new Parameter('size', [pathLength, content.XSize, content.YSize], DataType.ArrayPoint3D),
      new Parameter('material', materialParameter, DataType.Object),
      new Parameter('length', pathLength, DataType.Number)
    );

    return instanceData;
  }

  private getRoomId(content: ContentEntity): string | undefined {
    if (content.parent && content.parent instanceof HSCore.Model.CustomizedModel) {
      const roomContent = HSCore.Util.Room.getRoomContentIn(content.parent);
      return roomContent?.id;
    }
    return undefined;
  }
}