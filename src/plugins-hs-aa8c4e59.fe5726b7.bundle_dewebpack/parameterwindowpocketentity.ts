import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, getPathLength, genMaterialInfoFromMeta } from './utils';

interface ProfileData {
  seekId: string;
  thumbnail: string;
  profileSizeX: number;
  profileSizeY: number;
}

interface MaterialData {
  [key: string]: unknown;
}

interface MoldingPath {
  [key: string]: unknown;
}

interface ParentReference {
  id: string;
}

interface ParameterWindowPocketContent {
  id: string;
  parent: ParentReference;
  side: string;
  parameters: {
    profileData: ProfileData;
    moldingPaths: MoldingPath;
    materialData: MaterialData;
  };
}

interface CategoryInfo {
  seekId: string;
  aliModelId: undefined;
  categoryType: undefined;
  displayName: undefined;
  textureUrl: string;
  size: [number, number];
}

export class ParameterWindowPocketEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(): void {
    // No children to build
  }

  protected buildEntityData(content: ParameterWindowPocketContent): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory({
      seekId: content.parameters.profileData.seekId,
      aliModelId: undefined,
      categoryType: undefined,
      displayName: undefined,
      textureUrl: content.parameters.profileData.thumbnail,
      size: [
        content.parameters.profileData.profileSizeX,
        content.parameters.profileData.profileSizeY
      ]
    });
  }

  private getInstanceData(content: ParameterWindowPocketContent): InstanceData {
    const instanceData = new InstanceData(content.id);
    
    instanceData.addParameter(
      new Parameter("parentId", content.parent.id, DataType.String),
      new Parameter("path", content.parameters.moldingPaths, DataType.Object),
      new Parameter("length", getPathLength(content.parameters.moldingPaths, false), DataType.Number),
      new Parameter("width", content.parameters.profileData.profileSizeX, DataType.Number),
      new Parameter("thickness", content.parameters.profileData.profileSizeY, DataType.Number),
      new Parameter("material", genMaterialInfoFromMeta(content.parameters.materialData), DataType.Object),
      new Parameter("side", content.side, DataType.String)
    );
    
    return instanceData;
  }
}