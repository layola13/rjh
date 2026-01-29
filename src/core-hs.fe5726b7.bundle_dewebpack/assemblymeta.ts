export enum MetadataEnum {
  designName = "name",
  description = "description",
  documentStatus = "status",
  attributes = "attributes",
  designId = "",
  threeDThumbnail = "",
  userId = "",
  meta = "",
  image3d = "image3d",
  image2d = "image2d",
  versionId = "",
  assetType = "assetType",
  mainAssetId = "mainAssetId",
  originalAccessoryAssetId = "originalAccessoryAssetId",
  newAccessoryAssetId = "newAccessoryAssetId",
  removedAccessoryAssetId = "removedAccessoryAssetId",
  designVersion = "designVersion",
  address = "address",
  basicAttributes = "basicAttributes",
  originApartmentId = "originApartmentId"
}

export enum DocumentStatus {
  Private = 0,
  Public = 1,
  Deleted = 2,
  Readonly = 5
}

export enum FloorplanMeta {
  magic = "u6tklt3u60yg",
  version = "1.11",
  unit = "meter",
  keywords = "Homestyler web designer editor",
  customizationVersion = "0.2"
}

export const FloorplanVersion = Object.freeze({
  MIN: "0.1",
  MAX: FloorplanMeta.version
});

export enum AssemblyMeta {
  version = "0.1",
  origin = "Floorplan web editor",
  magic = "171bd2f43d70",
  unit = "cm"
}

interface MetadataAttributes {
  [key: string]: unknown;
}

interface MetadataObject {
  designId?: string;
  designName?: string;
  threeDThumbnail?: string;
  description?: string;
  documentStatus?: DocumentStatus;
  userId?: string;
  versionId?: string;
  originApartmentId?: string;
  magic?: string;
  activeView?: string;
  cameraMode2d?: string;
  cameraMode3d?: unknown;
  attributes?: MetadataAttributes;
  [key: string]: unknown;
}

interface DesignMetaInput {
  name?: string;
  description?: string;
  status?: DocumentStatus;
  userId?: string;
  versionId?: string;
  meta?: {
    image?: { url?: string };
    image2d?: { url?: string };
    bom?: unknown;
  };
  newAccessoryAssetId?: string;
  originalAccessoryAssetId?: string;
  removedAccessoryAssetId?: string;
  address?: unknown;
  basicAttributes?: unknown;
  originApartmentId?: string;
  attributes?: string | Array<{ free?: string[] }>;
}

interface DesignMetaOutput {
  designId?: string;
  designName?: string;
  description?: string;
  documentStatus?: DocumentStatus;
  image3d?: string;
  userId?: string;
  designVersion?: string;
  meta?: {
    image2d?: { url?: string };
    bom?: unknown;
  };
  image2d?: string;
  newAccessoryAssetId?: string;
  originalAccessoryAssetId?: string;
  removedAccessoryAssetId?: string;
  attributes?: unknown;
  address?: unknown;
  basicAttributes?: unknown;
  originApartmentId?: string;
}

interface MetadataChanges {
  attributes?: MetadataAttributes;
  [key: string]: unknown;
}

export class Metadata {
  private _metadataMap: Map<string, unknown>;
  private _attributes: Map<string, unknown>;
  private _changedValues: Map<string, unknown>;
  private _changedAttributes: Map<string, unknown>;
  private _flushCallbacks: Array<Promise<unknown>>;

  constructor() {
    this._metadataMap = new Map();
    this._attributes = new Map();
    this._changedValues = new Map();
    this._changedAttributes = new Map();
    this._flushCallbacks = [];
    this.init();
  }

  init(): void {
    this._metadataMap.clear();
    this._attributes.clear();
    this._changedValues.clear();
    this._changedAttributes.clear();
    this._flushCallbacks = [];
    this._metadataMap.set("designId", "");
    this._metadataMap.set("designName", "");
    this._metadataMap.set("threeDThumbnail", "");
    this._metadataMap.set("description", "");
    this._metadataMap.set("documentStatus", DocumentStatus.Private);
    this._metadataMap.set("userId", "");
    this._metadataMap.set("versionId", "");
    this._metadataMap.set("originApartmentId", "");
    this.set("magic", FloorplanMeta.magic);
    this.set("activeView", "svg");
    this.set("cameraMode2d", "plane");
    this.set("cameraMode3d", HSCore.Model.CameraTypeEnum.OrbitView);
  }

  reset(): void {
    this._metadataMap.clear();
    this._attributes.clear();
    this._changedValues.clear();
    this._changedAttributes.clear();
    this._flushCallbacks = [];
    this.set("designId", "");
    this.set("designName", "");
    this.set("threeDThumbnail", "");
    this.set("description", "");
    this.set("documentStatus", DocumentStatus.Private);
    this.set("magic", FloorplanMeta.magic);
    this.set("userId", "");
    this.set("versionId", "");
    this.set("originApartmentId", "");
    this.set("activeView", "svg");
    this.set("cameraMode2sd", "plane");
    this.set("cameraMode3d", HSCore.Model.CameraTypeEnum.OrbitView);
  }

  get(key: string): unknown {
    if (!key) return;
    
    if (key === "attributes") {
      const attributesObject: MetadataAttributes = {};
      this._attributes.forEach((value, attrKey) => {
        attributesObject[attrKey] = value;
      });
      return attributesObject;
    }
    
    let value = this._metadataMap.get(key);
    if (value === undefined) {
      value = this._attributes.get(key);
    }
    return value;
  }

