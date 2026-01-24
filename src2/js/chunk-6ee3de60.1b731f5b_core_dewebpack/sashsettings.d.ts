/**
 * SashSettings - Sash (窗扇) 配置管理类
 * 用于管理窗扇的各种硬件设置、开启方式、把手、铰链等配置
 */

import type Makerjs from 'makerjs';
import type { EventBus, EventType } from './EventBus';
import type { Direction, EdgeFinder } from './EdgeFinder';
import type { 
  Sash, 
  PushSash, 
  SlideSash, 
  KfcSash, 
  DoubleSash,
  ShapeType,
  Glass,
  HardwareShape,
  HardwareShapeCreator,
  Handle,
  HardwareOnEdge,
  ShadeHandleType
} from './Shapes';
import type { 
  HardwareManager,
  PushSashHardwareManager,
  SlideHardwareManager,
  FoldHardwareManager
} from './HardwareManager';
import type { OpenDirection, OpenToward } from './HardwareEnums';
import type { View } from './View';

/**
 * 窗扇硬件设置接口
 */
export interface ISashSettings {
  /** 目标窗扇对象 */
  readonly target: Sash;
  
  /** 是否为推拉窗 */
  readonly isPush: boolean;
  
  /** 是否为肯德基门 */
  readonly isKfc: boolean;
  
  /** 是否为双开窗 */
  readonly isDouble: boolean;
  
  /** 是否为滑动窗 */
  readonly isSlide: boolean;
  
  /** 是否为垂直滑动窗 */
  readonly isVerticalSlide: boolean;
  
  /** 是否为折叠窗 */
  readonly isFold: boolean;
  
  /** 是否带遮阳帘 */
  readonly isShade: boolean;
  
  /** 开启状态 (仅推拉窗) */
  opened: boolean;
  
  /** 连接方式 */
  jointWay: number;
  
  /** 把手位置 */
  readonly handlePosition: Makerjs.IPoint;
  
  /** 是否启用偏移 */
  offvecEnabled: boolean;
  
  /** 是否存在偏移 */
  hasOffset: boolean;
  
  /** 开启方向 */
  openDirection: OpenDirection;
  
  /** 开启朝向 (内开/外开) */
  openToward: OpenToward;
  
  /** 开启模式 (综合开启方向和朝向) */
  openMode: OpenDirection;
  
  /** 是否启用多点锁 */
  multiLockPoints: boolean;
  
  /** 开启角度 */
  openDegree: number;
  
  /** 铰链类型 */
  hingeType: HardwareShape;
  
  /** 铰链数量 */
  hingeCount: number;
  
  /** 铰链是否自动偏移 */
  autoHingeOffsets: boolean;
  
  /** 铰链偏移量数组 */
  hingeOffsets: number[];
  
  /** 可用的把手类型列表 */
  readonly handleTypeList: HardwareShape[];
  
  /** 把手类型 */
  handleType: HardwareShape;
  
  /** 把手是否自动偏移 */
  autoHandleOffset: boolean;
  
  /** 把手偏移量 */
  handleOffset: number;
  
  /** 是否带转角框 */
  withTurningFrame: boolean;
  
  /** 是否截断框架 */
  truncateFrame: boolean;
  
  /** 把手可读偏移量 (用于边缘硬件) */
  readableHandleOffset: number;
  
  /** 把手是否隐藏 */
  handleHidden: boolean;
  
  /** 到地面的标注是否隐藏 */
  dimToGroundHidden: boolean;
  
  /** 到窗扇的标注是否隐藏 */
  dimToSashHidden: boolean;
  
  /** 滑动方向 */
  slide: OpenDirection;
  
  /** 是否为固定窗扇 */
  isFixed: boolean;
  
  /** 剩余宽度 */
  readonly remainingWidth: number;
  
  /** 窗扇宽度 */
  width: number;
  
  /** 是否作为固定宽度窗扇 */
  asFixedWidthSash: boolean;
  
  /** 折叠窗锁是否隐藏 */
  foldLockHidden: boolean;
  
  /** 滑动窗锁数量 */
  slideLockHidden: number;
  
  /** 月牙锁显示数量 */
  crescentLockShown: number;
  
  /** 锁的总数量 */
  locksCount: number;
  
