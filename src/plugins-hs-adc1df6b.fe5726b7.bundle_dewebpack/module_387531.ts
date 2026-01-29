import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Switch, Tooltip } from 'antd';
import { Icons } from './icons';
import { createComponentByType } from './component-factory';

interface PopoverConfig {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  className?: string;
  offset?: { x: number; y: number };
  imgUrl?: string;
}

interface IconConfig {
  type?: string;
  tooltip?: string;
  popover?: PopoverConfig;
}

interface CustomIconConfig {
  imgUrl?: string;
  onClick?: () => void;
}

interface ResetConfig {
  text?: string;
  onResetClick?: () => void;
}

interface PropertyBarItem {
  id: string;
  label?: string;
  icon?: IconConfig;
  status?: boolean;
  rightStatus?: boolean;
  items: unknown[];
  onStatusChange?: (status: boolean) => void;
  onRightStatusChange?: (status: boolean) => void;
  disableStatusClick?: () => void;
  disableClose?: boolean;
  disableShow?: boolean;
  disabled?: boolean;
  customIcon?: CustomIconConfig;
  resetItem?: ResetConfig;
}

interface PropertyBarLevel3Props {
  item: PropertyBarItem;
}

interface PropertyBarLevel3State {
  status: boolean;
  rightStatus: boolean;
  isOpened: boolean;
}

class PropertyBarLevel3 extends Component<PropertyBarLevel3Props, PropertyBarLevel3State> {
  constructor(props: PropertyBarLevel3Props) {
    super(props);
    
    this.state = {
      status: props.item.status ?? true,
      rightStatus: props.item.rightStatus ?? false,
      isOpened: true
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: PropertyBarLevel3Props): void {
    if (
      nextProps.item.status === this.state.status &&
      nextProps.item.rightStatus === this.state.rightStatus
    ) {
      return;
    }

    const newStatus = nextProps.item.status ?? true;
    const newRightStatus = nextProps.item.rightStatus ?? false;

    this.setState({
      status: newStatus,
      rightStatus: newRightStatus
    });
  }

  onStatusChange = (checked: boolean): void => {
    const { item } = this.props;
    
    if (item.onStatusChange) {
      item.onStatusChange(checked);
    }
    
    this.setState({
      status: checked,
      isOpened: checked
    });
  };

  onRightStatusChange = (checked: boolean): void => {
    const { item } = this.props;
    
    if (item.onRightStatusChange) {
      item.onRightStatusChange(checked);
    }
    
    this.setState({
      rightStatus: checked
    });
  };

  toggleHidden = (): void => {
    const { disableClose } = this.props.item;
    
    if (disableClose !== undefined && disableClose) {
      return;
    }
    
    this.setState({
      isOpened: !this.state.isOpened
    });
  };

  disableStatusClick = (): void => {
    const { disableStatusClick } = this.props.item;
    
    if (disableStatusClick) {
      disableStatusClick();
      this.setState({
        rightStatus: false,
        status: false
      });
    }
  };

  render(): ReactNode {
    const { item } = this.props;
    const {
      label,
      icon,
      id,
      items,
      onStatusChange,
      onRightStatusChange,
      resetItem,
      disableClose = true,
      disableShow = false,
      disabled = false,
      customIcon
    } = item;

    const { status, rightStatus, isOpened } = this.state;

    const renderedItems: ReactNode[] = [];
    items.forEach((itemConfig) => {
      renderedItems.push(createComponentByType(itemConfig));
    });

    const shouldShowClose = !disableClose;
    const hasAnyStatus = status || rightStatus;
    const contentVisible = hasAnyStatus && isOpened;

    return (
      <div
        id={id}
        className={`property-bar-level3${disableShow ? ' hidden' : ''}`}
        key={id}
      >
        <div
          className={`property-bar-level3-title ${label ? '' : 'property-bar-level3-title-hidden'}`}
          onClick={this.toggleHidden}
        >
          <div className="level3-title-left">
            <div className="level3-label">{label}</div>
            
            {onStatusChange && (
              <div
                className={`level3-status-btn${disabled ? ' disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  this.disableStatusClick();
                }}
              >
                <Switch
                  size="small"
                  checked={status}
                  disabled={disabled}
                  onChange={this.onStatusChange}
                />
              </div>
            )}
            
            {icon?.tooltip && (
              <Tooltip placement="top" title={icon.tooltip} color="dark">
                <Icons
                  className="level3-tooltip"
                  type={icon.type ?? 'hs_mian_liebiaoxiangqing'}
                />
              </Tooltip>
            )}
            
            {icon?.popover && (
              <HSApp.UI.Popover.Tooltip
                placement={icon.popover.placement ?? 'top'}
                trigger={icon.popover.trigger ?? 'hover'}
                className={icon.popover.className ?? 'level3-tooltip-popover'}
                offset={icon.popover.offset ?? { x: 0, y: 0 }}
                title={
                  <div className="image" style={{ width: 212, height: 100 }}>
                    <img
                      style={{ width: 212, height: 100, borderRadius: '4px' }}
                      src={icon.popover.imgUrl}
                    />
                  </div>
                }
              >
                <Icons
                  className="level3-tooltip"
                  type={icon.type ?? 'hs_mian_liebiaoxiangqing'}
                />
              </HSApp.UI.Popover.Tooltip>
            )}
            
            {customIcon?.imgUrl && (
              <div
                className="level3-tooltip level3-custom-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  customIcon.onClick?.();
                }}
              >
                <img src={customIcon.imgUrl} />
              </div>
            )}
          </div>
          
          <div className="level3-title-right">
            {resetItem?.onResetClick && (
              <div
                className={`level3-reset${status ? '' : ' reset-disabled'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  resetItem.onResetClick?.();
                }}
              >
                {resetItem.text ?? ResourceManager.getString('plugin_scalecontent_recover')}
              </div>
            )}
            
            {onRightStatusChange && (
              <div
                className={`level3-right-status-btn${disabled ? ' disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  this.disableStatusClick();
                }}
              >
                <Switch
                  size="small"
                  checked={rightStatus}
                  disabled={disabled}
                  onChange={this.onRightStatusChange}
                />
              </div>
            )}
            
            {shouldShowClose && hasAnyStatus && (
              <div className={`level3-dropdown-btn${isOpened ? ' up' : ' down'}`}>
                <Icons type="hs_xiao_shijiantou_xia" />
              </div>
            )}
          </div>
        </div>
        
        <div className={`property-bar-level3-content${contentVisible ? '' : ' hidden'}`}>
          {renderedItems}
        </div>
      </div>
    );
  }
}

export default PropertyBarLevel3;