import React from 'react';
import { Icons } from './icon-utils';

interface PaginationProps {
  total: number;
  offset: number;
  limit: number;
  hide?: boolean;
  jumpToPrevPage: () => void;
  jumpToNextPage: () => void;
  jumpToPage: (pageNum: number) => void;
}

interface PaginationState {
  total: number;
  offset: number;
  items: Array<number | string>;
}

type PageItem = number | string;

const MAX_VISIBLE_PAGES = 5;
const ELLIPSIS = ' ... ';

export default class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);
    
    this.state = {
      total: props.total,
      offset: props.offset,
      items: []
    };
    
    this.getTotalPageNum = this.getTotalPageNum.bind(this);
    this.getCurrentPageNum = this.getCurrentPageNum.bind(this);
    this.paging = this.paging.bind(this);
  }

  componentDidMount(): void {
    const prevPageBtn = this.refs.prevPageBtn as HTMLElement;
    const nextPageBtn = this.refs.nextPageBtn as HTMLElement;
    
    ResourceManager.injectSVGImage(prevPageBtn);
    ResourceManager.injectSVGImage(nextPageBtn);
  }

  UNSAFE_componentWillReceiveProps(nextProps: PaginationProps): void {
    this.setState({
      total: nextProps.total,
      offset: nextProps.offset
    }, () => {
      const allPages = Array.from(
        { length: this.getTotalPageNum() },
        (_, index) => index + 1
      );
      this.paging(this.getTotalPageNum(), this.getCurrentPageNum(), allPages);
    });
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
    maxVisible: number = MAX_VISIBLE_PAGES
  ): void {
    let items: PageItem[];

    if (totalPages <= 1) {
      items = [];
    } else if (totalPages <= maxVisible) {
      items = allPages;
    } else if (currentPage < 4) {
      items = Array.from({ length: 4 }, (_, index) => index + 1);
      items.push(ELLIPSIS);
      items = items.concat(Array.from({ length: 1 }, (_, index) => totalPages + index));
    } else if (currentPage < totalPages - 2) {
      items = Array.from({ length: 1 }, (_, index) => index + 1);
      items.push(ELLIPSIS);
      items = items.concat(Array.from({ length: 3 }, (_, index) => currentPage - 1 + index));
      items.push(ELLIPSIS);
      items = items.concat(Array.from({ length: 1 }, (_, index) => totalPages + index));
    } else {
      items = Array.from({ length: 1 }, (_, index) => index + 1);
      items.push(ELLIPSIS);
      items = items.concat(Array.from({ length: 4 }, (_, index) => totalPages - 3 + index));
    }

    this.setState({ items });
  }

  render(): React.ReactElement {
    const totalPages = this.getTotalPageNum();
    const currentPage = this.getCurrentPageNum();
    const hideClass = totalPages <= 1 || this.props.hide ? 'hide' : '';

    return (
      <div className={`opendesign-pagination ${hideClass}`}>
        <div
          className={`prev-button${currentPage === 1 ? ' disable' : ''}`}
          onClick={this.props.jumpToPrevPage}
        >
          <Icons type="hs_xiao_danjiantou_zuo" />
        </div>
        
        {this.state.items.map((item) => {
          if (item === ELLIPSIS) {
            return (
              <div className="ellipsis-icon">
                <Icons type="hs_mian_gengduo" />
              </div>
            );
          }
          
          if (item === currentPage) {
            return (
              <div className="page-item current" onClick={this.props.jumpToPage}>
                {item}
              </div>
            );
          }
          
          return (
            <div className="page-item" onClick={this.props.jumpToPage}>
              {item}
            </div>
          );
        })}
        
        <div
          className={`next-button${currentPage === totalPages ? ' disable' : ''}`}
          onClick={this.props.jumpToNextPage}
        >
          <Icons type="hs_xiao_danjiantou_you" />
        </div>
      </div>
    );
  }
}