  /** 滑动窗把手类型 */
  slideHandleType: HardwareShape;
  
  /** 滑动窗把手是否隐藏 */
  slideHandleHidden: boolean;
  
  /** 是否启用滑动上拉 */
  slidePullupEnabled: boolean;
  
  /** 锁编码 */
  lockCode: string;
  
  /** 锁名称 */
  lockName: string;
  
  /** 是否为装饰锁 */
  decorationLock: boolean;
  
  /** 折叠窗把手是否隐藏 */
  handleForFoldHidden: boolean;
  
  /** 折叠窗把手偏移量 */
  handleForFoldOffset: number;
  
  /** 遮阳帘把手类型 */
  shadeHandleType: ShadeHandleType;
  
  /** 是否为门 */
  isDoor: boolean;
  
  /** 上拉高度 */
  pullingHeight: number;
  
  /** 是否允许设置上拉高度 */
  readonly allowPullingHeightSet: boolean;
}

/**
 * 窗扇设置管理类
 * 封装了窗扇的所有配置属性和操作方法
 */
export declare class SashSettings implements ISashSettings {
  private readonly manager: HardwareManager;
  private readonly view: View;

  /**
   * 构造函数
   * @param manager - 硬件管理器实例
   * @param view - 视图实例
   */
  constructor(manager: HardwareManager, view: View);

  /** 获取目标窗扇 */
  get target(): Sash;

  /** 是否为推拉窗 */
  get isPush(): boolean;

  /** 是否为肯德基门 */
  get isKfc(): boolean;

  /** 是否为双开窗 */
  get isDouble(): boolean;

  /** 是否为滑动窗 */
  get isSlide(): boolean;

  /** 是否为垂直滑动窗 */
  get isVerticalSlide(): boolean;

  /** 是否为折叠窗 */
  get isFold(): boolean;

  /** 是否带遮阳帘 */
  get isShade(): boolean;

  /** 开启状态 */
  get opened(): boolean;
  set opened(value: boolean);

  /** 连接方式 */
  get jointWay(): number;
  set jointWay(value: number);

  /** 把手位置坐标 */
  get handlePosition(): Makerjs.IPoint;

  /** 是否启用偏移向量 */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /** 是否存在偏移 */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /** 开启方向 (上/下/左/右) */
  get openDirection(): OpenDirection;
  set openDirection(value: OpenDirection);

  /** 开启朝向 (内开/外开) */
  get openToward(): OpenToward;
  set openToward(value: OpenToward);

  /** 开启模式 (方向+朝向的组合) */
  get openMode(): OpenDirection;
  set openMode(value: OpenDirection);

  /** 是否启用多点锁 */
  get multiLockPoints(): boolean;
  set multiLockPoints(value: boolean);

  /** 开启角度 (度) */
  get openDegree(): number;
  set openDegree(value: number);

  /** 铰链类型 */
  get hingeType(): HardwareShape;
  set hingeType(value: HardwareShape);

  /** 铰链数量 */
  get hingeCount(): number;
  set hingeCount(value: number);

  /** 铰链是否全部自动偏移 */
  get autoHingeOffsets(): boolean;
  set autoHingeOffsets(value: boolean);

  /** 铰链偏移量数组 (相对中心) */
  get hingeOffsets(): number[];
  set hingeOffsets(values: number[]);

  /** 可选的把手类型列表 */
  get handleTypeList(): HardwareShape[];

  /** 把手类型 */
  get handleType(): HardwareShape;
  set handleType(value: HardwareShape);

  /** 把手是否自动偏移 */
  get autoHandleOffset(): boolean;
  set autoHandleOffset(value: boolean);

  /** 把手偏移量 */
  get handleOffset(): number;
  set handleOffset(value: number);

  /** 是否带转角框 */
  get withTurningFrame(): boolean;
  set withTurningFrame(value: boolean);

  /** 是否截断框架 */
  get truncateFrame(): boolean;
  set truncateFrame(value: boolean);

  /** 把手可读偏移量 (用于边缘硬件显示) */
  get readableHandleOffset(): number;
  set readableHandleOffset(value: number);

  /** 把手是否隐藏 */
  get handleHidden(): boolean;
  set handleHidden(value: boolean);

