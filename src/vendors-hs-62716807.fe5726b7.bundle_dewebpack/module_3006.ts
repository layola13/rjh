import React, { useContext, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import SizeContext from './SizeContext';
import Grid from './Grid';
import Meta from './Meta';
import Row from './Row';
import Col from './Col';
import Tabs from './Tabs';

interface CardTabListItem {
  key: string;
  tab: ReactNode;
  disabled?: boolean;
}

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  className?: string;
  extra?: ReactNode;
  headStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  title?: ReactNode;
  loading?: boolean;
  bordered?: boolean;
  size?: 'default' | 'small';
  type?: string;
  cover?: ReactNode;
  actions?: ReactNode[];
  tabList?: CardTabListItem[];
  children?: ReactNode;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  tabBarExtraContent?: ReactNode;
  hoverable?: boolean;
  tabProps?: Record<string, unknown>;
  onTabChange?: (key: string) => void;
}

const Card: React.FC<CardProps> & {
  Grid: typeof Grid;
  Meta: typeof Meta;
} = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    extra,
    headStyle = {},
    bodyStyle = {},
    title,
    loading,
    bordered = true,
    size,
    type,
    cover,
    actions,
    tabList,
    children,
    activeTabKey,
    defaultActiveTabKey,
    tabBarExtraContent,
    hoverable,
    tabProps = {},
    onTabChange,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const contextSize = useContext(SizeContext);

  const prefixCls = getPrefixCls('card', customizePrefixCls);

  const loadingBlockPadding: CSSProperties | undefined =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px'
      ? { padding: 24 }
      : undefined;

  const loadingBlock = <div className={`${prefixCls}-loading-block`} />;

  const loadingContent = (
    <div className={`${prefixCls}-loading-content`} style={loadingBlockPadding}>
      <Row gutter={8}>
        <Col span={22}>{loadingBlock}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>{loadingBlock}</Col>
        <Col span={15}>{loadingBlock}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>{loadingBlock}</Col>
        <Col span={18}>{loadingBlock}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>{loadingBlock}</Col>
        <Col span={9}>{loadingBlock}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>{loadingBlock}</Col>
        <Col span={3}>{loadingBlock}</Col>
        <Col span={16}>{loadingBlock}</Col>
      </Row>
    </div>
  );

  const isControlled = activeTabKey !== undefined;

  const tabsProps = {
    ...tabProps,
    [isControlled ? 'activeKey' : 'defaultActiveKey']: isControlled
      ? activeTabKey
      : defaultActiveTabKey,
    tabBarExtraContent,
  };

  const tabsElement =
    tabList && tabList.length ? (
      <Tabs
        size="large"
        {...tabsProps}
        className={`${prefixCls}-head-tabs`}
        onChange={(key: string) => {
          onTabChange?.(key);
        }}
      >
        {tabList.map((item) => (
          <Tabs.TabPane tab={item.tab} disabled={item.disabled} key={item.key} />
        ))}
      </Tabs>
    ) : null;

  let headElement: ReactNode = null;
  if (title || extra || tabsElement) {
    headElement = (
      <div className={`${prefixCls}-head`} style={headStyle}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
        {tabsElement}
      </div>
    );
  }

  const coverElement = cover ? (
    <div className={`${prefixCls}-cover`}>{cover}</div>
  ) : null;

  const bodyElement = (
    <div className={`${prefixCls}-body`} style={bodyStyle}>
      {loading ? loadingContent : children}
    </div>
  );

  const actionsElement =
    actions && actions.length ? (
      <ul className={`${prefixCls}-actions`}>
        {actions.map((action, index) => (
          <li
            style={{ width: `${100 / actions.length}%` }}
            key={`action-${index}`}
          >
            <span>{action}</span>
          </li>
        ))}
      </ul>
    ) : null;

  let containsGrid = false;
  React.Children.forEach(children, (child) => {
    if (child && (child as any).type && (child as any).type === Grid) {
      containsGrid = true;
    }
  });

  const cardSize = size || contextSize;

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-contain-grid`]: containsGrid,
      [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
      [`${prefixCls}-${cardSize}`]: cardSize,
      [`${prefixCls}-type-${type}`]: !!type,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <div {...restProps} className={classString}>
      {headElement}
      {coverElement}
      {bodyElement}
      {actionsElement}
    </div>
  );
};

Card.Grid = Grid;
Card.Meta = Meta;

export default Card;