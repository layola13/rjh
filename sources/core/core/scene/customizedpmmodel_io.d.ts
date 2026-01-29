/**
 * CustomizedPMModel_IO Module
 * Provides I/O operations and model management for customized product models with CAD integration
 */

import { Entity, Entity_IO } from './Entity';
import { GussetGroup } from './GussetGroup';
import { FaceGroup } from './FaceGroup';

/**
 * Material information associated with a face
 */
export interface FaceMaterialInfo {
  /** Mixed paint configuration for the face */
  mixpaint: {
    /** The face entity this material belongs to */
    faceEntity?: CustomizedPMModel;
    /** Face group for organizing related faces */
    faceGroup?: FaceGroup;
    /** Unique identifier for the face group */
    faceGroupId?: string;
    /** Mixed pave configuration */
    mixPave?: unknown;
    /** 2D sketch data */
    sketch2d?: {
      bound: {
        left: number;
        top: number;
      };
    };
    /** Transform operation */
    transform: (matrix: THREE.Matrix3) => void;
  };
  /** Transformation matrix from pave space to 3D space */
  paveTo3dMatrix: THREE.Matrix4;
}

/**
 * Serialized dump data for CustomizedPMModel
 */
export interface CustomizedPMModelDump {
  /** Creator identifier */
  creator?: string;
  /** Unit of measurement */
  unit?: string;
  /** Serialized WebCAD document JSON string */
  webCADDocument?: string;
  /** Map of face IDs to their material dump data */
  faceMaterials?: Record<string, unknown>;
}

/**
 * WebCAD document structure
 */
export interface WebCADDocument {
  /** Unique document identifier */
  docUUID: string;
  /** Number of faces in the model */
  faceCount?: number;
  /** Reference data for paving operations */
  paveRefDatas?: Array<[string, string]>;
}

/**
 * Context for loading entities
 */
export interface LoadContext {
  /** Version string for compatibility checks */
  version: string;
  /** Flag indicating restoration is in progress */
  duringRestore?: boolean;
}

/**
 * I/O handler for CustomizedPMModel serialization and deserialization
 */
export class CustomizedPMModel_IO extends Entity_IO {
  /**
   * Serialize a CustomizedPMModel instance to dump format
   * @param entity - The model entity to serialize
   * @param callback - Optional callback for post-processing dump data
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Array of serialized data
   */
  dump(
    entity: CustomizedPMModel,
    callback?: (dump: unknown[], entity: CustomizedPMModel) => void,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const dumpData = super.dump(entity, undefined, includeChildren, options);
    const primaryData = dumpData[0] as CustomizedPMModelDump;

    primaryData.creator = entity.creator;
    primaryData.unit = entity.unit;
    primaryData.webCADDocument = entity.webCADDocument;

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  /**
   * Deserialize dump data into a CustomizedPMModel instance
   * @param entity - The entity instance to populate
   * @param data - Serialized dump data
   * @param context - Loading context with version info
   */
  load(entity: CustomizedPMModel, data: CustomizedPMModelDump, context: LoadContext): void {
    super.load(entity, data, context);

    const faceMaterials = new Map<string, Entity>();

    if (data.faceMaterials) {
      for (const faceId of Object.keys(data.faceMaterials)) {
        const materialEntity = Entity.loadFromDumpById(data.faceMaterials[faceId], context);
        if (materialEntity) {
          faceMaterials.set(faceId, materialEntity);
        }
      }
    }

    entity._faceMaterials = faceMaterials;

    // Handle version migration for materials before v0.28
    if (HSCore.Util.Version.isEarlierThan(context.version, '0.28')) {
      entity._faceMaterials.forEach((material: FaceMaterialInfo) => {
        const mixpaint = material.mixpaint;
        const sketch2d = mixpaint.sketch2d;
        const left = sketch2d.bound.left;
        const top = sketch2d.bound.top;
        const translationMatrix = new THREE.Matrix3().translate(-left, -top);
        mixpaint.transform(translationMatrix);
      });
    }

    entity.initByData(data);

    if (context.duringRestore) {
      entity.dirtyGeometry(undefined);
    }
  }

  /**
   * Get singleton instance of CustomizedPMModel_IO
   */
  static instance(): CustomizedPMModel_IO {
    // Implementation provided by base class pattern
    return new CustomizedPMModel_IO();
  }
}

/**
 * Face selection information for mix paint operations
 */
export interface MixPaintFaceInfo {
  /** Face identifier */
  faceId: string;
  /** Instance identifier */
  instanceId?: string;
  /** Additional face metadata */
  [key: string]: unknown;
}

/**
 * CustomizedPMModel represents a customizable product model with CAD integration
 * Supports face-level material assignment, instance management, and DIY document operations
 */
export class CustomizedPMModel extends Entity {
  /** Internal storage for face materials */
  _faceMaterials: Map<string, Entity>;
  
