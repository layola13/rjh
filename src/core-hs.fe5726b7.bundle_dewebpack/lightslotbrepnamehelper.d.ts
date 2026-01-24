import { Plane } from './Plane';
import { Logger } from './Logger';

/**
 * Helper class for reconstructing topological names (brep names) for light slot geometries.
 * Handles naming of faces, edges, and coedges based on sweep operations.
 */
export class LightSlotBrepnameHelper {
  private static _instance?: LightSlotBrepnameHelper;
  
  /** Cache for storing generated topological names to detect duplicates */
  private topoNameCaches: string[] = [];

  private constructor() {
    this.topoNameCaches = [];
  }

  /**
   * Gets the singleton instance of LightSlotBrepnameHelper.
   * @returns The singleton instance
   */
  public static getInstance(): LightSlotBrepnameHelper {
    if (!this._instance) {
      this._instance = new LightSlotBrepnameHelper();
    }
    return this._instance;
  }

  /**
   * Reconstructs topological names for all brep elements (faces, edges, coedges).
   * @param geometry - The geometry object containing breps to be named
   * @param sweepFacesMap - Map associating curves with their swept faces
   */
  public reconstructBrepNames(
    geometry: GeometryWithBreps,
    sweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): void {
    this.topoNameCaches = [];
    
    if (geometry.breps.length > 0) {
      geometry.breps[0].tag = geometry.id;
    }
    
    this.toponameFaces(geometry, sweepFacesMap);
    this.toponameEdges(geometry, sweepFacesMap);
    this.toponameCoEdges(geometry);
  }

  /**
   * Retrieves swept faces associated with a specific curve.
   * @param curve - The curve to match
   * @param sweepFacesMap - Map of curves to their swept faces
   * @returns Array of faces swept from the curve, or undefined if not found
   */
  private getCurveSweepFaces(
    curve: CurveWithUserData,
    sweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): (Face | undefined)[] | undefined {
    for (const [mapCurve, faces] of sweepFacesMap) {
      if (mapCurve.userData?.id === curve.userData.id) {
        return faces.filter(face => face !== undefined);
      }
    }
    return undefined;
  }

  /**
   * Assigns topological names to faces based on sweep profile curves and paths.
   * @param geometry - The geometry containing the sweep operation
   * @param sweepFacesMap - Map of curves to their swept faces
   */
  private toponameFaces(
    geometry: GeometryWithBreps,
    sweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): void {
    const sweepPath = geometry.getSweepPath3D();
    const profileCurves = geometry.getSweepProfile().getAllCurves();
    
    for (const curve of profileCurves) {
      const sweptFaces = this.getCurveSweepFaces(curve, sweepFacesMap);
      
      if (!sweptFaces) continue;
      
      for (let pathIndex = 0; pathIndex < sweepPath.length; pathIndex++) {
        const face = sweptFaces[pathIndex];
        if (!face) continue;
        
        const pathSegment = sweepPath[pathIndex];
        const tagPrefix = pathSegment.userData 
          ? `${curve.userData.id}-${pathSegment.userData.tag}` 
          : `${curve.userData.id}-`;
        
        face.tag = tagPrefix;
        face.userData = { faceIndex: pathIndex };
        this.checkTopoName(tagPrefix);
      }
    }
  }

  /**
   * Assigns topological names to edges based on adjacent faces.
   * @param geometry - The geometry containing edges
   * @param sweepFacesMap - Map of curves to their swept faces
   */
  private toponameEdges(
    geometry: GeometryWithBreps,
    sweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): void {
    const edges = geometry.breps[0].getEdges();
    const profileCurves = geometry.getSweepProfile().getAllCurves();
    
    const curve1 = profileCurves.filter(c => c.userData.id === '1')[0];
    const curve4 = profileCurves.filter(c => c.userData.id === '4')[0];
    
    const faces1 = this.getCurveSweepFaces(curve1, sweepFacesMap);
    const faces4 = this.getCurveSweepFaces(curve4, sweepFacesMap);
    
    if (!faces1 || !faces4) return;
    
    const isLightSlotPathShorter = faces4.length < faces1.length;
    
    for (const edge of edges) {
      const adjacentFaces = edge.getFaces();
      const face0 = adjacentFaces[0];
      const face1 = adjacentFaces[1];
      
      if (isLightSlotPathShorter) {
        // Skip edges between face types 4 and 5
        if (this.isEdgeBetweenFaceTypes(face0, face1, '4', '5')) {
          continue;
        }
        
        this.assignEdgeTopology(edge, face0, face1, true);
      } else {
        this.assignEdgeTopology(edge, face0, face1, false);
        
        if (this.isEdgeBetweenFaceTypes(face0, face1, '4', '5')) {
          edge.userData = { topoed: true, lightslotpath: true };
        }
      }
    }
    
    // Handle light slot path edges for shorter path case
    if (isLightSlotPathShorter) {
      this.handleLightSlotPathEdges(geometry, faces4);
    }
  }

