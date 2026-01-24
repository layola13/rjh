/**
 * Assembly export and product management service
 * Handles exporting 3D models/groups to cloud storage and creating catalog products
 */

/**
 * File upload response from OSS service
 */
interface UploadFileResult {
  uploadFileUrl: string;
  storageUrl: string;
}

/**
 * Product attribute definition
 */
interface ProductAttribute {
  id: string;
  name: string;
  valuesIds: string[];
  free: unknown[];
}

/**
 * Product file metadata
 */
interface ProductFile {
  metaData: string;
  url: string;
}

/**
 * Request payload for saving a product
 */
interface SaveProductRequest {
  attributes: ProductAttribute[];
  files: ProductFile[];
  contentTypeName: string;
  productTypeName: string;
}

/**
 * Material data structure for scene export
 */
interface MaterialData {
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

/**
 * Scene data for a single entity
 */
interface EntitySceneData {
  materialMap: Record<string, MaterialData>;
  material: unknown;
  materialList: unknown[];
  sceneRoom: unknown[];
}

/**
 * 3D position coordinates
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D rotation angles
 */
interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D scale factors
 */
interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * Product data in assembly export
 */
interface ProductData {
  id: string;
  uniqueId: string;
  position: Position3D;
  posZ: number;
  rotation: number;
  t3dRotation: Rotation3D;
  scale: Scale3D;
  flip: boolean;
  variation?: string;
  data?: {
    position?: number[];
    posZ?: number;
  };
}

/**
 * Group metadata
 */
interface GroupMetadata {
  id: string;
  name: string;
  v: string;
  contentType: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  ungroupable: boolean;
}

/**
 * Group structure in assembly
 */
interface GroupStructure {
  subContent: number[];
  subGroup: number[];
  metadata?: GroupMetadata;
}

/**
 * Bounding box dimensions
 */
interface BoundingBox {
  xLen: number;
  yLen: number;
  zLen: number;
}

/**
 * Assembly file metadata
 */
interface AssemblyMeta {
  version: string;
  origin: string;
  magic: string;
  unit: string;
}

/**
 * Assembly export structure
 */
interface AssemblyExport {
  meta: AssemblyMeta;
  boundingBox: BoundingBox;
  Products: ProductData[];
  groups?: GroupStructure[];
}

/**
 * Export result containing assembly and scene data
 */
interface ExportResult {
  assemblyContent: string;
  sceneDataContent: string;
}

/**
 * File upload options for AJAX requests
 */
interface UploadOptions {
  dataType?: string;
  processData: boolean;
  contentType: string | boolean;
  headers?: Record<string, string>;
}

/**
 * File and upload option pair
 */
interface FileUploadPair {
  file: File;
  option: UploadOptions;
}

/**
 * MTOP API response structure
 */
interface MtopResponse<T = unknown> {
  ret: string[];
  data: {
    result?: T;
    code?: string;
  };
}

/**
 * Product update parameters
 */
interface UpdateProductParams {
  id: string;
  name: string;
  thumbnail: string;
}

/**
 * Assembly metadata constants
 */
declare const ASSEMBLY_META: AssemblyMeta;

/**
 * Assembly export and product management service
 * Handles conversion of 3D models to uploadable formats and catalog integration
 */
declare class AssemblyExportService {
  /**
   * Adds a model or group to user's catalog by exporting and uploading it
   * @param target - The entity or group to export
   * @returns Promise resolving to the created product data
   */
  addToMyGroup(target: HSCore.Model.Entity | HSCore.Model.Group): Promise<unknown>;

  /**
   * Captures and uploads thumbnail image for a group of models
   * @param entities - Array of entities to capture
   * @returns Promise resolving to upload result with image URL
   */
  private _uploadGroupImage(entities: HSCore.Model.Entity[]): Promise<UploadFileResult>;

  /**
   * Converts blob data to data URI and uploads as JSON file
   * @param uploadResult - Upload metadata from OSS
   * @param jsonContent - JSON string content to upload
   * @returns Promise resolving to upload result
   */
  private _blobToDataURI(
    uploadResult: UploadFileResult,
    jsonContent: string
  ): Promise<UploadFileResult>;

  /**
   * Uploads file to OSS storage endpoint
   * @param uploadResult - Upload metadata containing target URL
   * @param fileData - File or blob to upload
   * @param options - AJAX upload options
   * @param contentType - Optional content type override
   * @returns Promise resolving to upload result
   */
  putFile(
    uploadResult: UploadFileResult,
    fileData: File | Blob,
    options: UploadOptions,
    contentType?: string
  ): Promise<UploadFileResult>;

  /**
   * Prompts user to select and upload a picture file
   * @param beforeSendCallback - Callback invoked before upload
   * @returns Promise resolving to upload result
   */
  uploadPicture(beforeSendCallback?: (file: File) => void): Promise<unknown>;

  /**
   * Requests upload URL from OSS service
   * @param fileName - Name for the uploaded file
   * @param contentType - MIME type of the file
   * @returns Promise resolving to upload metadata
   */
  uploadFile(fileName: string, contentType: string): Promise<UploadFileResult>;

  /**
   * Updates an existing product's name and thumbnail in catalog
   * @param params - Product update parameters
   * @returns Promise resolving when update completes
   */
  updateMyGroup(params: UpdateProductParams): Promise<unknown>;

  /**
   * Checks if all entities in a group have searchable flag enabled
   * @param entity - Entity or group to check
   * @returns True if all members are searchable
   */
  private _isSearchableEnable(entity: HSCore.Model.Entity | HSCore.Model.Group): boolean;

  /**
   * Exports scene data for multiple entities
   * @param target - Main entity or group being exported
   * @param entities - Flat list of all entities to export
   * @returns JSON string containing scene data for all entities
   */
  private _exportScene(
    target: HSCore.Model.Entity | HSCore.Model.Group,
    entities: HSCore.Model.Entity[]
  ): string;

  /**
   * Exports scene data (materials, geometry) for a single entity
   * @param entity - Entity to export
   * @returns Scene data structure
   */
  exportEntitySceneData(entity: HSCore.Model.Entity): EntitySceneData;

  /**
   * Exports assembly structure and scene data for a model or group
   * @param target - Entity or group to export
   * @param entities - Flat list of all entities in the assembly
   * @returns Object containing serialized assembly and scene JSON
   */
  exportAssemblyAndScene(
    target: HSCore.Model.Entity | HSCore.Model.Group,
    entities: HSCore.Model.Entity[]
  ): ExportResult;

  /**
   * Uploads JSON content as a file to OSS
   * @param jsonContent - JSON string to upload
   * @returns Promise resolving to upload result
   */
  private _uploadJson(jsonContent: string): Promise<UploadFileResult>;

  /**
   * Constructs product data payload for catalog save request
   * @param uploadResults - Array of upload results for assembly files
   * @param isSearchable - Whether product should be publicly searchable
   * @returns Product save request payload
   */
  private _getProductData(
    uploadResults: UploadFileResult[],
    isSearchable: boolean
  ): SaveProductRequest;

  /**
   * Creates a new product in the catalog via MTOP API
   * @param uploadResults - Upload results for assembly files
   * @param isSearchable - Whether product should be publicly searchable
   * @returns Promise resolving to created product data
   */
  private _createProduct(
    uploadResults: UploadFileResult[],
    isSearchable: boolean
  ): Promise<unknown>;
}

export default AssemblyExportService;