import { Node, MeshComponent, Mesh, PrimitiveType, BoundingBox, VertexFormat, IndexFormat, Vector3, Element, AttributeIndex, ComponentType } from './path/to/u-module';
import { T3dOBJLoader } from './T3dOBJLoader';
import { Three2T3d } from './Three2T3d';

export class T3dBinaryOBJLoader extends T3dOBJLoader {
  constructor() {
    super();
  }

  public load(
    url: string,
    onLoad: (result: Node) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (error: Error) => void
  ): void {
    this.responseType = 'arraybuffer';
    this._doLoad(
      url,
      (arrayBuffer: ArrayBuffer) => {
        try {
          const result = this.parse(arrayBuffer);
          onLoad(result);
        } catch (error) {
          if (onError) {
            onError(error as Error);
          }
        }
      },
      onProgress,
      onError
    );
  }

  public parse(arrayBuffer: ArrayBuffer): Node {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    const meshCount = dataView.getUint32(offset, true);
    offset += 4;

    const rootNode = new Node();

    for (let meshIndex = 0; meshIndex < meshCount; ++meshIndex) {
      const nameLength = dataView.getUint32(offset, true);
      offset += 4;

      const nameBytes = new Uint8Array(arrayBuffer, offset, nameLength);
      const meshName = String.fromCharCode.apply(null, Array.from(nameBytes));
      offset += nameLength;
      offset += 4 - (nameLength % 4);

      const vertexCount = dataView.getUint32(offset, true);
      offset += 4;

      const hasNormals = dataView.getUint16(offset, true);
      offset += 2;

      const hasTexCoords = dataView.getUint16(offset, true);
      offset += 2;

      const meshNode = new Node();
      meshNode.setName(meshName);
      rootNode.addChild(meshNode);

      const meshComponent = new MeshComponent();
      const mesh = new Mesh();
      mesh.setPrimitiveType(PrimitiveType.PT_TriangleList);

      const uuid = THREE.Math.generateUUID();
      mesh.setPath(`/${uuid}`);
      mesh.setName(`${uuid}`);

      const boundingBox = new BoundingBox();
      const meshPart = mesh.addPart();

      if (meshPart) {
        const vertexFormat = new VertexFormat();
        vertexFormat.mIsMultiStride = true;
        meshPart.setVertexFormat(vertexFormat);

        let indexData: Uint32Array | Uint16Array;
        if (vertexCount > 65535) {
          meshPart.setIndexFormat(IndexFormat.INDEX32);
          indexData = Uint32Array.from({ length: vertexCount }, (_element, index) => index);
        } else {
          meshPart.setIndexFormat(IndexFormat.INDEX16);
          indexData = Uint16Array.from({ length: vertexCount }, (_element, index) => index);
        }

        let floatsPerVertex = 6;
        if (hasTexCoords) {
          floatsPerVertex += 2;
        }

        const vertexData = new Float32Array(vertexCount * floatsPerVertex);
        let vertexDataOffset = 0;

        const positions = new Float32Array(arrayBuffer, offset, 3 * vertexCount);
        offset += 3 * vertexCount * 4;

        const tempVector = new Vector3();
        for (let vertexIndex = 0; vertexIndex < vertexCount; vertexIndex++) {
          tempVector.x = positions[3 * vertexIndex + 0];
          tempVector.y = positions[3 * vertexIndex + 1];
          tempVector.z = positions[3 * vertexIndex + 2];
          boundingBox.mergePoint(tempVector);
        }

        vertexData.set(positions, vertexDataOffset);
        vertexFormat.appendWithOffset(
          new Element(AttributeIndex.VET_POSITION, ComponentType.CT_FLOAT, 3),
          0
        );
        vertexDataOffset += positions.length;

        let normals: Float32Array;
        if (hasNormals) {
          normals = new Float32Array(arrayBuffer, offset, 3 * vertexCount);
          offset += 3 * vertexCount * 4;
        } else {
          normals = Three2T3d.computeVertexNormals(positions, indexData);
        }

        vertexData.set(normals, vertexDataOffset);
        vertexFormat.appendWithOffset(
          new Element(AttributeIndex.VET_NORMAL, ComponentType.CT_FLOAT, 3),
          4 * vertexDataOffset
        );
        vertexDataOffset += normals.length;

        if (hasTexCoords) {
          const texCoords = new Float32Array(arrayBuffer, offset, 2 * vertexCount);
          offset += 2 * vertexCount * 4;
          vertexData.set(texCoords, vertexDataOffset);
          vertexFormat.appendWithOffset(
            new Element(AttributeIndex.VET_TEXCOORD0, ComponentType.CT_FLOAT, 2),
            4 * vertexDataOffset
          );
        }

        meshPart.setBoundingBox(boundingBox.clone());
        mesh.setBoundingBox(boundingBox.clone());

        const meshData = mesh.getMeshData();
        meshData.mVertexData = new Uint8Array(vertexData.buffer);
        meshData.mIndexData = new Uint8Array(indexData.buffer);
        meshPart.setVertexDataOffset(0);
        meshPart.setIndexDataOffset(0);
        meshPart.setIndexCount(vertexCount);
      }

      meshComponent.setMesh(mesh);

      for (let partIndex = 0, partCount = mesh.getPartCount(); partIndex < partCount; partIndex++) {
        const defaultMaterial = this._getDefaultFaceMaterial();
        meshComponent.setMeshPartMaterial(partIndex, defaultMaterial);
      }

      meshNode.addComponent(meshComponent);
    }

    return rootNode;
  }
}