  /**
   * Checks if an edge is between two specific face types.
   */
  private isEdgeBetweenFaceTypes(
    face0: Face,
    face1: Face,
    type1: string,
    type2: string
  ): boolean {
    const face0Type = face0.tag.split('-')[0];
    const face1Type = face1.tag.split('-')[0];
    
    return (
      (face0Type === type1 && face1Type === type2) ||
      (face0Type === type2 && face1Type === type1)
    );
  }

  /**
   * Assigns topology data to an edge based on adjacent faces.
   */
  private assignEdgeTopology(
    edge: Edge,
    face0: Face,
    face1: Face,
    checkEdgeToCurve: boolean
  ): void {
    const edgeTag = this.calcEdgeTopoName(face0, face1, edge);
    this.checkTopoName(edgeTag);
    edge.getParent().replaceEdgeTag(edge.tag, edgeTag);
    
    const isEdgeToCurve = this.isEdgeBetweenFaceTypes(face0, face1, '7', '1');
    edge.userData = {
      topoed: true,
      edge2Curve: checkEdgeToCurve ? isEdgeToCurve : isEdgeToCurve
    };
  }

  /**
   * Handles naming of edges along the light slot path.
   */
  private handleLightSlotPathEdges(
    geometry: GeometryWithBreps,
    faces4: (Face | undefined)[]
  ): void {
    const point5 = this.get5PtIn3D(geometry);
    if (!point5) return;
    
    const firstFaceEdges = faces4[0]!.getEdges();
    let unprocessedEdges: Edge[] = [];
    
    // Collect unprocessed edges
    for (const edge of firstFaceEdges) {
      if (!edge.userData?.topoed) {
        unprocessedEdges.push(edge);
        if (edge.userData) {
          edge.userData.topoed = true;
          edge.userData.lightslotpath = true;
        }
      }
    }
    
    // Order edges starting from point 5
    const orderedEdges: Edge[] = [];
    for (const edge of unprocessedEdges) {
      if (edge.getStartVertex().getPoint().equals(point5)) {
        orderedEdges.push(edge);
        unprocessedEdges = unprocessedEdges.filter(e => e !== edge);
      }
    }
    
    // Chain remaining edges
    for (let i = 0; i < unprocessedEdges.length; i++) {
      const lastEndPoint = orderedEdges[orderedEdges.length - 1].getEndVertex().getPoint();
      
      for (const edge of unprocessedEdges) {
        const startPoint = edge.getStartVertex().getPoint();
        if (lastEndPoint.equals(startPoint)) {
          orderedEdges.push(edge);
        }
      }
    }
    
    // Assign sequential tags
    for (let i = 1; i <= orderedEdges.length; i++) {
      const edge = orderedEdges[i - 1];
      const edgeTag = `4>5-${i}`;
      this.checkTopoName(edgeTag);
      edge.getParent().replaceEdgeTag(edge.tag, edgeTag);
      edge.userData = { topoed: true, lightslotpath: true };
    }
  }

  /**
   * Calculates topological name for an edge based on its adjacent faces.
   * @param face0 - First adjacent face
   * @param face1 - Second adjacent face
   * @param edge - The edge to name
   * @returns The calculated topological name
   */
  private calcEdgeTopoName(face0: Face, face1: Face, edge: Edge): string {
    const sortedFaces = [face0, face1];
    sortedFaces.sort((a, b) => a.tag.localeCompare(b.tag));
    
    const wires = sortedFaces[0].getWires();
    let sharedEdges: Edge[] = [];
    
    for (const wire of wires) {
      sharedEdges = wire.getCoedge3ds()
        .filter(coedge => coedge.getEdge()?.getFaces().includes(sortedFaces[1]))
        .map(coedge => coedge.getEdge())
        .filter((e): e is Edge => e !== null);
      
      if (sharedEdges.length > 0) break;
    }
    
    const edgeIndex = sharedEdges.indexOf(edge);
    return `${sortedFaces[0].tag}>${sortedFaces[1].tag}>${edgeIndex}`;
  }

