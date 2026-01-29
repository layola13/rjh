/**
 * CSS模块导出类型定义
 * 此模块通过Webpack的css-loader处理CSS样式
 */

/**
 * CSS导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象，包含push方法用于添加样式规则
 */
type CSSLoaderExport = (sourceMap: boolean) => {
  /**
   * 添加CSS规则到样式表
   * @param rule - 包含模块ID和CSS内容的元组
   */
  push(rule: [moduleId: string, cssContent: string, sourceMap?: string]): void;
};

/**
 * Webpack模块导出函数
 * @param exports - 模块导出对象
 * @param module - 当前模块对象，包含id等元数据
 * @param require - Webpack的require函数，用于加载其他模块
 */
declare function module_709811(
  exports: any,
  module: {
    /** 模块唯一标识符 */
    id: string;
    /** 模块导出对象 */
    exports: any;
  },
  require: (moduleId: number) => CSSLoaderExport
): void;

/**
 * 反馈统计组件的CSS样式模块
 * 
 * 包含的样式类：
 * - `.feedback-statistics-wrapper` - 统计容器主wrapper
 * - `.feedback-statistics` - 统计内容区域
 * - `.feedback-statistic` - 单个统计项
 * - `.feedback-statistic-title` - 统计项标题
 * - `.feedback-statistic-count` - 统计项数值
 * - `.feedback-black` - 黑色主题modifier类
 * 
 * 样式特性：
 * - 使用Flexbox布局实现居中对齐
 * - 支持明亮/黑暗两种主题配色
 * - 带圆角阴影的卡片式设计
 * - 集成Ant Design的Divider组件样式
 */
export = module_709811;