/**
 * T3D 渲染工具模块
 * 提供节点遍历、材质覆盖、边缘网格生成等功能
 */

import type { 
  Node, 
  Vector3, 
  MeshComponent, 
  SkinnedMeshComponent, 
  Mesh, 
  Material, 
  BoundingBox,
  Transform
} from './types/t3d';

/**
 * 边缘检测方向枚举
 */
export enum EdgeDirection {
  /** X轴最小值边缘 */
  MIN_X = 1,
  /** Y轴最小值边缘 */
  MIN_Y = 2,
  /** X轴最大值边缘 */
  MAX_X = 3,
  /** Y轴最大值边缘 */
  MAX_Y = 4
}

/**
 * 更新线条场景配置选项
 */
export interface UpdateLineSceneOptions {
  /** 当前处理的节点数量计数器 */
  cnt?: number;
}

/**
 * 顶点比较函数类型
 * @param v1 第一个顶点
 * @param v2 第二个顶点
 * @returns 是否满足条件
 */
type VertexComparer = (v1: Vector3, v2: Vector3) => boolean;

/**
 * 边缘信息结构
 */
interface EdgeInfo {
  /** 第一个顶点索引 */
  index1: number;
  /** 第二个顶点索引 */
  index2: number;
  /** 第一个面索引 */
  face1: number;
  /** 第二个面索引（可选） */
  face2?: number;
}

/**
 * 面数据结构
 */
interface FaceData {
  /** 顶点索引 a */
  a: number;
  /** 顶点索引 b */
  b: number;
  /** 顶点索引 c */
  c: number;
  /** 面法线 */
  normal: Vector3;
}

/**
 * 网格部分数据结构
 */
interface MeshPart {
  /** 合并后的顶点位置数组 */
  mMergedPositions?: Vector3[];
  /** 合并后的面数组 */
  mMergedFaces?: FaceData[];
}

/**
 * 扩展的网格接口
 */
interface ExtendedMesh extends Mesh {
  /** 切片边缘方向 */
  sliced?: EdgeDirection[];
  /** 获取网格部分 */
  getPart(index: number): MeshPart | null;
  /** 获取部分数量 */
  getPartCount(): number;
  /** 合并顶点 */
  mergeVertices(): void;
}

/**
 * 扩展的节点接口
 */
interface ExtendedNode extends Node {
  /** 网格ID */
  mesh_id?: string;
}

/** 材质缓存映射表 */
const materialCache = new Map<string, Material>();

/** 浮点数比较误差阈值 */
const EPSILON = 1e-4;

/** 边缘检测角度阈值（度） */
const EDGE_ANGLE_THRESHOLD = 75;

/** 批处理基础节点数 */
const BATCH_BASE_COUNT = 60;

/**
 * T3D 渲染工具集
 */
