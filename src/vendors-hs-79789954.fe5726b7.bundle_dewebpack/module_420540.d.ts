/**
 * 圆弧曲线工具模块
 * 提供圆弧的创建、相交检测、参数计算等几何运算功能
 */

import * as THREE from 'three';

/**
 * 位置类型枚举
 */
export enum PositionType {
  // 从导入的模块中定义
}

/**
 * 圆弧/圆的基础参数接口
 */
export interface ArcParams {
  /** 圆心X坐标 */
  aX: number;
  /** 圆心Y坐标 */
  aY: number;
  /** X轴半径 */
  xRadius: number;
  /** 起始角度（弧度） */
  aStartAngle: number;
  /** 结束角度（弧度） */
  aEndAngle: number;
  /** 是否为顺时针方向 */
  aClockwise: boolean;
}

/**
 * 相交信息接口
 */
export interface IntersectionInfo {
  /** 相交点数组 */
  intersects: THREE.Vector3[];
  /** 参数数组 */
  params: number[];
}

/**
 * 圆弧-直线相交信息接口
 */
export interface ArcLineIntersectionInfo extends IntersectionInfo {
  /** 圆弧参数数组 */
  arcParams: number[];
  /** 直线参数数组 */
  lineParams: number[];
}

/**
 * 圆弧-圆弧相交信息接口
 */
export interface ArcArcIntersectionInfo extends IntersectionInfo {
  /** 第一个圆弧的参数数组 */
  arc1Params: number[];
  /** 第二个圆弧的参数数组 */
  arc2Params: number[];
}

/**
 * 中心点和半径信息接口
 */
export interface CenterRadiusInfo {
  /** 圆心位置 */
  center: THREE.Vector3;
  /** 半径 */
  radius: number;
}

/**
 * 将角度归一化到 [0, 2π) 范围内
 * @param angle - 输入角度（弧度）
 * @returns 归一化后的角度
 */
export function normalizeAngle(angle: number): number;

/**
 * 根据三点创建圆弧
 * @param startPoint - 起始点
 * @param endPoint - 结束点
 * @param center - 圆心
 * @param radius - 半径
 * @param clockwise - 是否顺时针
 * @returns THREE.ArcCurve 圆弧对象
 */
export function createArcFromPoints(
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  center: THREE.Vector3,
  radius: number,
  clockwise: boolean
): THREE.ArcCurve;

/**
 * 计算圆弧的矢高（sagitta）
 * @param startPoint - 起始点
 * @param endPoint - 结束点
 * @param point - 测量点
 * @param baseSagitta - 基础矢高
 * @param direction - 方向标志
 * @returns 计算后的矢高值
 */
export function getSagitta(
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  point: THREE.Vector3,
  baseSagitta: number,
  direction: boolean
): number;

/**
 * 根据矢高计算圆心和半径
 * @param startPoint - 起始点
 * @param endPoint - 结束点
 * @param sagitta - 矢高值
 * @returns 包含圆心和半径的对象，如果矢高无效则返回 undefined
 */
export function getCenterRadiusBySagitta(
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  sagitta: number
): CenterRadiusInfo | undefined;

/**
 * 获取圆弧的角度范围
 * @param arc - 圆弧参数
 * @returns 圆弧的角度（弧度）
 */
export function getArcAngle(arc: ArcParams): number;

/**
 * 获取点在圆弧上的参数值
 * @param arc - 圆弧参数
 * @param point - 目标点
 * @param reverseDirection - 是否反向计算
 * @returns 参数值 [0, 1] 范围内表示在圆弧上的位置
 */
export function getParameter(
  arc: ArcParams,
  point: THREE.Vector3,
  reverseDirection?: boolean
): number;

/**
 * 判断点是否在圆上
 * @param circle - 圆参数
 * @param point - 测试点
 * @param tolerance - 容差值
 * @returns 如果点在圆上返回 true
 */
export function isPointOnCircle(
  circle: ArcParams,
  point: THREE.Vector3,
  tolerance?: number
): boolean;

/**
 * 判断点是否在圆弧上
 * @param arc - 圆弧参数
 * @param point - 测试点
 * @param tolerance - 容差值
 * @returns 如果点在圆弧上返回 true
 */
