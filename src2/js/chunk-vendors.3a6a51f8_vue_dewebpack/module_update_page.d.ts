/**
 * 页面更新事件发射器模块
 * 
 * 该模块用于触发Vue组件的page属性更新事件，通常用于实现分页组件的双向数据绑定。
 * 这是Vue的 .sync 修饰符或 v-model 模式的标准实现。
 * 
 * @module module_update_page
 * @originalId update:page
 */

/**
 * 页面更新事件处理器的类型定义
 * 
 * @template TPage - 页面标识符的类型，可以是数字（页码）或字符串（页面名称）
 * @param newPage - 新的页面值，将通过事件传递给父组件
 * @returns void - 该函数不返回任何值
 * 
 * @example
 *