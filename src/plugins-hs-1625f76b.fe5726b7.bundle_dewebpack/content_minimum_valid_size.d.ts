/**
 * 内容尺寸验证和计算工具模块
 * 提供内容物（厨房水槽、灶台、开孔等）的尺寸验证、约束计算和吸附检测功能
 */

import type { HSCatalog } from './catalog-types';
import type { HSCore } from './core-types';
import type { HSApp } from './app-types';
import type { HSFPConstants } from './constants-types';
import type * as THREE from 'three';

/**
 * 内容物最小有效尺寸（米）
 */
export const CONTENT_MINIMUM_VALID_SIZE: number;

/**
 * 空调孔开孔最小有效尺寸（米）
 */
export const AIR_CONDITION_HOLE_MINIMUM_VALID_SIZE: number;

/**
 * 尺寸类型枚举
 */
export const SizeType: {
  /** 混合类型 */
  readonly Mixed: 'mixed';
  /** 默认内容类型 */
  readonly Default: 'Content';
  /** 开孔类型 */
  readonly Opening: 'opening';
  /** 固定厚度类型 */
  readonly FixedThickness: 'fixedthickness';
  /** 楼梯类型 */
  readonly Stair: 'stair';
};

export type SizeTypeValue = typeof SizeType[keyof typeof SizeType];

/**
 * 尺寸属性名称映射
 */
export const SIZE_PROP_NAME: {
  readonly x: 'XSize';
  readonly y: 'YSize';
  readonly z: 'ZSize';
};

/**
 * 三维尺寸对象
 */
export interface Size3D {
  /** X轴尺寸（米） */
  x: number;
  /** Y轴尺寸（米） */
  y: number;
  /** Z轴尺寸（米） */
  z: number;
}

/**
 * 吸附的墙体信息
 */
export interface SnappedWallInfo {
  /** 吸附的墙体宿主 */
  host: HSCore.Model.Wall;
  /** 墙体法线方向 */
  normal: THREE.Vector3;
  /** 吸附方向 */
  direction: HSFPConstants.Direction;
}

/**
 * 吸附的内容物信息
 */
export interface SnappedContentInfo {
  /** 吸附面法线方向 */
  normal: THREE.Vector3;
  /** 吸附方向 */
  direction: HSFPConstants.Direction;
  /** 交叉长度（米） */
  intersectionLength: number;
  /** 吸附的内容物对象 */
  content: HSCore.Model.Content;
}

/**
 * 判断内容物是否为厨房水槽或灶台类型
 * @param content - 内容物模型实例
 * @returns 如果是灶台、水槽或洗手盆（非一体式）返回 true
 */
export function ContentisCookSink(content: HSCore.Model.Content): boolean;

/**
 * 判断定制内容物是否为厨房水槽或灶台类型（通过定制类型判断）
 * @param content - 定制内容物模型实例
 * @returns 如果定制类型包含灶台或水槽返回 true
 */
export function DContentIsCookSink(content: HSCore.Model.CustomizedContent): boolean;

/**
 * 当前环境是否禁用尺寸编辑功能
 * @returns 如果在禁用尺寸编辑的环境中返回 true
 */
export function envDisabledDimension(): boolean;

/**
 * 当前环境是否需要特殊处理厨房水槽/灶台的尺寸
 * @returns 如果在橱柜定制等特定环境中返回 true
 */
export function envNeedDealCookSinkDimension(): boolean;

/**
 * 获取内容物的最大有效尺寸
 * @param content - 内容物模型实例
 * @returns 包含 x、y、z 三个方向最大尺寸的对象（米）
 */
export function getMaxmumValidSize(
  content: HSCore.Model.Content | HSCore.Model.CustomizedPMInstanceModel
): Size3D;

/**
 * 获取内容物的最小有效尺寸
 * 考虑比例锁定、开孔类型等约束条件
 * @param content - 内容物模型实例
 * @returns 包含 x、y、z 三个方向最小尺寸的对象（米）
 */
export function getMinimumValidSize(content: HSCore.Model.Content): Size3D;

/**
 * 获取尺寸调整请求的类型
 * @param content - 内容物模型实例
 * @returns 对应的请求类型枚举值
 */
export function getResizeRequestType(
  content: HSCore.Model.Content
): HSFPConstants.RequestType;

/**
 * 获取内容物的尺寸类型分类
 * @param content - 内容物模型实例或实例数组
 * @returns 尺寸类型枚举值
 */
export function getSizeType(
  content: HSCore.Model.Content | HSCore.Model.Content[]
): SizeTypeValue;

/**
 * 获取内容物吸附的天花板对象
 * @param content - 内容物模型实例
 * @returns 吸附的天花板对象，如果未吸附返回 undefined
 */
export function getSnappedCeiling(
  content: HSCore.Model.Content
): HSCore.Model.Ceiling | HSCore.Model.NgCeiling | undefined;

/**
 * 获取与指定内容物吸附的其他内容物列表
 * 仅适用于组件或定制橱柜
 * @param content - 内容物模型实例
 * @returns 吸附的内容物信息数组
 */
export function getSnappedContents(content: HSCore.Model.Content): SnappedContentInfo[];

/**
 * 获取与内容物吸附的墙体列表
 * @param content - 内容物模型实例
 * @returns 吸附的墙体信息数组
 */
export function getSnappedWalls(content: HSCore.Model.Content): SnappedWallInfo[];

/**
 * 判断内容物的Y轴尺寸是否固定（不可编辑）
 * @param content - 内容物模型实例
 * @returns 如果Y轴尺寸固定返回 true
 */
export function isYSizeFixed(content: HSCore.Model.Content): boolean;

/**
 * 判断内容物的Z轴尺寸是否固定（不可编辑）
 * @param content - 内容物模型实例
 * @returns 如果Z轴尺寸固定返回 true
 */
export function isZSizeFixed(content: HSCore.Model.Content): boolean;

/**
 * 计算内容物到墙体的平面距离
 * @param content - 内容物模型实例
 * @param wall - 墙体模型实例
 * @returns 距离值（米）
 */
export function planeDistanceBetween(
  content: HSCore.Model.Content,
  wall: HSCore.Model.Wall
): number;

/**
 * 在比例锁定模式下计算目标尺寸
 * 根据单个轴的目标值按比例计算其他轴的尺寸
 * @param content - 内容物模型实例
 * @param sizeConstraint - 尺寸约束，格式为 [轴名, 目标值]
 * @returns 包含所有轴计算后尺寸的对象
 */
export function calcTargetSizeWithProportionLocked(
  content: HSCore.Model.Content,
  sizeConstraint: [['x' | 'y' | 'z'], number]
): Partial<Size3D>;