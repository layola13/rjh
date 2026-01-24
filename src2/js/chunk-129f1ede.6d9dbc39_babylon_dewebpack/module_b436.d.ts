/**
 * 左侧菜单配置项的子菜单项
 */
interface MenuChildItem {
  /** 子菜单操作标识 */
  action: string;
  /** 子菜单图标类名 */
  icon: string;
  /** 快捷键 */
  q_key: string;
  /** 子菜单标签（可选，用于i18n键） */
  label?: string;
}

/**
 * 左侧菜单配置项
 */
interface MenuItem {
  /** 菜单项标签（i18n键） */
  label: string;
  /** 菜单项操作标识 */
  action?: string;
  /** 菜单项图标类名 */
  icon: string;
  /** 快捷键 */
  q_key: string;
  /** 是否为激活状态 */
  is_active?: boolean;
  /** 禁用类型（数值标识） */
  disable_type?: number;
  /** 提示信息（i18n键） */
  tips?: string;
  /** 子菜单项列表 */
  children?: MenuChildItem[];
}

/**
 * 左侧菜单分组配置
 */
interface MenuGroup {
  /** 分组名称（i18n键） */
  name: string;
  /** 分组图标类名 */
  icon: string;
  /** 该分组下的菜单项列表 */
  content: MenuItem[];
}

/**
 * 左侧菜单完整配置
 * 包含所有菜单分组的配置数据，用于窗门设计工具的左侧工具栏
 */
declare const menuConfig: MenuGroup[];

export = menuConfig;