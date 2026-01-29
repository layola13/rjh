import React, { Component, ReactNode, CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';

interface StepIconOptions {
  index: number;
  status: StepStatus;
  title: ReactNode;
  description: ReactNode;
  node?: ReactNode;
}

type ProgressDotRender = (iconDot: ReactNode, options: Omit<StepIconOptions, 'node'>) => ReactNode;
type StepIconRender = (options: StepIconOptions) => ReactNode;

type StepStatus = 'wait' | 'process' | 'finish' | 'error';

interface StepIcons {
  finish?: ReactNode;
  error?: ReactNode;
}

interface StepProps {
  className?: string;
  prefixCls: string;
  style?: CSSProperties;
  active?: boolean;
  status?: StepStatus;
  iconPrefix?: string;
  icon?: ReactNode;
  wrapperStyle?: CSSProperties;
  stepNumber?: number;
  disabled?: boolean;
  description?: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  progressDot?: boolean | ProgressDotRender;
  stepIcon?: StepIconRender;
  tailContent?: ReactNode;
  icons?: StepIcons;
  stepIndex: number;
  onStepClick?: (index: number) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export default class Step extends Component<StepProps> {
  onClick = (...args: unknown[]): void => {
    const { onClick, onStepClick, stepIndex } = this.props;
    
    if (onClick) {
      onClick.apply(void 0, args as [MouseEvent<HTMLDivElement>]);
    }
    
    if (onStepClick) {
      onStepClick(stepIndex);
    }
  };

  renderIconNode(): ReactNode {
    const {
      prefixCls,
      progressDot,
      stepIcon,
      stepNumber,
      status,
      title,
      description,
      icon,
      iconPrefix,
      icons
    } = this.props;

    const iconClassName = classNames(
      `${prefixCls}-icon`,
      `${iconPrefix}icon`,
      {
        [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
        [`${iconPrefix}icon-check`]: !icon && status === 'finish' && (!icons || !icons.finish),
        [`${iconPrefix}icon-cross`]: !icon && status === 'error' && (!icons || !icons.error)
      }
    );

    const iconDot = <span className={`${prefixCls}-icon-dot`} />;

    let iconNode: ReactNode;

    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = (
          <span className={`${prefixCls}-icon`}>
            {progressDot(iconDot, {
              index: stepNumber! - 1,
              status: status!,
              title,
              description
            })}
          </span>
        );
      } else {
        iconNode = <span className={`${prefixCls}-icon`}>{iconDot}</span>;
      }
    } else if (icon && !isString(icon)) {
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
    } else if (icons?.finish && status === 'finish') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
    } else if (icons?.error && status === 'error') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = <span className={iconClassName} />;
    } else {
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }

    if (stepIcon) {
      iconNode = stepIcon({
        index: stepNumber! - 1,
        status: status!,
        title,
        description,
        node: iconNode
      });
    }

    return iconNode;
  }

  render(): ReactNode {
    const {
      className,
      prefixCls,
      style,
      active,
      status = 'wait',
      disabled,
      description,
      title,
      subTitle,
      tailContent,
      onStepClick,
      onClick,
      icon,
      ...restProps
    } = this.props;

    const classString = classNames(
      `${prefixCls}-item`,
      `${prefixCls}-item-${status}`,
      className,
      {
        [`${prefixCls}-item-custom`]: icon,
        [`${prefixCls}-item-active`]: active,
        [`${prefixCls}-item-disabled`]: disabled === true
      }
    );

    const stepStyle: CSSProperties = { ...style };

    const containerProps: React.HTMLAttributes<HTMLDivElement> = {};

    if (onStepClick && !disabled) {
      containerProps.role = 'button';
      containerProps.tabIndex = 0;
      containerProps.onClick = this.onClick;
    }

    return (
      <div {...restProps} className={classString} style={stepStyle}>
        <div
          {...containerProps}
          onClick={onClick}
          className={`${prefixCls}-item-container`}
        >
          <div className={`${prefixCls}-item-tail`}>{tailContent}</div>
          <div className={`${prefixCls}-item-icon`}>
            {this.renderIconNode()}
          </div>
          <div className={`${prefixCls}-item-content`}>
            <div className={`${prefixCls}-item-title`}>
              {title}
              {subTitle && (
                <div
                  title={typeof subTitle === 'string' ? subTitle : undefined}
                  className={`${prefixCls}-item-subtitle`}
                >
                  {subTitle}
                </div>
              )}
            </div>
            {description && (
              <div className={`${prefixCls}-item-description`}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}