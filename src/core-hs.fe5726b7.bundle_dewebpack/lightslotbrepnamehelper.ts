import { Plane } from './Plane';
import { Logger } from './Logger';

interface UserData {
  id?: string;
  tag?: string;
  startPointId?: number;
  faceIndex?: number;
  topoed?: boolean;
  edge2Curve?: boolean;
  lightslotpath?: boolean;
}

interface Point3D {
  equals(other: Point3D): boolean;
  distanceTo(other: Point3D): number;
}

interface Curve {
  userData: UserData;
  getStartPt(): Point3D;
}

interface Vertex {
  getPoint(): Point3D;
  getEdges(): Edge[];
}

interface CoEdge3D {
  tag: string;
  userData?: UserData;
  getEdge(): Edge;
  getFace(): Face;
}

interface Wire {
  getCoedge3ds(): CoEdge3D[];
}

interface Face {
  tag: string;
  userData?: UserData;
  getEdges(): Edge[];
  getWires(): Wire[];
  getCoedge3ds(): CoEdge3D[];
}

interface Edge {
  tag: string;
  userData?: UserData;
  getFaces(): Face[];
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getParent(): Brep;
}

interface Brep {
  tag?: string;
  getEdges(): Edge[];
  getFaces(): Face[];
  getVertexs(): Vertex[];
  replaceEdgeTag(oldTag: string, newTag: string): void;
}

interface SweepProfile {
  getAllCurves(): Curve[];
}

interface SweepEntity {
  id: string;
  userData: UserData;
  breps: Brep[];
  getSweepPath3D(): Array<{ userData?: UserData }>;
  getSweepProfile(): SweepProfile;
  getLocalCoordinate(): unknown;
}

type CurveSweepFacesMap = Map<Curve, (Face | undefined)[]>;

export class LightSlotBrepnameHelper {
  private static _instance: LightSlotBrepnameHelper;
  private topoNameCaches: string[] = [];

  constructor() {
    this.topoNameCaches = [];
  }

  static getInstance(): LightSlotBrepnameHelper {
    if (!this._instance) {
      this._instance = new LightSlotBrepnameHelper();
    }
    return this._instance;
  }

  reconstructBrepNames(entity: SweepEntity, curveSweepFacesMap: CurveSweepFacesMap): void {
    this.topoNameCaches = [];
    
    if (entity.breps.length > 0) {
      entity.breps[0].tag = entity.id;
    }
    
    this.toponameFaces(entity, curveSweepFacesMap);
    this.toponameEdges(entity, curveSweepFacesMap);
    this.toponameCoEdges(entity);
  }

  private getCurveSweepFaces(curve: Curve, curveSweepFacesMap: CurveSweepFacesMap): (Face | undefined)[] | undefined {
    for (const [mapCurve, faces] of curveSweepFacesMap) {
      if (mapCurve.userData && mapCurve.userData.id === curve.userData.id) {
        return faces.filter((face) => face !== undefined);
      }
    }
    return undefined;
  }

  private toponameFaces(entity: SweepEntity, curveSweepFacesMap: CurveSweepFacesMap): void {
    const sweepPath = entity.getSweepPath3D();
    const profileCurves = entity.getSweepProfile().getAllCurves();
    
    for (const curve of profileCurves) {
      const sweepFaces = this.getCurveSweepFaces(curve, curveSweepFacesMap);
      
      if (!sweepFaces) {
        continue;
      }
      
      for (let pathIndex = 0; pathIndex < sweepPath.length; pathIndex++) {
        const face = sweepFaces[pathIndex];
        if (!face) {
          continue;
        }
        
        const pathSegment = sweepPath[pathIndex];
        const faceTag = pathSegment.userData 
          ? `${curve.userData.id}-${pathSegment.userData.tag}` 
          : `${curve.userData.id}-`;
        
        face.tag = faceTag;
        face.userData = {
          faceIndex: pathIndex
        };
        
        this.checkTopoName(faceTag);
      }
    }
  }

