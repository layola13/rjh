/**
 * 管线网格创建器模块
 * 提供管线几何体生成、变换和组合功能
 */

/**
 * 管线网格类型枚举
 */
export enum TubeMeshTypeEnum {
  /** 直管 */
  straight = 0,
  /** 电气垂直连接 */
  elecVertical = 1,
  /** 水管垂直连接 */
  waterVertical = 2,
  /** T型连接器 */
  connectorT = 3,
  /** 其他类型 */
  other = 4
}

/**
 * 接线盒参数枚举
 */
export enum JunctionBoxParam {
  /** 宽度(米) */
  width = 0.086,
  /** 厚度(米) */
  thickness = 0.05
}

/** 电气管路半径(米) */
export const elecPathR: number;

/** 水管管路半径(米) */
export const waterPathR: number;

/** 水管壁厚(米) */
export const waterTubeThickness: number;

/** 精度阈值 */
export const precision: number;

/**
 * 网格定义接口
 */
export interface MeshDefinition {
  /** 顶点位置数组 (x,y,z交错) */
  vertexPositions: Float32Array;
  /** 顶点法线数组 (nx,ny,nz交错) */
  vertexNormals: Float32Array;
  /** 顶点UV坐标数组 (u,v交错) */
  vertexUVs: Float32Array;
  /** 顶点数量 */
  vertexCount: number;
  /** 面索引数组 */
  faceIndices: Uint32Array;
  /** 索引数量 */
  indexCount: number;
}

/**
 * 三维点坐标接口
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 管线参数接口
 */
export interface TubeParams {
  /** 管线唯一标识 */
  id: string | number;
  /** 管线直径 */
  dia: number;
  /** 管径 (同dia) */
  diameter: number;
  /** 节点位置 (用于连接类型) */
  nodePos?: Point3D;
  /** 侧边点数组 (起点和终点) */
  sidePoints: Point3D[];
  /** 管线路径曲线数组 */
  route: any[]; // GeoCurve3D类型
}

/**
 * 缓存的转角网格数据
 */
interface CachedCornerMesh {
  /** 路径半径 */
  pathR: number;
  /** 管道直径 */
  tubeDiameter: number;
  /** 网格定义 */
  mesh: MeshDefinition;
}

/**
 * 缓存的水管转角网格数据
 */
interface CachedWaterCornerMesh {
  /** 管道直径 */
  tubeDiameter: number;
  /** 网格定义 */
  mesh: MeshDefinition;
}

/**
 * 管线网格创建器类
 * 负责生成各种类型管线的三维网格
 */
export class TubeMeshCreator {
  /** 单例实例 */
  static readonly instance: TubeMeshCreator;

  private readonly _length: number;
  private readonly _diameter: number;
  private readonly _axisX: any; // Vector3
  private readonly _axisY: any; // Vector3
  private readonly _baseLoops: any[][];
  private _defaultElecCorner: CachedCornerMesh[];
  private _defaultWaterCorner: CachedWaterCornerMesh[];
  private _defaultStraight?: MeshDefinition;
  private _defaultJunctionBox?: MeshDefinition;

  constructor();

  /** X轴单位向量 */
  get axisX(): any; // Vector3

  /** Y轴单位向量 */
  get axisY(): any; // Vector3

  /**
   * 清除缓存的网格数据
   */
  clear(): void;

  /**
   * 生成基础环形轮廓
   * @param radius - 圆半径
   * @param useSegments - 是否使用线段离散化
   * @returns 二维轮廓曲线数组
   */
  private _genBaseLoopCircle(radius?: number, useSegments?: boolean): any[][];

  /**
   * 获取默认网格 (优先从缓存读取)
   * @param meshType - 网格类型
   * @param diameter - 管道直径
   * @param pathRadius - 路径半径 (可选)
   * @returns 网格定义或undefined
   */
  getDefaultMesh(
    meshType: TubeMeshTypeEnum,
    diameter: number,
    pathRadius?: number
  ): MeshDefinition | undefined;

