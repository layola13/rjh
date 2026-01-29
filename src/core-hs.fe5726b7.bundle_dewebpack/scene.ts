import { Entity, Entity_IO } from './Entity';
import { Layer } from './Layer';
import { Signal } from './Signal';
import { EntityField, EntityMapField } from './decorators';
import { LayerUtil } from './LayerUtil';

interface SceneDump {
  layers: string[];
  rootLayer: string;
  activeLayer: string;
  ceilingLayer: string;
  outdoorLayer: string;
  previewLayer?: string;
  version?: string;
}

interface DumpContext {
  version: string;
}

interface LayersMap {
  [id: string]: Layer;
}

export class Scene_IO extends Entity_IO {
  private static _instance: Scene_IO;

  static instance(): Scene_IO {
    if (!Scene_IO._instance) {
      Scene_IO._instance = new Scene_IO();
    }
    return Scene_IO._instance;
  }

  load(
    entity: Entity,
    dump: SceneDump,
    context: DumpContext,
    loadFromDumpById: (id: string, context: DumpContext, createIfMissing: boolean, loader: unknown) => Entity | undefined
  ): void {
    super.load(entity, dump, context, loadFromDumpById);

    const scene = entity as Scene;

    for (const layerId of dump.layers) {
      const layer = Entity.loadFromDumpById(layerId, context, false, loadFromDumpById) as Layer | undefined;
      if (layer) {
        scene._layers[layerId] = layer;
      }
    }

    scene._rootLayer = Entity.loadFromDumpById(dump.rootLayer, context, false, loadFromDumpById) as Layer | undefined;
    scene._activeLayer = Entity.loadFromDumpById(dump.activeLayer, context, false, loadFromDumpById) as Layer | undefined;
    scene._ceilingLayer = Entity.loadFromDumpById(dump.ceilingLayer, context, false, loadFromDumpById) as Layer | undefined;
    scene._outdoorLayer = Entity.loadFromDumpById(dump.outdoorLayer, context, false, loadFromDumpById) as Layer | undefined;

    if (!scene._ceilingLayer) {
      const ceilingLayer = Layer.create();
      scene._ceilingLayer = ceilingLayer;
      scene._layers[ceilingLayer.id] = ceilingLayer;
      scene.addChild(ceilingLayer, false);
    }

    if (dump.previewLayer) {
      const previewLayer = Layer.create(dump.previewLayer);
      scene._previewLayer = previewLayer;
      scene.addChild(previewLayer, false);
    }

    try {
      scene._migrateCeiling(dump, context);
      scene._migrateLayers(dump, context);
      scene._migrateWalls(dump, context);
    } catch (error) {
      if (error instanceof Error) {
        log.error(`Floorplan throws '${error.stack}' while doing migration`, 'HSCore.Load.Error');
      }
    }
  }
}

export class Scene extends Entity {
  _layers: LayersMap = {};
  _rootLayer?: Layer;
  _outdoorLayer?: Layer;
  _ceilingLayer?: Layer;
  _activeLayer?: Layer;
  _previewLayer?: Layer;
  __baseHeight: number = 0;

  signalActiveLayerChanged: Signal<Scene>;
  signalLayerAdded: Signal<Scene>;
  signalBaseHeightChanged: Signal<Scene>;

  @EntityField({
    prefix: '_',
    validate(this: Scene, value: unknown): boolean {
      return !value || (value instanceof Layer && value !== this._outdoorLayer);
    }
  })
  rootLayer?: Layer;

  @EntityField({
    prefix: '_',
    validate: (value: unknown): boolean => !value || value instanceof Layer
  })
  outdoorLayer?: Layer;

  @EntityField({
    prefix: '_',
    partialSet(this: Scene, value: Layer | undefined): void {
      this._setCeilingLayer(value);
    },
    validate(this: Scene, value: unknown): boolean {
      return !value || (value instanceof Layer && value !== this._outdoorLayer);
    }
  })
  ceilingLayer?: Layer;

  @EntityField({
    prefix: '_',
    validate(this: Scene, value: unknown): boolean {
      return !value || (value instanceof Layer && value !== this._outdoorLayer);
    }
  })
  activeLayer?: Layer;

  @EntityMapField({
    prefix: '_',
    partialSet(this: Scene, value: LayersMap): void {
      this._setLayers(value);
    }
  })
  layers?: LayersMap;

  @EntityField()
  baseHeight?: number;

  constructor(id: string = '') {
    super(id);
    this._layers = {};
    this.__baseHeight = 0;
    this.signalActiveLayerChanged = new Signal(this);
    this.signalLayerAdded = new Signal(this);
    this.signalBaseHeightChanged = new Signal(this);
  }

