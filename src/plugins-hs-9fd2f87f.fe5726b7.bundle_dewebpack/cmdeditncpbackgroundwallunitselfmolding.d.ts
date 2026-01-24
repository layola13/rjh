/**
 * 参数化背景墙单元自定义线条编辑命令
 * 用于管理背景墙单元的左右侧线条装饰
 * @module CmdEditNCPBackgroundWallUnitSelfMolding
 */

import { Command } from 'HSApp/Cmd/Command';
import { NCPBackgroundWallUnit } from 'HSCore/Model/NCPBackgroundWallUnit';
import { Line3d, Coordinate3 } from './Geometry';
import { TransactionManager, Request } from './Transaction';
import { CatalogManager } from './CatalogManager';
import { Product, MaterialData } from './Product';

/**
 * 线条类型
 */
export type MoldingType = 'left' | 'right';

/**
 * 线条安装信息
 */
export interface MoldingInfo {
  /** 线条坐标系 */
  coord: Coordinate3;
  /** 面标签 */
  faceTag: string;
  /** 是否翻转 */
  flip: boolean;
  /** X轴翻转 */
  flipX: boolean;
  /** Y轴翻转 */
  flipY: boolean;
  /** X偏移 */
  offsetX: number;
  /** Y偏移 */
  offsetY: number;
  /** 线条路径 */
  path: Line3d[];
  /** 线条截面高度 */
  profileHeight: number;
  /** 线条截面宽度 */
  profileWidth: number;
  /** 材质数据 */
  materialData: MaterialData;
  /** 自定义线条类型 */
  selfMoldingType: MoldingType;
  /** 偏移距离 */
  offset: number;
}

/**
 * 打开线条编辑的消息参数
 */
export interface SelfMoldingOpenMessage {
  /** 线条类型（左侧或右侧） */
  moldingType: MoldingType;
}

/**
 * 关闭线条编辑的消息参数
 */
export interface SelfMoldingCloseMessage {
  /** 线条类型 */
  moldingType: MoldingType;
}

/**
 * 线条创建的消息参数
 */
export interface SelfMoldingCreateMessage {
  /** 线条安装信息 */
  moldingInfo: MoldingInfo;
  /** 产品元数据 */
  meta: Product;
  /** 线条类型 */
  moldingType: MoldingType;
}

/**
 * 消息类型联合类型
 */
export type MessageType = 
  | 'onSelfMoldingOpen'
  | 'onSelfMoldingClose'
  | 'onSelfMoldingReset';

/**
 * 消息参数联合类型
 */
export type MessagePayload = 
  | SelfMoldingOpenMessage
  | SelfMoldingCloseMessage
  | SelfMoldingCreateMessage
  | Record<string, never>;

/**
 * 参数化背景墙单元自定义线条编辑命令
 * 
 * 该命令负责处理背景墙单元左右两侧装饰线条的添加、编辑和删除操作。
 * 支持的操作包括：
 * - 打开线条编辑器
 * - 关闭线条编辑器并提交更改
 * - 重置线条到默认状态
 * 
 * @example
 *