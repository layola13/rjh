/**
 * SVG属性工具模块
 * 用于计算和获取SVG内容的边界属性
 */

import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';
import type { HSConstants } from './HSConstants';

/**
 * SVG内容边界属性
 */
export interface SVGContentAttributes {
  /** 左侧位置（相对于父容器） */
  left: number;
  /** 顶部位置（相对于父容器） */
  top: number;
  /** 内容宽度 */
  width: number;
  /** 内容高度 */
  height: number;
  /** 旋转角度（度） */
  rotation: number;
}

/**
 * 内容实体接口
 * 表示可渲染的SVG内容对象
 */
export interface ContentEntity {
  /** 旋转角度 */
  rotation: number;
  /** 检查实体是否为指定模型类的实例 */
  instanceOf(modelClass: string): boolean;
  /** 检查指定标志位是否开启 */
  isFlagOn(flag: number): boolean;
  /** 子成员列表（仅组类型） */
  members?: ContentEntity[];
}

/**
 * 递归获取内容列表的SVG属性
 * 
 * @description
 * 遍历内容实体树，计算每个可见、非移除节点的边界框属性。
 * 对于分组节点，递归处理其子成员。
 * 
 * @param contents - 内容实体数组
 * @returns SVG属性数组，包含每个内容的位置、尺寸和旋转信息
 * 
 * @example
 *