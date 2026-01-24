/**
 * Webpack CSS模块加载器的类型定义
 * 用于处理CSS样式表的动态加载和注入
 */

/**
 * CSS模块导出函数签名
 * @param exports - 模块导出对象，用于挂载CSS内容
 * @param cssLoader - CSS加载器工具函数，用于处理CSS资源
 * @param urlHelper - URL辅助函数，用于解析和转换资源路径
 */
declare module 'module_618925' {
  /**
   * 下拉图片按钮组件的样式模块
   * 包含主按钮、子菜单项、悬停状态、会员标识等样式定义
   */
  interface DropImageButtonStyles {
    /** 主容器样式类 */
    'drop-image-button': string;
    
    /** 当前选中项样式 */
    'current-item': string;
    
    /** 悬停状态样式 */
    hover: string;
    
    /** 图标包装器样式 */
    'icon-wrapper': string;
    
    /** 扩展标识样式 */
    tuozhan: string;
    
    /** 文本描述样式 */
    'text-description': string;
    
    /** 购买VIP标识样式 */
    buyVip: string;
    
    /** 子菜单项容器样式 */
    'sub-items': string;
    
    /** 左对齐样式 */
    left: string;
    
    /** 右对齐样式 */
    right: string;
    
    /** 显示状态样式 */
    show: string;
    
    /** 单个子菜单项样式 */
    'sub-item': string;
    
    /** 图标样式 */
    icon: string;
    
    /** 按行排列样式 */
    'by-row': string;
    
    /** 按列排列样式 */
    'by-column': string;
    
    /** 快捷键样式 */
    hotkey: string;
    
    /** 当前激活状态样式 */
    current: string;
    
    /** 目录图片新标识图标样式 */
    'catalog-image-new-icon': string;
    
    /** 权益背景样式 */
    'benifit-background': string;
    
    /** 免费试用当前项标识样式 */
    freeTrailCurrentItem: string;
    
    /** 免费试用子项标识样式 */
    freeTrailSubItem: string;
  }

  /**
   * CSS加载器函数类型
   * @param sourceMap - 是否生成source map，false表示不生成
   * @returns CSS加载器实例，包含push方法用于添加CSS规则
   */
  type CSSLoader = (sourceMap: boolean) => {
    /**
     * 添加CSS规则到样式表
     * @param rule - CSS规则数组 [模块ID, CSS内容字符串, source map?]
     */
    push(rule: [string, string, string?]): void;
  };

  /**
   * URL辅助函数类型
   * 用于解析模块中的资源路径（如图片、字体等）
   * @param resourceId - 资源模块ID
   * @returns 解析后的资源URL字符串
   */
  type URLHelper = (resourceId: number) => string;

  /**
   * 模块导出对象接口
   */
  interface ModuleExports {
    /** 模块唯一标识符 */
    id: string;
    
    /** 导出的样式类名映射对象 */
    exports: DropImageButtonStyles;
  }

  /**
   * 模块工厂函数
   * Webpack运行时调用此函数来初始化CSS模块
   * 
   * @param moduleExports - 模块导出对象，包含id和exports
   * @param cssLoader - CSS加载器函数（模块ID: 986380）
   * @param urlHelper - URL辅助函数（模块ID: 992716）
   * 
   * @example
   *