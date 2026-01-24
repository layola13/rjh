/**
 * 实体内容工具模块
 * 提供实体内容处理、类型判断、货币转换、面积计算等工具函数
 */

import type { HSCatalog, HSPaveSDK, HSCore } from './hs-types';

/**
 * 实体对象接口
 */
interface Entity {
  /** 实体类型信息 */
  type?: {
    /** 内容类型字符串，使用逗号+空格分隔 */
    contentType?: string;
  };
  [key: string]: unknown;
}

/**
 * 元素对象接口
 */
interface Element {
  /** 内容类型，使用斜杠分隔 */
  contentType?: string;
  [key: string]: unknown;
}

/**
 * 三维尺寸接口
 */
interface Size3D {
  /** X轴尺寸 */
  x: number;
  /** Y轴尺寸 */
  y: number;
  /** Z轴尺寸 */
  z: number;
}

/**
 * 分组实体数据接口
 */
interface GroupData {
  /** 分组键 */
  groupKey: string;
  /** 实体列表 */
  entities: unknown[];
}

/**
 * BOM数据构建器接口
 */
interface Bom2DataBuilder {
  /** 从实体构建BOM数据 */
  buildBom2Data(entity: unknown): unknown;
}

/**
 * 参数实例接口
 */
interface ParameterInstance {
  /** 获取参数对象 */
  getParameter(name: string): unknown;
  /** 获取参数值 */
  getParameterValue(name: string): unknown;
}

/**
 * 参数容器接口
 */
interface ParameterContainer {
  /** 参数实例 */
  instance: ParameterInstance;
}

/**
 * 将实体的内容类型添加到元素中
 * 将逗号+空格分隔的内容类型转换为斜杠分隔格式
 * 
 * @param entity - 源实体对象
 * @param element - 目标元素对象
 */
export function addEntityContentToElement(entity: Entity, element: Element): void;

/**
 * 判断内容类型是否属于指定类型
 * 使用缓存的ContentType实例进行类型检查
 * 
 * @param contentType - 内容类型字符串，使用逗号+空格分隔
 * @param targetType - 目标类型
 * @returns 是否属于目标类型
 */
export function contentTypeIsTypeOf(contentType: string | null | undefined, targetType: string): boolean;

/**
 * 美元金额转换（乘以固定汇率0.1571）
 * 
 * @param amount - 原始金额
 * @param decimals - 可选的小数位数，不传返回原始计算结果，传入则四舍五入到指定位数
 * @returns 转换后的金额，如果输入为undefined则返回undefined
 */
export function dollarTransfer(amount: number | undefined): number | undefined;
export function dollarTransfer(amount: number | undefined, decimals: number): string | undefined;
export function dollarTransfer(amount: number | undefined, decimals?: number): number | string | undefined;

/**
 * 从分组中生成BOM2数据
 * 
 * @param groups - 分组数据数组
 * @param groupKey - 要查找的分组键
 * @param builder - BOM数据构建器
 * @returns BOM数据数组，如果未找到分组则返回空数组
 */
export function genBom2DataFromGroup(
  groups: GroupData[],
  groupKey: string,
  builder: Bom2DataBuilder
): unknown[];

/**
 * 计算区域面积
 * 支持裁剪后计算，并扣除孔洞面积
 * 
 * @param regions - 区域数组
 * @param clipRegion - 可选的裁剪区域
 * @returns 总面积（已扣除孔洞）
 */
export function getArea(regions: unknown[], clipRegion?: unknown): number;

/**
 * 从材质中获取颜色
 * 优先使用材质颜色，其次使用混合颜色
 * 
 * @param material - 材质对象
 * @returns 颜色值，如果材质未使用颜色则返回undefined
 */
export function getColor(material: unknown): unknown | undefined;

/**
 * 获取分类的英文类型名称
 * 通过中文名称查找对应的英文名称
 * 
 * @param chineseName - 中文分类名称
 * @returns 对应的英文分类名称
 */
export function getEnCategoryTypeName(chineseName: string): string;

/**
 * 判断是否为全局租户（fp）
 * 
 * @returns 是否为全局租户
 */
export function isGlobal(): boolean;

/**
 * 判断是否需要计算砖块数量
 * 检查建筑产品元数据是否需要转换铺装图案
 * 
 * @param productId - 产品ID
 * @returns 是否需要计算砖块数量
 */
export function needCalculateBrickCount(productId: string): boolean;

/**
 * 批量设置对象参数值
 * 从参数容器中读取参数值并赋值到目标对象
 * 
 * @param target - 目标对象
 * @param container - 参数容器对象
 * @param parameterMapping - 参数映射对象，键为目标对象属性名，值为参数名
 * @param strictMode - 严格模式，为true时参数不存在会报错，默认false
 */
export function setObjectParameterValues(
  target: Record<string, unknown>,
  container: ParameterContainer,
  parameterMapping: Record<string, string>,
  strictMode?: boolean
): void;

/**
 * 将数字数组转换为三维尺寸对象
 * 
 * @param numberArray - 至少包含3个元素的数字数组
 * @returns 三维尺寸对象，如果数组无效则返回undefined
 */
export function turnNumberArrayToSize(numberArray: number[] | null | undefined): Size3D | undefined;