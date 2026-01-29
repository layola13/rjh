import React, { Component, createRef, RefObject } from 'react';
import raf from 'raf';
import Portal from './Portal';
import ScrollLocker from './ScrollLocker';
import { setStyle, removeStyle } from './styleUtils';
import { adjustBodyScrollbar } from './scrollbarUtils';

interface ContainerElement {
  appendChild(child: HTMLElement): void;
  removeChild(child: HTMLElement): void;
}

type GetContainer = (() => HTMLElement) | HTMLElement | string;

interface PortalWrapperProps {
  children: (context: PortalContext) => React.ReactNode;
  getContainer?: GetContainer;
  visible?: boolean;
  forceRender?: boolean;
  wrapperClassName?: string;
}

interface PortalContext {
  getOpenCount: () => number;
  getContainer: () => HTMLElement | null;
  switchScrollingEffect: () => void;
  scrollLocker: ScrollLocker;
}

let openCount = 0;
const isClient = typeof window !== 'undefined';
let cachedStyles: Record<string, string> = {};

const getContainerElement = (getContainer?: GetContainer): HTMLElement | null => {
  if (!isClient) {
    return null;
  }

  if (getContainer) {
    if (typeof getContainer === 'string') {
      const elements = document.querySelectorAll<HTMLElement>(getContainer);
      return elements[0] || null;
    }

    if (typeof getContainer === 'function') {
      return getContainer();
    }

    if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
      return getContainer;
    }
  }

  return document.body;
};

export const getOpenCount = (): number => {
  return openCount;
};

class PortalWrapper extends Component<PortalWrapperProps> {
  private container?: HTMLDivElement;
  private componentRef: RefObject<any>;
  private rafId?: number;
  private scrollLocker: ScrollLocker;

  constructor(props: PortalWrapperProps) {
    super(props);
    this.componentRef = createRef();
    this.scrollLocker = new ScrollLocker({
      container: getContainerElement(props.getContainer)
    });
  }

  componentDidMount(): void {
    this.updateOpenCount();

    if (!this.attachToParent()) {
      this.rafId = raf(() => {
        this.forceUpdate();
      });
    }
  }

  componentDidUpdate(prevProps: PortalWrapperProps): void {
    this.updateOpenCount(prevProps);
    this.updateScrollLocker(prevProps);
    this.setWrapperClassName();
    this.attachToParent();
  }

  componentWillUnmount(): void {
    const { visible, getContainer } = this.props;

    if (isClient && getContainerElement(getContainer) === document.body) {
      openCount = visible && openCount ? openCount - 1 : openCount;
    }

    this.removeCurrentContainer();

    if (this.rafId !== undefined) {
      raf.cancel(this.rafId);
    }
  }

  private updateScrollLocker = (prevProps?: PortalWrapperProps): void => {
    const prevVisible = prevProps?.visible;
    const { getContainer, visible } = this.props;

    if (
      visible &&
      visible !== prevVisible &&
      isClient &&
      getContainerElement(getContainer) !== this.scrollLocker.getContainer()
    ) {
      this.scrollLocker.reLock({
        container: getContainerElement(getContainer)
      });
    }
  };

  private updateOpenCount = (prevProps?: PortalWrapperProps): void => {
    const prevVisible = prevProps?.visible;
    const prevGetContainer = prevProps?.getContainer;
    const { visible, getContainer } = this.props;

    if (visible !== prevVisible && isClient && getContainerElement(getContainer) === document.body) {
      if (visible && !prevVisible) {
        openCount += 1;
      } else if (prevProps) {
        openCount -= 1;
      }
    }

    const containerChanged =
      typeof getContainer === 'function' && typeof prevGetContainer === 'function'
        ? getContainer.toString() !== prevGetContainer.toString()
        : getContainer !== prevGetContainer;

    if (containerChanged) {
      this.removeCurrentContainer();
    }
  };

  private attachToParent = (force = false): boolean => {
    if (force || (this.container && !this.container.parentNode)) {
      const parentElement = getContainerElement(this.props.getContainer);
      if (parentElement) {
        parentElement.appendChild(this.container!);
        return true;
      }
    }
    return true;
  };

  private getContainer = (): HTMLElement | null => {
    if (!isClient) {
      return null;
    }

    if (!this.container) {
      this.container = document.createElement('div');
      this.attachToParent(true);
    }

    this.setWrapperClassName();
    return this.container;
  };

  private setWrapperClassName = (): void => {
    const { wrapperClassName } = this.props;
    if (this.container && wrapperClassName && wrapperClassName !== this.container.className) {
      this.container.className = wrapperClassName;
    }
  };

  private removeCurrentContainer = (): void => {
    this.container?.parentNode?.removeChild(this.container);
  };

  private switchScrollingEffect = (): void => {
    if (openCount !== 1 || Object.keys(cachedStyles).length) {
      if (!openCount) {
        removeStyle(cachedStyles);
        cachedStyles = {};
        adjustBodyScrollbar(true);
      }
    } else {
      adjustBodyScrollbar();
      cachedStyles = setStyle({
        overflow: 'hidden',
        overflowX: 'hidden',
        overflowY: 'hidden'
      });
    }
  };

  render(): React.ReactNode {
    const { children, forceRender, visible } = this.props;
    let renderedContent: React.ReactNode = null;

    const context: PortalContext = {
      getOpenCount: () => openCount,
      getContainer: this.getContainer,
      switchScrollingEffect: this.switchScrollingEffect,
      scrollLocker: this.scrollLocker
    };

    if (forceRender || visible || this.componentRef.current) {
      renderedContent = (
        <Portal getContainer={this.getContainer} ref={this.componentRef}>
          {children(context)}
        </Portal>
      );
    }

    return renderedContent;
  }
}

export default PortalWrapper;