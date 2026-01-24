/**
 * BOM数据转换模块
 * 提供BOM数据格式转换和生成相关功能
 */

import { B2Data } from './880393';
import { generateBomData } from './208816';

/**
 * BOM数据配置选项
 */
export interface BomDataOptions {
  [key: string]: unknown;
}

/**
 * BOM2数据结构
 */
export interface Bom2Data {
  [key: string]: unknown;
}

/**
 * 带状态的BOM2数据结构
 */
export interface Bom2DataWithStatus {
  data: Bom2Data;
  status: string | number;
  [key: string]: unknown;
}

/**
 * 将BOM数据转换为BOM2格式
 * 
 * @param bomData - 原始BOM数据
 * @param options - 可选配置参数
 * @returns Promise<Bom2Data> 转换后的BOM2数据
 * 
 * @example
 *