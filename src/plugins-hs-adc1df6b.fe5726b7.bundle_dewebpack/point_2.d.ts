/**
 * 2D点绘制模块
 * 提供户外绘图场景下的点对象及其控制器实现
 */

import { HSApp } from './HSApp';

declare namespace HSFPConstants {
  namespace CommandType {
    namespace OutdoorDrawing {
      const MovePoint: string;
    }
  }
}

/**
 * 2D点类
 * 扩展自基础Point2d，用于户外绘图场景
 */
export declare class Point extends HSApp.View.SVG.ExtraordinarySketch2d.Point2d {
  /**
   * 构造函数
   * @param x - X坐标
   * @param y - Y坐标
   * @param style - 样式对象
   * @param container - 容器元素/引用
   */
  constructor(
    x: number,
    y: number,
    style: unknown,
    container: unknown
  );
}

/**
 * 2D点控制器（内部实现）
 * 处理点的移动命令
 */
declare class Point2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Point2dController {
  /**
   * 获取移动命令类型
   * @returns 返回户外绘图的移动点命令类型
   */
  protected _getMoveCmdType(): string;
}

/**
 * HSApp命名空间声明（框架依赖）
 */
declare namespace HSApp.View.SVG.ExtraordinarySketch2d {
  /**
   * 基础2D点类
   */
  class Point2d {
    constructor(
      x: number,
      y: number,
      style: unknown,
      container: unknown,
      controller: Point2dController
    );
  }

  /**
   * 基础2D点控制器
   */
  class Point2dController {
    constructor(container: unknown, point: Point2d);
  }
}