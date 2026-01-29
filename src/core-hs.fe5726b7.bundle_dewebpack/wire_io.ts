import { Entity_IO, Entity } from './Entity';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Line2d } from './Line2d';
import { EntityField, isSameMap } from './EntityField';
import { Logger } from './Logger';

interface Point2d {
  x: number;
  y: number;
}

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface DumpOptions {
  idGenerator?: {
    getNewId: (id: string) => string;
  };
}

interface ReverseFlags {
  [curveId: string]: boolean;
}

type Curve2d = Line2d | Circle2d | CircleArc2d;

class Wire_IO extends Entity_IO {
  private static _Wire_IO_instance: Wire_IO;

  static instance(): Wire_IO {
    if (!Wire_IO._Wire_IO_instance) {
      Wire_IO._Wire_IO_instance = new Wire_IO();
    }
    return Wire_IO._Wire_IO_instance;
  }

  dump(
    entity: Wire,
    callback?: (dump: any, entity: Wire) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): any {
    const dumpResult = super.dump(entity, undefined, includeChildren, options);
    const entityData = dumpResult[0];
    
    entityData.curves = entity.__curves.map(curve => curve.id);
    
    if (JSON.stringify(entity.__reverseFlags) !== '{}') {
      entityData.reverseFlags = { ...entity.__reverseFlags };
    }
    
    if (callback) {
      callback(dumpResult, entity);
    }
    
    return dumpResult;
  }

  load(entity: Wire, data: any, options: DumpOptions = {}): void {
    super.load(entity, data, options);
    
    const curves: Curve2d[] = [];
    data.curves.forEach((curveId: string) => {
      const curve = Entity.loadFromDumpById(curveId, options) as Curve2d;
      if (curve) {
        curves.push(curve);
      }
    });
    
    entity.__curves = curves;
    
    if (data.reverseFlags) {
      if (options.idGenerator?.getNewId) {
        entity.__reverseFlags = Object.keys(data.reverseFlags).reduce((acc, oldId) => {
          const newId = options.idGenerator!.getNewId(oldId);
          acc[newId] = data.reverseFlags[oldId];
          return acc;
        }, {} as ReverseFlags);
      } else {
        entity.__reverseFlags = { ...data.reverseFlags };
      }
    }
    
    entity.fixReverse();
  }
}

class Wire extends Entity {
  __curves: Curve2d[] = [];
  __reverseFlags: ReverseFlags = {};

  @EntityField({
    get() {
      return this.__curves.slice();
    },
    partialSet(value: Curve2d[]) {
      this.__curves = value.slice();
    }
  })
  curves: Curve2d[] = [];

  @EntityField({
    binaryEqual: isSameMap
  })
  reverseFlags!: ReverseFlags;

  constructor(tag: string = '', parent?: Entity) {
    super(tag, parent);
  }

  static create(curves: Curve2d[]): Wire {
    const wire = new Wire();
    wire.setCurves(curves);
    return wire;
  }

  setCurves(curves: Curve2d[], updateChildren: boolean = true): void {
    const oldCurves = this.curves.slice();
    this.curves = curves;
    this.replaceChildren(oldCurves, curves, updateChildren);
    
    const reverseFlags: ReverseFlags = {};
    for (const curve of this.__curves) {
      reverseFlags[curve.id] = this.isReversedCurve(curve);
    }
    this.reverseFlags = reverseFlags;
  }

  get points(): (Point2d | undefined)[] {
    return this._getPoints();
  }

  get discretePoints(): Point2d[] {
    return this.getDiscretePoints();
  }

  setReverse(curve: Curve2d, reversed: boolean): void {
    if (!this.__curves.includes(curve)) {
      return;
    }
    
    if (this.__reverseFlags[curve.id] === reversed) {
      return;
    }
    
    const newReverseFlags = { ...this.__reverseFlags };
    newReverseFlags[curve.id] = reversed;
    this.reverseFlags = newReverseFlags;
  }

  isReversedCurve(curve: Curve2d): boolean {
    const index = this.curves.indexOf(curve);
    if (index < 0) {
      return false;
    }
    return this._isReversedCurveByIndex(index);
  }

