/**
 * SlideSash 模块类型定义
 * 滑动窗扇组件，支持多轨道、多列布局，提供五金件管理、固定宽度控制等功能
 */

import { Point, Arc, Segment } from 'paper';
import { Sash, ShapeType } from './Sash';
import { DrawParams } from './DrawParams';
import { Utils } from './Utils';
import { EdgeFinder, Direction } from './EdgeFinder';
import { OpenDirection, OpenToward, SlideHardwareManager, PushSashHardwareManager } from './Hardware';

/**
 * 窗扇自定义属性集合
 */
export interface SashAttributes {
  [key: string]: unknown;
}

/**
 * 滑动窗扇序列化数据结构
 */
export interface SlideSashData {
  /** 轨道索引 */
  trackIndex: number;
  /** 列索引 */
  columnIndex: number;
  /** 固定宽度（-1表示隐藏） */
  fixedWidth: number;
  /** 是否为固定扇 */
  isFixed: boolean;
  /** 自定义属性 */
  attrs?: SashAttributes;
  /** 五金件管理器数据（兼容旧格式） */
  hm?: {
    isFixed?: boolean;
  };
}

/**
 * 滑动窗扇类
 * 继承自基础窗扇类，扩展滑动门窗特有功能：
 * - 多轨道布局管理
 * - 互锁检测
 * - 固定/活动扇切换
 * - 推拉五金件自动配置
 */
export declare class SlideSash extends Sash {
  /** 所属主机（窗户/门对象） */
  readonly host: SlideSashHost;
  
  /** 所在轨道索引（0为外轨） */
  trackIndex: number;
  
  /** 所在列索引 */
  columnIndex: number;
  
  /** 是否为固定扇 */
  isFixed: boolean;
  
  /** 自定义属性扩展字段 */
  attrs: SashAttributes;
  
  /** 滑动五金件管理器 */
  readonly hardwareManager: SlideHardwareManager;
  
  /** 推拉五金件管理器 */
  readonly pushSashHardwareManager: PushSashHardwareManager;
  
  /** 内部存储的固定宽度 */
  private _fixedWidth: number;

  /**
   * 构造函数
   * @param host - 所属主机对象
   * @param parent - 父级对象
   * @param polygon - 窗扇多边形轮廓
   * @param shapeType - 形状类型，默认为 Sash
   * @param trackIndex - 轨道索引，默认 -1
   * @param columnIndex - 列索引，默认 -1
   * @param fixedWidth - 固定宽度，默认 -1（自适应）
   */
  constructor(
    host: SlideSashHost,
    parent: unknown,
    polygon: paper.Path,
    shapeType?: ShapeType,
    trackIndex?: number,
    columnIndex?: number,
    fixedWidth?: number
  );

  /**
   * 检测右侧是否有互锁窗扇
   * 判断相邻轨道的右侧列是否存在窗扇
   */
  get interlockOnRight(): boolean;

  /**
   * 检测左侧是否有互锁窗扇
   * 判断相邻轨道的左侧列是否存在窗扇
   */
  get interlockOnLeft(): boolean;

  /**
   * 获取/设置固定宽度
   * 设置时会校验父级剩余宽度，不足时回滚
   */
  get fixedWidth(): number;
  set fixedWidth(value: number);

  /**
   * 获取轨道编号（从1开始）
   * 通过 host 的索引转换方法获取
   */
  get trackNo(): number;

  /**
   * 获取所有锁具（包含 locks 和 lock2s）
   */
  get locks(): Lock[];

  /**
   * 更新多边形轮廓
   * 调用父类方法后切换点样式
   * @param polygon - 新的多边形路径
   */
  updatePoly(polygon: paper.Path): void;

  /**
   * 序列化为JSON对象
   * @returns 包含轨道、列、宽度等信息的数据对象
   */
  toJSON(): SlideSashData;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的窗扇数据
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: SlideSashData): this;

  /**
   * 修复旧版本数据兼容性
   * 将 hm.isFixed 迁移到顶层 isFixed
   * @param data - 待修复的数据对象
   * @returns 修复后的数据
   */
  private fixData(data: SlideSashData): SlideSashData;

  /**
   * 切换推拉门样式
   * 根据轨道位置和开启方向自动配置合页数量和开启方式
   */
  private switchPtStyle(): void;

  /**
   * 更新固定扇到固定玻璃的转换
   * 当启用 fixedSashToFixedGlass 参数时：
   * - 调整边框宽度
   * - 隐藏五金件
   * - 处理中梃和边框重合部分
   */
  updateFixedSashToFixedGlass(): void;
}

/**
 * 滑动窗扇主机接口
 * 定义 SlideSash 所需的父级容器能力
 */
export interface SlideSashHost {
  /** 所有窗扇列表 */
  sashes: SlideSash[];
  
  /** 列数 */
  columnCount: number;
  
  /** 底部尺寸标注数组 */
  bottomDims: Array<{ hidden: boolean }>;
  
  /** 剩余可用宽度 */
  remainingWidth: number;
  
  /** 是否为推拉门模式 */
  asPtDoor: boolean;
  
  /**
   * 轨道索引转编号
   * @param trackIndex - 轨道索引
   * @returns 轨道编号
   */
  trackIndexToNo(trackIndex: number): number;
}

/**
 * 锁具基础接口
 */
export interface Lock {
  /** 锁具类型标识 */
  type: string;
  /** 是否隐藏 */
  hidden: boolean;
}