/**
 * 右键菜单管理器
 * 负责生成和管理编辑器中的上下文菜单项
 */

import { RightMenuStatus, RightMenuItems } from './RightMenuTypes';

/**
 * 菜单项配置接口
 */
export interface MenuItemConfig {
  /** 菜单项唯一标识 */
  id?: string;
  /** 显示文本 */
  label: string;
  /** 图标资源路径 */
  src?: string;
  /** 排序权重 */
  order: number;
  /** 是否禁用 */
  disable?: boolean;
  /** 控件类型 */
  type?: PropertyBarControlTypeEnum;
  /** 点击回调 */
  onClick?: () => void | boolean;
  /** 子菜单项 */
  children?: MenuItemConfig[];
}

/**
 * 菜单项分组结果
 */
export interface MenuItemGroups {
  /** 默认菜单项 */
  defaultItems: MenuItemConfig[];
  /** 自定义菜单项 */
  customizedItems: MenuItemConfig[];
}

/**
 * 菜单项生成调度器接口
 */
export interface MenuDispatcher {
  dispatch(items: MenuItemGroups): void;
}

/**
 * 右键菜单管理器类
 */
export default class RightMenuManager {
  /**
   * 设置右键菜单状态映射
   * @param statusMap - 菜单状态标志位映射表
   */
  static setRightMenuStatusMap(statusMap: typeof RightMenuStatus): void;

  /**
   * 获取右键菜单项
   * @param app - 应用实例
   * @param dispatcher - 菜单项分发器
   * @returns 完整的菜单项列表（自定义项 + 默认项）
   */
  static getRightMenuItem(
    app: HSApp.App,
    dispatcher: MenuDispatcher
  ): MenuItemConfig[];

  /**
   * 生成翻转子菜单项
   * @param opening - 开口实体（门/窗）
   * @returns 翻转操作的子菜单配置数组
   */
  static filpSubmenuItems(
    opening: HSCore.Model.Door | HSCore.Model.Window
  ): MenuItemConfig[];

  /**
   * 获取默认菜单项列表
   * @param app - 应用实例
   * @param selectedEntities - 当前选中的实体数组
   * @param editFlags - 编辑权限标志位
   * @returns 默认菜单项配置数组
   */
  static getDefaultItems(
    app: HSApp.App,
    selectedEntities: HSCore.Model.Entity[],
    editFlags: number
  ): MenuItemConfig[];

  /**
   * 生成收藏按钮菜单项
   * @param seekId - 产品唯一标识
   * @param categoryId - 类别ID
   * @param flags - 菜单权限标志位
   * @returns 收藏按钮配置对象
   */
  static getFavItem(
    seekId: string,
    categoryId: string,
    flags: number
  ): MenuItemConfig;

  /**
   * 生成举报按钮菜单项
   * @param seekId - 产品唯一标识
   * @param productType - 产品类型枚举
   * @param flags - 菜单权限标志位
   * @param productName - 产品名称
   * @returns 举报按钮配置对象
   */
  static getReportItem(
    seekId: string,
    productType: HSCatalog.ProductTypeEnum,
    flags: number,
    productName: string
  ): MenuItemConfig;

  /**
   * 计算编辑权限标志位
   * @param app - 应用实例
   * @param selectedEntities - 选中的实体数组
   * @param isInPropertyBar - 是否在属性栏中调用
   * @returns 权限标志位（位掩码）
   */
  static getEditCase(
    app: HSApp.App,
    selectedEntities: HSCore.Model.Entity[],
    isInPropertyBar: boolean
  ): number;

  /**
   * 初始化自定义菜单项
   * @param app - 应用实例
   * @param customItems - 用于填充的自定义菜单项数组
   */
  static initCustomItems(app: HSApp.App, customItems: MenuItemConfig[]): void;

  /**
   * 生成2D画布空白区域菜单项
   * @param app - 应用实例
   * @param items - 用于填充的菜单项数组
   * @private
   */
  private static _get2dCanvasItems(
    app: HSApp.App,
    items: MenuItemConfig[]
  ): void;

  /**
   * 生成DIY自定义模型菜单项
   * @param app - 应用实例
   * @param items - 用于填充的菜单项数组
   * @param customModel - 自定义模型实体
   */
  static getDIYItems(
    app: HSApp.App,
    items: MenuItemConfig[],
    customModel: HSCore.Model.CustomizedModel
  ): void;

  /**
   * 生成多选状态菜单项
   * @param app - 应用实例
   * @param items - 用于填充的菜单项数组
   */
  static getMultSelectItems(app: HSApp.App, items: MenuItemConfig[]): void;
}