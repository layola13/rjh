/**
 * BoundUtil模块 - 边界和轮廓工具集
 * 
 * 提供用于处理3D模型边界、轮廓和组件的实用工具函数。
 * 包含用于检测D型模型、追踪父级组件、处理孔洞和门窗的功能。
 * 
 * @module BoundUtil
 * @remarks 原始模块ID: 47341
 */

/**
 * 边界工具类
 * 提供边界计算和处理相关的静态方法
 */
export declare class BoundUtil {
  // 具体方法需要根据实际实现添加
}

/**
 * 轮廓工具类
 * 提供轮廓分析和处理相关的静态方法
 */
export declare class ProfileUtil {
  // 具体方法需要根据实际实现添加
}

/**
 * 判断给定对象是否为D型模型
 * 
 * @param model - 待检测的模型对象
 * @returns 如果是D型模型返回true，否则返回false
 */
export declare function isDModel(model: unknown): boolean;

/**
 * 沿父级链追踪检查是否存在指定标志
 * 
 * @param node - 起始节点
 * @param flag - 要检查的标志
 * @returns 如果在父级链上找到标志返回true，否则返回false
 */
export declare function isFlagOnTraceParents(node: unknown, flag: unknown): boolean;

/**
 * 沿组件父级链追踪检查是否存在指定标志
 * 
 * @param component - 起始组件
 * @param flag - 要检查的标志
 * @returns 如果在组件父级链上找到标志返回true，否则返回false
 */
export declare function isFlagOnTraceComponentParents(component: unknown, flag: unknown): boolean;

/**
 * 获取D型模型中的孔洞信息
 * 
 * @param dModel - D型模型对象
 * @returns 孔洞数组，如果没有孔洞则返回空数组
 */
export declare function getDHolesOfDModel(dModel: unknown): unknown[];

/**
 * 判断给定对象是否为合金门窗
 * 
 * @param object - 待检测的对象
 * @returns 如果是合金门窗返回true，否则返回false
 */
export declare function isAlloyDoorWindow(object: unknown): boolean;