import { useContext, createElement, ReactElement } from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import warning from './warning';

interface CollapsePanelProps {
  prefixCls?: string;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
  collapsible?: 'header' | 'disabled' | 'icon';
  header?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export default function CollapsePanel(props: CollapsePanelProps): ReactElement {
  warning(
    !('disabled' in props),
    'Collapse.Panel',
    '`disabled` is deprecated. Please use `collapsible="disabled"` instead.'
  );

  const { getPrefixCls } = useContext(ConfigContext);
  const {
    prefixCls: customPrefixCls,
    className = '',
    showArrow = true,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('collapse', customPrefixCls);
  const panelClassName = classNames(
    {
      [`${prefixCls}-no-arrow`]: !showArrow,
    },
    className
  );

  return createElement(RcCollapse.Panel, {
    ...restProps,
    prefixCls,
    className: panelClassName,
  });
}