import type { ReactNode, HTMLAttributes } from 'react';

/**
 * Card.Meta 组件的属性接口
 */
export interface CardMetaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 头像元素，通常为 Avatar 组件
   */
  avatar?: ReactNode;

  /**
   * 标题内容
   */
  title?: ReactNode;

  /**
   * 描述内容
   */
  description?: ReactNode;
}

/**
 * Card.Meta 组件
 * 用于卡片内容区的描述性信息展示，支持头像、标题和描述文本
 * 
 * @param props - CardMetaProps 属性对象
 * @returns React 函数组件
 */
declare const CardMeta: React.FC<CardMetaProps>;

export default CardMeta;