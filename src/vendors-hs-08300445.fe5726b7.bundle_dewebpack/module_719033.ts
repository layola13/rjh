import React, { useState, useEffect, forwardRef, isValidElement, ReactElement, ReactNode, CSSProperties, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import isMobile from 'rc-util/lib/isMobile';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';
import TabPane from './TabPane';
import TabContext from './TabContext';

interface AnimatedConfig {
  inkBar: boolean;
  tabPane: boolean;
}

interface EditableConfig {
  onEdit?: (type: 'add' | 'remove', event: React.MouseEvent | React.KeyboardEvent) => void;
  showAdd?: boolean;
  removeIcon?: ReactNode;
  addIcon?: ReactNode;
}

interface TabBarExtraContent {
  left?: ReactNode;
  right?: ReactNode;
}

interface LocaleConfig {
  dropdownAriaLabel?: string;
  removeAriaLabel?: string;
  addAriaLabel?: string;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  prefixCls?: string;
  className?: string;
  children?: ReactNode;
  direction?: 'ltr' | 'rtl';
  activeKey?: string;
  defaultActiveKey?: string;
  editable?: EditableConfig;
  animated?: boolean | AnimatedConfig;
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  tabBarGutter?: number;
  tabBarStyle?: CSSProperties;
  tabBarExtraContent?: ReactNode | TabBarExtraContent;
  locale?: LocaleConfig;
  moreIcon?: ReactNode;
  moreTransitionName?: string;
  destroyInactiveTabPane?: boolean;
  renderTabBar?: (props: TabNavListProps, DefaultTabBar: typeof TabNavList) => ReactElement;
  onChange?: (activeKey: string) => void;
  onTabClick?: (activeKey: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  onTabScroll?: (direction: 'left' | 'right' | 'top' | 'bottom') => void;
}

interface TabData {
  key: string;
  node: ReactElement;
  [key: string]: any;
}

interface TabNavListProps {
  id?: string;
  activeKey: string;
  animated: AnimatedConfig;
  tabPosition: 'left' | 'right' | 'top' | 'bottom';
  rtl: boolean;
  mobile: boolean;
  editable?: EditableConfig;
  locale?: LocaleConfig;
  moreIcon?: ReactNode;
  moreTransitionName?: string;
  tabBarGutter?: number;
  onTabClick: (activeKey: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  onTabScroll?: (direction: 'left' | 'right' | 'top' | 'bottom') => void;
  extra?: ReactNode | TabBarExtraContent;
  style?: CSSProperties;
  panes: ReactNode;
}

interface TabContextValue {
  tabs: TabData[];
  prefixCls: string;
}

let tabsUniqueId = 0;

const InternalTabs: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (props, ref) => {
  const {
    id,
    prefixCls = 'rc-tabs',
    className,
    children,
    direction,
    activeKey,
    defaultActiveKey,
    editable,
    animated = { inkBar: true, tabPane: false },
    tabPosition = 'top',
    tabBarGutter,
    tabBarStyle,
    tabBarExtraContent,
    locale,
    moreIcon,
    moreTransitionName,
    destroyInactiveTabPane,
    renderTabBar,
    onChange,
    onTabClick,
    onTabScroll,
    ...restProps
  } = props;

  const parseTabs = (childrenNodes: ReactNode): TabData[] => {
    return toArray(childrenNodes)
      .map((node) => {
        if (isValidElement(node)) {
          const key = node.key !== undefined ? String(node.key) : undefined;
          return {
            key,
            ...node.props,
            node,
          };
        }
        return null;
      })
      .filter((item): item is TabData => item !== null);
  };

  const tabs = parseTabs(children);
  const isRtl = direction === 'rtl';

  let mergedAnimated: AnimatedConfig;
  if (animated === false) {
    mergedAnimated = { inkBar: false, tabPane: false };
  } else if (animated === true) {
    mergedAnimated = { inkBar: true, tabPane: true };
  } else {
    mergedAnimated = {
      inkBar: true,
      tabPane: false,
      ...(typeof animated === 'object' ? animated : {}),
    };
  }

  const [mobile, setMobile] = useState(false);
  
  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(
    () => tabs[0]?.key,
    {
      value: activeKey,
      defaultValue: defaultActiveKey,
    }
  );

  const [activeIndex, setActiveIndex] = useState(() => {
    return tabs.findIndex((tab) => tab.key === mergedActiveKey);
  });

  useEffect(() => {
    let newActiveIndex = tabs.findIndex((tab) => tab.key === mergedActiveKey);
    
    if (newActiveIndex === -1) {
      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey(tabs[newActiveIndex]?.key);
    }
    
    setActiveIndex(newActiveIndex);
  }, [tabs.map((tab) => tab.key).join('_'), mergedActiveKey, activeIndex]);

  const [mergedId, setMergedId] = useMergedState<string>(null, { value: id });

  let mergedTabPosition = tabPosition;
  if (mobile && !['left', 'right'].includes(tabPosition)) {
    mergedTabPosition = 'top';
  }

  useEffect(() => {
    if (!id) {
      setMergedId(`rc-tabs-${tabsUniqueId}`);
      tabsUniqueId += 1;
    }
  }, []);

  const sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition: mergedTabPosition,
    rtl: isRtl,
    mobile,
  };

  const tabNavListProps: TabNavListProps = {
    ...sharedProps,
    editable,
    locale,
    moreIcon,
    moreTransitionName,
    tabBarGutter,
    onTabClick: (key: string, event: React.MouseEvent | React.KeyboardEvent) => {
      onTabClick?.(key, event);
      setMergedActiveKey(key);
      onChange?.(key);
    },
    onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: children,
  };

  const tabNavNode = renderTabBar
    ? renderTabBar(tabNavListProps, TabNavList)
    : React.createElement(TabNavList, tabNavListProps);

  const classNameValue = classNames(
    prefixCls,
    `${prefixCls}-${mergedTabPosition}`,
    {
      [`${prefixCls}-mobile`]: mobile,
      [`${prefixCls}-editable`]: editable,
      [`${prefixCls}-rtl`]: isRtl,
    },
    className
  );

  return (
    <TabContext.Provider value={{ tabs, prefixCls }}>
      <div ref={ref} id={id} className={classNameValue} {...restProps}>
        {tabNavNode}
        <TabPanelList
          destroyInactiveTabPane={destroyInactiveTabPane}
          {...sharedProps}
          animated={mergedAnimated}
        />
      </div>
    </TabContext.Provider>
  );
};

const Tabs = forwardRef(InternalTabs);

Tabs.TabPane = TabPane;

export default Tabs;