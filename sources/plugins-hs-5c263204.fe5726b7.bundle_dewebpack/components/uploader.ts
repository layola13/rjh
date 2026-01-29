interface ModelMetadata {
  version: string;
  origin: string;
  magic: string;
  unit: string;
}

interface BoundingBox {
  xLen: number;
  yLen: number;
  zLen: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ProductData {
  id: string;
  position: Position;
  posZ: number;
  rotation: number;
  t3dRotation: Rotation;
  scale: Scale;
  flip: boolean;
  variation?: string;
}

interface ContentData {
  meta: ModelMetadata;
  boundingBox: BoundingBox;
  Products: ProductData[];
}

interface MaterialMapItem {
  seekId: string;
  name: string;
  categoryId: string;
  textureURI: string;
  textureURIDefault: string;
  iconSmallURI: string;
  iconLargeURI: string;
  colorMode: string;
  tileSize_x: number;
  tileSize_y: number;
  initTileSize_x: number;
  initTileSize_y: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  seamColor: string;
  blendColor: string;
}

interface MaterialData {
  materialMap: Record<string, MaterialMapItem>;
  material: Record<string, unknown>;
  materialList: unknown[];
  sceneRoom: unknown[];
}

interface UploadFileParams {
  contentType: string;
  tenant: string;
  fileName: string;
  acl: string;
}

interface UploadFileResult {
  uploadFileUrl: string;
  storageUrl: string;
}

interface FileUploadOption {
  contentType: boolean;
  processData: boolean;
  dataType: undefined;
  headers: {
    'x-oss-object-acl': string;
  };
}

interface BlobResult {
  file: File;
  option: FileUploadOption;
}

interface ProductAttribute {
  id: string;
  name: string;
  valuesIds: string[];
  free: string[];
}

interface ProductFile {
  metaData: string;
  url: string;
}

interface SaveProductRequest {
  attributes: ProductAttribute[];
  files: ProductFile[];
  productTypeName: string;
}

interface CreateProductParams {
  envType: string;
  saveProductRequest: SaveProductRequest;
}

interface Entity {
  seekId: string;
  variationId: string;
  id: string;
  bound: unknown;
  ZSize: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  flip: boolean;
  materialsMap: Map<string, unknown>;
  metadata: {
    isSearchable: boolean;
  };
  isFlagOn(flag: unknown): boolean;
}

const MODEL_METADATA: ModelMetadata = {
  version: "0.1",
  origin: "Floorplan web editor",
  magic: "171bd2f43d70",
  unit: "cm"
};

const CM_TO_UNIT_MULTIPLIER = 100;

const ATTRIBUTE_IDS = {
  CONTAINS_PUBLIC_MODEL: "attr-containsPublicModelOnly",
  CONTENT_TYPE: "dbd9b78c-fbae-4931-ac30-ff218059b3c6",
  REPLACE_MATERIAL_ORIGINAL: "attr-replace-material-original-jid"
} as const;

const ATTRIBUTE_VALUE_IDS = {
  PUBLIC_MODEL_TRUE: "attr-containsPublicModelOnly-true",
  PUBLIC_MODEL_FALSE: "attr-containsPublicModelOnly-false",
  CONTENT_TYPE_ASSEMBLY: "a31bf19a-023c-4313-8946-dba3b1a5963b"
} as const;

export class Uploader {
  /**
   * Creates a 3D model by exporting content and material data, uploading them, and creating a product
   */
  async createModel(entity: Entity): Promise<unknown> {
    const contentJson = this.exportContentData(entity);
    const contentUploadPromise = this.uploadJson(contentJson, "assembly");
    
    const materialJson = this.exportMaterialData(entity);
    const materialUploadPromise = this.uploadJson(materialJson, "material");

    const uploadResults = await Promise.all([contentUploadPromise, materialUploadPromise]).catch((error) => {
      throw error;
    });

    const product = await this.createProduct(uploadResults, entity);
    return product;
  }