export function isPointOnArc(
  arc: ArcParams,
  point: THREE.Vector3,
  tolerance?: number
): boolean;

/**
 * 获取圆与直线的相交点
 * @param circle - 圆参数
 * @param line - 直线对象
 * @returns 相交点数组
 */
export function getCircleLineIntersection(
  circle: ArcParams,
  line: THREE.Line3
): THREE.Vector3[];

/**
 * 获取圆与直线的相交信息
 * @param circle - 圆参数
 * @param line - 直线对象
 * @returns 包含相交点和参数的信息对象
 */
export function getCircleLineIntersectionInfo(
  circle: ArcParams,
  line: THREE.Line3
): IntersectionInfo;

/**
 * 获取圆弧与直线的相交信息
 * @param arc - 圆弧参数
 * @param line - 直线对象
 * @param reverseDirection - 是否反向计算参数
 * @returns 包含相交点、圆弧参数和直线参数的信息对象
 */
export function getArcLineIntersectionInfo(
  arc: ArcParams,
  line: THREE.Line3,
  reverseDirection?: boolean
): ArcLineIntersectionInfo;

/**
 * 获取圆弧与直线的相交点（带边界检查）
 * @param arc - 圆弧参数
 * @param line - 直线对象
 * @param checkArcBounds - 是否检查圆弧边界
 * @param checkLineBounds - 是否检查直线边界
 * @returns 相交点数组
 */
export function getArcLineIntersection(
  arc: ArcParams,
  line: THREE.Line3,
  checkArcBounds?: boolean,
  checkLineBounds?: boolean
): THREE.Vector3[];

/**
 * 获取两个圆的相交信息
 * @param circle1 - 第一个圆参数
 * @param circle2 - 第二个圆参数
 * @returns 包含相交点和参数的信息对象
 */
export function getCircleCircleIntersectionInfo(
  circle1: ArcParams,
  circle2: ArcParams
): IntersectionInfo;

/**
 * 获取两个圆的相交点
 * @param circle1 - 第一个圆参数
 * @param circle2 - 第二个圆参数
 * @returns 相交点数组
 */
export function getCircleCircleIntersection(
  circle1: ArcParams,
  circle2: ArcParams
): THREE.Vector3[];

/**
 * 获取两个圆弧的相交信息
 * @param arc1 - 第一个圆弧参数
 * @param arc2 - 第二个圆弧参数
 * @param reverseArc1 - 是否反向计算第一个圆弧参数
 * @param reverseArc2 - 是否反向计算第二个圆弧参数
 * @returns 包含相交点和两个圆弧参数的信息对象
 */
export function getArcArcIntersectionInfo(
  arc1: ArcParams,
  arc2: ArcParams,
  reverseArc1?: boolean,
  reverseArc2?: boolean
): ArcArcIntersectionInfo;

/**
 * 获取两个圆弧的相交点（带边界检查）
 * @param arc1 - 第一个圆弧参数
 * @param arc2 - 第二个圆弧参数
 * @param checkArc1Bounds - 是否检查第一个圆弧边界
 * @param checkArc2Bounds - 是否检查第二个圆弧边界
 * @returns 相交点数组
 */
export function getArcArcIntersection(
  arc1: ArcParams,
  arc2: ArcParams,
  checkArc1Bounds?: boolean,
  checkArc2Bounds?: boolean
): THREE.Vector3[];

/**
 * 获取点到圆弧的最近点
 * @param point - 测试点
 * @param arc - 圆弧参数
 * @returns 圆弧上最接近测试点的点
 */
export function getClosestPointToPoint(
  point: THREE.Vector3,
  arc: ArcParams
): THREE.Vector3;

/**
 * 获取圆弧的起点和终点
 * @param arc - 圆弧参数
 * @returns 包含起点和终点的数组 [startPoint, endPoint]
 */
export function getArcStartEndPoints(arc: ArcParams): [THREE.Vector3, THREE.Vector3];

/**
 * 判断两个圆弧是否相同
 * @param arc1 - 第一个圆弧参数
 * @param arc2 - 第二个圆弧参数
 * @returns 如果两个圆弧相同返回 true
 */
export function isSameArc(arc1: ArcParams, arc2: ArcParams): boolean;

export { PositionType };