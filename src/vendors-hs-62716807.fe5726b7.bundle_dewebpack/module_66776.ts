import React from 'react';
import classNames from 'classnames';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { ConfigConsumer } from '../config-provider';
import { getSuccessPercent, validProgress } from './utils';
import Line from './Line';
import Circle from './Circle';
import Steps from './Steps';
import warning from '../_util/warning';
import omit from '../_util/omit';

type ProgressType = 'line' | 'circle' | 'dashboard';
type ProgressSize = 'default' | 'small';
type ProgressStatus = 'normal' | 'exception' | 'active' | 'success';
type StringGradients = Record<string, string>;
type ProgressGradient = { direction?: string } & StringGradients;

interface SuccessProps {
  percent?: number;
  strokeColor?: string;
}

interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: ProgressStatus;
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'square';
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
  successPercent?: number;
  direction?: 'ltr' | 'rtl';
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

const validStatuses: ProgressStatus[] = ['normal', 'exception', 'active', 'success'];

class Progress extends React.Component<ProgressProps> {
  static defaultProps: Partial<ProgressProps> = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: null,
    size: 'default',
    gapDegree: undefined,
    strokeLinecap: 'round',
  };

  getPercentNumber(): number {
    const { percent = 0 } = this.props;
    const successPercent = getSuccessPercent(this.props);
    return parseInt(
      successPercent !== undefined ? successPercent.toString() : percent.toString(),
      10
    );
  }

  getProgressStatus(): ProgressStatus {
    const { status } = this.props;
    if (validStatuses.indexOf(status!) < 0 && this.getPercentNumber() >= 100) {
      return 'success';
    }
    return status || 'normal';
  }

  renderProcessInfo(prefixCls: string, progressStatus: ProgressStatus): React.ReactNode {
    const { showInfo, format, type, percent } = this.props;
    const successPercent = getSuccessPercent(this.props);

    if (!showInfo) {
      return null;
    }

    const isLineType = type === 'line';
    let text: React.ReactNode;

    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      const formatter = format || ((percentValue?: number) => `${percentValue}%`);
      text = formatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? <CloseOutlined /> : <CloseCircleFilled />;
    } else if (progressStatus === 'success') {
      text = isLineType ? <CheckOutlined /> : <CheckCircleFilled />;
    }

    return (
      <span
        className={`${prefixCls}-text`}
        title={typeof text === 'string' ? text : undefined}
      >
        {text}
      </span>
    );
  }

  renderProgress = (configProps: ConfigConsumerProps): React.ReactNode => {
    const { getPrefixCls, direction } = configProps;
    const {
      prefixCls: customizePrefixCls,
      className,
      size,
      type,
      steps,
      showInfo,
      strokeColor,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('progress', customizePrefixCls);
    const progressStatus = this.getProgressStatus();
    const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);

    warning(
      !('successPercent' in this.props),
      'Progress',
      '`successPercent` is deprecated. Please use `success.percent` instead.'
    );

    let progress: React.ReactNode;
    if (type === 'line') {
      progress = steps ? (
        <Steps
          {...this.props}
          strokeColor={typeof strokeColor === 'string' ? strokeColor : undefined}
          prefixCls={prefixCls}
          steps={steps}
        >
          {progressInfo}
        </Steps>
      ) : (
        <Line {...this.props} prefixCls={prefixCls} direction={direction}>
          {progressInfo}
        </Line>
      );
    } else if (type === 'circle' || type === 'dashboard') {
      progress = (
        <Circle {...this.props} prefixCls={prefixCls} progressStatus={progressStatus}>
          {progressInfo}
        </Circle>
      );
    }

    const classString = classNames(
      prefixCls,
      {
        [`${prefixCls}-${(type === 'dashboard' ? 'circle' : steps && 'steps') || type}`]: true,
        [`${prefixCls}-status-${progressStatus}`]: true,
        [`${prefixCls}-show-info`]: showInfo,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    return (
      <div
        {...omit(restProps, [
          'status',
          'format',
          'trailColor',
          'strokeWidth',
          'width',
          'gapDegree',
          'gapPosition',
          'strokeLinecap',
          'percent',
          'success',
          'successPercent',
        ])}
        className={classString}
      >
        {progress}
      </div>
    );
  };

  render(): React.ReactNode {
    return <ConfigConsumer>{this.renderProgress}</ConfigConsumer>;
  }
}

export default Progress;