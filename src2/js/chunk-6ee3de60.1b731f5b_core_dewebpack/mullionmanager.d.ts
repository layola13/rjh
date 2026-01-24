/**
 * MullionManager 模块 - 处理窗框分隔条(mullion)的管理
 * 包括分隔条的添加、拖拽、删除以及装饰条的管理
 */

import { Segment } from 'paper';
import { MullionRobot } from './MullionRobot';
import { SplitterAgent, SplitterObj } from './SplitterAgent';
import { EventType, FillerSettings, BarModifier } from './EventBus';
import { FillerManager, DecorationBarManager } from './FillerManager';
import { Bar, Frame, Sash, Area, Shade, ShapeType, Shape } from './Shape';
import { HitResult, Utils, PolyId, DockManager } from './Utils';

/**
 * 添加装饰条的返回结果枚举
 */
export enum addDecorationBarRet {
  /** 不在有效区域内 */
  notInArea = "notInArea",
  /** 已经存在 */
  alreadyExist = "alreadyExist",
  /** 创建成功 */
  create = "create"
}

/**
 * 分隔条高度配置接口
 */
interface PullingHeight {
  /** 多边形ID */
  polyId: PolyId;
  /** 高度值 */
  height: number;
}

/**
 * 序列化数据接口
 */
interface SerializedMullionData {
  /** 分隔条对象数组 */
  sp: unknown[];
  /** 填充管理器数据 */
  fls: unknown;
  /** 线条轮廓尺寸数组 */
  lpfs?: number[];
  /** 装饰条数据 */
  dbs: unknown;
  /** 拉伸高度配置 */
  phs?: Array<{
    polyId: { idx: number; pos: number };
    height: number;
  }>;
}

/**
 * 装饰条配置接口
 */
interface DecorationBarConfig {
  /** 多边形 */
  polygon: unknown;
  /** 装饰条对象 */
  decorationBar: {
    /** 宿主多边形 */
    hostPoly: unknown;
  };
}

/**
 * 对齐的分隔条信息接口
 */
interface AlignedBarInfo {
  /** 宿主对象 */
  iHost: unknown;
  /** 分隔条实例 */
  bar: Bar;
}

/**
 * MullionManager - 分隔条管理器
 * 负责管理窗框中的分隔条(mullion)、玻璃区域(glass)和装饰条(decoration bar)
 */
export declare class MullionManager {
  /** 宿主对象(Frame或Sash) */
  readonly host: Frame | Sash;
  
  /** 填充类型 */
  readonly fillType: ShapeType;
  
  /** 分隔条/玻璃的位置类型 */
  readonly where: ShapeType;
  
  /** 分隔条分割代理 */
  readonly splitter: SplitterAgent;
  
  /** 填充管理器 */
  readonly fillerManager: FillerManager;
  
  /** 装饰条管理器 */
  readonly decorationBarManager: DecorationBarManager;
  
  /** 分隔条机器人(UI辅助工具) */
  mullionRobot?: MullionRobot;

  /**
   * 构造函数
   * @param host - 宿主对象(Frame或Sash)
   * @param fillType - 填充类型，默认为Glass
   */
  constructor(host: Frame | Sash, fillType?: ShapeType);

  /**
   * 设置所有轮廓尺寸
   */
  set allProfileSize(size: number);

  /**
   * 添加分隔条
   * @param splitData - 分隔数据
   * @returns 是否添加成功
   */
  addMullion(splitData: unknown): boolean;

  /**
   * 添加装饰条
   * @param point - 添加位置点
   * @param config - 装饰条配置
   * @returns 添加结果状态
   */
  addDecorationBar(point: unknown, config: DecorationBarConfig): addDecorationBarRet;

  /**
   * 拖拽分隔条
   * @param bar - 要拖拽的分隔条
   * @param offset - 偏移量
   * @returns 是否拖拽成功
   */
  dragMullion(bar: Bar, offset: unknown): boolean;

  /**
   * 拖拽内部分隔条
   * @param barIndex - 分隔条索引
   * @param offset - 偏移量
   * @param dragData - 拖拽数据
   * @returns 是否拖拽成功
   */
  dragInnerMullion(barIndex: number, offset: unknown, dragData: unknown): boolean;

