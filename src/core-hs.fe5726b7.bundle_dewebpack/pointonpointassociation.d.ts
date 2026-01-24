/**
 * Point-on-Point association constraint for CAD geometry.
 * Maintains a coincident relationship between two vertices.
 * @module PointOnPointAssociation
 */

import { Association } from './Association';
import { Vertex } from './Vertex';
import { PointUtil } from './PointUtil';

/**
 * Association that constrains one point (vertex) to coincide with another point.
 * When the primary entity moves, it updates its position to match the target,
 * and propagates the displacement to connected split/inner edges.
 */
export class PointOnPointAssociation extends Association {
    /**
     * Creates a new point-on-point association.
     * @param entity - The primary vertex entity to be constrained
     * @param target - The target vertex that defines the constraint position
     */
    constructor(entity: Vertex, target: Vertex) {
        super(entity, target);
    }

    /**
     * Computes and applies the point-on-point constraint.
     * Updates the primary vertex to match the target vertex position,
     * and adjusts connected split edges to maintain geometric consistency.
     * 
     * @param updateHistory - Whether to record this operation in the undo/redo history
     */
    compute(updateHistory: boolean = true): void {
        const entity = this.entity;
        const target = this.firstTarget;

        // Validate that both entities are vertices
        if (!entity || !target || !(entity instanceof Vertex) || !(target instanceof Vertex)) {
            return;
        }

        // Calculate displacement vector before updating
        const displacement = HSCore.Util.Math.Vec2.difference(entity, target);

        // Update target position to match entity
        target.set(entity.x, entity.y, undefined, updateHistory);

        // Collect all split inner edges connected to the target
        const splitInnerEdges = new Set<Edge>();
        PointUtil.getParentEdges(target).forEach((edge) => {
            if (edge.isSplitEdge && edge.isInnerEdge) {
                splitInnerEdges.add(edge);
            }
        });

        // Propagate displacement to opposite vertices of split edges
        splitInnerEdges.forEach((edge) => {
            const oppositeVertex = edge.from === target ? edge.to : edge.from;
            oppositeVertex.set(
                oppositeVertex.x + displacement.x,
                oppositeVertex.y + displacement.y,
                undefined,
                updateHistory
            );
        });
    }
}

// Register the association class with the model system
Association.registerClass(
    HSConstants.ModelClass.PointOnPointAssociation,
    PointOnPointAssociation
);

/**
 * Type definitions for supporting classes and interfaces
 */

interface Edge {
    from: Vertex;
    to: Vertex;
    isSplitEdge: boolean;
    isInnerEdge: boolean;
}

declare namespace HSCore.Util.Math.Vec2 {
    function difference(v1: Vertex, v2: Vertex): { x: number; y: number };
}

declare namespace HSConstants.ModelClass {
    const PointOnPointAssociation: string;
}