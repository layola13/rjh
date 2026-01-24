/**
 * 三维对象内容自定义处理器模块
 * 负责处理网格切割、边界计算、纹理映射等功能
 */

import * as THREE from 'three';

/**
 * 顶点坐标信息
 */
interface Vertex {
  x: number;
  y: number;
  z: number;
}

/**
 * 网格对象边界信息
 */
interface MeshBoundingInfo {
  /** 对象名称 */
  obj_name: string;
  /** 最大顶点坐标 */
  max_vertex?: Vertex;
  /** 最小顶点坐标 */
  min_vertex?: Vertex;
  /** 中心偏移量 */
  offsetcenter?: THREE.Vector3;
  /** 纹理矩阵 */
  textureMatrix?: THREE.Matrix4;
  /** 缩放比例 */
  scale?: THREE.Vector3;
  /** 世界矩阵 */
  matrixWorld?: THREE.Matrix4;
  /** 本地矩阵 */
  Matrixlocal?: THREE.Matrix4;
  /** 门世界矩阵 */
  MatrixdoorWorld?: THREE.Matrix4;
  /** 纹理X方向重复次数 */
  repeatx?: number;
  /** 纹理Y方向重复次数 */
  repeaty?: number;
  /** 纹理X方向偏移 */
  offsetx?: number;
  /** 纹理Y方向偏移 */
  offsety?: number;
}

/**
 * 切割信息中的数值项
 */
interface CuttingValue {
  _value: number;
}

/**
 * 实体切割信息
 */
interface CuttingInfo {
  /** 水平切割点 */
  horizontal?: CuttingValue[];
  /** 垂直切割点 */
  vertical?: CuttingValue[];
}

/**
 * 尺寸信息
 */
interface SizeInfo {
  x: number;
  y: number;
  z: number;
}

/**
 * 网格矩阵项
 */
interface MeshMatrixItem {
  /** 网格对象 */
  mesh: MeshBoundingInfo;
  /** 原始尺寸 */
  oldSize: SizeInfo;
  /** 新尺寸 */
  newSize: SizeInfo;
}

/**
 * 灵魂信息（切割布局信息）
 */
interface SoulInfo {
  /** 水平方向的切割值数组 */
  horizontal: number[];
  /** 垂直方向的切割值数组 */
  vertical: number[];
  /** 总宽度 */
  width: number;
  /** 总高度 */
  height: number;
}

/**
 * 材质对象信息
 */
interface MaterialInfo {
  /** 纹理旋转角度 */
  textureRotation?: number;
  /** X方向瓦片尺寸 */
  tileSize_x?: number;
  /** Y方向瓦片尺寸 */
  tileSize_y?: number;
}

/**
 * 实体元数据结构
 */
interface EntityMetadata {
  extension: {
    objInfo: {
      bounding?: Record<string, MeshBoundingInfo>;
      [key: string]: unknown;
    };
  };
}

/**
 * 实体矩阵数据
 */
interface EntityMatrixData {
  /** 位置向量 */
  pos: THREE.Vector3;
  /** 四元数旋转 */
  quat: THREE.Quaternion;
}

/**
 * 三维实体对象接口
 */
interface Entity {
  /** 实体唯一标识 */
  seekId: string;
  /** 切割信息 */
  cuttingInfo: CuttingInfo;
  /** X方向长度 */
  XLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向尺寸 */
  XSize: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** 元数据 */
  metadata: EntityMetadata;
  /** 获取材质方法 */
  getMaterial(materialName: string): MaterialInfo | undefined;
}

/**
 * 内容自定义处理器类
 * 用于处理三维模型的网格切割、边界盒计算、纹理坐标更新等操作
 */
export declare class ContentCustomizedHandler {
  /** 网格矩阵二维数组 */
  private meshMatrix: MeshMatrixItem[][];
  
  /** 边界盒数据缓存 */
  private boundingBoxData: Map<string, THREE.Box3>;
  
  /** 网格边界映射 */
  private meshBoundings: Map<string, THREE.Box3>;
  
  /** 关联的实体对象 */
  private entity: Entity;

  /**
   * 构造函数
   * @param entity - 要处理的三维实体对象
   */
  constructor(entity: Entity);

  /**
   * 获取网格对象的边界盒
   * @param mesh - 网格边界信息对象
   * @returns 网格的三维边界盒，如果无法计算则返回undefined
   */
  getMeshBounding(mesh: MeshBoundingInfo): THREE.Box3 | undefined;

  /**
   * 从所有网格中筛选出有效的网格集合
   * 通过分组统计找出数量最多且与切割矩阵匹配的网格组
   * @param meshes - 所有网格对象数组
   * @returns 有效的网格对象数组（已排序）
   */
  getValidMeshes(meshes: MeshBoundingInfo[]): MeshBoundingInfo[];

  /**
   * 获取切割布局信息
   * @returns 包含水平/垂直切割值和尺寸的信息对象
   */
  getSoulInfo(): SoulInfo;

  /**
   * 计算旋转后的偏移向量
   * @param offset - 原始偏移向量
   * @param entity - 实体对象
   * @returns 应用旋转后的偏移向量
   */
  rotOffset(offset: THREE.Vector3, entity: Entity): THREE.Vector3;

  /**
   * 更新图形数据
   * 根据切割信息重新计算每个网格的位置、缩放和纹理矩阵
   * @param applyRotation - 是否应用旋转变换
   */
  updateGraphicsData(applyRotation: boolean): void;

  /**
   * 构建网格矩阵
   * 将一维网格数组按照切割信息组织成二维矩阵结构
   * @param meshes - 有效的网格对象数组
   */
  private _buildMatrix(meshes: MeshBoundingInfo[]): void;

  /**
   * 更新单个网格的纹理坐标
   * @param mesh - 要更新的网格对象
   * @param totalBounds - 所有网格的总边界盒
   */
  private _updateTexture(mesh: MeshBoundingInfo, totalBounds: THREE.Box3): void;

  /**
   * 批量更新所有网格的纹理坐标
   * 先计算整体边界盒，再逐个更新每个网格的纹理参数
   * @param meshes - 网格对象数组
   */
  updateTexture(meshes: MeshBoundingInfo[]): void;
}

/**
 * 网格本地矩阵（挂载在网格对象上的属性）
 */
export declare type Matrixlocal = THREE.Matrix4;

/**
 * 网格门世界矩阵（挂载在网格对象上的属性）
 */
export declare type MatrixdoorWorld = THREE.Matrix4;