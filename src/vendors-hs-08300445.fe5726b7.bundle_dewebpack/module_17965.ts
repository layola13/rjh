import React from 'react';
import classNames from 'classnames';

interface SwitcherIconProps {
  className: string;
  customizeIcon?: React.ReactNode | ((props: unknown) => React.ReactNode);
  customizeIconProps?: unknown;
  onMouseDown?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  children?: React.ReactNode;
}

export default function SwitcherIcon({
  className,
  customizeIcon,
  customizeIconProps,
  onMouseDown,
  onClick,
  children
}: SwitcherIconProps): React.ReactElement {
  let iconNode: React.ReactNode;

  if (typeof customizeIcon === 'function') {
    iconNode = customizeIcon(customizeIconProps);
  } else {
    iconNode = customizeIcon;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();
    onMouseDown?.(event);
  };

  const iconClassNames = className
    .split(/\s+/)
    .map((cls) => `${cls}-icon`);

  return React.createElement(
    'span',
    {
      className,
      onMouseDown: handleMouseDown,
      style: {
        userSelect: 'none',
        WebkitUserSelect: 'none'
      },
      unselectable: 'on',
      onClick,
      'aria-hidden': true
    },
    iconNode !== undefined
      ? iconNode
      : React.createElement(
          'span',
          {
            className: classNames(iconClassNames)
          },
          children
        )
  );
}