import { Loop } from './Loop';
import { Vector3 } from './Vector3';

interface Curve {
  getStartPt(): Vector3;
  reversed(): Curve;
}

interface CoEdge {
  edge: Edge;
  reversed: boolean;
}

interface Edge {
  curve: Curve;
}

interface LoopLike {
  getCoEdges(): CoEdge[];
  getLoopVertices(): Vector3[];
}

export class TgLoopUtil {
  /**
   * Creates a new loop or updates an existing loop based on the provided curves.
   * 
   * @param existingLoop - Optional existing loop to update
   * @param curves - Array of curves to create/update the loop from
   * @param forceCreate - If true, always creates a new loop instead of updating
   * @returns The created or updated loop
   */
  static createOrUpdateLoopByCurves(
    existingLoop: LoopLike | null | undefined,
    curves: Curve[],
    forceCreate: boolean = true
  ): Loop {
    if (forceCreate) {
      return Loop.createFromCurves(curves);
    }

    const coEdges = existingLoop ? existingLoop.getCoEdges() : [];

    if (existingLoop && coEdges.length === curves.length) {
      const loopVertices = existingLoop.getLoopVertices();
      const curveStartPoints = curves.map(curve => curve.getStartPt());
      const vertexOffset = calculateVertexOffset(loopVertices, curveStartPoints);
      const vertexCount = loopVertices.length;

      for (let index = 0; index < vertexCount; index++) {
        const vertex = loopVertices[index];
        const adjustedIndex = (index + vertexOffset + vertexCount) % vertexCount;
        const newPosition = curveStartPoints[adjustedIndex];
        
        vertex.set(newPosition.x, newPosition.y, newPosition.z ?? 0);

        const coEdge = coEdges[index];
        coEdge.edge.curve = coEdge.reversed 
          ? curves[adjustedIndex].reversed() 
          : curves[adjustedIndex];
      }

      return existingLoop as Loop;
    }

    return Loop.createFromCurves(curves);
  }
}

/**
 * Calculates the offset between two sets of vertices by finding matching positions.
 * 
 * @param sourceVertices - Original vertex positions
 * @param targetVertices - Target vertex positions to match
 * @returns The index offset between the two vertex sets
 */
function calculateVertexOffset(
  sourceVertices: Vector3[],
  targetVertices: Vector3[]
): number {
  for (let sourceIndex = 0; sourceIndex < sourceVertices.length; sourceIndex++) {
    for (let targetIndex = 0; targetIndex < targetVertices.length; targetIndex++) {
      if (new Vector3(sourceVertices[sourceIndex]).equals(targetVertices[targetIndex])) {
        return targetIndex - sourceIndex;
      }
    }
  }
  return 0;
}