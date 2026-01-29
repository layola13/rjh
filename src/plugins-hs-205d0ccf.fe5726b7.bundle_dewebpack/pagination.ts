import React from 'react';
import { IconfontView } from './IconfontView';

interface PaginationProps {
  total: number;
  offset: number;
  limit: number;
  jumpToPrevPage: () => void;
  jumpToNextPage: () => void;
  jumpToPage: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface PaginationState {
  total: number;
  offset: number;
  items: Array<number | string>;
}

const DEFAULT_MAX_VISIBLE_PAGES = 5;
const ELLIPSIS = ' ... ';

export class Pagination extends React.Component<PaginationProps, PaginationState> {
  private refs: {
    prevPageBtn?: HTMLElement;
    nextPageBtn?: HTMLElement;
  };

  constructor(props: PaginationProps) {
    super(props);
    
    this.state = {
      total: this.props.total,
      offset: this.props.offset,
      items: []
    };

    this.getTotalPageNum = this.getTotalPageNum.bind(this);
    this.getCurrentPageNum = this.getCurrentPageNum.bind(this);
    this.paging = this.paging.bind(this);
    this.refs = {};
  }

  componentDidMount(): void {
    if (this.refs.prevPageBtn) {
      ResourceManager.injectSVGImage(this.refs.prevPageBtn);
    }
    if (this.refs.nextPageBtn) {
      ResourceManager.injectSVGImage(this.refs.nextPageBtn);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: PaginationProps): void {
    this.setState(
      {
        total: nextProps.total,
        offset: nextProps.offset
      },
      () => {
        const allPages = Array.from(
          { length: this.getTotalPageNum() },
          (_item, index) => index + 1
        );
        this.paging(this.getTotalPageNum(), this.getCurrentPageNum(), allPages);
      }
    );
  }

  getTotalPageNum(): number {
    return Math.ceil(this.state.total / this.props.limit);
  }

  getCurrentPageNum(): number {
    return Math.ceil(this.state.offset / this.props.limit) + 1;
  }

  paging(
    totalPages: number,
    currentPage: number,
    allPages: number[],
    maxVisiblePages: number = DEFAULT_MAX_VISIBLE_PAGES
  ): void {
    let visibleItems: Array<number | string>;

    if (totalPages <= 0) {
      visibleItems = [];
    } else if (totalPages <= maxVisiblePages) {
      visibleItems = allPages;
    } else if (currentPage < 4) {
      visibleItems = Array.from({ length: 4 }, (_item, index) => index + 1);
      visibleItems.push(ELLIPSIS);
      visibleItems = visibleItems.concat(
        Array.from({ length: 1 }, (_item, index) => totalPages + index)
      );
    } else if (currentPage < totalPages - 2) {
      visibleItems = Array.from({ length: 1 }, (_item, index) => index + 1);
      visibleItems.push(ELLIPSIS);
      visibleItems = visibleItems.concat(
        Array.from({ length: 3 }, (_item, index) => currentPage - 1 + index)
      );
      visibleItems.push(ELLIPSIS);
      visibleItems = visibleItems.concat(
        Array.from({ length: 1 }, (_item, index) => totalPages + index)
      );
    } else if (currentPage <= totalPages) {
      visibleItems = Array.from({ length: 1 }, (_item, index) => index + 1);
      visibleItems.push(ELLIPSIS);
      visibleItems = visibleItems.concat(
        Array.from({ length: 4 }, (_item, index) => totalPages - 3 + index)
      );
    } else {
      visibleItems = [];
    }

    this.setState({ items: visibleItems });
  }

  render(): React.ReactNode {
    const totalPages = this.getTotalPageNum();
    const currentPage = this.getCurrentPageNum();

    return (
      <div className="grid-viewer-pagination">
        {!!this.state.total && (
          <div
            className={`prev-button${currentPage === 1 ? ' disable' : ''}`}
            onClick={this.props.jumpToPrevPage}
          >
            <IconfontView
              customStyle={{
                color: 'rgba(255, 255, 255, 0.84)',
                fontSize: '14px'
              }}
              showType="hs_xiao_danjiantou_zuo"
            />
          </div>
        )}

        {this.state.items.map((item, index) => {
          if (item === ELLIPSIS) {
            return (
              <div key={`ellipsis-${index}`} className="ellipsis-icon">
                <IconfontView
                  customStyle={{
                    color: 'rgba(255, 255, 255, 0.84)',
                    fontSize: '14px'
                  }}
                  showType="hs_mian_gengduo"
                />
              </div>
            );
          } else if (item === currentPage) {
            return (
              <div
                key={item}
                className="page-item current"
                onClick={this.props.jumpToPage}
              >
                {item}
              </div>
            );
          } else {
            return (
              <div
                key={item}
                className="page-item"
                onClick={this.props.jumpToPage}
              >
                {item}
              </div>
            );
          }
        })}

        {!!this.state.total && (
          <div
            className={`next-button${currentPage === totalPages ? ' disable' : ''}`}
            onClick={this.props.jumpToNextPage}
          >
            <IconfontView
              customStyle={{
                color: 'rgba(255, 255, 255, 0.84)',
                fontSize: '14px'
              }}
              showType="hs_xiao_danjiantou_you"
            />
          </div>
        )}
      </div>
    );
  }
}