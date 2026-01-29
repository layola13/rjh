import { Box2, Plane } from './55256';
import { TgWallUtil } from './85492';

interface CoEdgePath {
  outer: CoEdge[];
  holes: CoEdge[][];
}

interface Path {
  outer: Curve[];
  holes: Curve[][];
}

interface CoEdge {
  id: string;
  curve: Curve;
  topoName: {
    id: string;
  };
}

interface Curve {
  getBoundingBox(): Box2;
}

interface TopoFace {
  brepFace: unknown;
}

interface ShellWrapper {
  // Define based on actual structure
}

interface DocumentManager {
  activeDocument: unknown;
}

interface HSCoreDoc {
  getDocManager(): DocumentManager;
}

declare global {
  const HSCore: {
    Doc: HSCoreDoc;
  };
}

export class Region {
  readonly id: string;
  linkWallIds: string[];
  coEdgePath: CoEdgePath;
  topoFaces: TopoFace[];
  shellWrapper?: ShellWrapper;

  constructor(id: string) {
    this.linkWallIds = [];
    this.coEdgePath = {
      outer: [],
      holes: []
    };
    this.topoFaces = [];
    this.id = id;
  }

  get _fp(): unknown {
    return HSCore.Doc.getDocManager().activeDocument;
  }

  get path(): Path {
    return {
      outer: this.coEdgePath.outer.map(coEdge => coEdge.curve),
      holes: this.coEdgePath.holes.map(hole => hole.map(coEdge => coEdge.curve))
    };
  }

  get min(): { x: number; y: number } {
    const box = new Box2();
    this.path.outer.forEach(curve => box.union(curve.getBoundingBox()));
    return box.min;
  }

  extrudeBody(height: number, thickness: number, offset: number): void {
    this.shellWrapper = TgWallUtil.getShellWrapper(
      Plane.XOY(),
      this.path,
      height,
      thickness,
      offset
    );
  }

  getTopoFaceByBrepFace(brepFace: unknown): TopoFace | undefined {
    return this.topoFaces.find(topoFace => topoFace.brepFace === brepFace);
  }

  get allCoEdgeIds(): string[] {
    const ids: string[] = [];
    this.coEdgePath.outer.forEach(coEdge => ids.push(coEdge.id));
    this.coEdgePath.holes.forEach(hole => 
      hole.forEach(coEdge => ids.push(coEdge.id))
    );
    return ids;
  }

  get allCoEdgeTopoNameIds(): string[] {
    const ids: string[] = [];
    this.coEdgePath.outer.forEach(coEdge => ids.push(coEdge.topoName.id));
    this.coEdgePath.holes.forEach(hole =>
      hole.forEach(coEdge => ids.push(coEdge.topoName.id))
    );
    return ids;
  }

  _getCoEdge(id: string): CoEdge | undefined {
    for (let i = 0; i < this.coEdgePath.outer.length; i++) {
      if (this.coEdgePath.outer[i].id === id) {
        return this.coEdgePath.outer[i];
      }
    }

    for (let i = 0; i < this.coEdgePath.holes.length; i++) {
      for (let j = 0; j < this.coEdgePath.holes[i].length; j++) {
        if (this.coEdgePath.holes[i][j].id === id) {
          return this.coEdgePath.holes[i][j];
        }
      }
    }

    return undefined;
  }
}