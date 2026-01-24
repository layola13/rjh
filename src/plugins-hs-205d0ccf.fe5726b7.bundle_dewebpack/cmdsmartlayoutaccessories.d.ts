/**
 * 智能布局配件命令模块
 * 用于在场景中智能添加和布局配件产品
 */

import { HSApp } from 'HSApp';
import { HSCatalog } from 'HSCatalog';
import { HSFPConstants } from 'HSFPConstants';
import { SmartLayoutUtil } from './SmartLayoutUtil';

/**
 * 产品位置信息
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * 产品旋转信息（欧拉角，单位：弧度）
 */
interface Rotation {
  x: number;
  y: number;
  z: number;
}

/**
 * 产品缩放信息
 */
interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * 软布料数据
 */
interface SoftClothData {
  /** 软布料元数据 */
  meta?: unknown;
  /** 宿主对象 */
  host?: unknown;
}

/**
 * 算法输出的产品布局数据
 */
interface LayoutProductData {
  /** 产品ID */
  id: string;
  /** 位置 [x, y, z] */
  position: [number, number, number];
  /** 旋转 [x, y, z] */
  rotation: [number, number, number];
  /** 缩放 [x, y, z] */
  scale: [number, number, number];
  /** 子产品列表 */
  sub_list?: LayoutProductData[];
  /** 软布料特定数据 */
  softClothData?: SoftClothData;
}

/**
 * 产品目录数据映射
 * key: 产品ID
 * value: 产品目录对象
 */
type ProductCatalogMap = Record<string, unknown>;

/**
 * 算法数据映射
 * key: 锚点内容ID
 * value: 该锚点下的产品布局数据列表
 */
type AlgorithmDataMap = Map<string, LayoutProductData[]>;

/**
 * 智能布局配件命令
 * 
 * 该命令用于根据算法数据在场景中智能添加和布局配件产品。
 * 支持：
 * - 删除旧的产品数据
 * - 按层级结构添加新产品
 * - 处理软布料类型的特殊产品
 * - 批量事务管理
 */
export declare class CmdSmartLayoutAccessories extends HSApp.Cmd.Command {
  private _anchorContent?: unknown;
  private _models: unknown[];
  private _algorithmData: AlgorithmDataMap;
  private _productData: ProductCatalogMap;
  private _previousData: unknown[];
  private _transMgr: unknown;
  private _mergePreviousRequest: boolean;

  /**
   * 构造函数
   * 
   * @param models - 目标模型列表
   * @param algorithmData - 算法计算出的布局数据（Map结构：锚点ID -> 产品列表）
   * @param productData - 产品目录数据映射（产品ID -> 产品对象）
   * @param previousData - 需要删除的旧产品数据列表
   * @param anchorContent - 可选的锚点内容对象，用于指定产品添加的父对象
   */
  constructor(
    models: unknown[],
    algorithmData: AlgorithmDataMap,
    productData?: ProductCatalogMap,
    previousData?: unknown[],
    anchorContent?: unknown
  );

  /**
   * 执行命令
   * 
   * 主要流程：
   * 1. 删除所有旧的产品数据（previousData）
   * 2. 遍历算法数据，按锚点分组添加产品
   * 3. 递归处理子产品
   * 4. 返回所有新添加的产品列表
   * 
   * @returns 新添加的产品对象数组
   */
  onExecute(): unknown[];

  /**
   * 添加产品及其子产品
   * 
   * @param productCatalog - 产品目录映射
   * @param layoutData - 产品布局数据
   * @param parentModel - 父模型对象
   * @param resultList - 累积结果列表
   * @returns 更新后的产品列表（包含新添加的产品）
   * 
   * @private
   */
  private _addProducts(
    productCatalog: ProductCatalogMap,
    layoutData: LayoutProductData,
    parentModel: unknown,
    resultList: unknown[]
  ): unknown[];

  /**
   * 处理软布料类型产品
   * 
   * 对于软布料类型的产品，需要额外调用 PlaceSoftCloth 请求
   * 来设置其物理模拟相关的元数据和宿主对象
   * 
   * @param product - 产品对象
   * @param softClothData - 软布料数据（包含 meta 和 host）
   * 
   * @private
   */
  private _addSoftCloth(product: unknown, softClothData?: SoftClothData): void;
}