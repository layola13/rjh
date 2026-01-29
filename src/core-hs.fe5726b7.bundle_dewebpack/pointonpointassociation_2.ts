import { Association } from './Association';
import { Vertex } from './Vertex';
import { PointUtil } from './PointUtil';

/**
 * Association that maintains a point-on-point constraint between two vertices.
 * When computed, synchronizes the position of the target vertex with the source entity.
 */
export class PointOnPointAssociation extends Association {
  constructor(entity: Vertex, target: Vertex) {
    super(entity, target);
  }

  /**
   * Computes the association by moving the target point to match the entity point.
   * Also adjusts connected inner split edges to maintain topology.
   * 
   * @param fireEvents - Whether to fire change events during computation
   */
  compute(fireEvents: boolean = true): void {
    const entity = this.entity;
    const target = this.firstTarget;

    if (!entity || !target || !(entity instanceof Vertex) || !(target instanceof Vertex)) {
      return;
    }

    const displacement = HSCore.Util.Math.Vec2.difference(entity, target);
    target.set(entity.x, entity.y, undefined, fireEvents);

    const splitEdges = new Set<Edge>();
    PointUtil.getParentEdges(target).forEach((edge) => {
      if (edge.isSplitEdge && edge.isInnerEdge) {
        splitEdges.add(edge);
      }
    });

    splitEdges.forEach((edge) => {
      const otherVertex = edge.from === target ? edge.to : edge.from;
      otherVertex.set(
        otherVertex.x + displacement.x,
        otherVertex.y + displacement.y,
        undefined,
        fireEvents
      );
    });
  }
}

Association.registerClass(
  HSConstants.ModelClass.PointOnPointAssociation,
  PointOnPointAssociation
);

interface Edge {
  isSplitEdge: boolean;
  isInnerEdge: boolean;
  from: Vertex;
  to: Vertex;
}