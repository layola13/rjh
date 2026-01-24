/**
 * 正交相机移动命令模块
 * 处理3D视图中正交相机的拖拽移动和缩放操作
 */

import { HSApp } from './518193';
import { HSCore } from './635589';
import { Vector3 } from './367441';

/**
 * 鼠标位置坐标
 */
interface MousePoint {
  /** 水平坐标 */
  x: number;
  /** 垂直坐标 */
  y: number;
}

/**
 * 3D空间位移数据
 */
interface DragDeltaData {
  /** X轴位移 */
  x: number;
  /** Y轴位移 */
  y: number;
  /** Z轴位移 */
  z: number;
}

/**
 * 拖拽事件数据
 */
interface DragEventData {
  /** 原生鼠标/触摸事件 */
  event: {
    /** 页面X坐标 */
    pageX: number;
    /** 页面Y坐标 */
    pageY: number;
    /** 鼠标滚轮Y轴增量 */
    wheelDeltaY?: number;
    /** 鼠标滚轮增量(兼容) */
    wheelDelta?: number;
    /** 滚轮详细信息(Firefox) */
    detail?: number;
  };
}

/**
 * 正交相机移动控制命令
 * 
 * 支持功能：
 * - 中键拖拽平移相机
 * - 滚轮缩放相机视野
 * - 仅在正交投影模式下生效
 * 
 * @extends {HSApp.Cmd.Command}
 */
export declare class CmdMoveOrthCamera3D extends HSApp.Cmd.Command {
  /**
   * 中键拖拽起始点坐标
   * 用于计算相机移动增量
   * @private
   */
  private _middleMouseOriginPoint?: MousePoint;

  /**
   * 构造函数
   * @param args - 命令初始化参数
   */
  constructor(...args: unknown[]);

  /**
   * 命令执行入口
   * 本命令为交互式命令，实际逻辑在事件回调中处理
   */
  onExecute(): void;

  /**
   * 接收并分发交互事件
   * 
   * @param eventType - 事件类型：
   *   - "dragstart": 拖拽开始
   *   - "dragmove": 拖拽中
   *   - "dragend": 拖拽结束
   *   - "zoom": 缩放操作
   * @param eventData - 事件相关数据
   * @returns 事件是否被处理
   */
  onReceive(eventType: string, eventData?: DragEventData): boolean | void;

  /**
   * 处理拖拽开始事件
   * 
   * @returns 是否为正交相机视图（满足执行条件）
   */
  onDragStart(): boolean;

  /**
   * 处理拖拽结束事件
   * 
   * - 清理拖拽起始点
   * - 触发相机变化结束信号
   * - 完成命令执行
   * 
   * @returns 是否成功处理
   */
  onDragEnd(): boolean;

  /**
   * 处理拖拽移动事件
   * 
   * 根据鼠标位移计算相机和目标点的3D空间位移，
   * 实现相机平移效果
   * 
   * @param eventData - 拖拽事件数据
   * @returns 是否成功更新相机位置
   */
  onDragMove(eventData: DragEventData): boolean;

  /**
   * 处理缩放事件
   * 
   * 根据滚轮方向调整正交相机的缩放级别
   * 
   * @param eventData - 滚轮事件数据
   * @returns 是否触发缩放
   */
  onZoom(eventData: DragEventData): boolean;

  /**
   * 修改相机缩放级别
   * 
   * @param direction - 缩放方向：
   *   - 正数：放大（减小zoom值）
   *   - 负数：缩小（增大zoom值）
   */
  changeCameraZoom(direction: number): void;

  /**
   * 计算拖拽产生的相机位移量
   * 
   * 将屏幕坐标转换为3D世界坐标，
   * 计算当前鼠标位置与起始位置的3D空间差值
   * 
   * @param eventData - 拖拽事件数据
   * @param camera - Three.js相机对象
   * @param viewWidth - 视口宽度（像素）
   * @param viewHeight - 视口高度（像素）
   * @returns 3D空间中的位移向量
   * @private
   */
  private _calcMiddleDragData(
    eventData: DragEventData,
    camera: unknown,
    viewWidth: number,
    viewHeight: number
  ): DragDeltaData;

  /**
   * 标识命令为瞬态命令
   * 
   * 瞬态命令不会被记录到命令历史中，
   * 适用于相机控制等交互操作
   * 
   * @returns 总是返回 true
   */
  isTransient(): boolean;
}