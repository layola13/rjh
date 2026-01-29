import React, { useContext, useState, useMemo, Children } from 'react';
import classNames from 'classnames';
import { Row } from './grid';
import { ConfigContext } from './config-provider';
import { responsiveArray } from './responsiveObserve';
import Spin from './Spin';
import Pagination from './Pagination';
import useBreakpoint from './useBreakpoint';
import ListItem from './ListItem';

export interface ListGridType {
  gutter?: number;
  column?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface PaginationConfig {
  position?: 'top' | 'bottom' | 'both';
  defaultCurrent?: number;
  defaultPageSize?: number;
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

export interface ListLocale {
  emptyText?: React.ReactNode;
}

export interface SpinConfig {
  spinning?: boolean;
}

export interface ListContextValue {
  grid?: ListGridType;
  itemLayout?: 'horizontal' | 'vertical';
}

export const ListContext = React.createContext<ListContextValue>({});

export const ListConsumer = ListContext.Consumer;

export interface ListProps<T = unknown> {
  pagination?: boolean | PaginationConfig;
  prefixCls?: string;
  bordered?: boolean;
  split?: boolean;
  className?: string;
  children?: React.ReactNode;
  itemLayout?: 'horizontal' | 'vertical';
  loadMore?: React.ReactNode;
  grid?: ListGridType;
  dataSource?: T[];
  size?: 'default' | 'large' | 'small';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean | SpinConfig;
  rowKey?: string | ((item: T) => string);
  renderItem?: (item: T, index: number) => React.ReactNode;
  locale?: ListLocale;
}

function List<T = unknown>(props: ListProps<T>): React.ReactElement {
  const {
    pagination = false,
    prefixCls,
    bordered = false,
    split = true,
    className,
    children,
    itemLayout,
    loadMore,
    grid,
    dataSource = [],
    size,
    header,
    footer,
    loading = false,
    rowKey,
    renderItem,
    locale,
    ...restProps
  } = props;

  const paginationConfig: PaginationConfig = pagination && typeof pagination === 'object' ? pagination : {};

  const [currentPage, setCurrentPage] = useState<number>(paginationConfig.defaultCurrent || 1);
  const [pageSize, setPageSize] = useState<number>(paginationConfig.defaultPageSize || 10);

  const { getPrefixCls, renderEmpty, direction } = useContext(ConfigContext);

  const keyMap: Record<number, string> = {};

  const createPaginationHandler = (eventName: 'onChange' | 'onShowSizeChange') => {
    return (page: number, size: number): void => {
      setCurrentPage(page);
      setPageSize(size);
      if (pagination && typeof pagination === 'object' && pagination[eventName]) {
        pagination[eventName]!(page, size);
      }
    };
  };

  const handleChange = createPaginationHandler('onChange');
  const handleShowSizeChange = createPaginationHandler('onShowSizeChange');

  const listPrefixCls = getPrefixCls('list', prefixCls);

  let spinConfig: SpinConfig = loading as SpinConfig;
  if (typeof loading === 'boolean') {
    spinConfig = { spinning: loading };
  }

  const isLoading = spinConfig?.spinning;

  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
  }

  const listClassName = classNames(
    listPrefixCls,
    {
      [`${listPrefixCls}-vertical`]: itemLayout === 'vertical',
      [`${listPrefixCls}-${sizeCls}`]: sizeCls,
      [`${listPrefixCls}-split`]: split,
      [`${listPrefixCls}-bordered`]: bordered,
      [`${listPrefixCls}-loading`]: isLoading,
      [`${listPrefixCls}-grid`]: grid,
      [`${listPrefixCls}-something-after-last-item`]: !!(loadMore || pagination || footer),
      [`${listPrefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const mergedPaginationConfig: PaginationConfig = {
    current: 1,
    total: 0,
    ...{
      total: dataSource.length,
      current: currentPage,
      pageSize: pageSize,
    },
    ...(typeof pagination === 'object' ? pagination : {}),
  };

  const totalPages = Math.ceil(mergedPaginationConfig.total! / mergedPaginationConfig.pageSize!);
  if (mergedPaginationConfig.current! > totalPages) {
    mergedPaginationConfig.current = totalPages;
  }

  const paginationElement = pagination ? (
    <div className={`${listPrefixCls}-pagination`}>
      <Pagination
        {...mergedPaginationConfig}
        onChange={handleChange}
        onShowSizeChange={handleShowSizeChange}
      />
    </div>
  ) : null;

  let displayData = [...dataSource];
  if (pagination && dataSource.length > (mergedPaginationConfig.current! - 1) * mergedPaginationConfig.pageSize!) {
    displayData = [...dataSource].splice(
      (mergedPaginationConfig.current! - 1) * mergedPaginationConfig.pageSize!,
      mergedPaginationConfig.pageSize
    );
  }

  const breakpoint = useBreakpoint();

  const currentBreakpoint = useMemo(() => {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpointName = responsiveArray[i];
      if (breakpoint[breakpointName]) {
        return breakpointName;
      }
    }
    return undefined;
  }, [breakpoint]);

  const gridStyle = useMemo(() => {
    if (grid) {
      const columnCount = currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;
      if (columnCount) {
        return {
          width: `${100 / columnCount}%`,
          maxWidth: `${100 / columnCount}%`,
        };
      }
    }
    return undefined;
  }, [grid?.column, currentBreakpoint]);

  let childrenContent: React.ReactNode = isLoading && (
    <div style={{ minHeight: 53 }} />
  );

  const renderItemWithKey = (item: T, index: number): React.ReactNode => {
    if (!renderItem) {
      return null;
    }

    let key: string;
    if (typeof rowKey === 'function') {
      key = rowKey(item);
    } else if (typeof rowKey === 'string') {
      key = (item as Record<string, unknown>)[rowKey] as string;
    } else {
      key = (item as { key?: string }).key ?? `list-item-${index}`;
    }

    keyMap[index] = key;
    return renderItem(item, index);
  };

  if (displayData.length > 0) {
    const items = displayData.map((item, index) => renderItemWithKey(item, index));

    if (grid) {
      const gridChildren = Children.map(items, (element, index) => (
        <div key={keyMap[index]} style={gridStyle}>
          {element}
        </div>
      ));
      childrenContent = <Row gutter={grid.gutter}>{gridChildren}</Row>;
    } else {
      childrenContent = <ul className={`${listPrefixCls}-items`}>{items}</ul>;
    }
  } else if (!children && !isLoading) {
    const renderEmptyText = (componentName: string): React.ReactNode => {
      return (
        <div className={`${listPrefixCls}-empty-text`}>
          {locale?.emptyText || renderEmpty(componentName)}
        </div>
      );
    };
    childrenContent = renderEmptyText('List');
  }

  const paginationPosition = mergedPaginationConfig.position || 'bottom';

  return (
    <ListContext.Provider value={{ grid, itemLayout }}>
      <div className={listClassName} {...restProps}>
        {(paginationPosition === 'top' || paginationPosition === 'both') && paginationElement}
        {header && <div className={`${listPrefixCls}-header`}>{header}</div>}
        <Spin {...spinConfig}>
          {childrenContent}
          {children}
        </Spin>
        {footer && <div className={`${listPrefixCls}-footer`}>{footer}</div>}
        {loadMore || ((paginationPosition === 'bottom' || paginationPosition === 'both') && paginationElement)}
      </div>
    </ListContext.Provider>
  );
}

const ListWithItem = List as typeof List & {
  Item: typeof ListItem;
};

ListWithItem.Item = ListItem;

export default ListWithItem;