import { Entity, Entity_IO } from './Entity';
import { Loop } from './Loop';
import { Material } from './Material';
import { Signal, SignalHook } from './Signal';
import { EntityField } from './EntityField';
import { Content } from './Content';
import { Logger } from './Logger';

interface FaceDumpData {
  outerLoop: string;
  innerLoops?: string[];
}

interface InnerLoopsMap {
  [key: string]: Loop;
}

interface ContentsMap {
  [key: string]: Content;
}

interface VerifyOptions {
  ignoreMaterial?: boolean;
}

interface ClipFacePolygon {
  outer: number[][] | undefined;
  holes: number[][][];
}

interface ContentEventData {
  content: Content;
}

interface CustomizedModelEventData {
  customizedModel: Content;
}

export class Face_IO extends Entity_IO {
  private static _instance: Face_IO;

  static instance(): Face_IO {
    if (!Face_IO._instance) {
      Face_IO._instance = new Face_IO();
    }
    return Face_IO._instance;
  }

  load(
    entity: Entity,
    dumpData: FaceDumpData,
    entityMap: Map<string, Entity>,
    context: unknown
  ): void {
    super.load(entity, dumpData, entityMap, context);
    
    const face = entity as Face;
    face.__outerLoop = Entity.loadFromDumpById(dumpData.outerLoop, entityMap) as Loop;
    face.__innerLoops = {};
    
    if (dumpData.innerLoops) {
      dumpData.innerLoops.forEach((loopId: string) => {
        const loop = Entity.loadFromDumpById(loopId, entityMap) as Loop;
        if (loop) {
          face.__innerLoops[loop.id] = loop;
        }
      });
    }
  }
}

export class Face extends Entity {
  __outerLoop?: Loop;
  __innerLoops: InnerLoopsMap;
  __contents: ContentsMap;
  __material?: Material;

  signalContentAdded: Signal<ContentEventData>;
  signalContentRemoved: Signal<ContentEventData>;
  signalCustomizedWallAttachedModelAdded: Signal<CustomizedModelEventData>;
  signalCustomizedWallAttachedModelRemoved: Signal<CustomizedModelEventData>;
  
  private _signalHook: SignalHook;
  private _materialSignalHook: SignalHook;

  constructor(id: string = '') {
    super(id);
    this.__innerLoops = {};
    this.__contents = {};
    this.signalContentAdded = new Signal(this);
    this.signalContentRemoved = new Signal(this);
    this.signalCustomizedWallAttachedModelAdded = new Signal(this);
    this.signalCustomizedWallAttachedModelRemoved = new Signal(this);
    this._signalHook = new SignalHook(this);
    this._materialSignalHook = new SignalHook(this);
  }

  get children(): Entity[] {
    return this._children;
  }

  @EntityField({
    partialSet(this: Face, value: Loop): void {
      this._setOuterLoop(value);
    }
  })
  outerLoop?: Loop;

  getOuterLoop(): Loop | undefined {
    return this.outerLoop;
  }

  _setOuterLoop(loop: Loop | undefined): void {
    const previousLoop = this.__outerLoop;
    this.__outerLoop = loop;
    
    if (previousLoop) {
      this.removeChild(previousLoop);
    }
    if (loop) {
      this.addChild(loop);
    }
  }

  @EntityField({
    partialSet(this: Face, value: InnerLoopsMap): void {
      this._setInnerLoops(value);
    }
  })
  innerLoops?: InnerLoopsMap;

  getInnerLoops(): InnerLoopsMap {
    return this.innerLoops ?? {};
  }

  _setInnerLoops(newLoops: InnerLoopsMap): void {
    if (typeof newLoops !== 'object') {
      Logger.console.assert(false, 'invalid input!');
      return;
    }

    const currentLoops = Object.values(this.__innerLoops);
    const newLoopsArray = Object.values(newLoops);
    const loopsToRemove = currentLoops.filter(loop => !newLoopsArray.includes(loop));
    const loopsToAdd = newLoopsArray.filter(loop => !currentLoops.includes(loop));

    loopsToRemove.forEach((loop: Loop) => {
      delete this.__innerLoops[loop.id];
      this.removeChild(loop);
    });

    loopsToAdd.forEach((loop: Loop) => {
      this.__innerLoops[loop.id] = loop;
      this.addChild(loop);
    });
  }

  isSameInnerLoops(loops1: InnerLoopsMap, loops2: InnerLoopsMap): boolean {
    return JSON.stringify(Object.keys(loops1)) === JSON.stringify(Object.keys(loops2));
  }

  removeInnerLoop(loop: Loop): boolean {
    if (!loop || !this.hasChild(loop)) {
      return false;
    }

    const updatedLoops = { ...this.innerLoops };
    delete updatedLoops[loop.id];
    this.innerLoops = updatedLoops;
    return true;
  }

  updateOuterLoopByPoints(points: number[][]): void {
    this.outerLoop = Loop.createFromPoints(points);
  }

