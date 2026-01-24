/**
 * 命令模式：移动梁构件
 * 支持鼠标拖拽、点击移动和程序化移动三种模式
 */

import { HSCore, HSCatalog } from './HSCore';
import { Command } from './Command';

/**
 * 三维空间位置坐标
 */
interface Position3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
}

/**
 * 鼠标事件包装对象
 */
interface MouseEventWrapper {
  /** 原生鼠标事件 */
  event: MouseEvent;
  /** 模型空间位置 */
  position?: Position3D;
  /** 是否正在跟踪鼠标 */
  trackingMouse?: boolean;
}

/**
 * 键盘事件包装对象
 */
interface KeyboardEventWrapper {
  /** 键码 */
  keyCode: number;
}

/**
 * 命令选项配置
 */
interface CmdMoveBeamOptions {
  /** 仅移动模式（不需要确认） */
  _moveonly?: boolean;
  /** 粘贴序列回调 */
  onPasteSequence?: () => void;
  /** 源梁构件列表 */
  from?: unknown[];
}

/**
 * 事件类型枚举
 */
type BeamMoveEventType =
  | 'dragstart'   // 拖拽开始
  | 'dragmove'    // 拖拽移动中
  | 'dragend'     // 拖拽结束
  | 'mousemove'   // 鼠标移动
  | 'mousedown'   // 鼠标按下
  | 'mouseup'     // 鼠标释放
  | 'click'       // 点击
  | 'moveto'      // 程序化移动到指定位置
  | 'keydown'     // 键盘按下
  | 'keyup';      // 键盘释放

/**
 * 事件数据联合类型
 */
type EventData = MouseEventWrapper | KeyboardEventWrapper | { position: Position3D };

/**
 * 移动梁构件命令
 * 继承自应用程序的Command基类，实现命令模式
 */
export declare class CmdMoveBeam extends Command {
  /** 要移动的梁构件对象 */
  beam: unknown;

  /** 目标位置坐标 */
  targetPosition?: Position3D;

  /** 是否为仅移动模式（无需用户确认） */
  moveonly: boolean;

  /** 源梁构件（用于粘贴操作的上下文） */
  fromBeam?: unknown;

  /** 鼠标操作起始点 */
  mouseBeginPoint?: Position3D;

  /** 事务管理器请求对象（私有） */
  private _request: unknown;

  /** 事务管理器实例 */
  private transMgr: unknown;

  /** 选择管理器实例 */
  private selectionMgr: unknown;

  /**
   * 构造函数
   * @param beam - 要移动的梁构件
   * @param targetPosition - 目标位置（可选，用于程序化移动）
   * @param options - 命令选项配置
   */
  constructor(beam: unknown, targetPosition?: Position3D, options?: CmdMoveBeamOptions);

  /**
   * 命令执行入口
   * @param eventWrapper - 鼠标事件包装对象（可选）
   * @description 初始化移动操作，创建事务请求
   */
  onExecute(eventWrapper?: MouseEventWrapper): void;

  /**
   * 接收并处理各类事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否消费该事件（true表示阻止事件继续传播）
   * @description 核心事件分发方法，处理拖拽、点击、键盘等交互
   */
  onReceive(eventType: BeamMoveEventType, eventData: EventData): boolean;

  /**
   * 取消命令执行
   * @description 回滚状态，恢复选择，中止事务请求
   */
  onCancel(): void;

  /**
   * 命令完成回调
   * @description 清理辅助线，恢复构件状态，更新选择
   */
  onComplete(): void;

  /**
   * 内部完成处理（私有方法）
   * @description 提交事务并标记命令完成
   */
  private _onComplete(): void;

  /**
   * 检查构件是否可拖拽
   * @returns 是否允许拖拽移动
   * @description 验证构件类型和视图状态
   */
  isDraggable(): boolean;

  /**
   * 检查目标位置是否与当前位置不同（私有方法）
   * @param position - 目标位置坐标
   * @returns 位置是否发生变化
   * @description 使用浮点数近似比较避免精度问题
   */
  private _notSamePosition(position: Position3D): boolean;
}