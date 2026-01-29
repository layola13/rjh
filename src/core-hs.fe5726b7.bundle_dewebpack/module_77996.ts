import { Vector3, Quaternion, Matrix4, Euler, Math as ThreeMath } from 'three';

interface Position {
  position: number[];
  index: number[];
  uv: number[];
  material?: MaterialInfo;
}

interface MaterialInfo {
  id: string;
  groupId?: string;
  uvAsImage?: boolean;
}

interface MeshData {
  faces: Uint32Array;
  vertices: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  material?: MaterialInfo;
}

interface NodeData {
  type: number;
  children?: NodeData[];
  coordMatrix?: number[];
  angleOrg?: number[];
  modelId?: string;
  pos?: number[];
  angle?: number[];
}

interface ContentData {
  jid: string;
  matrix: Float32Array;
  originMeta: MetaInfo;
}

interface ProcessedData {
  meshes: MeshData[];
  contents?: ContentData[];
}

interface ModelMetaInfo {
  get(id: string): MetaInfo | undefined;
}

interface MetaInfo {
  YLength: number;
  ZLength: number;
  [key: string]: unknown;
}

interface OriginData {
  unit?: string;
  modelNodes: NodeData[];
}

interface InputData {
  modelMetaInfo: ModelMetaInfo;
  originData: OriginData;
  materialInfo: unknown;
}

interface OutputData {
  mesh?: MeshData[];
  metaInfo?: ContentData[];
  materialInfo?: unknown;
}

enum NodeType {
  BaseNode = 0,
  FlatMesh = 1,
  PresetModel = 2
}

enum Unit {
  mm = 'mm'
}

const DEFAULT_MATERIAL_KEY = 'default';
const METERS_TO_MILLIMETERS = 1000;
const POSITION_SCALE = 0.001;

const tempVector = new Vector3();
const tempQuaternion = new Quaternion();
const tempScale = new Vector3();
const tempEuler = new Euler();

function convertPositionToMesh(posData: Position, scale: number = POSITION_SCALE): MeshData {
  const result: Partial<MeshData> = {};
  const transformedPositions: number[] = [];

  for (let i = 0; i < posData.position.length; i += 3) {
    transformedPositions.push(
      posData.position[i] * scale,
      posData.position[i + 2] * scale,
      posData.position[i + 1] * scale
    );
  }

  result.faces = Uint32Array.from(posData.index.reverse());
  result.vertices = Float32Array.from(transformedPositions);
  result.uvs = generateUVs(posData, transformedPositions);

  const vertices: Vector3[] = [];
  for (let i = 0; i < transformedPositions.length; i += 3) {
    vertices.push(new Vector3(
      transformedPositions[i],
      transformedPositions[i + 1],
      transformedPositions[i + 2]
    ));
  }

  result.normals = calculateNormals(vertices, result.faces);
  result.material = posData.material;

  return result as MeshData;
}

function generateUVs(posData: Position, positions: number[]): Float32Array {
  if (posData.uv.some(value => value !== 0)) {
    return Float32Array.from(posData.uv);
  }

  const constantAxis = findConstantAxis(positions);
  const filteredPositions = positions.filter((_, index) => index % 3 !== constantAxis);
  return Float32Array.from(filteredPositions);
}

function findConstantAxis(positions: number[]): number {
  for (let axis = 0; axis < 3; axis++) {
    const axisValues = positions.filter((_, index) => index % 3 === axis);
    if (axisValues.every(value => isNearlyEqual(value, axisValues[0]))) {
      return axis;
    }
  }
  return 0;
}

function isNearlyEqual(a: number, b: number, epsilon: number = 0.0001): boolean {
  return Math.abs(a - b) < epsilon;
}

