import React, { Component, CSSProperties, ReactNode } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

interface ScrollEventMap {
  'ps-scroll-y': 'onScrollY';
  'ps-scroll-x': 'onScrollX';
  'ps-scroll-up': 'onScrollUp';
  'ps-scroll-down': 'onScrollDown';
  'ps-scroll-left': 'onScrollLeft';
  'ps-scroll-right': 'onScrollRight';
  'ps-y-reach-start': 'onYReachStart';
  'ps-y-reach-end': 'onYReachEnd';
  'ps-x-reach-start': 'onXReachStart';
  'ps-x-reach-end': 'onXReachEnd';
}

const SCROLL_EVENT_MAP: Readonly<ScrollEventMap> = Object.freeze({
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd',
});

type ScrollEventHandler = (container: HTMLElement) => void;

interface PerfectScrollbarOptions {
  [key: string]: unknown;
}

interface ScrollbarContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  option?: PerfectScrollbarOptions;
  options?: PerfectScrollbarOptions;
  containerRef?: (ref: HTMLElement | null) => void;
  onScrollY?: ScrollEventHandler;
  onScrollX?: ScrollEventHandler;
  onScrollUp?: ScrollEventHandler;
  onScrollDown?: ScrollEventHandler;
  onScrollLeft?: ScrollEventHandler;
  onScrollRight?: ScrollEventHandler;
  onYReachStart?: ScrollEventHandler;
  onYReachEnd?: ScrollEventHandler;
  onXReachStart?: ScrollEventHandler;
  onXReachEnd?: ScrollEventHandler;
  onSync?: (ps: PerfectScrollbar) => void;
  component?: string;
  [key: string]: unknown;
}

class ScrollbarContainer extends Component<ScrollbarContainerProps> {
  static defaultProps: Partial<ScrollbarContainerProps> = {
    className: '',
    style: undefined,
    option: undefined,
    options: undefined,
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
    onXReachEnd: undefined,
    onSync: (ps: PerfectScrollbar) => ps.update(),
    component: 'div',
  };

  private _container: HTMLElement | null = null;
  private _ps: PerfectScrollbar | null = null;
  private _handlerByEvent: Record<string, EventListener> = {};

  constructor(props: ScrollbarContainerProps) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount(): void {
    if (this.props.option) {
      console.warn('react-perfect-scrollbar: the "option" prop has been deprecated in favor of "options"');
    }
    
    if (this._container) {
      this._ps = new PerfectScrollbar(this._container, this.props.options ?? this.props.option);
      this._updateEventHook();
      this._updateClassName();
    }
  }

  componentDidUpdate(prevProps: ScrollbarContainerProps): void {
    this._updateEventHook(prevProps);
    this.updateScroll();
    
    if (prevProps.className !== this.props.className) {
      this._updateClassName();
    }
  }

  componentWillUnmount(): void {
    Object.keys(this._handlerByEvent).forEach((eventName) => {
      const handler = this._handlerByEvent[eventName];
      if (handler && this._container) {
        this._container.removeEventListener(eventName, handler, false);
      }
    });
    
    this._handlerByEvent = {};
    this._ps?.destroy();
    this._ps = null;
  }

  private _updateEventHook(prevProps: ScrollbarContainerProps = {}): void {
    Object.keys(SCROLL_EVENT_MAP).forEach((eventName) => {
      const propName = SCROLL_EVENT_MAP[eventName as keyof ScrollEventMap];
      const currentHandler = this.props[propName] as ScrollEventHandler | undefined;
      const prevHandler = prevProps[propName] as ScrollEventHandler | undefined;

      if (currentHandler !== prevHandler) {
        if (prevHandler) {
          const oldListener = this._handlerByEvent[eventName];
          if (oldListener && this._container) {
            this._container.removeEventListener(eventName, oldListener, false);
          }
          this._handlerByEvent[eventName] = null as unknown as EventListener;
        }

        if (currentHandler && this._container) {
          const newListener = () => currentHandler(this._container!);
          this._container.addEventListener(eventName, newListener, false);
          this._handlerByEvent[eventName] = newListener;
        }
      }
    });
  }

  private _updateClassName(): void {
    const { className } = this.props;
    
    if (!this._container) return;

    const psClasses = this._container.className
      .split(' ')
      .filter((cls) => cls.match(/^ps([-_].+|)$/))
      .join(' ');

    this._container.className = `scrollbar-container${className ? ` ${className}` : ''}${psClasses ? ` ${psClasses}` : ''}`;
  }

  updateScroll(): void {
    if (this._ps && this.props.onSync) {
      this.props.onSync(this._ps);
    }
  }

  handleRef(element: HTMLElement | null): void {
    this._container = element;
    this.props.containerRef?.(element);
  }

  render(): ReactNode {
    const {
      className,
      style,
      option,
      options,
      containerRef,
      onScrollY,
      onScrollX,
      onScrollUp,
      onScrollDown,
      onScrollLeft,
      onScrollRight,
      onYReachStart,
      onYReachEnd,
      onXReachStart,
      onXReachEnd,
      component = 'div',
      onSync,
      children,
      ...restProps
    } = this.props;

    const ElementType = component as keyof JSX.IntrinsicElements;

    return React.createElement(
      ElementType,
      {
        style,
        ref: this.handleRef,
        ...restProps,
      },
      children
    );
  }
}

export default ScrollbarContainer;