  isRoot(): boolean {
    return true;
  }

  destroy(): void {
    if (this._disposed) return;

    this.signalActiveLayerChanged.dispose();
    this.signalActiveLayerChanged = undefined as unknown as Signal<Scene>;
    this.signalLayerAdded.dispose();
    this.signalLayerAdded = undefined as unknown as Signal<Scene>;
    this.signalBaseHeightChanged.dispose();
    this.signalBaseHeightChanged = undefined as unknown as Signal<Scene>;

    this._rootLayer = undefined;
    this._outdoorLayer = undefined;
    this._ceilingLayer = undefined;
    this._activeLayer = undefined;
    this._previewLayer = undefined;
    this._layers = {};

    super.destroy();
  }

  getBaseHeight(): number {
    return this.baseHeight ?? 0;
  }

  get lastLayer(): Layer | undefined {
    let layer = this._rootLayer;
    while (layer?.next) {
      layer = layer.next;
    }
    return layer;
  }

  get lowestLayer(): Layer | undefined {
    let layer = this._rootLayer;
    while (layer?.prev) {
      layer = layer.prev;
    }
    return layer;
  }

  get previewLayer(): Layer {
    if (!this._previewLayer) {
      this._previewLayer = Layer.create();
      this.addChild(this._previewLayer);
    }
    return this._previewLayer;
  }

  getLayerAltitude(layer: Layer): number {
    if (this.ceilingLayer === layer) {
      const topLayer = this.lastLayer;
      if (topLayer) {
        return this.getLayerAltitude(topLayer) + topLayer.height + layer.slabThickness;
      }
    }

    if (!(this._rootLayer && layer !== this._rootLayer && layer instanceof Layer && 
          layer !== this._previewLayer && layer !== this._outdoorLayer)) {
      return this.__baseHeight;
    }

    let altitude = this.__baseHeight + this._rootLayer.height;
    let currentLayer: Layer | undefined = this._rootLayer.next;

    while (currentLayer) {
      if (layer === currentLayer) {
        return altitude + currentLayer.slabThickness;
      }
      altitude += currentLayer.height + currentLayer.slabThickness;
      currentLayer = currentLayer.next;
    }

    altitude = this.__baseHeight - this._rootLayer.slabThickness;
    currentLayer = this._rootLayer.prev;

    while (currentLayer) {
      if (layer === currentLayer) {
        return altitude - currentLayer.height;
      }
      altitude -= currentLayer.height + currentLayer.slabThickness;
      currentLayer = currentLayer.prev;
    }

    return altitude;
  }

  isUndergroundLayer(layer: Layer): boolean {
    let currentLayer = this._rootLayer?.prev;
    while (currentLayer) {
      if (layer === currentLayer) return true;
      currentLayer = currentLayer.prev;
    }
    return false;
  }

  isSurfaceLayer(layer: Layer): boolean {
    let currentLayer = this._rootLayer;
    while (currentLayer) {
      if (layer === currentLayer) return true;
      currentLayer = currentLayer.next;
    }
    return false;
  }

  _addLayer(layer: Layer | undefined): boolean {
    if (!layer) return false;

    const updatedLayers = { ...this._layers };
    updatedLayers[layer.id] = layer;
    this.layers = updatedLayers;

    return true;
  }

  _setCeilingLayer(layer: Layer | undefined): void {
    this._ceilingLayer = layer;
    this._addLayer(layer);
  }

  _setLayers(newLayers: LayersMap): void {
    const currentLayersList = Object.values(this._layers);
    const newLayersList = Object.values(newLayers);

    const removedLayers = currentLayersList.filter(layer => !newLayersList.includes(layer));
    const addedLayers = newLayersList.filter(layer => !currentLayersList.includes(layer));

    removedLayers.forEach(layer => {
      delete this._layers[layer.id];
      this.removeChild(layer);
    });

    addedLayers.forEach(layer => {
      this._layers[layer.id] = layer;
      this.addChild(layer);
    });
  }

  findLayer(predicate: (layer: Layer) => boolean, thisArg?: unknown): Layer | undefined {
    if (predicate) {
      return Object.values(this._layers).find(predicate, thisArg);
    }
  }

  forEachLayer(callback: (layer: Layer) => void, thisArg?: unknown): void {
    if (callback) {
      Object.values(this._layers).forEach(function(layer) {
        callback.call(thisArg, layer);
      }, this);
    }
  }

