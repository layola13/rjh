/**
 * 反馈列表行组件
 * 用于展示用户反馈及其回复内容
 */

import React, { Component, RefObject } from 'react';
import { Carousel } from 'antd';
import { Icons } from './Icons';
import { FeedbackReplyContent } from './FeedbackReplyContent';
import { ThemeContext } from './ThemeContext';
import classNames from 'classnames';

/**
 * 反馈数据中的额外数据
 */
interface FeedbackExtraData {
  /** 反馈附带的图片列表 */
  image?: string[];
  [key: string]: unknown;
}

/**
 * 反馈回复项
 */
interface FeedbackReply {
  /** 回复ID */
  id: string | number;
  /** 回复日期 */
  replyDate: string;
  /** 回复图片列表 */
  replyImage?: string[];
  /** 回复内容文本 */
  replyContent: string;
}

/**
 * 反馈数据项
 */
interface FeedbackData {
  /** 反馈ID */
  ID: string | number;
  /** 创建时间 */
  createTime: string;
  /** 反馈内容 */
  content: string;
  /** 回复列表 */
  reply?: FeedbackReply[];
  /** 额外数据（如图片等） */
  extraData?: FeedbackExtraData;
  /** 其他动态字段 */
  [key: string]: unknown;
}

/**
 * 列定义配置
 */
interface ColumnConfig {
  /** 列的唯一标识 */
  key: string;
  /** 数据索引字段 */
  dataIndex: string;
  /** 列宽度 */
  width?: string | number;
  /** 自定义渲染函数 */
  render?: (value: unknown, extraValues: unknown[]) => React.ReactNode;
  /** 额外数据索引字段 */
  extraIndex?: string[];
}

/**
 * FeedbackListRow 组件属性
 */
interface FeedbackListRowProps {
  /** 列配置数组 */
  columns: ColumnConfig[];
  /** 反馈数据 */
  data: FeedbackData;
  /** 是否展开显示详情 */
  extended: boolean;
  /** 显示图片轮播回调 */
  onShowCarousel: (images: string[], initialIndex?: number) => void;
}

/**
 * FeedbackListRow 组件状态
 */
interface FeedbackListRowState {
  /** 当前回复索引（已废弃） */
  replyIndex: number;
  /** 当前轮播图索引 */
  currentCarouselIndex: number;
}

/**
 * 反馈列表行组件
 * 展示单条反馈及其回复，支持多回复轮播切换
 */
export class FeedbackListRow extends Component<FeedbackListRowProps, FeedbackListRowState> {
  /** 主题上下文类型 */
  static contextType = ThemeContext;
  
  /** 声明 context 类型 */
  declare context: React.ContextType<typeof ThemeContext>;

  /** 回复轮播组件引用 */
  private replyCarousel: RefObject<typeof Carousel> | null = null;

  constructor(props: FeedbackListRowProps) {
    super(props);
    this.state = {
      replyIndex: 0,
      currentCarouselIndex: 0
    };
  }

  /**
   * 处理回复切换
   * @param direction - 切换方向：'prev' 或 'next'
   */
  handleReplyChange(direction: 'prev' | 'next'): void {
    const { currentCarouselIndex } = this.state;
    const replies = this.props.data.reply ?? [];

    if (direction === 'prev' && currentCarouselIndex !== 0) {
      this.replyCarousel?.prev();
    } else if (direction === 'next' && currentCarouselIndex !== replies.length - 1) {
      this.replyCarousel?.next();
    }
  }

  /**
   * 轮播切换完成后的回调
   * @param index - 当前轮播索引
   */
  afterChange(index: number): void {
    this.setState({
      currentCarouselIndex: index
    });
  }

  render(): React.ReactNode {
    const { currentCarouselIndex } = this.state;
    const { columns, data, extended, onShowCarousel } = this.props;
    const {
      reply = [],
      createTime,
      content,
      extraData = {}
    } = data;

    const lastReplyIndex = reply.length - 1;
    const hasMultipleReplies = reply.length > 1;

    return (
      <div
        className={`feedback-list-row ${this.context} ${
          extended ? 'feedback-list-row-extended' : ''
        }`}
      >
        {/* 基础信息行 */}
        <div className="feedback-list-row-container">
          {columns.map((column) => (
            <span
              key={`${data.ID}-${column.key}`}
              className="feedback-list-row-item"
              style={
                column.width
                  ? {
                      width: column.width,
                      flexGrow: 0,
                      flexShrink: 0
                    }
                  : {}
              }
            >
              {column.render
                ? column.render(
                    data[column.dataIndex],
                    (column.extraIndex ?? []).map((extraKey) => data[extraKey])
                  )
                : data[column.dataIndex]}
            </span>
          ))}
        </div>

        {/* 扩展详情区域 */}
        <div className="feedback-list-extended-row">
          <div className="feedback-list-extended-row-content">
            <>
              {/* 回复列表轮播 */}
              <div className="feedback-list-row-reply-container">
                {hasMultipleReplies && (
                  <>
                    {/* 上一条回复按钮 */}
                    <div
                      className={classNames({
                        'feedback-list-row-reply-btn': true,
                        'feedback-list-row-reply-btn--disabled': currentCarouselIndex === 0,
                        'feedback-list-row-reply-prev': true
                      })}
                      onClick={() => this.handleReplyChange('prev')}
                    >
                      <Icons type="hs_xiao_danjiantou_zuo" />
                    </div>

                    {/* 下一条回复按钮 */}
                    <div
                      className={classNames({
                        'feedback-list-row-reply-btn': true,
                        'feedback-list-row-reply-btn--disabled':
                          currentCarouselIndex === lastReplyIndex,
                        'feedback-list-row-reply-next': true
                      })}
                      onClick={() => this.handleReplyChange('next')}
                    >
                      <Icons type="hs_xiao_danjiantou_you" />
                    </div>
                  </>
                )}

                {/* 回复内容轮播 */}
                <Carousel
                  dots={{ className: 'feedback-reply-list-dots' }}
                  ref={(carousel) => {
                    this.replyCarousel = carousel;
                  }}
                  afterChange={(index) => this.afterChange(index)}
                >
                  {reply.map((replyItem) => (
                    <div
                      key={replyItem.id}
                      className="feedback-list-row-reply-item"
                    >
                      <FeedbackReplyContent
                        title={ResourceManager.getString('plugin_feedback_reply_title')}
                        date={replyItem.replyDate}
                        images={replyItem.replyImage}
                        content={replyItem.replyContent}
                        onShowCarouselModal={onShowCarousel}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* 原始反馈描述 */}
              <div className="feedback-list-row-desc-container">
                <FeedbackReplyContent
                  title={ResourceManager.getString('plugin_feedback_describe')}
                  date={createTime}
                  images={extraData.image}
                  content={content}
                  onShowCarouselModal={onShowCarousel}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}