export const T3dRender = {
  /**
   * 递归遍历节点树
   * @param node 起始节点
   * @param callback 对每个节点执行的回调函数
   */
  traverseNode(node: Node, callback?: (node: Node) => void): void {
    if (!callback) {
      return;
    }

    callback(node);
    
    const childCount = node.getChildCount();
    for (let i = 0; i < childCount; i++) {
      const child = node.getChild(i);
      this.traverseNode(child, callback);
    }
  },

  /**
   * 收集所有网格节点
   * @param node 起始节点
   * @param callback 对每个网格节点执行的回调
   */
  collectMeshNode(node: Node, callback?: (node: Node) => void): void {
    if (!callback) {
      return;
    }

    const childCount = node.getChildCount();
    for (let i = 0; i < childCount; i++) {
      const child = node.getChild(i);
      this.traverseNode(child, callback);
    }
  },

  /**
   * 覆盖节点树中的材质
   * @param rootNode 根节点
   * @param primaryMaterial 主要材质
   * @param secondaryMaterial 次要材质
   * @param shouldUsePrimary 判断是否使用主要材质的函数
   */
  overrideMaterial(
    rootNode: Node,
    primaryMaterial: Material,
    secondaryMaterial: Material,
    shouldUsePrimary: (node: Node) => boolean
  ): void {
    this.traverseNode(rootNode, (node: Node) => {
      const meshComponent = node.getComponent(MeshComponent);
      
      if (meshComponent) {
        // 缓存原始材质
        materialCache.set(node.getRuntimeID(), meshComponent.getMaterial());
        
        // 根据条件选择材质
        const targetMaterial = shouldUsePrimary(node) 
          ? primaryMaterial 
          : secondaryMaterial;
        
        meshComponent.setMaterial(targetMaterial);
      }
    });
  },

  /**
   * 恢复节点树中的原始材质
   * @param rootNode 根节点
   */
  restoreMaterial(rootNode: Node): void {
    this.traverseNode(rootNode, (node: Node) => {
      const meshComponent = node.getComponent(MeshComponent);
      
      if (meshComponent) {
        const originalMaterial = materialCache.get(node.getRuntimeID());
        if (originalMaterial) {
          meshComponent.setMaterial(originalMaterial);
        }
      }
    });
  },

  /**
   * 将几何体转换为边缘网格
   * @param geometry 源几何体
   * @param material 边缘材质
   * @param edgeDirections 需要检测的边缘方向
   * @returns 包含边缘网格的新节点
   */
  geometryToEdgeMesh(
    geometry: ExtendedMesh,
    material: Material,
    edgeDirections?: EdgeDirection[]
  ): ExtendedNode {
    const edgeNode = new Node(`${geometry.getName()}_edge_node`) as ExtendedNode;
    
    const edgeMesh = this._extractEdges(geometry, EDGE_ANGLE_THRESHOLD, edgeDirections);
    
    const meshComponent = new MeshComponent();
    meshComponent.setMesh(edgeMesh);
    meshComponent.setMaterial(material);
    
    edgeNode.addComponent(meshComponent);
    
    return edgeNode;
  },

  /**
   * 更新线条场景
   * @param sourceScene 源场景节点
   * @param lineScene 线条场景节点
   * @param edgeMaterial 边缘材质
   * @param options 更新选项
   * @returns 网格节点映射表
   */
  updateLineScene(
    sourceScene: Node,
    lineScene: ExtendedNode,
    edgeMaterial: Material,
    options?: UpdateLineSceneOptions
  ): Map<string, ExtendedNode> {
    const meshNodes: Record<string, Node> = {};
    
    // 收集所有有效网格节点
    this.traverseNode(sourceScene, (node: Node) => {
      const meshComponent = node.getComponent(MeshComponent);
      
      if (meshComponent && meshComponent.getMesh() && 
          !this._isLineType(meshComponent) && 
          node.getName() !== 'shadow') {
        meshNodes[node.getRuntimeID()] = node;
      }
    });

    const lineNodeMap = new Map<string, ExtendedNode>();
    
    // 收集现有线条节点
    this.traverseNode(lineScene, (node: ExtendedNode) => {
      if (node.mesh_id) {
        lineNodeMap.set(node.mesh_id, node);
      }
    });

    const nodeIds = Object.keys(meshNodes);
    const totalCount = nodeIds.length;
    let processCount = totalCount;

    // 计算批处理数量
    if (options?.cnt !== undefined && options.cnt !== null) {
      options.cnt += BATCH_BASE_COUNT;
      if (options.cnt > totalCount) {
        options.cnt = totalCount;
      }
      processCount = options.cnt;
    }

    // 处理网格节点
    for (let i = 0; i < processCount; i++) {
      const nodeId = nodeIds[i];
      const meshNode = meshNodes[nodeId];
      let lineNode = lineNodeMap.get(nodeId);

      if (this._isNodeVisible(meshNode)) {
        if (lineNode) {
          lineNode.setVisible(true);
        } else if (!meshNode.getComponent(SkinnedMeshComponent)) {
          const meshComponent = meshNode.getComponent(MeshComponent);
          const mesh = meshComponent?.getMesh() as ExtendedMesh;
          
          if (mesh) {
            lineNode = this.geometryToEdgeMesh(mesh, edgeMaterial, mesh.sliced);
            lineNode.mesh_id = nodeId;
            lineNodeMap.set(nodeId, lineNode);
            lineScene.addChild(lineNode);
          }
        }

        if (lineNode) {
          lineNode.setWorldTransform(meshNode.getWorldTransform().clone());
        }
      } else if (lineNode) {
        lineNode.setVisible(false);
      }
    }

    // 清理不再使用的线条节点
    const nodesToRemove = new Map<string, ExtendedNode>();
    lineNodeMap.forEach((lineNode, meshId) => {
      if (!meshNodes[lineNode.mesh_id as string]) {
        nodesToRemove.set(meshId, lineNode);
      }
    });

    nodesToRemove.forEach((lineNode, meshId) => {
      lineScene.removeChild(lineNode);
      lineNodeMap.delete(meshId);
    });

    return lineNodeMap;
  },

  /**
   * 提取几何体边缘
   * @private
   */
  _extractEdges(
    geometry: ExtendedMesh,
    angleThreshold: number,
    edgeDirections?: EdgeDirection[]
  ): Mesh {
    const boundingBox = geometry.getBoundingBox();
    const vertexComparers: VertexComparer[] = [];

    // 创建顶点比较函数
    edgeDirections?.forEach((direction) => {
      let comparer: VertexComparer | null = null;

      switch (direction) {
        case EdgeDirection.MIN_X:
          comparer = (v1, v2) => 
            Math.abs(v1.x - boundingBox.min.x) + Math.abs(v2.x - boundingBox.min.x) < EPSILON;
          break;
        case EdgeDirection.MAX_X:
          comparer = (v1, v2) => 
            Math.abs(v1.x - boundingBox.max.x) + Math.abs(v2.x - boundingBox.max.x) < EPSILON;
          break;
        case EdgeDirection.MIN_Y:
          comparer = (v1, v2) => 
            Math.abs(v1.y - boundingBox.min.y) + Math.abs(v2.y - boundingBox.min.y) < EPSILON;
          break;
        case EdgeDirection.MAX_Y:
          comparer = (v1, v2) => 
            Math.abs(v1.y - boundingBox.max.y) + Math.abs(v2.y - boundingBox.max.y) < EPSILON;
          break;
      }

      if (comparer) {
        vertexComparers.push(comparer);
      }
    });

    const edgePositions: number[] = [];
    const cosineThreshold = Math.cos((Math.PI / 180) * angleThreshold);
    const edgeIndices: [number, number] = [0, 0];
    const edgeMap: Record<string, EdgeInfo> = {};
    const vertexKeys = ['a', 'b', 'c'] as const;

    geometry.mergeVertices();

    const partCount = geometry.getPartCount();
    for (let partIndex = 0; partIndex < partCount; partIndex++) {
      const part = geometry.getPart(partIndex);
      
      if (!part?.mMergedPositions || !part.mMergedFaces) {
        continue;
      }

      const positions = part.mMergedPositions;
      const faces = part.mMergedFaces;

      // 构建边缘映射
      for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
        const face = faces[faceIndex];

        // 检查面的有效性
        if (face.a === face.b || face.a === face.c || face.b === face.c) {
          continue;
        }

        for (let vertexIndex = 0; vertexIndex < 3; vertexIndex++) {
          const currentIndex = face[vertexKeys[vertexIndex]];
          const nextIndex = face[vertexKeys[(vertexIndex + 1) % 3]];

          edgeIndices[0] = Math.min(currentIndex, nextIndex);
          edgeIndices[1] = Math.max(currentIndex, nextIndex);

          const edgeKey = `${edgeIndices[0]}, ${edgeIndices[1]}`;

          if (edgeMap[edgeKey] === undefined) {
            edgeMap[edgeKey] = {
              index1: edgeIndices[0],
              index2: edgeIndices[1],
              face1: faceIndex,
              face2: undefined
            };
          } else {
            edgeMap[edgeKey].face2 = faceIndex;
          }
        }
      }

      // 提取边缘线
      for (const edgeKey in edgeMap) {
        const edge = edgeMap[edgeKey];

        // 判断是否为轮廓边
        const isOutlineEdge = 
          edge.face2 === undefined ||
          this._dotProduct(faces[edge.face1].normal, faces[edge.face2].normal) <= cosineThreshold;

        if (isOutlineEdge) {
          const vertex1 = positions[edge.index1];
          const vertex2 = positions[edge.index2];

          // 检查是否在指定边缘方向上
          const isOnSpecifiedEdge = vertexComparers.find(comparer => comparer(vertex1, vertex2));
          
          if (isOnSpecifiedEdge) {
            continue;
          }

          edgePositions.push(vertex1.x, vertex1.y, vertex1.z);
          edgePositions.push(vertex2.x, vertex2.y, vertex2.z);
        }
      }
    }

    return (window as any).T3Dx.Three2T3d.convertPositionsToStreamingLineMesh(
      `${geometry.getName()}_edge`,
      edgePositions,
      []
    );
  },

  /**
   * 检查节点是否可见
   * @private
   */
  _isNodeVisible(node: Node): boolean {
    let current: Node | null = node;
    
    while (current && current.getVisible() && current.getEnable()) {
      current = current.getParent();
    }
    
    return !current;
  },

  /**
   * 检查是否为线条类型组件
   * @private
   */
  _isLineType(meshComponent: MeshComponent): boolean {
    const util = (window as any).HSApp?.View?.T3d?.Util;
    return util?.isLine(meshComponent) || util?.isLineMesh(meshComponent);
  },

  /**
   * 计算向量点积
   * @private
   */
  _dotProduct(v1: Vector3, v2: Vector3): number {
    return (window as any).Vector3?.Dot?.(v1, v2) ?? 0;
  }
};

/**
 * 模块导出
 */
export interface T3dRenderModule {
  T3dRender: typeof T3dRender;
}

declare const module: T3dRenderModule;