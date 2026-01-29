import React, { useContext, ReactNode, CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import { Col } from 'antd/es/grid';
import { ListContext } from './ListContext';
import { ConfigContext } from './ConfigContext';
import { cloneElement } from './utils';

interface MetaProps {
  prefixCls?: string;
  className?: string;
  avatar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  [key: string]: unknown;
}

interface ListItemProps {
  prefixCls?: string;
  children?: ReactNode;
  actions?: ReactNode[];
  extra?: ReactNode;
  className?: string;
  colStyle?: CSSProperties;
  [key: string]: unknown;
}

interface ListContextValue {
  grid?: {
    gutter?: number;
    column?: number;
  };
  itemLayout?: 'horizontal' | 'vertical';
}

interface ConfigContextValue {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

export const Meta: React.FC<MetaProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext<ConfigContextValue>(ConfigContext);
  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const classString = classNames(`${prefixCls}-item-meta`, className);

  const content = (
    <div className={`${prefixCls}-item-meta-content`}>
      {title && (
        <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>
      )}
      {description && (
        <div className={`${prefixCls}-item-meta-description`}>
          {description}
        </div>
      )}
    </div>
  );

  return (
    <div {...restProps} className={classString}>
      {avatar && (
        <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>
      )}
      {(title || description) && content}
    </div>
  );
};

const ListItem: React.FC<ListItemProps> & { Meta: typeof Meta } = (props) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    actions,
    extra,
    className,
    colStyle,
    ...restProps
  } = props;

  const { grid, itemLayout } = useContext<ListContextValue>(ListContext);
  const { getPrefixCls } = useContext<ConfigContextValue>(ConfigContext);
  const prefixCls = getPrefixCls('list', customizePrefixCls);

  const actionList =
    actions && actions.length > 0 ? (
      <ul className={`${prefixCls}-item-action`} key="actions">
        {actions.map((action, index) => (
          <li key={`${prefixCls}-item-action-${index}`}>
            {action}
            {index !== actions.length - 1 && (
              <em className={`${prefixCls}-item-action-split`} />
            )}
          </li>
        ))}
      </ul>
    ) : null;

  const isVerticalLayout = itemLayout === 'vertical';
  let isFlexMode = true;

  if (isVerticalLayout) {
    isFlexMode = !!extra;
  } else {
    let hasStringChild = false;
    React.Children.forEach(children, (child) => {
      if (typeof child === 'string') {
        hasStringChild = true;
      }
    });
    isFlexMode = !(hasStringChild && React.Children.count(children) > 1);
  }

  const Element = grid ? 'div' : 'li';

  const itemContent = (
    <Element
      {...restProps}
      className={classNames(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-no-flex`]: !isFlexMode,
        },
        className
      )}
    >
      {isVerticalLayout && extra
        ? [
            <div className={`${prefixCls}-item-main`} key="content">
              {children}
              {actionList}
            </div>,
            <div className={`${prefixCls}-item-extra`} key="extra">
              {extra}
            </div>,
          ]
        : [
            children,
            actionList,
            cloneElement(extra as ReactElement, { key: 'extra' }),
          ]}
    </Element>
  );

  return grid ? (
    <Col flex={1} style={colStyle}>
      {itemContent}
    </Col>
  ) : (
    itemContent
  );
};

ListItem.Meta = Meta;

export default ListItem;