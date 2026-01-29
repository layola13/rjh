import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface MaterialMetadata {
  [key: string]: unknown;
}

interface MaterialData {
  metadata?: MaterialMetadata;
}

interface EntityParameters {
  points: Point[];
  materialData?: MaterialData;
}

interface EntityContent {
  id: string;
  side: 'single' | 'double' | 'left' | 'right' | 'both';
  parameters: EntityParameters;
}

interface CategoryInfo {
  seekId: string;
  aliModelId: string;
  categoryType: string;
  displayName: string;
  textureUrl: string;
}

export class SillStoneEntity extends AcceptEntity {
  /**
   * Build entity data from content
   */
  buildEntityData(content: EntityContent): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(this.genEntityTypeFromContent(content));
    this.setCategory({
      seekId: '124f4569-24f1-4588-890f-2fb63cf44364',
      aliModelId: '59504111',
      categoryType: '5336c147-c5ba-4013-bd91-0a8dcb02ca66',
      displayName: '窗台石',
      textureUrl: ''
    });
  }

  buildChildren(): void {
    // No children to build
  }

  /**
   * Extract instance data from entity content
   */
  private getInstanceData(content: EntityContent): InstanceData {
    const instanceData = new InstanceData(content.id);
    
    const points = content.parameters.points;
    const area = this.getArea(points);
    const length = HSCore.Util.Math.getDistance(points[0], points[1]);
    const width = Utils.formatNumberPoints(area / length);
    
    const side = content.side === 'double' ? 'both' : content.side;
    
    const materialMetadata = content.parameters.materialData?.metadata;
    const materialInfo = this.genMaterialInfoFromMeta(materialMetadata);
    
    instanceData.addParameter(
      new Parameter('material', materialInfo, DataType.Object),
      new Parameter('area', area, DataType.Number),
      new Parameter('length', Utils.formatNumberPoints(length), DataType.Number),
      new Parameter('width', width, DataType.Number),
      new Parameter('side', side, DataType.String)
    );
    
    return instanceData;
  }

  private getArea(points: Point[]): number {
    // Implementation delegated to utility function
    return HSCore.Util.Math.getArea(points);
  }

  private genEntityTypeFromContent(content: EntityContent): string {
    // Implementation details would depend on AcceptEntity base class
    return 'SillStone';
  }

  private genMaterialInfoFromMeta(metadata: MaterialMetadata | undefined): unknown {
    // Implementation details for material info generation
    if (!metadata) {
      return {};
    }
    return metadata;
  }
}