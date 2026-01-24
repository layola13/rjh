import { Scene, Vector3, Color3, Color4, Mesh } from '@babylonjs/core';

/**
 * 线条配置选项接口
 */
export interface LineOptions {
  /** 线条颜色 */
  color: Color3;
  /** 虚线段长度 */
  dashSize: number;
  /** 虚线间隙长度 */
  dashGapSize: number;
  /** 虚线段数量 */
  dashNb: number;
}

/**
 * 线条数据接口
 */
export interface LineData {
  /** 起点坐标 */
  p0: Vector3;
  /** 终点坐标 */
  p1: Vector3;
  /** 可选的线条颜色，如未指定则使用默认配置 */
  color?: Color3;
}

/**
 * 线条类型枚举
 */
export enum LineType {
  /** 虚线 */
  Dashed = 0,
  /** 实线 */
  Solid = 1
}

/**
 * 线条绘制工具类
 * 提供在Babylon.js场景中绘制实线和虚线的功能
 */
export default class LineDrawer {
  /** 默认线条配置选项 */
  static lineOption: LineOptions;

  /** Babylon.js场景实例 */
  private static scene: Scene;

  /**
   * 初始化线条绘制器
   * @param scene - Babylon.js场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 批量绘制线条
   * @param lines - 线条数据数组
   * @param lineType - 线条类型，0为虚线，1为实线，默认为0
   */
  static DrawLines(lines: LineData[], lineType?: LineType): void;

  /**
   * 绘制单条虚线
   * @param lineData - 线条数据
   * @returns 创建的虚线网格
   */
  static DrawDashedLine(lineData: LineData): Mesh;

  /**
   * 绘制单条实线
   * @param lineData - 线条数据
   * @returns 创建的实线网格
   */
  static DrawSolidLine(lineData: LineData): Mesh;
}