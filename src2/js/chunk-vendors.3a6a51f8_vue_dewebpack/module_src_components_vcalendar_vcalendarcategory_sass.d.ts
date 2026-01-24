/**
 * VCalendarCategory样式模块类型定义
 * 
 * 该模块导入VCalendar组件的分类样式。
 * Sass/CSS模块在TypeScript中通常不导出具体值，
 * 仅用于副作用（样式注入）。
 * 
 * @module VCalendarCategory
 * @see {@link https://vuetifyjs.com/components/calendars/}
 */

/**
 * VCalendarCategory样式模块
 * 
 * 该模块导入并应用VCalendar分类相关的样式。
 * 由于是纯CSS/Sass模块，不包含可导出的JavaScript值。
 */
declare module '*/VCalendar/VCalendarCategory.sass' {
  /**
   * 样式模块默认导出
   * Sass模块通常无运行时导出，仅产生副作用（注入样式到DOM）
   */
  const styles: void;
  export default styles;
}

/**
 * 通用Sass模块类型声明
 * 为所有.sass文件提供基础类型支持
 */
declare module '*.sass' {
  const content: void;
  export default content;
}