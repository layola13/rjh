interface Region {
  id: number;
  depth: number;
  link: Region[];
  outer: CoEdge[];
  holes: CoEdge[][];
  oldId?: number[];
}

interface CoEdge {
  id: number;
  edge: Edge;
  isRev: boolean;
  region: Region;
  oldId?: number[];
}

interface Edge {
  id: number;
  curve: Curve;
  from: Vertex;
  to: Vertex;
  coedges: CoEdge[];
}

interface Curve {
  getMidPt(): Point;
  getParamAt(point: Point): number;
}

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface Vertex {
  id: number;
}

interface EdgeWithParam {
  e: Edge;
  t: number;
}

export class RegionUtil {
  /**
   * Traverse region tree and apply callback to each region
   */
  static traverseRegion(region: Region, callback: (region: Region) => void): void {
    callback(region);
    
    for (let i = 0; i < region.link.length; ++i) {
      if (region.link[i].depth > region.depth) {
        RegionUtil.traverseRegion(region.link[i], callback);
      }
    }
  }

  /**
   * Traverse all co-edges in a region and its sub-regions
   */
  static traverseCoEdge(region: Region, callback: (coEdge: CoEdge) => void): void {
    RegionUtil.traverseRegion(region, (currentRegion: Region) => {
      for (let i = 0; i < currentRegion.outer.length; ++i) {
        callback(currentRegion.outer[i]);
      }
      
      if (currentRegion.holes) {
        for (let i = 0; i < currentRegion.holes.length; ++i) {
          for (let j = 0; j < currentRegion.holes[i].length; ++j) {
            callback(currentRegion.holes[i][j]);
          }
        }
      }
    });
  }

  /**
   * Get mapping from original region IDs to current regions
   */
  static getOriginalRegion(region: Region): Map<number, Region[]> {
    const originalMap = new Map<number, Region[]>();
    
    RegionUtil.traverseRegion(region, (currentRegion: Region) => {
      if (currentRegion.oldId) {
        for (let i = 0; i < currentRegion.oldId.length; ++i) {
          let regions = originalMap.get(currentRegion.oldId[i]);
          if (!regions) {
            regions = [];
            originalMap.set(currentRegion.oldId[i], regions);
          }
          regions.push(currentRegion);
        }
      }
    });
    
    return originalMap;
  }

  /**
   * Get co-edge order based on original edges
   */
  static getCoEdgeOrderByOriginal(region: Region, originalEdges: CoEdge[]): Map<CoEdge, Edge[]> {
    const edgeListMap = new Map<CoEdge, EdgeWithParam[]>();
    const edgeMap = new Map<number, CoEdge>();
    const edgeArrays: EdgeWithParam[][] = [];
    const originalCoEdges: CoEdge[] = [];
    const resultMap = new Map<CoEdge, Edge[]>();
    
    for (let i = 0; i < originalEdges.length; ++i) {
      edgeMap.set(originalEdges[i].id, originalEdges[i]);
    }
    
    RegionUtil.traverseCoEdge(region, (coEdge: CoEdge) => {
      if (coEdge.oldId) {
        const midPoint = coEdge.edge.curve.getMidPt();
        
        for (let i = 0; i < coEdge.oldId.length; ++i) {
          const originalCoEdge = edgeMap.get(coEdge.oldId[i]);
          
          if (originalCoEdge) {
            let edgeList = edgeListMap.get(originalCoEdge);
            if (!edgeList) {
              edgeList = [];
              originalCoEdges.push(originalCoEdge);
              edgeArrays.push(edgeList);
              edgeListMap.set(originalCoEdge, edgeList);
            }
            
            edgeList.push({
              e: coEdge.edge,
              t: originalCoEdge.curve.getParamAt(midPoint)
            });
          }
        }
      }
    });
    
    for (let i = 0; i < edgeArrays.length; ++i) {
      edgeArrays[i].sort((a: EdgeWithParam, b: EdgeWithParam) => a.t - b.t);
      
      let writeIndex = 0;
      for (let j = 0; j < edgeArrays[i].length; ++j) {
        if (!writeIndex || edgeArrays[i][j].e !== edgeArrays[i][writeIndex - 1].e) {
          edgeArrays[i][writeIndex++] = edgeArrays[i][j];
        }
      }
      
      while (edgeArrays[i].length > writeIndex) {
        edgeArrays[i].pop();
      }
      
      resultMap.set(originalCoEdges[i], edgeArrays[i].map((item: EdgeWithParam) => item.e));
    }
    
    return resultMap;
  }

