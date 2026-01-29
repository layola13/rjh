import { Continuous, Wire } from './Continuous';
import { Box3 } from './Box3';

interface IFace {
  getEdges(): IEdge[];
}

interface IEdge {
  tag: string;
}

interface IContinuousFace {
  getFaces(): IFace[];
}

interface ICoedge3d {
  getEdgeTag(): string;
  getStartVertex(): IVertex;
  getEndVertex(): IVertex;
}

interface IVertex {
  tag: string;
}

interface IFaceWithCoedges extends IFace {
  getCoedge3ds(): ICoedge3d[];
  getBoundingBox(): IBoundingBox;
  calcPolygon(): IPolygon;
}

interface IBoundingBox {
  getCornerPts(): Array<{ x: number; y: number; z: number }>;
}

interface IPolygon {
  calcArea(): number;
}

interface IContinuousResult {
  edges: IEdge[];
  contEdges: Array<{ getEdges(): IEdge[] }>;
}

class ContinuousFaceAdapter {
  constructor(private readonly cface: IContinuousFace) {}

  getEdges(): IEdge[] {
    const edges: IEdge[] = [];
    for (const face of this.cface.getFaces()) {
      edges.push(...face.getEdges());
    }
    return edges;
  }
}

export class ContinousHelper {
  private static _instance: ContinousHelper;

  getContinousFaceWires(continuousFace: IContinuousFace): Wire[] {
    const allEdges: IEdge[] = [];
    const adapter = new ContinuousFaceAdapter(continuousFace);
    const interactiveResult: IContinuousResult = Continuous.ContinuousUtil.getAllInteractiveEdges(adapter);
    
    allEdges.push(...interactiveResult.edges);
    
    for (const contEdge of interactiveResult.contEdges) {
      allEdges.push(...contEdge.getEdges());
    }
    
    const edgeTags = allEdges.map((edge: IEdge) => edge.tag);
    const filteredCoedges: ICoedge3d[] = [];
    
    for (const face of continuousFace.getFaces() as IFaceWithCoedges[]) {
      const matchingCoedges = face.getCoedge3ds().filter((coedge: ICoedge3d) => 
        edgeTags.includes(coedge.getEdgeTag())
      );
      filteredCoedges.push(...matchingCoedges);
    }
    
    const processedIndices: number[] = [];
    const resultWires: Wire[] = [];
    
    while (processedIndices.length !== filteredCoedges.length) {
      const sortedCoedges: ICoedge3d[] = [];
      const startIndex = 0;
      
      this.getSortedCoedge3dList(filteredCoedges, sortedCoedges, startIndex, processedIndices);
      
      if (sortedCoedges.length > 0) {
        resultWires.push(new Wire(sortedCoedges));
      }
    }
    
    return resultWires;
  }

  private getSortedCoedge3dList(
    allCoedges: ICoedge3d[],
    sortedList: ICoedge3d[],
    currentIndex: number,
    processedIndices: number[]
  ): void {
    if (currentIndex >= allCoedges.length - 1) {
      return;
    }
    
    if (sortedList.length > 1 && 
        sortedList[0].getStartVertex().tag === sortedList[sortedList.length - 1].getEndVertex().tag) {
      return;
    }
    
    if (processedIndices.includes(currentIndex)) {
      this.getSortedCoedge3dList(allCoedges, sortedList, currentIndex + 1, processedIndices);
      return;
    }
    
    if (sortedList.length === 0) {
      sortedList.push(allCoedges[0]);
      processedIndices.push(0);
      this.getSortedCoedge3dList(allCoedges, sortedList, currentIndex + 1, processedIndices);
    } else {
      const lastEndVertex = sortedList[sortedList.length - 1].getEndVertex();
      const currentCoedge = allCoedges[currentIndex];
      
      if (lastEndVertex.tag === currentCoedge.getStartVertex().tag) {
        sortedList.push(currentCoedge);
        processedIndices.push(currentIndex);
      }
      
      this.getSortedCoedge3dList(allCoedges, sortedList, currentIndex + 1, processedIndices);
    }
  }

  getContinousFaceBounding(continuousFace: IContinuousFace): Box3 {
    const boundingBox = new Box3();
    
    for (const face of continuousFace.getFaces() as IFaceWithCoedges[]) {
      const faceBoundingBox = face.getBoundingBox();
      boundingBox.expandByPoint(...faceBoundingBox.getCornerPts());
    }
    
    return boundingBox;
  }

  getContinousFaceArea(continuousFace: IContinuousFace): number {
    let totalArea = 0;
    
    for (const face of continuousFace.getFaces() as IFaceWithCoedges[]) {
      totalArea += face.calcPolygon().calcArea();
    }
    
    return totalArea;
  }

  static getInstance(): ContinousHelper {
    if (!ContinousHelper._instance) {
      ContinousHelper._instance = new ContinousHelper();
    }
    return ContinousHelper._instance;
  }
}