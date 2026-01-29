import React, { Component, CSSProperties, MouseEvent } from 'react';
import { Icons } from './Icons';
import { Button } from './Button';
import { Divider } from './Divider';

type MenuItemType = 'folder' | 'divider' | 'button';

interface MenuItem {
  type?: MenuItemType;
  label?: string;
  showRedDot?: boolean;
  className?: string;
  visible?: boolean;
  onClick?: () => void;
  enable?: boolean;
  disabled?: boolean;
  childItems?: MenuItem[];
}

interface FolderProps {
  className?: string;
  onClick?: () => void;
  label?: string;
  theme?: string;
  childItems?: MenuItem[];
  showRedDot?: boolean;
  visible?: boolean;
  enable?: boolean;
}

interface FolderState {
  hover: boolean;
}

declare const ResourceManager: {
  getString(key?: string): string;
};

export class Folder extends Component<FolderProps, FolderState> {
  constructor(props: FolderProps) {
    super(props);
    this.state = {
      hover: false
    };
  }

  private _onMouseEnter = (): void => {
    this.setState({
      hover: true
    });
  };

  private _onMouseLeave = (): void => {
    if (this.state.hover) {
      this.setState({
        hover: false
      });
    }
  };

  private _onSubMenuClick = (index: number): void => {
    const { childItems } = this.props;
    const menuItem = childItems?.[index] || {};
    const { disabled, onClick } = menuItem;

    if (!disabled && onClick) {
      onClick();
    }

    this.setState({
      hover: false
    });
  };

  private renderList = (): JSX.Element => {
    const { childItems, theme } = this.props;
    const { hover } = this.state;
    const dropdownClassName = `dropdown ${theme}`;
    
    const listItems = childItems?.map((item: MenuItem, index: number) => {
      const { 
        type, 
        label, 
        showRedDot, 
        className, 
        visible, 
        onClick, 
        enable, 
        disabled, 
        childItems: subItems 
      } = item;
      
      const itemClassName = theme ? `cli ${theme}` : 'cli light';
      let content: JSX.Element;

      switch (type) {
        case 'folder':
          content = (
            <Folder
              childItems={subItems}
              label={label}
              showRedDot={showRedDot}
              className={className}
              visible={visible}
              onClick={onClick}
              enable={enable}
            />
          );
          break;
        case 'divider':
          content = (
            <Divider
              className={className}
              visible={visible}
            />
          );
          break;
        default:
          content = (
            <Button
              label={label}
              showRedDot={showRedDot}
              className={className}
              visible={visible}
              onClick={onClick}
              disabled={disabled}
            />
          );
      }

      return (
        <li
          key={index}
          className={`user-info-folder-cli ${itemClassName}`}
          onClick={() => this._onSubMenuClick(index)}
        >
          {content}
        </li>
      );
    });

    return (
      <ul className={`user-info-folder-wrapper ${dropdownClassName} ${hover ? 'dropdownshow' : ''}`}>
        {listItems}
      </ul>
    );
  };

  render(): JSX.Element {
    const { className = '', onClick, label, theme = '' } = this.props;

    const iconStyle: CSSProperties = {
      fontSize: '8px'
    };

    return (
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className={`login-folder ${theme} ${className}`}
      >
        <a onClick={onClick} className="login-folder-text">
          <span>{ResourceManager.getString(label)}</span>
          <Icons
            type="hs_xiao_danjiantou_you"
            style={iconStyle}
            className={`helpicon-${theme}`}
          />
        </a>
        {this.renderList()}
      </div>
    );
  }
}