import React, { Component, ReactNode, CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigContext';
import { tuple } from './utils/type';
import { isValidElement, cloneElement } from './utils/reactNode';

type SpinSize = 'small' | 'default' | 'large';

interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: CSSProperties;
  size?: SpinSize;
  tip?: ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: ReactElement;
  children?: ReactNode;
}

interface SpinState {
  spinning: boolean;
}

let defaultIndicator: ReactElement | null = null;

const omit = <T extends Record<string, any>>(
  obj: T,
  keys: string[]
): Partial<T> => {
  const result: any = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keys.indexOf(symbol as any) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol] = obj[symbol];
      }
    }
  }
  
  return result;
};

const shouldDelaySpinning = (spinning: boolean | undefined, delay: number | undefined): boolean => {
  return !!spinning && !!delay && !isNaN(Number(delay));
};

class Spin extends Component<SpinProps, SpinState> {
  static defaultProps = {
    spinning: true,
    size: 'default' as SpinSize,
    wrapperClassName: '',
  };

  static setDefaultIndicator(indicator: ReactElement): void {
    defaultIndicator = indicator;
  }

  private originalUpdateSpinning: () => void;
  private updateSpinning: (() => void) & { cancel?: () => void };

  constructor(props: SpinProps) {
    super(props);

    const { spinning, delay } = props;
    const shouldDelay = shouldDelaySpinning(spinning, delay);

    this.state = {
      spinning: spinning && !shouldDelay,
    };

    this.originalUpdateSpinning = this.updateSpinningImpl;
    this.updateSpinning = this.originalUpdateSpinning;
    this.debouncifyUpdateSpinning(props);
  }

  componentDidMount(): void {
    this.updateSpinning();
  }

  componentDidUpdate(): void {
    this.debouncifyUpdateSpinning();
    this.updateSpinning();
  }

  componentWillUnmount(): void {
    this.cancelExistingSpin();
  }

  private debouncifyUpdateSpinning = (props?: SpinProps): void => {
    const { delay } = props || this.props;
    
    if (delay) {
      this.cancelExistingSpin();
      this.updateSpinning = debounce(this.originalUpdateSpinning, delay);
    }
  };

  private updateSpinningImpl = (): void => {
    const { spinning } = this.props;
    
    if (this.state.spinning !== spinning) {
      this.setState({ spinning });
    }
  };

  private cancelExistingSpin(): void {
    const { updateSpinning } = this;
    if (updateSpinning && updateSpinning.cancel) {
      updateSpinning.cancel();
    }
  }

  private isNestedPattern(): boolean {
    return !(!this.props || this.props.children === undefined);
  }

  private renderSpinIndicator(prefixCls: string, props: SpinProps): ReactNode {
    const { indicator } = props;
    const dotClassName = `${prefixCls}-dot`;

    if (indicator === null) {
      return null;
    }

    if (isValidElement(indicator)) {
      return cloneElement(indicator, {
        className: classNames(indicator.props.className, dotClassName),
      });
    }

    if (isValidElement(defaultIndicator)) {
      return cloneElement(defaultIndicator, {
        className: classNames(defaultIndicator.props.className, dotClassName),
      });
    }

    return (
      <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
        <i className={`${prefixCls}-dot-item`} />
        <i className={`${prefixCls}-dot-item`} />
        <i className={`${prefixCls}-dot-item`} />
        <i className={`${prefixCls}-dot-item`} />
      </span>
    );
  }

  private renderSpin = (configProps: ConfigConsumerProps): ReactNode => {
    const { getPrefixCls, direction } = configProps;
    const {
      prefixCls: customizePrefixCls,
      className,
      size,
      tip,
      wrapperClassName,
      style,
      ...restProps
    } = this.props;
    const { spinning } = this.state;

    const prefixCls = getPrefixCls('spin', customizePrefixCls);

    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    const divProps = omit(restProps, ['spinning', 'delay', 'indicator']);

    const spinElement = (
      <div {...divProps} style={style} className={spinClassName}>
        {this.renderSpinIndicator(prefixCls, this.props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );

    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });

      return (
        <div
          {...divProps}
          className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}
        >
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </div>
      );
    }

    return spinElement;
  };

  render(): ReactNode {
    return <ConfigConsumer>{this.renderSpin}</ConfigConsumer>;
  }
}

export default Spin;