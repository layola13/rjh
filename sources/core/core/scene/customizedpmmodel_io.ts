import { Entity_IO, Entity } from './Entity';
import { GussetGroup } from './GussetGroup';
import { FaceGroup } from './FaceGroup';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  version: string;
  duringRestore?: boolean;
}

interface WebCADDocumentData {
  docUUID: string;
  faceCount?: number;
  paveRefDatas?: Array<[string, string]>;
}

interface CustomizedPMModelData {
  webCADDocument?: string;
  creator?: string;
  unit?: string;
  faceMaterials?: Record<string, unknown>;
}

interface MixPaintFaceInfo {
  faceId: string;
  instanceId?: string;
  [key: string]: unknown;
}

interface FaceMaterial {
  mixpaint: {
    sketch2d: {
      bound: {
        left: number;
        top: number;
      };
    };
    mixPave: unknown;
    faceEntity?: CustomizedPMModel;
    faceGroup?: FaceGroup;
    faceGroupId?: string;
    transform(matrix: THREE.Matrix3): void;
  };
  paveTo3dMatrix: THREE.Matrix4;
}

export class CustomizedPMModel_IO extends Entity_IO {
  private static _instance: CustomizedPMModel_IO;

  public static instance(): CustomizedPMModel_IO {
    if (!CustomizedPMModel_IO._instance) {
      CustomizedPMModel_IO._instance = new CustomizedPMModel_IO();
    }
    return CustomizedPMModel_IO._instance;
  }

  public dump(
    entity: CustomizedPMModel,
    callback?: (dump: unknown[], entity: CustomizedPMModel) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpResult = super.dump(entity, undefined, includeChildren, options);
    const dumpData = dumpResult[0] as CustomizedPMModelData;

    dumpData.creator = entity.creator;
    dumpData.unit = entity.unit;
    dumpData.webCADDocument = entity.webCADDocument;

    if (callback) {
      callback(dumpResult, entity);
    }

    return dumpResult;
  }

  public load(
    entity: CustomizedPMModel,
    data: CustomizedPMModelData,
    context: LoadContext
  ): void {
    super.load(entity, data, context);

    const faceMaterialsMap = new Map<string, FaceMaterial>();

    if (data.faceMaterials) {
      for (const faceId of Object.keys(data.faceMaterials)) {
        const material = Entity.loadFromDumpById(
          data.faceMaterials[faceId],
          context
        ) as FaceMaterial | null;

        if (material) {
          faceMaterialsMap.set(faceId, material);
        }
      }
    }

    entity._faceMaterials = faceMaterialsMap;

    if (HSCore.Util.Version.isEarlierThan(context.version, '0.28')) {
      entity._faceMaterials.forEach((material: FaceMaterial) => {
        const mixpaint = material.mixpaint;
        const sketch2d = mixpaint.sketch2d;
        const left = sketch2d.bound.left;
        const top = sketch2d.bound.top;
        const transformMatrix = new THREE.Matrix3().translate(-left, -top);
        mixpaint.transform(transformMatrix);
      });
    }

    entity.initByData(data);

    if (context.duringRestore) {
      entity.dirtyGeometry(undefined);
    }
  }
}

export class CustomizedPMModel extends Entity {
  public _faceMaterials: Map<string, FaceMaterial>;
  private _faceTmpMaterials: Map<string, FaceMaterial>;
  public height: number;
  private _webCADDocument?: string;
  private _modelingDocId?: string;
  private _curMixPaintFaceInfo?: MixPaintFaceInfo;
  private __creator?: string;
  private __unit?: string;

  constructor(id: string) {
    super(id);

    this._faceMaterials = new Map();
    this._faceTmpMaterials = new Map();
    this.height = 0;
    this._webCADDocument = undefined;

    this.defineField('webCADDocument', undefined, {
      get: (): string | undefined => {
        return this._webCADDocument;
      },
      partialSet: (value: string): void => {
        this._setWebCADDocument(value);
      },
      equals: (): boolean => false,
    });

    this.defineField('creator', undefined, {});
    this.defineField('unit', undefined, {});
  }

  public get modelingDocId(): string | undefined {
    return this._modelingDocId;
  }

  public isDiyDocOpened(): boolean {
    return !!(
      this.webCADDocument &&
      this._modelingDocId &&
      DiySdk.DmDiyApi.existDocument(this._modelingDocId)
    );
  }

  public get webCADDocument(): string | undefined {
    return this._webCADDocument;
  }

  public set webCADDocument(value: string | undefined) {
    if (value) {
      this._setWebCADDocument(value);
    }
  }

  public get creator(): string | undefined {
    return this.__creator;
  }

  public set creator(value: string | undefined) {
    this.__creator = value;
  }

  public get unit(): string | undefined {
    return this.__unit;
  }

  public set unit(value: string | undefined) {
    this.__unit = value;
  }

  public get faceMaterials(): Map<string, FaceMaterial> {
    return new Map(this._faceMaterials);
  }

  private _setWebCADDocument(value: string): void {
    const parsedData = JSON.parse(value) as WebCADDocumentData;
    this._webCADDocument = value;
    this._modelingDocId = parsedData.docUUID;
  }

