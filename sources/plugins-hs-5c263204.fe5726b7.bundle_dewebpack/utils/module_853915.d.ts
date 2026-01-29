/**
 * CSS样式模块类型定义
 * 该模块导出对话框组件的CSS样式字符串
 * @module DialogueStyles
 */

/**
 * Webpack模块函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
declare function webpackModule(
  exports: ModuleExports,
  module: Module,
  require: RequireFunction
): void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  [key: string]: unknown;
}

/**
 * Webpack模块对象接口
 */
interface Module {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: ModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数接口
 * 用于动态加载其他模块
 */
interface RequireFunction {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出对象
   */
  (moduleId: string | number): unknown;
}

/**
 * CSS加载器返回类型
 * 通常由css-loader生成，包含push方法用于添加CSS内容
 */
interface CSSLoaderExport {
  /**
   * 添加CSS样式内容
   * @param content - CSS内容数组，格式为 [moduleId, cssString, sourceMap?]
   */
  push(content: [string | number, string, string?]): void;
  
  /** 转换为字符串 */
  toString(): string;
  
  /** CSS模块的局部作用域类名映射（如果启用CSS Modules） */
  locals?: Record<string, string>;
}

/**
 * 对话框样式CSS内容
 * 包含以下主要样式类：
 * - .dialogue: 对话框容器基础样式
 * - .host: 主持人（系统/机器人）消息样式
 * - .guest: 访客（用户）消息样式
 * - .time-content: 时间戳显示样式
 * - .person-detail: 用户头像和名称样式
 * - .main-content: 消息主体内容样式
 * - .loading-bar: 加载动画样式
 * - .message-actions: 消息操作按钮样式
 * - .content-selection-area: 选项按钮区域样式
 * - .content-check-area: 确认/取消按钮区域样式
 */
declare const dialogueStyles: string;

/**
 * 默认导出：CSS样式加载器实例
 * 调用 require(986380)(false) 获取css-loader实例
 * 然后调用 push 方法注入样式内容
 */
export default dialogueStyles;

/**
 * 样式类名常量（供TypeScript使用）
 */
export interface DialogueStyleClasses {
  /** 对话框容器 */
  dialogue: string;
  /** 时间戳内容 */
  'time-content': string;
  /** 人物详情（头像+名称） */
  'person-detail': string;
  /** 主要内容区域 */
  'main-content': string;
  /** 主持人消息样式 */
  host: string;
  /** 访客消息样式 */
  guest: string;
  /** 内容区域 */
  content: string;
  /** 选择内容区域 */
  'selection-content': string;
  /** 加载动画条 */
  'loading-bar': string;
  /** 消息操作按钮 */
  'message-actions': string;
  /** 操作项 */
  'action-item': string;
  /** 内容选择区域（横向按钮） */
  'content-selection-area': string;
  /** 内容多选区域（纵向按钮） */
  'content-multi-selection-area': string;
  /** 内容确认区域 */
  'content-check-area': string;
  /** 加载停止按钮 */
  'loading-stop': string;
  /** 已存在选择 */
  'exist-selection': string;
  /** 已存在操作 */
  'exist-action': string;
}