import React, { useContext, ReactElement, ReactNode } from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';
import CollapsePanel from './CollapsePanel';
import { getMotionConfig } from './motion';

interface CollapsePanelProps {
  key?: string | number;
  header?: ReactNode;
  disabled?: boolean;
  collapsible?: 'header' | 'disabled' | 'icon';
  showArrow?: boolean;
  extra?: ReactNode;
  [key: string]: any;
}

interface ExpandIconProps {
  isActive?: boolean;
  disabled?: boolean;
  panelKey: string | number;
}

interface CollapseProps {
  prefixCls?: string;
  className?: string;
  bordered?: boolean;
  ghost?: boolean;
  expandIconPosition?: 'left' | 'right';
  expandIcon?: (props: ExpandIconProps) => ReactNode;
  activeKey?: string | number | Array<string | number>;
  defaultActiveKey?: string | number | Array<string | number>;
  accordion?: boolean;
  onChange?: (key: string | number | Array<string | number>) => void;
  children?: ReactNode;
  [key: string]: any;
}

type CollapseComponent = React.FC<CollapseProps> & {
  Panel: typeof CollapsePanel;
};

const Collapse: CollapseComponent = (props: CollapseProps) => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    bordered = true,
    ghost,
    expandIconPosition,
    expandIcon,
    children,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);

  const iconPosition = expandIconPosition !== undefined 
    ? expandIconPosition 
    : direction === 'rtl' ? 'right' : 'left';

  const collapseClassName = classNames(
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-icon-position-${iconPosition}`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
    },
    className
  );

  const motionConfig = {
    ...getMotionConfig(),
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`,
  };

  const renderExpandIcon = (panelProps: ExpandIconProps = {} as ExpandIconProps): ReactNode => {
    const iconNode = expandIcon 
      ? expandIcon(panelProps) 
      : <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />;

    return cloneElement(iconNode as ReactElement, () => ({
      className: classNames(
        (iconNode as ReactElement).props?.className,
        `${prefixCls}-arrow`
      ),
    }));
  };

  const processedChildren = React.Children.map(children, (child: ReactElement, index: number) => {
    if (!child?.props) {
      return child;
    }

    const { disabled, collapsible, ...otherProps } = child.props;

    if (disabled !== undefined) {
      const key = child.key ?? String(index);
      const updatedProps = {
        ...otherProps,
        key,
        collapsible: collapsible ?? (disabled ? 'disabled' : undefined),
      };
      return cloneElement(child, updatedProps);
    }

    return child;
  });

  return (
    <RcCollapse
      openMotion={motionConfig}
      {...restProps}
      bordered={bordered}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
    >
      {processedChildren}
    </RcCollapse>
  );
};

Collapse.Panel = CollapsePanel;

export default Collapse;