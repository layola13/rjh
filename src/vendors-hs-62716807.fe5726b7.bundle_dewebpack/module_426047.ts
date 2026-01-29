import React, { PureComponent, createRef, RefObject, ReactNode, CSSProperties } from 'react';
import { isValidElement } from 'react';
import classNames from 'classnames';
import Checkbox from './Checkbox';
import Search from './Search';
import Dropdown from './Dropdown';
import DropdownButton from './DropdownButton';
import Menu from './Menu';
import DefaultListBody, { OmitProps } from './DefaultListBody';

interface TransferItem {
  key: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

interface RenderedItem<T = TransferItem> {
  renderedText: ReactNode;
  renderedEl: ReactNode;
  item: T;
}

interface RenderResult {
  value?: ReactNode;
  label?: ReactNode;
}

interface SelectAllLabelParams {
  selectedCount: number;
  totalCount: number;
}

interface ListBodyProps<T = TransferItem> {
  prefixCls: string;
  dataSource: T[];
  filteredItems: T[];
  filteredRenderItems: RenderedItem<T>[];
  selectedKeys: string[];
  disabled?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  notFoundContent?: ReactNode;
  footer?: ReactNode;
  renderList?: (props: ListBodyProps<T>) => ReactNode;
  onItemSelectAll?: (keys: string[], checked: boolean) => void;
  onItemRemove?: (keys: string[]) => void;
  pagination?: boolean;
}

interface TransferListProps<T = TransferItem> {
  prefixCls: string;
  dataSource: T[];
  titleText: string;
  checkedKeys: string[];
  disabled?: boolean;
  footer?: (props: TransferListProps<T>) => ReactNode;
  showSearch: boolean;
  style?: CSSProperties;
  searchPlaceholder?: string;
  notFoundContent?: ReactNode;
  selectAll?: ReactNode;
  selectCurrent?: ReactNode;
  selectInvert?: ReactNode;
  removeAll?: ReactNode;
  removeCurrent?: ReactNode;
  renderList?: (props: ListBodyProps<T>) => ReactNode;
  render?: (item: T) => RenderResult | ReactNode;
  onItemSelectAll?: (keys: string[], checked: boolean) => void;
  onItemRemove?: (keys: string[]) => void;
  showSelectAll?: boolean;
  showRemove?: boolean;
  pagination?: boolean;
  filterOption?: (filterValue: string, item: T) => boolean;
  handleFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  itemsUnit?: string;
  itemUnit?: string;
  selectAllLabel?: string | ((params: SelectAllLabelParams) => ReactNode);
}

interface TransferListState {
  filterValue: string;
}

type CheckStatus = 'all' | 'part' | 'none';

const defaultRenderFunction = (): null => null;

function getEnabledItemKeys<T extends TransferItem>(items: T[]): string[] {
  return items
    .filter((item) => !item.disabled)
    .map((item) => item.key);
}

function omitProps<T extends Record<string, unknown>>(
  obj: T,
  keysToOmit: string[]
): Partial<T> {
  const result = { ...obj };
  keysToOmit.forEach((key) => {
    delete result[key];
  });
  return result;
}

function isRenderResultObject(value: unknown): value is RenderResult {
  return (
    value != null &&
    !isValidElement(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export default class TransferList<T extends TransferItem = TransferItem> extends PureComponent<
  TransferListProps<T>,
  TransferListState
> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
  };

  private defaultListBodyRef: RefObject<DefaultListBody<T>> = createRef();
  private triggerScrollTimer?: ReturnType<typeof setTimeout>;

  constructor(props: TransferListProps<T>) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }

  componentWillUnmount(): void {
    if (this.triggerScrollTimer) {
      clearTimeout(this.triggerScrollTimer);
    }
  }

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { handleFilter } = this.props;
    const value = e.target.value;
    this.setState({ filterValue: value });
    handleFilter?.(e);
  };

  handleClear = (): void => {
    const { handleClear } = this.props;
    this.setState({ filterValue: '' });
    handleClear?.();
  };

