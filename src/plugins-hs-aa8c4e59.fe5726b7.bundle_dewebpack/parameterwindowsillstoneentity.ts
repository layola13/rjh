import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

interface CategoryInfo {
  seekId: string;
  aliModelId: string;
  categoryType: string;
  displayName: string;
  textureUrl: string;
}

interface MaterialMeta {
  // Define material meta properties based on your application
  [key: string]: unknown;
}

interface PropertyMap {
  get(key: string): unknown;
}

interface ParentSource {
  id: string;
  properties: PropertyMap;
}

interface ParentEntityInstance {
  getParameter(name: string): { value: number[] };
}

interface ParentEntity {
  instance: ParentEntityInstance;
}

export class ParameterWindowSillStoneEntity extends AcceptEntity {
  private parentSource?: ParentSource;
  private parentEntity?: ParentEntity;

  constructor(parentEntity: ParentEntity, parentSource: ParentSource) {
    super();
    this.parentEntity = parentEntity;
    this.parentSource = parentSource;
  }

  buildEntityData(): void {
    this.setInstanceData(this.getInstanceData(this.parentSource!));
    this.setType(genEntityTypeFromContent(this.source));
    this.setCategory({
      seekId: "124f4569-24f1-4588-890f-2fb63cf44364",
      aliModelId: "59504111",
      categoryType: "5336c147-c5ba-4013-bd91-0a8dcb02ca66",
      displayName: "窗台石",
      textureUrl: ""
    });
  }

  buildChildren(): void {
    // No children to build
  }

  getInstanceData(source: ParentSource): InstanceData {
    const instanceData = new InstanceData(`${source.id}-stone`);
    
    let side = "";
    let width = 0;
    const innerCts = source.properties.get("aCts") as boolean | undefined;
    const outerCts = source.properties.get("bCts") as boolean | undefined;

    if (innerCts && !outerCts) {
      side = "inner";
      width = source.properties.get("aw") as number;
    } else if (!innerCts && outerCts) {
      side = "outer";
      width = source.properties.get("bw") as number;
    } else {
      width = source.properties.get("aw") as number;
      side = "both";
    }

    const materialId = source.properties.get("cstCZ") as string;
    const materialMeta = HSApp.App.getApp().catalogManager.getBuildingProductMeta(materialId) as MaterialMeta;
    
    const size = this.parentEntity!.instance.getParameter("size").value;
    const length = size[0];
    const calculatedWidth = size[2] + Utils.convertLengthToDatabaseUnit([width])[0];
    const area = length * calculatedWidth;

    instanceData.addParameter(
      new Parameter("material", genMaterialInfoFromMeta(materialMeta), DataType.Object),
      new Parameter("area", Utils.formatNumberPoints(area)),
      new Parameter("length", length, DataType.Number),
      new Parameter("width", calculatedWidth, DataType.Number),
      new Parameter("side", side, DataType.String)
    );

    return instanceData;
  }
}