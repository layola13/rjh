/**
 * CSS模块类型定义
 * 用于Webpack CSS加载器的样式模块
 */

/**
 * CSS模块导出接口
 * 包含所有可用的CSS类名及其对应的作用域类名
 */
export interface FPToolbarV2Styles {
  /** 主工具栏容器类 - 固定定位在页面顶部 */
  fptoolbarv2: string;
  
  /** 工具项内部容器 */
  'tool-item-inner': string;
  
  /** 单个工具项 */
  toolitem: string;
  
  /** 免费试用标签 */
  freeTrialItem: string;
  
  /** VIP图标 */
  vipIcon: string;
  
  /** 工具栏容器 */
  toolbarcontainer: string;
  
  /** 主工具栏ID容器 */
  floorplannerToolbar: string;
  
  /** 工具栏基础类 */
  toolbar: string;
  
  /** 激活状态的工具栏 */
  'active-toolbar': string;
  
  /** 工具列表 */
  toollist: string;
  
  /** 工具文本 */
  tooltext: string;
  
  /** 快捷键显示 */
  hotkey: string;
  
  /** 分组工具文本 */
  'tooltext-group': string;
  
  /** 工具图标 */
  toolicon: string;
  
  /** 悬停时的图标 */
  'hover-image': string;
  
  /** 悬停状态 */
  hover: string;
  
  /** 按下状态 */
  pressed: string;
  
  /** 顶层标签激活状态 */
  topLevelLabelActive: string;
  
  /** 禁用状态 */
  disabled: string;
  
  /** 工具项引导 */
  'toolitem-guide': string;
  
  /** 分组容器 */
  group: string;
  
  /** 工具图标图片包装器 */
  'tool-icon-img-wrapper': string;
  
  /** 工具图标图片 */
  'tool-icon-img': string;
  
  /** 通知点 */
  notificationdot: string;
  
  /** 顶层标签 */
  topLevelLabel: string;
  
  /** 智能文本标签 */
  'topLevelLabel-smart-text': string;
  
  /** 白色智能文本标签 */
  'topLevelLabel-smart-text-white': string;
  
  /** 下拉菜单容器 */
  dropmenus: string;
  
  /** 显示下拉菜单 */
  dropmenusshow: string;
  
  /** 更多选项 */
  moreoptions: string;
  
  /** 展开菜单 */
  expandmenu: string;
  
  /** 纯文本 */
  textonly: string;
  
  /** 标签图标 */
  'label-icon': string;
  
  /** 工具信息图标 */
  'tool-info-icon': string;
  
  /** 计数徽章 */
  'count-badge': string;
  
  /** 文件夹计数徽章 */
  'count-badge-folder': string;
  
  /** 二级文件夹 */
  twolevelfolder: string;
  
  /** 三级文件夹 */
  thirdLevelFolder: string;
  
  /** 二级文件夹内容容器 */
  'two-level-folder-content-container': string;
  
  /** 更多菜单 */
  moremenu: string;
  
  /** 复选框 */
  checkbox: string;
  
  /** 复选框输入 */
  checkbox_input: string;
  
  /** 复选框选中状态 */
  checkbox_input_isChecked: string;
  
  /** 复选框内部元素 */
  checkbox_input_inner: string;
  
  /** 半选状态 */
  checkbox_input_isChecked_half: string;
  
  /** 隐藏的复选框图标 */
  hiddenCheckboxIcon: string;
  
  /** 单选按钮 */
  radio: string;
  
  /** 单选按钮输入 */
  radio_input: string;
  
  /** 单选按钮选中状态 */
  radio_input_isChecked: string;
  
  /** 单选按钮内部元素 */
  radio_input_inner: string;
  
  /** 底部分割线 */
  bottomline: string;
  
  /** 右侧分割线 */
  rightline: string;
  
  /** 第一行工具列表 */
  'tool-list-firstline': string;
  
  /** 子环境工具栏 */
  'toolbar-in-sub-env': string;
  
  /** 工具栏文件夹箭头 */
  'toolbar-folder-arrow': string;
  
  /** 第一行隐藏图标的工具项 */
  'toolitem-lineone-hiddenIcon': string;
  
  /** 第二行工具列表 */
  'tool-list-secline': string;
  
  /** 带背景图的工具项 */
  'toolitem-bgimg': string;
  
  /** 自定义模型文本 */
  'customizedModel-text': string;
  
  /** 底部三角形右侧 */
  triangleBottomRight: string;
  
  /** 警告图标 */
  warningIcon: string;
  
  /** 新标签 */
  'new-badge': string;
  
  /** 新图标 */
  'new-icon': string;
  
  /** 无底部线 */
  nobottomline: string;
  
  /** 无右侧线 */
  norightline: string;
  
  /** 上传数据选项 */
  upload_data_options: string;
}

/**
 * CSS模块推送方法类型
 * Webpack CSS加载器使用此方法将CSS内容推送到样式集合中
 */
export interface CSSModuleExports {
  /**
   * 推送CSS规则到样式表
   * @param rule - 包含模块ID和CSS内容的数组 [moduleId, cssContent]
   */
  push(rule: [string, string]): void;
}

/**
 * 模块导出函数类型
 * 
 * @param moduleExports - 模块导出对象，将被赋值为CSS模块加载器
 * @param __unusedExports - 未使用的导出对象（webpack内部使用）
 * @param __webpackRequire - Webpack的require函数，用于加载其他模块
 * 
 * @example
 *