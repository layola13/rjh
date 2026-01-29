interface Meta {
  productType: HSCatalog.ProductTypeEnum;
  contentType: HSCatalog.ContentType;
}

interface MaterialMap extends Map<unknown, unknown> {}

class AddContentTransaction extends HSCore.Transaction.Common.CompositeRequest {
  private _meta: Meta;
  private _position: unknown;
  private _rotation: unknown;
  private _scale: unknown;
  private _host: unknown;
  private _materialMap: MaterialMap;
  private _data: unknown;
  private _extraData: unknown;

  constructor(
    meta: Meta,
    position: unknown,
    rotation: unknown,
    scale: unknown,
    host: unknown,
    materialMap: MaterialMap | null,
    data: unknown,
    extraData: unknown
  ) {
    super();
    this._meta = meta;
    this._position = position;
    this._rotation = rotation;
    this._scale = scale;
    this._host = host;
    this._materialMap = materialMap || new Map();
    this._data = data;
    this._extraData = extraData;
  }

  onCommit(): unknown {
    if (this._meta && this._meta.productType) {
      const meta = this._meta;
      const args: [
        Meta,
        unknown,
        unknown,
        unknown,
        unknown,
        null,
        MaterialMap,
        unknown,
        unknown
      ] = [
        meta,
        this._position,
        this._rotation,
        this._scale,
        this._host,
        null,
        this._materialMap,
        this._data,
        this._extraData
      ];

      const RequestType = HSFPConstants.RequestType;
      let requestType = RequestType.AddContent;

      switch (meta.productType) {
        case HSCatalog.ProductTypeEnum.Assembly:
          requestType = RequestType.AddAssembly;
          break;
        case HSCatalog.ProductTypeEnum.PAssembly:
          requestType = RequestType.AddPAssembly;
          break;
        case HSCatalog.ProductTypeEnum.PAssemblyPackage:
          requestType = RequestType.AddPAssemblyPackage;
          break;
        case HSCatalog.ProductTypeEnum.DAssembly:
          requestType = RequestType.AddDAssembly;
          break;
        case HSCatalog.ProductTypeEnum.Model:
          const contentType = meta.contentType;
          if (HSCore.Util.Content.isParametricOpening(meta)) {
            requestType = RequestType.AddParametricOpening;
          } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_opening)) {
            requestType = RequestType.AddOpening;
          } else if (HSCore.Util.Content.isCornerWindow(meta)) {
            if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerWindow)) {
              requestType = RequestType.AddCornerWindow;
            } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow)) {
              requestType = RequestType.AddBayWindow;
            } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerFlatWindow)) {
              requestType = RequestType.AddCornerFlatWindow;
            } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.POrdinaryWindow)) {
              requestType = RequestType.AddPOrdinaryWindow;
            }
          } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Obstacle)) {
            requestType = RequestType.AddStructure;
          } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam)) {
            requestType = RequestType.AddBeam;
          } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.MeshContent)) {
            requestType = RequestType.AddMeshContent;
          } else {
            requestType = RequestType.AddContent;
          }
          break;
        default:
          console.assert(false, `product type ${meta.productType} unsupported!`);
      }

      this.append(this.mgr.createRequest(requestType, args));
      return super.onCommit([]);
    }
  }

  getDescription(): string {
    return "添加物品至画布";
  }

  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default AddContentTransaction;