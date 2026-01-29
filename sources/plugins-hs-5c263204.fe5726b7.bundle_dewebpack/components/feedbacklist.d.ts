/**
 * Feedback list component for displaying and managing user feedback entries.
 * Supports pagination, reply viewing, and navigation to feedback entry form.
 */

import React from 'react';
import { FeedbackListRowContent } from './FeedbackListRowContent';
import { FeedbackListRow } from './FeedbackListRow';
import { Icons } from './Icons';
import { Pagination } from './Pagination';
import { feedbackStateMap, feedbackListLimit } from './constants';
import { getTime } from './utils';
import { ThemeContext } from './ThemeContext';
import StatisticsComponent from './StatisticsComponent';

/**
 * Feedback type enum values
 */
type FeedbackType = string[];

/**
 * Feedback state values mapped to resource strings
 */
type FeedbackState = keyof typeof feedbackStateMap;

/**
 * Individual feedback item data structure
 */
interface FeedbackItem {
  /** Unique identifier for the feedback */
  id: string | number;
  /** Internal ID field (uppercase) */
  ID: string | number;
  /** Feedback categories/types */
  type: FeedbackType;
  /** Main feedback content text */
  content: string;
  /** Timestamp when feedback was created */
  createTime: number;
  /** Current state of the feedback */
  state: FeedbackState;
  /** Whether the feedback has unread replies */
  hasUnreadReply: boolean;
  /** Whether the row is currently expanded to show replies */
  extended?: boolean;
  /** Reply content (loaded when extended) */
  reply?: string;
  /** URL or path to reply image */
  replyImage?: string;
}

/**
 * Column configuration for table display
 */
interface ColumnConfig<T = FeedbackItem> {
  /** Column header title */
  title: string;
  /** Unique key for the column */
  key: string;
  /** Primary data field to display */
  dataIndex: keyof T | string;
  /** Additional data fields to pass to render function */
  extraIndex?: (keyof T | string)[];
  /** Column width (CSS value) */
  width?: string;
  /** Custom render function for cell content */
  render?: (value: any, extraValues?: any[]) => React.ReactNode;
}

/**
 * Statistics data structure for feedback overview
 */
interface FeedbackStatistics {
  /** Total number of feedback items */
  total: number;
  /** Number of pending feedback items */
  pending?: number;
  /** Number of resolved feedback items */
  resolved?: number;
  [key: string]: any;
}

/**
 * Reply data structure returned from API
 */
interface FeedbackReply {
  /** Reply content text */
  reply: string;
  /** Additional reply metadata */
  [key: string]: any;
}

/**
 * Component props interface
 */
interface FeedbackListProps {
  /** Array of feedback items to display */
  dataSource: FeedbackItem[];
  /** Total count of all feedback items (for pagination) */
  total: number;
  /** Statistics summary data */
  statistics?: FeedbackStatistics;
  /** Callback when user clicks to view/hide replies */
  onReadReply?: (feedbackId: string | number) => Promise<FeedbackReply>;
  /** Callback when user navigates to feedback entry form */
  onNavToFeedbackEntry?: () => void;
  /** Callback to fetch feedback list for a specific page */
  onGetFeedbackList?: (page: number) => Promise<FeedbackListState>;
  /** Callback when user clicks to view image carousel */
  onShowCarousel?: (imageUrl: string) => void;
}

/**
 * Component state interface
 */
interface FeedbackListState {
  /** Current page's feedback data */
  dataSource: FeedbackItem[];
  /** Total count of all feedback items */
  total: number;
  /** Current active page number (1-indexed) */
  currentPage: number;
}

/**
 * FeedbackList component displays a paginated table of user feedback items
 * with expandable rows for viewing replies and actions.
 */
export class FeedbackList extends React.Component<FeedbackListProps, FeedbackListState> {
  /** Theme context for styling */
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  /** Column configurations for the feedback table */
  private columns: ColumnConfig[];