  private toponameEdges(entity: SweepEntity, curveSweepFacesMap: CurveSweepFacesMap): void {
    const edges = entity.breps[0].getEdges();
    const profileCurves = entity.getSweepProfile().getAllCurves();
    
    const curve1 = profileCurves.filter((curve) => curve.userData.id === '1')[0];
    const curve4 = profileCurves.filter((curve) => curve.userData.id === '4')[0];
    
    const curve1Faces = this.getCurveSweepFaces(curve1, curveSweepFacesMap);
    const curve4Faces = this.getCurveSweepFaces(curve4, curveSweepFacesMap);
    
    if (!curve1Faces || !curve4Faces) {
      return;
    }
    
    const isShortPath = curve4Faces.length < curve1Faces.length;
    
    for (const edge of edges) {
      const faces = edge.getFaces();
      const face0 = faces[0];
      const face1 = faces[1];
      
      if (isShortPath) {
        const face0Id = face0.tag.split('-')[0];
        const face1Id = face1.tag.split('-')[0];
        
        if ((face0Id === '4' && face1Id === '5') || (face0Id === '5' && face1Id === '4')) {
          continue;
        }
        
        const edgeTag = this.calcEdgeTopoName(face0, face1, edge);
        this.checkTopoName(edgeTag);
        edge.getParent().replaceEdgeTag(edge.tag, edgeTag);
        
        const isEdgeToCurve = (face0Id === '7' && face1Id === '1') || (face0Id === '1' && face1Id === '7');
        edge.userData = {
          topoed: true,
          edge2Curve: isEdgeToCurve
        };
      } else {
        const edgeTag = this.calcEdgeTopoName(face0, face1, edge);
        this.checkTopoName(edgeTag);
        edge.getParent().replaceEdgeTag(edge.tag, edgeTag);
        
        const face0Id = face0.tag.split('-')[0];
        const face1Id = face1.tag.split('-')[0];
        
        if ((face0Id === '4' && face1Id === '5') || (face0Id === '5' && face1Id === '4')) {
          edge.userData = {
            topoed: true,
            lightslotpath: true
          };
        } else {
          const isEdgeToCurve = (face0Id === '7' && face1Id === '1') || (face0Id === '1' && face1Id === '7');
          edge.userData = {
            topoed: true,
            edge2Curve: isEdgeToCurve
          };
        }
      }
    }
    
    if (isShortPath) {
      const point5 = this.get5PtIn3D(entity);
      if (!point5) {
        return;
      }
      
      const firstFace4Edges = curve4Faces[0].getEdges();
      let untopedEdges: Edge[] = [];
      const orderedEdges: Edge[] = [];
      
      for (const edge of firstFace4Edges) {
        if (!edge.userData?.topoed) {
          untopedEdges.push(edge);
          if (edge.userData) {
            edge.userData.topoed = true;
            edge.userData.lightslotpath = true;
          }
        }
      }
      
      for (const edge of untopedEdges) {
        if (edge.getStartVertex().getPoint().equals(point5)) {
          orderedEdges.push(edge);
          untopedEdges = untopedEdges.filter((e) => e !== edge);
        }
      }
      
      for (let i = 0; i < untopedEdges.length; i++) {
        const lastEndPoint = orderedEdges[orderedEdges.length - 1].getEndVertex().getPoint();
        
        for (const edge of untopedEdges) {
          const startPoint = edge.getStartVertex().getPoint();
          if (lastEndPoint.equals(startPoint)) {
            orderedEdges.push(edge);
          }
        }
      }
      
      for (let i = 1; i <= orderedEdges.length; i++) {
        const edge = orderedEdges[i - 1];
        const edgeTag = `4>5-${i}`;
        this.checkTopoName(edgeTag);
        edge.getParent().replaceEdgeTag(edge.tag, edgeTag);
        edge.userData = {
          topoed: true,
          lightslotpath: true
        };
      }
    }
  }

