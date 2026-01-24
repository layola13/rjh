/**
 * VCalendar 鼠标事件处理混入
 * 提供统一的鼠标和触摸事件处理机制
 */

import Vue from 'vue';

/**
 * 鼠标事件配置接口
 */
interface MouseEventConfig {
  /** 原生事件名称 */
  event: string;
  /** 是否阻止默认行为 */
  prevent?: boolean;
  /** 是否阻止事件冒泡 */
  stop?: boolean;
  /** 事件处理结果返回值 */
  result?: boolean;
  /** 鼠标按钮标识（0=左键，1=中键，2=右键） */
  button?: number;
  /** 是否为被动事件监听器 */
  passive?: boolean;
  /** 是否仅触发一次 */
  once?: boolean;
  /** 是否在捕获阶段触发 */
  capture?: boolean;
}

/**
 * 事件配置映射表
 */
interface MouseEventHandlersMap {
  [key: string]: MouseEventConfig;
}

/**
 * DOM事件处理器映射表
 */
interface DOMEventHandlersMap {
  [key: string]: ((event: Event) => boolean | void) | Array<(event: Event) => boolean | void>;
}

/**
 * 事件转换函数类型
 */
type EventTransformer<T = any> = (event: Event) => T;

/**
 * VCalendar 鼠标事件混入
 * 提供标准化的鼠标和触摸事件处理方法
 */
export default interface MouseMixin extends Vue {
  /**
   * 获取默认的鼠标事件处理器配置
   * 
   * @param suffix - 事件名称后缀，用于区分不同的事件处理器组
   * @param transformer - 事件转换函数，将原生事件转换为业务所需格式
   * @returns DOM事件处理器映射表
   * 
   * @example
   *