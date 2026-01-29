import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

interface EntityParameters {
  iconSmall: string;
  profileWidth: number;
  profileHeight: number;
  materialData?: {
    metadata?: unknown;
  };
}

interface EntityMetadata {
  seekId: string;
  aliModelId: string;
  categories?: string[];
  name: string;
}

interface PathSegment {
  getLength(): number;
}

interface MoldingBomData {
  path: (PathSegment | null)[];
}

interface ParentEntity {
  id: string;
  getMoldingBomData(): MoldingBomData[] | null;
}

interface Entity {
  id: string;
  metadata: EntityMetadata;
  parameters: EntityParameters;
  parent: ParentEntity;
}

interface CategoryData {
  seekId: string;
  aliModelId: string;
  categoryType?: string;
  displayName: string;
  textureUrl: string;
  size: string;
}

export class ParameterWindowPocketEntity extends AcceptEntity {
  buildChildren(): void {
    // Method intentionally left empty
  }

  buildEntityData(entity: Entity): void {
    this.setInstanceData(this.getInstanceData(entity));
    this.setType(genEntityTypeFromContent(entity));

    const metadata = entity.metadata;
    this.setCategory({
      seekId: metadata.seekId,
      aliModelId: metadata.aliModelId,
      categoryType: metadata.categories?.join(', '),
      displayName: metadata.name,
      textureUrl: entity.parameters.iconSmall,
      size: Utils.formatNumberPoints([
        entity.parameters.profileWidth,
        entity.parameters.profileHeight
      ])
    });
  }

  getInstanceData(entity: Entity): InstanceData {
    const instanceData = new InstanceData(entity.id);
    const moldingBomData = entity.parent.getMoldingBomData();
    let totalLength = 0;

    if (moldingBomData && moldingBomData.length > 0) {
      moldingBomData.forEach((bomItem) => {
        totalLength += bomItem.path.reduce((sum, segment) => {
          return sum + (segment?.getLength() ?? 0);
        }, 0);
      });
    }

    instanceData.addParameter(
      new Parameter('parentId', entity.parent.id, DataType.String),
      new Parameter('width', entity.parameters.profileWidth, DataType.Number),
      new Parameter('thickness', entity.parameters.profileHeight, DataType.Number),
      new Parameter(
        'material',
        genMaterialInfoFromMeta(entity?.parameters?.materialData?.metadata),
        DataType.Object
      ),
      new Parameter('path', moldingBomData, DataType.Object),
      new Parameter('length', Utils.formatNumberPoints(totalLength), DataType.Number),
      new Parameter('side', 'inner', DataType.String)
    );

    return instanceData;
  }
}