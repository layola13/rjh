import { EN_GEO_ELEMENT_TYPE, Arc3d, Line3d, Arc2d, Line2d } from './geo-types';

interface HasChildren {
  children: Record<string, unknown>;
}

interface HasParents {
  id: string;
  parents: Record<string, unknown>;
}

interface Segment3DData {
  type: EN_GEO_ELEMENT_TYPE;
  [key: string]: unknown;
}

interface Segment2DData {
  type: EN_GEO_ELEMENT_TYPE;
  [key: string]: unknown;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Discretizable {
  discrete(): Point3D[];
}

type Segment3D = Arc3d | Line3d;
type Segment2D = Arc2d | Line2d;

interface ModelWithParents extends HasParents {
  id: string;
  parents: Record<string, HSCore.Model.Layer | AssemblyLikeModel>;
}

type AssemblyLikeModel = 
  | HSCore.Model.DAssembly 
  | HSCore.Model.DContent 
  | HSCore.Model.DExtruding 
  | HSCore.Model.DMolding 
  | HSCore.Model.DSweep;

interface ErrorInfo {
  errorStack: Error;
  description: string;
  errorInfo: {
    modelId: string;
    function: string;
  };
}

function hasValidParentChildRelation(parent: HasChildren, child: HasParents): boolean {
  return parent.children[child.id] !== undefined && child.parents[parent.id] !== undefined;
}

function isAssemblyLikeModel(model: unknown): model is AssemblyLikeModel {
  return (
    model instanceof HSCore.Model.DAssembly ||
    model instanceof HSCore.Model.DContent ||
    model instanceof HSCore.Model.DExtruding ||
    model instanceof HSCore.Model.DMolding ||
    model instanceof HSCore.Model.DSweep
  );
}

export function loadSegment3D(data: Segment3DData): Segment3D {
  return data.type === EN_GEO_ELEMENT_TYPE.EN_ARC_3D
    ? new Arc3d().load(data)
    : new Line3d().load(data);
}

export function loadSegment2D(data: Segment2DData): Segment2D {
  return data.type === EN_GEO_ELEMENT_TYPE.EN_ARC_2D
    ? new Arc2d().load(data)
    : new Line2d().load(data);
}

export function pointsToLine3ds(points: Point3D[]): Line3d[] {
  const lines: Line3d[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const startPoint = points[i];
    const endPoint = points[i + 1];
    lines.push(new Line3d(startPoint, endPoint));
  }
  return lines;
}

export function segment3dToPoints(segments: Discretizable[]): Point3D[] {
  const points: Point3D[] = [];
  segments.forEach((segment, index) => {
    const discretePoints = segment.discrete();
    if (index > 0) {
      discretePoints.shift();
    }
    points.push(...discretePoints);
  });
  return points;
}

export function tryFixMultiParentsData(model: ModelWithParents): boolean {
  const parents = Object.values(model.parents);
  
  if (parents.length === 0) {
    return false;
  }
  
  if (parents.length === 2) {
    let parentIndexToRemove = -1;
    
    if (parents[0] instanceof HSCore.Model.Layer && isAssemblyLikeModel(parents[1])) {
      parentIndexToRemove = hasValidParentChildRelation(parents[1] as HasChildren, model) ? 0 : 1;
    } else if (parents[1] instanceof HSCore.Model.Layer && isAssemblyLikeModel(parents[0])) {
      parentIndexToRemove = hasValidParentChildRelation(parents[0] as HasChildren, model) ? 1 : 0;
    }
    
    if (parentIndexToRemove !== -1) {
      const parentToRemove = parents[parentIndexToRemove] as HasChildren;
      delete model.parents[parentToRemove.id];
      delete parentToRemove.children[model.id];
      return true;
    }
  }
  
  const errorMessage = `failed to fix multiParentsData: ${model.id}`;
  const errorInfo: ErrorInfo = {
    errorStack: new Error(errorMessage),
    description: errorMessage,
    errorInfo: {
      modelId: model.id,
      function: 'tryFixMultiParentsData'
    }
  };
  
  log.error(errorMessage, 'HSCore.customizedproducts', true, errorInfo);
  return false;
}