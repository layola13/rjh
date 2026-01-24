/**
 * 检测环境是否支持正确的属性描述符行为
 * 
 * 此模块用于检测JavaScript引擎是否正确实现了Object.defineProperty的writable特性。
 * 在某些旧版本或非标准环境中，即使设置writable: false，属性仍可能被修改。
 * 
 * @module PropertyDescriptorComplianceCheck
 */

/**
 * 判断当前环境是否存在属性描述符的实现缺陷
 * 
 * 测试逻辑：
 * 1. 尝试在函数对象的prototype上定义一个不可写属性（writable: false）
 * 2. 检查该属性值是否仍然是42
 * 3. 如果不等于42，说明环境存在bug（属性被意外修改或定义失败）
 * 
 * @returns {boolean} 如果环境存在描述符缺陷则返回true，否则返回false
 */
declare function hasPropertyDescriptorBug(): boolean;

/**
 * 指示当前环境是否需要属性描述符的降级处理
 * 
 * 该值为true时表示环境存在以下问题之一：
 * - 不支持描述符（通过isDescriptorSupported检测）
 * - 描述符的writable特性实现不正确（通过hasPropertyDescriptorBug检测）
 * 
 * @type {boolean}
 */
declare const requiresDescriptorFallback: boolean;

export default requiresDescriptorFallback;

/**
 * 依赖模块说明：
 * @dependency isDescriptorSupported - 检测环境是否支持Object.defineProperty（模块ID: 63855）
 * @dependency testFunction - 用于执行兼容性测试的工具函数（模块ID: 87524）
 */