function calculateNormals(vertices: Vector3[], faces: Uint32Array): Float32Array {
  if (faces.length !== vertices.length) {
    return new Float32Array();
  }

  const normals: number[] = [];
  for (let i = 0; i < faces.length; i += 3) {
    const v1 = vertices[faces[i]];
    const v2 = vertices[faces[i + 1]];
    const v3 = vertices[faces[i + 2]];

    const normal = v1.clone()
      .sub(v2)
      .cross(v3.clone().sub(v2))
      .normalize()
      .negate()
      .toArray();

    normals.push(...normal, ...normal, ...normal);
  }

  return Float32Array.from(normals);
}

function computeTransformMatrix(node: NodeData): Matrix4 | undefined {
  let matrix: Matrix4 | undefined;

  if (node.coordMatrix?.length) {
    const matrixArray = Array.from(node.coordMatrix);
    matrix = new Matrix4().fromArray(matrixArray);
  }

  if (matrix && node.angleOrg?.length && node.angleOrg.some(angle => angle !== 0)) {
    matrix.decompose(tempVector, tempQuaternion, tempScale);
    tempEuler.setFromQuaternion(tempQuaternion);

    const adjustedEuler = new Euler();
    adjustedEuler.x = tempEuler.x + node.angleOrg[0] * ThreeMath.DEG2RAD;
    adjustedEuler.y = tempEuler.y + node.angleOrg[1] * ThreeMath.DEG2RAD;
    adjustedEuler.z = tempEuler.z + node.angleOrg[2] * ThreeMath.DEG2RAD;

    tempQuaternion.setFromEuler(adjustedEuler);
    matrix.compose(tempVector, tempQuaternion, tempScale);
  }

  return matrix;
}

function processNodeHierarchy(
  nodes: NodeData[],
  output: ProcessedData,
  metaInfo: ModelMetaInfo,
  parentMatrix?: Matrix4,
  scale: number = POSITION_SCALE
): void {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.type === NodeType.BaseNode) {
      const nodeMatrix = computeTransformMatrix(node);
      let combinedMatrix: Matrix4 | undefined;

      if (nodeMatrix && parentMatrix) {
        combinedMatrix = nodeMatrix.premultiply(parentMatrix);
      }

      processNodeHierarchy(node.children ?? [], output, metaInfo, combinedMatrix, scale);

    } else if (node.type === NodeType.FlatMesh) {
      let endIndex = i;
      for (let j = i; j < nodes.length; j++) {
        if (nodes[j].type !== NodeType.FlatMesh) {
          endIndex = j;
          break;
        }
      }

      if (endIndex === nodes.length) {
        endIndex = nodes.length;
      }

      const flatMeshNodes = nodes.slice(i, endIndex);
      if (flatMeshNodes.length < 6) return;

      const meshes = convertFlatMeshes(flatMeshNodes, scale);
      if (meshes) {
        applyMatrixToMeshes(meshes, parentMatrix);
        output.meshes.push(...meshes);
      }

      i += endIndex - i - 1;

    } else if (node.type === NodeType.PresetModel) {
      const meta = metaInfo.get(node.modelId!);
      if (meta) {
        const originMeta = meta;
        swapYZLength(originMeta);

        let transformMatrix = new Matrix4();

        if (parentMatrix) {
          const scaledMatrix = new Matrix4().fromArray(parentMatrix.toArray());
          scaledMatrix.elements[12] *= scale;
          scaledMatrix.elements[13] *= scale;
          scaledMatrix.elements[14] *= scale;

          scaledMatrix.decompose(tempVector, tempQuaternion, tempScale);
          tempEuler.setFromQuaternion(tempQuaternion);

          const swappedEuler = new Euler(tempEuler.x, tempEuler.z, tempEuler.y);
          const swappedQuaternion = new Quaternion().setFromEuler(swappedEuler);
          const swappedPosition = new Vector3(tempVector.x, tempVector.z, tempVector.y);
          const swappedScale = new Vector3(tempScale.x, tempScale.z, tempScale.y);

          transformMatrix = new Matrix4().compose(swappedPosition, swappedQuaternion, swappedScale);
        }

        output.contents?.push({
          jid: node.modelId!,
          matrix: Float32Array.from(transformMatrix.toArray()),
          originMeta
        });
      }
    }
  }
}

