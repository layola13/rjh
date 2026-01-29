import * as GeometryModule from './geometry-module';
import * as CoreUtilModule from './core-util-module';

interface Sketch2d {
  background: {
    regions: Region2d[];
  };
}

interface Region2d {
  outer: Curve2d[];
}

interface Curve2d {
  isBackground?: boolean;
  containsPoint(point: Point2d): boolean;
  getStartPt(): Point2d;
}

interface Point2d {
  equals(other: Point2d): boolean;
}

interface SketchContext {
  getSketch(): Sketch2d;
}

class Line2d implements Curve2d {
  isBackground?: boolean;
  
  containsPoint(point: Point2d): boolean {
    throw new Error('Method not implemented');
  }
  
  getStartPt(): Point2d {
    throw new Error('Method not implemented');
  }
}

/**
 * Determines whether a vertex can be deleted from the sketch
 * @param context - The sketch context containing the sketch data
 * @param point - The point/vertex to check for deletion eligibility
 * @returns true if the vertex can be deleted, false otherwise
 */
export function couldDeleteVertex(context: SketchContext, point: Point2d): boolean {
  const sketch = context.getSketch();
  
  const connectedEdges = CoreUtilModule.HSCore.Util.ExtraordinarySketch2d.getConnectedEdgesByExPoint(sketch, point);
  
  if (connectedEdges.every((edge: Curve2d) => edge.isBackground)) {
    const containingRegion = sketch.background.regions.find((region: Region2d) => {
      return region.outer.some((curve: Curve2d) => {
        return curve.containsPoint(point);
      });
    });
    
    const TRIANGLE_VERTEX_COUNT = 3;
    
    if (containingRegion) {
      const isTriangle = containingRegion.outer.length === TRIANGLE_VERTEX_COUNT;
      const allLinesAreLinear = containingRegion.outer.every((curve: Curve2d) => {
        return curve instanceof Line2d;
      });
      const pointIsVertexOfRegion = containingRegion.outer.some((curve: Curve2d) => {
        return curve.getStartPt().equals(point);
      });
      
      if (isTriangle && allLinesAreLinear && pointIsVertexOfRegion) {
        return false;
      }
    }
  }
  
  return true;
}