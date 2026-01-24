/**
 * 浏览器环境自适应布局效果Hook
 * 
 * 根据运行环境智能选择useLayoutEffect或useEffect：
 * - 浏览器环境：使用useLayoutEffect（同步执行，避免闪烁）
 * - 服务端环境：使用useEffect（避免SSR警告）
 * 
 * @module IsomorphicLayoutEffect
 */

import { useEffect, useLayoutEffect, EffectCallback, DependencyList } from 'react';

/**
 * 检查是否为浏览器客户端环境
 */
export declare const isBrowserClient: boolean;

/**
 * 同构布局效果Hook
 * 
 * 自动根据运行环境选择合适的副作用Hook：
 * - 在浏览器中使用useLayoutEffect，确保DOM变更后同步执行，防止视觉闪烁
 * - 在服务端使用useEffect，避免SSR期间的警告信息
 * 
 * @param effect - 副作用回调函数，可返回清理函数
 * @param deps - 依赖项数组，当依赖变化时重新执行effect
 * 
 * @example
 *