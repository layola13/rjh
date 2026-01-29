import { Matrix3, Vector2, MathUtil } from './math-utils';
import { NCParametricModelFGIDecorator } from './nc-parametric-model-fgi-decorator';

interface UvBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface UvTransformInput {
  srcUvBox: UvBox;
}

interface MaterialProperties {
  rotation: number;
  tileSize_x: number;
  tileSize_y: number;
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
  fit: boolean;
}

interface ParametricModel {
  // Define model properties as needed
}

export class NCPBkgWallBaseFGIDecorator extends NCParametricModelFGIDecorator {
  private readonly _model: ParametricModel;

  constructor(model: ParametricModel) {
    super(model);
    this._model = model;
  }

  public getUvTransform(input: UvTransformInput, materialIndex: number): Matrix3 {
    return this._getUvTransformV1(input, materialIndex);
  }

  public getUvTransformV0(input: UvTransformInput, materialIndex: number): Matrix3 {
    return this._getUvTransformV0(input, materialIndex);
  }

  private _getUvTransformV0(input: UvTransformInput, materialIndex: number): Matrix3 {
    const sourceUvBox = input.srcUvBox;
    const uvBoxSize = {
      x: sourceUvBox.max.x - sourceUvBox.min.x,
      y: sourceUvBox.max.y - sourceUvBox.min.y
    };

    const material = this._getMaterialObj(materialIndex);
    const {
      rotation,
      tileSize_x: tileSizeX,
      tileSize_y: tileSizeY,
      offsetX,
      offsetY,
      scaleX,
      scaleY,
      fit
    } = material;

    const transformMatrix = new Matrix3();
    let finalTileSizeX = tileSizeX;
    let finalTileSizeY = tileSizeY;

    if (fit) {
      finalTileSizeX = uvBoxSize.x;
      finalTileSizeY = uvBoxSize.y;
      const translation = {
        x: -sourceUvBox.min.x,
        y: -sourceUvBox.min.y
      };
      transformMatrix.applyTranslate(translation);
    }

    transformMatrix.applyScale(Vector2.O(), {
      x: 1 / (scaleX * finalTileSizeX),
      y: 1 / (scaleY * finalTileSizeY)
    });

    const offsetVector = new Vector2(
      offsetX / (scaleX * finalTileSizeX),
      offsetY / (scaleY * finalTileSizeY)
    );

    if (rotation % 360) {
      const rotationRadians = MathUtil.degreeToRadius(rotation);
      transformMatrix.applyRotate(Vector2.O(), rotationRadians);
      offsetVector.rotate(Vector2.O(), rotationRadians);
    }

    if (offsetX || offsetY) {
      transformMatrix.applyTranslate(offsetVector);
    }

    return transformMatrix;
  }
}