  /**
   * Exports entity content data including bounding box and transformation properties
   */
  exportContentData(entity: Entity): string {
    if (entity.isFlagOn((window as any).HSCore.Model.EntityFlagEnum.removed)) {
      return "";
    }

    const brepBound = new (window as any).HSCore.Util.BrepBound();
    brepBound.reset();
    brepBound.appendBound(entity.bound);

    const dimensions = {
      x: brepBound.width,
      y: brepBound.height,
      z: entity.ZSize
    };

    const convertToCentimeters = (value: number): number => {
      return CM_TO_UNIT_MULTIPLIER * value;
    };

    const contentData: ContentData = {
      meta: MODEL_METADATA,
      boundingBox: {
        xLen: convertToCentimeters(dimensions.x),
        yLen: convertToCentimeters(dimensions.y),
        zLen: convertToCentimeters(dimensions.z)
      },
      Products: []
    };

    const productData: ProductData = {
      id: entity.seekId,
      position: { x: 0, y: 0, z: 0 },
      posZ: entity.z,
      rotation: entity.rotation,
      t3dRotation: {
        x: entity.XRotation,
        y: entity.YRotation,
        z: entity.ZRotation
      },
      scale: {
        XScale: entity.XScale,
        YScale: entity.YScale,
        ZScale: entity.ZScale
      },
      flip: entity.flip
    };

    if (entity.variationId !== entity.seekId) {
      productData.variation = entity.variationId;
    }

    contentData.Products.push(productData);

    return JSON.stringify(contentData, (_key: string, value: unknown) => {
      return value != null && typeof value === 'number' && !Number.isInteger(value)
        ? Number(value.toFixed(6))
        : value;
    });
  }

  /**
   * Exports material data including texture mappings and rendering information
   */
  exportMaterialData(entity: Entity): string {
    const app = (window as any).HSApp.App.getApp();

    const materialData: MaterialData = {
      materialMap: {},
      material: {},
      materialList: [],
      sceneRoom: []
    };

    entity.materialsMap.forEach((materialValue: any, materialKey: string) => {
      const [materialInfo] = materialValue.dump();
      const {
        seekId,
        name,
        categoryId,
        textureURI,
        textureURIDefault,
        iconSmallURI,
        iconLargeURI,
        colorMode,
        tileSize_x,
        tileSize_y,
        initTileSize_x,
        initTileSize_y,
        rotation,
        offsetX,
        offsetY,
        seamColor,
        blendColor
      } = materialInfo;

      materialData.materialMap[materialKey] = {
        seekId,
        name,
        categoryId,
        textureURI,
        textureURIDefault,
        iconSmallURI,
        iconLargeURI,
        colorMode,
        tileSize_x,
        tileSize_y,
        initTileSize_x,
        initTileSize_y,
        rotation,
        offsetX,
        offsetY,
        seamColor,
        blendColor
      };
    });

    const graphicsData = app.geometryManager.getGraphicsData(entity.id);
    const parsedData = (window as any).HSRender.FgiParser.parseFgiData(graphicsData, true);
    const { material, materialList, sceneRoom } = parsedData;

    Object.assign(materialData, {
      material,
      materialList,
      sceneRoom
    });

    return JSON.stringify(materialData, (_key: string, value: unknown) => {
      return value != null && typeof value === 'number' && !Number.isInteger(value)
        ? Number(value.toFixed(6))
        : value;
    });
  }

  /**
   * Uploads JSON data as a file to cloud storage
   */
  async uploadJson(jsonData: string, fileType: string): Promise<UploadFileResult> {
    const fileName = `${fileType}-${new Date().toUTCString()}.json`;
    const uploadInfo = await this.uploadFile(fileName, "application/json");
    return this.blobToDataURI(uploadInfo, jsonData, fileType);
  }