  /**
   * Merge two dual regions into one
   */
  static mergeDualRegion(regionA: Region, regionB: Region, sharedEdges: Set<Edge>): void {
    const allBoundaries: CoEdge[][] = [regionA.outer];
    
    for (let i = 0; i < regionA.holes.length; ++i) {
      allBoundaries.push(regionA.holes[i]);
    }
    
    for (let i = 0; i < allBoundaries.length; ++i) {
      for (let j = 0; j < allBoundaries[i].length; ++j) {
        const edge = allBoundaries[i][j].edge;
        
        if ((edge.coedges[0].region === regionA && edge.coedges[1].region === regionB) ||
            (edge.coedges[0].region === regionB && edge.coedges[1].region === regionA)) {
          sharedEdges.add(edge);
        }
      }
    }
    
    const remainingCoEdges: CoEdge[] = [];
    
    const collectNonSharedEdges = (region: Region): void => {
      for (let i = 0; i < region.outer.length; ++i) {
        if (!sharedEdges.has(region.outer[i].edge)) {
          remainingCoEdges.push(region.outer[i]);
        }
      }
      
      for (let i = 0; i < region.holes.length; ++i) {
        for (let j = 0; j < region.holes[i].length; ++j) {
          if (!sharedEdges.has(region.holes[i][j].edge)) {
            remainingCoEdges.push(region.holes[i][j]);
          }
        }
      }
    };
    
    collectNonSharedEdges(regionA);
    collectNonSharedEdges(regionB);
    
    const nextIndices: number[][] = [];
    const vertexToCoEdgeMap = new Map<Vertex, number[]>();
    
    for (let i = 0; i < remainingCoEdges.length; ++i) {
      const vertex = remainingCoEdges[i].isRev ? remainingCoEdges[i].edge.to : remainingCoEdges[i].edge.from;
      let indices = vertexToCoEdgeMap.get(vertex);
      
      if (indices) {
        indices.push(i);
      } else {
        vertexToCoEdgeMap.set(vertex, [i]);
      }
    }
    
    for (let i = 0; i < remainingCoEdges.length; ++i) {
      const vertex = remainingCoEdges[i].isRev ? remainingCoEdges[i].edge.from : remainingCoEdges[i].edge.to;
      const indices = vertexToCoEdgeMap.get(vertex);
      nextIndices.push(indices!);
    }
    
    const minDepth = Math.min(regionA.depth, regionB.depth);
    let outerBoundary: CoEdge[] = [];
    const holeBoundaries: CoEdge[][] = [];
    
    for (let i = 0; i < remainingCoEdges.length; ++i) {
      let currentIndex = i;
      const loop: CoEdge[] = [];
      let minLoopDepth = 1e100;
      
      while (nextIndices[currentIndex].length > 0) {
        loop.push(remainingCoEdges[currentIndex]);
        
        const edgeDepth = Math.min(
          remainingCoEdges[currentIndex].edge.coedges[0].region.depth,
          remainingCoEdges[currentIndex].edge.coedges[1].region.depth
        );
        
        if (edgeDepth < minLoopDepth) {
          minLoopDepth = edgeDepth;
        }
        
        currentIndex = nextIndices[currentIndex].pop()!;
      }
      
      if (loop.length !== 0) {
        if (minLoopDepth < minDepth) {
          outerBoundary = loop;
        } else {
          holeBoundaries.push(loop);
        }
      }
    }
    
    regionA.depth = minDepth;
    regionA.outer = outerBoundary;
    regionA.holes = holeBoundaries;
    
    const linkedRegions: Region[] = [];
    const visitedRegions = new Set<Region>();
    visitedRegions.add(regionA);
    
    for (let i = 0; i < remainingCoEdges.length; ++i) {
      const coedges = remainingCoEdges[i].edge.coedges;
      
      for (let j = 0; j < coedges.length; ++j) {
        if (coedges[j].region === regionB) {
          coedges[j].region = regionA;
        }
        
        if (!visitedRegions.has(coedges[j].region)) {
          linkedRegions.push(coedges[j].region);
          visitedRegions.add(coedges[j].region);
        }
      }
    }
    
    regionA.link = linkedRegions;
  }

  /**
   * Adaptive ID allocation for region merging
   */
  static adaptiveIdAllocation(
    regions: Region[],
    predicateA: (region: Region) => boolean,
    predicateB: (region: Region) => boolean
  ): void {
    const findDualRegions = (regionList: Region[]): [Region, Region] | undefined => {
      for (let i = 0; i < regionList.length; ++i) {
        if (predicateA(regionList[i]) && predicateB(regionList[i]) && regionList[i].depth !== 0) {
          for (let j = 0; j < regionList[i].link.length; ++j) {
            const linkedRegion = regionList[i].link[j];
            
            if (!predicateA(linkedRegion) && predicateB(linkedRegion) && linkedRegion.depth !== 0) {
              const currentRegion = regionList[i];
              regionList[i] = regionList[regionList.length - 1];
              regionList.pop();
              return [linkedRegion, currentRegion];
            }
          }
        }
      }
      
      return undefined;
    };
    
    const sharedEdgeSet = new Set<Edge>();
    let dualPair: [Region, Region] | undefined;
    
    while ((dualPair = findDualRegions(regions))) {
      RegionUtil.mergeDualRegion(dualPair[0], dualPair[1], sharedEdgeSet);
    }
  }
}