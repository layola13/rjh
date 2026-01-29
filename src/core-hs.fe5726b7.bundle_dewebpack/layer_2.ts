import { Entity, Entity_IO } from './Entity';
import { Slab, SlabFaceType } from './Slab';
import { Wall } from './Wall';
import { Floor } from './Floor';
import { Signal } from './Signal';
import { EntityField, EntityMapField } from './EntityField';
import { Opening } from './Opening';
import { Logger } from './Logger';

export enum LayerTypeEnum {
  LayerTypeNormal = 1,
  LayerTypeBasement = 2
}

Object.freeze(LayerTypeEnum);

export enum SlabTypeCategory {
  Slab = 'slab',
  Molding = 'molding',
  Opening = 'opening',
  Content = 'content',
  Wall = 'wall',
  Group = 'group',
  Light = 'light'
}

Object.freeze(SlabTypeCategory);

const CLASS_TO_CATEGORY_MAP = new Map<string, SlabTypeCategory>();
CLASS_TO_CATEGORY_MAP.set(HSConstants.ModelClass.NgWall, SlabTypeCategory.Wall);
CLASS_TO_CATEGORY_MAP.set(HSConstants.ModelClass.Slab, SlabTypeCategory.Slab);

[
  HSConstants.ModelClass.NgHole,
  HSConstants.ModelClass.NgDoor,
  HSConstants.ModelClass.NgWindow,
  HSConstants.ModelClass.NgOpening
].forEach((modelClass) => {
  CLASS_TO_CATEGORY_MAP.set(modelClass, SlabTypeCategory.Opening);
});

export enum SlabType {
  floor = 'floor',
  ceiling = 'ceiling',
  other = 'other'
}

Object.freeze(SlabType);

export class Layer_IO extends Entity_IO {
  load(
    layer: Layer,
    data: any,
    entityMap: any,
    context: any
  ): void {
    const floorSlabIds = data.floorSlabs || [];
    layer.floorSlabs = {};
    floorSlabIds.forEach((slabId: string) => {
      const slab = Entity.loadFromDumpById(slabId, entityMap, false, context);
      if (slab) {
        layer.floorSlabs[slab.id] = slab as Slab;
      }
    });

    const ceilingSlabIds = data.ceilingSlabs || [];
    layer.ceilingSlabs = {};
    ceilingSlabIds.forEach((slabId: string) => {
      const slab = Entity.loadFromDumpById(slabId, entityMap, false, context);
      if (slab) {
        layer.ceilingSlabs[slab.id] = slab as Slab;
      }
    });

    super.load(layer, data, entityMap, context);

    layer.__prev = Entity.loadFromDumpById(data.prev, entityMap, false, context) as Layer | undefined;
    layer.__next = Entity.loadFromDumpById(data.next, entityMap, false, context) as Layer | undefined;
    layer.__height = data.height;
    layer.__slabThickness = data.slabThickness || HSConstants.Constants.SLAB_THICKNESS;
    layer.displayName = data.displayName || '';
  }
}

export class Layer extends Entity {
  static SlabType = SlabType;

  @EntityField()
  height!: number;

  @EntityField()
  slabThickness!: number;

  @EntityField({
    postSet(this: Layer, oldValue: Layer | undefined, newValue: Layer | undefined): void {
      this._onPrevChanged(oldValue, newValue);
    },
    validate: (value: any) => !value || value instanceof Layer
  })
  prev?: Layer;

  @EntityField({
    postSet(this: Layer, oldValue: Layer | undefined, newValue: Layer | undefined): void {
      this._onNextChanged(oldValue, newValue);
    },
    validate: (value: any) => !value || value instanceof Layer
  })
  next?: Layer;

  @EntityMapField({
    partialSet(this: Layer, value: Record<string, Slab>): void {
      this._setSlabs(SlabType.floor, value);
    },
    binaryEqual: (a: any, b: any) => false
  })
  floorSlabs!: Record<string, Slab>;

