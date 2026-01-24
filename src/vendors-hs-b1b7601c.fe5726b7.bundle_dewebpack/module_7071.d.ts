/**
 * 从基础库中获取原生 Map 构造函数的引用
 * 
 * 该模块通过依赖注入模式获取全局 Map 对象，
 * 通常用于确保在不同环境下使用一致的 Map 实现
 * 
 * @module MapReference
 */

/**
 * 原生 JavaScript Map 构造函数
 * 
 * Map 对象保存键值对，并且能够记住键的原始插入顺序。
 * 任何值（对象或原始值）都可以作为键或值。
 * 
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
declare const MapConstructor: MapConstructor;

export default MapConstructor;