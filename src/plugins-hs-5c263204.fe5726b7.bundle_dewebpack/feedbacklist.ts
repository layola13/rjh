import React from 'react';
import { FeedbackListRowContent } from './FeedbackListRowContent';
import { FeedbackListRow } from './FeedbackListRow';
import { Icons } from './Icons';
import { Pagination } from './Pagination';
import { FeedbackStatistics } from './FeedbackStatistics';
import { feedbackStateMap, feedbackListLimit } from './constants';
import { getTime } from './utils';
import { ThemeContext } from './ThemeContext';

interface FeedbackType {
  id: string;
  ID: string;
  type: string[];
  content: string;
  replyImage?: string;
  extended?: boolean;
  createTime: number;
  state: string;
  hasUnreadReply?: boolean;
  reply?: any;
}

interface ColumnConfig<T = any> {
  title: string;
  key: string;
  dataIndex: string;
  extraIndex?: string[];
  width?: string;
  render?: (value: any, extraData?: any[]) => React.ReactNode;
}

interface FeedbackListProps {
  dataSource: FeedbackType[];
  total: number;
  statistics?: any;
  onNavToFeedbackEntry?: () => void;
  onGetFeedbackList?: (page: number) => Promise<{ dataSource: FeedbackType[]; total: number }>;
  onReadReply?: (id: string) => Promise<{ reply: any }>;
  onShowCarousel?: (images: any) => void;
}

interface FeedbackListState {
  dataSource: FeedbackType[];
  total: number;
  currentPage: number;
}

export class FeedbackList extends React.Component<FeedbackListProps, FeedbackListState> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  private columns: ColumnConfig[];

  constructor(props: FeedbackListProps) {
    super(props);

    this.columns = [
      {
        title: ResourceManager.getString('plugin_feedback_issuetype'),
        key: 'type',
        dataIndex: 'type',
        width: '17%',
        render: (value: string[]) => value.join(', ')
      },
      {
        title: ResourceManager.getString('plugin_feedback_describe'),
        key: 'content',
        dataIndex: 'content',
        extraIndex: ['id', 'replyImage', 'extended'],
        width: '31%',
        render: (text: string, extraData?: any[]) => {
          const [id, replyImage, extended] = extraData ?? [];
          return (
            <FeedbackListRowContent
              text={text}
              showImageIcon={!!replyImage}
              extended={extended}
              onExtend={() => this.extendRow(id)}
            />
          );
        }
      },
      {
        title: ResourceManager.getString('plugin_feedback_submit_time'),
        key: 'createTime',
        dataIndex: 'createTime',
        width: '10%',
        render: (timestamp: number) => <span>{getTime(timestamp, false)}</span>
      },
      {
        title: ResourceManager.getString('plugin_feedback_status'),
        key: 'state',
        dataIndex: 'state',
        width: '14%',
        render: (state: string) => (
          <span>{ResourceManager.getString(feedbackStateMap[state])}</span>
        )
      },
      {
        title: ResourceManager.getString('plugin_feedback_action'),
        dataIndex: 'hasUnreadReply',
        extraIndex: ['id', 'extended'],
        key: 'action',
        render: (hasUnreadReply: boolean, extraData?: any[]) => {
          const [id, extended] = extraData ?? [];
          return (
            <span
              className="feedback-list-row-show-reply"
              onClick={() => this.extendRow(id)}
            >
              <span className="feedback-list-row-show-reply-text">
                {extended
                  ? ResourceManager.getString('plugin_feedback_hide_reply')
                  : ResourceManager.getString('plugin_feedback_view_reply')}
              </span>
              {hasUnreadReply && <span className="feedback-list-row-show-reply-dot" />}
            </span>
          );
        }
      }
    ];

    this.state = {
      dataSource: props.dataSource,
      total: props.total,
      currentPage: 1
    };

    this.navToFeedbackEntry = this.navToFeedbackEntry.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.extendRow = this.extendRow.bind(this);
  }

  extendRow(feedbackId: string): void {
    const dataSource = [...this.state.dataSource];
    const targetFeedback = dataSource.filter(item => item.id === feedbackId)[0];

    this.props.onReadReply?.(feedbackId)
      .then(response => {
        if (targetFeedback.hasUnreadReply) {
          targetFeedback.hasUnreadReply = false;
        }
        targetFeedback.extended = !targetFeedback.extended;
        targetFeedback.reply = response.reply;
        this.setState({ dataSource });
      })
      .catch(() => {});
  }

  navToFeedbackEntry(): void {
    this.props.onNavToFeedbackEntry?.();
  }

  handlePageChange(page: number): void {
    const { onGetFeedbackList } = this.props;
    this.setState({ currentPage: page });

    onGetFeedbackList?.(page)
      .then(result => {
        this.setState(result);
      })
      .catch(() => {});
  }

  render(): React.ReactNode {
    const { total, currentPage } = this.state;
    const { onShowCarousel, statistics } = this.props;

    return (
      <div className={`feedback-list-wrapper ${this.context}`}>
        <FeedbackStatistics data={statistics} />
        <div style={{ width: '100%', height: '12px' }} />
        <div className="feedback-list">
          {this.state.dataSource.length > 0 && (
            <>
              <div className="feedback-list-header">
                {this.columns.map(column => (
                  <span
                    className="feedback-list-header-column"
                    style={
                      column.width
                        ? { width: column.width, flexGrow: 0, flexShrink: 0 }
                        : {}
                    }
                  >
                    {column.title}
                  </span>
                ))}
              </div>
              <div className="feedback-list-body">
                {this.state.dataSource.map(feedback => (
                  <FeedbackListRow
                    key={feedback.ID}
                    columns={this.columns}
                    data={feedback}
                    extended={feedback.extended}
                    onShowCarousel={onShowCarousel}
                  />
                ))}
              </div>
            </>
          )}
          {this.state.dataSource.length === 0 && (
            <div className="feedback-list-empty">
              <span className="feedback-list-empty-icon">
                <Icons type="kong" />
              </span>
              <span className="feedback-list-empty-text">
                {ResourceManager.getString('plugin_feedback_empty_tip')}
              </span>
            </div>
          )}
        </div>
        <div className="feedback-list-footer">
          <div
            className="feedback-list-footer-entry"
            onClick={this.navToFeedbackEntry}
          >
            <Icons type="hs_mian_bianji" className="feedback-list-footer-entry-icon" />
            <span className="feedback-list-footer-entry-tip">
              {ResourceManager.getString('plugin_feedback_nav_to_entry')}
            </span>
          </div>
          <div className="feedback-list-footer-pagination">
            <Pagination
              hideOnSinglePage={true}
              simple={true}
              total={total}
              pageSize={feedbackListLimit}
              current={currentPage}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}