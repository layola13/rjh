import { DependencyList, EffectCallback } from 'react';

/**
 * Effect回调函数类型,接收一个布尔值参数表示是否为首次渲染
 */
type LayoutUpdateEffectCallback = (isFirstRender: boolean) => ReturnType<EffectCallback>;

/**
 * 自定义Hook: useLayoutUpdateEffect
 * 
 * 类似于useLayoutEffect,但跳过首次渲染时的执行。
 * 仅在依赖项更新时执行副作用回调。
 * 
 * @param effect - 副作用回调函数,接收isFirstRender参数(首次渲染为true)
 * @param deps - 依赖项数组,当依赖项变化时触发effect
 * 
 * @example
 *