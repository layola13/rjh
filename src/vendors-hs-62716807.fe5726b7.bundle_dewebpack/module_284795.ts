import React, { useCallback, useContext, createElement, ReactElement } from 'react';
import classNames from 'classnames';
import RcSteps from 'rc-steps';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import Progress from '../progress';
import { ConfigContext } from '../config-provider';
import useBreakpoint from '../grid/hooks/useBreakpoint';

type StepStatus = 'wait' | 'process' | 'finish' | 'error';
type StepDirection = 'horizontal' | 'vertical';
type StepSize = 'default' | 'small';

interface StepIconParams {
  node: ReactElement;
  status?: StepStatus;
  index?: number;
}

interface StepsProps {
  percent?: number;
  size?: StepSize;
  className?: string;
  direction?: StepDirection;
  responsive?: boolean;
  current?: number;
  prefixCls?: string;
  iconPrefix?: string;
}

const Steps: React.FC<StepsProps> & { Step: typeof RcSteps.Step } = (props) => {
  const {
    percent,
    size,
    className,
    direction,
    responsive,
    prefixCls: customizePrefixCls,
    iconPrefix: customizeIconPrefix,
    ...restProps
  } = props;

  const breakpoint = useBreakpoint();
  const isExtraSmall = breakpoint.xs;

  const { getPrefixCls, direction: contextDirection } = useContext(ConfigContext);

  const getDirection = useCallback((): StepDirection => {
    return responsive && isExtraSmall ? 'vertical' : (direction ?? 'horizontal');
  }, [isExtraSmall, direction, responsive]);

  const prefixCls = getPrefixCls('steps', customizePrefixCls);
  const iconPrefixCls = getPrefixCls('', customizeIconPrefix);

  const mergedClassName = classNames(
    {
      [`${prefixCls}-rtl`]: contextDirection === 'rtl',
      [`${prefixCls}-with-progress`]: percent !== undefined,
    },
    className
  );

  const icons = {
    finish: createElement(CheckOutlined, {
      className: `${prefixCls}-finish-icon`,
    }),
    error: createElement(CloseOutlined, {
      className: `${prefixCls}-error-icon`,
    }),
  };

  const renderStepIcon = (iconParams: StepIconParams): ReactElement => {
    const { node, status } = iconParams;

    if (status === 'process' && percent !== undefined) {
      const progressSize = size === 'small' ? 32 : 40;

      return createElement(
        'div',
        {
          className: `${prefixCls}-progress-icon`,
        },
        createElement(Progress, {
          type: 'circle',
          percent,
          width: progressSize,
          strokeWidth: 4,
          format: () => null,
        }),
        node
      );
    }

    return node;
  };

  return createElement(RcSteps, {
    icons,
    ...restProps,
    direction: getDirection(),
    stepIcon: renderStepIcon,
    prefixCls,
    iconPrefix: iconPrefixCls,
    className: mergedClassName,
  });
};

Steps.Step = RcSteps.Step;

Steps.defaultProps = {
  current: 0,
};

export default Steps;