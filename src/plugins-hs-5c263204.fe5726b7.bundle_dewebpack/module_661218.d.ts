/**
 * 快捷键配置模块
 * 定义了编辑器中各个功能模块的快捷键映射和显示符号
 */

/**
 * 单个快捷键配置项
 */
export interface HotkeyItem {
  /** 快捷键对应的功能标识符（通常是国际化 key） */
  key: string;
  /** 快捷键组合，按顺序组合使用（如 ["meta", "S"] 表示 Cmd+S 或 Ctrl+S） */
  value: string[];
  /** 是否不添加额外图标（用于方向键等特殊按键） */
  noAddIcon?: boolean;
  /** 是否显示新功能标记点 */
  newDot?: boolean;
}

/**
 * 快捷键分组配置
 * 每个一级数组元素代表一个快捷键分组（通常在 UI 中分段显示）
 */
export type HotkeyGroup = HotkeyItem[][];

/**
 * 所有快捷键配置数据
 * 按功能模块分类组织
 */
export interface HotkeyDataConfig {
  /** 设置导航 - 偏好设置相关快捷键 */
  setting_nav_preferences: HotkeyGroup;
  /** 工具栏 - 房屋模板相关快捷键 */
  toolbar_toggleHouseTemplate: HotkeyGroup;
  /** 工具栏 - 自定义功能快捷键 */
  toolbar_hotkeys_customized_feature: HotkeyGroup;
  /** 室内建模相关快捷键 */
  interior_modeling_new: HotkeyGroup;
  /** 插件反馈 - 自定义标签快捷键 */
  plugin_feedback_tag_custom: HotkeyGroup;
  /** 铺贴功能快捷键 */
  hotkeys_pave: HotkeyGroup;
  /** 隐蔽工程 - 目录模型快捷键 */
  concealedwork_catalog_model: HotkeyGroup;
  /** 工具栏 - 快照相关快捷键 */
  toolBar_snapshot_snapshot: HotkeyGroup;
}

/**
 * 修饰键符号配置
 * 定义了不同操作系统下修饰键的显示符号
 */
export interface ModifierKeySymbol {
  /** macOS 下的显示符号 */
  mac: string;
  /** Windows 下的显示符号 */
  windows: string;
}

/**
 * 所有修饰键符号映射
 */
export interface HotkeySymbolConfig {
  /** Command (Mac) / Ctrl (Windows) */
  meta: ModifierKeySymbol;
  /** Shift 键 */
  shift: ModifierKeySymbol;
  /** Option (Mac) / Alt (Windows) */
  option: ModifierKeySymbol;
  /** Control 键 */
  control: ModifierKeySymbol;
}

/**
 * 快捷键配置数据
 * 包含编辑器所有功能模块的快捷键定义
 */
export const hotkeyData: HotkeyDataConfig;

/**
 * 快捷键修饰符显示符号
 * 根据操作系统平台显示不同的符号（如 ⌘ 或 Ctrl）
 */
export const hotkeySymbol: HotkeySymbolConfig;