/**
 * VDatePickerHeader 组件样式模块
 * 
 * @remarks
 * 此模块包含 VDatePicker 组件头部的样式定义。
 * 作为 CSS/SASS 模块导入，通常不导出任何内容。
 * 
 * @module VDatePickerHeader
 * @packageDocumentation
 */

/**
 * 样式模块类型定义
 * 
 * @remarks
 * SASS/CSS 模块通常通过副作用（side-effect）方式工作，
 * 将样式注入到文档中，因此不导出任何值。
 */
declare module './VDatePickerHeader.sass' {
  /**
   * 默认导出为空对象
   * CSS/SASS 模块导入仅用于副作用（样式注入）
   */
  const styles: Record<string, never>;
  export default styles;
}

/**
 * 备用的具名导出声明
 * 
 * @remarks
 * 某些构建配置可能以具名方式导出 CSS 类名
 */
declare module './VDatePickerHeader.sass' {
  /**
   * CSS 模块导出的类名映射
   * 键为原始类名，值为转换后的唯一类名
   */
  export const classes: Readonly<Record<string, string>>;
}