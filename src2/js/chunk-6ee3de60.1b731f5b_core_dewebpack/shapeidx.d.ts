/**
 * ShapeIdx 模块
 * 提供形状类型索引查找功能
 */

import { ShapeType } from './ShapeType';

/**
 * 形状索引工具类
 * 用于在预定义的形状类型数组中查找指定形状类型的索引位置
 */
export declare class ShapeIdx {
  /**
   * 预定义的形状类型索引数组
   * 按特定顺序排列的所有支持的形状类型
   */
  static readonly tapidxs: readonly ShapeType[];

  /**
   * 查找指定形状类型在索引数组中的位置
   * @param shapeType - 要查找的形状类型
   * @returns 形状类型在数组中的索引位置，未找到则返回-1
   */
  static idx(shapeType: ShapeType): number;
}