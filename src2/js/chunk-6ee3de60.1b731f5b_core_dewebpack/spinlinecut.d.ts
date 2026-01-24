/**
 * 旋转线切割模块
 * 用于处理多边形的旋转线分割操作
 */

import { Point, Segment } from './geometry';
import { ToolType } from './tool-type';
import { WinPolygon } from './win-polygon';
import { ShapeElement, SplitterLine, Splitter, PointCut } from './splitter';

/**
 * 交叉点信息
 */
interface CrossPoint {
  /** 交叉点坐标 */
  poly: Point;
  /** 交叉线段 */
  line: Segment;
}

/**
 * 分割结果多边形
 */
interface SplitResult extends WinPolygon {
  /** 是否为竖梃 */
  IsMullion?: boolean;
  /** 分割线信息 */
  spLine?: {
    line: SplitterLine;
  };
  /** 编辑工具类型 */
  editTool?: ToolType;
  /** 多边形ID信息 */
  polyId: {
    /** 位置索引 */
    pos: number;
  };
}

/**
 * 链接边结果
 */
interface LinkEdgesResult {
  /** 生成的多边形 */
  poly: WinPolygon;
  /** 索引位置 */
  idx: number;
}

/**
 * 旋转线切割类
 * 用于通过旋转分割线对多边形进行切割操作
 */
export declare class SpinLineCut {
  /** 待切割的多边形 */
  private readonly polygon: WinPolygon;
  
  /** 分割线对象 */
  private readonly sline: SplitterLine;
  
  /** 点切割器 */
  private readonly ptCutor: PointCut;

  /**
   * 构造函数
   * @param polygon - 待切割的多边形
   * @param sline - 用于切割的旋转线
   */
  constructor(polygon: WinPolygon, sline: SplitterLine);

  /**
   * 执行分割操作
   * @param offset - 分割偏移量
   * @returns 分割后生成的多边形数组
   * @throws 当交叉点未正确找到时抛出错误
   */
  split(offset: number): SplitResult[];

  /**
   * 链接边缘元素
   * @param currentIndex - 当前索引
   * @param crossPoints - 交叉点数组
   * @param orientation - 方向标志（true表示方向一致）
   * @returns 包含多边形和索引的结果对象
   */
  private linkEdges(
    currentIndex: number,
    crossPoints: CrossPoint[],
    orientation: boolean
  ): LinkEdgesResult;
}