  matchFilter = (text: string, item: T): boolean => {
    const { filterValue } = this.state;
    const { filterOption } = this.props;
    return filterOption ? filterOption(filterValue, item) : text.indexOf(filterValue) >= 0;
  };

  getCheckStatus(items: T[]): CheckStatus {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    }
    const allChecked = items.every(
      (item) => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled
    );
    return allChecked ? 'all' : 'part';
  }

  getFilteredItems(
    items: T[],
    filterValue: string
  ): {
    filteredItems: T[];
    filteredRenderItems: RenderedItem<T>[];
  } {
    const filteredItems: T[] = [];
    const filteredRenderItems: RenderedItem<T>[] = [];

    items.forEach((item) => {
      const rendered = this.renderItem(item);
      const { renderedText } = rendered;
      
      if (filterValue && !this.matchFilter(String(renderedText), item)) {
        return;
      }
      
      filteredItems.push(item);
      filteredRenderItems.push(rendered);
    });

    return { filteredItems, filteredRenderItems };
  }

  renderListBody = (
    customRender: ((props: ListBodyProps<T>) => ReactNode) | undefined,
    props: ListBodyProps<T>
  ): { customize: boolean; bodyContent: ReactNode } => {
    const content = customRender ? customRender(props) : null;
    const isCustomized = !!content;
    
    return {
      customize: isCustomized,
      bodyContent: isCustomized ? content : <DefaultListBody ref={this.defaultListBodyRef} {...props} />,
    };
  };

  renderItem = (item: T): RenderedItem<T> => {
    const { render = defaultRenderFunction } = this.props;
    const renderResult = render(item);
    const isObject = isRenderResultObject(renderResult);

    return {
      renderedText: isObject ? renderResult.value : renderResult,
      renderedEl: isObject ? renderResult.label : renderResult,
      item,
    };
  };

  getSelectAllLabel = (selectedCount: number, totalCount: number): ReactNode => {
    const { itemsUnit, itemUnit, selectAllLabel } = this.props;
    
    if (selectAllLabel) {
      return typeof selectAllLabel === 'function'
        ? selectAllLabel({ selectedCount, totalCount })
        : selectAllLabel;
    }

    const unit = totalCount > 1 ? itemsUnit : itemUnit;
    return (
      <>
        {selectedCount > 0 ? `${selectedCount}/` : ''}
        {totalCount} {unit}
      </>
    );
  };

  getListBody(
    prefixCls: string,
    searchPlaceholder: string | undefined,
    filterValue: string,
    filteredItems: T[],
    notFoundContent: ReactNode,
    filteredRenderItems: RenderedItem<T>[],
    selectedKeys: string[],
    renderList: ((props: ListBodyProps<T>) => ReactNode) | undefined,
    showSearch: boolean,
    disabled?: boolean
  ): ReactNode {
    const searchNode = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const bodyProps: ListBodyProps<T> = {
      ...omitProps(this.props, OmitProps),
      filteredItems,
      filteredRenderItems,
      selectedKeys,
    } as ListBodyProps<T>;

    const { customize, bodyContent } = this.renderListBody(renderList, bodyProps);

    let content: ReactNode;
    if (customize) {
      content = <div className={`${prefixCls}-body-customize-wrapper`}>{bodyContent}</div>;
    } else if (filteredItems.length) {
      content = bodyContent;
    } else {
      content = <div className={`${prefixCls}-body-not-found`}>{notFoundContent}</div>;
    }

    return (
      <div
        className={classNames(
          showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`
        )}
      >
        {searchNode}
        {content}
      </div>
    );
  }

  getCheckBox(
    items: T[],
    onItemSelectAll: ((keys: string[], checked: boolean) => void) | undefined,
    showSelectAll: boolean | undefined,
    disabled?: boolean
  ): ReactNode {
    const checkStatus = this.getCheckStatus(items);
    const isAllChecked = checkStatus === 'all';

    if (showSelectAll === false) {
      return null;
    }

    return (
      <Checkbox
        disabled={disabled}
        checked={isAllChecked}
        indeterminate={checkStatus === 'part'}
        onChange={() => {
          const enabledKeys = getEnabledItemKeys(items);
          onItemSelectAll?.(enabledKeys, !isAllChecked);
        }}
      />
    );
  }

  render(): ReactNode {
    const { filterValue } = this.state;
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      disabled,
      footer,
      showSearch,
      style,
      searchPlaceholder,
      notFoundContent,
      selectAll,
      selectCurrent,
      selectInvert,
      removeAll,
      removeCurrent,
      renderList,
      onItemSelectAll,
      onItemRemove,
      showSelectAll,
      showRemove,
      pagination,
    } = this.props;

    const footerContent = footer?.(this.props);
    const listClassName = classNames(prefixCls, {
      [`${prefixCls}-with-pagination`]: pagination,
      [`${prefixCls}-with-footer`]: footerContent,
    });

    const { filteredItems, filteredRenderItems } = this.getFilteredItems(dataSource, filterValue);

    const listBody = this.getListBody(
      prefixCls,
      searchPlaceholder,
      filterValue,
      filteredItems,
      notFoundContent,
      filteredRenderItems,
      checkedKeys,
      renderList,
      showSearch,
      disabled
    );

    const footerNode = footerContent ? (
      <div className={`${prefixCls}-footer`}>{footerContent}</div>
    ) : null;

    const checkboxNode = !showRemove && !pagination 
      ? this.getCheckBox(filteredItems, onItemSelectAll, showSelectAll, disabled)
      : null;

    let dropdownMenu: ReactNode;

    if (showRemove) {
      dropdownMenu = (
        <Menu>
          {pagination && (
            <Menu.Item
              onClick={() => {
                const items = this.defaultListBodyRef.current?.getItems() || [];
                const keys = getEnabledItemKeys(items.map((i) => i.item));
                onItemRemove?.(keys);
              }}
            >
              {removeCurrent}
            </Menu.Item>
          )}
          <Menu.Item
            onClick={() => {
              onItemRemove?.(getEnabledItemKeys(filteredItems));
            }}
          >
            {removeAll}
          </Menu.Item>
        </Menu>
      );
    } else {
      dropdownMenu = (
        <Menu>
          <Menu.Item
            onClick={() => {
              const enabledKeys = getEnabledItemKeys(filteredItems);
              onItemSelectAll?.(enabledKeys, enabledKeys.length !== checkedKeys.length);
            }}
          >
            {selectAll}
          </Menu.Item>
          {pagination && (
            <Menu.Item
              onClick={() => {
                const items = this.defaultListBodyRef.current?.getItems() || [];
                const keys = getEnabledItemKeys(items.map((i) => i.item));
                onItemSelectAll?.(keys, true);
              }}
            >
              {selectCurrent}
            </Menu.Item>
          )}
          <Menu.Item
            onClick={() => {
              const itemsToInvert = pagination
                ? (this.defaultListBodyRef.current?.getItems() || []).map((i) => i.item)
                : filteredItems;
              
              const keysToInvert = getEnabledItemKeys(itemsToInvert);
              const checkedSet = new Set(checkedKeys);
              const toCheck: string[] = [];
              const toUncheck: string[] = [];

              keysToInvert.forEach((key) => {
                if (checkedSet.has(key)) {
                  toUncheck.push(key);
                } else {
                  toCheck.push(key);
                }
              });

              onItemSelectAll?.(toCheck, true);
              onItemSelectAll?.(toUncheck, false);
            }}
          >
            {selectInvert}
          </Menu.Item>
        </Menu>
      );
    }

    const dropdown = (
      <Dropdown
        className={`${prefixCls}-header-dropdown`}
        overlay={dropdownMenu}
        disabled={disabled}
      >
        <DropdownButton />
      </Dropdown>
    );

    return (
      <div className={listClassName} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkboxNode}
          {dropdown}
          <span className={`${prefixCls}-header-selected`}>
            {this.getSelectAllLabel(checkedKeys.length, filteredItems.length)}
          </span>
          <span className={`${prefixCls}-header-title`}>{titleText}</span>
        </div>
        {listBody}
        {footerNode}
      </div>
    );
  }
}