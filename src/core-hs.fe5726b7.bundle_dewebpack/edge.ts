import { Entity, Entity_IO } from './Entity';
import { Vec2 } from './Vec2';
import { EntityField } from './decorators';
import { Line3d, Arc3d, Loader, Vector3 } from './geometry';
import { Curve } from './Curve';
import { Logger } from './Logger';

interface DumpOptions {
  dumpedEntities?: Set<string>;
}

interface LoadContext {
  version: string;
}

interface DumpedEdge {
  ln?: [string, string];
  from?: string;
  to?: string;
  ce?: string;
  coedge?: string;
  curve: any;
  isSplitEdge?: boolean;
  isInnerEdge?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ArcInfo {
  center: Vec2;
  radius: number;
  clockwise: boolean;
}

export class Edge_IO extends Entity_IO {
  dump(
    entity: Edge,
    callback?: (data: any[], edge: Edge) => void,
    includeRelated: boolean = true,
    options: DumpOptions = {}
  ): any[] {
    let dumpData = super.dump(entity, undefined, includeRelated, options);
    const dumpedObject = dumpData[0];
    const edge = entity;

    if (includeRelated) {
      if (!options.dumpedEntities?.has(edge.__from.id)) {
        dumpData = dumpData.concat(edge.__from.dump(callback));
      }
      if (!options.dumpedEntities?.has(edge.__to.id)) {
        dumpData = dumpData.concat(edge.__to.dump(callback));
      }
    }

    dumpedObject.ln = [edge.__from.id, edge.__to.id];

    if (edge.coedge) {
      dumpedObject.ce = edge.coedge.id;
    }

    dumpedObject.curve = edge.__curve.dump();

    if (edge.isSplitEdge) {
      dumpedObject.isSplitEdge = edge.isSplitEdge;
    }

    if (edge.isInnerEdge) {
      dumpedObject.isInnerEdge = edge.isInnerEdge;
    }

    if (callback) {
      callback(dumpData, edge);
    }

    return dumpData;
  }

  load(edge: Edge, dumpedData: DumpedEdge, context: LoadContext): void {
    super.load(edge, dumpedData, context);

    if (dumpedData.ln) {
      edge.__from = Entity.loadFromDumpById(dumpedData.ln[0], context);
      edge.__to = Entity.loadFromDumpById(dumpedData.ln[1], context);
    } else if (dumpedData.from != null && dumpedData.to != null) {
      edge.__from = Entity.loadFromDumpById(dumpedData.from, context);
      edge.__to = Entity.loadFromDumpById(dumpedData.to, context);
    }

    if (HSCore.Util.Version.isEarlierThan(context.version, "0.50")) {
      const curve = Curve.buildCurveFromDump(dumpedData.curve, context);
      
      if (curve) {
        const center: Point3D = {
          x: curve.center.x,
          y: curve.center.y,
          z: 0
        };
        const fromPoint: Point3D = {
          x: edge.__from.x,
          y: edge.__from.y,
          z: 0
        };
        const toPoint: Point3D = {
          x: edge.to.x,
          y: edge.to.y,
          z: 0
        };
        const radius = HSCore.Util.Math.getDistance3(center, fromPoint);
        
        edge.__curve = Arc3d.makeArcByStartEndPoints(
          center,
          radius,
          { x: 0, y: 0, z: 1 },
          fromPoint,
          toPoint,
          !curve.clockwise
        );
      } else {
        edge.__curve = new Line3d(edge.__from, edge.__to);
      }
    } else {
      edge.__curve = Loader.load(dumpedData.curve);
    }

    edge.isSplitEdge = !!dumpedData.isSplitEdge;
    edge.isInnerEdge = !!dumpedData.isInnerEdge;

    if (dumpedData.coedge || dumpedData.ce) {
      edge.__coedge = Entity.loadFromDumpById(
        dumpedData.coedge || dumpedData.ce,
        context
      );
    }
  }
}

export class Edge extends Entity {
  public isSplitEdge: boolean = false;
  public isInnerEdge: boolean = false;

  protected __from!: HSCore.Model.Vertex;
  protected __to!: HSCore.Model.Vertex;
  protected __curve!: Line3d | Arc3d;
  protected __coedge?: HSCore.Model.CoEdge;

  constructor(id: string = "", type?: string) {
    super(id, type);
  }

  static create(
    fromVertex: HSCore.Model.Vertex,
    toVertex: HSCore.Model.Vertex,
    curve: Line3d | Arc3d = new Line3d(fromVertex, toVertex)
  ): Edge {
    const edge = new Edge();
    edge.__from = fromVertex;
    edge.__to = toVertex;
    edge.__curve = curve;
    edge.addChild(fromVertex);
    edge.addChild(toVertex);
    return edge;
  }

  get parents(): Record<string, Entity> {
    return this._parents;
  }

  get children(): Record<string, Entity> {
    return this._children;
  }

  get middle(): Vec2 {
    return new Vec2().lerpVectors(this.from, this.to, 0.5);
  }

  get direction(): Vec2 {
    return Vec2.fromCoordinate(this.__to).subtract(this.__from);
  }

  get center(): Vec2 {
    return this.__curve.isArc3d() ? this.__curve.getCenter() : this.middle;
  }

  get clockwise(): boolean {
    return false;
  }

  get radius(): number {
    return this.__curve.isArc3d() ? this.__curve.getA() : 0;
  }

  get arcInfo(): ArcInfo | undefined {
    return this.isArcEdge()
      ? {
          center: this.center,
          radius: this.radius,
          clockwise: this.clockwise
        }
      : undefined;
  }