  delete(key: string, attributeKey?: string): boolean {
    if (!key) return false;
    
    let deleted = false;
    if (key === "attributes" && attributeKey) {
      deleted = this._attributes.delete(attributeKey);
      if (deleted) {
        this._changedAttributes.set(attributeKey, undefined);
      }
    } else {
      deleted = this._metadataMap.delete(key);
      if (deleted) {
        this._changedValues.set(key, undefined);
        return deleted;
      }
      deleted = this._attributes.delete(key);
      if (deleted) {
        this._changedAttributes.set(key, undefined);
        return deleted;
      }
    }
    return deleted;
  }

  set(key: string, value: unknown): void {
    if (!key) return;
    
    const existingValue = this._metadataMap.get(key);
    if (existingValue && existingValue === value) return;
    
    if (key === "attributes") {
      Object.keys(value as MetadataAttributes).forEach((attrKey) => {
        this.setAttribute(attrKey, (value as MetadataAttributes)[attrKey]);
      });
    } else if (MetadataEnum[key as keyof typeof MetadataEnum] !== undefined) {
      this.setValue(key, value);
    } else {
      this.setAttribute(key, value);
    }
  }

  setValue(key: string, value: unknown): void {
    if (!key) return;
    
    if (this._metadataMap.get(key) === value) return;
    
    if (value === undefined) {
      this._metadataMap.delete(key);
      this._changedValues.set(key, undefined);
    } else {
      this._metadataMap.set(key, value);
      this._changedValues.set(key, value);
    }
  }

  setAttribute(key: string, value: unknown): void {
    if (!key) return;
    
    if (this._attributes.get(key) === value) return;
    
    if (value === undefined) {
      this._attributes.delete(key);
      this._changedAttributes.set(key, undefined);
    } else {
      this._attributes.set(key, value);
      this._changedAttributes.set(key, value);
    }
  }

  toObject(): MetadataObject {
    const metadataObj: MetadataObject = {};
    const attributesObj: MetadataAttributes = {};
    
    this._metadataMap.forEach((value, key) => {
      metadataObj[key] = value;
    });
    
    this._attributes.forEach((value, key) => {
      attributesObj[key] = value;
    });
    
    metadataObj.attributes = attributesObj;
    return metadataObj;
  }

  fromObject(obj: MetadataObject): this {
    const data = obj || {};
    const attributes = data.attributes || {};
    
    Object.keys(data).forEach((key) => {
      if (key !== "attributes") {
        this.setValue(key, data[key]);
      }
    });
    
    Object.keys(attributes).forEach((key) => {
      this.setAttribute(key, attributes[key]);
    });
    
    return this;
  }

  load(designData: DesignMetaInput): this {
    const designMeta = Metadata.getDesignMeta(undefined, designData);
    return this.fromObject(designMeta);
  }

  flush(): Promise<unknown[]> {
    if (this._changedValues.size > 0 || this._changedAttributes.size > 0) {
      const changes: MetadataChanges = {
        attributes: undefined
      };
      
      this._changedValues.forEach((value, key) => {
        changes[key] = value;
      });
      
      const changedAttrs: MetadataAttributes = {};
      this._changedAttributes.forEach((value, key) => {
        changedAttrs[key] = value;
      });
      
      changes.attributes = changedAttrs;
      HSCore.Doc.getDocManager().signalMetadataChanged.dispatch(changes);
      
      this._changedValues.clear();
      this._changedAttributes.clear();
      
      return this._flushCallbacks.length 
        ? Promise.all(this._flushCallbacks) 
        : Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  registerFlushCallback(callback: Promise<unknown>): void {
    this._flushCallbacks.push(callback);
  }

  unregisterFlushCallback(callback: Promise<unknown>): void {
    (this._flushCallbacks as any).xRemove(callback);
  }

  static getDesignMeta(designId: string | undefined, data: DesignMetaInput): DesignMetaOutput {
    const dataCopy = { ...data };
    const result: DesignMetaOutput = {
      designId,
      designName: dataCopy.name,
      description: dataCopy.description,
      documentStatus: dataCopy.status,
      image3d: dataCopy.meta?.image?.url,
      userId: dataCopy.userId,
      designVersion: dataCopy.versionId,
      meta: {
        image2d: undefined,
        bom: undefined
      },
      image2d: undefined,
      newAccessoryAssetId: undefined,
      originalAccessoryAssetId: undefined,
      removedAccessoryAssetId: undefined,
      attributes: undefined,
      address: undefined,
      basicAttributes: undefined,
      originApartmentId: ""
    };
    
    if (data.meta) {
      if (data.meta.image2d) {
        result.meta!.image2d = data.meta.image2d;
        result.image2d = data.meta.image2d.url;
      }
      if (data.meta.bom) {
        result.meta!.bom = data.meta.bom;
      }
    }
    
    if (data.newAccessoryAssetId) {
      result.newAccessoryAssetId = data.newAccessoryAssetId;
    }
    if (data.originalAccessoryAssetId) {
      result.originalAccessoryAssetId = data.originalAccessoryAssetId;
    }
    if (data.removedAccessoryAssetId) {
      result.removedAccessoryAssetId = data.removedAccessoryAssetId;
    }
    if (data.address) {
      result.address = data.address;
    }
    if (data.basicAttributes) {
      result.basicAttributes = data.basicAttributes;
    }
    if (data.originApartmentId) {
      result.originApartmentId = data.originApartmentId;
    }
    
    try {
      if (Array.isArray(data.attributes) && data.attributes[0]?.free) {
        result.attributes = JSON.parse(data.attributes[0].free[0]);
      } else if (typeof data.attributes === 'string') {
        result.attributes = JSON.parse(data.attributes);
      }
    } catch (error) {
      // Silently handle parse errors
    }
    
    return result;
  }
}