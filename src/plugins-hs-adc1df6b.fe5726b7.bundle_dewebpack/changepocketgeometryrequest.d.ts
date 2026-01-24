/**
 * 修改口袋几何形状请求
 * 用于处理开口上口袋几何属性的变更，支持事务管理（提交、撤销、重做）
 */

import type { Request } from 'HSCore.Transaction';
import type { Pocket, PocketMetaData } from 'HSCore.Model';
import type { Opening } from 'HSCore.Model';
import type { StatusBarControl } from 'HSApp';
import type { TransactionManager } from 'HSCore.Transaction';
import type { Product } from 'HSCatalog';

/**
 * 口袋几何形状变更请求类
 * 继承自 HSCore.Transaction.Request，实现撤销/重做功能
 */
export declare class ChangePocketGeometryRequest extends Request {
  /**
   * 关联的开口对象
   * @private
   */
  private readonly _opening: Opening;

  /**
   * 新口袋的元数据配置
   * @private
   */
  private readonly _metaData: PocketMetaData;

  /**
   * 保存的口袋实例（用于撤销/重做操作）
   * @private
   */
  private _savedPocket?: Pocket;

  /**
   * 构造函数
   * @param opening - 目标开口对象
   * @param metaData - 口袋元数据配置
   */
  constructor(opening: Opening, metaData: PocketMetaData);

  /**
   * 提交操作：创建新口袋并应用几何变更
   */
  onCommit(): void;

  /**
   * 撤销操作：恢复到保存的口袋状态
   */
  onUndo(): void;

  /**
   * 重做操作：重新应用保存的口袋状态
   */
  onRedo(): void;

  /**
   * 执行几何形状变更的核心逻辑
   * @param pocket - 要应用的口袋对象
   * @private
   */
  private _changeGeometry(pocket: Pocket): void;
}

/**
 * 口袋选择面板配置选项
 */
export interface PocketPanelOptions {
  /** 分类类型（外部开口口袋） */
  types: typeof HSCatalog.CategoryTypeEnum.ext_opening_pocket;
  
  /** 客户自定义分类列表 */
  customerCategories: string[];
  
  /** 推荐产品的配置文件列表 */
  guessYourFav: unknown[];
  
  /** 要定位的产品ID（可选） */
  seekId?: string;
}

/**
 * 面板事件处理器集合
 */
export interface PocketPanelHandlers {
  /**
   * 面板显示时的回调
   * 激活状态栏中的口袋几何按钮
   */
  panelShownHandler(): void;

  /**
   * 产品选中时的回调
   * @param product - 选中的产品对象
   * @param context - 上下文对象，包含事务管理器
   */
  productSelectedHandler(
    product: Product,
    context: { transManager: TransactionManager }
  ): void;

  /**
   * 面板隐藏时的回调
   * 取消激活状态栏中的口袋几何按钮
   */
  panelHiddenHandler(): void;
}

/**
 * 创建口袋几何变更请求的工厂函数
 * @param selections - 选中的开口对象数组
 * @param statusBarAPI - 状态栏API对象
 * @returns 包含面板配置选项和事件处理器的元组
 */
export default function createChangePocketGeometryRequest(
  selections: Opening[],
  statusBarAPI: {
    getStatusBarControlById(id: string): StatusBarControl | undefined;
  }
): [PocketPanelOptions, PocketPanelHandlers];

/**
 * 获取推荐产品配置的辅助函数类型
 */
declare function getGuessYourFavoriteProducts(pocket: Pocket): {
  profiles: unknown[];
};