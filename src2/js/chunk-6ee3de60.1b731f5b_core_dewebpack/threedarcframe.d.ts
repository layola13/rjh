import Flatten from "@flatten-js/core";
import { Utils } from "./utils";
import { ArcUtils } from "./arc-utils";
import { WallTool, ToolType } from "./tools";
import { DrawParams, Artisan } from "./drawing";
import { Frame, Text, TextAlign, WinPolygon, ThreeDimensionalArcPoly } from "./shapes";

/**
 * 3D圆弧框架的深度结构配置
 */
interface DepthStructure {
  /** 框架深度 */
  frame: number;
  /** 固定珠深度 */
  fixedBead: number;
  /** 固定部分深度 */
  fixed: number;
  /** 窗扇深度数组 */
  sash: number[];
  /** 窗扇玻璃深度 */
  sashGlass: number;
}

/**
 * 文本偏移配置
 */
interface TextOffsetConfig {
  /** 弦长文本偏移 */
  cl: { x: number; y: number };
  /** 3D高度文本偏移 */
  th: { x: number; y: number };
}

/**
 * 序列化数据结构
 */
interface SerializedData {
  /** 版本号 */
  v?: number;
  /** 3D高度 */
  tdh?: number;
  /** 3D弦长 */
  tcl?: number;
  /** 圆弧面是否朝内 */
  afi?: boolean;
  /** 文本偏移配置 */
  txt?: TextOffsetConfig;
  /** 是否使用短圆弧标注 */
  sad?: boolean;
  /** 深度结构配置 */
  ds?: DepthStructure;
}

/**
 * 线条渲染选项
 */
interface LineRenderOptions {
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}

/**
 * 3D圆弧框架类
 * 用于表示和操作具有圆弧特征的3D门窗框架
 */
export declare class ThreedArcFrame extends Frame {
  /** 视图引用 */
  private readonly view: any;
  
  /** 虚拟形状数组（用于渲染） */
  private vshapes: any[];
  
  /** 形状数组 */
  private shapes: any[];
  
  /** 圆弧面是否朝内 */
  arcFaceInner: boolean;
  
  /** 3D高度（圆弧矢高） */
  threedHeight: number;
  
  /** 3D弦长 */
  threedChordLength: number;
  
  /** 3D高度文本标注 */
  private readonly threedHeightText: Text;
  
  /** 弦长文本标注 */
  private readonly chordLengthText: Text;
  
  /** 是否使用短圆弧标注 */
  shortArcDim: boolean;
  
  /** 深度结构配置 */
  depthStruct: DepthStructure;

  /**
   * 构造函数
   * @param polygon - 多边形对象
   * @param view - 视图对象
   * @param isNew - 是否为新建对象
   */
  constructor(polygon: any, view: any, isNew?: boolean);

  /**
   * 获取框架面积（圆弧长度 × 高度）
   */
  get area(): number;

  /**
   * 获取顶视图中的圆弧
   */
  get arcInTopView(): Flatten.Arc;

  /**
   * 获取宽度边（底边）
   */
  get widthEdge(): Flatten.Segment;

  /**
   * 获取上边缘
   */
  get upEdge(): Flatten.Segment | Flatten.Arc;

  /**
   * 获取下边缘
   */
  get downEdge(): Flatten.Segment | Flatten.Arc;

  /**
   * 获取左边缘
   */
  get leftEdge(): Flatten.Segment | Flatten.Arc;

  /**
   * 获取右边缘
   */
  get rightEdge(): Flatten.Segment | Flatten.Arc;

  /**
   * 获取框架高度
   */
  get height(): number;

  /**
   * 获取圆弧半径
   */
  get radius(): number;

  /**
   * 获取圆弧长度
   */
  get arcLength(): number;

  /**
   * 查找关联的墙体
   * @param isUpEdge - 是否查找上边缘关联的墙体
   * @returns 找到的墙体对象或undefined
   */
  findWall(isUpEdge?: boolean): any | undefined;

  /**
   * 获取墙体高度
   * @param wall - 墙体对象
   * @returns 墙体高度
   */
  wallHeight(wall: any): number;