  /** 到地面的标注线是否隐藏 */
  get dimToGroundHidden(): boolean;
  set dimToGroundHidden(value: boolean);

  /** 到窗扇的标注线是否隐藏 */
  get dimToSashHidden(): boolean;
  set dimToSashHidden(value: boolean);

  /** 滑动方向 */
  get slide(): OpenDirection;
  set slide(value: OpenDirection);

  /** 是否为固定窗扇 (不可移动) */
  get isFixed(): boolean;
  set isFixed(value: boolean);

  /** 剩余可用宽度 */
  get remainingWidth(): number;

  /** 窗扇固定宽度 */
  get width(): number;
  set width(value: number);

  /** 是否作为固定宽度窗扇 */
  get asFixedWidthSash(): boolean;
  set asFixedWidthSash(value: boolean);

  /** 折叠窗锁是否隐藏 */
  get foldLockHidden(): boolean;
  set foldLockHidden(value: boolean);

  /** 滑动窗锁显示数量 */
  get slideLockHidden(): number;
  set slideLockHidden(count: number);

  /** 月牙锁显示数量 */
  get crescentLockShown(): number;
  set crescentLockShown(count: number);

  /** 锁的总数量 */
  get locksCount(): number;
  set locksCount(count: number);

  /** 滑动窗把手类型 */
  get slideHandleType(): HardwareShape;
  set slideHandleType(value: HardwareShape);

  /** 滑动窗把手是否隐藏 */
  get slideHandleHidden(): boolean;
  set slideHandleHidden(value: boolean);

  /** 是否启用滑动上拉功能 */
  get slidePullupEnabled(): boolean;
  set slidePullupEnabled(value: boolean);

  /** 锁编码 */
  get lockCode(): string;
  set lockCode(value: string);

  /** 锁名称 */
  get lockName(): string;
  set lockName(value: string);

  /** 是否为装饰锁 */
  get decorationLock(): boolean;
  set decorationLock(value: boolean);

  /** 折叠窗把手是否隐藏 */
  get handleForFoldHidden(): boolean;
  set handleForFoldHidden(value: boolean);

  /** 折叠窗把手偏移量 */
  get handleForFoldOffset(): number;
  set handleForFoldOffset(value: number);

  /** 遮阳帘把手类型 */
  get shadeHandleType(): ShadeHandleType;
  set shadeHandleType(value: ShadeHandleType);

  /** 是否为门 (而非窗) */
  get isDoor(): boolean;
  set isDoor(value: boolean);

  /** 上拉高度 (mm) */
  get pullingHeight(): number;
  set pullingHeight(value: number);

  /** 是否允许设置上拉高度 */
  get allowPullingHeightSet(): boolean;

  /** 获取窗扇实例 */
  private get sash(): Sash;

  /** 获取推拉窗硬件管理器 */
  private get sashHardware(): PushSashHardwareManager;

  /** 获取滑动窗硬件管理器 */
  private get slideHardware(): SlideHardwareManager;

  /** 获取折叠窗硬件管理器 */
  private get foldHardware(): FoldHardwareManager;

  /**
   * 四舍五入到整数
   * @param value - 待处理的数值
   * @returns 整数值
   */
  private round(value: number): number;

  /**
   * 判断两个数值是否相等 (容差0.5)
   * @param a - 数值A
   * @param b - 数值B
   * @returns 是否相等
   */
  private isSame(a: number, b: number): boolean;

  /**
   * 判断两个数组是否相等
   * @param arr1 - 数组1
   * @param arr2 - 数组2
   * @returns 是否相等
   */
  private isSameArray(arr1: number[], arr2: number[]): boolean;

  /**
   * 广播把手位置变化事件
   */
  private broadcastHandleChange(): void;

  /**
   * 广播顶视图变化事件
   */
  private broadcastTopViewChange(): void;

  /**
   * 设置滑动窗为固定宽度窗扇
   * @param isFixed - 是否固定宽度
   */
  private set asFixedWidthSashInSlide(isFixed: boolean);

  /**
   * 设置双开窗为固定宽度窗扇
   * @param isFixed - 是否固定宽度
   */
  private set asFixedWidthSashInDouble(isFixed: boolean);
}