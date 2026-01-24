/**
 * 模块：BarDragger
 * 用于管理不同形状类型的拖拽工具映射关系
 * 采用单例模式，提供形状与编辑工具的关联配置
 */

import { ToolType } from './path/to/ToolType';
import { ShapeType } from './path/to/ShapeType';

/**
 * 拖拽管理器类
 * 负责维护形状类型到编辑工具类型的映射关系
 * @singleton
 */
export declare class BarDragger {
  /**
   * 单例实例
   * @private
   */
  private static _instance?: BarDragger;

  /**
   * 获取单例实例
   * @returns BarDragger单例对象
   */
  static get Ins(): BarDragger;

  /**
   * 形状类型到工具类型的映射表
   * @private
   */
  private readonly drag: Map<ShapeType, ToolType>;

  /**
   * 私有构造函数，初始化形状与工具的映射关系
   * @private
   */
  private constructor();

  /**
   * 判断指定形状类型是否可拖拽
   * @param shapeType - 形状类型枚举值
   * @returns 如果该形状类型已注册拖拽工具则返回true，否则返回false
   */
  canDrag(shapeType: ShapeType): boolean;

  /**
   * 获取指定形状类型对应的编辑工具类型
   * @param shapeType - 形状类型枚举值
   * @returns 对应的工具类型，如果未找到则返回undefined
   */
  getTool(shapeType: ShapeType): ToolType | undefined;
}