  /**
   * 获取接线盒网格
   * @returns 接线盒网格定义
   */
  getJunctionBoxMesh(): MeshDefinition;

  /**
   * 创建管线网格
   * @param pathCurves - 路径曲线数组
   * @param diameter - 管道直径 (可选)
   * @param isWaterPipe - 是否为水管
   * @returns 网格定义或undefined
   */
  createTube(
    pathCurves: any[], // Curve3D[]
    diameter?: number,
    isWaterPipe?: boolean
  ): MeshDefinition | undefined;

  /**
   * 根据轴向和角度创建四元数
   * @param fromAxis - 起始轴向
   * @param toAxis - 目标轴向
   * @param referenceAxis - 参考轴向
   * @param forceReference - 强制使用参考轴
   * @returns 四元数
   */
  private _quaternionFromAxisAngle(
    fromAxis: any, // Vector3
    toAxis: any, // Vector3
    referenceAxis: any, // Vector3
    forceReference?: boolean
  ): any; // Quaternion

  /**
   * 将缓冲区数据转换为网格定义
   * @param bufferData - 缓冲区数据
   * @returns 网格定义
   */
  bufferToMeshDef(bufferData: {
    vertices: number[];
    normals: number[];
    uvs: number[];
    faces: number[];
  }): MeshDefinition;

  /**
   * 合并两个网格
   * @param mesh1 - 第一个网格
   * @param mesh2 - 第二个网格
   * @returns 合并后的网格
   */
  combineMesh(mesh1: MeshDefinition, mesh2: MeshDefinition): MeshDefinition;

  /**
   * 获取管线变换矩阵
   * @param tubeParams - 管线参数
   * @param meshType - 网格类型
   * @returns Three.js变换矩阵
   */
  getTransform(tubeParams: TubeParams, meshType: TubeMeshTypeEnum): THREE.Matrix4;

  /**
   * 获取直管变换矩阵
   * @param startPoint - 起点
   * @param endPoint - 终点
   * @param diameter - 直径
   * @returns 变换矩阵
   */
  getTubeTransform(startPoint: Point3D, endPoint: Point3D, diameter: number): any; // Matrix4

  /**
   * 获取垂直连接变换矩阵
   * @param nodePosition - 节点位置
   * @param sidePoint1 - 侧边点1
   * @param sidePoint2 - 侧边点2
   * @param diameter - 直径
   * @returns 变换矩阵
   */
  getConnectVerticalTransform(
    nodePosition: Point3D,
    sidePoint1: Point3D,
    sidePoint2: Point3D,
    diameter: number
  ): any; // Matrix4

  /**
   * 组合位移、旋转、缩放为变换矩阵
   * @param translation - 位移向量
   * @param rotation - 旋转四元数
   * @param scale - 缩放向量
   * @returns 变换矩阵
   */
  private _compose(
    translation: any, // Vector3
    rotation: any, // Quaternion
    scale: any // Vector3
  ): any; // Matrix4

  /**
   * 将内部矩阵转换为Three.js矩阵
   * @param matrix - 内部矩阵
   * @returns Three.js矩阵
   */
  transToTreeMatrix(matrix: any): THREE.Matrix4;

  /**
   * 获取管线包围盒
   * @param tubeParams - 管线参数
   * @param meshType - 网格类型
   * @returns 包围盒坐标 [minX, minY, minZ, maxX, maxY, maxZ]
   */
  getBoundBox(tubeParams: TubeParams, meshType: TubeMeshTypeEnum): [number, number, number, number, number, number];

  /**
   * 计算管线交叉处的圆弧路径
   * @param tubeParams - 管线参数
   * @returns 处理后的路径曲线数组
   */
  calculateCrossArc(tubeParams: TubeParams): any[]; // Curve3D[]
}