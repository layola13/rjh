import { EulerOperations } from './EulerOperations';
import { Vec2, getPerpendicularIntersect } from './GeometryUtils';
import { Ceiling } from './Ceiling';
import { Floor } from './Floor';
import { Wall } from './Wall';
import { Plane, Matrix4, MathAlg } from './GeometryLib';
import { Logger } from './Logger';

interface DivideFloorByPathsParams {
  floor: Floor;
  path: unknown;
  startExtraPath: unknown;
  endExtraPath: unknown;
  startEdge: unknown;
  endEdge: unknown;
}

interface Edge {
  ID: string;
  from: Vertex;
  to: Vertex;
  partner?: CoEdge;
  getUniqueParent(): Loop | undefined;
}

interface Vertex {
  ID: string;
  parents: Record<string, unknown>;
}

interface CoEdge {
  edge: Edge;
  partner?: CoEdge;
  getUniqueParent(): Loop | undefined;
}

interface Loop {
  forEachCoEdge(callback: (coEdge: CoEdge) => void): void;
  validate(): void;
}

interface Face {
  id: string;
  outerLoop?: Loop;
  onDirty(): void;
  getMaster(): unknown;
  wirePath?: { outer: unknown[] };
}

interface FloorFace extends Face {
  forEachContent(callback: (content: unknown) => void): void;
}

interface EdgeVertexPair {
  edge: Edge;
  vertex: Vertex;
}

