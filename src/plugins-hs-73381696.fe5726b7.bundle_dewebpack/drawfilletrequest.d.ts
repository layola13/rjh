/**
 * Module: DrawFilletRequest
 * 楼板编辑倒角请求类
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, PolyCurve, MathAlg } from './geometry';
import { HSFPConstants } from './constants';

/**
 * 圆角边缘信息
 */
interface FilletEdgeInfo {
  /** 第一条边 */
  edge1: Sketch2dEdge;
  /** 第二条边 */
  edge2: Sketch2dEdge;
  /** 圆角弧线 */
  filletArc: Arc2d;
}

/**
 * 草图2D边缘
 */
interface Sketch2dEdge {
  /** 边缘曲线 */
  curve: Curve2d;
  /** 是否为背景边 */
  isBackground: boolean;
}

/**
 * 草图2D面信息
 */
interface Sketch2dFaceInfo {
  /** 面对象 */
  face: {
    /** 拓扑名称 */
    topoName?: string;
  };
  /** 线框 */
  wire: {
    /** 转换为数学环路 */
    toMathLoop(): PolyCurve;
  };
  /** 是否为外部面 */
  isOuter: boolean;
}

/**
 * 2D曲线基类
 */
interface Curve2d {
  // 曲线接口定义
}

/**
 * 2D圆弧
 */
interface Arc2d extends Curve2d {
  /** 获取起点 */
  getStartPt(): Point2d;
  /** 获取终点 */
  getEndPt(): Point2d;
}

/**
 * 2D点
 */
interface Point2d {
  x: number;
  y: number;
}

/**
 * 区域定义
 */
interface Region2d {
  /** 外边界曲线列表 */
  outer: Array<{ curve: Curve2d }>;
  /** 孔洞列表 */
  holes: Array<{ curve: Curve2d }>;
  /** 拓扑标识 */
  topo: string;
}

/**
 * 草图2D构建器
 */
interface Sketch2dBuilder {
  /** 添加区域 */
  addRegions(regions: Region2d[]): void;
  /** 获取草图对象 */
  getSketch(): Sketch2d | null;
  /** 更新图层 */
  updateLayer(): void;
}

/**
 * 草图2D对象
 */
interface Sketch2d {
  // 草图接口定义
}

/**
 * 绘制圆角请求类
 * 用于楼板编辑时的倒角操作
 */
export declare class DrawFilletRequest extends HSApp.ExtraordinarySketch2d.Request.DrawFilletRequest {
  /** 草图2D构建器实例 */
  protected sketch2dBuilder: Sketch2dBuilder;

  /**
   * 构造函数
   * @param sketch2dBuilder - 草图2D构建器
   * @param param2 - 第二个参数（具体类型需根据父类确定）
   * @param param3 - 第三个参数（具体类型需根据父类确定）
   */
  constructor(sketch2dBuilder: Sketch2dBuilder, param2: unknown, param3: unknown);

  /**
   * 添加圆角弧线到草图
   * @param filletEdges - 圆角边缘信息数组
   */
  addFilletArcs(filletEdges: FilletEdgeInfo[]): void;

  /**
   * 判断是否需要移除圆角面
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @param filletArc - 圆角弧线
   * @returns 是否需要移除
   */
  needRemoveFilletFace(edge1: Sketch2dEdge, edge2: Sketch2dEdge, filletArc: Arc2d): boolean;

  /**
   * 执行请求
   * 更新草图图层
   */
  doRequest(): void;

  /**
   * 获取操作描述
   * @returns 操作描述文本
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 日志分组类型
   */
  getCategory(): string;
}