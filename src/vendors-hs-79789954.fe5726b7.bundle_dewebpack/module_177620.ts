import Vector3 from './Vector3';
import Vertex from './Vertex';
import Polygon from './Polygon';
import BSPNode from './BSPNode';

interface MeshData {
  vertices: number[];
  normals: number[];
  uvs: number[];
  faces: number[];
  material?: any;
}

interface MeshDataCollection {
  top: MeshData[];
  bottom: MeshData[];
  sides: MeshData[][];
}

interface THREE {
  BufferGeometry: any;
  Geometry: any;
  Face3: any;
  Vector3: any;
  Vector2: any;
  Mesh: any;
  Matrix4: any;
}

interface T3D {
  MeshComponent: any;
  MeshAccessor: any;
  Vector3: any;
  AttributeIndex: {
    VET_POSITION: number;
    VET_NORMAL: number;
    VET_TEXCOORD0: number;
  };
  Node: any;
}

interface T3Dx {
  Three2T3d: {
    convertGeometryToStreamingMesh: (geometry: any) => any;
  };
}

declare const THREE: THREE;
declare const T3D: T3D;
declare const T3Dx: T3Dx;

class CSG {
  public polygons: Polygon[];
  public matrix?: any;
  public material?: any;

  constructor() {
    this.polygons = [];
  }

  static fromPolygons(polygons: Polygon[]): CSG {
    const csg = new CSG();
    csg.polygons = polygons;
    return csg;
  }

  static fromMesh(mesh: any): CSG {
    mesh.updateMatrix();
    const worldMatrix = mesh.matrixWorld.clone();
    let geometry = mesh.geometry;

    if (geometry instanceof THREE.BufferGeometry) {
      geometry = new THREE.Geometry().fromBufferGeometry(geometry);
    }

    const polygons: Polygon[] = [];
    let faceVertexUvs: any = null;

    if (geometry.faceVertexUvs && geometry.faceVertexUvs.length > 0) {
      faceVertexUvs = geometry.faceVertexUvs[0];
    }

    const hasUvs = faceVertexUvs && faceVertexUvs.length > 0;

    for (let faceIndex = 0; faceIndex < geometry.faces.length; faceIndex++) {
      const face = geometry.faces[faceIndex];
      const vertices: Vertex[] = [];

      if (face instanceof THREE.Face3) {
        const vertexIndices: number[] = [face.a, face.b, face.c];

        for (let i = 0; i < 3; i++) {
          const vertexIndex = vertexIndices[i];
          let position = geometry.vertices[vertexIndex].clone();
          position.applyMatrix4(worldMatrix);

          const normal = face.vertexNormals.length > 0 
            ? face.vertexNormals[i] 
            : face.normal;

          const uvX = hasUvs ? faceVertexUvs[faceIndex][i].x : 0;
          const uvY = hasUvs ? faceVertexUvs[faceIndex][i].y : 0;
          const uv = new THREE.Vector3(uvX, uvY, 0);

          const vertex = new Vertex(position, normal, uv);
          vertices.push(vertex);
        }

        const polygon = new Polygon(vertices);
        polygons.push(polygon);
      }
    }

    const csg = new CSG();
    csg.polygons = polygons;
    csg.matrix = worldMatrix;
    csg.material = mesh.material;
    return csg;
  }