function convertFlatMeshes(nodes: NodeData[], scale: number = POSITION_SCALE): MeshData[] | undefined {
  if (nodes.length < 6) {
    return undefined;
  }

  const meshes: MeshData[] = [];
  for (const node of nodes) {
    meshes.push(convertPositionToMesh(node as unknown as Position, scale));
  }

  return meshes;
}

function applyMatrixToMeshes(meshes: MeshData[], matrix?: Matrix4): void {
  if (!matrix) return;

  const vertex = new Vector3();

  meshes.forEach(mesh => {
    for (let i = 0; i < mesh.vertices.length; i += 3) {
      vertex.set(mesh.vertices[i], mesh.vertices[i + 2], mesh.vertices[i + 1]);

      const transformMatrix = matrix.clone();
      transformMatrix.elements[12] /= METERS_TO_MILLIMETERS;
      transformMatrix.elements[13] /= METERS_TO_MILLIMETERS;
      transformMatrix.elements[14] /= METERS_TO_MILLIMETERS;

      vertex.applyMatrix4(transformMatrix);
      mesh.vertices[i] = vertex.x;
      mesh.vertices[i + 2] = vertex.y;
      mesh.vertices[i + 1] = vertex.z;

      vertex.set(mesh.normals[i], mesh.normals[i + 2], mesh.normals[i + 1]);
      const rotationMatrix = new Matrix4().extractRotation(matrix);
      vertex.applyMatrix4(rotationMatrix);

      mesh.normals[i] = vertex.x;
      mesh.normals[i + 2] = vertex.y;
      mesh.normals[i + 1] = vertex.z;
    }
  });
}

function createMatrixFromPosAndAngle(node: NodeData): Matrix4 {
  if (node.pos && node.angle) {
    const radX = node.angle[0] * Math.PI / 180;
    const radY = node.angle[1] * Math.PI / 180;
    const radZ = node.angle[2] * Math.PI / 180;

    const euler = new Euler().set(radX, radY, radZ);
    const rotationMatrix = new Matrix4().makeRotationFromEuler(euler);

    rotationMatrix.elements[12] = node.pos[0];
    rotationMatrix.elements[13] = node.pos[1];
    rotationMatrix.elements[14] = node.pos[2];

    return rotationMatrix;
  }

  return new Matrix4();
}

function swapYZLength(meta: MetaInfo): void {
  const temp = meta.YLength;
  meta.YLength = meta.ZLength;
  meta.ZLength = temp;
}

function combineMeshesByMaterial(meshes: MeshData[]): MeshData[] {
  const mergeMeshes = (meshList: MeshData[]): MeshData => {
    const combined = {
      faces: [] as number[],
      vertices: [] as number[],
      normals: [] as number[],
      uvs: [] as number[]
    };

    for (const mesh of meshList) {
      const vertexOffset = combined.vertices.length / 3;
      for (const face of mesh.faces) {
        combined.faces.push(face + vertexOffset);
      }
      combined.vertices.push(...mesh.vertices);
      combined.normals.push(...mesh.normals);
      combined.uvs.push(...mesh.uvs);
    }

    return {
      faces: new Uint32Array(combined.faces),
      vertices: new Float32Array(combined.vertices),
      normals: new Float32Array(combined.normals),
      uvs: new Float32Array(combined.uvs),
      material: meshList[0].material
    };
  };

  const getMaterialKey = (material?: MaterialInfo): string => {
    if (material) {
      return `${material.id}/${material.groupId}/${material.uvAsImage ? 1 : 0}`;
    }
    return '';
  };

  const materialGroups = new Map<string, MeshData[]>();

  for (const mesh of meshes) {
    const key = getMaterialKey(mesh.material);

    if (key) {
      if (!materialGroups.has(key)) {
        materialGroups.set(key, []);
      }
      materialGroups.get(key)!.push(mesh);
    } else {
      mesh.material = { id: DEFAULT_MATERIAL_KEY };
      if (!materialGroups.has(DEFAULT_MATERIAL_KEY)) {
        materialGroups.set(DEFAULT_MATERIAL_KEY, []);
      }
      materialGroups.get(DEFAULT_MATERIAL_KEY)!.push(mesh);
    }
  }

  const result: MeshData[] = [];
  for (const [, meshGroup] of materialGroups.entries()) {
    if (meshGroup) {
      result.push(mergeMeshes(meshGroup));
    }
  }

  return result;
}

