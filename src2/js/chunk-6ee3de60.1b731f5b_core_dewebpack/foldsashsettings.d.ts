/**
 * 折叠窗扇设置模块
 * 用于管理折叠窗的各项配置参数，包括连接方式、展开方向、开启方向等
 */

import type { Vector } from './vector';
import type { Glass } from './glass';
import type { EventBus, EventType } from './eventBus';

/**
 * 视图管理器接口
 */
interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 活动图层 */
  activeLayer: Layer;
  /** 备忘录管理器，用于撤销/重做 */
  mometoManager: MomentoManager;
  /** 事件总线 */
  eventBus: EventBus;
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /** 形状集合 */
  shapem: unknown[];
}

/**
 * 图层接口
 */
interface Layer {
  /** 批量绘制图层内容 */
  batchDraw(): void;
}

/**
 * 备忘录管理器接口
 */
interface MomentoManager {
  /** 创建检查点（快照），用于撤销/重做 */
  checkPoint(): void;
}

/**
 * 折叠窗对象接口
 */
interface Fold {
  /** 连接方式 */
  jointWay: string;
  /** 是否水平展开 */
  expandHorizontally: boolean;
  /** 开启朝向 */
  openToward: string;
  /** 左侧折叠数量 */
  leftCount: number;
  /** 右侧折叠数量 */
  rightCount: number;
  /** 是否启用偏移向量 */
  offvecEnabled: boolean;
  /** 偏移向量 */
  offvec: Vector;
  /** 是否为门 */
  isDoor: boolean;
  /** 折叠方式是否已更改 */
  foldWayChanged: boolean;
  /** 顶视图框架 */
  topFrame: unknown;

  /** 更新多边形 */
  updatePoly(): void;
  /** 绘制到视图 */
  draw(view: View): void;
  /** 平移 */
  translate(offset: Vector): void;
  /** 隐藏辅助线 */
  hideAssist(): void;
}

/**
 * 折叠窗扇设置类
 * 提供折叠窗的配置和操作接口
 */
export declare class FoldSashSettings {
  /** 折叠窗对象 */
  private readonly fold: Fold;
  /** 视图对象 */
  private readonly view: View;

  /**
   * 构造函数
   * @param fold - 折叠窗对象
   * @param view - 视图对象
   */
  constructor(fold: Fold, view: View);

  /**
   * 获取目标折叠窗对象
   */
  get target(): Fold;

  /**
   * 连接方式
   * 控制折叠窗扇之间的连接方式
   */
  get jointWay(): string;
  set jointWay(value: string);

  /**
   * 是否水平展开
   * 控制折叠窗的展开方向
   */
  get horizontally(): boolean;
  set horizontally(value: boolean);

  /**
   * 开启朝向
   * 控制折叠窗的开启方向
   */
  get openToward(): string;
  set openToward(value: string);

  /**
   * 折叠方式
   * 格式为 "左侧数量+右侧数量"，例如 "2+3"
   */
  get foldWay(): string;
  set foldWay(value: string);

  /**
   * 是否启用偏移向量
   * 控制是否允许折叠窗相对于原始位置偏移
   */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /**
   * 是否存在偏移
   * 检查当前是否有偏移量，设置为false时会重置偏移
   */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /**
   * 是否为门
   * 标识该折叠窗是否作为门使用
   */
  get isDoor(): boolean;
  set isDoor(value: boolean);

  /**
   * 广播顶视图变更事件
   * 通知其他组件顶视图已发生变化
   */
  private broadcastTopViewChange(): void;
}