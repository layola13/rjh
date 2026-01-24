/**
 * CSS模块类型定义
 * 装饰线预览面板样式模块
 * @module MoldPreviewPanelStyles
 */

/**
 * Webpack CSS模块导出函数类型
 * @param isSourceMap - 是否启用源码映射
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (isSourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理CSS模块的加载和注入
 */
interface CSSLoader {
  /**
   * 推送CSS规则到加载队列
   * @param entry - CSS条目数组 [模块ID, CSS内容字符串, 源映射信息]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
type WebpackModuleFunction = (
  exports: ModuleExports,
  module: Module,
  require: WebpackRequire
) => void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 默认导出 */
  default?: unknown;
  /** 动态属性 */
  [key: string]: unknown;
}

/**
 * Webpack模块对象接口
 */
interface Module {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: ModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出对象
 */
type WebpackRequire = (moduleId: number | string) => unknown;

/**
 * 装饰线预览面板CSS模块
 * 包含以下主要样式：
 * - .mold-preview-panel: 面板容器
 * - .panel-wrap: 面板包装器（220px宽，绝对定位）
 * - .panel-title: 面板标题
 * - .panel-body: 面板主体（200px高，包含滑块控制）
 * - .slider-input: 滑块输入控件
 * - .toggle-button: 切换按钮
 * - .ceiling-indicator: 天花板指示器
 * - .preview-image: 预览图片容器
 */
declare const moldPreviewPanelStyles: WebpackModuleFunction;

export default moldPreviewPanelStyles;

/**
 * CSS类名映射接口（如果使用CSS Modules）
 */
export interface MoldPreviewPanelClassNames {
  /** 面板包装器 */
  'panel-wrap': string;
  /** 自定义装饰线应用到全部按钮 */
  'customized-molding-apply-all': string;
  /** 面板标题 */
  'panel-title': string;
  /** 装饰线文本 */
  'panel-molding-text': string;
  /** 单选按钮组 */
  'react-radio': string;
  /** 单选按钮标题 */
  'radio-title': string;
  /** 单选按钮容器 */
  'react-radio-btn': string;
  /** 单选项 */
  'radio-item': string;
  /** 镜像样式 */
  'mirror-style': string;
  /** 滑块输入 */
  'slider-input': string;
  /** 滑块标签 */
  'slider-label': string;
  /** 长度输入外层容器 */
  'length-input-outer': string;
  /** 切换按钮 */
  'toggle-button': string;
  /** 切换按钮标题 */
  'toggle-title': string;
  /** 面板主体 */
  'panel-body': string;
  /** 装饰线内容容器 */
  'panel-molding-contnt': string;
  /** X轴滑块 */
  'panel-molding-slider-x': string;
  /** Y轴滑块 */
  'panel-molding-slider-y': string;
  /** 滑块圆点 */
  'slider-circle': string;
  /** 装饰线主体 */
  'panel-molding-body': string;
  /** 创建自定义模型按钮组 */
  'createcustomizedmodelbuttons': string;
  /** 取消按钮 */
  'cancelbutton': string;
  /** 创建按钮 */
  'createbutton': string;
  /** 天花板指示器 */
  'ceiling-indicator': string;
  /** 槽位 */
  'slot': string;
  /** 翻转的槽位 */
  'slot-flipped': string;
  /** 预览图片 */
  'preview-image': string;
}