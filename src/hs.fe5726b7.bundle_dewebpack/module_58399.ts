import { T3dOBJLoader2 } from './T3dOBJLoader2';
import {
  BoundingBox,
  Vector3,
  Mesh,
  MeshComponent,
  Node,
  AttributeIndex,
  ComponentType,
  VertexFormat,
  IndexFormat,
  Element,
  PrimitiveType
} from './core';
import { Three2T3d } from './Three2T3d';

interface LoadOptions {
  responseType?: string;
  crossOrigin?: string;
  isAsync?: boolean;
}

interface BufferData {
  vertices: number[];
  normals?: number[];
  uvs?: number[];
}

interface MeshData {
  type: string;
  meshesData?: MeshDataItem[];
}

interface MeshDataItem {
  buffers: BufferData;
  params: {
    meshName: string;
  };
}

const MAX_UINT16_INDEX = 65535;
const POSITION_COMPONENTS = 3;
const NORMAL_COMPONENTS = 3;
const UV_COMPONENTS = 2;
const FLOAT_BYTE_SIZE = 4;

export class T3dBinaryOBJLoader2 extends T3dOBJLoader2 {
  constructor() {
    super();
  }

  public load(
    url: string,
    onLoad: (node: Node) => void,
    onProgress?: (progress: unknown) => void,
    onError?: () => void,
    onAbort?: unknown,
    options?: LoadOptions
  ): void {
    const loadOptions: LoadOptions = {
      responseType: 'arraybuffer',
      crossOrigin: this.crossOrigin,
      isAsync: this.isAsync,
      ...options
    };

    const rootNode = new Node();

    try {
      HSApp.Worker.ResourceWorker.getInstance().startLoad(
        HSApp.Worker.ChannelTypeEnum.obj,
        url,
        (assetData: MeshData) => {
          this._onAssetAvailable(assetData, rootNode);
          onLoad(rootNode);
        },
        loadOptions
      );
    } catch (error) {
      onError?.();
    }
  }

  private _onAssetAvailable(assetData: MeshData, parentNode: Node): void {
    if (assetData.type === 'mesh' && assetData.meshesData) {
      for (const meshData of assetData.meshesData) {
        const meshNode = this.buildMesh(meshData);
        parentNode.addChild(meshNode);
      }
    }
  }

  public buildMesh(meshData: MeshDataItem): Node {
    const mesh = new Mesh();
    mesh.setPrimitiveType(PrimitiveType.PT_TriangleList);

    const meshPart = mesh.addPart();
    const vertexFormat = new VertexFormat();
    vertexFormat.mIsMultiStride = true;
    meshPart.setVertexFormat(vertexFormat);

    const { vertices, uvs } = meshData.buffers;
    let { normals } = meshData.buffers;

    const vertexCount = vertices.length / POSITION_COMPONENTS;
    const indexCount = vertexCount;

    // Create index buffer
    let indexBuffer: Uint16Array | Uint32Array;
    if (vertexCount > MAX_UINT16_INDEX) {
      meshPart.setIndexFormat(IndexFormat.INDEX32);
      indexBuffer = Uint32Array.from({ length: vertexCount }, (_, index) => index);
    } else {
      meshPart.setIndexFormat(IndexFormat.INDEX16);
      indexBuffer = Uint16Array.from({ length: vertexCount }, (_, index) => index);
    }

    // Compute normals if not provided
    if (!normals) {
      normals = Three2T3d.computeVertexNormals(vertices, indexBuffer);
    }

    // Calculate bounding box
    const boundingBox = new BoundingBox(
      new Vector3(Infinity, Infinity, Infinity),
      new Vector3(-Infinity, -Infinity, -Infinity)
    );
    const tempVector = new Vector3();

    for (let i = 0; i < vertexCount; i++) {
      const x = vertices[i * POSITION_COMPONENTS + 0];
      const y = vertices[i * POSITION_COMPONENTS + 1];
      const z = vertices[i * POSITION_COMPONENTS + 2];
      tempVector.set(x, y, z);
      boundingBox.mergePoint(tempVector);
    }

    // Calculate stride
    let componentsPerVertex = 0;
    componentsPerVertex += POSITION_COMPONENTS;
    if (normals) componentsPerVertex += NORMAL_COMPONENTS;
    if (uvs) componentsPerVertex += UV_COMPONENTS;

    // Build interleaved vertex buffer
    const vertexBuffer = new Float32Array(vertexCount * componentsPerVertex);
    let currentOffset = 0;

    // Positions
    vertexBuffer.set(vertices);
    vertexFormat.appendWithOffset(
      new Element(AttributeIndex.VET_POSITION, ComponentType.CT_FLOAT, POSITION_COMPONENTS),
      0
    );
    currentOffset += vertices.length;

    // Normals
    if (normals) {
      vertexBuffer.set(normals, currentOffset);
      vertexFormat.appendWithOffset(
        new Element(AttributeIndex.VET_NORMAL, ComponentType.CT_FLOAT, NORMAL_COMPONENTS),
        FLOAT_BYTE_SIZE * currentOffset
      );
      currentOffset += normals.length;
    }

    // UVs
    if (uvs) {
      vertexBuffer.set(uvs, currentOffset);
      vertexFormat.appendWithOffset(
        new Element(AttributeIndex.VET_TEXCOORD0, ComponentType.CT_FLOAT, UV_COMPONENTS),
        FLOAT_BYTE_SIZE * currentOffset
      );
    }

    // Set bounding boxes
    meshPart.setBoundingBox(boundingBox.clone());
    mesh.setBoundingBox(boundingBox.clone());

    // Set mesh data
    const internalMeshData = mesh.getMeshData();
    internalMeshData.mVertexData = new Uint8Array(vertexBuffer.buffer);
    internalMeshData.mIndexData = new Uint8Array(indexBuffer.buffer);

    meshPart.setVertexDataOffset(0);
    meshPart.setIndexDataOffset(0);
    meshPart.setIndexCount(indexCount);

    // Set mesh name and path
    const meshId = THREE.Math.generateUUID();
    mesh.setName(meshId);
    mesh.setPath(`/${meshId}`);

    // Create mesh component
    const meshComponent = new MeshComponent();
    meshComponent.setMesh(mesh);

    // Apply default materials
    for (let partIndex = 0; partIndex < mesh.getPartCount(); partIndex++) {
      const defaultMaterial = this._getDefaultFaceMaterial();
      meshComponent.setMeshPartMaterial(partIndex, defaultMaterial);
    }

    // Create and return node
    const meshNode = new Node(meshData.params.meshName);
    meshNode.addComponent(meshComponent);

    return meshNode;
  }
}

export { T3dBinaryOBJLoader2 };