/**
 * 绘制圆角请求模块
 * 
 * 用于在2D草图中处理圆角绘制操作，继承自基础圆角请求类。
 * 主要功能包括添加圆角弧、移除圆角面以及执行绘制请求。
 * 
 * @module DrawFilletRequest
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, PolyCurve, MathAlg } from './geometry';
import { HSFPConstants } from './constants';

/**
 * 圆角弧数据接口
 */
interface FilletArcData {
  /** 第一条边 */
  edge1: Edge2d;
  /** 第二条边 */
  edge2: Edge2d;
  /** 圆角弧线 */
  filletArc: Arc2d;
}

/**
 * 边缘对象接口
 */
interface Edge2d {
  /** 边的曲线 */
  curve: Curve2d;
  /** 是否为背景边 */
  isBackground: boolean;
}

/**
 * 曲线基础接口
 */
interface Curve2d {
  // 曲线基础属性和方法
}

/**
 * 圆弧接口
 */
interface Arc2d extends Curve2d {
  /** 获取圆弧起点 */
  getStartPt(): Point2d;
  /** 获取圆弧终点 */
  getEndPt(): Point2d;
}

/**
 * 二维点接口
 */
interface Point2d {
  x: number;
  y: number;
}

/**
 * 区域数据接口
 */
interface RegionData {
  /** 外轮廓曲线数组 */
  outer: Array<{ curve: Curve2d }>;
  /** 内孔数组 */
  holes: never[];
  /** 拓扑标识 */
  topo: string;
}

/**
 * 草图面信息接口
 */
interface SketchFaceInfo {
  /** 面对象 */
  face: {
    /** 拓扑名称 */
    topoName?: string;
  };
  /** 线框对象 */
  wire: {
    /** 转换为数学循环 */
    toMathLoop(): PolyCurve;
  };
  /** 是否为外轮廓 */
  isOuter: boolean;
}

/**
 * 草图2D构建器接口
 */
interface Sketch2dBuilder {
  /** 添加区域 */
  addRegions(regions: RegionData[]): void;
  /** 获取草图对象 */
  getSketch(): Sketch2d | null;
  /** 更新附录信息 */
  updateAppendix(): void;
}

/**
 * 草图2D对象接口
 */
interface Sketch2d {
  // 草图基础属性
}

/**
 * 外部区域绘制-圆角请求类
 * 
 * 继承自基础圆角请求，专门用于处理户外绘图场景中的圆角操作。
 * 
 * @extends HSApp.ExtraordinarySketch2d.Request.DrawFilletRequest
 */
export declare class DrawFilletRequest extends HSApp.ExtraordinarySketch2d.Request.DrawFilletRequest {
  /**
   * 草图2D构建器实例
   */
  private sketch2dBuilder: Sketch2dBuilder;

  /**
   * 构造函数
   * 
   * @param sketch2dBuilder - 草图2D构建器实例
   * @param param2 - 第二个参数（类型待定）
   * @param param3 - 第三个参数（类型待定）
   */
  constructor(sketch2dBuilder: Sketch2dBuilder, param2: unknown, param3: unknown);

  /**
   * 添加圆角弧到草图中
   * 
   * 根据两条边和圆角弧生成新的区域，并添加到草图构建器中。
   * 对于每组圆角数据，会：
   * 1. 提取两条边的交点
   * 2. 创建从圆角终点到交点、交点到圆角起点的连接线
   * 3. 组合成完整的外轮廓
   * 
   * @param filletArcs - 圆角弧数据数组
   */
  addFilletArcs(filletArcs: FilletArcData[]): void;

  /**
   * 判断是否需要移除圆角面
   * 
   * 检查两条边之间是否需要移除圆角面，判断逻辑：
   * 1. 如果任一边为背景边，返回 false
   * 2. 检查边所属的草图面是否有拓扑名称
   * 3. 如果有拓扑名称，检查圆角弧是否与面轮廓相交
   * 4. 如果无拓扑名称，检查是否存在非外轮廓的面
   * 
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @param filletArc - 圆角弧线
   * @returns 是否需要移除圆角面
   */
  needRemoveFilletFace(edge1: Edge2d, edge2: Edge2d, filletArc: Arc2d): boolean;

  /**
   * 执行绘制请求
   * 
   * 调用父类的 doRequest 方法并更新草图附录信息。
   */
  doRequest(): void;

  /**
   * 获取操作描述
   * 
   * @returns 操作描述字符串："外部区域绘制-倒角"
   */
  getDescription(): string;

  /**
   * 获取日志分类
   * 
   * @returns 日志分组类型：户外绘图
   */
  getCategory(): string;
}