  /**
   * 删除高亮的分隔条
   * @param context - 绘图上下文
   * @param sashManager - 窗扇管理器(可选)
   */
  delete(context: unknown, sashManager?: unknown): void;

  /**
   * 序列化为JSON
   * @returns 序列化后的数据对象
   */
  toJSON(): SerializedMullionData;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的数据(数组或对象格式)
   */
  deserialize(data: unknown[] | SerializedMullionData): void;

  /**
   * 清除所有子元素(分隔条、玻璃、装饰条)
   */
  clear(): void;

  /**
   * 更新多边形
   * @param shouldMerge - 是否合并填充区域，默认为false
   */
  updatePoly(shouldMerge?: boolean): void;

  /**
   * 设置分隔操作符
   * @param lineIndex - 线条索引
   * @param isStart - 是否为起点
   * @param splitOperator - 分隔操作符
   */
  setSplitOperator(lineIndex: number, isStart: boolean, splitOperator: unknown): void;

  /**
   * 获取停靠管理器
   */
  get dockMgr(): DockManager;

  /**
   * 获取用于标注的停靠管理器(过滤掉隐藏的标注点)
   */
  get dockMgrForDim(): DockManager;

  /**
   * 是否有分隔条
   */
  get hasSplitBar(): boolean;

  /**
   * 获取所有分隔条
   */
  get bars(): Bar[];

  /**
   * 获取所有玻璃区域
   */
  get glasses(): Area[];

  /**
   * 获取所有遮阳区域
   */
  get shades(): Shade[];

  /**
   * 平移所有元素
   * @param offset - 偏移向量
   */
  translate(offset: unknown): void;

  /**
   * 捕捉边缘
   * @param point - 测试点
   * @param tolerance - 容差
   * @param snapData - 捕捉数据
   * @returns 捕捉结果
   */
  snapEdge(point: unknown, tolerance: number, snapData: unknown): unknown;

  /**
   * 获取所有与指定分隔条对齐的分隔条
   * @param bar - 参考分隔条
   * @returns 对齐的分隔条信息数组
   */
  static allBarsAlignedWith(bar: Bar): AlignedBarInfo[];

  /**
   * 是否所有元素都未激活
   */
  get inactive(): boolean;

  /**
   * 高亮所有元素
   * @param shouldHighlight - 是否高亮
   */
  highlight(shouldHighlight: boolean): void;

  /**
   * 分隔条点击测试
   * @param point - 测试点
   * @param view - 视图对象
   * @returns 点击测试结果
   */
  hitBar(point: unknown, view: unknown): HitResult;

  /**
   * 刷新分隔条机器人(UI辅助工具)
   * @param view - 视图对象
   * @param bar - 要附加的分隔条
   */
  refreshMullionRobot(view: unknown, bar: Bar): void;

  /**
   * 显示分隔条机器人
   * @param view - 视图对象
   * @param bar - 要附加的分隔条(可选，默认为高亮的分隔条)
   */
  showMullionRobot(view: unknown, bar?: Bar): void;

  /**
   * 隐藏辅助工具
   */
  hideAssist(): void;

  /**
   * 刷新显示
   * @param context - 绘图上下文
   */
  refresh(context: unknown): void;

  /**
   * 设置边缘宽度
   * @param lineIndex - 线条索引
   * @param width - 宽度值
   * @param context - 绘图上下文
   */
  setEdgeWidth(lineIndex: number, width: number, context: unknown): void;

  /**
   * 添加填充区域(回调函数)
   * @param polygon - 多边形
   */
  readonly addFiller: (polygon: unknown) => void;

  /**
   * 移除填充区域(回调函数)
   * @param filler - 填充对象
   */
  readonly removeFiller: (filler: unknown) => void;

  /**
   * 查找多边形(回调函数)
   * @param polyId - 多边形ID
   */
  readonly findPoly: (polyId: PolyId) => unknown;

  /**
   * 点击测试(回调函数)
   * @param point - 测试点
   */
  readonly hitTest: (point: unknown) => unknown;
}