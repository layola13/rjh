import React from 'react';
import PropTypes from 'prop-types';

enum PropertyBarControlTypeEnum {
  divider = 'divider'
}

interface MenuItem {
  src?: string;
  disable?: boolean;
  type?: PropertyBarControlTypeEnum;
  label?: string;
  children?: MenuItem[];
  onClick?: (event: React.MouseEvent) => void;
}

interface MenuItemViewProps {
  item: MenuItem;
  onClick?: (event: React.MouseEvent) => void;
}

const arrow: string | undefined = require('./arrow.png'); // Adjust import path as needed

const MenuItemView: React.FC<MenuItemViewProps> = ({ item, onClick }) => {
  const { src, disable, type, label, children } = item;
  const disableClass = disable ? 'disable' : '';
  const handleClick = disable ? () => false : onClick;

  if (type === PropertyBarControlTypeEnum.divider) {
    return <div className="rightdive" />;
  }

  const nextIcon = children && children.length > 0 ? arrow : undefined;

  return (
    <div className={`rightitem ${disableClass}`} onClick={handleClick}>
      {src && <img className="righticon" src={src} />}
      <div className="rightlabel">{label}</div>
      {nextIcon && <img className="righticon next-icon" src={nextIcon} />}
    </div>
  );
};

MenuItemView.propTypes = {
  item: PropTypes.object.isRequired
};

interface MenuItemComponentProps {
  item: MenuItem;
  onItemClick: (item: MenuItem, event: React.MouseEvent) => void;
  onSubMenuClick: (event: React.MouseEvent) => void;
}

interface MenuItemComponentState {
  submenu: boolean;
}

class MenuItemComponent extends React.Component<MenuItemComponentProps, MenuItemComponentState> {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onSubMenuClick: PropTypes.func.isRequired
  };

  constructor(props: MenuItemComponentProps) {
    super(props);
    this.state = {
      submenu: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(): void {
    this.setState({
      submenu: true
    });
  }

  onMouseLeave(): void {
    this.setState({
      submenu: false
    });
  }

  renderSubMenu(): React.ReactNode {
    const { submenu } = this.state;
    const { item, onSubMenuClick } = this.props;
    const children = item.children || [];

    if (submenu && children.length > 0) {
      return (
        <div
          className="sub-menu"
          onMouseOver={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <div className="mainland">
            {children.map((childItem: MenuItem) => (
              <MenuItemView
                item={childItem}
                onClick={(event: React.MouseEvent) => {
                  if (childItem.onClick) {
                    childItem.onClick(event);
                  }
                  onSubMenuClick(event);
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  render(): React.ReactNode {
    const { item, onItemClick } = this.props;

    if (item.type === PropertyBarControlTypeEnum.divider) {
      return <div className="rightdive" />;
    }

    return (
      <div
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <MenuItemView
          item={item}
          onClick={(event: React.MouseEvent) => {
            onItemClick(item, event);
          }}
        />
        {this.renderSubMenu()}
      </div>
    );
  }
}

export default MenuItemComponent;