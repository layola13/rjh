/**
 * Tk Module - 工具管理器
 * 用于管理和验证各种编辑工具的访问权限
 */

/**
 * 支持的工具类型
 */
export type AllowedToolType =
  | 'pan'
  | 'squareSelect'
  | 'wall'
  | 'frame_scalable'
  | 'frame_rectangle'
  | 'frame_springline'
  | 'mullion_cross_line'
  | 'mullion_horizontal'
  | 'mullion_vertical'
  | 'sash'
  | 'doubleSash'
  | 'screen'
  | 'doubleScreen'
  | 'antiTheft'
  | 'foldSash'
  | 'foldScreen'
  | 'slide'
  | 'connerJoiner'
  | 'editCornerRobot'
  | 'editCornerJoiner'
  | 'connector'
  | 'editConnector'
  | 'editConnectorRobot'
  | 'editDim'
  | 'editSash'
  | 'editHinge'
  | 'editHandle'
  | 'door'
  | 'editSkewText'
  | 'editSplitter'
  | 'editDragRobot'
  | 'editWallDragRobot'
  | 'editTopViewDragRobot'
  | 'editWallEdgeRobot';

/**
 * Tkk 内部核心类接口（从模块127导入）
 */
interface Tkk {
  /**
   * 触发视图更新
   */
  tv(): void;

  /**
   * 错误消息：工具不可用提示
   */
  readonly e4: string;

  /**
   * 是否为迷你模式（受限模式）
   */
  readonly mini: boolean;
}

/**
 * Tk 构造函数参数
 */
export interface TkOptions {
  /** 传递给 Tkk 的配置参数 */
  [key: string]: unknown;
}

/**
 * Tk 主类 - 工具权限管理器
 */
export declare class Tk {
  /**
   * 内部核心实例
   * @private
   */
  private readonly wk: Tkk;

  /**
   * 允许使用的工具列表
   * @readonly
   */
  readonly allow_tools: readonly AllowedToolType[];

  /**
   * 是否为迷你模式
   * 在迷你模式下，只能使用 allow_tools 中列出的工具
   */
  get mini(): boolean;

  /**
   * 创建 Tk 实例
   * @param options - 初始化配置参数
   */
  constructor(options: TkOptions);

  /**
   * 触发视图更新
   * 内部调用 wk.tv()
   */
  v(): void;

  /**
   * 检查工具是否可用
   * @param toolName - 工具名称
   * @throws {Error} 当在 mini 模式下使用不允许的工具时抛出错误
   */
  ca(toolName: string): void;
}