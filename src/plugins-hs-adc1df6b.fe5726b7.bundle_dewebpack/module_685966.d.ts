/**
 * 帮助栏菜单项类型
 */
export enum MenuItemType {
  /** 文件夹类型菜单项（包含子菜单） */
  folder = 'folder',
  /** 按钮类型菜单项 */
  button = 'button'
}

/**
 * 菜单项配置接口
 */
export interface MenuItem {
  /** 菜单项名称标识符 */
  name: string;
  
  /** 菜单项显示标签（国际化键名或显示文本） */
  label?: string;
  
  /** 菜单项类型 */
  type?: MenuItemType;
  
  /** 点击事件处理函数 */
  onclick?: (event?: Event) => void;
  
  /** 子菜单列表（仅当type为folder时） */
  submenu?: MenuItem[];
  
  /** 是否禁用该菜单项 */
  disable?: boolean;
}

/**
 * 帮助栏管理器初始化参数
 */
export interface HelpbarParams {
  [key: string]: unknown;
}

/**
 * 帮助栏管理器类
 * 负责管理应用程序的帮助栏菜单项配置、国际化和事件处理
 */
export default class HelpbarManager {
  /**
   * 构造函数
   * @param params - 初始化参数，会传递给内部参数管理器
   */
  constructor(params: HelpbarParams);

  /**
   * 获取默认帮助栏菜单项列表
   * 
   * 功能：
   * 1. 从默认配置获取菜单项
   * 2. 过滤掉被禁用的子菜单项
   * 3. 预处理菜单项（国际化、事件绑定等）
   * 
   * @returns 预处理后的菜单项数组
   */
  getDefaultHelpbarItems(): MenuItem[];

  /**
   * 预处理菜单项列表（私有方法）
   * 
   * 递归处理菜单项，执行以下操作：
   * 1. 国际化标签文本（通过ResourceManager）
   * 2. 自动绑定点击事件处理函数
   * 3. 设置菜单项类型（folder或button）
   * 4. 递归处理子菜单
   * 
   * @param items - 待处理的菜单项数组
   * @returns 处理后的菜单项数组
   */
  private _preProcess(items: MenuItem[]): MenuItem[];
}

/**
 * 全局资源管理器（由外部模块提供）
 * 用于获取国际化字符串资源
 */
declare global {
  const ResourceManager: {
    /**
     * 根据键名获取国际化字符串
     * @param key - 资源键名
     * @returns 对应的本地化字符串
     */
    getString(key: string): string;
  };
}