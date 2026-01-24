/**
 * 获取 Vue 实例上的属性值
 * @description 从 Vue 组件实例的 _vm 对象中获取指定属性
 * @module module_get
 */

/**
 * Vue 实例包装对象接口
 */
interface VueInstanceWrapper {
  /** Vue 实例对象，包含组件的响应式数据和方法 */
  _vm: Record<string, unknown>;
}

/**
 * 从 Vue 实例中获取指定属性的值
 * 
 * @param context - Vue 实例包装对象
 * @param propertyName - 要获取的属性名称
 * @returns 属性值，类型为 unknown（需要调用方进行类型断言）
 * 
 * @example
 *