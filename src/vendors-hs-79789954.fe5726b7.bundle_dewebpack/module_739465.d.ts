/**
 * 三维向量工具模块
 * 提供THREE.js Vector3相关的几何运算和判断功能
 */

import * as THREE from 'three';

/**
 * 全局配置接口
 */
interface GlobalConfig {
  /** 距离平方容差 */
  DISTANCE_SQ_TOLERENCE: number;
  /** 向量相等容差 */
  VECTOR_EQUAL_TOLERANCE: number;
}

/**
 * 包含全局配置的模块
 */
interface GlobalModule {
  global: GlobalConfig;
}

/**
 * 数值比较工具模块
 */
interface NumberUtils {
  /** 判断数值是否大于另一数值 */
  larger(a: number, b: number): boolean;
  /** 判断数值是否接近零 */
  isZero(value: number): boolean;
  /** 判断两个数值是否近似相等 */
  nearlyEqual(a: number, b: number): boolean;
}

/**
 * 二维点坐标
 */
interface Point2D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 屏幕坐标点
 */
interface ScreenPoint {
  x: number;
  y: number;
}

/**
 * 投影平面定义
 */
interface ProjectionPlane {
  /** 平面法向量 */
  normal: THREE.Vector3;
  /** 平面常数（距离原点的距离） */
  constant: number;
  /** X轴方向射线 */
  xRay: THREE.Vector3;
}

/**
 * 带源引用的向量（用于排序）
 */
interface VectorWithSource extends THREE.Vector3 {
  /** 原始向量引用 */
  source: THREE.Vector3;
  /** 点积结果（用于排序） */
  dot: number;
}

/**
 * 三维向量工具类
 * 提供向量转换、几何判断、投影等功能
 */
declare const VectorUtils: {
  /**
   * 将二维点转换为THREE.Vector3
   * @param point - 包含x、y坐标的点对象，可选z坐标
   * @returns THREE.Vector3实例
   */
  toTHREEVector3(point: Point2D): THREE.Vector3;

  /**
   * 根据两点创建方向向量
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   * @returns 从起始点指向结束点的向量
   */
  toTHREEVector3ByTwoPoints(startPoint: Point2D, endPoint: Point2D): THREE.Vector3;

  /**
   * 判断两点是否相等（在容差范围内）
   * @param point1 - 第一个点
   * @param point2 - 第二个点
   * @param tolerance - 可选的距离容差，默认使用全局配置
   * @returns 两点是否相等
   */
  isPointEqual(point1: THREE.Vector3 | null, point2: THREE.Vector3 | null, tolerance?: number): boolean;

  /**
   * 判断两向量是否平行
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param tolerance - 可选的角度容差
   * @returns 两向量是否平行
   */
  isParallel(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两个单位向量是否平行
   * @param normal1 - 第一个单位向量
   * @param normal2 - 第二个单位向量
   * @param tolerance - 可选的容差，默认使用全局配置
   * @returns 两向量是否平行
   */
  isNormalParallel(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两向量是否垂直
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param tolerance - 可选的角度容差
   * @returns 两向量是否垂直
   */
  isPerpendicular(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两个单位向量是否垂直
   * @param normal1 - 第一个单位向量
   * @param normal2 - 第二个单位向量
   * @param tolerance - 可选的容差
   * @returns 两向量是否垂直
   */
  isNormalPerpendicular(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两向量是否同向
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param tolerance - 可选的角度容差
   * @returns 两向量是否同向
   */
  isSameDirection(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两个单位向量是否同向
   * @param normal1 - 第一个单位向量
   * @param normal2 - 第二个单位向量
   * @param tolerance - 可选的容差
   * @returns 两向量是否同向
   */
  isNormalSameDirection(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 判断两向量是否反向
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param tolerance - 可选的角度容差
   * @returns 两向量是否反向
   */
  isOpposite(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 调整法向量方向使其与参考向量同向
   * @param normal - 待调整的法向量
   * @param reference - 参考向量
   * @returns 调整后的法向量
   */
  adjustNormal(normal: THREE.Vector3, reference: THREE.Vector3): THREE.Vector3;

  /**
   * 判断两个单位向量是否反向
   * @param normal1 - 第一个单位向量
   * @param normal2 - 第二个单位向量
   * @param tolerance - 可选的容差
   * @returns 两向量是否反向
   */
  isNormalOpposite(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean;

  /**
   * 获取向量的垂直向量
   * @param vector - 输入向量
   * @param referenceNormal - 可选的参考法向量
   * @returns 垂直于输入向量的向量
   */
  getPerpendicularVector(vector: THREE.Vector3, referenceNormal?: THREE.Vector3): THREE.Vector3;

  /**
   * 判断向量是否在参考向量的左侧
   * @param vector - 待判断的向量
   * @param reference - 参考向量
   * @param normal - 可选的法向量，定义"左侧"的参考平面
   * @returns 向量是否在左侧
   */
  isOnLeft(vector: THREE.Vector3, reference: THREE.Vector3, normal?: THREE.Vector3): boolean;

  /**
   * 判断向量是否在参考向量的右侧
   * @param vector - 待判断的向量
   * @param reference - 参考向量
   * @param normal - 可选的法向量
   * @returns 向量是否在右侧
   */
  isOnRight(vector: THREE.Vector3, reference: THREE.Vector3, normal?: THREE.Vector3): boolean;

  /**
   * 将向量数组按从左到右的顺序排序
   * @param vectors - 向量数组
   * @param reference - 参考向量
   * @param normal - 可选的法向量，定义排序平面
   * @returns 排序后的向量数组
   */
  sortLeftToRight(vectors: THREE.Vector3[], reference: THREE.Vector3, normal?: THREE.Vector3): THREE.Vector3[];

  /**
   * 创建参考法向量（内部辅助方法）
   * @param vector - 输入向量
   * @returns 不与输入向量平行的参考法向量
   * @private
   */
  _createReferenceNormal(vector: THREE.Vector3): THREE.Vector3;

  /**
   * 计算两向量之间的有向角度
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param normal - 法向量，定义旋转方向
   * @returns 角度值（弧度），范围[0, 2π]
   */
  angleTo(vector1: THREE.Vector3, vector2: THREE.Vector3, normal: THREE.Vector3): number;

  /**
   * 获取坐标轴的单位向量
   * @param axis - 坐标轴名称：'x' | 'y' | 'z' | '-x' | '-y' | '-z'
   * @returns 对应坐标轴的单位向量
   */
  getUnitVector3(axis: 'x' | 'y' | 'z' | '-x' | '-y' | '-z'): THREE.Vector3;

  /**
   * 计算两向量在指定法向量平面内的夹角（0到2π）
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param normal - 可选的法向量，默认为(0,0,1)
   * @returns 角度值（弧度），范围[0, 2π]
   */
  angleToIn2PI(vector1: THREE.Vector3, vector2: THREE.Vector3, normal?: THREE.Vector3): number;

  /**
   * 将3D点投影到2D平面坐标系
   * @param plane - 投影平面定义
   * @param point - 待投影的3D点
   * @returns 平面坐标系中的3D坐标（x,y为平面坐标，z为距平面的距离）
   */
  projection2DPoint(plane: ProjectionPlane, point: THREE.Vector3): THREE.Vector3;

  /**
   * 将模型空间点转换为屏幕坐标
   * @param point - 模型空间中的点
   * @param camera - 相机对象
   * @returns 屏幕坐标（像素）
   */
  modelPointToScreenPoint(point: THREE.Vector3, camera: THREE.Camera): ScreenPoint;
};

export default VectorUtils;