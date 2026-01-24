/**
 * 角窗编辑状态请求类型声明
 * 用于处理角窗（转角窗）的编辑、撤销、重做等操作
 */

/**
 * 角窗参数接口
 * 定义角窗的各种可配置参数
 */
interface CornerWindowParameters {
  [key: string]: unknown;
}

/**
 * 位置坐标接口
 */
interface Position {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * Gizmo 参数接口
 * 用于控制角窗编辑时的图形控制器参数
 */
interface GizmoParameter {
  /** 编辑标志，指示正在编辑角窗的哪一侧 */
  EditFlag: HSCore.Model.CornerWindowParamsEnum;
}

/**
 * 角窗对象接口
 * 代表可编辑的角窗实例
 */
interface CornerWindow {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 角窗参数 */
  parameters: CornerWindowParameters;
}

/**
 * 编辑请求数据接口
 */
interface EditRequestData {
  /** 请求类型 */
  type: string;
  /** 请求携带的数据，通常是角窗数组 */
  data: CornerWindow[];
}

/**
 * 角窗编辑状态请求类
 * 继承自 HSCore.Transaction.Common.StateRequest
 * 
 * 该类实现了角窗编辑操作的完整生命周期管理：
 * - 参数修改
 * - 位置移动
 * - 撤销/重做功能
 * - 操作合并
 */
declare class EditCornerWindowStateRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 当前编辑的角窗实例
   * @private
   */
  private _cornerWindow: CornerWindow;

  /**
   * 角窗的新参数
   * @private
   */
  private _parameters: CornerWindowParameters;

  /**
   * Gizmo 控制器参数
   * @private
   */
  private _gizmoParam?: GizmoParameter;

  /**
   * 移动目标位置
   * @private
   */
  private _movePosition?: Position;

  /**
   * 初始位置（用于撤销）
   * @private
   */
  private _initialPosition?: Position;

  /**
   * 当前设置的位置
   * @private
   */
  private _position?: Position;

  /**
   * 构造函数
   * @param cornerWindow - 要编辑的角窗实例
   * @param parameters - 新的角窗参数
   * @param gizmoParam - Gizmo 控制器参数（可选）
   * @param movePosition - 移动目标位置（可选）
   */
  constructor(
    cornerWindow: CornerWindow,
    parameters: CornerWindowParameters,
    gizmoParam?: GizmoParameter,
    movePosition?: Position
  );

  /**
   * 提交编辑操作
   * 应用参数变更和位置移动，并保存初始状态用于撤销
   * @returns 编辑后的角窗实例，如果角窗不存在则返回 undefined
   */
  onCommit(): CornerWindow | undefined;

  /**
   * 设置角窗的新位置
   * @param position - 新的位置坐标
   */
  setPosition(position: Position): void;

  /**
   * 撤销操作
   * 恢复角窗的参数和位置到编辑前的状态
   */
  onUndo(): void;

  /**
   * 重做操作
   * 重新应用角窗的参数和位置变更
   */
  onRedo(): void;

  /**
   * 判断是否可以与另一个请求合并
   * 只有当两个请求操作的是同一个角窗实例且类型相同时才能合并
   * @param request - 待比较的编辑请求
   * @returns 如果可以合并返回 true，否则返回 false
   */
  onCompose(request: EditRequestData): boolean;

  /**
   * 应用参数变更的内部方法
   * 交换当前参数和新参数，并处理特定侧面编辑时的位置移动
   * @private
   */
  private _apply(): void;
}

export default EditCornerWindowStateRequest;