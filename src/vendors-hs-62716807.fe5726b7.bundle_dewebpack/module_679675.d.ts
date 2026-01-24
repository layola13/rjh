/**
 * 检测环境是否支持正确的 Object.defineProperty 行为
 * 
 * 此模块用于测试 JavaScript 引擎是否正确实现了 Object.defineProperty 的 writable 属性。
 * 在某些旧环境中，即使设置 writable: false，函数的 prototype 属性仍然可以被修改。
 * 
 * @returns {boolean} 如果环境存在 defineProperty bug 则返回 true，否则返回 false
 */
declare const hasDefinePropertyBug: boolean;

export default hasDefinePropertyBug;