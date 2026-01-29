import React, { useContext } from 'react';
import classNames from 'classnames';
import RcTabs, { TabPane as RcTabPane } from 'rc-tabs';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

type TabType = 'line' | 'card' | 'editable-card';
type TabSize = 'small' | 'default' | 'large';
type EditAction = 'add' | 'remove';

interface TabsProps {
  type?: TabType;
  className?: string;
  size?: TabSize;
  onEdit?: (targetKey: string | React.MouseEvent, action: EditAction) => void;
  hideAdd?: boolean;
  centered?: boolean;
  addIcon?: React.ReactNode;
  prefixCls?: string;
  direction?: 'ltr' | 'rtl';
  moreTransitionName?: string;
  [key: string]: unknown;
}

interface EditableConfig {
  onEdit: (action: EditAction, payload: { key: string; event: React.MouseEvent }) => void;
  removeIcon: React.ReactNode;
  addIcon: React.ReactNode;
  showAdd: boolean;
}

interface ConfigContextValue {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

function Tabs(props: TabsProps): React.ReactElement {
  const {
    type,
    className,
    size,
    onEdit,
    hideAdd,
    centered,
    addIcon,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext<ConfigContextValue>(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);

  let editableConfig: EditableConfig | undefined;

  if (type === 'editable-card') {
    editableConfig = {
      onEdit: (action: EditAction, payload: { key: string; event: React.MouseEvent }) => {
        const { key, event } = payload;
        onEdit?.(action === 'add' ? event : key, action);
      },
      removeIcon: React.createElement(CloseOutlined),
      addIcon: addIcon || React.createElement(PlusOutlined),
      showAdd: hideAdd !== true,
    };
  }

  warning(
    !('onPrevClick' in restProps) && !('onNextClick' in restProps),
    'Tabs',
    '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.'
  );

  const tabsClassName = classNames(
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type ?? ''),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered,
    },
    className
  );

  return React.createElement(RcTabs, {
    direction,
    ...restProps,
    moreTransitionName: 'slide-up',
    className: tabsClassName,
    editable: editableConfig,
    moreIcon: React.createElement(EllipsisOutlined),
    prefixCls,
  });
}

Tabs.TabPane = RcTabPane;

export default Tabs;