  private calcEdgeTopoName(face0: Face, face1: Face, edge: Edge): string {
    const sortedFaces = [face0, face1];
    sortedFaces.sort((a, b) => a.tag.localeCompare(b.tag));
    
    const wires = sortedFaces[0].getWires();
    let sharedEdges: Edge[] = [];
    
    for (const wire of wires) {
      sharedEdges = wire
        .getCoedge3ds()
        .filter((coedge) => coedge.getEdge()?.getFaces().includes(sortedFaces[1]))
        .map((coedge) => coedge.getEdge())
        .filter((e): e is Edge => e !== null);
      
      if (sharedEdges.length > 0) {
        break;
      }
    }
    
    const edgeIndex = sharedEdges.indexOf(edge);
    return `${sortedFaces[0].tag}>${sortedFaces[1].tag}>${edgeIndex}`;
  }

  private toponameCoEdges(entity: SweepEntity): void {
    const faces = entity.breps[0].getFaces();
    
    for (const face of faces) {
      const coedges = face.getCoedge3ds();
      
      for (const coedge of coedges) {
        const coedgeTag = `${coedge.getFace().tag}>${coedge.getEdge().tag}`;
        
        if (this.checkTopoName(coedgeTag)) {
          const edge = coedge.getEdge();
          const coedgeFace = coedge.getFace();
          
          if (edge.userData?.lightslotpath && coedgeFace.tag.startsWith('4')) {
            coedge.userData = {
              lightslotpath: true
            };
          }
          
          coedge.tag = coedgeTag;
        }
      }
    }
  }

  private get5PtIn3D(entity: SweepEntity): Point3D | undefined {
    const profileCurves = entity.getSweepProfile().getAllCurves();
    let point5: Point3D | undefined;
    let curve5: Curve | undefined;
    
    for (const curve of profileCurves) {
      const startPoint = curve.getStartPt();
      if (curve.userData.startPointId === 5) {
        point5 = startPoint;
        curve5 = curve;
      }
    }
    
    if (!point5 || !curve5) {
      Logger.console.assert(false, 'find pt 5 failed, please check!');
      return undefined;
    }
    
    const plane = new Plane(entity.getLocalCoordinate());
    const curve3d = plane.getCurve3d(curve5);
    const point5In3D = curve3d.getStartPt();
    
    let candidatePoints: Point3D[] = [];
    
    entity.breps.forEach((brep) => {
      const vertices = brep.getVertexs().filter((vertex) =>
        vertex.getEdges().some((edge) => {
          const edgeFaces = edge.getFaces();
          if (edgeFaces.length < 2) {
            return false;
          }
          
          const face0 = edgeFaces[0];
          const face1 = edgeFaces[1];
          const face0Id = face0.tag.split('-')[0];
          const face1Id = face1.tag.split('-')[0];
          
          return (face0Id === '4' && face1Id === '5') || (face0Id === '5' && face1Id === '4');
        })
      ).map((vertex) => vertex.getPoint());
      
      candidatePoints = candidatePoints.concat(...vertices);
    });
    
    if (candidatePoints.some((point) => point.equals(point5In3D))) {
      return point5In3D;
    }
    
    let closestPoint = candidatePoints[0];
    let minDistance = 1e6;
    
    for (const point of candidatePoints) {
      const distance = point.distanceTo(point5In3D);
      if (distance < minDistance) {
        closestPoint = point;
        minDistance = distance;
      }
    }
    
    return closestPoint;
  }

  private checkTopoName(topoName: string): boolean {
    if (this.topoNameCaches.includes(topoName)) {
      Logger.console.assert(false, '拓扑命名重复，请校核！');
      return false;
    }
    
    this.topoNameCaches.push(topoName);
    return true;
  }
}