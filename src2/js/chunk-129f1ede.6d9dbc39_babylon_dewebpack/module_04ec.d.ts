/**
 * 左侧菜单配置模块
 * @module LeftMenuConfig
 */

/**
 * 菜单项快捷键类型
 */
type QuickKey = 'W' | 'V' | 'S' | 'C' | 'D' | 'F' | 'B' | 'T' | 'E';

/**
 * 禁用类型枚举
 */
type DisableType = 7;

/**
 * 菜单子项配置
 */
interface MenuChildItem {
  /** 子项操作标识 */
  action: string;
  /** 图标类名 */
  icon: string;
  /** 快捷键 */
  q_key: QuickKey;
  /** 标签文本（可选） */
  label?: string;
}

/**
 * 菜单内容项配置
 */
interface MenuContentItem {
  /** 菜单项标签（国际化键） */
  label: string;
  /** 操作类型标识 */
  action?: string;
  /** 图标类名 */
  icon: string;
  /** 快捷键 */
  q_key: QuickKey;
  /** 是否为激活状态 */
  is_active?: boolean;
  /** 禁用类型 */
  disable_type?: DisableType;
  /** 提示信息（国际化键） */
  tips?: string;
  /** 子菜单项列表 */
  children?: MenuChildItem[];
}

/**
 * 菜单分组配置
 */
interface MenuGroup {
  /** 分组名称（国际化键） */
  name: string;
  /** 分组图标类名 */
  icon: string;
  /** 分组内容项列表 */
  content: MenuContentItem[];
}

/**
 * 左侧菜单完整配置
 */
type LeftMenuConfig = MenuGroup[];

/**
 * 左侧菜单配置数据
 * 
 * 包含以下主要分组：
 * - 通用工具：框架、竖挺、扇、纱窗等
 * - 框架类型：矩形、圆形、多边形等各种形状框架
 * - 中挺/竖挺：分隔线、均分、弧形等
 * - 平开/推拉/折叠：各类窗扇类型
 * - 其他工具：墙体、连接件、装饰条、填充物等
 */
declare const leftMenuConfig: LeftMenuConfig;

export default leftMenuConfig;

export type {
  QuickKey,
  DisableType,
  MenuChildItem,
  MenuContentItem,
  MenuGroup,
  LeftMenuConfig
};