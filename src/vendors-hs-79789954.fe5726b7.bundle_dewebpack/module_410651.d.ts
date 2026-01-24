/**
 * 三维坐标系转换工具模块
 * 提供平面与世界坐标系之间的转换矩阵计算功能
 */

import * as THREE from 'three';

/**
 * 平面定义接口
 */
interface Plane {
  /** 平面法向量 */
  normal: THREE.Vector3;
  /** 平面常数（平面方程 ax + by + cz + d = 0 中的 d） */
  constant: number;
  /** 可选的 X 轴参考射线，用于确定平面的坐标系方向 */
  xRay?: THREE.Vector3;
}

/**
 * 平面坐标轴系统
 */
interface PlaneAxes {
  /** 平面局部坐标系的 X 轴方向 */
  xAxis: THREE.Vector3;
  /** 平面局部坐标系的 Y 轴方向 */
  yAxis: THREE.Vector3;
  /** 平面局部坐标系的 Z 轴方向（法向量） */
  zAxis: THREE.Vector3;
}

/**
 * 坐标系转换工具类
 * 提供世界坐标系与局部坐标系之间的转换矩阵计算
 */
declare const CoordinateTransformUtils: {
  /**
   * 计算从世界坐标系到平面局部坐标系的转换矩阵
   * @param plane - 目标平面定义
   * @returns 4x4 变换矩阵
   */
  worldToPlaneLocalMatrix(plane: Plane): THREE.Matrix4;

  /**
   * 计算两个坐标系之间的变换矩阵
   * @param sourceAxes - 源坐标系的轴向量数组 [xAxis, yAxis, origin?]
   * @param targetAxes - 目标坐标系的轴向量数组 [xAxis, yAxis, origin?]
   * @returns 从源坐标系到目标坐标系的变换矩阵
   */
  getTranformMatrix(
    sourceAxes: [THREE.Vector3, THREE.Vector3, THREE.Vector3?],
    targetAxes: [THREE.Vector3, THREE.Vector3, THREE.Vector3?]
  ): THREE.Matrix4;

  /**
   * 计算从世界坐标系到自定义局部坐标系的转换矩阵
   * @param origin - 局部坐标系原点
   * @param xAxis - 局部坐标系 X 轴方向
   * @param yAxis - 局部坐标系 Y 轴方向
   * @param zAxis - 局部坐标系 Z 轴方向
   * @returns 世界坐标系到局部坐标系的变换矩阵（逆矩阵）
   */
  worldToLocalMatrix(
    origin: THREE.Vector3,
    xAxis: THREE.Vector3,
    yAxis: THREE.Vector3,
    zAxis: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 计算从局部坐标系到世界坐标系的转换矩阵
   * @param origin - 局部坐标系原点
   * @param xAxis - 局部坐标系 X 轴方向
   * @param yAxis - 局部坐标系 Y 轴方向
   * @param zAxis - 局部坐标系 Z 轴方向
   * @returns 局部坐标系到世界坐标系的变换矩阵
   */
  localToWorldMatrix(
    origin: THREE.Vector3,
    xAxis: THREE.Vector3,
    yAxis: THREE.Vector3,
    zAxis: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 计算对齐两个坐标系的变换矩阵
   * @param sourceOrigin - 源坐标系原点
   * @param sourceXAxis - 源坐标系 X 轴
   * @param sourceYAxis - 源坐标系 Y 轴
   * @param sourceZAxis - 源坐标系 Z 轴
   * @param targetOrigin - 目标坐标系原点
   * @param targetXAxis - 目标坐标系 X 轴
   * @param targetYAxis - 目标坐标系 Y 轴
   * @param targetZAxis - 目标坐标系 Z 轴
   * @returns 对齐变换矩阵
   */
  alignCoordinateSystemMatrix(
    sourceOrigin: THREE.Vector3,
    sourceXAxis: THREE.Vector3,
    sourceYAxis: THREE.Vector3,
    sourceZAxis: THREE.Vector3,
    targetOrigin: THREE.Vector3,
    targetXAxis: THREE.Vector3,
    targetYAxis: THREE.Vector3,
    targetZAxis: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 根据平面定义计算平面的局部坐标系轴
   * @param plane - 平面定义
   * @returns 平面的 X、Y、Z 轴向量
   * @private
   */
  _getPlaneAxes(plane: Plane): PlaneAxes;
};

export default CoordinateTransformUtils;