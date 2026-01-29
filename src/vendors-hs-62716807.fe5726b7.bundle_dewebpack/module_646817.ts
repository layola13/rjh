import { useContext, createElement, ReactNode } from 'react';
import { ConfigContext } from './ConfigContext';

interface BreadcrumbSeparatorProps {
  children?: ReactNode;
}

interface BreadcrumbSeparatorComponent {
  (props: BreadcrumbSeparatorProps): JSX.Element;
  __ANT_BREADCRUMB_SEPARATOR: boolean;
}

const BreadcrumbSeparator: BreadcrumbSeparatorComponent = (props: BreadcrumbSeparatorProps) => {
  const { children } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  return createElement('span', {
    className: `${prefixCls}-separator`
  }, children ?? '/');
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;

export default BreadcrumbSeparator;