import { BoundingBox, Vector3, Mesh, MeshComponent, Node, AttributeIndex, ComponentType, VertexFormat, IndexFormat, Element, PrimitiveType, RasterizerCullMode, MeshBasicMaterial } from './path/to/d3d-module';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface BufferData {
  indexs: number[];
  vertices: number[];
  normals: number[];
  uvs: number[];
}

interface MaterialData {
  diffuse: {
    image: HTMLImageElement | null;
  };
  color: number;
  transparent: boolean;
  opacity: number;
}

interface MeshParams {
  meshName: string;
}

interface MeshBuildData {
  buffers: BufferData;
  material: MaterialData;
  params: MeshParams;
}

type LoadCallback = (node: Node) => void;

/**
 * Custom GLTF loader that converts THREE.js GLTF models to T3D engine format
 */
class T3dGLTFLoader extends GLTFLoader {
  constructor() {
    super();
  }

  /**
   * Load a GLTF model and convert it to T3D format
   */
  public load(
    url: string,
    onLoad: LoadCallback,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (error: ErrorEvent) => void,
    _unused1?: unknown,
    _unused2?: unknown
  ): void {
    super.load(url, (gltfData: any) => {
      const rootNode = new Node();
      
      gltfData.scene.traverse((object: any) => {
        if (object.isMesh) {
          const geometry = object.geometry;
          const indexAttribute = geometry.getIndex();
          const positionAttribute = geometry.getAttribute('position');
          const normalAttribute = geometry.getAttribute('normal');
          const uvAttribute = geometry.getAttribute('uv');

          const meshData: MeshBuildData = {
            buffers: {
              indexs: Array.from(indexAttribute.array),
              vertices: Array.from(positionAttribute.array),
              normals: Array.from(normalAttribute.array),
              uvs: Array.from(uvAttribute.array)
            },
            material: {
              diffuse: {
                image: object.material.map?.image ?? null
              },
              color: object.material.color.getHex(),
              transparent: object.material.transparent,
              opacity: object.material.opacity
            },
            params: {
              meshName: object.name
            }
          };

          const childNode = this.buildNode(meshData);
          rootNode.addChild(childNode);
        }
      });

      onLoad(rootNode);
    }, onProgress, onError);
  }

  /**
   * Build a T3D Node from mesh data
   */
  private buildNode(data: MeshBuildData): Node {
    const mesh = new Mesh();
    mesh.setPrimitiveType(PrimitiveType.PT_TriangleList);

    const meshPart = mesh.addPart();
    const vertexFormat = new VertexFormat();
    vertexFormat.mIsMultiStride = true;
    meshPart.setVertexFormat(vertexFormat);

    const indexBuffer = data.buffers.indexs;
    const vertexBuffer = data.buffers.vertices;
    const normalBuffer = data.buffers.normals;
    const uvBuffer = data.buffers.uvs;

    const vertexCount = vertexBuffer.length / 3;
    const indexCount = indexBuffer.length;

    // Choose index format based on vertex count
    let indexData: Uint16Array | Uint32Array;
    if (vertexCount > 65535) {
      meshPart.setIndexFormat(IndexFormat.INDEX32);
      indexData = Uint32Array.from(indexBuffer);
    } else {
      meshPart.setIndexFormat(IndexFormat.INDEX16);
      indexData = Uint16Array.from(indexBuffer);
    }

    // Calculate bounding box
    const boundingBox = new BoundingBox(
      new Vector3(Infinity, Infinity, Infinity),
      new Vector3(-Infinity, -Infinity, -Infinity)
    );
    const tempVector = new Vector3();

    for (let i = 0; i < vertexCount; i++) {
      const x = vertexBuffer[3 * i + 0];
      const y = vertexBuffer[3 * i + 1];
      const z = vertexBuffer[3 * i + 2];
      tempVector.set(x, y, z);
      boundingBox.mergePoint(tempVector);
    }

    // Calculate interleaved vertex data stride
    let stride = 0;
    if (vertexBuffer) stride += 3;
    if (normalBuffer) stride += 3;
    if (uvBuffer) stride += 2;

    const interleavedData = new Float32Array(vertexCount * stride);
    let offset = 0;

    // Position data
    interleavedData.set(vertexBuffer);
    vertexFormat.appendWithOffset(
      new Element(AttributeIndex.VET_POSITION, ComponentType.CT_FLOAT, 3),
      0
    );
    offset += vertexBuffer.length;

    // Normal data
    if (normalBuffer) {
      interleavedData.set(normalBuffer, offset);
      vertexFormat.appendWithOffset(
        new Element(AttributeIndex.VET_NORMAL, ComponentType.CT_FLOAT, 3),
        4 * offset
      );
      offset += normalBuffer.length;
    }

    // UV data
    if (uvBuffer) {
      interleavedData.set(uvBuffer, offset);
      vertexFormat.appendWithOffset(
        new Element(AttributeIndex.VET_TEXCOORD0, ComponentType.CT_FLOAT, 2),
        4 * offset
      );
    }

    meshPart.setBoundingBox(boundingBox.clone());
    mesh.setBoundingBox(boundingBox.clone());

    const meshData = mesh.getMeshData();
    meshData.mVertexData = new Uint8Array(interleavedData.buffer);
    meshData.mIndexData = new Uint8Array(indexData.buffer);

    meshPart.setVertexDataOffset(0);
    meshPart.setIndexDataOffset(0);
    meshPart.setIndexCount(indexCount);

    const meshId = THREE.Math.generateUUID();
    mesh.setName(meshId);
    mesh.setPath(`/${meshId}`);

    const meshComponent = new MeshComponent();
    meshComponent.setMesh(mesh);

    // Setup material with optional texture
    let diffuseTexture: any = undefined;
    if (data.material?.diffuse?.image) {
      diffuseTexture = new (window as any).T3Dx.Texture2DInstance();
      const texture = new (window as any).T3D.Texture2D();
      const textureData = new (window as any).T3D.TextureData();
      textureData.setMipImage(data.material.diffuse.image);
      texture.setTextureData(textureData);
      diffuseTexture.setTexture(texture);
    }

    for (let partIndex = 0, partCount = mesh.getPartCount(); partIndex < partCount; partIndex++) {
      const material = new MeshBasicMaterial({
        cullMode: RasterizerCullMode.CM_CW,
        diffuseTexture: diffuseTexture,
        transparent: data.material.transparent,
        color: data.material.color,
        opacity: data.material.opacity
      });
      meshComponent.setMeshPartMaterial(partIndex, material);
    }

    const node = new Node(data.params.meshName);
    node.addComponent(meshComponent);

    return node;
  }
}

export { T3dGLTFLoader };