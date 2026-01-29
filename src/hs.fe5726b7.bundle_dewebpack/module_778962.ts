interface Node {
  getName(): string;
  getChildCount(): number;
  getChild(index: number): Node;
  getComponent<T>(componentType: new () => T): T | null;
  getRuntimeID(): string;
  setWorldTransform(transform: unknown): void;
  getWorldTransform(): { clone(): unknown };
  getVisible(): boolean;
  getEnable(): boolean;
  getParent(): Node | null;
  addComponent(component: MeshComponent): void;
  addChild(child: Node): void;
  removeChild(child: Node): void;
  setVisible(visible: boolean): void;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Material {}

interface MeshComponent {
  getMaterial(): Material;
  setMaterial(material: Material): void;
  getMesh(): Mesh | null;
  setMesh(mesh: Mesh): void;
}

interface SkinnedMeshComponent {}

interface BoundingBox {
  min: Vector3;
  max: Vector3;
}

interface MergedFace {
  a: number;
  b: number;
  c: number;
  normal: Vector3;
}

interface MeshPart {
  mMergedPositions?: Vector3[];
  mMergedFaces?: MergedFace[];
}

interface Mesh {
  getName(): string;
  getBoundingBox(): BoundingBox;
  mergeVertices(): void;
  getPartCount(): number;
  getPart(index: number): MeshPart | null;
  sliced?: number[];
}

interface T3dRenderUtil {
  traverseNode(node: Node, callback: (node: Node) => void): void;
  collectMeshNode(node: Node): void;
  overrideMaterial(
    node: Node,
    primaryMaterial: Material,
    secondaryMaterial: Material,
    predicate: (node: Node) => boolean
  ): void;
  restoreMaterial(node: Node): void;
  geometryToEdgeMesh(
    mesh: Mesh,
    material: Material,
    slicedEdges?: number[]
  ): Node;
  updateLineScene(
    sourceNode: Node,
    targetNode: Node,
    edgeMaterial: Material,
    options?: { cnt?: number }
  ): Map<string, Node>;
}

declare const HSApp: {
  View: {
    T3d: {
      Util: {
        isLine(component: MeshComponent): boolean;
        isLineMesh(component: MeshComponent): boolean;
      };
    };
  };
};

declare const T3Dx: {
  Three2T3d: {
    convertPositionsToStreamingLineMesh(
      name: string,
      positions: number[],
      indices: number[]
    ): Mesh;
  };
};

const EPSILON = 1e-4;
const EDGE_DETECTION_ANGLE = 75;

const materialCache = new Map<string, Material>();

type EdgeComparisonFunc = (v1: Vector3, v2: Vector3) => boolean;

interface EdgeInfo {
  index1: number;
  index2: number;
  face1: number;
  face2?: number;
}

const T3dRender: T3dRenderUtil = {
  traverseNode(node: Node, callback: (node: Node) => void): void {
    if (callback) {
      callback(node);
      const childCount = node.getChildCount();
      for (let i = 0; i < childCount; i++) {
        const child = node.getChild(i);
        this.traverseNode(child, callback);
      }
    }
  },

  collectMeshNode(node: Node): void {
    if (callback) {
      const childCount = node.getChildCount();
      for (let i = 0; i < childCount; i++) {
        const child = node.getChild(i);
        this.traverseNode(child, callback);
      }
    }
  },

  overrideMaterial(
    node: Node,
    primaryMaterial: Material,
    secondaryMaterial: Material,
    predicate: (node: Node) => boolean
  ): void {
    this.traverseNode(node, (currentNode: Node) => {
      const meshComponent = currentNode.getComponent(MeshComponent);
      if (meshComponent) {
        materialCache.set(currentNode.getRuntimeID(), meshComponent.getMaterial());
        const materialToApply = predicate(currentNode) ? primaryMaterial : secondaryMaterial;
        meshComponent.setMaterial(materialToApply);
      }
    });
  },

  restoreMaterial(node: Node): void {
    this.traverseNode(node, (currentNode: Node) => {
      const meshComponent = currentNode.getComponent(MeshComponent);
      if (meshComponent) {
        const cachedMaterial = materialCache.get(currentNode.getRuntimeID());
        if (cachedMaterial) {
          meshComponent.setMaterial(cachedMaterial);
        }
      }
    });
  },

  geometryToEdgeMesh(
    mesh: Mesh,
    material: Material,
    slicedEdges?: number[]
  ): Node {
    const edgeNode = new Node(`${mesh.getName()}_edge_node`);
    const edgeMesh = extractEdgesFromGeometry(mesh, EDGE_DETECTION_ANGLE, slicedEdges);
    const meshComponent = new MeshComponent();
    meshComponent.setMesh(edgeMesh);
    meshComponent.setMaterial(material);
    edgeNode.addComponent(meshComponent);
    return edgeNode;
  },

  updateLineScene(
    sourceNode: Node,
    targetNode: Node,
    edgeMaterial: Material,
    options?: { cnt?: number }
  ): Map<string, Node> {
    const sourceMeshNodes: Record<string, Node> = {};
    const isNodeVisible = (node: Node): boolean => {
      let current: Node | null = node;
      while (current && current.getVisible() && current.getEnable()) {
        current = current.getParent();
      }
      return !current;
    };

    this.traverseNode(sourceNode, (node: Node) => {
      const meshComponent = node.getComponent(MeshComponent);
      if (
        meshComponent &&
        meshComponent.getMesh() &&
        !HSApp.View.T3d.Util.isLine(meshComponent) &&
        !HSApp.View.T3d.Util.isLineMesh(meshComponent) &&
        node.getName() !== 'shadow'
      ) {
        sourceMeshNodes[node.getRuntimeID()] = node;
      }
    });

    const edgeNodeMap = new Map<string, Node>();
    this.traverseNode(targetNode, (node: Node) => {
      node.getComponent(MeshComponent);
      if ((node as any).mesh_id) {
        edgeNodeMap.set((node as any).mesh_id, node);
      }
    });

    const meshNodeIds = Object.keys(sourceMeshNodes);
    const totalNodes = meshNodeIds.length;
    let processCount = totalNodes;

    if (options?.cnt != null) {
      options.cnt += 60;
      if (options.cnt > totalNodes) {
        options.cnt = totalNodes;
      }
      processCount = options.cnt;
    }

    for (let i = 0; i < processCount; i++) {
      const meshId = meshNodeIds[i];
      const sourceMeshNode = sourceMeshNodes[meshId];
      let edgeNode = edgeNodeMap.get(meshId);

      if (isNodeVisible(sourceMeshNode)) {
        if (edgeNode) {
          edgeNode.setVisible(true);
        } else if (sourceMeshNode.getComponent(SkinnedMeshComponent)) {
          // Skip skinned mesh components
        } else {
          const meshComponent = sourceMeshNode.getComponent(MeshComponent);
          const meshGeometry = meshComponent?.getMesh();
          if (meshGeometry) {
            edgeNode = this.geometryToEdgeMesh(meshGeometry, edgeMaterial, meshGeometry.sliced);
            (edgeNode as any).mesh_id = meshId;
            edgeNodeMap.set(meshId, edgeNode);
            targetNode.addChild(edgeNode);
          }
        }
        if (edgeNode) {
          edgeNode.setWorldTransform(sourceMeshNode.getWorldTransform().clone());
        }
      } else if (edgeNode) {
        edgeNode.setVisible(false);
      }
    }

    const nodesToRemove = new Map<string, Node>();
    edgeNodeMap.forEach((edgeNode, meshId) => {
      if (!sourceMeshNodes[(edgeNode as any).mesh_id]) {
        nodesToRemove.set(meshId, edgeNode);
      }
    });

    nodesToRemove.forEach((edgeNode, meshId) => {
      targetNode.removeChild(edgeNode);
      edgeNodeMap.delete(meshId);
    });

    return edgeNodeMap;
  },
};

function extractEdgesFromGeometry(
  mesh: Mesh,
  angleThreshold: number,
  slicedEdges?: number[]
): Mesh {
  const boundingBox = mesh.getBoundingBox();
  const edgeFilters: EdgeComparisonFunc[] = [];

  slicedEdges?.forEach((edgeType) => {
    let filter: EdgeComparisonFunc | null = null;
    if (edgeType === 1) {
      filter = (v1: Vector3, v2: Vector3) =>
        Math.abs(v1.x - boundingBox.min.x) + Math.abs(v2.x - boundingBox.min.x) < EPSILON;
    } else if (edgeType === 3) {
      filter = (v1: Vector3, v2: Vector3) =>
        Math.abs(v1.x - boundingBox.max.x) + Math.abs(v2.x - boundingBox.max.x) < EPSILON;
    } else if (edgeType === 2) {
      filter = (v1: Vector3, v2: Vector3) =>
        Math.abs(v1.y - boundingBox.min.y) + Math.abs(v2.y - boundingBox.min.y) < EPSILON;
    } else if (edgeType === 4) {
      filter = (v1: Vector3, v2: Vector3) =>
        Math.abs(v1.y - boundingBox.max.y) + Math.abs(v2.y - boundingBox.max.y) < EPSILON;
    }
    if (filter) {
      edgeFilters.push(filter);
    }
  });

  const edgePositions: number[] = [];
  const cosineThreshold = Math.cos((Math.PI / 180) * angleThreshold);
  const edgeIndices: [number, number] = [0, 0];
  const edgeMap: Record<string, EdgeInfo> = {};
  const vertexIndexKeys = ['a', 'b', 'c'] as const;

  mesh.mergeVertices();

  const partCount = mesh.getPartCount();
  for (let partIndex = 0; partIndex < partCount; partIndex++) {
    const part = mesh.getPart(partIndex);
    if (!part?.mMergedPositions || !part?.mMergedFaces) continue;

    const positions = part.mMergedPositions;
    const faces = part.mMergedFaces;

    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      if (
        face[vertexIndexKeys[0]] === face[vertexIndexKeys[1]] ||
        face[vertexIndexKeys[0]] === face[vertexIndexKeys[2]] ||
        face[vertexIndexKeys[1]] === face[vertexIndexKeys[2]]
      ) {
        continue;
      }

      for (let edgeOffset = 0; edgeOffset < 3; edgeOffset++) {
        const vertexIndex1 = face[vertexIndexKeys[edgeOffset]];
        const vertexIndex2 = face[vertexIndexKeys[(edgeOffset + 1) % 3]];
        edgeIndices[0] = Math.min(vertexIndex1, vertexIndex2);
        edgeIndices[1] = Math.max(vertexIndex1, vertexIndex2);

        const edgeKey = `${edgeIndices[0]}, ${edgeIndices[1]}`;
        if (edgeMap[edgeKey] === undefined) {
          edgeMap[edgeKey] = {
            index1: edgeIndices[0],
            index2: edgeIndices[1],
            face1: faceIndex,
            face2: undefined,
          };
        } else {
          edgeMap[edgeKey].face2 = faceIndex;
        }
      }
    }

    for (const edgeKey in edgeMap) {
      const edge = edgeMap[edgeKey];
      if (
        edge.face2 === undefined ||
        Vector3.Dot(faces[edge.face1].normal, faces[edge.face2].normal) <= cosineThreshold
      ) {
        const vertex1 = positions[edge.index1];
        const vertex2 = positions[edge.index2];

        if (
          edgeFilters.find((filter) => filter(vertex1, vertex2))
        ) {
          continue;
        }

        edgePositions.push(vertex1.x, vertex1.y, vertex1.z);
        edgePositions.push(vertex2.x, vertex2.y, vertex2.z);
      }
    }
  }

  return T3Dx.Three2T3d.convertPositionsToStreamingLineMesh(
    `${mesh.getName()}_edge`,
    edgePositions,
    []
  );
}

const Vector3 = {
  Dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  },
};

export { T3dRender };