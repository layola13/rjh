/**
 * CSS模块加载器的TypeScript类型定义
 * 该模块用于在webpack构建过程中处理和注入CSS样式表
 */

/**
 * CSS导入函数类型
 * 用于导入外部CSS模块并可选地添加媒体查询
 * @param module - CSS模块标识符或导出对象
 * @param mediaQuery - 可选的媒体查询字符串（如 "@media screen and (max-width: 600px)"）
 */
type CSSImportFunction = (module: unknown, mediaQuery?: string) => void;

/**
 * CSS推送函数类型
 * 用于将CSS规则数组推送到样式表集合中
 * @param entry - 包含模块ID和CSS内容的元组数组
 */
type CSSPushFunction = (entry: [moduleId: string | number, cssContent: string, ...rest: unknown[]]) => void;

/**
 * 资源URL解析函数类型
 * 用于处理CSS中的资源引用（如字体文件、图片等）
 * @param resourceId - webpack模块系统中的资源ID
 * @returns 解析后的资源URL路径
 */
type ResourceResolver = (resourceId: number | string) => string;

/**
 * CSS加载器导出对象接口
 * 表示webpack css-loader处理后的CSS模块导出结构
 */
interface CSSLoaderExport {
  /**
   * 模块唯一标识符
   */
  readonly id: string | number;

  /**
   * 导入外部CSS模块的方法
   * @param module - 要导入的CSS模块
   * @param mediaQuery - 可选的媒体查询条件
   */
  i: CSSImportFunction;

  /**
   * 推送CSS规则到样式表
   * @param entry - CSS内容条目
   */
  push: CSSPushFunction;
}

/**
 * Webpack模块加载器函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出对象
 */
type WebpackRequire = (moduleId: number | string) => unknown;

/**
 * CSS样式模块工厂函数
 * 该函数是webpack打包后的模块格式，用于初始化CSS模块
 * 
 * @param exports - 模块导出对象，用于挂载模块的公共API
 * @param module - 当前模块对象，包含id、exports等属性
 * @param require - webpack的require函数，用于加载其他模块
 * 
 * @remarks
 * 此模块执行以下操作：
 * 1. 导入资源URL解析工具（模块992716）
 * 2. 初始化CSS加载器（模块986380，传入false禁用source map）
 * 3. 导入两个依赖CSS模块（736790和542877），不指定媒体查询
 * 4. 推送包含完整CSS重置样式和应用样式的样式表
 * 
 * CSS内容包括：
 * - HTML元素重置样式
 * - 自定义字体定义（Bariol-Regular、AlibabaPuHuiTi-Bold）
 * - 编辑器布局样式（2D/3D画布定位）
 * - 弹窗和模态框样式
 * - 表单元素样式
 * - 动画效果定义
 * - Ant Design组件兼容性覆盖
 * - Homestyler UI组件样式
 */
declare function cssModuleFactory(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: CSSLoaderExport },
  require: WebpackRequire
): void;

export default cssModuleFactory;