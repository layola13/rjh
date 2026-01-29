import React, { Component, ReactElement, CSSProperties, cloneElement } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import Step from './Step';

interface StepIconRender {
  (info: { index: number; status: StepStatus; title: React.ReactNode; description: React.ReactNode }): React.ReactNode;
}

type StepStatus = 'wait' | 'process' | 'finish' | 'error';

type Direction = 'horizontal' | 'vertical';

type StepType = 'default' | 'navigation';

type LabelPlacement = 'horizontal' | 'vertical';

type Size = '' | 'small';

interface IconConfig {
  finish?: React.ReactNode;
  error?: React.ReactNode;
}

interface StepsProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  direction?: Direction;
  type?: StepType;
  labelPlacement?: LabelPlacement;
  iconPrefix?: string;
  status?: StepStatus;
  size?: Size;
  current?: number;
  progressDot?: boolean | ((iconDot: React.ReactNode, info: { index: number; status: StepStatus; title: React.ReactNode; description: React.ReactNode }) => React.ReactNode);
  stepIcon?: StepIconRender;
  initial?: number;
  icons?: IconConfig;
  onChange?: (current: number) => void;
}

class Steps extends Component<StepsProps> {
  static Step = Step;

  static defaultProps: Partial<StepsProps> = {
    type: 'default',
    prefixCls: 'rc-steps',
    iconPrefix: 'rc',
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    initial: 0,
    current: 0,
    status: 'process',
    size: '',
    progressDot: false,
  };

  onStepClick = (stepIndex: number): void => {
    const { onChange, current } = this.props;
    if (onChange && current !== stepIndex) {
      onChange(stepIndex);
    }
  };

  render(): React.ReactNode {
    const {
      prefixCls = 'rc-steps',
      style = {},
      className,
      children,
      direction = 'horizontal',
      type = 'default',
      labelPlacement = 'horizontal',
      iconPrefix = 'rc',
      status = 'process',
      size = '',
      current = 0,
      progressDot = false,
      stepIcon,
      initial = 0,
      icons,
      onChange,
      ...restProps
    } = this.props;

    const isNavigation = type === 'navigation';
    const adjustedLabelPlacement = progressDot ? 'vertical' : labelPlacement;

    const classString = classNames(
      prefixCls,
      `${prefixCls}-${direction}`,
      className,
      {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-label-${adjustedLabelPlacement}`]: direction === 'horizontal',
        [`${prefixCls}-dot`]: !!progressDot,
        [`${prefixCls}-navigation`]: isNavigation,
      }
    );

    return (
      <div className={classString} style={style} {...restProps}>
        {toArray(children).map((child: ReactElement, index: number) => {
          const stepIndex = initial + index;
          const stepNumber = stepIndex + 1;

          const stepProps: any = {
            stepNumber: `${stepNumber}`,
            stepIndex,
            key: stepIndex,
            prefixCls,
            iconPrefix,
            wrapperStyle: style,
            progressDot,
            stepIcon,
            icons,
            onStepClick: onChange ? this.onStepClick : undefined,
            ...child.props,
          };

          if (status === 'error' && index === current - 1) {
            stepProps.className = `${prefixCls}-next-error`;
          }

          if (!child.props.status) {
            if (stepIndex === current) {
              stepProps.status = status;
            } else if (stepIndex < current) {
              stepProps.status = 'finish';
            } else {
              stepProps.status = 'wait';
            }
          }

          stepProps.active = stepIndex === current;

          return cloneElement(child, stepProps);
        })}
      </div>
    );
  }
}

export default Steps;