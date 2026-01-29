import { Logger } from './logger';

interface CoEdgeConstructorParams {
  edgeId: string;
  isRev: boolean;
  topoName: TopoName;
  curve: Curve;
}

interface TopoName {
  clone(): TopoName;
}

interface Curve {
  clone(): Curve;
}

interface CoEdgeLike {
  id: string;
  isRev: boolean;
}

export function getCoEdgeId(edge: CoEdge | CoEdgeLike | null | undefined, separator: string = "_"): string {
  if (edge instanceof CoEdge) {
    return `${edge.edgeId}${separator}${edge.isRev}`;
  }
  
  if (edge) {
    return `${edge.id}${separator}${edge.isRev}`;
  }
  
  Logger.console.log("failed to get coEdge");
  return "";
}

export class CoEdge {
  public readonly edgeId: string;
  public readonly isRev: boolean;
  public readonly topoName: TopoName;
  public readonly curve: Curve;

  constructor(params: CoEdgeConstructorParams) {
    this.edgeId = params.edgeId;
    this.isRev = params.isRev;
    this.topoName = params.topoName;
    this.curve = params.curve;
  }

  clone(): CoEdge {
    return new CoEdge({
      edgeId: this.edgeId,
      isRev: this.isRev,
      topoName: this.topoName.clone(),
      curve: this.curve.clone()
    });
  }

  get id(): string {
    return getCoEdgeId(this);
  }
}