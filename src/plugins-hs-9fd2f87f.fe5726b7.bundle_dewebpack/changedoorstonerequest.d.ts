/**
 * 门槛石材质更改请求模块
 * 提供门槛石材质的修改、撤销和重做功能
 */

import type { MaterialData } from 'HSCore/Material/Manager';
import type { TransactionRequest } from 'HSCore/Transaction/Request';
import type { Opening } from 'HSCore/Model/Opening';
import type { TransactionManager } from 'HSCore/Transaction/Manager';
import type { Product } from 'HSCatalog/Product';
import type { Plugin } from 'HSApp/PluginManager';

/**
 * 门槛石更改请求类
 * 继承自核心事务请求，用于处理门槛石材质的变更操作
 */
export declare class ChangeDoorStoneRequest extends HSCore.Transaction.Request {
  /** 目标开口对象（门或窗） */
  private readonly _opening: Opening;
  
  /** 新的材质数据 */
  private readonly _materialData: MaterialData;
  
  /** 保存的原始材质数据，用于撤销/重做 */
  private _savedMaterial?: MaterialData;

  /**
   * 构造门槛石更改请求
   * @param opening - 需要更改门槛石的开口对象
   * @param materialData - 新的门槛石材质数据
   */
  constructor(opening: Opening, materialData: MaterialData);

  /**
   * 提交事务时执行
   * 将新材质应用到门槛石
   */
  onCommit(): void;

  /**
   * 撤销操作时执行
   * 恢复到原始材质
   */
  onUndo(): void;

  /**
   * 重做操作时执行
   * 重新应用新材质
   */
  onRedo(): void;

  /**
   * 内部方法：执行门槛石材质更改
   * @param material - 要应用的材质数据
   */
  private _changeDoorStone(material: MaterialData): void;
}

/**
 * 面板ID枚举
 * 定义材质选择面板的各个分类标识
 */
interface PanelId {
  /** 最近使用 */
  Recent: string;
  /** 上传模型 */
  UploadModel: string;
}

/**
 * 产品选择处理器参数
 */
interface ProductSelectedParams {
  /** 选中的产品数据 */
  product: Product;
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 材质选择器配置选项
 */
interface MaterialSelectorOptions {
  /** 材质类别类型 */
  types: HSCatalog.CategoryTypeEnum;
  /** 客户自定义分类面板 */
  customerCategories: string[];
  /** 默认选中的材质ID */
  seekId?: string;
  /** 可选过滤条件 */
  optionFilters?: Array<{
    categoryType: HSCatalog.CategoryTypeEnum;
    filters: Record<string, string>;
    sceneType: HSApp.Catalog.DataConfig.SceneType;
  }>;
}

/**
 * 材质选择器回调接口
 */
interface MaterialSelectorCallbacks {
  /**
   * 产品选中时的回调
   * @param product - 选中的产品
   * @param context - 上下文对象（包含transManager等）
   */
  productSelectedHandler(product: Product, context: { transManager: TransactionManager }): void;

  /**
   * 面板显示时的回调
   * 更新状态栏按钮为激活状态
   */
  panelShownHandler(): void;

  /**
   * 面板隐藏时的回调
   * 更新状态栏按钮为非激活状态
   */
  panelHiddenHandler(): void;
}

/**
 * 创建门槛石材质选择器的工厂函数
 * 
 * @param statusBar - 状态栏对象，用于控制按钮状态
 * @param panelConfig - 面板配置对象，包含PanelId等信息
 * @returns 返回一个函数，该函数接收选中的开口数组，返回选择器配置和回调
 * 
 * @example
 *