  /**
   * 移除墙体
   * @param wall - 要移除的墙体对象
   */
  removeWall(wall: any): void;

  /**
   * 添加墙体
   * @param height - 墙体高度
   * @param isUpEdge - 是否在上边缘添加
   */
  appendWall(height: number, isUpEdge?: boolean): void;

  /**
   * 在顶视图中创建圆弧
   * @param chordLength - 弦长
   * @param archHeight - 矢高
   * @returns 创建的圆弧对象
   */
  makeArcInTopView(chordLength: number, archHeight: number): Flatten.Arc;

  /**
   * 绘制框架
   * @param layer - 目标图层
   */
  draw(layer: any): void;

  /**
   * 添加中挺（竖向或横向分隔条）
   * @param line - 中挺线条对象
   * @returns 是否添加成功
   */
  addMullion(line: Flatten.Line | Flatten.Segment): boolean;

  /**
   * 序列化为JSON
   * @returns 序列化后的数据对象
   */
  toJSON(): SerializedData & Record<string, any>;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的数据对象
   * @param view - 视图对象
   */
  deserialize(data: SerializedData, view: any): void;

  /**
   * 更新辅助图形（标注文本等）
   */
  updateAuxiliary(): void;

  /**
   * 重置圆弧形状
   */
  resetArc(): void;

  /**
   * 回收资源
   * @param deep - 是否深度回收
   */
  recycle(deep?: boolean): void;

  /**
   * 创建线条渲染数据
   * @param start - 起点
   * @param end - 终点
   * @param strokeWidth - 线宽
   * @param options - 额外渲染选项
   * @returns 线条多边形和渲染选项的元组
   */
  private line(
    start: Flatten.Point,
    end: Flatten.Point,
    strokeWidth?: number,
    options?: LineRenderOptions
  ): [WinPolygon, LineRenderOptions];

  /**
   * 创建虚线渲染数据
   * @param start - 起点
   * @param end - 终点
   * @param strokeWidth - 线宽
   * @returns 虚线多边形和渲染选项的元组
   */
  private dashLine(
    start: Flatten.Point,
    end: Flatten.Point,
    strokeWidth?: number
  ): [WinPolygon, LineRenderOptions];

  /**
   * 更新框架几何形状
   * @param updateDimensions - 是否更新标注尺寸
   */
  updateFrame(updateDimensions?: boolean): void;

  /**
   * 根据半径更新弦长和矢高
   */
  private updateChordByRadius(): void;

  /**
   * 拖拽圆弧边
   * @param edgeIndex - 边的索引
   * @param offset - 偏移向量
   */
  dragArc(edgeIndex: number, offset: Flatten.Vector): void;

  /**
   * 拖拽框架
   * @param edgeIndex - 边的索引
   * @param offset - 偏移向量
   * @param anchorPoint - 锚点
   * @returns 是否拖拽成功
   */
  dragFrame(
    edgeIndex: number,
    offset: Flatten.Vector,
    anchorPoint?: Flatten.Point
  ): boolean;

  /**
   * 拖拽3D圆弧时更新中挺
   * @param oldMulShape - 旧的中挺形状
   */
  private dragThreeDimensionArc(
    oldMulShape: Flatten.Segment | Flatten.Arc
  ): void;

  /**
   * 编辑圆弧标注
   * @param edgeIndex - 边的索引
   * @param offset - 偏移量
   */
  editArcDim(edgeIndex: number, offset: number): void;

  /**
   * 编辑弦长标注
   * @param edgeIndex - 边的索引
   * @param newLength - 新的长度
   */
  editChordDim(edgeIndex: number, newLength: number): void;

  /**
   * 更新标注文本
   * @param label - 标注标签
   * @param value - 新值
   */
  updateDimText(label: string, value: number): void;

  /**
   * 更新弦长
   * @param newChordLength - 新的弦长
   */
  private updateChordLength(newChordLength: number): void;

  /**
   * 更新矢高
   * @param newArchHeight - 新的矢高
   */
  private updateChordHeight(newArchHeight: number): void;

  /**
   * 平移框架
   * @param offset - 偏移向量
   */
  translate(offset: Flatten.Vector): void;
}