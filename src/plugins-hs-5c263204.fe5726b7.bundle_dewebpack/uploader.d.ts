/**
 * Uploader module for handling 3D model upload and product creation
 * @module Uploader
 */

/**
 * Metadata structure for exported content
 */
interface ExportMetadata {
  /** Version identifier */
  version: string;
  /** Origin application name */
  origin: string;
  /** Unique magic identifier */
  magic: string;
  /** Measurement unit */
  unit: string;
}

/**
 * 3D bounding box dimensions
 */
interface BoundingBox {
  /** Width in centimeters */
  xLen: number;
  /** Height in centimeters */
  yLen: number;
  /** Depth in centimeters */
  zLen: number;
}

/**
 * 3D position coordinates
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D rotation angles
 */
interface Rotation {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D scale factors
 */
interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * Product data structure in exported content
 */
interface ProductData {
  /** Product identifier */
  id: string;
  /** Product position in 3D space */
  position: Position;
  /** Z-axis position */
  posZ: number;
  /** Rotation angle */
  rotation: number;
  /** 3D rotation angles */
  t3dRotation: Rotation;
  /** Scale factors */
  scale: Scale;
  /** Flip state */
  flip: boolean;
  /** Optional variation identifier */
  variation?: string;
}

/**
 * Exported content data structure
 */
interface ExportedContent {
  /** Metadata information */
  meta: ExportMetadata;
  /** Bounding box dimensions */
  boundingBox: BoundingBox;
  /** Array of products */
  Products: ProductData[];
}

/**
 * Material properties
 */
interface MaterialProperties {
  /** Material seek ID */
  seekId: string;
  /** Material name */
  name: string;
  /** Category identifier */
  categoryId: string;
  /** Texture URI */
  textureURI: string;
  /** Default texture URI */
  textureURIDefault: string;
  /** Small icon URI */
  iconSmallURI: string;
  /** Large icon URI */
  iconLargeURI: string;
  /** Color mode */
  colorMode: string;
  /** Tile size X */
  tileSize_x: number;
  /** Tile size Y */
  tileSize_y: number;
  /** Initial tile size X */
  initTileSize_x: number;
  /** Initial tile size Y */
  initTileSize_y: number;
  /** Rotation angle */
  rotation: number;
  /** Offset X */
  offsetX: number;
  /** Offset Y */
  offsetY: number;
  /** Seam color */
  seamColor: string;
  /** Blend color */
  blendColor: string;
}

/**
 * Material export data structure
 */
interface MaterialExportData {
  /** Material mapping */
  materialMap: Record<string, MaterialProperties>;
  /** Material data */
  material: unknown;
  /** Material list */
  materialList: unknown[];
  /** Scene room data */
  sceneRoom: unknown[];
}

/**
 * Upload file result
 */
interface UploadFileResult {
  /** Upload file URL */
  uploadFileUrl: string;
  /** Storage URL */
  storageUrl: string;
}

/**
 * File upload options
 */
interface UploadOptions {
  contentType: boolean | string;
  processData: boolean;
  dataType: string | undefined;
  headers: Record<string, string>;
}

/**
 * Blob to data URI result
 */
interface BlobConversionResult {
  /** File object */
  file: File;
  /** Upload options */
  option: UploadOptions;
}

/**
 * Product attribute value
 */
interface ProductAttribute {
  /** Attribute identifier */
  id: string;
  /** Attribute name */
  name: string;
  /** Array of value identifiers */
  valuesIds: string[];
  /** Array of free-form values */
  free: string[];
}

/**
 * Product file metadata
 */
interface ProductFile {
  /** Metadata type */
  metaData: string;
  /** File URL */
  url: string;
}

/**
 * Product save request data
 */
interface SaveProductRequest {
  /** Product attributes */
  attributes: ProductAttribute[];
  /** Associated files */
  files: ProductFile[];
  /** Product type name */
  productTypeName: string;
}

/**
 * Product creation data
 */
interface ProductCreationData {
  /** Environment type */
  envType: string;
  /** Save product request */
  saveProductRequest: SaveProductRequest;
}

/**
 * Product creation result
 */
interface ProductCreationResult {
  /** Result data */
  result: unknown;
}

/**
 * Entity model interface (simplified)
 */
interface EntityModel {
  /** Entity identifier */
  id: string;
  /** Seek identifier */
  seekId: string;
  /** Variation identifier */
  variationId: string;
  /** Entity bound */
  bound: unknown;
  /** Z size */
  ZSize: number;
  /** Z position */
  z: number;
  /** Rotation */
  rotation: number;
  /** X rotation */
  XRotation: number;
  /** Y rotation */
  YRotation: number;
  /** Z rotation */
  ZRotation: number;
  /** X scale */
  XScale: number;
  /** Y scale */
  YScale: number;
  /** Z scale */
  ZScale: number;
  /** Flip state */
  flip: boolean;
  /** Materials map */
  materialsMap: Map<string, unknown>;
  /** Metadata */
  metadata: {
    isSearchable: boolean;
  };
  /**
   * Check if entity has specific flag
   * @param flag - Flag to check
   */
  isFlagOn(flag: number): boolean;
}

/**
 * Uploader class for handling 3D model uploads and product creation
 */
export declare class Uploader {
  /**
   * Creates a new Uploader instance
   */
  constructor();

