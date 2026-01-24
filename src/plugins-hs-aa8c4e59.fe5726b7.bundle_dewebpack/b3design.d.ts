/**
 * B3Design 模块
 * 表示设计实体的数据结构和转换逻辑
 */

/**
 * 设计实体的数据接口
 * 包含设计的基本信息和空间属性
 */
interface B3DesignData {
  /** 设计唯一标识符 */
  designId?: string;
  
  /** 设计名称 */
  designName?: string;
  
  /** 设计区域面积 */
  designArea?: number;
  
  /** 内部使用面积 */
  innerArea?: number;
  
  /** 建筑总面积 */
  grossFloorArea?: number;
  
  /** 卧室数量 */
  bedroom?: number;
  
  /** 客厅数量 */
  livingroom?: number;
  
  /** 浴室数量 */
  bathroom?: number;
  
  /** 版本标识符 */
  versionId?: string;
}

/**
 * B3Design 类
 * 继承自 B3Entity，用于处理设计实体的数据转换
 * @extends B3Entity
 */
export declare class B3Design extends B3Entity {
  /**
   * 构造函数
   */
  constructor();
  
  /**
   * 构建 BOM3 数据格式
   * 将输入数据转换为标准的 B3Design 数据结构
   * @param source - 源数据对象，包含设计相关的原始数据
   * @returns 转换后的 B3DesignData 对象
   */
  buildBom3Data(source: Record<string, any>): B3DesignData;
}

/**
 * B3Entity 基类声明
 * 所有 B3 实体的基类
 */
declare class B3Entity {
  constructor();
}