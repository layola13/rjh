/**
 * 阵列粘贴内容命令
 * 用于在场景中以阵列方式粘贴实体（如灯具）
 */

import { CmdBaseArray } from './CmdBaseArray';
import { HSApp } from './HSApp';

/**
 * 实体数据结构
 */
export interface EntityData {
  /** 实体唯一标识 */
  id: string;
  /** 产品查找ID */
  seekId: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 环境ID */
  environmentId?: string;
  /** 视图模式 */
  viewMode?: string;
}

/**
 * 选中内容的JSON数据结构
 */
export interface SelectedContentJSON {
  /** 环境ID */
  environmentId: string;
  /** 视图模式 */
  viewMode: string;
  /** 实体数据数组 */
  data: EntityData[];
}

/**
 * 三维位置坐标
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 二维偏移量
 */
export interface Offset2D {
  x: number;
  y: number;
}

/**
 * 产品信息
 */
export interface Product {
  id: string;
  seekId: string;
  [key: string]: unknown;
}

/**
 * 阵列粘贴内容命令类
 * 继承自CmdBaseArray，实现实体的阵列粘贴功能
 */
export default class CmdPasteContentArray extends CmdBaseArray {
  /**
   * 构造函数
   * @param entities - 要操作的实体数组
   * @param arrayNum - 阵列数量
   */
  constructor(entities: EntityData[], arrayNum: number);

  /**
   * 执行粘贴实体阵列操作
   * 从剪贴板获取选中的实体JSON数据并执行粘贴
   */
  pasteEntityArray(): void;

  /**
   * 批量添加内容到场景
   * @param entities - 要添加的实体数据数组
   * @param contentsJSON - 内容JSON数据
   * @param productsMap - 产品ID到产品对象的映射
   */
  addContents(
    entities: EntityData[],
    contentsJSON: SelectedContentJSON,
    productsMap: Map<string, Product>
  ): void;

  /**
   * 添加单个内容到场景
   * @param entityData - 实体数据
   * @param contentsJSON - 内容JSON数据
   * @param floorplan - 平面图对象
   * @param productsMap - 产品映射
   * @param position - 放置位置
   */
  addContent(
    entityData: EntityData,
    contentsJSON: SelectedContentJSON,
    floorplan: unknown,
    productsMap: Map<string, Product>,
    position: Position3D
  ): void;

  /**
   * 计算偏移后的位置
   * @param position - 原始位置
   * @param offset - 偏移量
   * @returns 偏移后的新位置
   */
  offsetPosition(position: Position3D, offset: Offset2D): Position3D;

  /**
   * 计算指定倍数的偏移量
   * @param baseOffset - 基础偏移量
   * @param multiplier - 倍数
   * @returns 计算后的偏移量
   */
  getOffset(baseOffset: Offset2D, multiplier: number): Offset2D;

  /**
   * 检查是否不是当前视图模式
   * @param environmentId - 环境ID
   * @param viewMode - 视图模式
   * @returns 如果不是当前视图模式返回true
   */
  isNotCurrentViewMode(environmentId: string, viewMode: string): boolean;

  /**
   * 获取当前环境ID
   * @returns 当前激活的环境ID
   */
  getEnvId(): string;

  /**
   * 获取当前视图模式
   * @returns 当前主视图模式
   */
  getViewMode(): string;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志组类型
   */
  getCategory(): string;
}