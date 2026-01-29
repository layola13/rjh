import { Entity, Entity_IO } from './Entity';
import { Edge } from './Edge';
import { EntityField } from './decorators';
import { Line3d } from './Line3d';
import { Logger } from './Logger';

interface CoEdgeDump {
  edge?: string;
  prev?: string;
  next?: string;
  partner?: string;
  reversed?: boolean;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface RemovalContext {
  recycleEntity?: (entity: Entity) => void;
  [key: string]: unknown;
}

interface Coordinate {
  x: number;
  y: number;
  z: number;
  geometry?: unknown;
}

interface ArcInfo {
  center: unknown;
  radius: number;
  clockwise: boolean;
}

export class CoEdge_IO extends Entity_IO {
  private static _instance?: CoEdge_IO;

  static instance(): CoEdge_IO {
    if (!CoEdge_IO._instance) {
      CoEdge_IO._instance = new CoEdge_IO();
    }
    return CoEdge_IO._instance;
  }

  dump(
    entity: Entity,
    callback?: (dump: [CoEdgeDump, CoEdge], entity: CoEdge) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): [CoEdgeDump, CoEdge] {
    const dumpResult = super.dump(entity, undefined, includeMetadata, options);
    const dumpData = dumpResult[0] as CoEdgeDump;
    const coEdge = entity as CoEdge;

    dumpData.edge = coEdge.__edge?.id;
    dumpData.prev = coEdge.__prev?.id;
    dumpData.next = coEdge.__next?.id;
    dumpData.partner = coEdge.__partner?.id;

    if (coEdge.__reversed) {
      dumpData.reversed = coEdge.__reversed;
    }

    if (callback) {
      callback(dumpResult as [CoEdgeDump, CoEdge], coEdge);
    }

    return dumpResult as [CoEdgeDump, CoEdge];
  }

  load(entity: Entity, dumpData: CoEdgeDump, context: unknown): void {
    super.load(entity, dumpData, context);

    const coEdge = entity as CoEdge;
    coEdge.__edge = Entity.loadFromDumpById(dumpData.edge, context) as Edge | undefined;
    coEdge.__prev = Entity.loadFromDumpById(dumpData.prev, context) as CoEdge | undefined;
    coEdge.__next = Entity.loadFromDumpById(dumpData.next, context) as CoEdge | undefined;
    coEdge.__partner = dumpData.partner
      ? (Entity.loadFromDumpById(dumpData.partner, context) as CoEdge | undefined)
      : undefined;
    coEdge.__reversed = !!dumpData.reversed;
  }
}

export class CoEdge extends Entity {
  __edge?: Edge;
  __prev?: CoEdge;
  __next?: CoEdge;
  __partner?: CoEdge;
  __reversed: boolean = false;

  constructor(name: string = '', metadata?: unknown) {
    super(name, metadata);
    this.__reversed = false;
  }

  static create(
    fromVertex: Coordinate,
    toVertex: Coordinate,
    curve: Line3d = new Line3d(fromVertex, toVertex)
  ): CoEdge {
    let existingEdge = Object.values(fromVertex.parents ?? {}).find(
      (parent): parent is Edge =>
        !!(toVertex.parents?.[parent.id]) &&
        parent instanceof Edge &&
        parent === (toVertex.parents?.[parent.id] as Edge) &&
        parent.curve === curve
    );

    if (!existingEdge) {
      existingEdge = Edge.create(fromVertex, toVertex, curve);
    }

    return CoEdge.createFromEdge(existingEdge);
  }

  static createFromEdge(edge: Edge): CoEdge {
    const coEdge = new CoEdge();
    coEdge._setEdge(edge);
    return coEdge;
  }

  get parent(): Entity | undefined {
    return this.getUniqueParent();
  }

  get children(): Record<string, Entity> {
    return this._children;
  }

  get from(): Coordinate | null {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.__reversed ? this.edge.to : this.edge.from;
  }

  set from(vertex: Coordinate | null) {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return;
    }
    if (this.__reversed) {
      this.edge.to = vertex;
    } else {
      this.edge.from = vertex;
    }
  }

  get to(): Coordinate | null {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.__reversed ? this.edge.from : this.edge.to;
  }