export const FaceUtil = {
  divideFloorByPaths(params: DivideFloorByPathsParams): void {
    // Implementation needed
  },

  adjacentFloors(face: Face): Map<Floor | Ceiling, Edge[]> {
    const adjacentMap = new Map<Floor | Ceiling, Edge[]>();
    
    if (!face.outerLoop) {
      return adjacentMap;
    }

    face.outerLoop.forEachCoEdge((coEdge: CoEdge) => {
      const partnerLoop = coEdge.partner?.getUniqueParent();
      const partnerFace = partnerLoop?.getUniqueParent();
      
      if (partnerFace && (partnerFace instanceof Floor || partnerFace instanceof Ceiling)) {
        if (!adjacentMap.has(partnerFace)) {
          adjacentMap.set(partnerFace, []);
        }
        adjacentMap.get(partnerFace)!.push(coEdge.edge);
      }
    });

    return adjacentMap;
  },

  getSharedEdges(faceA: Face, faceB: Face): Edge[] {
    if (!faceA.outerLoop || !faceB.outerLoop) {
      return [];
    }

    const sharedEdges: Edge[] = [];

    faceA.outerLoop.forEachCoEdge((coEdgeA: CoEdge) => {
      faceB.outerLoop!.forEachCoEdge((coEdgeB: CoEdge) => {
        if (coEdgeA.edge === coEdgeB.edge) {
          sharedEdges.push(coEdgeA.edge);
        }
      });
    });

    return sharedEdges;
  },

  mergeFloorToAdjacent(face: Face): Face | undefined {
    const adjacentMap = this.adjacentFloors(face);
    
    for (const [adjacentFace, edges] of adjacentMap) {
      if (adjacentFace.id !== face.id) {
        return this.mergeFloorToOtherFloor(face, adjacentFace, edges);
      }
    }
    
    return undefined;
  },

  mergeFloorToOtherFloor(sourceFace: Face, targetFace: Floor | Ceiling, sharedEdges: Edge[]): Face {
    const getSingleParentVertex = (edge: Edge): Vertex | undefined => {
      if (edge.from && Object.values(edge.from.parents).length === 1) {
        return edge.from;
      }
      if (edge.to && Object.values(edge.to.parents).length === 1) {
        return edge.to;
      }
      return undefined;
    };

    const findEdgeWithSingleParentVertex = (edges: Edge[]): EdgeVertexPair | undefined => {
      for (const edge of edges) {
        const vertex = getSingleParentVertex(edge);
        if (vertex) {
          return { edge, vertex };
        }
      }
      return undefined;
    };

    if (sharedEdges.length > 0) {
      const vertexMap: Record<string, Vertex> = {};
      
      sharedEdges.forEach((edge: Edge) => {
        vertexMap[edge.from.ID] = edge.from;
        vertexMap[edge.to.ID] = edge.to;
      });

      EulerOperations.kef(sharedEdges[0], sourceFace);

      let edgeVertexPair = findEdgeWithSingleParentVertex(sharedEdges);
      while (edgeVertexPair) {
        EulerOperations.kev(edgeVertexPair.edge, edgeVertexPair.vertex, targetFace.outerLoop!);
        edgeVertexPair = findEdgeWithSingleParentVertex(sharedEdges);
      }

      for (const vertexId in vertexMap) {
        const vertex = vertexMap[vertexId];
        EulerOperations.mergeEdgesOnVertex(vertex);
      }

      this.validateFace(targetFace);

      if (sourceFace instanceof Floor) {
        sourceFace.forEachContent((content: unknown) => {
          if (
            content instanceof HSCore.Model.NCustomizedPlatform ||
            content instanceof HSCore.Model.CustomizedPlatform
          ) {
            content.remove();
          }
        });
      }

      targetFace.onDirty();
      return targetFace;
    }

    return targetFace;
  },

  validateFace(face: Face): void {
    Logger.console.assert(Boolean(face.outerLoop), "face's outerLoop is undefined");
    face.outerLoop?.validate();
  },

  autoFitContentToFace(face: Face, content: unknown): boolean {
    if (!HSCore.Util.Content.isNiche(content)) {
      return false;
    }

    const host = content.getHost();

    if (HSCore.Util.Content.isValidWallOpeningHost(face, content)) {
      const wallFace = face as WallFace;
      const intersection = getPerpendicularIntersect(content, wallFace.to, wallFace.from);
      const rotation = -wallFace.transRotation;
      const direction = wallFace.transDirection.normalize().scale((wallFace.width - content.thickness) / 2);

      if (host !== face) {
        content.thickness = wallFace.width / 2;
      }

      const fromVector = GeLib.VectorUtils.toTHREEVector3(wallFace.from);
      const contentPosition = new THREE.Vector3(content.x, content.y, 0);
      const offset = new THREE.Vector3().subVectors(contentPosition, fromVector);
      const transDirectionVector = GeLib.VectorUtils.toTHREEVector3(wallFace.transDirection);
      const crossProduct = new THREE.Vector3().crossVectors(transDirectionVector, offset);
      const isFlipped = crossProduct.z > 0;
      const finalRotation = isFlipped ? 180 + rotation : rotation;

      content.rotation = -finalRotation;

      const rotationAngle = isFlipped ? Math.PI / 2 : -Math.PI / 2;
      const finalPosition = Vec2.rotateAroundPoint(
        direction.clone().add(intersection),
        intersection,
        rotationAngle
      );

      content.x = finalPosition.x;
      content.y = finalPosition.y;

      return true;
    }

    if (HSCore.Util.Content.isValidSlabOpeningHost(face, content)) {
      const slabFace = face as SlabFace;

      if (host !== face) {
        content.thickness = slabFace.thickness / 2;
      }

      content.XRotation = 0;
      content.z = -content.thickness / 2;

      return true;
    }

    return false;
  },

  findFaceLoop(entity: unknown): FaceLoopResult | undefined {
    const roomInfo = entity.roomInfos?.[0];
    
    if (!roomInfo) {
      return undefined;
    }

    return {
      faces: roomInfo.faces,
      frontbackFaces: [],
      points: roomInfo.geometry.outer,
      walls: roomInfo.structures.filter((structure: unknown) => structure instanceof Wall)
    };
  },

  getFaceType(face: Face): string {
    let faceType = 'unknown';
    const master = face.getMaster();

    if (
      master instanceof HSCore.Model.Wall ||
      master instanceof HSCore.Model.NCustomizedBeam ||
      master instanceof HSCore.Model.NCustomizedStructure ||
      master instanceof HSCore.Model.Slab ||
      master instanceof HSCore.Model.Opening ||
      master instanceof HSCore.Model.ParametricOpening
    ) {
      faceType = master.getFaceType(face);
    }

    return faceType;
  },

  isFacesConnected(faces: Face[]): boolean {
    const getTransformedCurves = (face: Face): unknown[] => {
      const curves = face instanceof HSCore.Model.Floor
        ? HSCore.Util.FloorMixpaint.getFloorBackgroundWithOpening(face, false)
            .outer.map((curve: unknown) => Plane.XOY().getCurve3d(curve))
        : face.wirePath!.outer;

      const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(face);
      const transformMatrix = Matrix4.makeTranslate({ x: 0, y: 0, z: baseHeight });

      return curves.map((curve: unknown) => curve.transformed(transformMatrix));
    };

    return faces.every((currentFace: Face) =>
      getTransformedCurves(currentFace).some((currentCurve: unknown) =>
        faces.some((otherFace: Face) =>
          otherFace !== currentFace &&
          getTransformedCurves(otherFace).some((otherCurve: unknown) =>
            MathAlg.PositionJudge.curveCurveOverlap(currentCurve, otherCurve) !==
            MathAlg.CurveCuvePositonType.NOT_INTERSECT
          )
        )
      )
    );
  }
};

interface WallFace extends Face {
  to: unknown;
  from: unknown;
  transRotation: number;
  transDirection: { normalize(): { scale(value: number): unknown } };
  width: number;
}

interface SlabFace extends Face {
  thickness: number;
}

interface FaceLoopResult {
  faces: unknown[];
  frontbackFaces: unknown[];
  points: unknown[];
  walls: Wall[];
}

export type XRotation = number;