  getLayersInOrder(): Layer[] {
    const orderedLayers: Layer[] = [];

    let currentLayer = this.rootLayer?.prev;
    while (currentLayer) {
      orderedLayers.push(currentLayer);
      currentLayer = currentLayer.prev;
    }

    orderedLayers.reverse();

    if (this.outdoorLayer) {
      orderedLayers.push(this.outdoorLayer);
    }

    currentLayer = this.rootLayer;
    while (currentLayer) {
      orderedLayers.push(currentLayer);
      currentLayer = currentLayer.next;
    }

    if (this.ceilingLayer) {
      orderedLayers.push(this.ceilingLayer);
    }

    return orderedLayers;
  }

  getIO(): Scene_IO {
    return Scene_IO.instance();
  }

  verify(): boolean {
    if (!(this._rootLayer instanceof Layer)) {
      log.error(`${this.tag}: invalid rootLayer.`, 'HSCore.Verify.Error', true);
      this._rootLayer = Layer.create();
    }

    if (!(this._ceilingLayer instanceof Layer)) {
      log.error(`${this.tag}: invalid ceilingLayer.`, 'HSCore.Verify.Error', true);
      this._ceilingLayer = Layer.create();
    }

    if (!(this._outdoorLayer instanceof Layer)) {
      log.error(`${this.tag}: invalid outdoorLayer.`, 'HSCore.Verify.Error', true);
      this._outdoorLayer = Layer.create();
    }

    if (!(this._activeLayer instanceof Layer)) {
      log.error(`${this.tag}: invalid activeLayer.`, 'HSCore.Verify.Error', true);
      this._activeLayer = this.rootLayer;
    }

    const validLayers = this.getLayersInOrder().filter(layer => 
      layer instanceof Layer && layer.verify()
    );

    this._layers = {};
    this._children = {};

    validLayers.forEach(layer => {
      this._layers[layer.id] = layer;
      this.addChild(layer);

      const underLayer = LayerUtil.getUnderLayer(layer);
      if (underLayer) {
        const slabSet = new Set();
        underLayer.forEachCeilingSlab(slab => slabSet.add(slab));
        layer.forEachFloorSlab(slab => slabSet.add(slab));

        const slabs = Array.from(slabSet);
        underLayer.setCeilingSlabs(slabs);
        layer.setFloorSlabs(slabs);
      }
    }, this);

    return true;
  }

  forEachPoint(callback: (point: unknown) => void, thisArg?: unknown): void {
    if (callback) {
      this.forEachLayer(layer => {
        layer.forEachWall(wall => {
          callback.call(thisArg, wall.from);
          callback.call(thisArg, wall.to);
        });
      });
    }
  }

  _migrateCeiling(dump: SceneDump, context: DumpContext): void {
    if (HSCore.Util.Version.isEarlierThan(context.version, '0.3')) {
      const migrateCeilingFace = (face: unknown): void => {
        if (!face || face instanceof HSCore.Model.Ceiling) return;

        const parent = face.getUniqueParent();
        if (!parent) return;

        const ceiling = HSCore.Model.Ceiling.create(face.innerLoops, face.outerLoop, face.material);
        const faceType = HSCore.Model.SlabFaceType.bottom;
        parent.addFace(faceType, ceiling);
        parent.removeFace(faceType, face);
      };

      this.forEachFloor(floor => {
        const floorCeiling = HSCore.Util.Floor.getFloorCeiling(floor);
        migrateCeilingFace(floorCeiling);
      });
    }
  }

  _migrateWalls(dump: SceneDump, context: DumpContext): void {
    if (HSCore.Util.Version.isEarlierThan(context.version, '0.4')) {
      this.forEachWall(wall => {
        wall.updateFaces();
      });
    }
  }

  _migrateLayers(dump: SceneDump, context: DumpContext): void {
    if (HSCore.Util.Version.isEarlierThan(context.version, '0.2')) {
      this.forEachLayer(layer => {
        const slabs = Object.values(layer.slabs);
        layer.setFloorSlabs(slabs);
      });

      this.forEachLayer(layer => {
        const underLayer = LayerUtil.getUnderLayer(layer);
        if (underLayer) {
          const floorSlabs = Object.values(layer.floorSlabs);
          underLayer.setCeilingSlabs(floorSlabs);
        }
      });
    }
  }

  forEachFloor(callback: (floor: unknown) => void, thisArg?: unknown): void {
    if (callback) {
      this.forEachLayer(layer => {
        layer.forEachFloor(floor => {
          callback.call(thisArg, floor);
        });
      });
    }
  }

  forEachWall(callback: (wall: unknown) => void, thisArg?: unknown): void {
    if (callback) {
      this.forEachLayer(layer => {
        layer.forEachWall(wall => {
          callback.call(thisArg, wall);
        });
      });
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.Scene, Scene);