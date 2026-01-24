import React from 'react';
import { ThemeContext } from './ThemeContext';
import { getTime } from './utils';

/**
 * 反馈回复内容组件的属性接口
 */
interface FeedbackReplyContentProps {
  /** 回复标题 */
  title: string;
  /** 回复内容 */
  content: string;
  /** 回复日期时间戳 */
  date: number;
  /** 回复附带的图片URL列表 */
  images?: string[];
  /** 点击图片时显示轮播图模态框的回调函数 */
  onShowCarouselModal: (images: string[]) => void;
}

/**
 * 反馈回复内容组件
 * 用于展示用户反馈的回复信息，包括标题、内容、时间和图片
 */
export declare class FeedbackReplyContent extends React.Component<FeedbackReplyContentProps> {
  /**
   * React 上下文类型，用于主题切换
   */
  static contextType: typeof ThemeContext;
  
  /**
   * 组件上下文实例
   */
  context: React.ContextType<typeof ThemeContext>;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: FeedbackReplyContentProps);

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}