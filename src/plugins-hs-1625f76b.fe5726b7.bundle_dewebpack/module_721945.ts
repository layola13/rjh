import { HSCore } from './HSCore';

interface Face {
  tag: number;
}

interface Brep {
  getFaces(): Face[];
}

interface SketchChild {
  tag: number;
}

interface Sketch {
  children: Record<number, SketchChild>;
  removeChild(child: SketchChild): void;
  dirtyGeometry(): void;
}

interface Content {
  breps: Brep[];
  sketch: Sketch;
  getFaceTagByMeshKey(meshName: string): number;
}

export default class MeshRemovalTransaction extends HSCore.Transaction.Common.StateRequest {
  private _content: Content;
  private _meshName?: string;

  constructor(content: Content, meshName?: string) {
    super();
    this._content = content;
    this._meshName = meshName;
  }

  onCommit(): void {
    if (!this._meshName) {
      super.onCommit([]);
      return;
    }

    const faceTag = this._content.getFaceTagByMeshKey(this._meshName);
    const facesToRemove: Face[] = [];

    for (const brep of this._content.breps) {
      const faces = brep.getFaces();
      const hasMatchingTag = faces.some((face) => face.tag === faceTag);
      
      if (hasMatchingTag) {
        facesToRemove.push(...faces);
      }
    }

    for (const face of facesToRemove) {
      const sketchChild = this._content.sketch.children[face.tag];
      
      if (sketchChild) {
        this._content.sketch.removeChild(sketchChild);
      }
    }

    this._content.sketch.dirtyGeometry();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}