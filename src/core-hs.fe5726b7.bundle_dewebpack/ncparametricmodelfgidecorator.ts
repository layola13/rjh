interface UVBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface FGIMaterialInput {
  color?: number;
  colorMode?: HSCore.Material.ColorModeEnum;
  seekId?: string;
  textureURI?: string;
  normalTexture?: string;
}

interface FGIMaterialData {
  color: number;
  opacity: number;
  colorMode: HSCore.Material.ColorModeEnum;
  seekId?: string;
  texture?: string;
  normalTexture?: string;
}

interface MaterialObjData {
  rotation: number;
  tileSize_x: number;
  tileSize_y: number;
  fit?: boolean;
  scaleX?: number;
  scaleY?: number;
}

interface ParametricModelWithUVBox {
  srcUvBox: UVBox;
}

import { MaterialObjDecorator } from './MaterialObjDecorator';
import { MaterialDataObjDecorator } from './MaterialDataObjDecorator';

export class NCParametricModelFGIDecorator {
  private readonly _model: unknown;

  constructor(model: unknown) {
    this._model = model;
  }

  getFGIMaterialData(input: FGIMaterialInput): FGIMaterialData {
    return {
      color: input.color !== undefined ? input.color : 16777215,
      opacity: 1,
      colorMode: input.colorMode ?? HSCore.Material.ColorModeEnum.color,
      seekId: input.seekId,
      texture: input.textureURI,
      normalTexture: input.normalTexture
    };
  }

  getUvTransform(model: ParametricModelWithUVBox, materialData: unknown): unknown {
    return this._getUvTransformV1(model, materialData);
  }

  private _getUvTransformV1(model: ParametricModelWithUVBox, materialData: unknown): unknown {
    const uvBox = model.srcUvBox;
    const width = uvBox.max.x - uvBox.min.x;
    const height = uvBox.max.y - uvBox.min.y;
    
    const materialObj = this._getMaterialObj(materialData);
    const { rotation, tileSize_x, tileSize_y, fit } = materialObj;
    
    const decorator = new MaterialObjDecorator(materialObj);
    
    materialObj.rotation = -rotation;
    
    if (fit) {
      materialObj.scaleX = width / tileSize_x;
      materialObj.scaleY = height / tileSize_y;
    }
    
    return decorator.getLocalToWorldUVTransformRTS();
  }

  private _getMaterialObj(materialData: unknown): MaterialObjData {
    return new MaterialDataObjDecorator(materialData).toMaterialObj();
  }
}