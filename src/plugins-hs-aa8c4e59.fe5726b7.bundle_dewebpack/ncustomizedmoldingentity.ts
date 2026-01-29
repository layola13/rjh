import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { genEntityTypeFromContent, genCategoryDataFromContent, getEntityLayer } from './EntityUtils';
import { Utils } from './Utils';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface PathSegment {
  getLength(): number;
}

interface MaterialData {
  seekId: string;
  aliModelId: string;
  name: string;
  textureURI: string;
}

interface LayerData {
  id: string;
}

interface ContentEntity {
  id: string;
  parent?: NCustomizedFeatureModel | null;
  profileWidth: number;
  profileHeight: number;
  getSweepPath3D(): PathSegment[];
}

interface NCustomizedModelMolding extends ContentEntity {
  getMaterialData(): MaterialData;
}

interface NCustomizedFeatureModel {
  id: string;
}

interface MaterialCategory {
  seekId: string;
  aliModelId: string;
  categoryType: string;
  displayName: string;
  textureUrl: string;
}

interface MaterialInfo {
  category: MaterialCategory | Record<string, never>;
}

export class NCustomizedMoldingEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(): void {
    // No implementation needed
  }

  buildEntityData(content: ContentEntity): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  getInstanceData(content: ContentEntity): InstanceData {
    const instanceData = new InstanceData(content.id);
    
    let path = content.getSweepPath3D();
    if (!path) {
      console.error('CustomizedMoldingEntity path 为空: ', content);
      path = [];
    }

    const pathLength = Utils.formatNumberPoints(this.getPathLength(path));
    const profileWidth = content.profileWidth;
    const profileHeight = content.profileHeight;
    
    const materialData = this.isCustomizedModelMolding(content) 
      ? content.getMaterialData() 
      : undefined;
    
    const layer = getEntityLayer(content);
    const layerId = layer?.id;
    const roomId = this.getRoomId(content);
    const parentId = content.parent?.id;

    const materialInfo: MaterialInfo = materialData
      ? {
          category: {
            seekId: materialData.seekId,
            aliModelId: materialData.aliModelId,
            categoryType: '',
            displayName: materialData.name,
            textureUrl: materialData.textureURI,
          },
        }
      : { category: {} };

    instanceData.addParameter(
      new Parameter('layerId', layerId, DataType.String),
      new Parameter('roomId', roomId, DataType.String),
      new Parameter('parentId', parentId, DataType.String),
      new Parameter('path', path, DataType.Object),
      new Parameter('size', [pathLength, profileWidth, profileHeight], DataType.ArrayPoint3D),
      new Parameter('material', materialInfo, DataType.Object),
      new Parameter('length', pathLength, DataType.Number)
    );

    return instanceData;
  }

  getPathLength(path: PathSegment[]): number {
    return path.reduce((totalLength, segment) => {
      return totalLength + segment.getLength();
    }, 0);
  }

  getRoomId(content: ContentEntity): string | undefined {
    if (content.parent && this.isCustomizedFeatureModel(content.parent)) {
      const room = HSCore.Util.Room.getRoomContentIn(content.parent);
      return room?.id;
    }
    return undefined;
  }

  private isCustomizedModelMolding(content: ContentEntity): content is NCustomizedModelMolding {
    return content instanceof HSCore.Model.NCustomizedModelMolding;
  }

  private isCustomizedFeatureModel(parent: unknown): parent is NCustomizedFeatureModel {
    return parent instanceof HSCore.Model.NCustomizedFeatureModel;
  }
}