/**
 * UI配置模块
 * 提供不同布局模式下的UI配置选项
 */

/**
 * UI配置项 - 工具栏配置
 */
interface ToolbarConfig {
  item: {
    /** 要排除的工具栏项目ID列表 */
    exclude?: string[];
    /** 要包含的工具栏项目ID列表 */
    include?: string[];
  };
}

/**
 * UI配置项 - 目录配置
 */
interface CatalogConfig {
  item: {
    /** 要排除的目录项ID列表 */
    exclude?: string[];
    /** 要包含的目录项ID列表 */
    include?: string[];
  };
}

/**
 * UI配置项 - 左侧菜单配置
 */
interface LeftMenuConfig {
  /** 要排除的模型类别 */
  exclude?: string[];
  item: {
    /** 要排除的菜单项ID列表 */
    exclude?: string[];
    /** 要包含的菜单项ID列表 */
    include?: string[];
  };
}

/**
 * UI配置项 - 属性栏配置
 */
interface PropertyBarConfig {
  item: {
    /** 要排除的属性项列表 */
    exclude?: string[];
    /** 要包含的属性项列表 */
    include?: string[];
  };
}

/**
 * UI配置项 - 页面头部配置
 */
interface PageHeaderConfig {
  item: {
    /** 要排除的头部按钮/组件ID列表 */
    exclude?: string[];
    /** 要包含的头部按钮/组件ID列表 */
    include?: string[];
  };
}

/**
 * UI配置项 - 插件配置
 */
interface PluginConfig {
  /** 要排除的插件类型列表 */
  exclude?: string[];
  /** 要包含的插件类型列表 */
  include?: string[];
}

/**
 * UI配置项 - 自动保存配置
 */
interface AutoSaveConfig {
  /** 自动保存时间间隔（分钟） */
  time: number;
}

/**
 * UI配置项 - 调整大小组件配置
 */
interface ResizeWidgetConfig {
  /** 是否折叠 */
  isFold: boolean;
}

/**
 * 布局模式配置
 */
interface LayoutModeConfig {
  /** 插件配置 */
  plugin?: PluginConfig;
  /** 工具栏配置 */
  toolbar?: ToolbarConfig;
  /** 目录配置 */
  catalog?: CatalogConfig;
  /** 左侧菜单配置 */
  leftMenu?: LeftMenuConfig;
  /** 属性栏配置 */
  propertyBar?: PropertyBarConfig;
  /** 页面头部配置 */
  pageheader?: PageHeaderConfig;
  /** 自动保存配置 */
  autoSave?: AutoSaveConfig;
  /** 调整大小组件配置 */
  resizeWidget?: ResizeWidgetConfig;
}

/**
 * UI配置对象
 * 包含不同场景下的UI布局配置
 */
interface UIConfigType {
  /** 仅平面图模式配置 */
  onlyFloorPlan?: LayoutModeConfig;
  /** 看房模式配置 */
  kanfang?: LayoutModeConfig;
  /** 天猫好房模式配置 */
  tianmaohaofang?: LayoutModeConfig;
  /** HouseMe模式配置 */
  houseme?: LayoutModeConfig;
  /** Apple模式配置 */
  apple?: Partial<LayoutModeConfig>;
  /** 其他自定义模式配置 */
  [key: string]: LayoutModeConfig | Partial<LayoutModeConfig> | undefined;
}

/**
 * UI配置导出对象
 * 
 * @remarks
 * 该配置对象定义了不同布局模式下的UI组件显示/隐藏规则
 * 
 * @example
 *