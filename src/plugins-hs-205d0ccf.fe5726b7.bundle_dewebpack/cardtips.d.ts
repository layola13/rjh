/**
 * CardTips 组件类型定义
 * 用于显示卡片提示的 React 组件
 */

/**
 * 主题类型
 * @description 支持的主题模式
 */
export type Theme = 'teaching-black' | 'black' | 'light' | string;

/**
 * 卡片提示数据内容
 * @description 定义卡片提示的数据结构
 */
export interface CardTipsContent {
  /** 卡片标题 */
  title: string;
  /** 卡片介绍内容 */
  introduction: string;
  /** 其他可能的内容字段 */
  [key: string]: unknown;
}

/**
 * CardTips 组件属性
 * @description CardTips 组件的 Props 接口
 */
export interface CardTipsProps {
  /** 组件类型标识 */
  type: string;
  /** 
   * 卡片数据数组
   * @description 至少包含一个 CardTipsContent 对象
   */
  data: [CardTipsContent, ...CardTipsContent[]];
}

/**
 * CardTips 组件
 * @description 用于展示卡片提示信息的 React 功能组件，包含标题、介绍、关闭按钮和跳转链接
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *