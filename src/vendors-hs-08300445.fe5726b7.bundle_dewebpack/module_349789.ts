import React, { Component, ReactNode } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

interface ScrollbarContainerProps {
  children: ReactNode;
  className?: string;
  option?: PerfectScrollbar.Options;
  containerRef?: (element: HTMLElement | null) => void;
  onScrollY?: (container: HTMLElement) => void;
  onScrollX?: (container: HTMLElement) => void;
  onScrollUp?: (container: HTMLElement) => void;
  onScrollDown?: (container: HTMLElement) => void;
  onScrollLeft?: (container: HTMLElement) => void;
  onScrollRight?: (container: HTMLElement) => void;
  onYReachStart?: (container: HTMLElement) => void;
  onYReachEnd?: (container: HTMLElement) => void;
  onXReachStart?: (container: HTMLElement) => void;
  onXReachEnd?: (container: HTMLElement) => void;
}

const SCROLL_EVENT_MAP: Readonly<Record<string, keyof ScrollbarContainerProps>> = Object.freeze({
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd'
});

export default class ScrollbarContainer extends Component<ScrollbarContainerProps> {
  static defaultProps: Partial<ScrollbarContainerProps> = {
    className: '',
    option: undefined,
    containerRef: () => {},
    onScrollY: undefined,
    onScrollX: undefined,
    onScrollUp: undefined,
    onScrollDown: undefined,
    onScrollLeft: undefined,
    onScrollRight: undefined,
    onYReachStart: undefined,
    onYReachEnd: undefined,
    onXReachStart: undefined,
    onXReachEnd: undefined
  };

  private _container: HTMLElement | null = null;
  private _handlerByEvent: Map<string, EventListener> = new Map();

  handleRef = (element: HTMLElement | null): void => {
    this._container = element;
    this.props.containerRef?.(element);
  };

  componentDidMount(): void {
    if (!this._container) return;

    PerfectScrollbar.initialize(this._container, this.props.option);

    Object.keys(SCROLL_EVENT_MAP).forEach((eventName) => {
      const propName = SCROLL_EVENT_MAP[eventName];
      const handler = this.props[propName] as ((container: HTMLElement) => void) | undefined;

      if (handler && this._container) {
        const eventHandler = (): void => handler(this._container!);
        this._handlerByEvent.set(eventName, eventHandler);
        this._container.addEventListener(eventName, eventHandler, false);
      }
    });
  }

  componentDidUpdate(): void {
    if (this._container) {
      PerfectScrollbar.update(this._container);
    }
  }

  componentWillUnmount(): void {
    if (!this._container) return;

    this._handlerByEvent.forEach((handler, eventName) => {
      this._container?.removeEventListener(eventName, handler, false);
    });

    this._handlerByEvent.clear();
    PerfectScrollbar.destroy(this._container);
  }

  setScrollTop(value: number): boolean {
    if (!this._container) return false;

    this._container.scrollTop = value;
    PerfectScrollbar.update(this._container);
    return true;
  }

  setScrollLeft(value: number): boolean {
    if (!this._container) return false;

    this._container.scrollLeft = value;
    PerfectScrollbar.update(this._container);
    return true;
  }

  render(): JSX.Element {
    const { children, className = '' } = this.props;

    return (
      <div className={`scrollbar-container ${className}`} ref={this.handleRef}>
        {children}
      </div>
    );
  }
}