import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

interface TabPaneProps {
  prefixCls: string;
  forceRender?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  active: boolean;
  animated?: boolean;
  destroyInactiveTabPane?: boolean;
  tabKey: string;
  children?: React.ReactNode;
}

export default function TabPane(props: TabPaneProps): JSX.Element {
  const {
    prefixCls,
    forceRender,
    className,
    style,
    id,
    active,
    animated,
    destroyInactiveTabPane,
    tabKey,
    children
  } = props;

  const [isRendered, setIsRendered] = useState<boolean>(!!forceRender);

  useEffect(() => {
    if (active) {
      setIsRendered(true);
    } else if (destroyInactiveTabPane) {
      setIsRendered(false);
    }
  }, [active, destroyInactiveTabPane]);

  const inactiveStyle: React.CSSProperties = {};
  
  if (!active) {
    if (animated) {
      inactiveStyle.visibility = 'hidden';
      inactiveStyle.height = 0;
      inactiveStyle.overflowY = 'hidden';
    } else {
      inactiveStyle.display = 'none';
    }
  }

  const mergedStyle: React.CSSProperties = {
    ...inactiveStyle,
    ...style
  };

  const panelId = id ? `${id}-panel-${tabKey}` : undefined;
  const tabId = id ? `${id}-tab-${tabKey}` : undefined;

  const panelClassName = classNames(
    `${prefixCls}-tabpane`,
    {
      [`${prefixCls}-tabpane-active`]: active
    },
    className
  );

  const shouldRenderChildren = active || isRendered || forceRender;

  return (
    <div
      id={panelId}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      aria-labelledby={tabId}
      aria-hidden={!active}
      style={mergedStyle}
      className={panelClassName}
    >
      {shouldRenderChildren && children}
    </div>
  );
}