import React, { useContext, ReactNode, CSSProperties } from 'react';
import { ConfigContext } from './ConfigContext';
import DownOutlined from './DownOutlined';
import Dropdown from './Dropdown';

interface DropdownProps {
  overlay?: ReactNode;
  placement?: string;
  trigger?: string[];
  [key: string]: any;
}

interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: ReactNode;
  children?: ReactNode;
  overlay?: ReactNode;
  dropdownProps?: DropdownProps;
  href?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: any;
}

interface BreadcrumbItemComponent extends React.FC<BreadcrumbItemProps> {
  __ANT_BREADCRUMB_ITEM: boolean;
}

/**
 * Extract props excluding specified keys
 */
function omitProps<T extends Record<string, any>>(
  source: T,
  omitKeys: string[]
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && omitKeys.indexOf(key) < 0) {
      result[key] = source[key];
    }
  }
  
  if (source != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(source);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        omitKeys.indexOf(symbol as any) < 0 &&
        Object.prototype.propertyIsEnumerable.call(source, symbol)
      ) {
        result[symbol as any] = source[symbol as any];
      }
    }
  }
  
  return result;
}

const BreadcrumbItem: BreadcrumbItemComponent = (props: BreadcrumbItemProps) => {
  const {
    prefixCls: customizePrefixCls,
    separator = '/',
    children,
    overlay,
    dropdownProps,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);

  const omittedProps = omitProps(restProps, ['prefixCls', 'separator', 'children', 'overlay', 'dropdownProps']);

  let linkNode: ReactNode;

  if ('href' in omittedProps) {
    linkNode = (
      <a className={`${prefixCls}-link`} {...omittedProps}>
        {children}
      </a>
    );
  } else {
    linkNode = (
      <span className={`${prefixCls}-link`} {...omittedProps}>
        {children}
      </span>
    );
  }

  let contentNode = linkNode;

  if (overlay) {
    contentNode = (
      <Dropdown overlay={overlay} placement="bottomCenter" {...dropdownProps}>
        <span className={`${prefixCls}-overlay-link`}>
          {linkNode}
          <DownOutlined />
        </span>
      </Dropdown>
    );
  }

  if (!children) {
    return null;
  }

  return (
    <span>
      {contentNode}
      {separator && separator !== '' && (
        <span className={`${prefixCls}-separator`}>{separator}</span>
      )}
    </span>
  );
};

BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;

export default BreadcrumbItem;