  public destroy(): void {
    super.destroy();
  }

  public getFaceCount(): number {
    try {
      const data = JSON.parse(this._webCADDocument ?? '') as WebCADDocumentData;
      return data.faceCount ?? -1;
    } catch (error) {
      return -1;
    }
  }

  public async openDiyDocument(
    dirtyChildren: boolean = true,
    preloadProducts: boolean = false
  ): Promise<void> {
    if (!this.webCADDocument) {
      return;
    }

    if (preloadProducts) {
      const documentData = JSON.parse(this.webCADDocument) as WebCADDocumentData;

      if (documentData.paveRefDatas) {
        const loadPromises: Promise<unknown>[] = [];

        for (const [seekId, refData] of documentData.paveRefDatas) {
          if (refData !== '') {
            HSCatalog.Manager.instance().getProductBySeekIdSync(seekId, {
              data: refData,
            });
          } else {
            loadPromises.push(
              HSCatalog.Manager.instance().getProductBySeekId(seekId)
            );
          }
        }

        await Promise.all(loadPromises);
      }
    }

    const SCALE_FACTOR = 0.001;
    await DiySdk.DmDiyApi.openDocument(this.webCADDocument, SCALE_FACTOR, true);

    if (this._faceMaterials.size > 0) {
      const paveInfoMap = new Map<string, unknown>();

      for (const [faceId, material] of this._faceMaterials) {
        const mixPave = material.mixpaint.mixPave;
        paveInfoMap.set(faceId, mixPave);
      }

      await DiySdk.DmDiyApi.updatePaveInfo(this._modelingDocId!, paveInfoMap);

      this._setWebCADDocument(
        DiySdk.DmDiyApi.dumpDocument(this._modelingDocId!)
      );

      this._faceMaterials.clear();
    }

    if (dirtyChildren) {
      this.getAllChildren().forEach((child: Entity) => child.dirtyGeometry());
    }
  }

  public initByData(data: CustomizedPMModelData): void {
    if (data.webCADDocument) {
      this._setWebCADDocument(data.webCADDocument);
    }

    this.__creator = data.creator;
    this.__unit = data.unit;
  }

  public updateByData(data: CustomizedPMModelData): void {
    if (data.webCADDocument) {
      this.webCADDocument = data.webCADDocument;
      this.creator = data.creator;
      this.unit = data.unit;
    }
  }

  public getIO(): CustomizedPMModel_IO {
    return CustomizedPMModel_IO.instance();
  }

  public getChildrenByClass<T extends Entity>(
    entityClass: new (...args: unknown[]) => T
  ): T[] {
    return Object.values(this.children).filter(
      (child): child is T => child instanceof entityClass
    );
  }

  public getAllChildren(): Entity[] {
    return Object.values(this.children);
  }

  public removeInstanceEntity(entities: Entity[]): void {
    if (!entities || entities.length === 0) {
      return;
    }

    const instanceIds = entities.map((entity: Entity) => entity.instanceId);

    DiySdk.DmDiyApi.deleteFirstLevelInstance(this._modelingDocId!, instanceIds);

    this._webCADDocument = DiySdk.DmDiyApi.dumpDocument(this._modelingDocId!);

    entities.forEach((entity: Entity) => {
      if (this.getAllChildren().some((child: Entity) => child === entity)) {
        this.removeChild(entity);
      }
    });
  }

  public addInstanceEntity(entity: Entity): void {
    if (entity && this.getAllChildren().every((child: Entity) => child !== entity)) {
      this.addChild(entity);
    }
  }

  public getDefaultMaterialData(): HSCore.Material.MaterialData {
    return HSCore.Material.MaterialData.create(
      HSConstants.Constants.DEFAULT_CUSTOMIZEDMODEL_MATERIAL
    );
  }

  public get curMixPaintFaceInfo(): MixPaintFaceInfo | undefined {
    return this._curMixPaintFaceInfo;
  }

  public set curMixPaintFaceInfo(value: MixPaintFaceInfo | undefined) {
    this._curMixPaintFaceInfo = value;
  }

  public getFaceInstanceEntity(faceId: string): Entity | undefined {
    const parts = faceId.split('/');
    const instanceId = parts.length > 1 ? parts.shift() : undefined;

    return this.getAllChildren().find(
      (entity: Entity) => entity.instanceId === instanceId
    );
  }

  public getFaceMaterial(faceId: string): FaceMaterial | undefined {
    return this._faceTmpMaterials.get(faceId);
  }

  public getGussetMaterials(): Map<string, FaceMaterial> {
    if (!this.isDiyDocOpened()) {
      return new Map();
    }

    this._faceTmpMaterials.clear();
    this._faceTmpMaterials = DiySdk.DmDiyApi.getGussetMaterials(
      this.modelingDocId!
    );

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

  public dirtyGussetSurface(): void {
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

  public getAllMaterialSeekIds(): string[] {
    return this._modelingDocId
      ? DiySdk.DmDiyApi.getAllMaterialSeekIds(this._modelingDocId)
      : [];
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedPMModel, CustomizedPMModel);