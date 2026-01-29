import { Entity, Entity_IO } from './Entity';
import { Curve } from './Curve';
import { ArcCurve } from './ArcCurve';
import { Vec2 } from './Vec2';
import { Vertex } from './Vertex';
import { EntityField } from './EntityField';
import { CoEdge } from './CoEdge';
import { Logger } from './Logger';

interface EdgeDump {
  ln?: [string, string];
  from?: string;
  to?: string;
  curve: unknown;
  isSplitEdge?: boolean;
  isInnerEdge?: boolean;
  coedge?: string;
  ce?: string;
}

interface ArcInfo {
  center: Vec2;
  radius: number;
  clockwise: boolean;
}

export class Edge_IO extends Entity_IO {
  load(
    entity: Entity,
    dump: EdgeDump,
    context: unknown,
    options: unknown
  ): void {
    super.load(entity, dump, context, options);
    
    const edge = entity as Edge;
    
    if (dump.ln) {
      edge.__from = Entity.loadFromDumpById(dump.ln[0], context, false, options) as Vertex;
      edge.__to = Entity.loadFromDumpById(dump.ln[1], context, false, options) as Vertex;
    } else if (dump.from != null && dump.to != null) {
      edge.__from = Entity.loadFromDumpById(dump.from, context, false, options) as Vertex;
      edge.__to = Entity.loadFromDumpById(dump.to, context, false, options) as Vertex;
    }
    
    edge.__curve = Curve.buildCurveFromDump(dump.curve, context, options);
    edge.isSplitEdge = !!dump.isSplitEdge;
    edge.isInnerEdge = !!dump.isInnerEdge;
    
    if (dump.coedge || dump.ce) {
      edge.__coedge = Entity.loadFromDumpById(
        dump.coedge || dump.ce,
        context,
        false,
        options
      ) as CoEdge;
    }
  }
}

export class Edge extends Entity {
  @EntityField({
    partialSet(this: Edge, value: Vertex): void {
      this._setFrom(value);
    }
  })
  __from!: Vertex;

  @EntityField({
    partialSet(this: Edge, value: Vertex): void {
      this._setTo(value);
    }
  })
  __to!: Vertex;

  @EntityField()
  __curve!: Curve;

  @EntityField()
  __coedge!: CoEdge;

  isSplitEdge: boolean = false;
  isInnerEdge: boolean = false;

  constructor(id: string = '') {
    super(id);
  }

  static create(from: Vertex, to: Vertex): Edge {
    const edge = new Edge();
    edge.__from = from;
    edge.__to = to;
    edge.addChild(from);
    edge.addChild(to);
    return edge;
  }

  get parents(): Record<string, Entity> {
    return this._parents;
  }

  get children(): Record<string, Entity> {
    return this._children;
  }

  get from(): Vertex {
    return this.__from;
  }

  get to(): Vertex {
    return this.__to;
  }

  get curve(): Curve {
    return this.__curve;
  }

  get coedge(): CoEdge {
    return this.__coedge;
  }

  set coedge(value: CoEdge) {
    this.__coedge = value;
  }

  get middle(): Vec2 {
    return new Vec2().lerpVectors(this.from, this.to, 0.5);
  }

  get direction(): Vec2 {
    return Vec2.fromCoordinate(this.__to).subtract(this.__from);
  }

  get center(): Vec2 {
    return this.__curve instanceof ArcCurve ? this.__curve.center : this.middle;
  }

  get clockwise(): boolean {
    return this.__curve instanceof ArcCurve && this.__curve.clockwise;
  }

  get radius(): number {
    return this.__curve instanceof ArcCurve 
      ? this.__curve.getRadius(this.from, this.to) 
      : 0;
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

  get geometry(): [Vec2, Vec2] {
    return [this.from.geometry, this.to.geometry];
  }

  isArcEdge(): boolean {
    return this.__curve instanceof ArcCurve;
  }

  getFrom(): Vertex {
    return this.from;
  }

  getTo(): Vertex {
    return this.to;
  }

  getCurve(): Curve {
    return this.curve;
  }

  getCoedge(): CoEdge {
    return this.coedge;
  }

  _setFrom(vertex: Vertex): void {
    const oldFrom = this.__from;
    if (oldFrom && oldFrom !== this.__to) {
      this.removeChild(oldFrom);
    }
    this.__from = vertex;
    if (vertex) {
      this.addChild(vertex);
    }
  }

  _setTo(vertex: Vertex): void {
    const oldTo = this.__to;
    if (oldTo && oldTo !== this.__from) {
      this.removeChild(oldTo);
    }
    this.__to = vertex;
    if (vertex) {
      this.addChild(vertex);
    }
  }

  copyProperty(source: Edge): void {
    if (source.isSplitEdge) {
      this.isSplitEdge = source.isSplitEdge;
    }
    if (source.isInnerEdge) {
      this.isInnerEdge = source.isInnerEdge;
    }
  }

  onRemovedFromParent(parent: Entity, context?: unknown): void {
    super.onRemovedFromParent(parent, context);
    if (parent === this.coedge) {
      this.coedge = this.getFirstParent() as CoEdge;
    }
  }

  getIO(): Edge_IO {
    return Edge_IO.instance();
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (['from', 'to', 'curve', 'coedge'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(autoFix: boolean = false): boolean {
    if (!(this.__from instanceof Vertex)) {
      log.error(`${this.tag}: invalid from.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__to instanceof Vertex)) {
      log.error(`${this.tag}: invalid to.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!this.__from.verify()) {
      return false;
    }

    if (!this.__to.verify()) {
      return false;
    }

    const parentList = Object.values(this.parents);

    if (!(this.__coedge instanceof CoEdge) && autoFix) {
      const coedgeParents = parentList.filter(parent => parent instanceof CoEdge);
      if (coedgeParents.length > 0) {
        this.__coedge = coedgeParents[0] as CoEdge;
      }
    }

    if (!(this.__coedge instanceof CoEdge)) {
      log.error(`${this.tag}: invalid coedge.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (parentList.length === 1) {
      Logger.console.assert(
        this.__coedge === parentList[0],
        'Edge.coedge should be its parent'
      );
    } else if (parentList.length === 2) {
      const parent0 = parentList[0] as CoEdge;
      const parent1 = parentList[1] as CoEdge;

      Logger.console.assert(
        this.coedge === parent0 || this.coedge === parent1,
        `${this.tag} coedge is invalid!`
      );

      Logger.console.assert(
        parent0.partner === parent1,
        `${this.tag}: ${parent0.tag} partner is not properly set.`
      );

      Logger.console.assert(
        parent1.partner === parent0,
        `${this.tag}: ${parent1.tag} partner is not properly set.`
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