import React, { Component, MouseEvent, ReactNode } from 'react';

interface FieldNames {
  label?: string;
  value?: string;
  children?: string;
}

interface CascaderOption {
  [key: string]: any;
  label?: string;
  value?: string | number;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  children?: CascaderOption[];
}

type ActiveValue = (string | number)[];

interface CascaderMenusProps {
  prefixCls?: string;
  options?: CascaderOption[];
  value?: ActiveValue;
  activeValue?: ActiveValue;
  visible?: boolean;
  expandTrigger?: 'click' | 'hover';
  expandIcon?: ReactNode;
  loadingIcon?: ReactNode;
  fieldNames?: FieldNames;
  defaultFieldNames?: FieldNames;
  dropdownMenuColumnStyle?: React.CSSProperties;
  onSelect: (option: CascaderOption, menuIndex: number, ...args: any[]) => void;
  onItemDoubleClick: (option: CascaderOption, menuIndex: number, event: MouseEvent) => void;
}

interface MenuItemsMap {
  [key: number]: HTMLLIElement | null;
}

const DEFAULT_DELAY_MS = 150;

function getActiveOptions(
  options: CascaderOption[],
  activeValue: ActiveValue,
  getFieldName: (fieldName: string) => string
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let currentOptions = options;

  for (let i = 0; i < activeValue.length; i++) {
    const targetValue = activeValue[i];
    const targetOption = currentOptions.find(
      (option) => option[getFieldName('value')] === targetValue
    );

    if (!targetOption) {
      break;
    }

    result.push(targetOption);
    const children = targetOption[getFieldName('children')];
    if (children && children.length > 0) {
      currentOptions = children;
    } else {
      break;
    }
  }

  return result;
}

class CascaderMenus extends Component<CascaderMenusProps> {
  static defaultProps: Partial<CascaderMenusProps> = {
    options: [],
    value: [],
    activeValue: [],
    onSelect: () => {},
    prefixCls: 'rc-cascader-menus',
    visible: false,
    expandTrigger: 'click',
  };

  private menuItems: MenuItemsMap = {};
  private delayTimer: number | null = null;

  componentDidMount(): void {
    this.scrollActiveItemToView();
  }

  componentDidUpdate(prevProps: CascaderMenusProps): void {
    if (!prevProps.visible && this.props.visible) {
      this.scrollActiveItemToView();
    }
  }

  private getFieldName = (fieldName: string): string => {
    const { fieldNames = {}, defaultFieldNames = {} } = this.props;
    return fieldNames[fieldName] || defaultFieldNames[fieldName] || fieldName;
  };

  private saveMenuItem = (menuIndex: number) => {
    return (element: HTMLLIElement | null): void => {
      this.menuItems[menuIndex] = element;
    };
  };

  private getOption(option: CascaderOption, menuIndex: number): ReactNode {
    const { prefixCls = 'rc-cascader-menus', expandTrigger, expandIcon, loadingIcon } = this.props;

    const handleSelect = this.props.onSelect.bind(this, option, menuIndex);
    const handleDoubleClick = this.props.onItemDoubleClick.bind(this, option, menuIndex);

    let itemEvents: {
      onClick?: (event: MouseEvent) => void;
      onDoubleClick?: (event: MouseEvent) => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      ref?: (element: HTMLLIElement | null) => void;
    } = {
      onClick: handleSelect,
      onDoubleClick: handleDoubleClick,
    };

    let className = `${prefixCls}-menu-item`;
    let expandIconNode: ReactNode = null;

    const children = option[this.getFieldName('children')];
    const hasChildren = children && children.length > 0;

    if (hasChildren || option.isLeaf === false) {
      className += ` ${prefixCls}-menu-item-expand`;
      if (!option.loading) {
        expandIconNode = (
          <span className={`${prefixCls}-menu-item-expand-icon`}>
            {expandIcon}
          </span>
        );
      }
    }

    if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
      itemEvents = {
        onMouseEnter: this.delayOnSelect.bind(this, handleSelect),
        onMouseLeave: this.delayOnSelect.bind(this, undefined),
        onClick: handleSelect,
      };
    }

    if (this.isActiveOption(option, menuIndex)) {
      className += ` ${prefixCls}-menu-item-active`;
      itemEvents.ref = this.saveMenuItem(menuIndex);
    }

    if (option.disabled) {
      className += ` ${prefixCls}-menu-item-disabled`;
    }

    let loadingIconNode: ReactNode = null;
    if (option.loading) {
      className += ` ${prefixCls}-menu-item-loading`;
      loadingIconNode = loadingIcon || null;
    }

    let title = '';
    if ('title' in option) {
      title = option.title || '';
    } else if (typeof option[this.getFieldName('label')] === 'string') {
      title = option[this.getFieldName('label')];
    }

    return (
      <li
        key={option[this.getFieldName('value')]}
        className={className}
        title={title}
        role="menuitem"
        onMouseDown={(event) => event.preventDefault()}
        {...itemEvents}
      >
        {option[this.getFieldName('label')]}
        {expandIconNode}
        {loadingIconNode}
      </li>
    );
  }

  private getActiveOptions(activeValue?: ActiveValue): CascaderOption[] {
    const { options = [] } = this.props;
    const targetActiveValue = activeValue || this.props.activeValue || [];
    return getActiveOptions(options, targetActiveValue, this.getFieldName);
  }

  private getShowOptions(): CascaderOption[][] {
    const { options = [] } = this.props;
    const activeOptions = this.getActiveOptions();

    const childrenOptions = activeOptions
      .map((option) => option[this.getFieldName('children')])
      .filter((children) => !!children && children.length > 0) as CascaderOption[][];

    return [options, ...childrenOptions];
  }

  private delayOnSelect(callback?: (...args: any[]) => void, ...args: any[]): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }

    if (typeof callback === 'function') {
      this.delayTimer = window.setTimeout(() => {
        callback(...args);
        this.delayTimer = null;
      }, DEFAULT_DELAY_MS);
    }
  }

  private scrollActiveItemToView(): void {
    const showOptions = this.getShowOptions();
    const menuCount = showOptions.length;

    for (let i = 0; i < menuCount; i++) {
      const menuItem = this.menuItems[i];
      if (menuItem?.parentElement) {
        menuItem.parentElement.scrollTop = menuItem.offsetTop;
      }
    }
  }

  private isActiveOption(option: CascaderOption, menuIndex: number): boolean {
    const { activeValue = [] } = this.props;
    return activeValue[menuIndex] === option[this.getFieldName('value')];
  }

  render(): ReactNode {
    const { prefixCls = 'rc-cascader-menus', dropdownMenuColumnStyle } = this.props;

    return (
      <div>
        {this.getShowOptions().map((columnOptions, columnIndex) => (
          <ul
            className={`${prefixCls}-menu`}
            key={columnIndex}
            style={dropdownMenuColumnStyle}
          >
            {columnOptions.map((option) => this.getOption(option, columnIndex))}
          </ul>
        ))}
      </div>
    );
  }
}

export default CascaderMenus;