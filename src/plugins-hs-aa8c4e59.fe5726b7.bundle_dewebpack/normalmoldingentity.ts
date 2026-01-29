import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { getEntityLayer, genEntityTypeFromContent, genCategoryDataFromContent, getPathLength, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

interface EntityContent {
  id: string;
  material: MaterialMeta;
  XSize: number;
  YSize: number;
  parent?: { id: string };
}

interface MaterialMeta {
  aliModelId?: string;
  seekId?: string;
}

interface EntityLayer {
  id: string;
}

interface CatalogManager {
  getBuildingProductMeta(seekId: string): MaterialMeta;
}

interface App {
  catalogManager: CatalogManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

export class NormalMoldingEntity extends AcceptEntity {
  private roomId: string;

  constructor(roomId?: string) {
    super();
    this.roomId = roomId ?? '';
  }

  buildChildren(): void {
    // No implementation
  }

  buildEntityData(content: EntityContent): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  getInstanceData(content: EntityContent): InstanceData {
    const instanceData = new InstanceData(content.id);
    const layer: EntityLayer | undefined = getEntityLayer(content);
    const moldingPath = Utils.getMoldingPath(content);
    const pathLength = getPathLength(moldingPath, false);
    let material = content.material;

    if (!material.aliModelId && material.seekId && material.seekId !== 'local') {
      material = HSApp.App.getApp().catalogManager.getBuildingProductMeta(material.seekId);
    }

    instanceData.addParameter(
      new Parameter('roomId', this.roomId, DataType.String),
      new Parameter('layerId', layer?.id, DataType.String),
      new Parameter('path', moldingPath, DataType.Object),
      new Parameter('size', Utils.formatNumberPoints([pathLength, content.XSize, content.YSize]), DataType.ArrayPoint3D),
      new Parameter('material', genMaterialInfoFromMeta(material)),
      new Parameter('parentId', content.parent?.id, DataType.String),
      new Parameter('length', pathLength, DataType.Number)
    );

    return instanceData;
  }
}