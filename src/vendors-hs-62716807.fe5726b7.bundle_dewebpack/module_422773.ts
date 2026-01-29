import React, { Component, ReactElement, cloneElement } from 'react';
import { formatCountdown, FormatConfig } from './formatCountdown';
import StatisticComponent from './Statistic';

interface CountdownProps {
  value: string | number | Date;
  format?: string;
  onFinish?: () => void;
}

function getTimestamp(value: string | number | Date): number {
  return new Date(value).getTime();
}

const DEFAULT_UPDATE_INTERVAL = 33.333333333333336;

export default class Countdown extends Component<CountdownProps> {
  static defaultProps = {
    format: 'HH:mm:ss'
  };

  private countdownId?: number;

  componentDidMount(): void {
    this.syncTimer();
  }

  componentDidUpdate(): void {
    this.syncTimer();
  }

  componentWillUnmount(): void {
    this.stopTimer();
  }

  private syncTimer = (): void => {
    if (getTimestamp(this.props.value) >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  private startTimer = (): void => {
    if (!this.countdownId) {
      this.countdownId = window.setInterval(() => {
        this.forceUpdate();
      }, DEFAULT_UPDATE_INTERVAL);
    }
  };

  private stopTimer = (): void => {
    const { onFinish, value } = this.props;
    
    if (this.countdownId) {
      clearInterval(this.countdownId);
      this.countdownId = undefined;
      
      const timestamp = getTimestamp(value);
      if (onFinish && timestamp < Date.now()) {
        onFinish();
      }
    }
  };

  private formatCountdown = (
    value: number,
    config: FormatConfig
  ): string => {
    const { format } = this.props;
    return formatCountdown(value, {
      ...config,
      format
    });
  };

  private valueRender = (element: ReactElement): ReactElement => {
    return cloneElement(element, {
      title: undefined
    });
  };

  render(): ReactElement {
    return (
      <StatisticComponent
        valueRender={this.valueRender}
        {...this.props}
        formatter={this.formatCountdown}
      />
    );
  }
}