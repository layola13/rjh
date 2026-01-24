/**
 * FoldTool - 折叠工具模块
 * 用于处理折叠窗帘、折叠屏风和折叠遮阳帘等折叠类图形的工具
 */

import { ToolType } from './ToolType';
import { FenesTool } from './FenesTool';
import { ShapeType } from './ShapeType';

/**
 * 折叠工具类型映射接口
 */
interface FoldShapeTypeMap extends Map<ToolType, ShapeType> {}

/**
 * 折叠工具类
 * 继承自FenesTool，提供折叠类图形的创建和管理功能
 */
export declare class FoldTool extends FenesTool {
  /**
   * 工具类型到图形类型的映射表
   * - foldSash: 折叠窗扇
   * - foldScreen: 折叠屏风
   * - foldShade: 折叠遮阳帘
   */
  readonly shapeTypes: FoldShapeTypeMap;

  /**
   * 构造函数
   * 初始化折叠工具及其类型映射
   */
  constructor();

  /**
   * 添加折叠图形到视图
   * @param fenes - 要添加的折叠图形数据
   * @remarks
   * 调用此方法后会自动释放当前工具
   */
  addFenes(fenes: unknown): void;
}

/**
 * 工具类型枚举（从模块5导入）
 */
declare enum ToolType {
  /** 折叠窗扇 */
  foldSash = 'foldSash',
  /** 折叠屏风 */
  foldScreen = 'foldScreen',
  /** 折叠遮阳帘 */
  foldShade = 'foldShade'
}

/**
 * 图形类型枚举（从模块1导入）
 */
declare enum ShapeType {
  /** 折叠窗扇图形 */
  FoldSash = 'FoldSash',
  /** 折叠屏风图形 */
  FoldScreen = 'FoldScreen',
  /** 折叠遮阳帘图形 */
  FoldShade = 'FoldShade'
}

/**
 * 视图接口（从FenesTool继承）
 */
interface View {
  /** 图形管理器 */
  shapeManager: ShapeManager;
  /** 工具管理器 */
  toolManager: ToolManager;
}

/**
 * 图形管理器接口
 */
interface ShapeManager {
  /**
   * 添加折叠图形
   * @param fenes - 折叠图形数据
   * @param shapeType - 图形类型
   */
  addFold(fenes: unknown, shapeType: ShapeType): void;
}

/**
 * 工具管理器接口
 */
interface ToolManager {
  /**
   * 释放当前激活的工具
   */
  releaseTool(): void;
}