function centerMeshes(meshes: MeshData[]): void {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  meshes.forEach(mesh => {
    for (let i = 0; i < mesh.vertices.length; i += 3) {
      const x = mesh.vertices[i];
      const y = mesh.vertices[i + 1];
      const z = mesh.vertices[i + 2];

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
  });

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  meshes.forEach(mesh => {
    for (let i = 0; i < mesh.vertices.length; i += 3) {
      mesh.vertices[i] -= centerX;
      mesh.vertices[i + 1] -= centerY;
      if (minZ < 0) {
        mesh.vertices[i + 2] -= minZ;
      }
    }
  });
}

function mergeProcessedData(dataList: ProcessedData[]): ProcessedData {
  const merged: ProcessedData = {
    meshes: [],
    contents: []
  };

  dataList.forEach(data => {
    if (data.contents?.length) {
      merged.contents?.push(...data.contents);
    }
    if (data.meshes) {
      merged.meshes.push(...data.meshes);
    }
  });

  return merged;
}

export function resolveZoweeOriginData(output: OutputData, input: InputData): ProcessedData[] {
  const processedDataList: ProcessedData[] = [];
  const { modelMetaInfo, originData, materialInfo } = input;

  console.log('materialInfo', materialInfo);

  if (!originData) {
    return processedDataList;
  }

  const scale = POSITION_SCALE;
  const rootNode = originData.modelNodes[0];

  let rootMatrix: Matrix4;
  if (rootNode.type === NodeType.BaseNode && rootNode.pos && rootNode.angle) {
    rootMatrix = createMatrixFromPosAndAngle(rootNode);
  } else {
    rootMatrix = new Matrix4();
  }

  for (let i = 0; i < originData.modelNodes.length; i++) {
    const modelNode = originData.modelNodes[i];

    if (modelNode.type === NodeType.BaseNode) {
      let nodeMatrix: Matrix4;

      const yOffset = modelNode.coordMatrix?.[13] ?? 0;
      const translationMatrix = new Matrix4().makeTranslation(0, yOffset, 0);

      if (i !== 0) {
        nodeMatrix = createMatrixFromPosAndAngle(modelNode);
        nodeMatrix = nodeMatrix.multiply(new Matrix4().getInverse(rootMatrix));
        nodeMatrix.multiply(translationMatrix);
      } else {
        nodeMatrix = translationMatrix;
      }

      const processedData: ProcessedData = {
        meshes: [],
        contents: []
      };

      processNodeHierarchy(modelNode.children ?? [], processedData, modelMetaInfo, nodeMatrix, scale);
      processedDataList.push(processedData);
    }
  }

  const merged = mergeProcessedData(processedDataList);
  const combined = combineMeshesByMaterial(merged.meshes);

  if (originData.modelNodes.length > 1) {
    centerMeshes(combined);
  }

  merged.meshes = combined;
  console.log('combinedMesh', merged);

  output.mesh = merged.meshes;
  if (merged.contents?.length) {
    output.metaInfo = merged.contents;
  }
  output.materialInfo = materialInfo;

  return processedDataList;
}