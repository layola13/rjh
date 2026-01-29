import React, { Component, createRef, RefObject } from 'react';
import classNames from 'classnames';
import scrollTo from './scrollTo';
import getScroll from './getScroll';
import addEventListener from './addEventListener';
import Affix from '../affix';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import AnchorContext from './context';

interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  targetOffset?: number;
  getContainer?: () => HTMLElement | Window;
  getCurrentAnchor?: () => string;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  children?: React.ReactNode;
}

interface AnchorState {
  activeLink: string | null;
}

interface AnchorLink {
  link: string;
  top: number;
}

type ScrollContainer = HTMLElement | Window | Document;

function getDefaultContainer(): Window {
  return window;
}

function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (!rect.width && !rect.height) {
    return rect.top;
  }

  if (container === window) {
    const documentElement = element.ownerDocument.documentElement;
    return rect.top - documentElement.clientTop;
  }

  return rect.top - (container as HTMLElement).getBoundingClientRect().top;
}

const ANCHOR_HASH_REGEX = /#(\S+)$/;

class Anchor extends Component<AnchorProps, AnchorState> {
  static defaultProps = {
    affix: true,
    showInkInFixed: false,
  };

  static contextType = ConfigContext;
  context!: ConfigConsumerProps;

  state: AnchorState = {
    activeLink: null,
  };

  wrapperRef: RefObject<HTMLDivElement> = createRef();
  inkNode: HTMLSpanElement | null = null;
  links: string[] = [];
  animating = false;
  scrollContainer: ScrollContainer | null = null;
  scrollEvent: { remove: () => void } | null = null;
  prefixCls = '';

  componentDidMount(): void {
    this.scrollContainer = this.getContainer();
    this.scrollEvent = addEventListener(
      this.scrollContainer,
      'scroll',
      this.handleScroll
    );
    this.handleScroll();
  }

  componentDidUpdate(): void {
    if (this.scrollEvent) {
      const currentContainer = this.getContainer();
      if (this.scrollContainer !== currentContainer) {
        this.scrollContainer = currentContainer;
        this.scrollEvent.remove();
        this.scrollEvent = addEventListener(
          this.scrollContainer,
          'scroll',
          this.handleScroll
        );
        this.handleScroll();
      }
    }
    this.updateInk();
  }

  componentWillUnmount(): void {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  registerLink = (link: string): void => {
    if (!this.links.includes(link)) {
      this.links.push(link);
    }
  };

  unregisterLink = (link: string): void => {
    const index = this.links.indexOf(link);
    if (index !== -1) {
      this.links.splice(index, 1);
    }
  };

  getContainer = (): HTMLElement | Window => {
    const { getTargetContainer } = this.context;
    return (this.props.getContainer || getTargetContainer || getDefaultContainer)();
  };

  handleScrollTo = (link: string): void => {
    const { offsetTop, targetOffset } = this.props;
    this.setCurrentActiveLink(link);

    const container = this.getContainer();
    const scrollTop = getScroll(container, true);
    const match = ANCHOR_HASH_REGEX.exec(link);

    if (!match) {
      return;
    }

    const targetElement = document.getElementById(match[1]);
    if (!targetElement) {
      return;
    }

    const elementOffsetTop = scrollTop + getOffsetTop(targetElement, container);
    const offset = targetOffset !== undefined ? targetOffset : offsetTop || 0;
    const targetScrollTop = elementOffsetTop - offset;

    this.animating = true;
    scrollTo(targetScrollTop, {
      callback: () => {
        this.animating = false;
      },
      getContainer: this.getContainer,
    });
  };

  saveInkNode = (node: HTMLSpanElement | null): void => {
    this.inkNode = node;
  };

  setCurrentActiveLink = (link: string): void => {
    const { activeLink } = this.state;
    const { onChange } = this.props;

    if (activeLink === link) {
      return;
    }

    this.setState({ activeLink: link });
    if (onChange) {
      onChange(link);
    }
  };

  handleScroll = (): void => {
    if (this.animating) {
      return;
    }

    const { offsetTop, bounds, targetOffset } = this.props;
    const offset = targetOffset !== undefined ? targetOffset : offsetTop || 0;
    const currentActiveLink = this.getCurrentAnchor(offset, bounds);
    this.setCurrentActiveLink(currentActiveLink);
  };

  getCurrentAnchor = (offsetTop = 0, bounds = 5): string => {
    const { getCurrentAnchor } = this.props;

    if (typeof getCurrentAnchor === 'function') {
      return getCurrentAnchor();
    }

    const linkSections: AnchorLink[] = [];
    const container = this.getContainer();

    this.links.forEach((link) => {
      const match = ANCHOR_HASH_REGEX.exec(link.toString());
      if (!match) {
        return;
      }

      const element = document.getElementById(match[1]);
      if (!element) {
        return;
      }

      const top = getOffsetTop(element, container);
      if (top < offsetTop + bounds) {
        linkSections.push({ link, top });
      }
    });

    if (!linkSections.length) {
      return '';
    }

    return linkSections.reduce((prev, curr) => {
      return curr.top > prev.top ? curr : prev;
    }).link;
  };

  updateInk = (): void => {
    const { prefixCls } = this;
    const wrapperElement = this.wrapperRef.current;

    if (!wrapperElement) {
      return;
    }

    const activeTitleElement = wrapperElement.getElementsByClassName(
      `${prefixCls}-link-title-active`
    )[0] as HTMLElement | undefined;

    if (activeTitleElement && this.inkNode) {
      this.inkNode.style.top = `${activeTitleElement.offsetTop + activeTitleElement.clientHeight / 2 - 4.5}px`;
    }
  };

  render(): React.ReactNode {
    const { getPrefixCls, direction } = this.context;
    const {
      prefixCls: customizePrefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
    } = this.props;
    const { activeLink } = this.state;

    const prefixCls = getPrefixCls('anchor', customizePrefixCls);
    this.prefixCls = prefixCls;

    const inkBallClassName = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink,
    });

    const wrapperClassName = classNames(
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    const anchorClassName = classNames(prefixCls, {
      fixed: !affix && !showInkInFixed,
    });

    const wrapperStyle: React.CSSProperties = {
      maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
      ...style,
    };

    const anchorContent = (
      <div ref={this.wrapperRef} className={wrapperClassName} style={wrapperStyle}>
        <div className={anchorClassName}>
          <div className={`${prefixCls}-ink`}>
            <span className={inkBallClassName} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    return (
      <AnchorContext.Provider
        value={{
          registerLink: this.registerLink,
          unregisterLink: this.unregisterLink,
          activeLink: this.state.activeLink,
          scrollTo: this.handleScrollTo,
          onClick: this.props.onClick,
        }}
      >
        {affix ? (
          <Affix offsetTop={offsetTop} target={this.getContainer}>
            {anchorContent}
          </Affix>
        ) : (
          anchorContent
        )}
      </AnchorContext.Provider>
    );
  }
}

export default Anchor;