  @EntityMapField({
    partialSet(this: Layer, value: Record<string, Slab>): void {
      this._setSlabs(SlabType.ceiling, value);
    },
    binaryEqual: (a: any, b: any) => false
  })
  ceilingSlabs!: Record<string, Slab>;

  __height: number;
  __slabThickness: number;
  __prev?: Layer;
  __next?: Layer;
  __floorSlabs: Record<string, Slab>;
  __ceilingSlabs: Record<string, Slab>;

  displayName: string;
  signalSlabThicknessChanged: Signal<Layer>;
  childrenMap: Record<string, Record<string, Entity>>;

  constructor(id: string = '') {
    super(id);
    this.__height = HSConstants.Constants.DEFAULT_WALL_3D_HEIGHT;
    this.__slabThickness = HSConstants.Constants.SLAB_THICKNESS;
    this.__floorSlabs = {};
    this.__ceilingSlabs = {};
    this.displayName = '';
    this.signalSlabThicknessChanged = new Signal(this);
    this.childrenMap = {};

    Object.values(SlabTypeCategory).forEach((category) => {
      this.childrenMap[category] = {};
    });
  }

  static create(id: string = ''): Layer {
    return new Layer(id);
  }

  get parent(): Entity | undefined {
    return this.getUniqueParent();
  }

  get parents(): Entity[] {
    return this._parents;
  }

  /** @deprecated use Layer.slabThickness instead */
  get thickness(): number {
    if (DEBUG) {
      Logger.console.warn('deprecated, use Layer.slabThickness instead.');
    }
    return this.slabThickness;
  }

  /** @deprecated use Layer.slabThickness instead */
  get __thickness(): number {
    if (DEBUG) {
      Logger.console.warn('deprecated, use Layer.slabThickness instead.');
    }
    return this.__slabThickness;
  }

  /** @deprecated use Layer.slabThickness instead */
  set __thickness(value: number) {
    if (DEBUG) {
      Logger.console.warn('deprecated, use Layer.slabThickness instead.');
    }
    this.__slabThickness = value;
  }

  /** @deprecated use Layer.slabThickness instead */
  getThickness(): number {
    if (DEBUG) {
      Logger.console.warn('deprecated, use Layer.slabThickness instead.');
    }
    return this.slabThickness;
  }

  getHeight(): number {
    return this.height;
  }

  verify(): boolean {
    if (!HSCore.Util.Object.isNumber(this.__height)) {
      this.__height = HSConstants.Constants.DEFAULT_WALL_3D_HEIGHT;
    }
    if (!HSCore.Util.Object.isNumber(this.__slabThickness)) {
      this.__slabThickness = HSConstants.Constants.SLAB_THICKNESS;
    }
    this._verifyChildren();
    return true;
  }

  _verifyChildren(): boolean {
    let hasInvalidWallOrSlab = false;
    const invalidChildren = new Set<Entity>();

    this.forEachChild((child: Entity) => {
      if (child.verify()) {
        if (child instanceof Slab && this.getSlabType(child) === SlabType.other) {
          invalidChildren.add(child);
        }
      } else {
        invalidChildren.add(child);
      }
    });

    invalidChildren.forEach((child) => {
      if (child instanceof Opening) {
        this.removeChild(child);
      }
      if (child instanceof Slab) {
        this.removeChild(child);
        hasInvalidWallOrSlab = true;
      }
      if (child instanceof Wall) {
        this.removeChild(child);
        hasInvalidWallOrSlab = true;
      }
    });

    return hasInvalidWallOrSlab;
  }

  getPrev(): Layer | undefined {
    return this.prev;
  }

  setPrev(layer: Layer | undefined): void {
    this.prev = layer;
  }

  _onPrevChanged(oldPrev: Layer | undefined, newPrev: Layer | undefined): void {
    if (oldPrev && oldPrev.next === this) {
      oldPrev.next = undefined;
    }
    if (newPrev) {
      newPrev.next = this;
    }
  }

  getNext(): Layer | undefined {
    return this.next;
  }

  setNext(layer: Layer | undefined): void {
    this.next = layer;
  }

