import { MathAlg } from './module_55256';
import { BrepBody } from './module_81711';

interface MeshData {
  faces: number[];
  normals: number[];
  uvs: number[];
  vertices: number[];
  material?: string;
}

interface TessellationResult {
  mesh: {
    faces: number[][];
    normals: number[][];
    uvs: number[][];
    vertices: number[][];
  } | null;
}

interface BrepFace {
  tessellate(): TessellationResult;
  tag: string;
}

interface CsgObject {
  subtract(other: CsgObject, invert: boolean): CsgObject;
}

declare const GeLib: {
  CsgUtils: {
    InitCSGFromMeshData(meshData: MeshData): CsgObject;
  };
};

export function csgBoolean(
  first: BrepBody | CsgObject,
  second: BrepBody | CsgObject,
  invert: boolean = false
): CsgObject {
  let firstMesh: MeshData | undefined;
  let secondMesh: MeshData | undefined;

  if (first instanceof BrepBody) {
    first.getFaces().forEach((face: BrepFace) => {
      const { mesh } = face.tessellate();
      const material = face.tag.split(", ").length > 1 ? face.tag.split(", ")[1] : "";
      
      if (!mesh) return;

      const faces: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const vertices: number[] = [];

      mesh.faces.forEach((faceData) => faces.push(...faceData));
      mesh.normals.forEach((normalData) => normals.push(...normalData));
      mesh.uvs.forEach((uvData) => uvs.push(...uvData));
      mesh.vertices.forEach((vertexData) => vertices.push(...vertexData));

      const currentMesh: MeshData = {
        faces,
        normals,
        uvs,
        vertices
      };

      firstMesh = firstMesh ? MathAlg.MeshUtil.merge(firstMesh, currentMesh) : currentMesh;
      
      if (material) {
        firstMesh.material = material;
      }
    });
  }

  if (second instanceof BrepBody) {
    second.getFaces().forEach((face: BrepFace) => {
      const { mesh } = face.tessellate();
      const material = face.tag.split(", ").length > 1 ? face.tag.split(", ")[1] : "";
      
      if (!mesh) return;

      const faces: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const vertices: number[] = [];

      mesh.faces.forEach((faceData) => faces.push(...faceData));
      mesh.normals.forEach((normalData) => normals.push(...normalData));
      mesh.uvs.forEach((uvData) => uvs.push(...uvData));
      mesh.vertices.forEach((vertexData) => vertices.push(...vertexData));

      const currentMesh: MeshData = {
        faces,
        normals,
        uvs,
        vertices
      };

      secondMesh = secondMesh ? MathAlg.MeshUtil.merge(secondMesh, currentMesh) : currentMesh;
      
      if (material) {
        secondMesh.material = material;
      }
    });
  }

  const firstCsg = firstMesh ? GeLib.CsgUtils.InitCSGFromMeshData(firstMesh) : (first as CsgObject);
  const secondCsg = secondMesh ? GeLib.CsgUtils.InitCSGFromMeshData(secondMesh) : (second as CsgObject);

  return firstCsg.subtract(secondCsg, invert);
}

export function brepToCsg(brep: BrepBody): CsgObject {
  let meshData: MeshData | undefined;

  brep.getFaces().forEach((face: BrepFace) => {
    const { mesh } = face.tessellate();
    const material = face.tag.split(", ").length > 1 ? face.tag.split(", ")[1] : "";
    
    if (!mesh) return;

    const faces: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const vertices: number[] = [];

    mesh.faces.forEach((faceData) => faces.push(...faceData));
    mesh.normals.forEach((normalData) => normals.push(...normalData));
    mesh.uvs.forEach((uvData) => uvs.push(...uvData));
    mesh.vertices.forEach((vertexData) => vertices.push(...vertexData));

    const currentMesh: MeshData = {
      faces,
      normals,
      uvs,
      vertices
    };

    meshData = meshData ? MathAlg.MeshUtil.merge(meshData, currentMesh) : currentMesh;
    
    if (material) {
      meshData.material = material;
    }
  });

  return GeLib.CsgUtils.InitCSGFromMeshData(meshData!);
}