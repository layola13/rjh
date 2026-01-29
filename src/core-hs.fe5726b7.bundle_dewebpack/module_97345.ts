import { Vertex } from './path/to/Vertex';
import { Edge } from './path/to/Edge';
import { CoEdge } from './path/to/CoEdge';
import { Loop } from './path/to/Loop';
import { Face } from './path/to/Face';
import { Logger } from './path/to/Logger';

interface Position {
  x?: number;
  y?: number;
  z?: number;
}

interface MVSFResult {
  face: Face;
  loop: Loop;
  vertex: Vertex;
}

interface MEVResult {
  edge: Edge;
  vertex: Vertex;
}

interface MEFResult {
  edge: Edge;
  loop: Loop;
}

interface ESplitResult {
  edges: Edge[];
}

function createVertex(position: Position): Vertex {
  return Vertex.create(position.x || 0, position.y || 0, position.z || 0);
}

function linkCoEdges(prev: CoEdge, next: CoEdge): void {
  prev.next = next;
  next.prev = prev;
}

function getParentEdges(vertex: Vertex): Edge[] {
  const edges: Edge[] = [];
  for (const key in vertex.parents) {
    const parent = vertex.parents[key];
    if (!edges.includes(parent) && parent instanceof HSCore.Model.Edge) {
      edges.push(parent);
    } else {
      Logger.console.assert(false, "inconsistency data");
    }
  }
  return edges;
}

function updateEdgeVertex(oldVertex: Vertex, newVertex: Vertex): void {
  if (oldVertex === newVertex) return;
  
  getParentEdges(oldVertex).forEach((edge) => {
    if (edge.from === oldVertex) {
      edge.from = newVertex;
    } else if (edge.to === oldVertex) {
      edge.to = newVertex;
    }
  });
}

export class EulerOperations {
  /**
   * Make Vertex, Shell, Face - Creates a new vertex, shell, and face
   */
  static mvsf(position: Position): MVSFResult {
    const vertex = createVertex(position);
    const loop = new Loop();
    const face = new Face();
    face.outerLoop = loop;
    
    return {
      face,
      loop,
      vertex
    };
  }

  /**
   * Make Edge, Vertex - Creates a new edge and vertex
   */
  static mev(fromVertex: Vertex, toPosition: Position, loop: Loop): MEVResult {
    const startVertex = fromVertex;
    const endVertex = createVertex(toPosition);
    const coEdge = CoEdge.create(startVertex, endVertex);
    const partnerCoEdge = CoEdge.create(endVertex, startVertex);
    const edge = coEdge.edge;
    
    if (loop.root) {
      const existingCoEdge = loop.findCoEdgeToVertex(startVertex);
      const nextCoEdge = existingCoEdge.next;
      loop.addChild(coEdge);
      loop.addChild(partnerCoEdge);
      linkCoEdges(existingCoEdge, coEdge);
      linkCoEdges(coEdge, partnerCoEdge);
      linkCoEdges(partnerCoEdge, nextCoEdge);
    } else {
      loop.addChild(coEdge);
      loop.addChild(partnerCoEdge);
      linkCoEdges(coEdge, partnerCoEdge);
      linkCoEdges(partnerCoEdge, coEdge);
      loop.root = coEdge;
    }
    
    return {
      edge,
      vertex: endVertex
    };
  }

  /**
   * Kill Edge, Vertex - Removes an edge and vertex
   */
  static kev(edge: Edge, vertex: Vertex, loop: Loop): void {
    const coEdge = loop.findCoEdgeToVertex(vertex);
    const partnerCoEdge = coEdge.next;
    
    Logger.console.assert(coEdge.edge === edge);
    Logger.console.assert(partnerCoEdge.edge === edge);
    
    const prevCoEdge = coEdge.prev;
    const nextCoEdge = partnerCoEdge.next;
    
    coEdge.remove();
    partnerCoEdge.remove();
    edge.remove();
    edge.from = undefined;
    edge.to = undefined;
    
    if (prevCoEdge === partnerCoEdge) {
      loop.root = undefined;
    } else {
      linkCoEdges(prevCoEdge, nextCoEdge);
      loop.root = nextCoEdge;
    }
    
    Logger.console.assert(loop.validate());
  }

