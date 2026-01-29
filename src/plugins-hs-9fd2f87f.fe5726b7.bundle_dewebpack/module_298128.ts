import { Node, LineMeshMaterial } from './367441';

interface Context {
  application: Application;
  needsRendering: boolean;
}

interface Application {
  // Define application properties as needed
}

interface Vector3 {
  fromArray(array: number[]): Vector3;
  x: number;
  y: number;
  z: number;
}

interface Geometry {
  vertices: Vector3[];
}

interface Line2Mesh {
  setFromPositions(positions: number[], uvs: number[], name: string): unknown;
}

interface Three2T3d {
  createMeshNode(mesh: unknown, material: LineMeshMaterial): Node;
}

declare global {
  namespace T3Dx {
    const Line2Mesh: Line2Mesh;
    const Three2T3d: Three2T3d;
  }
  namespace HSApp.View.Base {
    class Gizmo {
      layer?: Layer;
      constructor(context: Context, application: Application, ...args: unknown[]);
    }
  }
}

interface Layer {
  addChild(child: ExposedCornerGizmo): void;
  removeChild(child: ExposedCornerGizmo): void;
}

class Vector3Impl implements Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  fromArray(array: number[]): Vector3 {
    this.x = array[0] ?? 0;
    this.y = array[1] ?? 0;
    this.z = array[2] ?? 0;
    return this;
  }
}

class GeometryImpl implements Geometry {
  vertices: Vector3[] = [];
}

export default class ExposedCornerGizmo extends HSApp.View.Base.Gizmo {
  private context: Context;
  private line: number[][];
  private app: Application;
  private color: string | number;
  private lineWidth: number;
  private elements: Node[];
  private node?: Node;
  private layer?: Layer;

  constructor(
    context: Context,
    application: Application,
    line: number[][],
    color: string | number,
    lineWidth: number
  ) {
    super(context, application, undefined);
    
    this.context = context;
    this.line = line;
    this.app = context.application;
    this.color = color;
    this.lineWidth = lineWidth;
    this.elements = [];
    this.node = undefined;
  }

  show = (): void => {
    if (!this.node) {
      this._createNode();
    }
    this.node?.setEnable(true);
    this.context.needsRendering = true;
  };

  hide = (): void => {
    if (this.node) {
      this.node.setEnable(false);
      this.context.needsRendering = true;
    }
  };

  deactivate(): void {
    this._clearNode();
  }

  onCleanup(): void {
    this._clearNode();
  }

  draw(): void {
    if (!this.node) {
      this._createNode();
      this.node?.setEnable(true);
      this.context.needsRendering = true;
    }
  }

  private _clearNode(): void {
    if (this.layer && this.elements.length > 0) {
      this.layer.removeChild(this);
      this.elements.forEach((element) => {
        this.node?.removeChild(element);
      });
      this.elements = [];
      this.context.needsRendering = true;
    }
  }

  private _createNode(): void {
    this.node = new Node("exposedCornerGizmo");
    
    const material = new LineMeshMaterial({
      color: this.color,
      lineWidth: this.lineWidth,
      opacity: 1,
      transparent: true
    });
    
    const lineMesh = this._createLineMesh(this.line, "sunDir", material);
    this.elements.push(lineMesh);
    this.node.addChild(lineMesh);
    this.layer?.addChild(this);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _createLineMesh(
    line: number[][],
    name: string,
    material: LineMeshMaterial
  ): Node {
    const geometry: Geometry = new GeometryImpl();
    
    line.forEach((point) => {
      geometry.vertices.push(new Vector3Impl().fromArray(point));
    });
    
    const lineSegments = this._convertPositionsToLineSegments(geometry.vertices);
    const mesh = T3Dx.Line2Mesh.setFromPositions(lineSegments, [], name);
    
    return T3Dx.Three2T3d.createMeshNode(mesh, material);
  }

  private _convertPositionsToLineSegments(vertices: Vector3[]): number[] {
    const segments: number[] = [];
    
    if (vertices.length > 0) {
      segments.push(vertices[0].x, vertices[0].y, vertices[0].z);
      
      for (let i = 1; i < vertices.length - 1; i++) {
        segments.push(vertices[i].x, vertices[i].y, vertices[i].z);
        segments.push(vertices[i].x, vertices[i].y, vertices[i].z);
      }
      
      const lastVertex = vertices[vertices.length - 1];
      segments.push(lastVertex.x, lastVertex.y, lastVertex.z);
    }
    
    return segments;
  }
}