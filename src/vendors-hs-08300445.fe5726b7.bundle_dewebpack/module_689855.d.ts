/**
 * 星级评分组件的单个星星项
 * 支持半星显示、键盘导航和自定义渲染
 */

import type { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';

/**
 * 星星字符渲染函数类型
 * @param props - 星星组件的所有属性
 * @returns 自定义渲染的字符
 */
export type CharacterFunction = (props: StarProps) => ReactNode;

/**
 * 星星元素自定义渲染函数类型
 * @param node - 原始渲染的星星节点
 * @param props - 星星组件的所有属性
 * @returns 自定义渲染的完整星星元素
 */
export type CharacterRenderFunction = (node: ReactNode, props: StarProps) => ReactNode;

/**
 * 鼠标悬停事件处理函数类型
 * @param event - 鼠标事件对象
 * @param index - 当前星星的索引
 */
export type HoverHandler = (event: MouseEvent<HTMLDivElement>, index: number) => void;

/**
 * 点击事件处理函数类型
 * @param event - 鼠标事件对象
 * @param index - 当前星星的索引
 */
export type ClickHandler = (event: MouseEvent<HTMLDivElement>, index: number) => void;

/**
 * 星星组件的属性接口
 */
export interface StarProps {
  /**
   * 样式类名前缀
   * @default 'rc-rate'
   */
  prefixCls: string;

  /**
   * 当前星星的索引位置（从0开始）
   */
  index: number;

  /**
   * 当前评分值
   */
  value: number;

  /**
   * 是否允许半星评分
   * @default false
   */
  allowHalf?: boolean;

  /**
   * 是否处于聚焦状态
   * @default false
   */
  focused?: boolean;

  /**
   * 是否禁用交互
   * @default false
   */
  disabled?: boolean;

  /**
   * 星星总数
   */
  count: number;

  /**
   * 星星显示的字符或字符生成函数
   * @default '★'
   */
  character?: ReactNode | CharacterFunction;

  /**
   * 自定义星星元素的渲染函数
   */
  characterRender?: CharacterRenderFunction;

  /**
   * 鼠标悬停事件处理器
   */
  onHover: HoverHandler;

  /**
   * 点击事件处理器
   */
  onClick: ClickHandler;
}

/**
 * 星星组件类
 * 用于评分组件中的单个星星渲染和交互
 */
export default class Star extends Component<StarProps> {
  /**
   * 处理鼠标悬停事件
   * @param event - 鼠标事件对象
   */
  onHover: (event: MouseEvent<HTMLDivElement>) => void;

  /**
   * 处理点击事件
   * @param event - 鼠标事件对象
   */
  onClick: (event: MouseEvent<HTMLDivElement>) => void;

  /**
   * 处理键盘按下事件
   * 当按下Enter键（keyCode 13）时触发点击
   * @param event - 键盘事件对象
   */
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;

  /**
   * 根据当前状态生成星星的样式类名
   * @returns 完整的CSS类名字符串
   */
  getClassName(): string;

  /**
   * 渲染星星组件
   * @returns 星星的React元素
   */
  render(): ReactNode;
}