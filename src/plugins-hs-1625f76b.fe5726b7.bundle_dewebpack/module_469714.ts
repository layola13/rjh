interface ModelingData {
  webCADDocument: unknown;
  unit: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  sizeRangeType: string;
}

interface ExecuteParams {
  modelingData: ModelingData;
  position: unknown;
  outline: unknown;
  hostPolygon?: unknown[];
}

interface ProductAttributes {
  values: Array<{ value: string }>;
}

interface ProductData {
  id: string;
  productType: unknown;
  contentType: string;
  attributes: unknown[];
  free: string;
}

interface ModelInfo {
  unit: string;
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface ExtendedFields {
  sizeRangeType: string;
  parameters: unknown;
}

interface AddProductOptions {
  ignoreSnapOffset: boolean;
  defaultGround: boolean;
  lightingMatrixArrangedEnable?: boolean;
  forceKeepZAxis?: boolean;
  constraintInRoom?: boolean;
}

/**
 * Command for creating parametric ceiling
 */
export default class CreateParametricCeilingCommand extends HSApp.Cmd.Command {
  private _modelingData: ModelingData;
  private _parameters: unknown;
  private _host: unknown;
  private _position: unknown;
  private _rotation: number;
  private _outline: unknown;
  private _hostPolygon: unknown[];

  constructor(
    params: ExecuteParams,
    parameters: unknown,
    host: unknown,
    _unused1?: unknown,
    _unused2?: unknown,
    _unused3?: unknown
  ) {
    super();
    this._modelingData = params.modelingData;
    this._parameters = parameters;
    this._host = host;
    this._position = params.position;
    this._rotation = 0;
    this._outline = params.outline;
    this._hostPolygon = params.hostPolygon ?? [];
  }

  onExecute(): Promise<unknown> {
    const app = HSApp.App.getApp();
    const catalogManager = app.catalogManager;

    return catalogManager
      .getAttribute("isScalable")
      .then((attribute: ProductAttributes) => {
        const scalableValue = attribute.values.find(
          (item) => item.value === "true"
        );

        const modifiedAttribute = {
          ...attribute,
          values: [scalableValue]
        };

        const createdByAttribute = {
          id: "attr-createdBy",
          free: [adskUser.uid]
        };

        const modelData = {
          model3d: this._modelingData.webCADDocument,
          modelInfo: {
            unit: this._modelingData.unit,
            XLength: this._modelingData.XLength,
            YLength: this._modelingData.YLength,
            ZLength: this._modelingData.ZLength
          }
        };

        const productId = HSCore.Util.String.randomGUID();
        const productData: ProductData = {
          id: productId,
          productType: HSCatalog.ProductTypeEnum.Model,
          contentType: `${HSCatalog.ContentTypeEnum.CustomizedContent}/smart customized ceiling`,
          attributes: [modifiedAttribute, createdByAttribute],
          free: JSON.stringify(modelData)
        };

        return catalogManager.getProductBySeekId(
          productId,
          { data: productData },
          HSCatalog.OriginalMetaCreatorType.Local,
          HSCatalog.MetaCreatorType.Generic
        );
      })
      .then((product) => {
        const rotation = this._rotation;

        product.defineExtendedFields({
          sizeRangeType: this._modelingData.sizeRangeType,
          parameters: this._parameters
        });

        const isMain2DView = app.isMain2DViewActive();
        const options: AddProductOptions = {
          ignoreSnapOffset: true,
          defaultGround: isMain2DView,
          lightingMatrixArrangedEnable: isMain2DView ? true : undefined
        };

        if (
          product.contentType.isTypeOf(
            HSCatalog.ContentTypeEnum.ext_ForceKeepZAxis
          )
        ) {
          options.forceKeepZAxis = true;
          options.constraintInRoom = true;
        }

        const transManager = app.transManager;
        const request = transManager.createRequest(
          HSFPConstants.RequestType.AddProduct,
          [product, this._position, rotation, null, this._host]
        );

        transManager.commit(request);

        const result = request.result;
        result._pamatricPath = this._outline;
        result._hostPolygon = this._hostPolygon;
        result.refreshBoundInternal();

        const currentCommand = app.cmdManager.current;
        if (
          currentCommand?.type === HSFPConstants.CommandType.CreateParametricCeiling
        ) {
          currentCommand.mgr.complete(currentCommand);
        }

        return result;
      });
  }

  canUndoRedo(): boolean {
    return false;
  }

  complete(): void {
    super.complete([]);
  }

  getDescription(): string {
    return "创建参数化吊顶";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}