  /** Temporary storage for face materials during operations */
  _faceTmpMaterials: Map<string, FaceMaterialInfo>;
  
  /** Model height */
  height: number;
  
  /** Internal WebCAD document JSON string */
  private _webCADDocument?: string;
  
  /** Internal modeling document UUID */
  private _modelingDocId?: string;
  
  /** Current face info for mix paint operations */
  private _curMixPaintFaceInfo?: MixPaintFaceInfo;
  
  /** Creator identifier field */
  private __creator?: string;
  
  /** Unit of measurement field */
  private __unit?: string;

  constructor(id?: string) {
    super(id);
    this._faceMaterials = new Map();
    this._faceTmpMaterials = new Map();
    this.height = 0;
    this._webCADDocument = undefined;

    // Define reactive property for webCADDocument
    this.defineField('webCADDocument', undefined, {
      get: (): string | undefined => {
        return this._webCADDocument;
      },
      partialSet: (value: string): void => {
        this._setWebCADDocument(value);
      },
      equals: (): boolean => false
    });

    // Define creator property
    this.defineField('creator', undefined, {});

    // Define unit property
    this.defineField('unit', undefined, {});
  }

  /**
   * Get the modeling document UUID
   */
  get modelingDocId(): string | undefined {
    return this._modelingDocId;
  }

  /**
   * Check if the DIY document is currently opened
   */
  isDiyDocOpened(): boolean {
    return !!(this.webCADDocument && DiySdk.DmDiyApi.existDocument(this._modelingDocId));
  }

  /**
   * Get the WebCAD document JSON string
   */
  get webCADDocument(): string | undefined {
    return this._webCADDocument;
  }

  /**
   * Get creator identifier
   */
  get creator(): string | undefined {
    return this.__creator;
  }

  set creator(value: string | undefined) {
    this.__creator = value;
  }

  /**
   * Get unit of measurement
   */
  get unit(): string | undefined {
    return this.__unit;
  }

  set unit(value: string | undefined) {
    this.__unit = value;
  }

  /**
   * Get a copy of face materials map
   */
  get faceMaterials(): Map<string, Entity> {
    return new Map(this._faceMaterials);
  }

  /**
   * Internal setter for WebCAD document with parsing
   * @param documentJson - Serialized WebCAD document
   */
  private _setWebCADDocument(documentJson: string): void {
    const parsed = JSON.parse(documentJson) as WebCADDocument;
    this._webCADDocument = documentJson;
    this._modelingDocId = parsed.docUUID;
  }

  /**
   * Clean up resources when destroying the entity
   */
  destroy(): void {
    super.destroy();
  }

