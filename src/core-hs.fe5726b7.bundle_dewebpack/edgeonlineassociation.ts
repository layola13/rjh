import { AssociationBase, Association } from './AssociationBase';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  from: Point;
  to: Point;
}

interface LineTarget {
  from: {
    set(x: number, y: number, z: undefined, notify: boolean): void;
  };
  to: {
    set(x: number, y: number, z: undefined, notify: boolean): void;
  };
}

export class EdgeOnLineAssociation extends AssociationBase {
  protected entity: Edge | null;
  protected firstTarget: LineTarget | null;

  constructor(entity: Edge, target: LineTarget) {
    super(entity, target);
  }

  compute(notify: boolean = true): void {
    const entity = this.entity;
    const target = this.firstTarget;

    if (entity && target) {
      target.from.set(entity.from.x, entity.from.y, undefined, notify);
      target.to.set(entity.to.x, entity.to.y, undefined, notify);
    }
  }
}

Association.registerClass(HSConstants.ModelClass.EdgeOnLineAssociation, EdgeOnLineAssociation);