  getOuterLoopVertices(): number[][] {
    return this.__outerLoop ? this.__outerLoop.getLoopVertices() : [];
  }

  getOuterLoopPolygon(): number[][] | undefined {
    return this.__outerLoop ? this.__outerLoop.toPolygon() : undefined;
  }

  getClipFacePolygon(): ClipFacePolygon {
    const outerPolygon = this.__outerLoop ? this.__outerLoop.toPolygon() : undefined;
    
    if (outerPolygon && HSCore.Util.Math.isClockwise(outerPolygon)) {
      outerPolygon.reverse();
    }

    const holes: number[][][] = [];
    for (const loopId in this.__innerLoops) {
      const innerLoop = this.__innerLoops[loopId];
      if (innerLoop instanceof Loop && innerLoop.verify() && innerLoop.toPolygon()) {
        const innerPolygon = innerLoop.toPolygon();
        if (innerPolygon) {
          if (!HSCore.Util.Math.isClockwise(innerPolygon)) {
            innerPolygon.reverse();
          }
          holes.push(innerPolygon);
        }
      }
    }

    return {
      outer: outerPolygon,
      holes
    };
  }

  toDiscretePolygon(): number[][] {
    return this.getOuterLoopPolygon() || [];
  }

  getMassProps(): unknown[] {
    const polygon = this.getOuterLoopPolygon();
    return polygon ? HSCore.Util.Math.getMassProperties(polygon) : [];
  }

  forEachVertex(callback: (vertex: number[]) => void, context?: unknown): void {
    if (this.outerLoop) {
      this.outerLoop.forEachVertex((vertex: number[]) => {
        callback.call(context, vertex);
      });

      if (this.innerLoops) {
        Object.values(this.innerLoops).forEach((innerLoop: Loop) => {
          innerLoop.forEachVertex((vertex: number[]) => {
            callback.call(context, vertex);
          });
        });
      }
    }
  }

  @EntityField({
    get(this: Face): Material {
      if (!this.__material) {
        this.__material = Material.create(HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL);
      }
      return this.__material;
    },
    preSet(this: Face): void {
      this._materialSignalHook.unlistenAll();
    },
    postSet(this: Face, oldValue: Material, newValue: Material): void {
      this.dirtyMaterial();
      if (this.__material) {
        this._materialSignalHook.listen(this.__material.signalDirty, this.dirtyMaterial);
        this.__material.dirtyGussetSurface();
      }
    },
    validate(this: Face, value: unknown): boolean {
      if (!value || value instanceof Material) {
        return true;
      }
      log.error(`${this.tag}: try to set ${(value as Entity).tag} as Material.`, 'Data.Error');
      return false;
    }
  })
  material?: Material;

  getMaterial(): Material | undefined {
    return this.material;
  }

  setMaterial(material: Material): void {
    this.material = material;
  }

  @EntityField({
    partialSet(this: Face, value: ContentsMap): void {
      this._setContents(value);
    }
  })
  contents?: ContentsMap;

  setContents(contents: ContentsMap): void {
    this.contents = contents;
  }

  addContent(content: Content): boolean {
    if (!content) {
      return false;
    }

    const existingContent = this.__contents[content.id];
    if (existingContent) {
      if (existingContent === content) {
        return true;
      }
      Logger.console.assert(false, 'different content object with the same id.');
      return false;
    }

    if (!this.canAddContent(content)) {
      return false;
    }

    const updatedContents = { ...this.__contents };
    updatedContents[content.id] = content;
    this.contents = updatedContents;
    return true;
  }

  canAddContent(content: Content): boolean {
    return content instanceof Content;
  }

  removeContent(contentOrId: Content | string): boolean {
    let content: Content | undefined;
    
    if (typeof contentOrId === 'string') {
      content = this.__contents[contentOrId];
    } else {
      content = contentOrId;
    }

    if (!content) {
      return false;
    }

    const existingContent = this.__contents[content.id];
    if (!existingContent) {
      return true;
    }

    if (existingContent !== content) {
      Logger.console.assert(false, 'different content object with the same id.');
    }

    const updatedContents = { ...this.__contents };
    delete updatedContents[content.id];
    this.contents = updatedContents;
    return true;
  }

  hasContent(content: Content, recursive: boolean = true): boolean {
    if (!content) {
      return false;
    }

    if (this.__contents[content.id]) {
      return true;
    }

    if (recursive) {
      return Object.values(this.__contents).some((c: Content) => 
        c.hasContent && c.hasContent(content, recursive)
      );
    }

    return false;
  }

  _setContents(newContents: ContentsMap): void {
    const currentContents = Object.values(this.__contents);
    const newContentsArray = Object.values(newContents);
    const contentsToRemove = currentContents.filter(c => !newContentsArray.includes(c));
    const contentsToAdd = newContentsArray.filter(c => !currentContents.includes(c));

    contentsToRemove.forEach((content: Content) => {
      this._removeContent(content);
    });

    contentsToAdd.forEach((content: Content) => {
      this._addContent(content);
    });
  }

