/**
 * VSlider样式模块类型定义
 * 
 * 该模块导出Sass样式文件的类型声明。
 * 在Webpack构建过程中，.sass/.scss文件通过css-loader/style-loader处理，
 * 不产生静态导出，而是将样式注入到DOM中。
 * 
 * @module VSlider.sass
 * @packageDocumentation
 */

/**
 * VSlider组件的样式模块
 * 
 * @remarks
 * 此模块通过副作用导入方式使用：
 *