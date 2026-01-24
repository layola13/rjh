/**
 * 滑动窗设置模块
 * 提供滑动窗的配置管理功能，包括锁类型、把手、轨道等设置
 */

import { Vector } from './vector';
import { EventType } from './event';
import { OpenDirection } from './direction';
import { HardwareShape, Glass } from './hardware';

/**
 * 锁的类型枚举
 */
export enum LockType {
  /** 默认锁 */
  Default = "Default",
  /** 月牙锁 */
  Crescent = "Crescent"
}

/**
 * 滑动窗对象接口
 */
interface Slide {
  /** 连接方式 */
  jointWay: unknown;
  /** 应用的选项索引 */
  appliedOptionIndex: number;
  /** 是否作为推拉门 */
  asPtDoor: boolean;
  /** 空白区域尺寸 */
  emptyAreaSize: number;
  /** 是否追加空轨道 */
  emptyTrackAppended: boolean;
  /** 硬件列表 */
  hardwares: Hardware[];
  /** 窗扇列表 */
  sashes: Sash[];
  /** 是否启用提拉 */
  pullupEnabled: boolean;
  /** 是否启用偏移 */
  offvecEnabled: boolean;
  /** 偏移向量 */
  offvec: Vector;
  /** 是否为门 */
  isDoor: boolean;
  /** 空白区域列表 */
  emptyAreas: unknown[];
  /** 是否截断框架 */
  truncateFrame: boolean;
  /** 锁是否等高 */
  locksSameHeight: boolean;
  
  /** 更新多边形 */
  updatePoly(): void;
  /** 绘制 */
  draw(view: View): void;
  /** 平移 */
  translate(vector: Vector): void;
  /** 隐藏辅助线 */
  hideAssist(): void;
}

/**
 * 硬件接口
 */
interface Hardware {
  /** 硬件形状类型 */
  hardwareShape: HardwareShape;
  /** 是否隐藏 */
  hidden: boolean;
  /** 边缘索引 */
  edgeIndex: number;
  
  /** 更新多边形 */
  updatePoly(): void;
  /** 绘制 */
  draw(view: View): void;
}

/**
 * 窗扇接口
 */
interface Sash {
  /** 列索引 */
  columnIndex: number;
  /** 硬件管理器 */
  hardwareManager: HardwareManager;
  /** 属性 */
  attrs: {
    lockCode?: string;
    lockName?: string;
  };
  
  /** 更新多边形 */
  updatePoly(): void;
  /** 绘制 */
  draw(view: View): void;
}

/**
 * 硬件管理器接口
 */
interface HardwareManager {
  /** 把手类型 */
  handleType: unknown;
  /** 滑动窗把手 */
  handleForSlide: Hardware;
  /** 是否启用提拉 */
  pullupEnabled: boolean;
  /** 是否垂直 */
  isVertical: boolean;
  /** 滑动窗指示器 */
  indicatorForSlide: Hardware;
  /** 开启方向 */
  openDirection: OpenDirection;
  /** 锁列表 */
  locks: Hardware[];
}

/**
 * 视图接口
 */
interface View {
  /** 形状管理器 */
  shapeManager: {
    shapem: unknown;
  };
  /** 活动图层 */
  activeLayer: {
    batchDraw(): void;
  };
  /** 备忘录管理器 */
  mometoManager: {
    checkPoint(): void;
  };
  /** 事件总线 */
  eventBus: {
    emit(event: { type: EventType; payload: unknown }): void;
  };
}

/**
 * 滑动窗设置类
 * 管理滑动窗的所有配置选项
 */
export declare class SlideSettings {
  private readonly slide: Slide;
  private readonly view: View;

  /**
   * 构造函数
   * @param slide - 滑动窗对象
   * @param view - 视图对象
   */
  constructor(slide: Slide, view: View);

  /**
   * 获取目标滑动窗对象
   */
  get target(): Slide;

  /**
   * 获取或设置连接方式
   */
  get jointWay(): unknown;
  set jointWay(value: unknown);

  /**
   * 获取或设置应用的选项索引
   */
  get appliedOptionIndex(): number;
  set appliedOptionIndex(value: number);

  /**
   * 获取或设置是否追加空轨道
   */
  get emptyTrackAppended(): boolean;
  set emptyTrackAppended(value: boolean);

  /**
   * 获取或设置锁是否隐藏
   */
  get lockHidden(): boolean;
  set lockHidden(value: boolean);

  /**
   * 获取或设置月牙锁是否隐藏
   */
  get crescentLockHidden(): boolean;
  set crescentLockHidden(value: boolean);

  /**
   * 获取或设置把手类型
   */
  get handleType(): unknown;
  set handleType(value: unknown);

  /**
   * 获取或设置把手是否隐藏
   */
  get handleHidden(): boolean;
  set handleHidden(value: boolean);

  /**
   * 获取或设置是否启用提拉功能
   */
  get pullupEnabled(): boolean;
  set pullupEnabled(value: boolean);

  /**
   * 获取或设置是否启用偏移
   */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /**
   * 获取或设置是否有偏移
   */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /**
   * 获取或设置是否为门
   */
  get isDoor(): boolean;
  set isDoor(value: boolean);

  /**
   * 获取或设置是否作为推拉门
   */
  get asPtDoor(): boolean;
  set asPtDoor(value: boolean);

  /**
   * 获取或设置空白区域尺寸
   */
  get emptyAreaSize(): number;
  set emptyAreaSize(value: number);

  /**
   * 获取是否有空白区域
   */
  get hasEmptyArea(): boolean;

  /**
   * 获取或设置默认锁类型
   * @deprecated 使用 lockType 属性
   */
  get defaultLockType(): boolean;
  set defaultLockType(value: boolean);

  /**
   * 获取或设置锁类型
   */
  get lockType(): LockType | undefined;
  set lockType(value: LockType | undefined);

  /**
   * 获取或设置锁编码
   */
  get lockCode(): string;
  set lockCode(value: string);

  /**
   * 获取或设置锁名称
   */
  get lockName(): string;
  set lockName(value: string);

  /**
   * 获取或设置是否截断框架
   */
  get truncateFrame(): boolean;
  set truncateFrame(value: boolean);

  /**
   * 获取或设置锁是否等高
   */
  get locksSameHeight(): boolean;
  set locksSameHeight(value: boolean);
}

/**
 * 月牙锁类型别名
 * @deprecated 使用 LockType.Crescent
 */
export type Crescent = LockType.Crescent;