/**
 * Module: ContentVsplitHandler
 * 内容垂直分割处理器 - 用于处理3D模型网格的垂直分割和定位
 */

/**
 * 检查实体是否为参数化摆门类型
 * @param entity - 待检查的实体对象
 * @returns 如果是参数化摆门类型则返回true
 */
declare function isParamSwingDoorType(entity: unknown): boolean;

/**
 * 网格对象信息接口
 */
interface MeshObjectInfo {
  /** 对象名称 */
  obj_name: string;
  /** 最大顶点坐标 */
  max_vertex: { x: number; y: number; z: number };
  /** 最小顶点坐标 */
  min_vertex: { x: number; y: number; z: number };
  /** 偏移中心点（计算后设置） */
  offsetcenter?: { x: number; y: number; z: number };
  /** 世界矩阵 */
  matrixWorld?: THREE.Matrix4;
  /** 本地矩阵 */
  Matrixlocal?: THREE.Matrix4;
  /** 门世界矩阵 */
  MatrixdoorWorld?: THREE.Matrix4;
  /** Y轴重复次数 */
  repeaty?: number;
  /** X轴重复次数 */
  repeatx?: number;
  /** Y轴偏移 */
  offsety?: number;
  /** X轴偏移 */
  offsetx?: number;
  /** 几何体对象 */
  geometry?: THREE.BufferGeometry;
}

/**
 * 分割规则配置接口
 */
interface ScaleRuleData {
  options: {
    /** 分割依据数组（单位：毫米） */
    splitBy: number[];
  };
}

/**
 * 实体元数据接口
 */
interface EntityMetadata {
  extension: {
    objInfo: {
      /** 包围盒信息 */
      bounding?: Record<string, MeshObjectInfo>;
      [key: string]: unknown;
    };
  };
  /** 缩放规则 */
  scaleRule?: {
    data: ScaleRuleData;
  };
}

/**
 * 3D实体接口
 */
interface Entity3D {
  /** 实体唯一标识 */
  seekId: string;
  /** X轴尺寸（米） */
  XSize: number;
  /** Z轴尺寸（米） */
  ZSize: number;
  /** 元数据 */
  metadata: EntityMetadata;
  /** 获取路径中的所有父级实体 */
  getParentsInPath(): unknown[];
}

/**
 * 矩阵数据接口
 */
interface MatrixData {
  /** 位置向量 */
  pos: THREE.Vector3;
  /** 欧拉角 */
  euler: THREE.Euler;
  /** 四元数 */
  quat: THREE.Quaternion;
}

/**
 * 2D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 内容垂直分割处理器类
 * 负责处理3D模型网格的垂直分割、定位和矩阵变换
 */
export declare class ContentVsplitHandler {
  /** 关联的3D实体对象 */
  private readonly entity: Entity3D;
  
  /** 网格对象数组 */
  private meshes: MeshObjectInfo[];
  
  /** 网格包围盒映射表（key: obj_name, value: 包围盒） */
  private meshBoundings: Map<string, THREE.Box3>;
  
  /** 包围盒数据缓存（key: seekId_objName, value: 包围盒） */
  private boundingBoxData: Map<string, THREE.Box3>;
  
  /** 网格是否已初始化标志 */
  private initializedMeshes?: boolean;
  
  /** 网格位置是否已初始化标志 */
  private initializedMeshPositions?: boolean;

  /**
   * 构造函数
   * @param entity - 需要处理的3D实体对象
   */
  constructor(entity: Entity3D);

  /**
   * 获取网格的包围盒
   * @param meshInfo - 网格对象信息
   * @returns 网格的包围盒对象
   */
  getMeshBounding(meshInfo: MeshObjectInfo): THREE.Box3 | undefined;

  /**
   * 初始化网格数组
   * 按照对象名称中的编号排序，并按 [0, 2, 1] 的顺序重组
   * @param meshInfoList - 网格信息数组
   */
  initializeMeshes(meshInfoList: MeshObjectInfo[]): void;

  /**
   * 初始化网格位置
   * 触发几何体中心点计算
   * @param meshInfoList - 网格信息数组
   */
  initializeMeshPosition(meshInfoList: MeshObjectInfo[]): void;

  /**
   * 检查实体的父级路径中是否存在参数化摆门
   * @returns 如果存在参数化摆门父级则返回true
   */
  hasParamSwingDoorParent(): boolean;

  /**
   * 对点坐标应用旋转偏移
   * 按顺序应用三个旋转变换
   * @param point - 待变换的3D点
   * @param rotationX - 绕X轴旋转角度（弧度）
   * @param rotationY - 绕Y轴旋转角度（弧度）
   * @param rotationZ - 绕Z轴旋转角度（弧度）
   * @returns 变换后的点坐标
   */
  rotOffset(
    point: Point3D,
    rotationX: number,
    rotationY: number,
    rotationZ: number
  ): Point3D;

  /**
   * 更新图形数据
   * 根据实体尺寸和分割规则计算并更新所有网格的世界矩阵和本地矩阵
   * @param applyRotation - 是否应用旋转变换
   */
  updateGraphicsData(applyRotation?: boolean): void;
}