  isReversed(index: number): boolean {
    return this._isReversedCurveByIndex(index);
  }

  private _isReversedCurveByIndex(index: number): boolean {
    if (index < 0) {
      return false;
    }
    
    const curves = this.curves;
    const curve = curves[index];
    
    if (!curve) {
      return false;
    }
    
    if (curves.length < 3) {
      return this.__reverseFlags.hasOwnProperty(curve.id) && this.__reverseFlags[curve.id];
    }
    
    const nextCurve = curves[(index + 1) % curves.length];
    return [nextCurve.from, nextCurve.to].includes(curve.from);
  }

  getIO(): Wire_IO {
    return Wire_IO.instance();
  }

  verify(): boolean {
    const childrenArray = Object.values(this.children);
    
    for (const curve of this.curves) {
      if (!childrenArray.includes(curve)) {
        log.error(`${curve.tag} is not a child of ${this.tag}`, 'HSCore.Verify.Error', true);
        return false;
      }
    }
    
    if (!this.getUniqueParent()) {
      log.error(`${this.tag} have no unique parent.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    if (this.points.some(point => !point)) {
      log.error(`${this.tag} has undefined points.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    return super.verify();
  }

  onFieldChanged(fieldName: string, newValue: any, oldValue: any): void {
    if (['curves', 'reverseFlags'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  onChildDirty(child: Entity, dirtyType: any): void {
    this.dirtyGeometry();
    super.onChildDirty(child, dirtyType);
  }

  onChildRemoved(child: Entity): void {
    const curveToRemove = this.__curves.find(curve => curve.id === child.id);
    
    if (curveToRemove) {
      const newCurves = [...this.__curves];
      newCurves.xRemove(curveToRemove);
      this.curves = newCurves;
    }
    
    super.onChildRemoved(child);
  }

  isOuter(): boolean {
    const parent = this.getUniqueParent();
    return !!parent && parent.outerLoop === this;
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();
    
    for (const curve of this.curves) {
      bound.appendBound(curve.bound);
    }
  }

  replaceCurveByCurves(oldCurve: Curve2d, newCurves: Curve2d[], updateChildren: boolean = true): boolean {
    const curves = this.curves;
    const index = curves.indexOf(oldCurve);
    
    if (index < 0) {
      return false;
    }
    
    if (this.isReversedCurve(oldCurve)) {
      const reversedCurves = newCurves.slice().reverse();
      curves.splice(index, 1, ...reversedCurves);
    } else {
      curves.splice(index, 1, ...newCurves);
    }
    
    this.setCurves(curves, updateChildren);
    return true;
  }

  getDiscretePoints(): Point2d[] {
    const points: Point2d[] = [];
    const curves = this.curves;
    
    for (let i = 0; i < curves.length; i++) {
      const curve = curves[i];
      const isReversed = this._isReversedCurveByIndex(i);
      
      if (curve instanceof CircleArc2d) {
        const arcPoints = curve.discretePoints.slice();
        if (isReversed) {
          arcPoints.reverse();
        }
        points.xPushCollection(arcPoints);
      }
      
      if (curve instanceof Circle2d) {
        const circlePoints = curve.discretePoints.slice(0, -1);
        if (isReversed) {
          circlePoints.reverse();
        }
        points.xPushCollection(circlePoints);
      }
      
      if (curve instanceof Line2d) {
        const point = isReversed ? curve.end : curve.start;
        Logger.console.assert(Boolean(point), `${curve.tag} undefined start point!`);
        
        if (point) {
          points.push({ x: point.x, y: point.y });
        }
      }
    }
    
    return points;
  }

  getPath(): (Point2d | undefined)[] {
    return this._getPoints();
  }

  private _getPoints(): (Point2d | undefined)[] {
    if (this.__curves.length < 1) {
      return [];
    }
    
    const points: (Point2d | undefined)[] = [];
    const curves = this.__curves.slice();
    
    if (
      curves.length === 2 &&
      (curves[0] instanceof CircleArc2d || curves[1] instanceof CircleArc2d) &&
      curves[0].from === curves[1].from &&
      curves[0].to === curves[1].to
    ) {
      points.push(curves[0].from);
      points.push(curves[0].to);
    } else {
      curves.push(curves[0]);
      
      for (let i = 0; i < curves.length - 1; i++) {
        const currentCurve = curves[i];
        const nextCurve = curves[i + 1];
        const point = 
          currentCurve.from === nextCurve.from || currentCurve.from === nextCurve.to
            ? currentCurve.from
            : currentCurve.to;
        
        if (point) {
          points.push(point);
        }
      }
    }
    
    return points;
  }

  get bbx(): BoundingBox {
    const curves = this.__curves;
    let minX: number | undefined;
    let maxX: number | undefined;
    let minY: number | undefined;
    let maxY: number | undefined;
    
    const firstCurve = curves[0];
    
    if (curves.length === 1 && firstCurve instanceof Circle2d) {
      minX = firstCurve.center.x - firstCurve.radius;
      maxX = firstCurve.center.x + firstCurve.radius;
      minY = firstCurve.center.y - firstCurve.radius;
      maxY = firstCurve.center.y + firstCurve.radius;
    } else {
      const discretePoints = this.getDiscretePoints();
      
      for (const curve of curves) {
        if (curve instanceof CircleArc2d) {
          if (curve.leftPoint) discretePoints.push(curve.leftPoint);
          if (curve.rightPoint) discretePoints.push(curve.rightPoint);
          if (curve.topPoint) discretePoints.push(curve.topPoint);
          if (curve.bottomPoint) discretePoints.push(curve.bottomPoint);
        }
      }
      
      if (discretePoints.length > 0) {
        minX = discretePoints[0].x;
        maxX = discretePoints[0].x;
        minY = discretePoints[0].y;
        maxY = discretePoints[0].y;
        
        for (const point of discretePoints) {
          minX = minX < point.x ? minX : point.x;
          maxX = maxX > point.x ? maxX : point.x;
          minY = minY < point.y ? minY : point.y;
          maxY = maxY > point.y ? maxY : point.y;
        }
      }
    }
    
    const bound = this.bound;
    const boundMin = bound.getMin();
    const boundMax = bound.getMax();
    const nearlyEquals = HSCore.Util.Math.nearlyEquals;
    
    Logger.console.assert(
      nearlyEquals(boundMin.x, minX) &&
      nearlyEquals(boundMax.x, maxX) &&
      nearlyEquals(boundMin.y, minY) &&
      nearlyEquals(boundMax.y, maxY),
      'should be equal!'
    );
    
    return { minX: minX!, maxX: maxX!, minY: minY!, maxY: maxY! };
  }

  isIncludeNonLinearCurve(): boolean {
    if (this.__curves.length < 1) {
      return false;
    }
    
    for (let i = 0; i < this.__curves.length; i++) {
      if (!(this.__curves[i] instanceof Line2d)) {
        return true;
      }
    }
    
    return false;
  }

  fixReverse(): void {
    const reverseFlags: ReverseFlags = {};
    
    if (this.curves && this.curves.length > 1) {
      let currentCurve = this.curves[0];
      reverseFlags[currentCurve.id] = false;
      
      let nextCurve = this.curves[1];
      if (nextCurve.from !== currentCurve.from && nextCurve.to !== currentCurve.from) {
        // Keep false
      } else {
        reverseFlags[currentCurve.id] = true;
      }
      
      for (let i = 1; i < this.curves.length; i++) {
        nextCurve = this.curves[i];
        
        if (reverseFlags[currentCurve.id]) {
          reverseFlags[nextCurve.id] = nextCurve.to === currentCurve.from;
        } else {
          reverseFlags[nextCurve.id] = nextCurve.to === currentCurve.to;
        }
        
        currentCurve = nextCurve;
      }
      
      this.reverseFlags = reverseFlags;
    }
  }

  addChild(child: Entity, updateParent?: boolean): boolean {
    if (child instanceof Line2d) {
      if (!child.hasChild(child.start)) {
        child.addChild(child.start);
      }
      if (!child.hasChild(child.end)) {
        child.addChild(child.end);
      }
    }
    
    return super.addChild(child, updateParent);
  }
}

Entity.registerClass(HSConstants.ModelClass.Wire, Wire);

export { Wire_IO, Wire };