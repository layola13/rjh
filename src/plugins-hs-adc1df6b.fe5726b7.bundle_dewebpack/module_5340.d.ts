/**
 * 菜单项类型枚举
 */
export enum MenuItemType {
  folder = 'folder',
  button = 'button',
  divider = 'divider',
  searchbox = 'searchbox'
}

/**
 * 徽章配置接口
 */
export interface BadgeConfig {
  /** 徽章文本或数字 */
  value?: string | number;
  /** 是否在父级菜单显示圆点标记 */
  showDotOnParents?: boolean;
}

/**
 * 菜单项数据接口
 */
export interface MenuItemData {
  /** 菜单项标签文本 */
  label: string;
  /** 图标标识 */
  icon: string;
  /** 排序优先级,数值越小越靠前 */
  order?: number;
  /** 是否处于按压/选中状态 */
  isPressed?: boolean;
  /** 徽章配置 */
  badge?: BadgeConfig;
  /** 帮助栏内容 */
  helpbar?: string;
  /** 路径标识 */
  path?: string;
}

/**
 * 子菜单配置接口
 */
export interface SubmenuConfig extends MenuItemData {
  /** 菜单项类型 */
  type?: MenuItemType;
  /** 嵌套子菜单项数组 */
  submenu?: SubmenuConfig[];
}

/**
 * 文件夹菜单项构造参数
 */
export interface FolderMenuItemOptions extends MenuItemData {
  /** 文件夹唯一标识名称 */
  name: string;
  /** 获取菜单项的回调函数 */
  itemGetter: () => unknown;
  /** 子项添加时的回调 */
  itemAddedCallback: (item: MenuItem, parent: FolderMenuItem) => void;
  /** 子项移除时的回调 */
  itemRemovedCallback: (item: MenuItem, parent: FolderMenuItem) => void;
}

/**
 * 抽象菜单项基类
 */
declare abstract class BaseMenuItem {
  /** 菜单项名称 */
  readonly name: string;
  /** 菜单项数据 */
  data: MenuItemData;
  /** 父级菜单项引用 */
  parent?: FolderMenuItem;

  /**
   * 构造函数
   * @param name - 菜单项名称
   * @param changeCallback - 数据变更回调
   */
  constructor(name: string, changeCallback: () => void);

  /**
   * 设置菜单项数据
   * @param data - 部分或完整的菜单项数据
   */
  setData(data: Partial<MenuItemData>): void;

  /**
   * 显示菜单项
   */
  show(): void;

  /**
   * 隐藏菜单项
   */
  hide(): void;

  /**
   * 判断菜单项是否处于按压状态
   */
  isPressed(): boolean;
}

/**
 * 按钮菜单项
 */
declare class ButtonMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.button;
}

/**
 * 分割线菜单项
 */
declare class DividerMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.divider;
}

/**
 * 搜索框菜单项
 */
declare class SearchBoxMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.searchbox;
}

/**
 * 菜单项联合类型
 */
export type MenuItem = FolderMenuItem | ButtonMenuItem | DividerMenuItem | SearchBoxMenuItem;

/**
 * 文件夹类型菜单项(可包含子菜单)
 */
export default class FolderMenuItem extends BaseMenuItem {
  /** 菜单项类型,固定为folder */
  readonly type: MenuItemType.folder;
  
  /** 子菜单项数组 */
  childItems: MenuItem[];

  /**
   * 构造函数
   * @param options - 文件夹配置选项
   * @param changeCallback - 数据变更回调函数
   */
  constructor(options: FolderMenuItemOptions, changeCallback: () => void);

  /**
   * 是否存在需要在父级显示徽章圆点的子项
   * @description 递归检查所有子项及其子文件夹,判断是否有徽章需要向上冒泡显示
   */
  get hasBadgeDot(): boolean;

  /**
   * 是否存在处于按压状态的子菜单项
   */
  get hasChildPressed(): boolean;

  /**
   * 设置文件夹的按压状态
   * @param pressed - 是否按压
   */
  setPressed(pressed: boolean): void;

  /**
   * 根据名称获取子菜单项
   * @param name - 子菜单项名称
   * @returns 匹配的菜单项,未找到则返回undefined
   */
  getChild(name: string): MenuItem | undefined;

  /**
   * 添加子菜单项
   * @param config - 子菜单配置
   * @returns 新创建的菜单项实例
   * @description 根据config.order自动确定插入位置,未指定order时追加到末尾
   */
  add(config: SubmenuConfig): MenuItem | undefined;

  /**
   * 在指定菜单项之前插入
   * @param targetName - 目标菜单项名称
   * @param config - 新菜单项配置
   * @returns 新创建的菜单项实例
   */
  insertBefore(targetName: string, config: SubmenuConfig): MenuItem | undefined;

  /**
   * 在指定菜单项之后插入
   * @param targetName - 目标菜单项名称
   * @param config - 新菜单项配置
   * @returns 新创建的菜单项实例
   */
  insertAfter(targetName: string, config: SubmenuConfig): MenuItem | undefined;

  /**
   * 移除子菜单项
   * @param name - 要移除的菜单项名称
   * @description 移除成功后会触发itemRemovedCallback回调
   */
  remove(name: string): void;

  /**
   * 显示指定名称的子菜单项
   * @param name - 子菜单项名称
   */
  showItem(name: string): void;

  /**
   * 隐藏指定名称的子菜单项
   * @param name - 子菜单项名称
   */
  hideItem(name: string): void;
}