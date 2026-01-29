import React from 'react';
import classNames from 'classnames';

interface PaginationItemProps {
  rootPrefixCls: string;
  page: number;
  active: boolean;
  disabled?: boolean;
  className?: string;
  showTitle?: boolean;
  onClick: (page: number) => void;
  onKeyPress: (event: React.KeyboardEvent, onClick: (page: number) => void, page: number) => void;
  itemRender: (page: number, type: string, element: React.ReactElement) => React.ReactNode;
}

export default function PaginationItem(props: PaginationItemProps): React.ReactElement {
  const itemClassName = `${props.rootPrefixCls}-item`;
  const pageClassName = `${itemClassName}-${props.page}`;
  
  const classList = classNames(
    itemClassName,
    pageClassName,
    {
      [`${itemClassName}-active`]: props.active,
      [`${itemClassName}-disabled`]: !props.page,
      [props.className!]: !!props.className
    }
  );

  const handleClick = (): void => {
    props.onClick(props.page);
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    props.onKeyPress(event, props.onClick, props.page);
  };

  const defaultElement = React.createElement(
    'a',
    { rel: 'nofollow' },
    props.page
  );

  return React.createElement(
    'li',
    {
      title: props.showTitle ? String(props.page) : null,
      className: classList,
      onClick: handleClick,
      onKeyPress: handleKeyPress,
      tabIndex: 0
    },
    props.itemRender(props.page, 'page', defaultElement)
  );
}