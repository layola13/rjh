/**
 * CSS模块加载器类型定义
 * 用于Webpack CSS加载器的模块导出
 */

/**
 * CSS模块导出接口
 * 表示通过css-loader处理后的CSS模块
 */
interface CSSModuleExports {
  /** CSS内容字符串 */
  toString(): string;
  /** CSS模块的唯一标识符 */
  id: string | number;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * 模块导出函数类型定义
 * 表示Webpack模块系统中的标准模块导出
 * 
 * @param exports - 模块导出对象
 * @param require - 模块加载函数，用于加载其他模块
 * @param moduleId - 当前模块的唯一标识符
 */
declare function moduleExports(
  exports: CSSModuleExports,
  require: (moduleId: number) => unknown,
  moduleId: string | number
): void;

/**
 * CSS资源导入器模块
 * 用于处理CSS中的url()引用
 */
declare const cssUrlImporter: (url: string) => string;

/**
 * CSS加载器模块
 * 负责将CSS字符串转换为可导出的模块格式
 */
declare const cssLoader: CSSLoaderFunction;

/**
 * 模块997883的导出
 * 包含HomeGPT组件的所有样式定义
 * 
 * 主要样式类：
 * - .homeGPT-entry: 主容器，绝对定位
 * - .homeGPT-floating: 浮动对话框样式
 * - .homeGPT-dialog-frame: 对话框框架
 * - .homeGPT-dialog: 对话框主体
 * - .homeGPT-dialog-title: 对话框标题区域
 * - .homeGPT-dialog-body: 对话框内容区域
 * - .homeGPT-dialog-footer: 对话框底部输入区域
 * - .homeGPT-dialog-input: 输入框容器
 * - #homeGPT-logo-icon: Logo图标动画
 * - #homegpt-container: 根容器
 * 
 * 功能特性：
 * - 支持拖拽移动
 * - 平滑的展开/收起动画
 * - 自定义滚动条样式
 * - 响应式高度调整
 * - 会员等级标识
 * - 语音输入图标
 * - 图片上传功能
 */
export = moduleExports;