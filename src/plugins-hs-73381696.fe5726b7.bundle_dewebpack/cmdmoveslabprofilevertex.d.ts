import type { Command } from 'HSApp.Cmd';
import type { MoveSlabProfileVertex as MoveSlabProfileVertexGizmo } from './gizmos';
import type { Request } from './types/Request';
import type { ModelLayer } from './types/ModelLayer';
import type { Slab } from './types/Slab';
import type { SlabProfileVertex } from './types/SlabProfileVertex';

/**
 * 楼板轮廓顶点位置信息
 */
export interface VertexPosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * Gizmo鼠标移动事件数据
 */
export interface GizmoMouseMoveEventData {
  /** 移动偏移量 */
  offset: VertexPosition;
}

/**
 * 拖拽移动事件数据
 */
export interface DragMoveEventData {
  /** 原始鼠标事件 */
  event: MouseEvent;
}

/**
 * 日志点击率参数
 */
export interface ClicksRatioParams {
  /** 操作ID */
  id: string;
  /** 操作名称 */
  name: string;
}

/**
 * 当前参数配置
 */
export interface CurrentParams {
  /** 活动区段类型 */
  activeSection: string;
  /** 点击率统计参数 */
  clicksRatio: ClicksRatioParams;
}

/**
 * 命令：移动楼板轮廓顶点
 * 
 * 该命令用于交互式移动楼板轮廓上的顶点位置。
 * 支持通过鼠标拖拽或Gizmo操纵器进行精确移动。
 * 
 * @example
 *