  /**
   * Get the number of faces in the model
   * @returns Face count or -1 if unavailable
   */
  getFaceCount(): number {
    try {
      return (JSON.parse(this._webCADDocument + '') as WebCADDocument).faceCount ?? -1;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Open the DIY document for editing
   * @param dirtyGeometry - Whether to mark geometry as dirty after opening
   * @param preloadProducts - Whether to preload catalog products
   */
  async openDiyDocument(dirtyGeometry: boolean = true, preloadProducts: boolean = false): Promise<void> {
    if (!this.webCADDocument) {
      return;
    }

    if (preloadProducts) {
      const document = JSON.parse(this.webCADDocument) as WebCADDocument;
      if (document.paveRefDatas) {
        const loadPromises: Promise<unknown>[] = [];
        
        for (const [seekId, refData] of document.paveRefDatas) {
          if (refData !== '') {
            HSCatalog.Manager.instance().getProductBySeekIdSync(seekId, { data: refData });
          } else {
            loadPromises.push(HSCatalog.Manager.instance().getProductBySeekId(seekId));
          }
        }
        
        await Promise.all(loadPromises);
      }
    }

    const SCALE_FACTOR = 0.001;
    await DiySdk.DmDiyApi.openDocument(this.webCADDocument, SCALE_FACTOR, true);

    // Apply pending face materials if any
    if (this._faceMaterials.size > 0) {
      const paveInfoMap = new Map<string, unknown>();
      
      for (const [faceId, material] of this._faceMaterials) {
        const materialInfo = material as unknown as FaceMaterialInfo;
        const mixPave = materialInfo.mixpaint.mixPave;
        paveInfoMap.set(faceId, mixPave);
      }
      
      await DiySdk.DmDiyApi.updatePaveInfo(this._modelingDocId!, paveInfoMap);
      this._setWebCADDocument(DiySdk.DmDiyApi.dumpDocument(this._modelingDocId!));
      this._faceMaterials.clear();
    }

    if (dirtyGeometry) {
      this.getAllChildren().forEach(child => child.dirtyGeometry());
    }
  }

  /**
   * Initialize model with deserialized data
   * @param data - Dump data to initialize from
   */
  initByData(data: CustomizedPMModelDump): void {
    if (data.webCADDocument) {
      this._setWebCADDocument(data.webCADDocument);
    }
    this.__creator = data.creator;
    this.__unit = data.unit;
  }

  /**
   * Update model with new data
   * @param data - New data to apply
   */
  updateByData(data: CustomizedPMModelDump): void {
    if (data.webCADDocument) {
      this.webCADDocument = data.webCADDocument;
      this.creator = data.creator;
      this.unit = data.unit;
    }
  }

  /**
   * Get the I/O handler instance for this entity type
   */
  getIO(): CustomizedPMModel_IO {
    return CustomizedPMModel_IO.instance();
  }

  /**
   * Get child entities filtered by class type
   * @param classType - Constructor of the entity class to filter by
   */
  getChildrenByClass<T extends Entity>(classType: new (...args: unknown[]) => T): T[] {
    return Object.values(this.children).filter(
      (child): child is T => child instanceof classType
    );
  }

  /**
   * Get all child entities
   */
  getAllChildren(): Entity[] {
    return Object.values(this.children);
  }

  /**
   * Remove instance entities from the model
   * @param entities - Array of entities to remove
   */
  removeInstanceEntity(entities: Entity[]): void {
    if (!entities || entities.length === 0) {
      return;
    }

    const instanceIds = entities.map(entity => (entity as { instanceId: string }).instanceId);
    DiySdk.DmDiyApi.deleteFirstLevelInstance(this._modelingDocId!, instanceIds);
    this._webCADDocument = DiySdk.DmDiyApi.dumpDocument(this._modelingDocId!);

    entities.forEach(entity => {
      if (this.getAllChildren().some(child => child === entity)) {
        this.removeChild(entity);
      }
    });
  }

  /**
   * Add an instance entity to the model
   * @param entity - Entity to add
   */
  addInstanceEntity(entity: Entity): void {
    if (entity && this.getAllChildren().every(child => child !== entity)) {
      this.addChild(entity);
    }
  }

  /**
   * Get default material data for the model
   */
  getDefaultMaterialData(): unknown {
    return HSCore.Material.MaterialData.create(HSConstants.Constants.DEFAULT_CUSTOMIZEDMODEL_MATERIAL);
  }

  /**
   * Get current mix paint face information
   */
  get curMixPaintFaceInfo(): MixPaintFaceInfo | undefined {
    return this._curMixPaintFaceInfo;
  }

  /**
   * Set current mix paint face information
   */
  set curMixPaintFaceInfo(value: MixPaintFaceInfo | undefined) {
    this._curMixPaintFaceInfo = value;
  }

  /**
   * Get the entity associated with a face path
   * @param facePath - Face path string (format: "instanceId/faceId")
   */
  getFaceInstanceEntity(facePath: string): Entity | undefined {
    const pathParts = facePath.split('/');
    const instanceId = pathParts.length > 1 ? pathParts.shift() : undefined;
    
    return this.getAllChildren().find(
      child => (child as { instanceId: string }).instanceId === instanceId
    );
  }

  /**
   * Get material for a specific face
   * @param faceId - Face identifier
   */
  getFaceMaterial(faceId: string): FaceMaterialInfo | undefined {
    return this._faceTmpMaterials.get(faceId);
  }

  /**
   * Get all gusset materials from the DIY document
   * @returns Map of face IDs to material info
   */
  getGussetMaterials(): Map<string, FaceMaterialInfo> {
    if (!this.isDiyDocOpened()) {
      return new Map();
    }

    this._faceTmpMaterials.clear();
    this._faceTmpMaterials = DiySdk.DmDiyApi.getGussetMaterials(this.modelingDocId!);

    for (const material of this._faceTmpMaterials.values()) {
      material.mixpaint.faceEntity = this;
      material.mixpaint.faceGroup = new FaceGroup();
      material.mixpaint.faceGroupId = '';
      material.paveTo3dMatrix = new THREE.Matrix4().fromArray(
        material.paveTo3dMatrix as unknown as number[]
      );
    }

    return this._faceTmpMaterials;
  }

  /**
   * Mark gusset surfaces as dirty to trigger re-rendering
   */
  dirtyGussetSurface(): void {
    if (!this.isDiyDocOpened()) {
      return;
    }

    this.getGussetMaterials();
    
    for (const material of this._faceTmpMaterials.values()) {
      if (material?.mixpaint) {
        GussetGroup.dirtyGussetSurface(material.mixpaint);
      }
    }
  }

  /**
   * Get all material seek IDs used in the model
   * @returns Array of material seek ID strings
   */
  getAllMaterialSeekIds(): string[] {
    return this._modelingDocId 
      ? DiySdk.DmDiyApi.getAllMaterialSeekIds(this._modelingDocId) 
      : [];
  }
}

// Register the CustomizedPMModel class with the entity system
Entity.registerClass(HSConstants.ModelClass.CustomizedPMModel, CustomizedPMModel);

export { CustomizedPMModel_IO, CustomizedPMModel };