  /**
   * Assigns topological names to coedges based on their face and edge.
   * @param geometry - The geometry containing coedges
   */
  private toponameCoEdges(geometry: GeometryWithBreps): void {
    const faces = geometry.breps[0].getFaces();
    
    for (const face of faces) {
      const coedges = face.getCoedge3ds();
      
      for (const coedge of coedges) {
        const coedgeTag = `${coedge.getFace().tag}>${coedge.getEdge().tag}`;
        this.checkTopoName(coedgeTag);
        
        const isLightSlotPath = 
          coedge.getEdge()?.userData?.lightslotpath &&
          coedge.getFace()?.tag.startsWith('4');
        
        if (isLightSlotPath) {
          coedge.userData = { lightslotpath: true };
        }
        
        coedge.tag = coedgeTag;
      }
    }
  }

  /**
   * Finds the 3D position of point 5 in the sweep profile.
   * @param geometry - The geometry containing the sweep profile
   * @returns The 3D point coordinates, or undefined if not found
   */
  private get5PtIn3D(geometry: GeometryWithBreps): Point3D | undefined {
    const profileCurves = geometry.getSweepProfile().getAllCurves();
    
    let point5: Point2D | undefined;
    let curve5: CurveWithUserData | undefined;
    
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
    
    const plane = new Plane(geometry.getLocalCoordinate());
    const point5In3D = plane.getCurve3d(curve5).getStartPt();
    
    let candidatePoints: Point3D[] = [];
    
    geometry.breps.forEach(brep => {
      const vertices = brep.getVertexs().filter(vertex =>
        vertex.getEdges().some(edge => {
          const faces = edge.getFaces();
          if (faces.length < 2) return false;
          
          const face0Type = faces[0].tag.split('-')[0];
          const face1Type = faces[1].tag.split('-')[0];
          
          return (
            (face0Type === '4' && face1Type === '5') ||
            (face0Type === '5' && face1Type === '4')
          );
        })
      ).map(vertex => vertex.getPoint());
      
      candidatePoints = candidatePoints.concat(...vertices);
    });
    
    if (candidatePoints.some(pt => pt.equals(point5In3D))) {
      return point5In3D;
    }
    
    // Find closest point if exact match not found
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

  /**
   * Validates and caches a topological name to prevent duplicates.
   * @param topoName - The topological name to check
   * @returns True if name is unique, false if duplicate
   */
  private checkTopoName(topoName: string): boolean {
    if (this.topoNameCaches.includes(topoName)) {
      Logger.console.assert(false, '拓扑命名重复，请校核！');
      return false;
    }
    
    this.topoNameCaches.push(topoName);
    return true;
  }
}

// Type definitions

interface Point2D {
  equals(other: Point2D): boolean;
}

interface Point3D {
  equals(other: Point3D): boolean;
  distanceTo(other: Point3D): number;
}

interface UserData {
  id?: string;
  tag?: string;
  startPointId?: number;
  faceIndex?: number;
  topoed?: boolean;
  lightslotpath?: boolean;
  edge2Curve?: boolean;
}

interface CurveWithUserData {
  userData: UserData;
  getStartPt(): Point2D;
}

interface Curve3D {
  getStartPt(): Point3D;
}

interface SweepProfile {
  getAllCurves(): CurveWithUserData[];
}

interface Vertex {
  getPoint(): Point3D;
  getEdges(): Edge[];
}

interface Edge {
  tag: string;
  userData?: UserData;
  getFaces(): Face[];
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getParent(): Brep;
}

interface Coedge3D {
  tag?: string;
  userData?: UserData;
  getEdge(): Edge | null;
  getFace(): Face;
}

interface Wire {
  getCoedge3ds(): Coedge3D[];
}

interface Face {
  tag: string;
  userData?: UserData;
  getEdges(): Edge[];
  getWires(): Wire[];
  getCoedge3ds(): Coedge3D[];
}

interface Brep {
  tag?: string;
  getFaces(): Face[];
  getEdges(): Edge[];
  getVertexs(): Vertex[];
  replaceEdgeTag(oldTag: string, newTag: string): void;
}

interface GeometryWithBreps {
  id: string;
  breps: Brep[];
  getSweepPath3D(): Array<{ userData?: UserData }>;
  getSweepProfile(): SweepProfile;
  getLocalCoordinate(): unknown;
}