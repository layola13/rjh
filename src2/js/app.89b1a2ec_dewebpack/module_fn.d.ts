/**
 * Vue 渲染函数类型定义
 * 用于微信小程序悬停展示组件
 */

import type { VNode, CreateElement, RenderContext } from 'vue';

/**
 * 组件数据接口
 */
interface ComponentData {
  /** 是否为App环境 */
  isApp: boolean;
  /** 是否为Apple设备 */
  isAppleDevice: boolean;
  /** 国际化翻译函数 */
  $t: (key: string) => string;
  /** 渲染文本节点 */
  _v: (text: string) => VNode;
  /** 转换为字符串 */
  _s: (value: unknown) => string;
}

/**
 * 悬停状态对象
 */
interface HoverState {
  /** 是否处于悬停状态 */
  hover: boolean;
}

/**
 * 模块: module_fn
 * 原始ID: fn
 * 
 * Vue渲染函数，用于渲染微信小程序二维码悬停展示组件
 * 
 * @param state - 包含hover状态的对象
 * @returns Vue虚拟DOM节点数组
 * 
 * @description
 * 该组件会：
 * - 在非App环境或非Apple设备上显示
 * - 鼠标悬停时改变文字颜色并显示二维码
 * - 显示微信小程序图标和文字
 * - 展示150x150的小程序二维码
 */
declare function renderMiniProgramHover(
  this: ComponentData,
  state: HoverState
): VNode[];

/**
 * 渲染函数实现
 * @param createElement - Vue的createElement函数（通常命名为h）
 */
declare function render(
  this: ComponentData,
  createElement: CreateElement
): VNode;

export { renderMiniProgramHover, ComponentData, HoverState };