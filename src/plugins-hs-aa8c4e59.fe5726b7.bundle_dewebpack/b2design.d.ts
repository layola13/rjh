/**
 * B2Design 模块
 * 用于处理设计实体数据并构建 BOM2 数据结构
 */

import { B2Processor } from './B2Processor';

/**
 * 设计实体接口
 * 描述设计的基本属性
 */
interface DesignEntity {
  /** 设计ID */
  designId?: string | number;
  /** 设计名称 */
  designName?: string;
  /** 设计面积 */
  designArea?: number;
  /** 内部面积 */
  innerArea?: number;
  /** 卧室数量 */
  bedroom?: number;
  /** 客厅数量 */
  livingroom?: number;
  /** 浴室数量 */
  bathroom?: number;
  /** 版本ID */
  versionId?: string | number;
  /** 设计风格 */
  designStyle?: string;
}

/**
 * BOM2 数据接口
 * 物料清单数据结构
 */
interface Bom2Data {
  designId?: string | number;
  designName?: string;
  designArea?: number;
  innerArea?: number;
  bedroom?: number;
  livingroom?: number;
  bathroom?: number;
  versionId?: string | number;
  designStyle?: string;
}

/**
 * B2Design 上下文接口
 */
interface B2DesignContext {
  /** 设计实体对象 */
  designEntity: DesignEntity;
}

/**
 * B2Design 类
 * 继承自 B2Processor，用于处理设计相关的业务逻辑
 * 
 * @extends B2Processor
 */
export declare class B2Design extends B2Processor {
  /** 上下文对象，包含设计实体信息 */
  context: B2DesignContext;

  /**
   * 构建 BOM2 数据
   * 从设计实体中提取关键属性构建物料清单数据
   * 
   * @returns {Bom2Data} 包含设计关键信息的 BOM2 数据对象
   */
  buildBom2Data(): Bom2Data;
}