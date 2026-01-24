/**
 * B3Slab 模块
 * 表示建筑信息模型(BIM)中的楼板/平板构件
 */

import { B3Entity } from './B3Entity';

/**
 * BOM3 数据结构接口
 * 用于楼板实体的数据传输对象
 */
export interface B3SlabBom3Data {
  /** 转换后的 BOM3 实体对象 */
  entity: unknown;
  /** 基础层ID */
  baselayerId?: string | number;
  /** 底层ID */
  underlayerId?: string | number;
  /** 楼板厚度 */
  thickness?: number;
}

/**
 * B3Slab 类
 * 继承自 B3Entity，表示三维建筑模型中的楼板构件
 * 提供楼板实体与 BOM3 数据格式之间的转换功能
 */
export declare class B3Slab extends B3Entity {
  /**
   * 构造函数
   * 创建一个新的 B3Slab 实例
   */
  constructor();

  /**
   * 构建 BOM3 数据
   * 将实体对象转换为 BOM3 格式的数据结构
   * 
   * @param entity - 源实体对象，包含楼板的原始属性数据
   * @returns 转换后的 BOM3 数据对象，包含实体信息和楼板参数
   * 
   * @remarks
   * 该方法会提取以下属性：
   * - baselayerId: 基础层标识符
   * - underlayerId: 底层标识符
   * - thickness: 楼板厚度值
   */
  buildBom3Data(entity: unknown): B3SlabBom3Data;
}