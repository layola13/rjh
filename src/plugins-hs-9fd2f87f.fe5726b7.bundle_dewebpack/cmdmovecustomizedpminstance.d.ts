/**
 * 命令：移动自定义参数化模型实例
 * 该命令用于在3D/2D视图中拖拽移动自定义参数化模型实例
 * @module CmdMoveCustomizedPMInstance
 */

/**
 * 位置和旋转数据接口
 */
interface PositionRotationData {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（高度） */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  Zrotation: number;
}

/**
 * 鼠标位置接口
 */
interface MousePosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 移动操作选项接口
 */
interface MoveOperationOptions {
  /** 是否按下Ctrl键（自由移动模式） */
  ctrlKey: boolean;
  /** 是否按下Shift键（保持Z轴） */
  shiftKey: boolean;
  /** 是否按下Alt键（空间拉伸） */
  altKey: boolean;
  /** 移动方向向量 */
  vectors?: unknown;
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 鼠标当前位置 */
  mousePosition: MousePosition;
  /** 选中的图层 */
  pickedLayer: unknown;
  /** 鼠标悬停拾取结果 */
  pickResults?: unknown;
}

/**
 * 拖拽事件数据接口
 */
interface DragEventData {
  /** 移动偏移量 [x, y, z] */
  offset?: [number, number, number];
  /** 目标位置 */
  position?: number[];
  /** 移动方式 */
  moveby?: string;
  /** 模型到屏幕的缩放比例 */
  modelToScreen?: number;
  /** 原始事件对象 */
  event: {
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
  };
  /** 移动方向向量 */
  vectors?: unknown;
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 选中的图层 */
  pickedLayer?: unknown;
  /** 鼠标悬停对象 */
  mouseOver?: unknown;
}

/**
 * 吸附结果接口
 */
interface SnappingResult {
  /** 吸附是否成功 */
  success?: boolean;
  /** 吸附后的位置 */
  position?: number[];
  /** 其他吸附相关数据 */
  [key: string]: unknown;
}

/**
 * 吸附选项接口
 */
interface SnappingOptions {
  /** 吸附偏移量阈值 */
  snapOffset: number;
  /** 是否启用自动适配 */
  autoFitEnable: boolean;
  /** 是否忽略吸附偏移 */
  ignoreSnapOffset: boolean;
  /** 移动方向向量 */
  vectors?: unknown;
  /** 是否禁止Z轴变化 */
  notZ: boolean;
  /** 固定的Z轴值 */
  fixedZValue?: number;
  /** 是否自由移动（不吸附） */
  freeMove: boolean;
  /** 是否在空间中拉伸 */
  stretchInSpace: boolean;
  /** 是否限制在房间内 */
  constraintInRoom: boolean;
  /** 是否限制在多边形内 */
  constraintInPolygon: boolean;
  /** 多边形约束 */
  polygon: unknown;
  /** 房间约束 */
  room: unknown;
  /** 是否尝试吸附到所有内容 */
  trySnapToAllContents: boolean;
  /** 默认地面 */
  defaultGround?: unknown;
  /** 自由移动时的吸附 */
  freeMoveSnap?: boolean;
  /** 拾取结果 */
  pickResults?: unknown;
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 鼠标位置 */
  mousePosition: MousePosition;
}

/**
 * 移动自定义参数化模型实例命令类
 * 继承自 HSApp.Cmd.Command，用于处理自定义模型实例的拖拽移动操作
 */
export declare class CmdMoveCustomizedPMInstance extends HSApp.Cmd.Command {
  /**
   * 应用实例引用
   * @private
   */
  private readonly _app: typeof HSApp.App;

  /**
   * 事务会话
   * @private
   */
  private _session: unknown;

  /**
   * 要移动的模型实例
   * @private
   */
  private readonly _instance: unknown;

  /**
   * 目标Z坐标
   * @private
   */
  private readonly _targetZ?: number;

  /**
   * 基础位置（移动前的初始位置）
   * @private
   */
  private readonly _basePosition: PositionRotationData;

  /**
   * 屏幕空间吸附偏移量（像素）
   * @private
   */
  private snapScreenOffset: number;

  /**
   * 默认吸附偏移量（模型空间）
   * @private
   */
  private readonly defaultSnapOffset: number;