  _addContent(content: Content): boolean {
    if (!this.canAddContent(content)) {
      return false;
    }

    if (this.__contents[content.id]) {
      return true;
    }

    this.__contents[content.id] = content;

    const contentType = content.contentType;
    if (
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFeaturewall) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFloor) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFixedFurniture)
    ) {
      this.signalCustomizedWallAttachedModelAdded.dispatch({
        customizedModel: content
      });
    }

    this.signalContentAdded.dispatch({ content });
    return true;
  }

  _removeContent(content: Content): boolean {
    if (!content || !this.__contents[content.id]) {
      return false;
    }

    delete this.__contents[content.id];

    const contentType = content.contentType;
    if (
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFeaturewall) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFloor) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFixedFurniture)
    ) {
      this.signalCustomizedWallAttachedModelRemoved.dispatch({
        customizedModel: content
      });
    }

    this.signalContentRemoved.dispatch({ content });
    return true;
  }

  forEachContent(callback: (content: Content) => void, context?: unknown): void {
    if (callback) {
      Object.values(this.__contents).forEach((content: Content) => {
        callback.call(context, content);
      });
    } else {
      Logger.console.assert(false, 'undefined callback');
    }
  }

  onChildRemoved(child: Entity): void {
    if (child instanceof Loop) {
      if (child === this.__outerLoop) {
        this.outerLoop = undefined;
      } else {
        this.removeInnerLoop(child);
      }
    }
    super.onChildRemoved(child);
  }

  destroy(): void {
    if (this._disposed) {
      return;
    }

    this.__contents = {};

    this._signalHook?.dispose();
    this._signalHook = undefined as any;
    
    this._materialSignalHook?.dispose();
    this._materialSignalHook = undefined as any;
    
    this.signalContentAdded?.dispose();
    this.signalContentAdded = undefined as any;
    
    this.signalContentRemoved?.dispose();
    this.signalContentRemoved = undefined as any;
    
    this.signalCustomizedWallAttachedModelAdded?.dispose();
    this.signalCustomizedWallAttachedModelAdded = undefined as any;
    
    this.signalCustomizedWallAttachedModelRemoved?.dispose();
    this.signalCustomizedWallAttachedModelRemoved = undefined as any;

    super.destroy();
  }

  verify(options: VerifyOptions = {}): boolean {
    if (!this.getUniqueParent()) {
      log.error(`${this.tag} doesn't have valid parent.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__outerLoop instanceof Loop)) {
      log.error(`${this.tag}: invalid outerLoop.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!this.__outerLoop.verify()) {
      return false;
    }

    if (!this.__outerLoop.toPolygon()) {
      return false;
    }

    if (!this.__innerLoops) {
      this.__innerLoops = {};
    }

    const invalidLoops: Loop[] = [];
    const invalidLoopIds: string[] = [];

    for (const loopId in this.__innerLoops) {
      const innerLoop = this.__innerLoops[loopId];
      if (!(innerLoop instanceof Loop && innerLoop.verify() && innerLoop.toPolygon())) {
        invalidLoopIds.push(loopId);
        invalidLoops.push(innerLoop);
      }
    }

    invalidLoops.forEach((loop: Loop) => {
      this.removeChild(loop);
    });

    invalidLoopIds.forEach((loopId: string) => {
      delete this.__innerLoops[loopId];
    });

    if (this.material && !options.ignoreMaterial) {
      this.material.verify();
    }

    return true;
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();

    if (this.outerLoop) {
      this.outerLoop.forEachVertex((vertex: number[]) => {
        bound.appendPoint(vertex);
      });
    } else {
      Logger.console.assert(false, `${this.tag}: undefined outerLoop!`);
    }
  }

  getIO(): Face_IO {
    return Face_IO.instance();
  }

  validateGeometry(): boolean {
    return !!(this.outerLoop && this.outerLoop.root);
  }

  static create(
    innerLoops: InnerLoopsMap | Loop[],
    outerLoop: Loop,
    materialId?: string
  ): Face {
    const face = new Face();
    Face._initFace(face, innerLoops, outerLoop, materialId);
    return face;
  }

  static _initFace(
    face: Face,
    innerLoops: InnerLoopsMap | Loop[],
    outerLoop: Loop,
    materialId?: string
  ): void {
    if (Array.isArray(innerLoops)) {
      innerLoops.forEach((loop: Loop) => {
        face.__innerLoops[loop.id] = loop;
        face.addChild(loop);
      });
    } else {
      face.__innerLoops = innerLoops;
      for (const loop of Object.values(innerLoops)) {
        face.addChild(loop);
      }
    }

    face.__outerLoop = outerLoop;
    face.addChild(outerLoop);

    if (materialId) {
      face.__material = Material.create(materialId);
    }

    face._materialSignalHook.listen(face.material!.signalDirty, face.dirtyMaterial);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFace, Face);