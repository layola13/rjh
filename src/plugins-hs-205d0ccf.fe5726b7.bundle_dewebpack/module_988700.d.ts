/**
 * 菜单项类型枚举
 */
declare enum MenuItemType {
  folder = "folder",
  image = "image",
  checkbox = "checkbox",
  radio = "radio",
  divider = "divider",
  button = "button"
}

/**
 * 徽章配置接口
 */
interface BadgeConfig {
  /** 是否在父级显示点标记 */
  showDotOnParents?: boolean;
}

/**
 * 锁定接口
 */
interface LockConfig {
  /** 锁定指定菜单项 */
  lock(item: MenuFolder): void;
}

/**
 * 菜单项基础数据接口
 */
interface MenuItemData {
  /** 显示标签 */
  label?: string;
  /** 标签图标 */
  labelIcon?: string;
  /** 图标 */
  icon?: string;
  /** 悬停图标 */
  iconhover?: string;
  /** 线条类型 */
  lineType?: string;
  /** 悬停状态 */
  hover?: boolean;
  /** 分类 */
  catagory?: string;
  /** 工具提示 */
  tooltip?: string;
  /** 是否按下 */
  isPressed?: boolean;
  /** 首次工具提示 */
  firstTooltip?: string;
  /** 样式名称 */
  styleName?: string;
  /** 选中状态 */
  checkStatus?: "all" | "none" | "half-checked";
  /** 徽章配置 */
  badge?: BadgeConfig;
  /** 是否有徽章点 */
  hasBadgeDot?: boolean;
  /** 是否有警告 */
  hasWarning?: boolean;
  /** 是否可见 */
  visible?: boolean;
  /** 是否选中（用于复选框/单选按钮） */
  isChecked?: boolean;
  /** 是否为分组 */
  isGroup?: boolean;
  /** 锁定配置 */
  lock?: LockConfig;
  /** 排序顺序 */
  order?: number;
  /** 分组ID（用于单选按钮） */
  groupId?: string;
  /** 默认悬停第一个子项 */
  defaultHoverFirstChild?: boolean;
  /** 动态工具提示 */
  dynamicTooltip?: string;
  /** 点击事件回调 */
  onclick?: () => void;
  /** 鼠标进入事件回调 */
  onMouseEnter?: () => void;
  /** 变更事件回调 */
  onchange?: () => void;
}

/**
 * 子菜单项配置
 */
interface SubmenuItemConfig extends Omit<MenuItemData, 'type'> {
  /** 菜单项类型 */
  type?: MenuItemType;
  /** 子菜单（仅用于 folder 类型） */
  submenu?: SubmenuItemConfig[];
  /** 工具栏路径 */
  toolbar?: string;
  /** 项目路径 */
  path?: string;
}

/**
 * 菜单文件夹构造选项
 */
interface MenuFolderOptions extends Omit<MenuItemData, 'type'> {
  /** 菜单项名称 */
  name: string;
  /** 获取菜单项的函数 */
  itemGetter: (path: string, toolbar: string) => MenuItem | undefined;
  /** 添加菜单项时的回调 */
  itemAddedCallback: (item: MenuItem, parent: MenuFolder) => void;
  /** 移除菜单项时的回调 */
  itemRemovedCallback: (item: MenuItem, parent: MenuFolder) => void;
}

/**
 * 基础菜单项抽象类
 */
declare abstract class BaseMenuItem {
  /** 菜单项名称 */
  readonly name: string;
  /** 父级菜单文件夹 */
  parent?: MenuFolder;
  /** 菜单项数据 */
  readonly data: MenuItemData;

  /**
   * 构造函数
   * @param name - 菜单项名称
   * @param changeCallback - 变更回调函数
   */
  constructor(name: string, changeCallback: () => void);

  /**
   * 设置菜单项数据
   * @param data - 要设置的数据
   */
  setData(data: Partial<MenuItemData>): void;