  /**
   * 当前吸附偏移量
   * @private
   */
  private snapOffset: number;

  /**
   * 吸附辅助工具
   * @private
   */
  private snappingHelper?: HSApp.Snapping.Helper;

  /**
   * 吸附结果
   * @private
   */
  private snappingResult?: SnappingResult;

  /**
   * 移动内容的Gizmo控制器
   * @private
   */
  private moveContentGizmo?: unknown;

  /**
   * 是否已开始拖拽
   * @private
   */
  private dragged?: boolean;

  /**
   * 是否保持Z轴不变
   * @private
   */
  private keepZAxis?: boolean;

  /**
   * 额外选项
   * @private
   */
  private _option?: {
    forceKeepZAxis?: boolean;
  };

  /**
   * 构造函数
   * @param instance - 要移动的模型实例
   * @param targetZ - 目标Z坐标（可选）
   */
  constructor(instance: unknown, targetZ?: number);

  /**
   * 命令执行时的回调
   * 初始化吸附辅助工具和Gizmo控制器
   */
  onExecute(): void;

  /**
   * 接收并处理拖拽事件
   * @param eventType - 事件类型（dragstart/dragmove/moveto/mouseup/click/dragend等）
   * @param eventData - 事件数据
   * @returns 是否成功处理事件
   */
  onReceive(eventType: string, eventData: DragEventData): boolean;

  /**
   * 命令完成时的回调
   * 提交事务会话并清理吸附策略
   */
  onComplete(): void;

  /**
   * 命令取消时的回调
   * 结束事务会话并清理吸附策略
   */
  onCancel(): void;

  /**
   * 移动完成的内部处理
   * 创建事务请求并提交
   * @param position - 最终位置（可选）
   * @private
   */
  private _onComplete(position?: number[]): void;

  /**
   * 获取吸附策略列表
   * 根据当前视图模式（2D/3D）返回不同的吸附策略
   * @param helper - 吸附辅助工具
   * @returns 吸附策略实例数组
   * @private
   */
  private _getSnappingStrategies(helper: HSApp.Snapping.Helper): unknown[];

  /**
   * 获取移动偏移量和操作选项
   * 根据事件数据计算实际移动偏移量
   * @param eventData - 拖拽事件数据
   * @returns 包含偏移量和操作选项的对象
   * @private
   */
  private _getMoveOffsetAndOptions(eventData: DragEventData): {
    offset: [number, number, number];
    op: MoveOperationOptions;
  };

  /**
   * 执行吸附计算
   * @param fixedZ - 固定的Z坐标值
   * @param notZ - 是否禁止Z轴变化
   * @param options - 吸附选项
   * @private
   */
  private _doSnapping(fixedZ: number, notZ: boolean, options: MoveOperationOptions): void;

  /**
   * 更改光标状态
   * 释放2D视图中的光标状态
   * @private
   */
  private _changeCursorStatus(): void;

  /**
   * 保存恢复数据
   * 保存当前实例的位置和旋转信息
   * @returns 位置和旋转数据
   * @private
   */
  private _saveRestoreData(): PositionRotationData;

  /**
   * 获取实体中心位置
   * 计算模型实例在世界坐标系中的中心点
   * @returns 三维向量表示的中心位置
   * @private
   */
  private _getEntityCenterPos(): unknown;

  /**
   * 更新内容位置
   * 根据偏移量更新模型实例的坐标
   * @param offset - 移动偏移量 [x, y, z]
   * @param keepZ - 是否保持Z轴不变
   * @private
   */
  private _updateContentPosition(offset: [number, number, number], keepZ: boolean): void;

  /**
   * 移动到指定位置
   * 直接设置模型实例的坐标
   * @param position - 目标位置（包含x, y, z坐标）
   */
  moveto(position: { x?: number; y?: number; z?: number }): void;

  /**
   * 移动模型实例
   * 应用偏移量并执行吸附计算
   * @param offset - 移动偏移量 [x, y, z]
   * @param options - 移动操作选项
   */
  move(offset: [number, number, number], options: MoveOperationOptions): void;

  /**
   * 创建Gizmo控制器
   * 在2D视图中创建移动控制的可视化辅助工具
   * @private
   */
  private _createGizmo(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): string;
}