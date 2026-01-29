import { Entity, Entity_IO } from './Entity';
import { Edge } from './Edge';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

export class CoEdge_IO extends Entity_IO {
  load(
    entity: CoEdge,
    data: any,
    context: any,
    options: any
  ): void {
    super.load(entity, data, context, options);

    entity.__edge = Entity.loadFromDumpById(data.edge, context, false, options) as Edge;
    entity.__prev = Entity.loadFromDumpById(data.prev, context, false, options) as CoEdge;
    entity.__next = Entity.loadFromDumpById(data.next, context, false, options) as CoEdge;
    entity.__partner = data.partner
      ? (Entity.loadFromDumpById(data.partner, context, false, options) as CoEdge)
      : undefined;
    entity.__reversed = !!data.reversed;
  }
}

export class CoEdge extends Entity {
  __edge!: Edge;
  __prev!: CoEdge;
  __next!: CoEdge;
  __partner?: CoEdge;
  __reversed: boolean = false;

  constructor(tag: string = '') {
    super(tag);
  }

  static create(fromEntity: any, toEntity: any): CoEdge {
    let edgeCandidate = Object.values(fromEntity.parents).find(
      (parent: any) =>
        toEntity.parents[parent.id] &&
        parent instanceof Edge &&
        parent === toEntity.parents[parent.id]
    ) as Edge | undefined;

    edgeCandidate = edgeCandidate || Edge.create(fromEntity, toEntity);
    return CoEdge.createFromEdge(edgeCandidate);
  }

  static createFromEdge(edge: Edge): CoEdge {
    const coEdge = new CoEdge();
    coEdge._setEdge(edge);
    return coEdge;
  }

  get parent(): any {
    return this.getUniqueParent();
  }

  get children(): any {
    return this._children;
  }

  get from(): any {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.__reversed ? this.edge.to : this.edge.from;
  }

  set from(value: any) {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return;
    }
    if (this.__reversed) {
      this.edge.to = value;
    } else {
      this.edge.from = value;
    }
  }

  get to(): any {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.__reversed ? this.edge.from : this.edge.to;
  }

  set to(value: any) {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return;
    }
    if (this.__reversed) {
      this.edge.from = value;
    } else {
      this.edge.to = value;
    }
  }

  get middle(): any {
    if (!this.edge) {
      Logger.console.assert(false, `${this.tag} edge undefined!`);
      return null;
    }
    return this.edge.middle;
  }

  get rotation(): number {
    return -HSCore.Util.Math.getAngleHorizontaleCCW(this.from, this.to);
  }

  get direction(): any {
    return HSCore.Util.Math.Vec2.fromCoordinate(this.to).subtract(this.from);
  }

  get arcInfo(): { center: any; radius: number; clockwise: boolean } | undefined {
    const edge = this.edge;
    if (!edge || !edge.isArcEdge()) {
      return undefined;
    }

    const curve = edge.curve;
    const center = GeLib.VectorUtils.toTHREEVector3(curve.center);
    center.z = this.from.z;

    return {
      center: center,
      radius: curve.getRadius(this.from, this.to),
      clockwise: curve.clockwise,
    };
  }

  get geometry(): [any, any] {
    return [this.from.geometry, this.to.geometry];
  }

  getPrev(): CoEdge {
    return this.prev;
  }

  getNext(): CoEdge {
    return this.next;
  }

  getPartner(): CoEdge | undefined {
    return this.partner;
  }

  getReversed(): boolean {
    return this.reversed;
  }

  _setEdge(edge: Edge): void {
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

  _setPrev(prev: CoEdge): void {
    const oldPrev = this.__prev;
    this.__prev = prev;

    if (oldPrev && oldPrev.next === this) {
      oldPrev.next = undefined as any;
    }

    if (prev) {
      prev.next = this;
    }
  }

  _setNext(next: CoEdge): void {
    const oldNext = this.__next;
    this.__next = next;

    if (oldNext && oldNext.prev === this) {
      oldNext.prev = undefined as any;
    }

    if (next) {
      next.prev = this;
    }
  }

  _setPartner(partner: CoEdge | undefined): void {
    this.__partner = partner;

    if (partner) {
      partner.partner = this;
    }
  }

  setLoop(loop: any): void {
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

  getFrom(): any {
    return this.from;
  }

  getTo(): any {
    return this.to;
  }

  getIO(): CoEdge_IO {
    return CoEdge_IO.instance();
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(autoFix: boolean = false): boolean {
    if (!(this.__edge instanceof Edge) && autoFix) {
      const edgeChildren = Object.values(this.children).filter(
        (child: any) => child instanceof Edge
      ) as Edge[];

      if (edgeChildren.length > 0) {
        this.__edge = edgeChildren[0];
      }
    }

    if (!(this.__edge instanceof Edge)) {
      log.error(`${this.tag}: invalid edge.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__prev instanceof CoEdge)) {
      log.error(`${this.tag}: invalid prev.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__next instanceof CoEdge)) {
      log.error(`${this.tag}: invalid next.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (this.__partner) {
      assert(
        this.__edge === this.__partner.edge &&
          this.reversed !== this.__partner.reversed,
        '',
        'HSCore.Verify.Error'
      );

      if (!(this.__partner instanceof CoEdge)) {
        log.error(`${this.tag}: invalid partner.`, 'HSCore.Verify.Error', true);
        return false;
      }
    }

    return this.__edge.validate(autoFix);
  }

  onAddedToParent(parent: any): void {
    super.onAddedToParent(parent);

    if (this.partner) {
      this.partner.partner = this;
    }
  }

  onRemovingFromParent(parent: any, options?: any): void {
    super.onRemovingFromParent(parent, options);

    if (this.hasSingleParent(parent) && options?.recycleEntity) {
      options.recycleEntity(this);
    }
  }

  onRemovedFromParent(parent: any, options?: any): void {
    super.onRemovedFromParent(parent, options);

    if (this.isOrphan() && this.partner) {
      this.partner.partner = undefined;
      this.partner = undefined;
      this.edge = undefined as any;
    }
  }

  onChildDirty(child: any, dirtyFlag: any): void {
    this.dirty(dirtyFlag);
    super.onChildDirty(child, dirtyFlag);
  }

  @EntityField({
    partialSet(this: CoEdge, value: Edge) {
      this._setEdge(value);
    },
  })
  edge!: Edge;

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge | undefined) {
      this._setPartner(value);
    },
    validate(value: any) {
      return !value || (value !== this && value instanceof CoEdge);
    },
  })
  partner?: CoEdge;

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge) {
      this._setPrev(value);
    },
  })
  prev!: CoEdge;

  @EntityField({
    partialSet(this: CoEdge, value: CoEdge) {
      this._setNext(value);
    },
  })
  next!: CoEdge;

  @EntityField()
  reversed!: boolean;
}

Entity.registerClass(HSConstants.ModelClass.NgCoEdge, CoEdge);