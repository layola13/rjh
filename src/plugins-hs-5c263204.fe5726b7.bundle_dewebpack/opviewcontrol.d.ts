/**
 * 视角控制操作模块
 * 负责处理场景视角切换、相机移动等功能
 */

import { OperationId, BaseOperation } from './BaseOperation';
import { getRoomsByIdOrType, cameraMoveToRoom, selectedTargetRoom } from './RoomUtils';

/**
 * 视角模式映射
 * 将用户友好的视角名称映射到系统内部的视角枚举值
 */
export const VIEW_MODE_MAP: Record<string, HSApp.View.ViewModeEnum | string> = {
  /** 2D平面视图 */
  "2D": HSApp.View.ViewModeEnum.Plane,
  /** 3D轨道视图 */
  "3D": HSApp.View.ViewModeEnum.OrbitView,
  /** 漫游模式（第一人称） */
  Roam: HSApp.View.ViewModeEnum.FirstPerson,
  /** 天花板视图（反射天花板平面图） */
  Ceiling: HSApp.View.ViewModeEnum.RCP,
  /** 其他自定义视角 */
  Others: "Others"
};

/**
 * 操作参数接口
 */
export interface OpViewControlParams {
  /** 视角子类型（2D/3D/Roam/Ceiling/Others） */
  subType: keyof typeof VIEW_MODE_MAP;
  /** 是否已选中实体 (1=已选中, 0=未选中) */
  isSelected?: number;
  /** 房间ID */
  roomId?: string;
  /** 房间类型 */
  roomType?: string;
  /** 输入的房间ID（用户明确指定） */
  inputRoomId?: string;
  /** 选中的实体ID */
  selectedId?: string;
}

/**
 * 执行上下文接口
 */
export interface ExecuteContext {
  /** 操作参数 */
  params: OpViewControlParams;
  /** 功能是否已完成 */
  isFuncDone?: boolean;
  /** 回复文本 */
  reply?: string;
  /** 推荐的后续操作类型列表 */
  recommendedOperationTypes?: string[];
}

/**
 * 房间信息接口
 */
export interface RoomInfo {
  /** 房间唯一标识 */
  id: string;
  /** 房间类型（如 "LivingRoom", "BedRoom"） */
  roomType: string;
  /** 房间类型显示名称 */
  roomTypeDisplayName?: string;
}

/**
 * 选择器选项接口
 */
export interface SelectorOption<T = unknown> {
  /** 显示文本 */
  label: string;
  /** 选项值 */
  value: T;
  /** 关联的房间信息（可选） */
  room?: RoomInfo;
}

/**
 * 单选配置接口
 */
export interface RadioConfig {
  /** 控件类型 */
  type: "radio";
  /** 选项列表 */
  options: SelectorOption<string>[];
  /** 默认选中值 */
  value: string;
  /** 值变更回调 */
  onChange: (value: string) => void;
}

/**
 * 按钮配置接口
 */
export interface ButtonConfig {
  /** 按钮索引（1=确认, 0=取消） */
  index: number;
  /** 按钮文本 */
  label: string;
}

/**
 * 视角控制操作类
 * 继承自BaseOperation，实现场景视角的切换与相机控制
 * 
 * @example
 *