  set to(vertex: Coordinate | null) {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return;
    }
    if (this.__reversed) {
      this.edge.from = vertex;
    } else {
      this.edge.to = vertex;
    }
  }

  get middle(): Coordinate | null {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.edge.middle;
  }

  get rotation(): number {
    return -HSCore.Util.Math.getAngleHorizontaleCCW(this.from, this.to);
  }

  get direction(): unknown {
    return HSCore.Util.Math.Vec2.fromCoordinate(this.to).subtract(this.from);
  }

  get arcInfo(): ArcInfo | undefined {
    const edge = this.edge;
    if (!edge || !edge.isArcEdge()) {
      return undefined;
    }

    const center = GeLib.VectorUtils.toTHREEVector3(edge.center);
    center.z = this.from!.z;

    return {
      center,
      radius: edge.radius,
      clockwise: edge.clockwise,
    };
  }

  get geometry(): unknown[] {
    return [this.from?.geometry, this.to?.geometry];
  }

  @EntityField({
    partialSet(this: CoEdge, value: Edge | undefined): void {
      this._setEdge(value);
    },
  })
  get edge(): Edge | undefined {
    return this.__edge;
  }
  set edge(value: Edge | undefined) {
    this.__edge = value;
  }

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge | undefined): void {
      this._setPartner(value);
    },
    validate(value: CoEdge | undefined): boolean {
      return !value || (value !== this && value instanceof CoEdge);
    },
  })
  get partner(): CoEdge | undefined {
    return this.__partner;
  }
  set partner(value: CoEdge | undefined) {
    this.__partner = value;
  }

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge | undefined): void {
      this._setPrev(value);
    },
  })
  get prev(): CoEdge | undefined {
    return this.__prev;
  }
  set prev(value: CoEdge | undefined) {
    this.__prev = value;
  }

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge | undefined): void {
      this._setNext(value);
    },
  })
  get next(): CoEdge | undefined {
    return this.__next;
  }
  set next(value: CoEdge | undefined) {
    this.__next = value;
  }

  @EntityField()
  get reversed(): boolean {
    return this.__reversed;
  }
  set reversed(value: boolean) {
    this.__reversed = value;
  }

  getPrev(): CoEdge | undefined {
    return this.prev;
  }

  setPrev(value: CoEdge | undefined): void {
    this.prev = value;
  }

  getNext(): CoEdge | undefined {
    return this.next;
  }

  setNext(value: CoEdge | undefined): void {
    this.next = value;
  }

  getPartner(): CoEdge | undefined {
    return this.partner;
  }

  setPartner(value: CoEdge | undefined): void {
    this.partner = value;
  }

  getReversed(): boolean {
    return this.reversed;
  }

  setReversed(value: boolean): void {
    this.reversed = value;
  }

  _setEdge(edge: Edge | undefined): void {
    Logger.console.assert(
      !edge ||
        !edge.coedge ||
        edge.coedge === this ||
        !edge.coedge.partner ||
        edge.coedge.partner === this,
      'invalid CoEdge!'
    );

    this.__edge = edge;

    if (edge) {
      this.addChild(edge);

      if (edge.coedge) {
        if (edge.coedge !== this) {
          this.partner = edge.coedge;
          this.reversed = !edge.coedge.reversed;
        }
      } else {
        edge.coedge = this;
        this.reversed = false;
      }
    }
  }

  _setPrev(value: CoEdge | undefined): void {
    const oldPrev = this.__prev;
    this.__prev = value;

    if (oldPrev && oldPrev.next === this) {
      oldPrev.next = undefined;
    }

    if (value) {
      value.next = this;
    }
  }

  _setNext(value: CoEdge | undefined): void {
    const oldNext = this.__next;
    this.__next = value;

    if (oldNext && oldNext.prev === this) {
      oldNext.prev = undefined;
    }

    if (value) {
      value.prev = this;
    }
  }

  _setPartner(value: CoEdge | undefined): void {
    this.__partner = value;

    if (value) {
      value.partner = this;
    }
  }

  setLoop(loop: Entity | undefined): void {
    const currentParent = this.getUniqueParent();

    if (currentParent !== loop) {
      if (loop) {
        loop.addChild(this);
      }
      if (currentParent) {
        currentParent.removeChild(this);
      }
    }
  }

  getFrom(): Coordinate | null {
    return this.from;
  }

  setFrom(vertex: Coordinate | null): void {
    this.from = vertex;
  }

  getTo(): Coordinate | null {
    return this.to;
  }

  setTo(vertex: Coordinate | null): void {
    this.to = vertex;
  }

  getIO(): CoEdge_IO {
    return CoEdge_IO.instance();
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(autoFix: boolean = false): boolean {
    if (!(this.__edge instanceof HSCore.Model.Edge) && autoFix) {
      const edgeChildren = Object.values(this.children).filter(
        (child): child is Edge => child instanceof HSCore.Model.Edge
      );
      if (edgeChildren.length > 0) {
        this.__edge = edgeChildren[0];
      }
    }

    if (!(this.__edge instanceof HSCore.Model.Edge)) {
      log.error(`${this.tag}: invalid edge.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__prev instanceof HSCore.Model.CoEdge)) {
      log.error(`${this.tag}: invalid prev.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__next instanceof HSCore.Model.CoEdge)) {
      log.error(`${this.tag}: invalid next.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (this.__partner) {
      assert(
        this.__edge === this.__partner.edge && this.reversed !== this.__partner.reversed,
        'invalid',
        'HSCore.Verify.Error'
      );

      if (!(this.__partner instanceof HSCore.Model.CoEdge)) {
        log.error(`${this.tag}: invalid partner.`, 'HSCore.Verify.Error', true);
        return false;
      }
    }

    return !!this.__edge.validate(autoFix);
  }

  onAddedToParent(parent: Entity): void {
    super.onAddedToParent(parent);

    if (this.partner) {
      this.partner.partner = this;
    }
  }

  onRemovingFromParent(parent: Entity, context?: RemovalContext): void {
    super.onRemovingFromParent(parent, context);

    if (this.hasSingleParent(parent) && context?.recycleEntity) {
      context.recycleEntity(this);
    }
  }

  onRemovedFromParent(parent: Entity, context?: RemovalContext): void {
    super.onRemovedFromParent(parent, context);

    if (this.isOrphan() && this.partner) {
      this.partner.partner = undefined;
      this.partner = undefined;
      this.edge = undefined;
    }
  }

  onChildDirty(child: Entity, dirtyFlag: unknown): void {
    this.dirty(dirtyFlag);
    super.onChildDirty(child, dirtyFlag);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCoEdge, CoEdge);