  /**
   * Gets a pre-signed upload URL from the catalog service
   */
  async uploadFile(fileName: string, contentType: string): Promise<UploadFileResult> {
    const params: UploadFileParams = {
      contentType,
      tenant: (window as any).HSApp.Config.PIM_TENANT,
      fileName,
      acl: "public-read"
    };

    return (window as any).NWTK.mtop.Catalog.getUploadFileUrl({ data: params })
      .then((response: any) => {
        const { data } = response;
        if (response?.ret[0].includes("SUCCESS") && data?.result) {
          return data.result;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => {
        return Promise.reject(error);
      });
  }

  /**
   * Converts JSON string to Blob and prepares file for upload
   */
  async blobToDataURI(
    uploadInfo: UploadFileResult,
    jsonData: string,
    fileType: string
  ): Promise<UploadFileResult> {
    const blobResult = await new Promise<BlobResult>((resolve, reject) => {
      const blob = new Blob([jsonData], {
        type: `application/json;charset=${document.characterSet}`
      });

      const fileReader = new FileReader();
      
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const fileName = `${fileType}-${new Date().toUTCString()}.json`;
        const file = (window as any).dataURLtoFile(event.target?.result, fileName);
        
        resolve({
          file,
          option: {
            contentType: false,
            processData: false,
            dataType: undefined,
            headers: {
              'x-oss-object-acl': 'public-read'
            }
          }
        });
      };

      fileReader.readAsDataURL(blob);
    });

    return this.putFile(uploadInfo, blobResult.file, blobResult.option)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  /**
   * Uploads file to storage using pre-signed URL
   */
  async putFile(
    uploadInfo: UploadFileResult,
    file: File,
    options: FileUploadOption
  ): Promise<UploadFileResult> {
    return (window as any).NWTK.ajax.put(uploadInfo.uploadFileUrl, file, options)
      .then(() => {
        return uploadInfo;
      })
      .catch((error: unknown) => {
        console.log(error);
        throw error;
      });
  }

  /**
   * Creates a product in the catalog with uploaded files
   */
  async createProduct(
    uploadResults: UploadFileResult[],
    entity: Entity
  ): Promise<unknown> {
    const app = (window as any).HSApp.App.getApp();
    const isSearchable = !!entity.metadata.isSearchable;

    const params: CreateProductParams = {
      envType: app.defaultEnvironmentId,
      saveProductRequest: this.getProductData(uploadResults, isSearchable, entity.seekId)
    };

    return (window as any).NWTK.mtop.Catalog.saveProduct({ data: params })
      .then((response: any) => {
        const { data } = response;
        if (response?.ret[0].includes("SUCCESS") && data?.result) {
          return data.result;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => {
        return Promise.reject(error);
      });
  }

  /**
   * Constructs product save request with attributes and file references
   */
  getProductData(
    uploadResults: UploadFileResult[],
    isSearchable: boolean,
    originalSeekId: string
  ): SaveProductRequest {
    return {
      attributes: [
        {
          id: ATTRIBUTE_IDS.CONTAINS_PUBLIC_MODEL,
          name: "isSearch",
          valuesIds: [
            isSearchable
              ? ATTRIBUTE_VALUE_IDS.PUBLIC_MODEL_TRUE
              : ATTRIBUTE_VALUE_IDS.PUBLIC_MODEL_FALSE
          ],
          free: []
        },
        {
          id: ATTRIBUTE_IDS.CONTENT_TYPE,
          name: "ContentType",
          valuesIds: [ATTRIBUTE_VALUE_IDS.CONTENT_TYPE_ASSEMBLY],
          free: []
        },
        {
          id: ATTRIBUTE_IDS.REPLACE_MATERIAL_ORIGINAL,
          name: "replaceMaterialOriginalJid",
          valuesIds: [],
          free: [originalSeekId]
        }
      ],
      files: [
        {
          metaData: "scene",
          url: uploadResults[0].storageUrl
        },
        {
          metaData: "replacedMaterial",
          url: uploadResults[1].storageUrl
        }
      ],
      productTypeName: (window as any).HSCatalog.ProductTypeEnum.Assembly
    };
  }
}