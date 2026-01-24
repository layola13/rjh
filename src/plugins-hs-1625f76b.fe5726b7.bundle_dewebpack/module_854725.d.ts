/**
 * Webpack CSS模块加载器的类型定义
 * 用于加载和处理ceiling-large-view组件的样式表
 * @module CeilingLargeViewStyles
 */

/**
 * Webpack模块加载函数签名
 * @param e - 导出对象，用于挂载模块的导出内容
 * @param t - 模块依赖表（本模块未使用）
 * @param n - require函数，用于加载其他模块
 */
export type WebpackCssModuleLoader = (
  e: WebpackModuleExports,
  t: WebpackModuleDependencies,
  n: WebpackRequireFunction
) => void;

/**
 * Webpack模块导出对象
 */
export interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出的内容 */
  exports: CssModuleExports;
}

/**
 * CSS模块导出接口
 * 包含push方法用于添加样式规则到样式系统
 */
export interface CssModuleExports {
  /**
   * 向样式系统推送CSS规则
   * @param rule - CSS规则数组，包含模块ID、CSS文本和源映射标志
   */
  push(rule: [string | number, string, boolean?]): void;
}

/**
 * Webpack模块依赖表（当前模块未使用）
 */
export type WebpackModuleDependencies = Record<string, unknown>;

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
export interface WebpackRequireFunction {
  (moduleId: number): unknown;
}

/**
 * CSS资源URL处理函数类型
 * 用于处理CSS中的url()引用
 */
export type CssUrlProcessor = (url: string) => string;

/**
 * 吊顶大视图组件的CSS类名定义
 */
export interface CeilingLargeViewClassNames {
  /** 主容器类名 - 固定定位的弹窗容器 */
  'ceiling-large-view': string;
  /** 图片内容容器 - 320x320的图片区域 */
  'ceiling-large-view-content-img': string;
  /** 信息区域容器 - 80px高度的底部信息栏 */
  'ceiling-large-view-content-info': string;
  /** Logo图标 - 48x48的品牌标识 */
  'ceiling-large-view-logo': string;
  /** 文本标签 - 220px宽度的粗体文字区域 */
  'ceiling-large-view-label': string;
  /** 隐藏状态类名 - 用于隐藏组件 */
  'ceiling-large-view-hide': string;
}

/**
 * 全局英文语言环境下的样式覆盖
 */
export interface GlobalEnClassNames {
  /** 英文环境下的Logo样式 */
  'global-en .ceiling-large-view .ceiling-large-view-logo': string;
}

/**
 * 模块依赖的资源ID映射
 */
export interface ModuleDependencies {
  /** CSS URL处理器模块 */
  CSS_URL_PROCESSOR: 992716;
  /** CSS加载器工厂函数模块 */
  CSS_LOADER_FACTORY: 986380;
  /** 中文Logo图片资源 */
  LOGO_IMAGE_CN: 116841;
  /** 英文Logo图片资源 */
  LOGO_IMAGE_EN: 721531;
}

/**
 * 吊顶大视图组件样式配置
 */
export interface CeilingLargeViewStyleConfig {
  /** 容器尺寸 */
  container: {
    /** 边框圆角 */
    borderRadius: '8px';
    /** 阴影效果 */
    boxShadow: '0px 2px 16px 0px rgba(144, 149, 163, 0.15)';
    /** 层级 */
    zIndex: 103;
  };
  /** 图片区域尺寸 */
  image: {
    width: '320px';
    height: '320px';
  };
  /** 信息区域配置 */
  info: {
    height: '80px';
    logo: {
      width: '48px';
      height: '48px';
      marginLeft: '16px';
    };
    label: {
      width: '220px';
      fontSize: '14px';
      margin: '0 16px';
    };
  };
}

/**
 * 模块默认导出
 * 生成并注册ceiling-large-view组件的CSS样式
 */
declare const ceilingLargeViewStyles: WebpackCssModuleLoader;

export default ceilingLargeViewStyles;