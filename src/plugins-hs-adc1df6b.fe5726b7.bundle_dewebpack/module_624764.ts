import React, { Component, ReactNode } from 'react';
import { Collapse, Switch } from 'antd';
import { SmartText } from './SmartText';
import { Icons } from './Icons';
import { createComponentByType } from './ComponentFactory';

interface ResetItem {
  text?: string;
  onResetClick: () => void;
}

interface PropertyItem {
  type: string;
  [key: string]: unknown;
}

interface Level2Item {
  label: string;
  id: string;
  items: PropertyItem[];
  status?: boolean;
  onStatusChange?: (status: boolean) => void;
  onDelete?: () => void;
  resetItem?: ResetItem;
  customizedTitleContent?: ReactNode;
  disableShow?: boolean;
}

interface PropertyBarLevel2Props {
  item: Level2Item;
  floatItems?: PropertyItem[];
}

interface PropertyBarLevel2State {
  status: boolean;
  isOpened: boolean;
}

export default class PropertyBarLevel2 extends Component<PropertyBarLevel2Props, PropertyBarLevel2State> {
  constructor(props: PropertyBarLevel2Props) {
    super(props);
    this.state = {
      status: props.item.status ?? true,
      isOpened: true
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: PropertyBarLevel2Props): void {
    if (nextProps.item.status === this.state.status) {
      return;
    }
    const status = nextProps.item.status ?? true;
    this.setState({ status });
  }

  toggleHidden(): void {
    if (this.state.status) {
      this.setState({
        isOpened: !this.state.isOpened
      });
    }
  }

  getFloatItem(items: PropertyItem[]): ReactNode {
    return (
      <div className="property-bar-float-item">
        {items.map((item) => createComponentByType(item))}
      </div>
    );
  }

  onStatusChange(status: boolean): void {
    this.props.item.onStatusChange?.(status);
    this.setState({
      status,
      isOpened: status
    });
  }

  onDelete(): void {
    this.props.item.onDelete?.();
  }

  render(): ReactNode {
    const { item, floatItems } = this.props;
    const {
      label,
      id,
      items,
      onStatusChange,
      onDelete,
      resetItem,
      customizedTitleContent,
      disableShow = false
    } = item;
    const { status, isOpened } = this.state;

    const renderedItems: ReactNode[] = [];
    items.forEach((propertyItem) => {
      renderedItems.push(createComponentByType(propertyItem));
    });

    const hasFloatItems = floatItems && floatItems.length !== 0;

    return (
      <div
        id={id}
        className={`property-bar-level2${disableShow ? ' hidden' : ''}`}
        key={id}
      >
        <div
          className="property-bar-level2-title"
          onClick={() => this.toggleHidden()}
        >
          <div className="level2-title-left">
            <SmartText className="level2-label">{label}</SmartText>
            {!!onStatusChange && (
              <div
                className="level2-status-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <Switch
                  size="small"
                  checked={status}
                  onChange={(checked) => this.onStatusChange(checked)}
                />
              </div>
            )}
            {!!customizedTitleContent && customizedTitleContent}
          </div>
          <div className="level2-title-right">
            {!!resetItem && !!resetItem.onResetClick && (
              <div
                className={`level2-reset${status ? '' : ' reset-disabled'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  resetItem.onResetClick();
                }}
              >
                {resetItem.text ?? ResourceManager.getString('plugin_scalecontent_recover')}
              </div>
            )}
            {!!onDelete && (
              <div
                className="level2-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.onDelete();
                }}
              >
                <Icons type="delete" />
              </div>
            )}
            {status && (
              <div className={`level2-dropdown-btn${isOpened ? ' up' : ' down'}`}>
                <Icons type="hs_xiao_shijiantou_xia" />
              </div>
            )}
          </div>
        </div>
        {status && (
          <div
            className={`property-bar-level2-content${status && isOpened ? '' : ' hidden'}`}
          >
            {renderedItems}
          </div>
        )}
        {hasFloatItems && this.getFloatItem(floatItems)}
      </div>
    );
  }
}