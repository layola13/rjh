import { Association } from './Association';
import { Vertex } from './Vertex';
import { PointUtil } from './PointUtil';

/**
 * Represents an association that constrains one point to coincide with another point.
 * When computed, it moves the target point to match the position of the source point
 * and adjusts any connected split edges accordingly.
 */
export class PointOnPointAssociation extends Association {
  constructor(entity: Vertex, target: Vertex) {
    super(entity, target);
  }

  /**
   * Computes the association by moving the target point to match the entity point.
   * Also updates connected inner split edges to maintain their relationships.
   * 
   * @param triggerEvents - Whether to trigger update events after computation
   */
  compute(triggerEvents: boolean = true): void {
    const entity = this.entity;
    const targetPoint = this.firstTarget;

    if (!entity || !targetPoint || !(entity instanceof Vertex) || !(targetPoint instanceof Vertex)) {
      return;
    }

    const displacement = HSCore.Util.Math.Vec2.difference(entity, targetPoint);
    targetPoint.set(entity.x, entity.y, undefined, triggerEvents);

    const connectedSplitEdges = new Set<any>();
    
    PointUtil.getParentEdges(targetPoint).forEach((edge) => {
      if (edge.isSplitEdge && edge.isInnerEdge) {
        connectedSplitEdges.add(edge);
      }
    });

    connectedSplitEdges.forEach((edge) => {
      const otherVertex = edge.from === targetPoint ? edge.to : edge.from;
      otherVertex.set(
        otherVertex.x + displacement.x,
        otherVertex.y + displacement.y,
        undefined,
        triggerEvents
      );
    });
  }
}

Association.registerClass(
  HSConstants.ModelClass.PointOnPointAssociation,
  PointOnPointAssociation
);