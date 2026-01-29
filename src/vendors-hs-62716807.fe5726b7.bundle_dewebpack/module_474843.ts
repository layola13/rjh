import React, { Component, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import List from './List';
import Operation from './Operation';
import Search from './Search';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';

type TransferDirection = 'left' | 'right';

interface TransferItem {
  key: string;
  disabled?: boolean;
  [key: string]: unknown;
}

interface TransferLocale {
  titles?: [string, string];
  notFoundContent?: ReactNode;
  searchPlaceholder?: string;
  itemUnit?: string;
  itemsUnit?: string;
}

interface TransferProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  dataSource: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  render?: (item: TransferItem) => ReactNode;
  onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  onSearch?: (direction: TransferDirection, value: string) => void;
  onScroll?: (direction: TransferDirection, event: React.UIEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  listStyle?: CSSProperties | ((args: { direction: TransferDirection }) => CSSProperties);
  operationStyle?: CSSProperties;
  titles?: [ReactNode, ReactNode];
  operations?: [string, string];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  locale?: Partial<TransferLocale>;
  footer?: (props: unknown) => ReactNode;
  rowKey?: (record: TransferItem) => string;
  children?: (props: unknown) => ReactNode;
  showSelectAll?: boolean;
  selectAllLabels?: [ReactNode, ReactNode];
  oneWay?: boolean;
  pagination?: unknown;
}

interface TransferState {
  sourceSelectedKeys: string[];
  targetSelectedKeys: string[];
}

interface SeparatedDataSource {
  leftDataSource: TransferItem[];
  rightDataSource: TransferItem[];
}

class Transfer extends Component<TransferProps, TransferState> {
  static List = List;
  static Operation = Operation;
  static Search = Search;

  static defaultProps = {
    dataSource: [],
    locale: {},
    showSearch: false,
    listStyle: () => {},
  };

  static getDerivedStateFromProps(props: TransferProps): Partial<TransferState> | null {
    const { selectedKeys, targetKeys, pagination, children } = props;

    if (selectedKeys) {
      const target = targetKeys || [];
      return {
        sourceSelectedKeys: selectedKeys.filter((key) => !target.includes(key)),
        targetSelectedKeys: selectedKeys.filter((key) => target.includes(key)),
      };
    }

    if (pagination && children) {
      console.warn('Transfer', '`pagination` not support customize render list.');
    }

    return null;
  }

  separatedDataSource: SeparatedDataSource | null = null;

  constructor(props: TransferProps) {
    super(props);

    const { selectedKeys = [], targetKeys = [] } = props;

    this.state = {
      sourceSelectedKeys: selectedKeys.filter((key) => targetKeys.indexOf(key) === -1),
      targetSelectedKeys: selectedKeys.filter((key) => targetKeys.indexOf(key) > -1),
    };
  }

  getTitles(locale: TransferLocale): [string, string] {
    const { titles } = this.props;
    return titles || locale.titles || ['', ''];
  }

  getLocale = (transferLocale: TransferLocale, renderEmpty: (name: string) => ReactNode): TransferLocale => {
    return {
      ...transferLocale,
      notFoundContent: renderEmpty('Transfer'),
      ...this.props.locale,
    };
  };

  setStateKeys = (direction: TransferDirection, keys: string[] | ((prevKeys: string[]) => string[])): void => {
    if (direction === 'left') {
      this.setState((prevState) => ({
        sourceSelectedKeys: typeof keys === 'function' ? keys(prevState.sourceSelectedKeys || []) : keys,
      }));
    } else {
      this.setState((prevState) => ({
        targetSelectedKeys: typeof keys === 'function' ? keys(prevState.targetSelectedKeys || []) : keys,
      }));
    }
  };

  handleSelectChange(direction: TransferDirection, selectedKeys: string[]): void {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const { onSelectChange } = this.props;

    if (onSelectChange) {
      if (direction === 'left') {
        onSelectChange(selectedKeys, targetSelectedKeys);
      } else {
        onSelectChange(sourceSelectedKeys, selectedKeys);
      }
    }
  }

  moveTo = (direction: TransferDirection): void => {
    const { targetKeys = [], dataSource = [], onChange } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;

    const selectedKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;

    const moveKeys = selectedKeys.filter((key) =>
      !dataSource.some((item) => key === item.key && item.disabled)
    );

    const newTargetKeys =
      direction === 'right'
        ? moveKeys.concat(targetKeys)
        : targetKeys.filter((key) => moveKeys.indexOf(key) === -1);

    const oppositeDirection: TransferDirection = direction === 'right' ? 'left' : 'right';

    this.setStateKeys(oppositeDirection, []);
    this.handleSelectChange(oppositeDirection, []);

    if (onChange) {
      onChange(newTargetKeys, direction, moveKeys);
    }
  };

  moveToLeft = (): void => {
    this.moveTo('left');
  };

  moveToRight = (): void => {
    this.moveTo('right');
  };

  onItemSelectAll = (direction: TransferDirection, selectedKeys: string[], checked: boolean): void => {
    this.setStateKeys(direction, (prevKeys) => {
      let newKeys: string[];

      if (checked) {
        newKeys = Array.from(new Set([...prevKeys, ...selectedKeys]));
      } else {
        newKeys = prevKeys.filter((key) => selectedKeys.indexOf(key) === -1);
      }

      this.handleSelectChange(direction, newKeys);
      return newKeys;
    });
  };

  onLeftItemSelectAll = (selectedKeys: string[], checked: boolean): void => {
    this.onItemSelectAll('left', selectedKeys, checked);
  };

  onRightItemSelectAll = (selectedKeys: string[], checked: boolean): void => {
    this.onItemSelectAll('right', selectedKeys, checked);
  };

  handleFilter = (direction: TransferDirection, event: React.ChangeEvent<HTMLInputElement>): void => {
    const { onSearch } = this.props;
    const value = event.target.value;

    if (onSearch) {
      onSearch(direction, value);
    }
  };

  handleLeftFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.handleFilter('left', event);
  };

  handleRightFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.handleFilter('right', event);
  };

  handleClear = (direction: TransferDirection): void => {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch(direction, '');
    }
  };

  handleLeftClear = (): void => {
    this.handleClear('left');
  };

  handleRightClear = (): void => {
    this.handleClear('right');
  };

  onItemSelect = (direction: TransferDirection, selectedKey: string, checked: boolean): void => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const selectedKeys = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
    const keyIndex = selectedKeys.indexOf(selectedKey);

    if (keyIndex > -1) {
      selectedKeys.splice(keyIndex, 1);
    }

    if (checked) {
      selectedKeys.push(selectedKey);
    }

    this.handleSelectChange(direction, selectedKeys);

    if (!this.props.selectedKeys) {
      this.setStateKeys(direction, selectedKeys);
    }
  };

  onLeftItemSelect = (selectedKey: string, checked: boolean): void => {
    this.onItemSelect('left', selectedKey, checked);
  };

  onRightItemSelect = (selectedKey: string, checked: boolean): void => {
    this.onItemSelect('right', selectedKey, checked);
  };

  onRightItemRemove = (removeKeys: string[]): void => {
    const { targetKeys = [], onChange } = this.props;

    this.setStateKeys('right', []);

    if (onChange) {
      onChange(
        targetKeys.filter((key) => !removeKeys.includes(key)),
        'left',
        [...removeKeys]
      );
    }
  };

  handleScroll = (direction: TransferDirection, event: React.UIEvent<HTMLDivElement>): void => {
    const { onScroll } = this.props;

    if (onScroll) {
      onScroll(direction, event);
    }
  };

  handleLeftScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    this.handleScroll('left', event);
  };

  handleRightScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    this.handleScroll('right', event);
  };

  handleListStyle = (
    listStyle: CSSProperties | ((args: { direction: TransferDirection }) => CSSProperties) | undefined,
    direction: TransferDirection
  ): CSSProperties | undefined => {
    return typeof listStyle === 'function' ? listStyle({ direction }) : listStyle;
  };

  separateDataSource(): SeparatedDataSource {
    const { dataSource = [], rowKey, targetKeys = [] } = this.props;
    const leftDataSource: TransferItem[] = [];
    const rightDataSource: TransferItem[] = new Array(targetKeys.length);

    dataSource.forEach((item) => {
      let record = item;

      if (rowKey) {
        record = { ...item, key: rowKey(item) };
      }

      const targetIndex = targetKeys.indexOf(record.key);

      if (targetIndex !== -1) {
        rightDataSource[targetIndex] = record;
      } else {
        leftDataSource.push(record);
      }
    });

    return {
      leftDataSource,
      rightDataSource,
    };
  }

  renderTransfer = (locale: TransferLocale): ReactNode => {
    return (
      <ConfigConsumer>
        {(config: ConfigConsumerProps) => {
          const { getPrefixCls, renderEmpty, direction } = config;
          const {
            prefixCls: customizePrefixCls,
            className,
            disabled,
            operations = [],
            showSearch,
            footer,
            style,
            listStyle,
            operationStyle,
            filterOption,
            render,
            children,
            showSelectAll,
            oneWay,
            pagination,
          } = this.props;

          const prefixCls = getPrefixCls('transfer', customizePrefixCls);
          const transferLocale = this.getLocale(locale, renderEmpty!);
          const { sourceSelectedKeys, targetSelectedKeys } = this.state;

          const mergedPagination = !children && pagination;
          const { leftDataSource, rightDataSource } = this.separateDataSource();

          const leftActive = sourceSelectedKeys.length > 0;
          const rightActive = targetSelectedKeys.length > 0;

          const classString = classNames(
            prefixCls,
            {
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-customize-list`]: !!children,
              [`${prefixCls}-rtl`]: direction === 'rtl',
            },
            className
          );

          const titles = this.getTitles(transferLocale);
          const selectAllLabels = this.props.selectAllLabels || [];

          return (
            <div className={classString} style={style}>
              <List
                prefixCls={`${prefixCls}-list`}
                titleText={titles[0]}
                dataSource={leftDataSource}
                filterOption={filterOption}
                style={this.handleListStyle(listStyle, 'left')}
                checkedKeys={sourceSelectedKeys}
                handleFilter={this.handleLeftFilter}
                handleClear={this.handleLeftClear}
                onItemSelect={this.onLeftItemSelect}
                onItemSelectAll={this.onLeftItemSelectAll}
                render={render}
                showSearch={showSearch}
                renderList={children}
                footer={footer}
                onScroll={this.handleLeftScroll}
                disabled={disabled}
                direction="left"
                showSelectAll={showSelectAll}
                selectAllLabel={selectAllLabels[0]}
                pagination={mergedPagination}
                {...transferLocale}
              />
              <Operation
                className={`${prefixCls}-operation`}
                rightActive={leftActive}
                rightArrowText={operations[0]}
                moveToRight={this.moveToRight}
                leftActive={rightActive}
                leftArrowText={operations[1]}
                moveToLeft={this.moveToLeft}
                style={operationStyle}
                disabled={disabled}
                direction={direction}
                oneWay={oneWay}
              />
              <List
                prefixCls={`${prefixCls}-list`}
                titleText={titles[1]}
                dataSource={rightDataSource}
                filterOption={filterOption}
                style={this.handleListStyle(listStyle, 'right')}
                checkedKeys={targetSelectedKeys}
                handleFilter={this.handleRightFilter}
                handleClear={this.handleRightClear}
                onItemSelect={this.onRightItemSelect}
                onItemSelectAll={this.onRightItemSelectAll}
                onItemRemove={this.onRightItemRemove}
                render={render}
                showSearch={showSearch}
                renderList={children}
                footer={footer}
                onScroll={this.handleRightScroll}
                disabled={disabled}
                direction="right"
                showSelectAll={showSelectAll}
                selectAllLabel={selectAllLabels[1]}
                showRemove={oneWay}
                pagination={mergedPagination}
                {...transferLocale}
              />
            </div>
          );
        }}
      </ConfigConsumer>
    );
  };

  render(): ReactNode {
    return (
      <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
        {this.renderTransfer}
      </LocaleReceiver>
    );
  }
}

export default Transfer;