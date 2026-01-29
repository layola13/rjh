import { Logger } from './Logger';

interface Point3D {
  equals(other: Point3D): boolean;
}

interface Curve3D {
  clone(): Curve3D;
  getStartPt(): Point3D;
  getEndPt(): Point3D;
  getStartTangent(): Vector3D;
  getEndTangent(): Vector3D;
  reverse(): void;
}

interface Vector3D {
  normalize(): Vector3D;
  isSameDirection(other: Vector3D): boolean;
  clone(): Vector3D;
  cross(other: Vector3D): Vector3D;
  equals(other: Vector3D): boolean;
}

interface UV {
  u: number;
  v: number;
}

interface Surface {
  getUVAt(point: Point3D): UV;
}

interface Vertex {
  getPoint(): Point3D;
}

interface Edge {
  tag?: string;
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getCoedge3ds(): Coedge3D[];
}

interface Face {
  getSurface(): Surface;
  getNormAt(uv: UV): Vector3D;
}

interface Coedge3D {
  tag: string;
  getCurve(): Curve3D;
  getFace(): Face;
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getEdge(): Edge | undefined;
}

interface PathSegment {
  tag: string;
}

interface Sweeper {
  path: PathSegment[];
  getSweepPath3D(): Curve3D[];
  getEdges(): Edge[];
}

interface RelatedSweepersResult {
  connect: Sweeper[];
  overlaped: Sweeper[];
  disconnected: Sweeper[];
}

export class SweeperConnectHelper {
  private static _instance: SweeperConnectHelper;

  findRelatedMoldings(
    coedgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): RelatedSweepersResult {
    return this.findRelatedSweepers(coedgeTag, faces, sweepers);
  }

  findRelatedLightSlots(
    coedgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): RelatedSweepersResult {
    return this.findRelatedSweepers(coedgeTag, faces, sweepers);
  }

  findRelatedLightBands(
    coedgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): RelatedSweepersResult {
    return this.findRelatedSweepers(coedgeTag, faces, sweepers);
  }

  findRelatedSweepers(
    coedgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): RelatedSweepersResult {
    const result: RelatedSweepersResult = {
      connect: [],
      overlaped: [],
      disconnected: []
    };

    result.overlaped = this.findOverlapSweepers(coedgeTag, sweepers);

    const nonOverlappedSweepers = sweepers.filter(
      sweeper => !result.overlaped.includes(sweeper)
    );

    if (nonOverlappedSweepers.length !== 0) {
      result.connect = this.findSweepConnectedSweepers(
        coedgeTag,
        faces,
        sweepers
      );
    }

    return result;
  }

  findOverlapSweepers(coedgeTag: string, sweepers: Sweeper[]): Sweeper[] {
    const overlapped: Sweeper[] = [];

    if (sweepers.length === 0) {
      return overlapped;
    }

    for (const sweeper of sweepers) {
      const pathTags = sweeper.path.map(segment => segment.tag);
      if (pathTags.includes(coedgeTag)) {
        overlapped.push(sweeper);
      }
    }

    return overlapped;
  }

  findSweepConnectedSweepers(
    coedgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): Sweeper[] {
    const connected: Sweeper[] = [];

    if (sweepers.length === 0) {
      return connected;
    }

    const targetCoedge = this.findCoedgeByTag(coedgeTag, faces);
    if (!targetCoedge) {
      Logger.console.assert(
        false,
        'specified coedge is not existing, please check!'
      );
      return connected;
    }

    const connectedCoedges = this.findConnectedCoedges(targetCoedge, faces);
    const continuousSweepCoedges: Coedge3D[] = [];

    for (const coedge of connectedCoedges) {
      if (this.judgeContinousSweep(targetCoedge, coedge)) {
        continuousSweepCoedges.push(coedge);
      }
    }

    const validSweepers: Sweeper[] = [];
    const startPoint = targetCoedge.getStartVertex().getPoint();
    const endPoint = targetCoedge.getEndVertex().getPoint();
    const targetPoints = [startPoint, endPoint];
    const inversedCoedge = this.getInversedCoedge(targetCoedge);

    for (const sweeper of sweepers) {
      const pathTags = sweeper.path.map(segment => segment.tag);
      const firstTag = pathTags[0];
      const lastTag = pathTags[pathTags.length - 1];

      if (
        inversedCoedge &&
        (firstTag === inversedCoedge.tag || lastTag === inversedCoedge.tag)
      ) {
        continue;
      }

      for (const coedge of continuousSweepCoedges) {
        if (firstTag === coedge.tag || lastTag === coedge.tag) {
          const sweepPath = sweeper.getSweepPath3D();
          const sweepStartPoint = sweepPath[0].getStartPt();
          const sweepEndPoint = sweepPath[sweepPath.length - 1].getEndPt();

          const allPoints: Point3D[] = sweepPath
            .map(curve => [curve.getStartPt(), curve.getEndPt()])
            .flat();

          validSweepers.forEach(validSweeper => {
            validSweeper.getSweepPath3D().forEach(curve => {
              allPoints.push(curve.getStartPt());
              allPoints.push(curve.getEndPt());
            });
          });

          allPoints.push(startPoint);
          allPoints.push(endPoint);

          if (!sweepStartPoint.equals(sweepEndPoint)) {
            const hasTargetPointConnection =
              targetPoints.some(point => point.equals(sweepStartPoint)) ||
              targetPoints.some(point => point.equals(sweepEndPoint));

            if (hasTargetPointConnection) {
              let isValid = true;

              allPoints.forEach(point => {
                const duplicateCount = allPoints.filter(p =>
                  point.equals(p)
                ).length;
                if (duplicateCount > 2) {
                  isValid = false;
                }
              });

              if (isValid) {
                validSweepers.push(sweeper);
              }
            }
          }
        }
      }
    }

    return validSweepers;
  }