  get geometry(): [any, any] {
    return [this.from.geometry, this.to.geometry];
  }

  @EntityField({
    partialSet(this: Edge, value: HSCore.Model.Vertex): void {
      this._setFrom(value);
    }
  })
  public from!: HSCore.Model.Vertex;

  @EntityField({
    partialSet(this: Edge, value: HSCore.Model.Vertex): void {
      this._setTo(value);
    }
  })
  public to!: HSCore.Model.Vertex;

  @EntityField()
  public curve!: Line3d | Arc3d;

  @EntityField()
  public coedge?: HSCore.Model.CoEdge;

  isArcEdge(): boolean {
    return this.__curve.isArc3d();
  }

  getFrom(): HSCore.Model.Vertex {
    return this.from;
  }

  setFrom(vertex: HSCore.Model.Vertex): void {
    this.from = vertex;
  }

  getTo(): HSCore.Model.Vertex {
    return this.to;
  }

  setTo(vertex: HSCore.Model.Vertex): void {
    this.to = vertex;
  }

  getCurve(): Line3d | Arc3d {
    return this.curve;
  }

  setCurve(curve: Line3d | Arc3d): void {
    this.curve = curve;
  }

  getCoedge(): HSCore.Model.CoEdge | undefined {
    return this.coedge;
  }

  setCoedge(coedge: HSCore.Model.CoEdge): void {
    this.coedge = coedge;
  }

  protected _setFrom(vertex: HSCore.Model.Vertex): void {
    const oldFrom = this.__from;
    if (oldFrom && oldFrom !== this.__to) {
      this.removeChild(oldFrom);
    }
    this.__from = vertex;
    this._updateCurve(this.__from, this.__to);
    if (vertex) {
      this.addChild(vertex);
    }
  }

  protected _setTo(vertex: HSCore.Model.Vertex): void {
    const oldTo = this.__to;
    if (oldTo && oldTo !== this.__from) {
      this.removeChild(oldTo);
    }
    this.__to = vertex;
    this._updateCurve(this.__from, this.__to);
    if (vertex) {
      this.addChild(vertex);
    }
  }

  protected _updateCurve(fromVertex: HSCore.Model.Vertex, toVertex: HSCore.Model.Vertex): void {
    if (this.curve.isLine3d()) {
      this.__curve = new Line3d(fromVertex, toVertex);
    }
  }

  changeToArcEdge(center: Vec2, clockwise: boolean): void {
    if (this.curve instanceof Arc3d) {
      Logger.console.warn("it is already arc edge!");
      return;
    }

    const radius = center.distanceTo(this.__from);
    const arcCurve = Arc3d.makeArcByStartEndPoints(
      center,
      radius,
      Vector3.Z(),
      this.__from,
      this.__to,
      !clockwise
    );
    this.curve = arcCurve;
  }

  copyProperty(sourceEdge: Edge): void {
    if (sourceEdge.isSplitEdge) {
      this.isSplitEdge = sourceEdge.isSplitEdge;
    }
    if (sourceEdge.isInnerEdge) {
      this.isInnerEdge = sourceEdge.isInnerEdge;
    }
  }

  onRemovedFromParent(parent: Entity, replacement?: Entity): void {
    super.onRemovedFromParent(parent, replacement);
    if (parent === this.coedge) {
      this.coedge = this.getFirstParent() as HSCore.Model.CoEdge;
    }
  }

  getIO(): Edge_IO {
    return Edge_IO.instance();
  }

  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void {
    if (["from", "to", "curve", "coedge"].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  onChildDirty(child: Entity, dirtyType: any): void {
    this.dirtyGeometry();
    super.onChildDirty(child, dirtyType);
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(autoFix: boolean = false): boolean {
    if (!(this.__from instanceof HSCore.Model.Vertex)) {
      log.error(`${this.tag}: invalid from.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!(this.__to instanceof HSCore.Model.Vertex)) {
      log.error(`${this.tag}: invalid to.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__from.verify()) {
      return false;
    }

    if (!this.__to.verify()) {
      return false;
    }

    const parentList = Object.values(this.parents);

    if (!(this.__coedge instanceof HSCore.Model.CoEdge) && autoFix) {
      const coedgeParents = parentList.filter(
        (parent) => parent instanceof HSCore.Model.CoEdge
      );
      if (coedgeParents.length > 0) {
        this.__coedge = coedgeParents[0] as HSCore.Model.CoEdge;
      }
    }

    if (!(this.__coedge instanceof HSCore.Model.CoEdge)) {
      log.error(`${this.tag}: invalid coedge.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (parentList.length === 1) {
      Logger.console.assert(
        this.__coedge === parentList[0],
        "Edge.coedge should be its parent"
      );
    } else if (parentList.length === 2) {
      const parent1 = parentList[0];
      const parent2 = parentList[1];
      Logger.console.assert(
        this.coedge === parent1 || this.coedge === parent2,
        `${this.tag} coedge is invalid!`
      );
      Logger.console.assert(
        (parent1 as HSCore.Model.CoEdge).partner === parent2,
        `${this.tag}: ${(parent1 as any).tag} partner is not properly set.`
      );
      Logger.console.assert(
        (parent2 as HSCore.Model.CoEdge).partner === parent1,
        `${this.tag}: ${(parent2 as any).tag} partner is not properly set.`
      );
    } else if (parentList.length > 2) {
      Logger.console.assert(false, `${this.tag} has more than two parents`);
    } else {
      Logger.console.assert(false, `${this.tag} has no parent`);
    }

    return true;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgEdge, Edge);