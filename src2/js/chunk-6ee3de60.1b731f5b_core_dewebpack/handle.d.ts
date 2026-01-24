import { Vector } from './vector';
import { Edge, Arc, Segment } from './geometry';
import { ToolType } from './tools';

/**
 * 硬件在框架上的基类
 */
export declare class HardwareOnFrame {
  /** 管理器实例 */
  manager: unknown;
  
  /** 位置坐标 */
  position: Vector;
  
  /** 关联的边缘 */
  edge: Edge | Arc;
  
  /** 停靠侧 */
  protected _dockSide?: DockSide;
  
  /** 是否使用型材颜色 */
  useProfileColor: boolean;
  
  /**
   * 从另一个实例克隆属性
   * @param source 源对象
   */
  cloneFrom(source: this): this;
  
  /**
   * 获取位置偏移方向
   */
  positionOffsetDirection(): Vector;
}

/**
 * 停靠侧枚举
 */
export enum DockSide {
  /** 内侧 */
  Inside = 'inside',
  /** 外侧 */
  Outside = 'outside'
}

/**
 * 硬件形状类型枚举
 */
export enum HardwareShape {
  /** 把手样式1 */
  Handle = 'handle',
  /** 把手样式2 */
  Handle2 = 'handle2',
  /** 折叠门把手 */
  HandleForFold = 'handleForFold',
  /** 推拉门把手1 */
  HandleForSlide = 'handleForSlide',
  /** 推拉门把手2 */
  HandleForSlide2 = 'handleForSlide2',
  /** 锁具样式1 */
  Lock = 'lock',
  /** 锁具样式2 */
  Lock2 = 'lock2'
}

/**
 * 形状类型枚举
 */
export enum ShapeType {
  Handle = 'handle'
}

/**
 * 把手配置选项
 */
export interface HandleOptions {
  /** 硬件形状类型 */
  hardwareShape?: HardwareShape;
  
  /** 是否与开启方向相反停靠 */
  dockOppositeWithOpenDirection?: boolean;
  
  /** 是否始终指向底部 */
  alwaysPointToBottom?: boolean;
  
  /** 停靠侧 */
  dockSide?: DockSide;
  
  /** 是否使用型材颜色 */
  useProfileColor?: boolean;
}

/**
 * 把手类 - 表示门窗上的把手硬件
 * 继承自HardwareOnFrame，用于在框架边缘上放置和管理把手
 */
export declare class Handle extends HardwareOnFrame {
  /** 管理器实例 */
  manager: unknown;
  
  /** 编辑工具类型 */
  editTool: ToolType;
  
  /** 硬件形状类型 */
  hardwareShape: HardwareShape;
  
  /** 是否与开启方向相反停靠 */
  private _dockOppositeWithOpenDirection: boolean;
  
  /** 是否始终指向底部 */
  private _alwaysPointToBottom: boolean;
  
  /**
   * 构造函数
   * @param manager 管理器实例
   * @param options 把手配置选项
   */
  constructor(manager: unknown, options?: HandleOptions);
  
  /**
   * 获取把手位置
   * @returns 把手的位置坐标
   */
  get handlePosition(): Vector;
  
  /**
   * 计算硬件形状方向
   * @returns 形状的方向向量
   */
  hardwareShapeDirection(): Vector;
  
  /**
   * 使方向指向底部
   * @param direction 当前方向向量
   * @param edge 关联的边缘
   * @returns 调整后的方向向量
   */
  private pointToBottom(direction: Vector, edge: Edge | Arc): Vector;
  
  /**
   * 从另一个把手实例克隆属性
   * @param source 源把手对象
   * @returns 当前实例
   */
  cloneFrom(source: Handle): this;
  
  /**
   * 重新创建把手实例
   * @returns 新的把手实例
   */
  recreate(): Handle;
  
  /**
   * 为门创建把手
   * @param manager 管理器实例
   * @param hardwareShape 硬件形状类型，默认为Handle2
   * @returns 门用把手实例
   */
  static forDoor(manager: unknown, hardwareShape?: HardwareShape): Handle;
  
  /**
   * 为折叠门创建把手
   * @param manager 管理器实例
   * @returns 折叠门用把手实例
   */
  static forFold(manager: unknown): Handle;
  
  /**
   * 为推拉门创建把手（样式1）
   * @param manager 管理器实例
   * @returns 推拉门用把手实例
   */
  static forSlide(manager: unknown): Handle;
  
  /**
   * 为推拉门创建把手（样式2）
   * @param manager 管理器实例
   * @returns 推拉门用把手实例（内侧停靠，使用型材颜色）
   */
  static forSlide2(manager: unknown): Handle;
  
  /**
   * 创建锁具（样式1）
   * @param manager 管理器实例
   * @returns 锁具实例
   */
  static lock(manager: unknown): Handle;
  
  /**
   * 创建锁具（样式2）
   * @param manager 管理器实例
   * @returns 锁具实例（外侧停靠）
   */
  static lock2(manager: unknown): Handle;
}