import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ModelClassName } from './ModelClassName';
import { Utils } from './Utils';

interface DecoratorInfo {
  seekId: string;
  aliModelId?: string;
  categoryType?: string;
  name?: string;
  textureURI?: string;
  mixPave?: boolean;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface EntityDataInput {
  type: string;
  path: string;
  pathPts: unknown;
  size: Size | Size[];
  decoratorInfo?: DecoratorInfo;
  length: number | number[];
  height: number | number[];
  width: number | number[];
}

interface MaterialCategory {
  seekId: string;
  aliModelId?: string;
  categoryType?: string;
  displayName?: string;
  textureUrl?: string;
}

interface Material {
  category?: MaterialCategory;
}

export class CustomizedPMInsMoldingEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(): void {
    // Empty implementation
  }

  buildEntityData(data: EntityDataInput): void {
    this.setInstanceData(this.getInstanceData(data));
    
    let classType = ModelClassName.CustomizedModelMolding;
    let contentType = '';
    
    if (data.type === 'lightband') {
      classType = ModelClassName.CustomizedModelLightBand;
      contentType = 'customized model light band';
    } else if (data.type === 'lightslot') {
      classType = ModelClassName.CustomizedModelLightSlot;
      contentType = 'customized model light slot';
    }
    
    this.setType({
      classType,
      contentType
    });
  }

  getInstanceData(data: EntityDataInput): InstanceData {
    const instanceData = new InstanceData(data.path);
    const decoratorInfo = data.decoratorInfo;
    
    let validDecoratorInfo: DecoratorInfo | undefined;
    
    if (
      decoratorInfo &&
      !decoratorInfo.mixPave &&
      decoratorInfo.seekId !== 'local' &&
      decoratorInfo.seekId !== 'generated'
    ) {
      validDecoratorInfo = decoratorInfo;
    }
    
    const material: Material = validDecoratorInfo
      ? {
          category: {
            seekId: validDecoratorInfo.seekId,
            aliModelId: validDecoratorInfo.aliModelId,
            categoryType: validDecoratorInfo.categoryType,
            displayName: validDecoratorInfo.name,
            textureUrl: validDecoratorInfo.textureURI
          }
        }
      : {};
    
    instanceData.addParameter(
      new Parameter('path', data.pathPts, DataType.Object),
      new Parameter('size', Utils.formatNumberPoints(data.size), DataType.ArrayPoint3D),
      new Parameter('material', material, DataType.Object),
      new Parameter('length', Utils.formatNumberPoints(data.length), DataType.Number),
      new Parameter('height', Utils.formatNumberPoints(data.height), DataType.Number),
      new Parameter('width', Utils.formatNumberPoints(data.width), DataType.Number)
    );
    
    return instanceData;
  }
}