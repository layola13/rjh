import { isSamePoint } from './PointUtil';
import { EulerOperations } from './EulerOperations';
import { Vertex } from './Vertex';

interface Edge {
  from: Vertex;
  to: Vertex;
  length: number;
}

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface SplitResult {
  vertex: Vertex | undefined;
  lerp: number;
  point: Point;
}

export const EdgeUtil = {
  splitEdgeByPoints(edge: Edge, points: Point[]): SplitResult[] {
    const MIN_EDGE_LENGTH = 0.001;

    if (edge.length < MIN_EDGE_LENGTH) {
      return [];
    }

    const curve = HSCore.Util.Edge.toTHREECurve(edge);
    const splitResults: SplitResult[] = [];

    points.forEach((point) => {
      if (isSamePoint(point, edge.from)) {
        splitResults.push({
          vertex: edge.from,
          lerp: 0,
          point
        });
        return;
      }

      if (isSamePoint(point, edge.to)) {
        splitResults.push({
          vertex: edge.to,
          lerp: 1,
          point
        });
        return;
      }

      const vector = GeLib.VectorUtils.toTHREEVector3(point);
      let parameter: number;

      if (curve instanceof THREE.ArcCurve) {
        const arcPoint = new THREE.Vector3(vector.x, vector.y, 0);
        parameter = GeLib.ArcUtils.getParameter(curve, arcPoint);
      } else {
        parameter = curve.closestPointToPointParameter(vector);
      }

      if (parameter > 0 && parameter < 1) {
        const vertex = Vertex.create(point.x, point.y, point.z ?? 0);
        splitResults.push({
          vertex,
          lerp: parameter,
          point
        });
      } else {
        splitResults.push({
          vertex: undefined,
          lerp: parameter,
          point
        });
      }
    });

    const sortedResults = splitResults.sort((a, b) => a.lerp - b.lerp);

    const verticesForSplit: Vertex[] = [];
    sortedResults.forEach((result) => {
      if (result.lerp > 0 && result.lerp < 1 && result.vertex) {
        verticesForSplit.push(result.vertex);
      }
    });

    if (verticesForSplit.length > 0) {
      EulerOperations.esplit(edge, verticesForSplit);
    }

    return sortedResults;
  }
};