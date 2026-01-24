/**
 * CSS样式模块类型定义
 * 该模块导出页面头部和帮助栏相关的CSS样式
 * @module module_684620
 */

/**
 * Webpack模块加载函数签名
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - Webpack require函数
 */
declare module 'module_684620' {
  /**
   * 模块导出对象
   */
  interface ModuleExports {
    /**
     * CSS模块ID
     */
    id: string | number;
    
    /**
     * 推送CSS样式到加载器
     * @param styleData - 包含模块ID和CSS内容的元组
     */
    push(styleData: [string | number, string]): void;
  }

  /**
   * CSS加载器工厂函数类型
   * @param sourceMap - 是否生成source map
   * @returns CSS加载器实例
   */
  type CSSLoaderFactory = (sourceMap: boolean) => ModuleExports;

  /**
   * Webpack require函数类型
   * @param moduleId - 要加载的模块ID
   * @returns 模块导出内容
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

  /**
   * 模块元数据
   */
  interface Module {
    /** 当前模块的唯一标识符 */
    id: string | number;
    /** 模块导出对象 */
    exports: ModuleExports;
  }

  /**
   * 页面头部样式类名定义
   */
  interface PageHeaderStyles {
    /** 页面头部容器 */
    'page-header': string;
    /** 楼层规划器帮助栏 */
    'floorplannerHelpbar': string;
    /** 帮助栏列表 */
    'helpbar': string;
    /** 帮助项 */
    'helpitem': string;
    /** 更多选项菜单 */
    'moreoptions': string;
    /** 展开菜单状态 */
    'expandmenu': string;
    /** 子菜单项 */
    'haschild': string;
    /** 帮助文本 */
    'helptext': string;
    /** 新功能标签 */
    'help-new': string;
    /** 纯文本标签 */
    'textonly': string;
    /** 快捷键提示 */
    'hotkey': string;
    /** 红点提示 */
    'help-red-dot': string;
    /** 计数数字标记 */
    'count-number': string;
    /** 文本图标 */
    'texticon': string;
    /** 帮助栏弹出框 */
    'helpbar_popover': string;
    /** 帮助搜索项 */
    'helpsearchitem': string;
    /** 帮助搜索容器 */
    'helpsearch': string;
    /** 搜索输入框 */
    'searchinput': string;
    /** 清除按钮 */
    'clearBtn': string;
    /** 搜索图标 */
    'searchicon': string;
    /** 帮助图标 */
    'helpicon': string;
    /** 鼠标悬停状态 */
    'hover': string;
    /** 禁用状态 */
    'disabled': string;
    /** 顶级标签 */
    'topLevelLabel': string;
    /** 菜单箭头 */
    'menu_arr': string;
    /** 语言切换工具提示 */
    'switch-language-tool-tip': string;
    /** 工具提示区域 */
    'tool-tip-area': string;
    /** 工具提示标题 */
    'tool-tip-title': string;
    /** 激活状态 */
    'actived': string;
    /** 底部分隔线 */
    'bottomline': string;
    /** 底部更多选项 */
    'bottommoreoptions': string;
    /** 版本信息 */
    'ihomeversion': string;
    /** 关于我们内容 */
    'about-us-content': string;
    /** 全屏工具提示 */
    'tooltip-full-screen': string;
  }

  /**
   * CSS样式字符串常量
   * 包含完整的页面头部和帮助栏样式定义
   */
  const CSS_CONTENT: string;

  export default ModuleExports;
  export { PageHeaderStyles, CSS_CONTENT };
}