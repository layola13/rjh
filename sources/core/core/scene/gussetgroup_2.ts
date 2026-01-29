import { Entity } from './Entity';
import { GussetSurface } from './GussetSurface';
import { MixPaintDecorator } from './MixPaintDecorator';

interface MixPaint {
  faceEntity: HSCore.Model.Face | HSCore.Model.CustomizedModel | HSCore.Model.Wall | HSCore.Model.Slab | HSCore.Model.CustomizedPMInstanceModel | HSCore.Model.NCustomizedFeatureModel;
  faceId?: number;
  faceGroup: FaceGroup;
}

interface FaceGroup {
  faceGroupId?: string;
  getFaceIds(): number[];
}

interface Material {
  mixpaint?: MixPaint;
}

interface FaceMaterial {
  material: Material;
}

interface SignalEventData {
  entity?: HSCore.Model.Face | HSCore.Model.CustomizedModel | HSCore.Model.Wall | HSCore.Model.Slab | HSCore.Model.CustomizedPMInstanceModel | HSCore.Model.NCustomizedFeatureModel;
  parent?: HSCore.Model.CustomizedPMModel;
}

interface SignalEvent {
  data?: SignalEventData;
}

interface GussetSurfaceParams {
  faceEntity: HSCore.Model.Face | Entity;
  faceId?: number;
}

interface DirtyOptions {
  options?: unknown;
}

export class GussetGroup extends Entity {
  private _signalHook: HSCore.Util.SignalHook;

