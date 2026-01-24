/**
 * VSwitch样式模块
 * 
 * 该模块导入VSwitch组件的Sass样式。
 * 由于CSS/Sass模块在JavaScript中没有静态导出，
 * 此声明文件仅用于类型检查和模块解析。
 * 
 * @module VSwitch.sass
 * @description VSwitch组件的样式定义文件
 */

declare module './src/components/VSwitch/VSwitch.sass' {
  /**
   * Sass样式模块，无导出内容。
   * 导入此模块会将样式注入到页面中。
   */
  const styles: void;
  export default styles;
}

declare module '*.sass' {
  /**
   * 通用Sass模块声明
   * 支持项目中所有.sass文件的类型安全导入
   */
  const content: void;
  export default content;
}