  /**
   * Creates a model by uploading content and material data
   * @param entity - The entity model to create
   * @returns Promise resolving to the created product result
   */
  createModel(entity: EntityModel): Promise<ProductCreationResult>;

  /**
   * Exports content data from entity to JSON string
   * @param entity - The entity model to export
   * @returns JSON string of exported content data
   */
  exportContentData(entity: EntityModel): string;

  /**
   * Exports material data from entity to JSON string
   * @param entity - The entity model to export materials from
   * @returns JSON string of exported material data
   */
  exportMaterialData(entity: EntityModel): string;

  /**
   * Uploads JSON data to storage
   * @param jsonData - JSON string to upload
   * @param type - Type identifier for the file
   * @returns Promise resolving to upload file result
   */
  uploadJson(jsonData: string, type: string): Promise<UploadFileResult>;

  /**
   * Gets upload URL for a file
   * @param fileName - Name of the file to upload
   * @param contentType - MIME type of the file
   * @returns Promise resolving to upload file result
   */
  uploadFile(fileName: string, contentType: string): Promise<UploadFileResult>;

  /**
   * Converts blob data to data URI and prepares for upload
   * @param uploadResult - Upload file result containing URL
   * @param jsonData - JSON string data
   * @param type - Type identifier
   * @returns Promise resolving to upload file result
   */
  blobToDataURI(
    uploadResult: UploadFileResult,
    jsonData: string,
    type: string
  ): Promise<UploadFileResult>;

  /**
   * Uploads file to storage using PUT request
   * @param uploadResult - Upload file result containing URL
   * @param file - File to upload
   * @param options - Upload options
   * @returns Promise resolving to upload file result
   */
  putFile(
    uploadResult: UploadFileResult,
    file: File,
    options: UploadOptions
  ): Promise<UploadFileResult>;

  /**
   * Creates a product in the catalog system
   * @param uploadResults - Array of upload results
   * @param entity - The entity model
   * @returns Promise resolving to product creation result
   */
  createProduct(
    uploadResults: UploadFileResult[],
    entity: EntityModel
  ): Promise<ProductCreationResult>;

  /**
   * Prepares product data for creation
   * @param uploadResults - Array of upload results
   * @param isSearchable - Whether product is searchable
   * @param seekId - Product seek identifier
   * @returns Product save request data
   */
  getProductData(
    uploadResults: UploadFileResult[],
    isSearchable: boolean,
    seekId: string
  ): SaveProductRequest;
}