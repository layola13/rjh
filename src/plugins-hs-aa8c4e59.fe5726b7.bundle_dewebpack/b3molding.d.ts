/**
 * B3Molding模块
 * 用于处理模具实体（Molding Entity）的BOM3数据构建
 */

import { B3Entity } from './B3Entity';

/**
 * 实体的基础接口
 */
export interface Entity {
  /** 实体的唯一标识符 */
  id?: string;
  /** 实体类型 */
  type?: string;
  /** 实体的其他属性 */
  [key: string]: unknown;
}

/**
 * BOM3实体接口
 * 表示转换后的Bill of Materials实体
 */
export interface Bom3Entity {
  /** 实体的唯一标识符 */
  id?: string;
  /** 实体类型 */
  type?: string;
  /** 扩展属性 */
  [key: string]: unknown;
}

/**
 * 材料类别接口
 */
export interface MaterialCategory {
  /** 类别名称 */
  name?: string;
  /** 属性标识符，用于数量计算 */
  attributeId?: string;
}

/**
 * 材料接口
 */
export interface Material {
  /** 材料名称 */
  name?: string;
  /** 材料编号 */
  code?: string;
  /** 材料类别 */
  category?: MaterialCategory;
}

/**
 * BOM3数据结构
 * 包含实体信息和相关属性
 */
export interface Bom3Data {
  /** 转换后的BOM3实体 */
  entity?: Bom3Entity;
  /** 材料信息 */
  material?: Material;
  /** 长度尺寸 */
  length?: number | string;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 参数映射配置
 * 用于定义源属性到目标属性的映射关系
 */
export interface ParameterMapping {
  [sourceKey: string]: string;
}

/**
 * B3Molding类
 * 继承自B3Entity，专门用于处理模具相关的BOM数据
 * 
 * @example
 *