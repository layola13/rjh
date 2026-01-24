import type { Scene, Vector3, Color3, LinesMesh } from '@babylonjs/core';

/**
 * 调试绘制工具类
 * 提供在3D场景中绘制线条、三角形等辅助图形的静态方法
 */
export default class DebugDrawer {
  /**
   * 当前使用的Babylon.js场景实例
   */
  private static scene: Scene;

  /**
   * 初始化调试绘制器
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void;

  /**
   * 在场景中绘制单条线段
   * @param points - 构成线段的顶点数组
   * @param color - 线条颜色，默认为黄色
   * @returns 创建的线条网格对象
   */
  static drawLine(points: Vector3[], color?: Color3): LinesMesh;

  /**
   * 在场景中绘制多条线段
   * @param lines - 多条线段的顶点数组集合，每个元素是一条线的顶点数组
   * @param color - 线条颜色，默认为黄色
   * @returns 创建的线条系统网格对象
   */
  static drawLines(lines: Vector3[][], color?: Color3): LinesMesh;

  /**
   * 在场景中绘制多个三角形的边框
   * @param triangles - 三角形顶点数组集合，每个元素包含3个顶点表示一个三角形
   * @param color - 线条颜色，默认为黄色
   * @returns 创建的线条系统网格对象
   */
  static drawTriangles(triangles: [Vector3, Vector3, Vector3][], color?: Color3): LinesMesh;
}