import React from 'react';

interface TooltipContentProps {
  overlay: React.ReactNode | (() => React.ReactNode);
  prefixCls: string;
  id?: string;
  overlayInnerStyle?: React.CSSProperties;
}

export default function TooltipContent({
  overlay,
  prefixCls,
  id,
  overlayInnerStyle
}: TooltipContentProps): React.ReactElement {
  const content = typeof overlay === 'function' ? overlay() : overlay;

  return React.createElement(
    'div',
    {
      className: `${prefixCls}-inner`,
      id,
      role: 'tooltip',
      style: overlayInnerStyle
    },
    content
  );
}