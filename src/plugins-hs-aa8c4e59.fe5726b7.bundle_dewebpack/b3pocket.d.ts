/**
 * B3Pocket 模块
 * 代表一个B3口袋实体，继承自B3Entity基类
 * 用于处理口袋相关的BOM3数据构建和参数映射
 */

import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity, setObjectParameterValues } from './utils';

/**
 * 材料类别接口
 */
interface MaterialCategory {
  /** 属性标识符 */
  attributeId: string;
  [key: string]: unknown;
}

/**
 * 材料接口
 */
interface Material {
  /** 材料类别 */
  category?: MaterialCategory;
  [key: string]: unknown;
}

/**
 * BOM3数据接口
 */
interface Bom3Data {
  /** 实体对象 */
  entity: unknown;
  /** 长度 */
  length?: unknown;
  /** 厚度 */
  thickness?: unknown;
  /** 宽度 */
  width?: unknown;
  /** 侧面 */
  side?: unknown;
  /** 材料信息 */
  material?: Material;
}

/**
 * 源实体接口
 */
interface SourceEntity {
  /** 长度参数 */
  length?: unknown;
  /** 厚度参数 */
  thickness?: unknown;
  /** 宽度参数 */
  width?: unknown;
  /** 侧面参数 */
  side?: unknown;
  /** 材料参数 */
  material?: unknown;
  [key: string]: unknown;
}

/**
 * 数量计算材料属性ID常量
 */
const QUANTITY_CALCULATION_MATERIAL_ATTR_ID = 'attr-Quantity-Calculation-Material';

/**
 * B3口袋实体类
 * 扩展B3Entity基类，提供口袋特定的BOM3数据构建功能
 */
export class B3Pocket extends B3Entity {
  /**
   * 构建BOM3数据对象
   * 将源实体转换为BOM3格式，并映射相关参数（长度、厚度、宽度、侧面、材料）
   * 
   * @param entity - 源实体对象，包含需要转换的参数
   * @returns BOM3数据对象，包含转换后的实体和参数值
   */
  buildBom3Data(entity: SourceEntity): Bom3Data {
    const bom3Data: Bom3Data = {} as Bom3Data;

    // 将实体转换为BOM3实体格式
    bom3Data.entity = turnEntityToBom3Entity(entity);

    // 设置对象参数值映射
    setObjectParameterValues(
      bom3Data,
      entity,
      {
        length: 'length',
        thickness: 'thickness',
        width: 'width',
        side: 'side',
        material: 'material'
      },
      true
    );

    // 如果材料及其类别存在，设置数量计算材料属性ID
    if (bom3Data.material?.category) {
      bom3Data.material.category.attributeId = QUANTITY_CALCULATION_MATERIAL_ATTR_ID;
    }

    return bom3Data;
  }
}