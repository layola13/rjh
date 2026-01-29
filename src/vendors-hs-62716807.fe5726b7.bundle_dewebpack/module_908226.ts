import React, { Component, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import ResizeObserver from './ResizeObserver';
import { ConfigContext } from './ConfigContext';
import { throttleByAnimationFrameDecorator } from './utils';
import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom,
} from './utils/dom';

enum AffixStatus {
  None = 0,
  Prepare = 1,
}

interface AffixProps {
  prefixCls?: string;
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => Window | HTMLElement | null;
  onChange?: (affixed: boolean) => void;
  children?: ReactNode;
}

interface AffixState {
  status: AffixStatus;
  lastAffix: boolean;
  prevTarget: Window | HTMLElement | null;
  affixStyle?: CSSProperties;
  placeholderStyle?: CSSProperties;
}

interface TargetRect {
  top: number;
  bottom: number;
  width: number;
  height: number;
}

function getDefaultTarget(): Window | null {
  return typeof window !== 'undefined' ? window : null;
}

class Affix extends Component<AffixProps, AffixState> {
  static contextType = ConfigContext;
  context!: React.ContextType<typeof ConfigContext>;

  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null,
  };

  private placeholderNode: HTMLDivElement | null = null;
  private fixedNode: HTMLDivElement | null = null;
  private timeout?: number;

  componentDidMount(): void {
    const targetFunc = this.getTargetFunc();
    if (targetFunc) {
      this.timeout = window.setTimeout(() => {
        const target = targetFunc();
        if (target) {
          addObserveTarget(target, this);
          this.updatePosition();
        }
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps): void {
    const { prevTarget } = this.state;
    const targetFunc = this.getTargetFunc();
    let currentTarget: Window | HTMLElement | null = null;

    if (targetFunc) {
      currentTarget = targetFunc() || null;
    }

    if (prevTarget !== currentTarget) {
      removeObserveTarget(this);
      if (currentTarget) {
        addObserveTarget(currentTarget, this);
        this.updatePosition();
      }
      this.setState({ prevTarget: currentTarget });
    }

    if (
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.updatePosition();
    }

    this.measure();
  }

  componentWillUnmount(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    removeObserveTarget(this);
    this.updatePosition.cancel();
    this.lazyUpdatePosition.cancel();
  }

  getTargetFunc(): (() => Window | HTMLElement | null) {
    const { getTargetContainer } = this.context;
    const { target } = this.props;
    return target !== undefined ? target : getTargetContainer || getDefaultTarget;
  }

  getOffsetTop(): number | undefined {
    const { offsetBottom, offsetTop } = this.props;
    if (offsetBottom === undefined && offsetTop === undefined) {
      return 0;
    }
    return offsetTop;
  }

  getOffsetBottom(): number | undefined {
    return this.props.offsetBottom;
  }

  savePlaceholderNode = (node: HTMLDivElement | null): void => {
    this.placeholderNode = node;
  };

  saveFixedNode = (node: HTMLDivElement | null): void => {
    this.fixedNode = node;
  };

  measure = (): void => {
    const { status, lastAffix } = this.state;
    const { onChange } = this.props;
    const targetFunc = this.getTargetFunc();

    if (
      status !== AffixStatus.Prepare ||
      !this.fixedNode ||
      !this.placeholderNode ||
      !targetFunc
    ) {
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();
    const target = targetFunc();

    if (!target) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };

    const targetRect = getTargetRect(target);
    const placeholderRect = getTargetRect(this.placeholderNode);
    const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;

    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }

    this.setState(newState as AffixState);
  };

  prepareMeasure = (): void => {
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });
  };

  @throttleByAnimationFrameDecorator()
  updatePosition(): void {
    this.prepareMeasure();
  }

  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition(): void {
    const targetFunc = this.getTargetFunc();
    const { affixStyle } = this.state;

    if (!targetFunc || !affixStyle) {
      this.prepareMeasure();
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();
    const target = targetFunc();

    if (!target || !this.placeholderNode) {
      this.prepareMeasure();
      return;
    }

    const targetRect = getTargetRect(target);
    const placeholderRect = getTargetRect(this.placeholderNode);
    const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

    if (
      (fixedTop !== undefined && affixStyle.top === fixedTop) ||
      (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
    ) {
      return;
    }

    this.prepareMeasure();
  }

  render(): ReactNode {
    const { getPrefixCls } = this.context;
    const { affixStyle, placeholderStyle } = this.state;
    const { prefixCls, children } = this.props;

    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: affixStyle,
    });

    const restProps = omit(this.props, [
      'prefixCls',
      'offsetTop',
      'offsetBottom',
      'target',
      'onChange',
    ]);

    return (
      <ResizeObserver
        onResize={() => {
          this.updatePosition();
        }}
      >
        <div {...restProps} ref={this.savePlaceholderNode}>
          {affixStyle && (
            <div style={placeholderStyle} aria-hidden="true" />
          )}
          <div className={className} ref={this.saveFixedNode} style={affixStyle}>
            <ResizeObserver
              onResize={() => {
                this.updatePosition();
              }}
            >
              {children}
            </ResizeObserver>
          </div>
        </div>
      </ResizeObserver>
    );
  }
}

export default Affix;