  _onNextChanged(oldNext: Layer | undefined, newNext: Layer | undefined): void {
    if (oldNext && oldNext.prev === this) {
      oldNext.prev = undefined;
    }
    if (newNext) {
      newNext.prev = this;
    }
  }

  _updateChildrenMap(entity: Entity, category: SlabTypeCategory): void {
    let categoryMap = this.childrenMap[category];
    if (!categoryMap) {
      categoryMap = {};
      this.childrenMap[category] = categoryMap;
    }
    categoryMap[entity.id] = entity;
  }

  getSlabType(slab: Slab): SlabType {
    if (this.isFloorSlab(slab)) {
      return SlabType.floor;
    }
    if (this.isCeilingSlab(slab)) {
      return SlabType.ceiling;
    }
    return SlabType.other;
  }

  getSlabs(slabType: SlabType): Record<string, Slab> {
    return this._getSlabs(slabType);
  }

  _getSlabs(slabType: SlabType): Record<string, Slab> {
    switch (slabType) {
      case SlabType.floor:
        return this.__floorSlabs;
      case SlabType.ceiling:
        return this.__ceilingSlabs;
      default:
        Logger.console.assert(false, 'unexpected slab type!');
        return {};
    }
  }

  setSlabs(slabType: SlabType, slabs: Slab[]): void {
    const slabsMap: Record<string, Slab> = {};
    slabs.forEach((slab) => {
      slabsMap[slab.id] = slab;
    });
    this._setSlabsObj(slabType, slabsMap);
  }

  _setSlabsObj(slabType: SlabType, slabsMap: Record<string, Slab>): void {
    switch (slabType) {
      case SlabType.floor:
        this.floorSlabs = slabsMap;
        break;
      case SlabType.ceiling:
        this.ceilingSlabs = slabsMap;
        break;
      default:
        Logger.console.assert(false, 'unexpected slab type!');
    }
  }

  _setSlabs(slabType: SlabType, newSlabsMap: Record<string, Slab>): void {
    const currentSlabsMap = this._getSlabs(slabType);
    const currentSlabs = Object.values(currentSlabsMap);
    const newSlabs = Object.values(newSlabsMap);
    const removedSlabs = currentSlabs.filter((slab) => !newSlabs.includes(slab));
    const addedSlabs = newSlabs.filter((slab) => !currentSlabs.includes(slab));

    removedSlabs.forEach((slab) => {
      this.removeChild(slab);
      delete currentSlabsMap[slab.id];
    });

    addedSlabs.forEach((slab) => {
      currentSlabsMap[slab.id] = slab;
      this.addChild(slab);
    });
  }

  isFloorSlab(slab: Slab | undefined): boolean {
    return !!slab && this.floorSlabs[slab.id] === slab;
  }

  isCeilingSlab(slab: Slab | undefined): boolean {
    return !!slab && this.ceilingSlabs[slab.id] === slab;
  }

  setFloorSlabs(slabs: Slab[]): void {
    this.setSlabs(SlabType.floor, slabs);
  }

  setCeilingSlabs(slabs: Slab[]): void {
    this.setSlabs(SlabType.ceiling, slabs);
  }

  onChildAdded(child: Entity): void {
    super.onChildAdded(child);
    const category = CLASS_TO_CATEGORY_MAP.get(child.Class);
    if (category) {
      this._updateChildrenMap(child, category);
    }
  }

  onChildRemoved(child: Entity, callSuper: boolean = true): void {
    const category = CLASS_TO_CATEGORY_MAP.get(child.Class);
    if (category) {
      const categoryMap = this.childrenMap[category];
      if (categoryMap) {
        delete categoryMap[child.id];
      }
    }

    if (child instanceof Slab) {
      const slabType = this.getSlabType(child);
      if (slabType === SlabType.floor) {
        delete this.floorSlabs[child.id];
      } else if (slabType === SlabType.ceiling) {
        delete this.ceilingSlabs[child.id];
      }
    }

    if (callSuper) {
      super.onChildRemoved(child, callSuper);
    }
  }

