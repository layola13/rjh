import { ProductMeta, MaterialMap, ProductData } from './types';

interface CustomFunctionStartPayload {
  key: string;
}

export default class AddProductCommand extends HSApp.Cmd.Command {
  private _productMeta: ProductMeta;
  private _position: number[];
  private _rotation: number[];
  private _scale: number[];
  private _host: unknown;
  private _materialMap: MaterialMap;
  private _data: ProductData;

  constructor(
    productMeta: ProductMeta,
    position: number[],
    rotation: number[],
    scale: number[],
    host: unknown,
    materialMap: MaterialMap | null,
    data: ProductData
  ) {
    super();
    this._productMeta = productMeta;
    this._position = position;
    this._rotation = rotation;
    this._scale = scale;
    this._host = host;
    this._materialMap = materialMap ?? new Map();
    this._data = data;
  }

  onExecute(): unknown {
    this.onCustomFunctionStart();

    const transManager = this.context.transManager;
    let requestType = HSFPConstants.RequestType.AddProduct;
    let requestArgs: unknown[] = [
      this._productMeta,
      this._position,
      this._rotation,
      this._scale,
      this._host,
      this._materialMap,
      this._data
    ];

    if (this._productMeta?.productType === HSCatalog.ProductTypeEnum.DAssembly) {
      requestType = HSFPConstants.RequestType.AddDAssembly;
      requestArgs = [
        this._productMeta,
        this._position,
        this._rotation,
        this._scale,
        this._host,
        null,
        this._materialMap,
        this._data
      ];
    }

    const request = transManager.createRequest(requestType, requestArgs);
    transManager.commit(request);

    this.output = request.result;
    this.mgr.complete(this);

    return this.output;
  }

  canUndoRedo(): boolean {
    return false;
  }

  onCustomFunctionStart(): void {
    if (this._productMeta?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedPMCeiling)) {
      const app = HSApp.App.getApp();
      app.signalCustomFunctionStart?.dispatch({
        key: "NCustomizedFeatureModel.NCustomizedCeilingModel.NCustomizedParametricCeiling"
      });
    }
  }

  getDescription(): string {
    return "添加物品至画布";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}