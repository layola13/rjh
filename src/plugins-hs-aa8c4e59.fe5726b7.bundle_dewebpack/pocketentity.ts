import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genCategoryDataFromContent, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

export class PocketEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildEntityData(content: any): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  protected buildChildren(): void {
    // No implementation needed
  }

  private getInstanceData(content: any): InstanceData {
    const instanceData = new InstanceData(content.id);
    const moldingPath = Utils.getMoldingPath(content);
    const pathLength = Utils.getPathLength(moldingPath, false);

    instanceData.addParameter(
      new Parameter("parentId", content.parent?.id, DataType.String),
      new Parameter("path", moldingPath, DataType.Object),
      new Parameter("size", [pathLength, content.XSize, content.YSize], DataType.ArrayPoint3D),
      new Parameter("length", pathLength, DataType.Number),
      new Parameter("thickness", content.YSize, DataType.Number),
      new Parameter("width", content.XSize, DataType.Number),
      new Parameter("side", content.side, DataType.String)
    );

    let materialMetadata: any = null;

    if (content.material) {
      materialMetadata = content.material.metadata ?? content.material;
    } else if (content?.parameters?.materialData) {
      if (content.parameters.materialData.metadata) {
        materialMetadata = content.parameters.materialData.metadata;
      } else {
        materialMetadata = content.parameters.materialData;
      }
    }

    if (!materialMetadata.aliModelId && materialMetadata.seekId && materialMetadata.seekId !== "local") {
      materialMetadata = HSApp.App.getApp().catalogManager.getBuildingProductMeta(materialMetadata.seekId);
    }

    instanceData.addParameter(
      new Parameter("material", genMaterialInfoFromMeta(materialMetadata), DataType.Object)
    );

    return instanceData;
  }
}