  findWall(predicate: (wall: Wall) => boolean, thisArg?: any): Wall | undefined {
    if (predicate) {
      return Object.values(this.walls).find(predicate, thisArg);
    }
    return undefined;
  }

  forEachPoint(callback: (point: any) => void, thisArg?: any): void {
    if (callback) {
      this.forEachWall(function (wall: Wall) {
        if (wall) {
          callback.call(thisArg, wall.from);
          callback.call(thisArg, wall.to);
        }
      });
    }
  }

  forEachFloorSlab(callback: (slab: Slab) => void, thisArg?: any): void {
    Object.values(this.floorSlabs).forEach(function (slab) {
      callback.call(thisArg, slab);
    }, this);
  }

  forEachCeilingSlab(callback: (slab: Slab) => void, thisArg?: any): void {
    Object.values(this.ceilingSlabs).forEach(function (slab) {
      callback.call(thisArg, slab);
    }, this);
  }

  forEachFloor(callback: (floor: Floor) => void, thisArg?: any): void {
    if (callback) {
      Object.values(this.floorSlabs).forEach(function (slab) {
        const faces = slab.getFaces(SlabFaceType.top);
        Object.values(faces)
          .filter((face) => face instanceof Floor)
          .forEach((floor) => {
            callback.call(thisArg, floor);
          });
      }, this);
    }
  }

  _forEachEntity(
    category: SlabTypeCategory,
    callback: ((entity: Entity) => void) | undefined,
    thisArg?: any
  ): void {
    if (!callback) return;

    const categoryMap = this.childrenMap[category];
    if (categoryMap) {
      for (const entity of Object.values(categoryMap)) {
        callback.call(thisArg, entity);
      }
    }
  }

  forEachRoom(callback: (floor: Floor) => void, thisArg?: any): void {
    if (callback) {
      this.forEachFloorSlab((slab) => {
        const faces = slab.getFaces(SlabFaceType.top);
        Object.values(faces)
          .filter((face) => face instanceof Floor)
          .forEach((floor) => {
            callback.call(thisArg, floor);
          });
      });
    }
  }

  findSlab(predicate: (slab: Slab) => boolean, thisArg?: any): Slab | undefined {
    if (predicate) {
      return Object.values(this.floorSlabs).find(predicate, thisArg);
    }
    return undefined;
  }

  destroy(): void {
    if (!this._disposed) {
      this.__floorSlabs = {};
      this.__ceilingSlabs = {};

      for (const category in this.childrenMap) {
        this.childrenMap[category] = {};
      }

      this.signalSlabThicknessChanged.dispose();
      (this.signalSlabThicknessChanged as any) = undefined;

      super.destroy();
    }
  }

  getIO(): Layer_IO {
    return Layer_IO.instance();
  }

  isValid(): boolean {
    return !this.isOrphan() && this.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
  }

  removeAllChildrenByTypes(categories: SlabTypeCategory[]): void {
    for (const category of categories) {
      const categoryMap = this.childrenMap[category];
      if (categoryMap) {
        Object.values(categoryMap).forEach((entity) => {
          this.removeChild(entity);
        });
      }
    }
  }

  get slabs(): Record<string, Entity> {
    return this.childrenMap[SlabTypeCategory.Slab];
  }

  get walls(): Record<string, Wall> {
    return this.childrenMap[SlabTypeCategory.Wall] as Record<string, Wall>;
  }

  forEachSlab(callback: (slab: Entity) => void, thisArg?: any): void {
    this._forEachEntity(SlabTypeCategory.Slab, callback, thisArg);
  }

  forEachWall(callback: (wall: Entity) => void, thisArg?: any): void {
    this._forEachEntity(SlabTypeCategory.Wall, callback, thisArg);
  }

  forEachOpening(callback: (opening: Entity) => void, thisArg?: any): void {
    this._forEachEntity(SlabTypeCategory.Opening, callback, thisArg);
  }
}

Entity.registerClass(HSConstants.ModelClass.Layer, Layer);