  /**
   * Make Edge, Face - Creates a new edge and face
   */
  static mef(fromVertex: Vertex, toVertex: Vertex, loop: Loop): MEFResult {
    Logger.console.assert(loop.validate());
    
    const coEdge = CoEdge.create(fromVertex, toVertex);
    const partnerCoEdge = CoEdge.create(toVertex, fromVertex);
    const newLoop = new Loop();
    const fromCoEdge = loop.findCoEdgeToVertex(fromVertex);
    const fromNext = fromCoEdge.next;
    const toCoEdge = loop.findCoEdgeToVertex(toVertex);
    const toNext = toCoEdge.next;
    
    loop.root = coEdge;
    linkCoEdges(fromCoEdge, coEdge);
    linkCoEdges(coEdge, toNext);
    
    newLoop.root = partnerCoEdge;
    linkCoEdges(toCoEdge, partnerCoEdge);
    linkCoEdges(partnerCoEdge, fromNext);
    
    loop.forEachCoEdge((ce) => {
      ce.setLoop(loop);
    });
    
    newLoop.forEachCoEdge((ce) => {
      ce.setLoop(newLoop);
    });
    
    Logger.console.assert(loop.validate());
    Logger.console.assert(newLoop.validate());
    
    return {
      edge: coEdge.edge,
      loop: newLoop
    };
  }

  /**
   * Kill Edge, Face - Removes an edge and face
   */
  static kef(edge: Edge, face: Face): void {
    const outerLoop = face.outerLoop;
    const coEdge = edge.coedge;
    const partnerCoEdge = coEdge.partner;
    const coEdgeLoop = coEdge.getUniqueParent();
    const partnerLoop = partnerCoEdge.getUniqueParent();
    const coEdgePrev = coEdge.prev;
    const partnerNext = partnerCoEdge.next;
    const partnerPrev = partnerCoEdge.prev;
    const coEdgeNext = coEdge.next;
    
    linkCoEdges(coEdgePrev, partnerNext);
    linkCoEdges(partnerPrev, coEdgeNext);
    
    const remainingLoop = outerLoop === coEdgeLoop ? partnerLoop : coEdgeLoop;
    
    if (remainingLoop.root === coEdge) {
      remainingLoop.root = coEdgeNext;
    } else if (remainingLoop.root === partnerCoEdge) {
      remainingLoop.root = partnerNext;
    }
    
    remainingLoop.forEachCoEdge((ce) => {
      remainingLoop.addChild(ce);
    });
    
    coEdge.remove();
    partnerCoEdge.remove();
    edge.remove();
    edge.from = undefined;
    edge.to = undefined;
    outerLoop.removeAllChildren();
    outerLoop.root = undefined;
    
    Logger.console.assert(remainingLoop.validate());
  }