  constructor(doc: HSCore.Doc.Document) {
    super(doc);
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  destroy(): void {
    if (!this._disposed) {
      this._signalHook.dispose();
      super.destroy();
    }
  }

  needDump(): boolean {
    return false;
  }

  canTransact(): boolean {
    return false;
  }

  onChildDirty(child: Entity, options?: DirtyOptions): void {
    this.dirty(options, options?.options);
  }

  listenLayer(layer: HSCore.Model.Layer): void {
    this._signalHook.listen(
      layer.signalChildAdded,
      this._onFaceEntityAdded.bind(this),
      undefined
    );
  }

  listenPMModel(model: HSCore.Model.CustomizedPMModel): void {
    this._signalHook.listen(
      model.signalChildAdded,
      this._onFaceEntityAdded.bind(this),
      undefined
    );
    this._signalHook.listen(
      model.signalChildRemoved,
      this._onFaceEntityRemoved.bind(this),
      undefined
    );
  }

  private _listenFaceEntity(faceEntity: Entity): void {
    this._signalHook.listen(
      faceEntity.signalRemoved,
      this._onFaceEntityRemoved.bind(this),
      faceEntity
    );
  }

  private _unlistenFaceEntity(faceEntity: Entity): void {
    this._signalHook.unlistenGroup(faceEntity);
  }

  private _onFaceEntityAdded(event: SignalEvent): void {
    const entity = event?.data?.entity;
    if (!entity) return;

    if (entity instanceof HSCore.Model.CustomizedModel) {
      entity.faceMaterials.forEach((material: Material, faceId: number) => {
        const mixpaint = material?.mixpaint;
        if (mixpaint) {
          mixpaint.faceId = faceId;
          this.dirtySurface(mixpaint);
        }
      }, this);
    } else if (entity instanceof HSCore.Model.Wall || entity instanceof HSCore.Model.Slab) {
      entity.forEachFace((face: HSCore.Model.Face) => {
        const material = face.material;
        const mixpaint = material?.mixpaint;
        if (mixpaint) {
          this.dirtySurface(mixpaint);
        }
      });
    } else if (entity instanceof HSCore.Model.CustomizedPMInstanceModel) {
      event.data.parent.getGussetMaterials().forEach((material: Material, faceId: number) => {
        const mixpaint = material?.mixpaint;
        if (mixpaint) {
          mixpaint.faceId = faceId;
          this.dirtySurface(mixpaint);
        }
      }, this);
    } else if (entity instanceof HSCore.Model.NCustomizedFeatureModel) {
      for (const [faceId, faceMaterial] of entity.facematerialmap) {
        const mixpaint = faceMaterial.material.mixpaint;
        if (mixpaint) {
          mixpaint.faceId = faceId;
          this.dirtySurface(mixpaint);
        }
      }
    }
  }

  private _onFaceEntityRemoved(event: SignalEvent): void {
    const entity = event?.data?.entity;
    if (!entity) return;

    let matchPredicate = (surface: GussetSurface): boolean => surface.faceEntity === entity;

    if (entity instanceof HSCore.Model.CustomizedPMInstanceModel) {
      const parent = event.data.parent;
      matchPredicate = (surface: GussetSurface): boolean => {
        const faceInstance = parent.getFaceInstanceEntity(surface.faceId);
        return surface.faceEntity === parent && entity === faceInstance;
      };
    }

    this._unlistenFaceEntity(entity);
    Object.values(this.children).forEach((child: GussetSurface) => {
      if (matchPredicate(child)) {
        this.removeChild(child);
      }
    });
  }

  addSurface(faceEntity: Entity, faceId?: number): GussetSurface {
    const surface = new GussetSurface(faceEntity, faceId);
    this.addChild(surface);
    this._listenFaceEntity(faceEntity);
    return surface;
  }

  removeSurface(faceEntity: Entity, faceId?: number): GussetSurface | undefined {
    const surface = this.findSurface(faceEntity, faceId);
    if (surface) {
      this.removeChild(surface);
      this._unlistenFaceEntity(faceEntity);
    }
    return surface;
  }

  findSurface(faceEntity: Entity, faceId?: number): GussetSurface | undefined {
    return Object.values(this.children).find((surface: GussetSurface) =>
      surface.equalsSurface(faceEntity, faceId)
    );
  }

  dirtySurface(mixpaint: MixPaint, options?: DirtyOptions): void {
    if (!mixpaint) return;

    const hasGussetRegions = new MixPaintDecorator(mixpaint).hasGussetModelRegions();
    const params = GussetGroup.getGussetSurfaceParams(this.doc, mixpaint);

    for (let i = 0, length = params.length; i < length; ++i) {
      const param = params[i];
      let surface = this.findSurface(param.faceEntity, param.faceId);

      if (surface) {
        surface.onFaceEntityDirty(options);
      } else if (hasGussetRegions) {
        surface = this.addSurface(param.faceEntity, param.faceId);
        surface.onFaceEntityDirty(options);
      }
    }
  }

  static getGussetSurfaceParams(doc: HSCore.Doc.Document, mixpaint: MixPaint): GussetSurfaceParams[] {
    const params: GussetSurfaceParams[] = [];
    const faceEntity = mixpaint.faceEntity;
    const isFace = faceEntity instanceof HSCore.Model.Face;
    const faceGroup = mixpaint.faceGroup;

    if (faceGroup.faceGroupId && isFace) {
      const faceIds = faceGroup.getFaceIds();
      const count = faceIds.length;

      for (let i = 0; i < count; ++i) {
        const face = doc.getEntityById(faceIds[i]);
        if (face) {
          params.push({ faceEntity: face });
        }
      }
    } else {
      const faceId = isFace ? undefined : mixpaint.faceId;
      params.push({
        faceEntity,
        faceId
      });
    }

    return params;
  }

  static getGussetGroup(entity: Entity | HSCore.Model.CustomizedPMModel): GussetGroup | undefined {
    let layer: HSCore.Model.Layer | undefined;

    if (entity instanceof HSCore.Model.CustomizedPMModel) {
      layer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    } else {
      layer = HSCore.Util.Layer.getEntityLayer(entity);
    }

    if (!layer) return undefined;

    let gussetGroup = layer.gussetGroup;

    if (gussetGroup) {
      if (!gussetGroup.hasParent(layer)) {
        layer.addChild(gussetGroup);
      }
    } else {
      gussetGroup = new GussetGroup(layer.doc);
      layer.gussetGroup = gussetGroup;

      if (entity instanceof HSCore.Model.CustomizedPMModel) {
        gussetGroup.listenPMModel(entity);
      } else {
        gussetGroup.listenLayer(layer);
      }
    }

    return gussetGroup;
  }

  static removeGussetSurface(mixpaint: MixPaint): void {
    const faceEntity = mixpaint.faceEntity;
    const gussetGroup = GussetGroup.getGussetGroup(faceEntity);

    if (!gussetGroup) return;

    const params = GussetGroup.getGussetSurfaceParams(gussetGroup.doc, mixpaint);

    for (let i = 0, length = params.length; i < length; ++i) {
      const param = params[i];
      gussetGroup.removeSurface(param.faceEntity, param.faceId);
    }
  }

  static dirtyGussetSurface(mixpaint: MixPaint | undefined, options?: DirtyOptions): void {
    if (!mixpaint) return;

    const gussetGroup = GussetGroup.getGussetGroup(mixpaint.faceEntity);
    if (gussetGroup) {
      gussetGroup.dirtySurface(mixpaint, options);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.GussetGroup, GussetGroup);