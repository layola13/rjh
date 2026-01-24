/**
 * CSS模块导出类型定义
 * @module CSSModuleExports
 * @description 该模块通过Webpack的css-loader处理CSS内容，并将其推送到样式收集器中
 */

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否启用源映射
 * @returns CSS模块收集器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleCollector;

/**
 * CSS模块收集器接口
 * @description 用于收集和管理CSS模块内容
 */
interface CSSModuleCollector {
  /**
   * 推送CSS内容到收集器
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串, 源映射(可选)]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: CSSModuleCollector;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS模块工厂函数
 * @description 该函数由Webpack在运行时调用，用于初始化CSS模块
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param moduleExports.id - 当前模块的唯一标识符
 * @param moduleExports.exports - 模块的导出对象，将被赋值为CSS收集器
 * @param webpackRequire - Webpack的模块加载函数
 * 
 * @remarks
 * 该模块包含autostyler组件的样式定义，包括：
 * - 按钮样式 (.btn, .btn-primary, .btn-default)
 * - 模态框遮罩层 (.modalCover)
 * - 表单输入框和选择器 (.model-input, .model-select)
 * - 模板面板和房间列表 (.createStylerTemplatePanel, .roomListBoard)
 * - 复选框样式 (.template-room-single-checkbox)
 * - 网格布局 (.roomList)
 */
declare function cssModuleFactory(
  moduleExports: WebpackModuleExports,
  _unusedExports: unknown,
  webpackRequire: WebpackRequire
): void;

/**
 * 导出的CSS类名常量
 * @description autostyler组件相关的CSS类名定义
 */
export declare const CSS_CLASSES: {
  /** 自动样式器根容器类名 */
  readonly ROOT: 'autostyler';
  /** 按钮基础类名 */
  readonly BTN: 'btn';
  /** 主要按钮类名 */
  readonly BTN_PRIMARY: 'btn-primary';
  /** 默认按钮类名 */
  readonly BTN_DEFAULT: 'btn-default';
  /** 模态框遮罩层类名 */
  readonly MODAL_COVER: 'modalCover';
  /** 警告显示类名 */
  readonly WARNING_SHOW: 'autostylerWarningShow';
  /** 模型输入框类名 */
  readonly MODEL_INPUT: 'model-input';
  /** 模型选择器类名 */
  readonly MODEL_SELECT: 'model-select';
  /** 创建样式模板面板类名 */
  readonly CREATE_TEMPLATE_PANEL: 'createStylerTemplatePanel';
  /** 房间列表面板类名 */
  readonly ROOM_LIST_BOARD: 'roomListBoard';
  /** 房间列表类名 */
  readonly ROOM_LIST: 'roomList';
  /** 切换开关容器类名 */
  readonly SWITCH_CONTAINER: 'roomListBoard-switch-con';
  /** 模板房间复选框类名 */
  readonly TEMPLATE_ROOM_CHECKBOX: 'template-room-single-checkbox';
};

export default cssModuleFactory;