  constructor(props: FeedbackListProps) {
    super(props);

    this.columns = [
      {
        title: ResourceManager.getString('plugin_feedback_issuetype'),
        key: 'type',
        dataIndex: 'type',
        width: '17%',
        render: (types: FeedbackType): string => types.join(', ')
      },
      {
        title: ResourceManager.getString('plugin_feedback_describe'),
        key: 'content',
        dataIndex: 'content',
        extraIndex: ['id', 'replyImage', 'extended'],
        width: '31%',
        render: (content: string, extraValues?: any[]): React.ReactNode => {
          const [id, replyImage, extended] = extraValues ?? [];
          return React.createElement(FeedbackListRowContent, {
            text: content,
            showImageIcon: !!replyImage,
            extended: extended,
            onExtend: () => this.extendRow(id)
          });
        }
      },
      {
        title: ResourceManager.getString('plugin_feedback_submit_time'),
        key: 'createTime',
        dataIndex: 'createTime',
        width: '10%',
        render: (timestamp: number): React.ReactNode => {
          return React.createElement('span', null, getTime(timestamp, false));
        }
      },
      {
        title: ResourceManager.getString('plugin_feedback_status'),
        key: 'state',
        dataIndex: 'state',
        width: '14%',
        render: (state: FeedbackState): React.ReactNode => {
          return React.createElement('span', null, ResourceManager.getString(feedbackStateMap[state]));
        }
      },
      {
        title: ResourceManager.getString('plugin_feedback_action'),
        dataIndex: 'hasUnreadReply',
        extraIndex: ['id', 'extended'],
        key: 'action',
        render: (hasUnreadReply: boolean, extraValues?: any[]): React.ReactNode => {
          const [id, extended] = extraValues ?? [];
          return React.createElement(
            'span',
            {
              className: 'feedback-list-row-show-reply',
              onClick: () => this.extendRow(id)
            },
            React.createElement(
              'span',
              { className: 'feedback-list-row-show-reply-text' },
              extended
                ? ResourceManager.getString('plugin_feedback_hide_reply')
                : ResourceManager.getString('plugin_feedback_view_reply')
            ),
            hasUnreadReply &&
              React.createElement('span', { className: 'feedback-list-row-show-reply-dot' })
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

  /**
   * Toggles the expanded state of a feedback row to show/hide replies.
   * Marks unread replies as read when expanding.
   * @param feedbackId - The ID of the feedback item to expand/collapse
   */
  private extendRow(feedbackId: string | number): void {
    const dataSource = [...this.state.dataSource];
    const targetItem = dataSource.find(item => item.id === feedbackId);

    if (!targetItem) return;

    this.props.onReadReply?.(feedbackId)
      .then((response: FeedbackReply) => {
        if (targetItem.hasUnreadReply) {
          targetItem.hasUnreadReply = false;
        }
        targetItem.extended = !targetItem.extended;
        targetItem.reply = response.reply;

        this.setState({ dataSource });
      })
      .catch(() => {
        // Silent error handling - could add error notification here
      });
  }

  /**
   * Navigates to the feedback entry form page
   */
  private navToFeedbackEntry(): void {
    this.props.onNavToFeedbackEntry?.();
  }

  /**
   * Handles pagination page change events.
   * Fetches new data for the selected page.
   * @param page - The target page number (1-indexed)
   */
  private handlePageChange(page: number): void {
    const { onGetFeedbackList } = this.props;

    this.setState({ currentPage: page });

    onGetFeedbackList?.(page)
      .then((newState: FeedbackListState) => {
        this.setState(newState);
      })
      .catch(() => {
        // Silent error handling - could add error notification here
      });
  }

  /**
   * Renders the feedback list component
   */
  render(): React.ReactNode {
    const { total, currentPage, dataSource } = this.state;
    const { onShowCarousel, statistics } = this.props;
    const isEmpty = dataSource.length === 0;

    return React.createElement(
      'div',
      { className: `feedback-list-wrapper ${this.context}` },
      // Statistics summary
      React.createElement(StatisticsComponent, { data: statistics }),
      // Spacer
      React.createElement('div', { style: { width: '100%', height: '12px' } }),
      // Main feedback list container
      React.createElement(
        'div',
        { className: 'feedback-list' },
        // Table content (header + rows)
        !isEmpty &&
          React.createElement(
            React.Fragment,
            null,
            // Table header
            React.createElement(
              'div',
              { className: 'feedback-list-header' },
              this.columns.map((column: ColumnConfig) =>
                React.createElement(
                  'span',
                  {
                    className: 'feedback-list-header-column',
                    style: column.width
                      ? { width: column.width, flexGrow: 0, flexShrink: 0 }
                      : {}
                  },
                  column.title
                )
              )
            ),
            // Table body
            React.createElement(
              'div',
              { className: 'feedback-list-body' },
              dataSource.map((item: FeedbackItem) =>
                React.createElement(FeedbackListRow, {
                  key: item.ID,
                  columns: this.columns,
                  data: item,
                  extended: item.extended,
                  onShowCarousel
                })
              )
            )
          ),
        // Empty state
        isEmpty &&
          React.createElement(
            'div',
            { className: 'feedback-list-empty' },
            React.createElement(
              'span',
              { className: 'feedback-list-empty-icon' },
              React.createElement(Icons, { type: 'kong' })
            ),
            React.createElement(
              'span',
              { className: 'feedback-list-empty-text' },
              ResourceManager.getString('plugin_feedback_empty_tip')
            )
          )
      ),
      // Footer with navigation and pagination
      React.createElement(
        'div',
        { className: 'feedback-list-footer' },
        // Navigate to feedback entry button
        React.createElement(
          'div',
          {
            className: 'feedback-list-footer-entry',
            onClick: this.navToFeedbackEntry
          },
          React.createElement(Icons, {
            type: 'hs_mian_bianji',
            className: 'feedback-list-footer-entry-icon'
          }),
          React.createElement(
            'span',
            { className: 'feedback-list-footer-entry-tip' },
            ResourceManager.getString('plugin_feedback_nav_to_entry')
          )
        ),
        // Pagination control
        React.createElement(
          'div',
          { className: 'feedback-list-footer-pagination' },
          React.createElement(Pagination, {
            hideOnSinglePage: true,
            simple: true,
            total,
            pageSize: feedbackListLimit,
            current: currentPage,
            onChange: this.handlePageChange
          })
        )
      )
    );
  }
}