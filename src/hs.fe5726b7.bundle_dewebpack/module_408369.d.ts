/**
 * CSS模块类型定义
 * 用于属性栏(propertybar)组件的样式声明
 * 
 * @module PropertyBarStyles
 * @description 定义了属性栏组件的CSS样式，包括布局、输入框、按钮、分隔符等元素的样式规则
 */

/**
 * CSS模块加载器函数类型
 * @param insertAt - CSS插入位置标识，false表示默认位置
 */
type CSSModuleLoader = (insertAt: boolean) => CSSModuleExports;

/**
 * CSS模块导出接口
 * 提供push方法用于注册CSS内容
 */
interface CSSModuleExports {
  /**
   * 注册CSS模块内容
   * @param content - 包含模块ID和CSS字符串的数组 [moduleId, cssContent]
   */
  push(content: [string, string]): void;
}

/**
 * Webpack模块导出函数
 * 
 * @param moduleExports - 模块导出对象，用于挂载CSS内容
 * @param _unusedThis - 未使用的this上下文
 * @param requireFn - Webpack的require函数，用于加载CSS加载器模块
 * 
 * @remarks
 * 此模块导出属性栏组件的完整CSS样式，包括：
 * - `.propertybar` - 主容器样式（绝对定位、底部居中、白色背景）
 * - `.propertybar .contents` - 内容区域（固定高度32px）
 * - `.propertybar .contents > li` - 列表项（浮动布局、相对定位）
 * - `.propertybar span` - 通用间距
 * - `.propertybar input[type=text]` - 文本输入框（带边框、内边距）
 * - `.propertybar input[type=text].readonly` - 只读输入框样式
 * - `.propertybar input[type=text].error` - 错误状态输入框（红色边框）
 * - `.propertybar span.inputlabel` - 输入标签样式
 * - `.propertybar .verticaldivider` - 垂直分隔线
 * - `.propertybar .verticalsubdivider` - 垂直子分隔线
 * - `.propertybar .imagebutton` - 图片按钮（可点击、SVG/图片支持）
 * - `.propertybar .linkbutton` - 链接按钮（下划线文本）
 * - `.propertybar li.active` - 激活状态（蓝色填充）
 * - `.propertybar .disable` - 禁用状态（灰色填充）
 * - `.propertybar.statusBar` - 状态栏变体样式
 * - `.propertybar .box_button` - 盒式按钮（圆角、边框）
 * - `.propertybar .pinbtn` - 固定按钮（绝对定位右侧）
 */
declare function exportPropertyBarStyles(
  moduleExports: { exports: unknown; id: string },
  _unusedThis: unknown,
  requireFn: (moduleId: number) => CSSModuleLoader
): void;

export = exportPropertyBarStyles;