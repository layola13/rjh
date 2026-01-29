interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface ProductData {
  position?: number[];
  posZ?: number;
}

interface Product {
  id: string;
  proxyId?: string;
  data?: ProductData;
  t3dRotation?: Rotation | number;
  rotation?: Rotation | number;
  position?: Position;
  posZ?: number;
  scale?: number;
  flip?: boolean;
  replacedMaterial?: unknown;
}

interface GroupMetadata {
  contentType?: unknown;
  seekId?: string;
  unit?: string;
  defaultHeight?: number;
}

interface Group {
  subContent: number[];
  subGroup: number[];
  metadata: GroupMetadata;
}

interface Meta {
  replacedMaterial?: unknown;
  productDataById: Record<string, unknown>;
  products: Product[];
  groups?: Group[];
  seekId?: string;
  contentType?: {
    isTypeOf: (type: unknown) => boolean;
  };
  unit?: string;
  defaultHeight?: number;
}

interface Request {
  commit(): void;
  result: ContentResult;
}

interface ContentResult {
  x: number;
  y: number;
  z?: number;
  ZSize?: number;
  ZRotation?: number;
  XRotation?: number;
  YRotation?: number;
  assemblySeekId?: string;
  assignTo(host: unknown): void;
}

interface RequestManager {
  createRequest(type: string, args: unknown[]): Request;
}

interface CompositeRequest {
  mgr: RequestManager;
  append(request: Request): void;
}

export default class ContentGroupRequest extends (HSCore.Transaction.Common.CompositeRequest as unknown as new () => CompositeRequest) {
  private readonly _meta: Meta;
  private readonly _position: Position;
  private readonly _rotation: Rotation | number;
  private readonly _host?: unknown;
  private readonly _scale?: number;

  constructor(
    meta: Meta,
    position?: Position,
    rotation?: Rotation | number,
    scale?: number,
    host?: unknown
  ) {
    super();
    this._meta = meta;
    this._position = position ?? { x: 0, y: 0, z: undefined };
    this._rotation = rotation ?? 0;
    this._host = host;
    this._scale = scale;
  }

  onCommit(): ContentResult {
    const { _meta: meta } = this;
    const { replacedMaterial, productDataById, products } = meta;

    const requests = products.map((product) => {
      if (product.proxyId !== undefined) {
        if (product.data?.position && product.data.posZ !== undefined) {
          product.data.position[2] = product.data.posZ;
        }
        return this.mgr.createRequest(HSFPConstants.RequestType.AddProxyModelRequest, [product]);
      }

      const rotation = product.t3dRotation ?? product.rotation;
      const position = product.position;

      if (position && product.posZ !== undefined) {
        position.z = product.posZ;
      }

      return this.mgr.createRequest(HSFPConstants.RequestType.AddContent, [
        productDataById[product.id],
        position,
        rotation,
        product.scale,
        null,
        product.flip,
        product.replacedMaterial ?? replacedMaterial
      ]);
    });

    requests.forEach((request) => {
      request.commit();
      this.append(request);
    });

    const results = requests.map((request) => request.result);

    let groupRequest: Request;

    if (meta.groups && meta.groups.length > 0) {
      const groupResults: ContentResult[] = [];

      for (let groupIndex = meta.groups.length - 1; groupIndex >= 0; groupIndex--) {
        const groupContents: ContentResult[] = [];

        meta.groups[groupIndex].subContent.forEach((contentIndex) => {
          const result = results[contentIndex];
          if (result) {
            groupContents.push(result);
          }
        });

        meta.groups[groupIndex].subGroup.forEach((subGroupIndex) => {
          const result = groupResults[subGroupIndex];
          if (result) {
            groupContents.push(result);
          }
        });

        if (groupIndex === 0) {
          groupRequest = this.mgr.createRequest(HSFPConstants.RequestType.GroupContents, [groupContents, meta]);
        } else {
          const metadata = meta.groups[groupIndex].metadata;
          if (metadata.contentType) {
            metadata.contentType = new HSCatalog.ContentType(metadata.contentType);
          }
          groupRequest = this.mgr.createRequest(HSFPConstants.RequestType.GroupContents, [groupContents, metadata]);
        }

        groupRequest.commit();
        this.append(groupRequest);
        groupResults[groupIndex] = groupRequest.result;
      }
    } else {
      if (results.length === 1) {
        const singleResult = results[0];
        singleResult.x = this._position.x;
        singleResult.y = this._position.y;

        if (this._position.z !== undefined) {
          singleResult.z = this._position.z;
        }

        singleResult.assemblySeekId = meta.seekId;
        return singleResult;
      }

      groupRequest = this.mgr.createRequest(HSFPConstants.RequestType.GroupContents, [results, meta]);
      groupRequest.commit();
      this.append(groupRequest);
    }

    const finalResult = groupRequest.result;
    finalResult.x = this._position.x;
    finalResult.y = this._position.y;

    if (this._position.z !== undefined) {
      finalResult.z = this._position.z;
    } else if (meta.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
      const floorplan = HSApp.App.getApp().floorplan;
      finalResult.z = floorplan.global_wall_height3d - (finalResult.ZSize ?? 0);
    } else if (meta.unit && meta.defaultHeight) {
      finalResult.z = meta.defaultHeight;
    }

    if (typeof this._rotation === 'number') {
      finalResult.ZRotation = this._rotation;
    } else {
      finalResult.XRotation = this._rotation.x;
      finalResult.YRotation = this._rotation.y;
      finalResult.ZRotation = this._rotation.z;
    }

    if (this._host) {
      finalResult.assignTo(this._host);
    }

    return finalResult;
  }
}