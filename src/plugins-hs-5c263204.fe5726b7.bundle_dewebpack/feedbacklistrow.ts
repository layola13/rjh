import React from 'react';
import { Carousel } from 'antd';
import { Icons } from './Icons';
import { FeedbackReplyContent } from './FeedbackReplyContent';
import { ThemeContext } from './ThemeContext';
import classNames from 'classnames';

interface ReplyItem {
  id: string | number;
  replyDate: string;
  replyImage?: string[];
  replyContent: string;
}

interface ExtraData {
  image?: string[];
}

interface FeedbackData {
  ID: string | number;
  reply?: ReplyItem[];
  createTime: string;
  content: string;
  extraData?: ExtraData;
  [key: string]: unknown;
}

interface ColumnConfig {
  key: string;
  dataIndex: string;
  width?: string | number;
  extraIndex?: string[];
  render?: (value: unknown, extraValues: unknown[]) => React.ReactNode;
}

interface FeedbackListRowProps {
  columns: ColumnConfig[];
  data: FeedbackData;
  extended: boolean;
  onShowCarousel: (images: string[], index: number) => void;
}

interface FeedbackListRowState {
  replyIndex: number;
  currentCarouselIndex: number;
}

export class FeedbackListRow extends React.Component<FeedbackListRowProps, FeedbackListRowState> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  private replyCarousel?: {
    prev: () => void;
    next: () => void;
  };

  constructor(props: FeedbackListRowProps) {
    super(props);
    this.state = {
      replyIndex: 0,
      currentCarouselIndex: 0
    };
  }

  handleReplyChange(direction: 'prev' | 'next'): void {
    const { currentCarouselIndex } = this.state;
    const replyList = this.props.data.reply ?? [];

    if (direction === 'prev' && currentCarouselIndex !== 0) {
      this.replyCarousel?.prev();
    } else if (direction === 'next' && currentCarouselIndex !== replyList.length - 1) {
      this.replyCarousel?.next();
    }
  }

  afterChange(index: number): void {
    this.setState({
      currentCarouselIndex: index
    });
  }

  render(): React.ReactNode {
    const { currentCarouselIndex } = this.state;
    const { columns, data, extended, onShowCarousel } = this.props;
    const { reply = [], createTime, content, extraData = {} } = data;
    const lastReplyIndex = reply.length - 1;

    return (
      <div className={`feedback-list-row ${this.context} ${extended ? 'feedback-list-row-extended' : ''}`}>
        <div className="feedback-list-row-container">
          {columns.map((column) => (
            <span
              key={`${data.ID}-${column.key}`}
              className="feedback-list-row-item"
              style={column.width ? {
                width: column.width,
                flexGrow: 0,
                flexShrink: 0
              } : {}}
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

        <div className="feedback-list-extended-row">
          <div className="feedback-list-extended-row-content">
            <>
              <div className="feedback-list-row-reply-container">
                {reply.length > 1 && (
                  <>
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
                    <div
                      className={classNames({
                        'feedback-list-row-reply-btn': true,
                        'feedback-list-row-reply-btn--disabled': currentCarouselIndex === lastReplyIndex,
                        'feedback-list-row-reply-next': true
                      })}
                      onClick={() => this.handleReplyChange('next')}
                    >
                      <Icons type="hs_xiao_danjiantou_you" />
                    </div>
                  </>
                )}

                <Carousel
                  dots={{ className: 'feedback-reply-list-dots' }}
                  ref={(ref) => {
                    if (ref) {
                      this.replyCarousel = ref;
                    }
                  }}
                  afterChange={(index) => this.afterChange(index)}
                >
                  {reply.map((replyItem) => (
                    <div key={replyItem.id} className="feedback-list-row-reply-item">
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