/**
 * CSS样式模块定义
 * 
 * 该模块导出线性尺寸标注相关的CSS样式，包括输入控件和文本控件的样式定义。
 * 主要用于在绘图或设计工具中显示可编辑的尺寸标注。
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleLoader - CSS加载器函数（来自webpack构建系统）
 */
declare module 'module_35887' {
  /**
   * CSS样式字符串内容
   * 包含以下样式类：
   * 
   * 1. `.lineardimension.inputwidgets` - 标准线性尺寸输入控件容器
   *    - 绝对定位，45x20px，透明背景，z-index: 7
   * 
   * 2. `.lineardimension.textwidgets` - 标准线性尺寸文本显示控件
   *    - 绝对定位，45x20px，居中对齐，禁用指针事件，带白色文字阴影
   * 
   * 3. `.lineardimension.inputwidgets input` - 输入框样式
   *    - 45x16px，12px字体，居中对齐
   * 
   * 4. `.lineardimension.inputwidgets .homestyler-numberinput...` - 数字输入组件样式
   *    - 单位宽度12px，焦点时白色背景
   * 
   * 5. `.section-lineardimension.inputwidgets` - 截面线性尺寸输入控件（较小）
   *    - 绝对定位，28x14px，flex居中布局
   * 
   * 6. `.section-lineardimension.textwidgets` - 截面线性尺寸文本控件
   *    - 绝对定位，28x14px，样式同标准文本控件
   * 
   * 7-8. `.section-lineardimension` 相关输入框和数字组件样式
   *    - 对应较小尺寸的控件样式
   */
  const styles: string;
  
  export default styles;
}

/**
 * CSS模块加载器接口
 * 由webpack的css-loader提供
 */
interface CSSModuleLoader {
  /**
   * 推送CSS样式到样式表
   * @param styleData - 包含模块ID和CSS内容的数组 [moduleId, cssContent]
   */
  push(styleData: [string | number, string]): void;
}

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 导出的内容（CSS加载器实例） */
  exports: CSSModuleLoader;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成source map（false表示不生成）
 * @returns CSS模块加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleLoader;