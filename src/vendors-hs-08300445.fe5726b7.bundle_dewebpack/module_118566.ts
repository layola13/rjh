import React from 'react';
import classNames from 'classnames';

interface ContentProps {
  showArrow?: boolean;
  arrowContent?: React.ReactNode;
  children: React.ReactNode | (() => React.ReactNode);
  prefixCls: string;
  id?: string;
  overlayInnerStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

export default function Content(props: ContentProps): React.ReactElement {
  const {
    showArrow,
    arrowContent,
    children,
    prefixCls,
    id,
    overlayInnerStyle,
    className,
    style
  } = props;

  return React.createElement(
    'div',
    {
      className: classNames(`${prefixCls}-content`, className),
      style: style
    },
    showArrow !== false &&
      React.createElement(
        'div',
        {
          className: `${prefixCls}-arrow`,
          key: 'arrow'
        },
        arrowContent
      ),
    React.createElement(
      'div',
      {
        className: `${prefixCls}-inner`,
        id: id,
        role: 'tooltip',
        style: overlayInnerStyle
      },
      typeof children === 'function' ? children() : children
    )
  );
}