  judgeContinousSweep(coedge1: Coedge3D, coedge2: Coedge3D): boolean {
    const curve1 = coedge1.getCurve().clone();
    const curve2 = coedge2.getCurve().clone();

    const curve1Start = curve1.getStartPt();
    const curve1End = curve1.getEndPt();
    const curve2Start = curve2.getStartPt();
    const curve2End = curve2.getEndPt();

    if (curve1Start.equals(curve2Start)) {
      curve1.reverse();
    } else if (curve1Start.equals(curve2End)) {
      curve1.reverse();
      curve2.reverse();
    } else if (curve1End.equals(curve2End)) {
      curve2.reverse();
    }

    const curve1EndTangent = curve1.getEndTangent().normalize();
    const curve2StartTangent = curve2.getStartTangent().normalize();

    const surface1 = coedge1.getFace().getSurface();
    const surface2 = coedge2.getFace().getSurface();

    const uv1 = surface1.getUVAt(curve1.getEndPt());
    const uv2 = surface2.getUVAt(curve2.getStartPt());

    const normal1 = coedge1.getFace().getNormAt(uv1).normalize();
    const normal2 = coedge2.getFace().getNormAt(uv2).normalize();

    if (normal1.isSameDirection(normal2)) {
      return true;
    }

    const normalCross = normal1.clone().cross(normal2.clone());
    const tangentCross = curve1EndTangent.clone().cross(curve2StartTangent.clone());

    if (normalCross.equals(tangentCross)) {
      return true;
    }

    return false;
  }

  findConnectedCoedges(coedge: Coedge3D, faces: Face[]): Coedge3D[] {
    let connectedCoedges: Coedge3D[] = [];

    const startPoint = coedge.getStartVertex().getPoint();
    const endPoint = coedge.getEndVertex().getPoint();

    connectedCoedges = connectedCoedges.concat(
      this.findConnectedCoedgesByPoint(startPoint, faces)
    );
    connectedCoedges = connectedCoedges.concat(
      this.findConnectedCoedgesByPoint(endPoint, faces)
    );

    connectedCoedges = connectedCoedges.filter(connectedCoedge => {
      const connectedEdgeTag = connectedCoedge.getEdge()?.tag;
      const currentEdgeTag = coedge.getEdge()?.tag;
      return connectedEdgeTag !== currentEdgeTag;
    });

    return connectedCoedges;
  }

  findConnectedCoedgesByPoint(point: Point3D, faces: Face[]): Coedge3D[] {
    let connectedCoedges: Coedge3D[] = [];

    if (faces.length === 0) {
      return connectedCoedges;
    }

    let allEdges: Edge[] = [];
    for (const face of faces) {
      const faceEdges = (face as unknown as Sweeper).getEdges();
      allEdges = allEdges.concat(faceEdges);
    }

    for (const edge of allEdges) {
      const edgeStartPoint = edge.getStartVertex().getPoint();
      const edgeEndPoint = edge.getEndVertex().getPoint();

      if (edgeStartPoint.equals(point) || edgeEndPoint.equals(point)) {
        connectedCoedges = connectedCoedges.concat(edge.getCoedge3ds());
      }
    }

    return connectedCoedges;
  }

  findCoedgeByTag(tag: string, faces: Face[]): Coedge3D | undefined {
    let foundCoedge: Coedge3D | undefined;

    faces.forEach(face => {
      const edges = (face as unknown as Sweeper).getEdges();
      edges.forEach(edge => {
        const coedges = edge.getCoedge3ds();
        for (const coedge of coedges) {
          if (coedge.tag === tag) {
            foundCoedge = coedge;
          }
        }
      });
    });

    return foundCoedge;
  }

  getInversedCoedge(coedge: Coedge3D): Coedge3D | undefined {
    let inversedCoedge: Coedge3D | undefined;

    const edge = coedge.getEdge();
    if (!edge) {
      return undefined;
    }

    const otherCoedges = edge.getCoedge3ds().filter(c => c.tag !== coedge.tag);

    if (otherCoedges.length > 0) {
      inversedCoedge = otherCoedges[0];
    }

    return inversedCoedge;
  }

  static getInstance(): SweeperConnectHelper {
    if (!this._instance) {
      this._instance = new SweeperConnectHelper();
    }
    return this._instance;
  }
}