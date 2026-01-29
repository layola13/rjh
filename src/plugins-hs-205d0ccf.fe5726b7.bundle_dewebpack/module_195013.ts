import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Scroll } from './Scroll';
import { ThemeContext } from './ThemeContext';
import Pagination, { PaginationProps } from './Pagination';

export { PaginationProps };

interface TeachingViewProps {
  top?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  showPagination?: boolean;
  paginationProps?: PaginationProps;
  className?: string;
  onContentScroll?: (event: Event) => void;
  onContentScrollDown?: () => void;
  onContentScrollUp?: () => void;
}

interface TeachingViewState {
  showToTop: boolean;
  scrollElement?: HTMLElement;
}

const loadingIndicator = React.createElement(LoadingOutlined, {
  style: { fontSize: 24 },
  spin: true
});

class TeachingView extends React.Component<TeachingViewProps, TeachingViewState> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  constructor(props: TeachingViewProps) {
    super(props);
    this.state = {
      showToTop: false
    };
    this.toTop = this.toTop.bind(this);
  }

  toTop(): void {
    const scrollElement = this.state.scrollElement;
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }

  render(): React.ReactElement {
    const {
      top,
      children,
      loading,
      showPagination,
      paginationProps,
      className
    } = this.props;

    const containerClassName = `teaching-view ${className || ''} ${this.context}`;
    const shouldShowPagination = showPagination && 
      (paginationProps?.total || 0) > (paginationProps?.pageSize || 0);

    return React.createElement(
      'div',
      { className: containerClassName },
      React.createElement(
        'div',
        { className: 'teaching-top-wrapper' },
        top
      ),
      React.createElement(
        'div',
        { className: 'teaching-content-wrapper' },
        React.createElement(
          Scroll,
          {
            onScrollY: this.props.onContentScroll,
            onScrollDown: this.props.onContentScrollDown,
            onScrollUp: this.props.onContentScrollUp,
            onYReachStart: () => {
              if (this.state.showToTop) {
                this.setState({ showToTop: false });
              }
            }
          },
          children
        ),
        loading && React.createElement(
          'div',
          { className: 'teaching-loading-wrapper' },
          React.createElement(
            Spin,
            {
              size: 'large',
              indicator: loadingIndicator,
              spinning: loading
            }
          )
        )
      ),
      shouldShowPagination && paginationProps && React.createElement(Pagination, paginationProps)
    );
  }
}

export default TeachingView;