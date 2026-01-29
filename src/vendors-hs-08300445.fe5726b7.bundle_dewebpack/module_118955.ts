import React from 'react';

interface MenuDividerProps {
  className?: string;
  rootPrefixCls?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const MenuDivider: React.FC<MenuDividerProps> = ({ 
  className = '', 
  rootPrefixCls = '', 
  style = {} 
}) => {
  return React.createElement('li', {
    className: `${className} ${rootPrefixCls}-item-divider`,
    style
  });
};

MenuDivider.defaultProps = {
  disabled: true,
  className: '',
  style: {}
};

export default MenuDivider;