  /**
   * Edge Split - Splits an edge into multiple edges at given vertices
   */
  static esplit(edge: Edge, vertices: Vertex[]): ESplitResult | undefined {
    if (vertices.length < 1) return;
    
    let forwardCoEdge: CoEdge | undefined;
    let backwardCoEdge: CoEdge | undefined;
    
    Object.values(edge.parents)
      .filter((parent): parent is HSCore.Model.CoEdge => 
        parent != null && parent instanceof HSCore.Model.CoEdge
      )
      .forEach((coEdge) => {
        if (coEdge.from === edge.from) {
          forwardCoEdge = coEdge;
        } else {
          backwardCoEdge = coEdge;
        }
      });
    
    const forwardLoop = forwardCoEdge ? forwardCoEdge.getUniqueParent() : undefined;
    const backwardLoop = backwardCoEdge ? backwardCoEdge.getUniqueParent() : undefined;
    const allVertices = vertices.concat(edge.to);
    
    edge.to = vertices[0];
    
    const newEdges: Edge[] = [];
    const forwardCoEdges: CoEdge[] = [];
    const backwardCoEdges: CoEdge[] = [];
    
    for (let i = 0; i < allVertices.length - 1; i++) {
      const fromVertex = allVertices[i];
      const toVertex = allVertices[i + 1];
      const newEdge = Edge.create(fromVertex, toVertex);
      
      newEdge.copyProperty(edge);
      if (edge.curve) {
        newEdge.curve = edge.curve.clone();
      }
      
      newEdges.push(newEdge);
      
      if (forwardLoop) {
        const newCoEdge = CoEdge.create(fromVertex, toVertex);
        forwardCoEdges.push(newCoEdge);
      }
      
      if (backwardLoop) {
        const newCoEdge = CoEdge.create(toVertex, fromVertex);
        backwardCoEdges.push(newCoEdge);
      }
    }
    
    if (forwardLoop) {
      forwardCoEdges.forEach((coEdge) => {
        const prevCoEdge = forwardLoop.findCoEdgeToVertex(coEdge.from);
        forwardLoop.appendCoEdge(coEdge, prevCoEdge);
      });
    }
    
    if (backwardLoop) {
      backwardCoEdges.reverse();
      backwardCoEdges.forEach((coEdge) => {
        let prevCoEdge = backwardLoop.findCoEdgeToVertex(coEdge.from);
        if (!prevCoEdge) {
          coEdge.reversed = !coEdge.reversed;
          prevCoEdge = backwardLoop.findCoEdgeToVertex(coEdge.from);
        }
        backwardLoop.appendCoEdge(coEdge, prevCoEdge);
      });
    }
    
    if (forwardLoop) {
      Logger.console.assert(forwardLoop.validate());
    }
    if (backwardLoop) {
      Logger.console.assert(backwardLoop.validate());
    }
    
    return {
      edges: newEdges
    };
  }

  /**
   * Merge Edges On Vertex - Merges two edges connected at a vertex
   */
  static mergeEdgesOnVertex(vertex: Vertex): boolean | undefined {
    const edges = getParentEdges(vertex);
    
    if (edges.length !== 2) {
      return false;
    }
    
    const firstEdge = edges[0];
    const secondEdge = edges[1];
    
    if (firstEdge.isSplitEdge !== secondEdge.isSplitEdge || 
        firstEdge.isInnerEdge !== secondEdge.isInnerEdge) {
      return;
    }
    
    if (!areSameEdgeCurves(firstEdge, secondEdge)) {
      return;
    }
    
    if (secondEdge.from === vertex) {
      updateEdgeVertex(secondEdge.from, secondEdge.to);
    } else if (secondEdge.to === vertex) {
      updateEdgeVertex(secondEdge.to, secondEdge.from);
    }
    
    const coEdge = secondEdge.coedge;
    const partnerCoEdge = coEdge.partner;
    const coEdgeLoop = coEdge ? coEdge.getUniqueParent() : undefined;
    const partnerLoop = partnerCoEdge ? partnerCoEdge.getUniqueParent() : undefined;
    
    if (coEdgeLoop) {
      coEdgeLoop.removeCoEdge(coEdge);
    }
    if (partnerLoop) {
      partnerLoop.removeCoEdge(partnerCoEdge);
    }
    
    secondEdge.from = undefined;
    secondEdge.to = undefined;
    secondEdge.remove();
    
    if (coEdgeLoop) {
      Logger.console.assert(coEdgeLoop.validate());
    }
    if (partnerLoop) {
      Logger.console.assert(partnerLoop.validate());
    }
    
    return true;
  }
}

function areSameEdgeCurves(edge1: Edge, edge2: Edge): boolean {
  const curve1 = HSCore.Util.Edge.toTHREECurve(edge1);
  const curve2 = HSCore.Util.Edge.toTHREECurve(edge2);
  
  if ((curve1 instanceof THREE.Line3 && curve2 instanceof THREE.ArcCurve) ||
      (curve1 instanceof THREE.ArcCurve && curve2 instanceof THREE.Line3)) {
    return false;
  }
  
  if (curve1 instanceof THREE.Line3) {
    return GeLib.LineUtils.isSameLines(curve1, curve2);
  } else {
    const tolerance = 0.001;
    return GeLib.MathUtils.nearlyEqual(curve1.aX, curve2.aX, tolerance) &&
           GeLib.MathUtils.nearlyEqual(curve1.aY, curve2.aY, tolerance) &&
           GeLib.MathUtils.nearlyEqual(curve1.xRadius, curve2.xRadius, tolerance);
  }
}