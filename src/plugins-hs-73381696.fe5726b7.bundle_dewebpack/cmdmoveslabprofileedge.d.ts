/**
 * 楼板轮廓边移动命令
 * 用于处理楼板剖面边缘的交互式移动操作
 */

import { Command } from 'HSApp.Cmd';
import { MoveSlabProfileEdge as MoveSlabProfileEdgeGizmo } from './gizmos';

/**
 * 位置坐标接口
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 线段接口
 */
interface Line {
  from: Position;
  to: Position;
}

/**
 * 约束信息接口
 */
interface ConstraintInfo {
  /** 约束线段 */
  constraintLine: [Position, Position];
  /** 是否需要插入新边 */
  isNeedInsertNewEdge: boolean;
}

/**
 * 楼板轮廓共边实体接口
 */
interface SlabProfileCoEdge {
  /** 边的起点 */
  from: Position;
  /** 边的终点 */
  to: Position;
  /** 边的中点 */
  middle: Position;
  /** 关联的边对象 */
  edge: unknown;
  /** 父级约束集合 */
  parents: Record<string, Line>;
}

/**
 * 执行参数接口
 */
interface ExecuteOptions {
  /** 初始位置，可以是数组或对象形式 */
  position?: [number, number] | Position;
}

/**
 * 拖拽事件接口
 */
interface DragEvent {
  /** 事件对象 */
  event: MouseEvent;
  /** 当前位置 */
  position?: Position;
  /** 偏移量 */
  offset?: Position;
}

/**
 * 日志参数接口
 */
interface LogParams {
  /** 活动区域 */
  activeSection: string;
  /** 点击率统计 */
  clicksRatio: {
    id: string;
    name: string;
  };
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /** 接收操作消息 */
  receive(action: string, data: unknown): void;
}

/**
 * 楼板轮廓边移动命令类
 * 负责处理楼板边缘的拖拽移动、约束计算和视觉反馈
 */
export declare class CmdMoveSlabProfileEdge extends Command {
  /** 操作的实体对象 */
  entity: SlabProfileCoEdge;
  
  /** 关联的楼板对象 */
  slab: unknown;
  
  /** 模型图层 */
  modelLayer: unknown;
  
  /** 移动起始位置 */
  moveBeginPosition?: Position;
  
  /** 起点初始数据备份 */
  dataFrom?: Position;
  
  /** 终点初始数据备份 */
  dataTo?: Position;
  
  /** 操作小部件 */
  gizmo?: MoveSlabProfileEdgeGizmo;
  
  /** 事务请求对象 */
  private _request?: TransactionRequest;
  
  /** 起点约束信息 */
  private _fromPointConstraintInfo?: ConstraintInfo;
  
  /** 终点约束信息 */
  private _toPointConstraintInfo?: ConstraintInfo;

  /**
   * 构造函数
   * @param entity - 楼板轮廓共边实体
   */
  constructor(entity: SlabProfileCoEdge);

  /**
   * 执行命令
   * @param options - 执行选项，包含初始位置信息
   */
  onExecute(options?: ExecuteOptions): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 取消操作
   * @private
   */
  private _onCancel(): void;

  /**
   * 完成操作
   * @private
   */
  private _onComplete(): void;

  /**
   * 拖拽结束处理
   * @param position - 结束时的位置
   */
  onDragEnd(position?: Position): void;

  /**
   * 接收消息处理
   * @param message - 消息类型
   * @param data - 消息数据
   * @returns 是否已处理该消息
   */
  onReceive(message: string, data?: DragEvent): boolean;

  /**
   * 设置鼠标光标样式
   */
  setCursor(): void;

  /**
   * 释放鼠标光标样式
   */
  releaseCursor(): void;

  /**
   * 创建交互小部件
   */
  createGizmo(): void;

  /**
   * 销毁交互小部件
   */
  destroyGizmo(): void;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回 false
   */
  canUndoRedo(): boolean;

  /**
   * 获取指定点的约束信息
   * @param point - 需要计算约束的点
   * @returns 约束信息对象
   * @private
   */
  private _getConstraintInfo(point: Position): ConstraintInfo;

  /**
   * 计算边的起点和终点的约束方向
   * @private
   */
  private _computeConstraintDirection(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): string;

  /**
   * 获取当前操作参数（用于日志统计）
   * @returns 日志参数对象
   */
  getCurrentParams(): LogParams;
}