/**
 * 检测环境是否支持标准的 Object.defineProperty
 * 
 * 该模块用于判断当前 JavaScript 环境是否完全支持 ES5 的 Object.defineProperty 方法。
 * 通过在 DOM 元素上定义属性并测试 getter 是否正常工作来进行检测。
 * 
 * @module PropertyDescriptorSupport
 * @returns {boolean} 如果环境不支持标准的 defineProperty 则返回 true，否则返回 false
 */

import { isDescriptorSupported } from './8e60';
import { suppressError } from './294c';
import { createElement } from './1ec9';

/**
 * 检测当前环境是否不支持 Object.defineProperty 的标准行为
 * 
 * 检测逻辑：
 * 1. 如果已知环境支持 descriptor，直接返回 false
 * 2. 否则尝试在 div 元素上定义一个带 getter 的属性
 * 3. 如果 getter 返回值不是预期的 7，说明环境不支持
 * 
 * @returns {boolean} true 表示环境不支持标准的 defineProperty
 */
const isPropertyDescriptorUnsupported: boolean = 
  !isDescriptorSupported && 
  !suppressError((): boolean => {
    const testElement: HTMLDivElement = createElement('div');
    
    const descriptorResult = Object.defineProperty(testElement, 'a', {
      get(): number {
        return 7;
      }
    });
    
    return descriptorResult.a !== 7;
  });

export default isPropertyDescriptorUnsupported;