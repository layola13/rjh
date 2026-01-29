import React from 'react';
import classNames from 'classnames';
import Pagination from './Pagination';
import ListItem from './ListItem';

export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;

interface PaginationConfig {
  pageSize: number;
}

interface TransferItem {
  key: string;
  disabled?: boolean;
  [key: string]: unknown;
}

interface RenderedItem {
  renderedEl: React.ReactNode;
  renderedText: string;
  item: TransferItem;
}

interface ListBodyProps {
  prefixCls: string;
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
  filteredRenderItems: RenderedItem[];
  selectedKeys: string[];
  disabled?: boolean;
  showRemove?: boolean;
  pagination?: boolean | PaginationConfig;
  onItemSelect: (key: string, checked: boolean) => void;
  onItemRemove?: (keys: string[]) => void;
}

interface ListBodyState {
  current: number;
}

function normalizePagination(pagination?: boolean | PaginationConfig): PaginationConfig | null {
  if (!pagination) return null;

  const defaultConfig: PaginationConfig = {
    pageSize: 10
  };

  return typeof pagination === 'object' 
    ? { ...defaultConfig, ...pagination } 
    : defaultConfig;
}

class ListBody extends React.Component<ListBodyProps, ListBodyState> {
  state: ListBodyState = {
    current: 1
  };

  static getDerivedStateFromProps(
    props: ListBodyProps, 
    state: ListBodyState
  ): Partial<ListBodyState> | null {
    const { filteredRenderItems, pagination } = props;
    const { current } = state;
    const paginationConfig = normalizePagination(pagination);

    if (paginationConfig) {
      const totalPages = Math.ceil(filteredRenderItems.length / paginationConfig.pageSize);
      if (current > totalPages) {
        return {
          current: totalPages
        };
      }
    }

    return null;
  }

  onItemSelect = (item: TransferItem): void => {
    const { onItemSelect, selectedKeys } = this.props;
    const isChecked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect(item.key, !isChecked);
  };

  onItemRemove = (item: TransferItem): void => {
    const { onItemRemove } = this.props;
    onItemRemove?.([item.key]);
  };

  onPageChange = (page: number): void => {
    this.setState({
      current: page
    });
  };

  getItems = (): RenderedItem[] => {
    const { current } = this.state;
    const { pagination, filteredRenderItems } = this.props;
    const paginationConfig = normalizePagination(pagination);

    let items = filteredRenderItems;

    if (paginationConfig) {
      const startIndex = (current - 1) * paginationConfig.pageSize;
      const endIndex = current * paginationConfig.pageSize;
      items = filteredRenderItems.slice(startIndex, endIndex);
    }

    return items;
  };

  render(): React.ReactNode {
    const { current } = this.state;
    const {
      prefixCls,
      onScroll,
      filteredRenderItems,
      selectedKeys,
      disabled,
      showRemove,
      pagination
    } = this.props;

    const paginationConfig = normalizePagination(pagination);

    let paginationNode: React.ReactNode = null;

    if (paginationConfig) {
      paginationNode = (
        <Pagination
          simple
          size="small"
          disabled={disabled}
          className={`${prefixCls}-pagination`}
          total={filteredRenderItems.length}
          pageSize={paginationConfig.pageSize}
          current={current}
          onChange={this.onPageChange}
        />
      );
    }

    return (
      <>
        <ul
          className={classNames(`${prefixCls}-content`, {
            [`${prefixCls}-content-show-remove`]: showRemove
          })}
          onScroll={onScroll}
        >
          {this.getItems().map((renderedItem) => {
            const { renderedEl, renderedText, item } = renderedItem;
            const isChecked = selectedKeys.indexOf(item.key) >= 0;

            return (
              <ListItem
                disabled={disabled || item.disabled}
                key={item.key}
                item={item}
                renderedText={renderedText}
                renderedEl={renderedEl}
                checked={isChecked}
                prefixCls={prefixCls}
                onClick={this.onItemSelect}
                onRemove={this.onItemRemove}
                showRemove={showRemove}
              />
            );
          })}
        </ul>
        {paginationNode}
      </>
    );
  }
}

export default ListBody;