  /**
   * 检查菜单项是否启用
   */
  isEnabled(): boolean;

  /**
   * 检查菜单项是否按下
   */
  isPressed(): boolean;
}

/**
 * 按钮菜单项
 */
declare class ButtonMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.button;

  /**
   * 点击按钮
   */
  click(): void;
}

/**
 * 图片菜单项
 */
declare class ImageMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.image;
}

/**
 * 复选框菜单项
 */
declare class CheckboxMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.checkbox;
}

/**
 * 单选按钮菜单项
 */
declare class RadioMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.radio;
  
  /**
   * 取消同组其他单选按钮的选中状态
   */
  cancelRadioStatus?: (groupId?: string) => void;
}

/**
 * 分隔线菜单项
 */
declare class DividerMenuItem extends BaseMenuItem {
  readonly type: MenuItemType.divider;
}

/**
 * 代理菜单项（用于跨工具栏引用）
 */
declare class ProxyMenuItem extends BaseMenuItem {
  /**
   * 构造函数
   * @param config - 配置项
   * @param target - 目标菜单项
   * @param folder - 关联的文件夹
   * @param changeCallback - 变更回调
   */
  constructor(
    config: SubmenuItemConfig,
    target: MenuItem,
    folder: MenuFolder,
    changeCallback: () => void
  );
}

/**
 * 菜单项联合类型
 */
type MenuItem =
  | MenuFolder
  | ButtonMenuItem
  | ImageMenuItem
  | CheckboxMenuItem
  | RadioMenuItem
  | DividerMenuItem
  | ProxyMenuItem;

/**
 * 菜单文件夹类（可包含子菜单项）
 */
declare class MenuFolder extends BaseMenuItem {
  /** 子菜单项列表 */
  readonly childItems: MenuItem[];

  /**
   * 构造函数
   * @param options - 文件夹选项
   * @param changeCallback - 变更回调函数
   */
  constructor(options: MenuFolderOptions, changeCallback: () => void);

  /** 菜单项类型 */
  readonly type: MenuItemType.folder;

  /** 是否有徽章点（检查自身和子项） */
  readonly hasBadgeDot: boolean;

  /** 是否有警告（检查自身和子项） */
  readonly hasWarning: boolean;

  /** 是否有子项被按下 */
  readonly hasChildPressed: boolean;

  /**
   * 点击菜单项
   */
  click(): void;

  /**
   * 鼠标进入事件处理
   */
  onMouseEnter(): void;

  /**
   * 设置选中状态（用于分组）
   */
  setChecked(): void;

  /**
   * 展开菜单
   */
  expand(): void;

  /**
   * 折叠菜单
   */
  collapse(): void;

  /**
   * 设置按下状态
   * @param pressed - 是否按下
   */
  setPressed(pressed: boolean): void;

  /**
   * 设置是否显示动态工具提示
   * @param show - 是否显示
   */
  setShowDynamicTooltip(show: string): void;

  /**
   * 获取指定名称的子项
   * @param name - 子项名称
   */
  getChild(name: string): MenuItem | undefined;

  /**
   * 获取所有子项
   */
  getAllChildren(): MenuItem[];

  /**
   * 添加子菜单项
   * @param config - 子菜单项配置
   * @returns 创建的菜单项
   */
  add(config: SubmenuItemConfig): MenuItem | undefined;

  /**
   * 在指定项之前插入
   * @param targetName - 目标项名称
   * @param config - 要插入的项配置
   * @returns 插入的菜单项
   */
  insertBefore(targetName: string, config: SubmenuItemConfig): MenuItem | undefined;

  /**
   * 在指定项之后插入
   * @param targetName - 目标项名称
   * @param config - 要插入的项配置
   * @returns 插入的菜单项
   */
  insertAfter(targetName: string, config: SubmenuItemConfig): MenuItem | undefined;

  /**
   * 移除指定名称的子项
   * @param name - 要移除的子项名称
   */
  remove(name: string): void;
}

export default MenuFolder;