  static toMesh(csg: CSG): any | null {
    const geometry = new THREE.Geometry();
    const material = csg.material;
    const polygons = csg.toPolygons();

    if (polygons.length < 1) {
      return null;
    }

    let vertexOffset = 0;

    polygons.map((polygon: Polygon) => {
      let vertexCount = 0;
      const uvs: any[] = [];

      polygon.vertices.map((vertex: Vertex) => {
        const position = new THREE.Vector3(vertex.pos.x, vertex.pos.y, vertex.pos.z);
        const uv = new THREE.Vector2(vertex.uv.x, vertex.uv.y);
        uvs.push(uv);
        geometry.vertices.push(position);
        vertexCount++;
      });

      for (let i = 2; i < vertexCount; i++) {
        const face = new THREE.Face3(vertexOffset, vertexOffset + i - 1, vertexOffset + i);
        const faceUvs: any[] = [];
        faceUvs.push(uvs[0]);
        faceUvs.push(uvs[i - 1]);
        faceUvs.push(uvs[i]);
        geometry.faceVertexUvs[0].push(faceUvs);
        geometry.faces.push(face);
      }

      vertexOffset += vertexCount;
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);
    const matrix = new THREE.Matrix4();
    matrix.identity();
    mesh.position.setFromMatrixPosition(matrix);
    mesh.rotation.setFromRotationMatrix(matrix);

    return mesh;
  }

  clone(): CSG {
    const cloned = new CSG();
    cloned.polygons = this.polygons.map((polygon: Polygon) => polygon.clone());
    return cloned;
  }

  toPolygons(): Polygon[] {
    return this.polygons;
  }

  union(other: CSG): CSG {
    const bspA = new BSPNode(this.clone().polygons);
    const bspB = new BSPNode(other.clone().polygons);

    bspA.clipTo(bspB);
    bspB.clipTo(bspA);
    bspB.invert();
    bspB.clipTo(bspA);
    bspB.invert();
    bspA.build(bspB.allPolygons());

    return CSG.fromPolygons(bspA.allPolygons());
  }

  subtract(other: CSG, retainFaces: boolean = false): CSG {
    const bspA = new BSPNode(this.clone().polygons);
    const bspB = new BSPNode(other.clone().polygons);

    bspA.invert();
    bspA.clipTo(bspB);

    if (retainFaces) {
      bspB.clipTo(bspA);
      bspB.invert();
      bspB.clipTo(bspA);
      bspB.invert();
      bspA.build(bspB.allPolygons());
      bspA.invert();
    }

    const result = CSG.fromPolygons(bspA.allPolygons());
    result.material = this.material;
    return result;
  }

  intersect(other: CSG): CSG {
    const bspA = new BSPNode(this.clone().polygons);
    const bspB = new BSPNode(other.clone().polygons);

    bspA.invert();
    bspB.clipTo(bspA);
    bspB.invert();
    bspA.clipTo(bspB);
    bspB.clipTo(bspA);
    bspA.build(bspB.allPolygons());
    bspA.invert();

    return CSG.fromPolygons(bspA.allPolygons());
  }

  inverse(): CSG {
    const inverted = this.clone();
    inverted.polygons.map((polygon: Polygon) => {
      polygon.flip();
    });
    return inverted;
  }

  toMeshData(): MeshDataCollection {
    const topMeshes: MeshData[] = [];
    const bottomMeshes: MeshData[] = [];
    const sideMeshes: MeshData[] = [];

    const mergeMeshData = (...meshes: MeshData[]): MeshData => {
      const merged: MeshData = {
        faces: [],
        vertices: [],
        normals: [],
        uvs: []
      };

      for (const mesh of meshes) {
        const vertexOffset = merged.vertices.length / 3;
        for (const faceIndex of mesh.faces) {
          merged.faces.push(faceIndex + vertexOffset);
        }
        merged.vertices.push(...mesh.vertices);
        merged.normals.push(...mesh.normals);
        merged.uvs.push(...mesh.uvs);
      }

      return merged;
    };

    const addVertexToMesh = (vertex: Vertex, mesh: MeshData): void => {
      mesh.vertices.push(vertex.pos.x, vertex.pos.y, vertex.pos.z);
      if (vertex.normal) {
        mesh.normals.push(vertex.normal.x, vertex.normal.y, vertex.normal.z);
      }
      if (vertex.uv) {
        mesh.uvs.push(vertex.uv.x, vertex.uv.y);
      }
    };

    const upNormal = new Vector3(0, 0, 1);
    const downNormal = new Vector3(0, 0, -1);
    const normalDotThreshold = 0.095;

    for (const polygon of this.polygons) {
      const isTopFace = upNormal.dot(polygon.plane.normal) >= normalDotThreshold;
      const isBottomFace = downNormal.dot(polygon.plane.normal) >= normalDotThreshold;

      let targetArray: MeshData[];
      if (isTopFace) {
        targetArray = topMeshes;
      } else if (isBottomFace) {
        targetArray = bottomMeshes;
      } else {
        targetArray = sideMeshes;
      }

      const meshData: MeshData = {
        vertices: [],
        normals: [],
        uvs: [],
        faces: [],
        material: polygon.material
      };

      const baseVertexIndex = meshData.vertices.length / 3;

      polygon.vertices.forEach((vertex: Vertex) => {
        addVertexToMesh(vertex, meshData);
      });

      for (let i = 0; i <= polygon.vertices.length - 3; i++) {
        meshData.faces.push(baseVertexIndex, baseVertexIndex + i + 1, baseVertexIndex + i + 2);
      }

      const existingMesh = targetArray.find((mesh: MeshData) => mesh.material === polygon.material);

      if (existingMesh) {
        const existingIndex = targetArray.indexOf(existingMesh);
        targetArray[existingIndex] = mergeMeshData(existingMesh, meshData);
        targetArray[existingIndex].material = polygon.material;
      } else {
        targetArray.push(meshData);
      }
    }

    return {
      top: topMeshes,
      bottom: bottomMeshes,
      sides: [sideMeshes]
    };
  }

  static fromGeometry(geometry: any): CSG {
    if (geometry instanceof THREE.BufferGeometry) {
      geometry = new THREE.Geometry().fromBufferGeometry(geometry);
    }

    const polygons: Polygon[] = [];
    let faceVertexUvs: any = null;

    if (geometry.faceVertexUvs && geometry.faceVertexUvs.length > 0) {
      faceVertexUvs = geometry.faceVertexUvs[0];
    }

    const hasUvs = faceVertexUvs && faceVertexUvs.length > 0;

    for (let faceIndex = 0; faceIndex < geometry.faces.length; faceIndex++) {
      const face = geometry.faces[faceIndex];
      const vertices: Vertex[] = [];

      if (face instanceof THREE.Face3) {
        const vertexIndices: number[] = [face.a, face.b, face.c];

        for (let i = 0; i < 3; i++) {
          const vertexIndex = vertexIndices[i];
          const position = geometry.vertices[vertexIndex].clone();
          const normal = face.vertexNormals.length > 0 
            ? face.vertexNormals[i] 
            : face.normal;

          const uvX = hasUvs ? faceVertexUvs[faceIndex][i].x : 0;
          const uvY = hasUvs ? faceVertexUvs[faceIndex][i].y : 0;
          const uv = new THREE.Vector3(uvX, uvY, 0);

          const vertex = new Vertex(position, normal, uv);
          vertices.push(vertex);
        }

        const polygon = new Polygon(vertices);
        polygons.push(polygon);
      }
    }

    const csg = new CSG();
    csg.polygons = polygons;
    return csg;
  }

  static toGeometry(csg: CSG): any | null {
    const geometry = new THREE.Geometry();
    const polygons = csg.toPolygons();

    if (polygons.length < 1) {
      return null;
    }

    let vertexOffset = 0;

    polygons.map((polygon: Polygon) => {
      let vertexCount = 0;
      const uvs: any[] = [];

      polygon.vertices.map((vertex: Vertex) => {
        const position = new THREE.Vector3(vertex.pos.x, vertex.pos.y, vertex.pos.z);
        const uv = new THREE.Vector2(vertex.uv.x, vertex.uv.y);
        uvs.push(uv);
        geometry.vertices.push(position);
        vertexCount++;
      });

      for (let i = 2; i < vertexCount; i++) {
        const face = new THREE.Face3(vertexOffset, vertexOffset + i - 1, vertexOffset + i);
        const faceUvs: any[] = [];
        faceUvs.push(uvs[0]);
        faceUvs.push(uvs[i - 1]);
        faceUvs.push(uvs[i]);
        geometry.faceVertexUvs[0].push(faceUvs);
        geometry.faces.push(face);
      }

      vertexOffset += vertexCount;
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
  }

  static fromT3DMeshNode(node: any): CSG {
    const worldMatrix = node.getWorldTransform().getMatrix();
    const meshComponent = node.getComponent(T3D.MeshComponent);
    const mesh = meshComponent.getMesh();
    const csg = CSG.fromT3DMesh(mesh, worldMatrix);
    csg.matrix = worldMatrix;
    csg.material = meshComponent.getMaterial();
    return csg;
  }

  static fromT3DMesh(mesh: any, transform?: any): CSG {
    const polygons: Polygon[] = [];
    const accessor = new T3D.MeshAccessor(mesh);
    const vertexIndices: number[] = [];
    const position: number[] = [0, 0, 0];
    const normal: number[] = [0, 0, 0];
    const uv: number[] = [0, 0, 0];
    const vector = new T3D.Vector3();

    accessor.traverseFaces((primitiveIndex: number, v0: number, v1: number, v2: number) => {
      const vertices: Vertex[] = [];
      vertexIndices[0] = v0;
      vertexIndices[1] = v1;
      vertexIndices[2] = v2;

      vertexIndices.forEach((vertexIndex: number) => {
        accessor.getVertex(T3D.AttributeIndex.VET_POSITION, primitiveIndex, vertexIndex, position);
        vector.set(position[0], position[1], position[2]);

        if (transform) {
          transform.transformVectorToRef(vector);
        }

        accessor.getVertex(T3D.AttributeIndex.VET_NORMAL, primitiveIndex, vertexIndex, normal);
        uv[0] = 0;
        uv[1] = 0;
        accessor.getVertex(T3D.AttributeIndex.VET_TEXCOORD0, primitiveIndex, vertexIndex, uv);

        const vertex = new Vertex(vector, normal, uv);
        vertices.push(vertex);
      });

      const polygon = new Polygon(vertices);
      polygons.push(polygon);
    });

    const csg = new CSG();
    csg.polygons = polygons;
    return csg;
  }

  static toT3DMeshNode(csg: CSG): any | null {
    const mesh = CSG.toT3DMesh(csg);
    if (!mesh) {
      return null;
    }

    const material = csg.material;
    const node = new T3D.Node();
    const meshComponent = new T3D.MeshComponent();
    meshComponent.setMesh(mesh);
    meshComponent.setMaterial(material);
    node.addComponent(meshComponent);
    return node;
  }

  static toT3DMesh(csg: CSG): any | null {
    const geometry = CSG.toGeometry(csg);
    return geometry ? T3Dx.Three2T3d.convertGeometryToStreamingMesh(geometry) : null;
  }

  static fromPolygonPoints(polygonPoints: Array<Array<{ x: number; y: number; z: number }>>): CSG {
    const polygons: Polygon[] = [];

    polygonPoints.forEach((points: Array<{ x: number; y: number; z: number }>) => {
      const vertices: Vertex[] = [];

      points.forEach((point: { x: number; y: number; z: number }) => {
        const position = new Vector3(point.x, point.y, point.z);
        const normal = new Vector3(0, 0, 0);
        const uv = new Vector3(0, 0, 1);
        const vertex = new Vertex(position, uv, normal);
        vertices.push(vertex);
      });

      const polygon = new Polygon(vertices, true);
      polygons.push(polygon);
    });

    return CSG.fromPolygons(polygons);
  }

  static setFromMeshData(meshData: MeshData | null): CSG {
    const csg = new CSG();

    if (!meshData) {
      return csg;
    }

    const vertices = meshData.vertices;
    const normals = meshData.normals;
    const uvs = meshData.uvs;
    const faces = meshData.faces;
    const material = meshData.material;

    function createVertex(index: number): Vertex {
      const position = new Vector3(
        vertices[3 * index],
        vertices[3 * index + 1],
        vertices[3 * index + 2]
      );
      const normal = new Vector3(
        normals[3 * index],
        normals[3 * index + 1],
        normals[3 * index + 2]
      );
      const uv = uvs 
        ? new Vector3(uvs[2 * index], uvs[2 * index + 1], 0) 
        : undefined;
      return new Vertex(position, normal, uv);
    }

    for (let i = 0; i < faces.length; i += 3) {
      const v0 = createVertex(faces[i]);
      const v1 = createVertex(faces[i + 1]);
      const v2 = createVertex(faces[i + 2]);
      csg.polygons.push(new Polygon([v0, v1, v2], undefined, material));
    }

    return csg;
  }
}

export default CSG;