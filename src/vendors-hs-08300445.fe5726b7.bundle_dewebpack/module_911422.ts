import React, { Component, RefObject, createRef, cloneElement, ReactElement, ReactNode } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import SubMenu from './SubMenu';
import { menuAllProps, setStyle, getWidth } from './utils';

interface MenuItemSize {
  width: number;
}

interface OverflowableMenuProps {
  prefixCls: string;
  overflowedIndicator?: ReactNode;
  level: number;
  mode: 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline';
  theme?: string;
  tag?: string;
  className: string;
  visible?: boolean;
  children?: ReactElement[];
  [key: string]: unknown;
}

interface OverflowableMenuState {
  lastVisibleIndex: number | undefined;
}

const MENUITEM_OVERFLOWED_CLASSNAME = 'menuitem-overflowed';

class OverflowableMenu extends Component<OverflowableMenuProps, OverflowableMenuState> {
  static defaultProps = {
    tag: 'div',
    className: '',
  };

  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private originalTotalWidth = 0;
  private overflowedItems: ReactElement[] = [];
  private menuItemSizes: number[] = [];
  private cancelFrameId: number | null = null;
  private overflowedIndicatorWidth = 0;
  private childRef: RefObject<HTMLElement> = createRef();

  state: OverflowableMenuState = {
    lastVisibleIndex: undefined,
  };

  componentDidMount(): void {
    this.setChildrenWidthAndResize();

    if (this.props.level === 1 && this.props.mode === 'horizontal') {
      const containerNode = this.childRef.current;
      if (!containerNode) return;

      this.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(() => {
          if (this.cancelFrameId !== null) {
            cancelAnimationFrame(this.cancelFrameId);
          }
          this.cancelFrameId = requestAnimationFrame(this.setChildrenWidthAndResize);
        });
      });

      const nodesToObserve = [...Array.from(containerNode.children), containerNode];
      nodesToObserve.forEach((node) => {
        this.resizeObserver?.observe(node as Element);
      });

      if (typeof MutationObserver !== 'undefined') {
        this.mutationObserver = new MutationObserver(() => {
          this.resizeObserver?.disconnect();
          nodesToObserve.forEach((node) => {
            this.resizeObserver?.observe(node as Element);
          });
          this.setChildrenWidthAndResize();
        });

        this.mutationObserver.observe(containerNode, {
          attributes: false,
          childList: true,
          subTree: false,
        });
      }
    }
  }

  componentWillUnmount(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    if (this.cancelFrameId !== null) {
      cancelAnimationFrame(this.cancelFrameId);
    }
  }

  private getMenuItemNodes = (): HTMLElement[] => {
    const { prefixCls } = this.props;
    const containerNode = this.childRef.current;
    if (!containerNode) return [];

    return Array.from(containerNode.children).filter((element) => {
      const classList = (element as HTMLElement).className.split(' ');
      return classList.indexOf(`${prefixCls}-overflowed-submenu`) < 0;
    }) as HTMLElement[];
  };

  private getOverflowedSubMenuItem = (
    eventKey: string,
    overflowedItems: ReactElement[],
    isPlaceholder = false
  ): ReactElement | null => {
    const { overflowedIndicator, level, mode, prefixCls, theme } = this.props;

    if (level !== 1 || mode !== 'horizontal') {
      return null;
    }

    const firstChildProps = this.props.children?.[0]?.props;
    if (!firstChildProps) return null;

    const { children, title, style, ...restProps } = firstChildProps;

    let submenuStyle = { ...style };
    let submenuClassName = `${prefixCls}-overflowed-indicator`;
    let submenuKey = `${prefixCls}-overflowed-indicator`;

    if (overflowedItems.length === 0 && isPlaceholder !== true) {
      submenuStyle = {
        ...submenuStyle,
        display: 'none',
      };
    } else if (isPlaceholder) {
      submenuStyle = {
        ...submenuStyle,
        visibility: 'hidden',
        position: 'absolute',
      };
      submenuClassName = `${submenuClassName}-placeholder`;
      submenuKey = `${submenuKey}-placeholder`;
    }

    const popupClassName = theme ? `${prefixCls}-${theme}` : '';
    const subMenuProps: Record<string, unknown> = {};

    menuAllProps.forEach((propName) => {
      if (restProps[propName] !== undefined) {
        subMenuProps[propName] = restProps[propName];
      }
    });

    return (
      <SubMenu
        title={overflowedIndicator}
        className={`${prefixCls}-overflowed-submenu`}
        popupClassName={popupClassName}
        {...subMenuProps}
        key={submenuKey}
        eventKey={submenuKey}
        disabled={false}
        style={submenuStyle}
      >
        {overflowedItems}
      </SubMenu>
    );
  };

  private setChildrenWidthAndResize = (): void => {
    if (this.props.mode !== 'horizontal') return;

    const containerNode = this.childRef.current;
    if (!containerNode) return;

    const children = containerNode.children;
    if (!children || children.length === 0) return;

    const lastChild = children[children.length - 1] as HTMLElement;
    setStyle(lastChild, 'display', 'inline-block');

    const menuItemNodes = this.getMenuItemNodes();
    const overflowedNodes = menuItemNodes.filter((element) => {
      return element.className.split(' ').indexOf(MENUITEM_OVERFLOWED_CLASSNAME) >= 0;
    });

    overflowedNodes.forEach((element) => {
      setStyle(element, 'display', 'inline-block');
    });

    this.menuItemSizes = menuItemNodes.map((element) => getWidth(element, true));

    overflowedNodes.forEach((element) => {
      setStyle(element, 'display', 'none');
    });

    this.overflowedIndicatorWidth = getWidth(
      containerNode.children[containerNode.children.length - 1] as HTMLElement,
      true
    );

    this.originalTotalWidth = this.menuItemSizes.reduce((sum, width) => sum + width, 0);

    this.handleResize();

    setStyle(lastChild, 'display', 'none');
  };

  private handleResize = (): void => {
    if (this.props.mode !== 'horizontal') return;

    const containerNode = this.childRef.current;
    if (!containerNode) return;

    const containerWidth = getWidth(containerNode);
    this.overflowedItems = [];

    let lastVisibleIndex: number | undefined = undefined;
    let accumulatedWidth = 0;

    if (this.originalTotalWidth > containerWidth + 0.5) {
      lastVisibleIndex = -1;
      this.menuItemSizes.forEach((itemWidth) => {
        accumulatedWidth += itemWidth;
        if (accumulatedWidth + this.overflowedIndicatorWidth <= containerWidth) {
          lastVisibleIndex! += 1;
        }
      });
    }

    this.setState({ lastVisibleIndex });
  };

  private renderChildren(children?: ReactElement[]): ReactNode[] {
    const { lastVisibleIndex } = this.state;

    return (children || []).reduce<ReactNode[]>((result, child, index) => {
      let renderedChild: ReactElement = child;

      if (this.props.mode === 'horizontal') {
        let overflowedSubMenu = this.getOverflowedSubMenuItem(child.props.eventKey, []);

        if (
          lastVisibleIndex !== undefined &&
          this.props.className.indexOf(`${this.props.prefixCls}-root`) !== -1
        ) {
          if (index > lastVisibleIndex) {
            renderedChild = cloneElement(child, {
              style: { display: 'none' },
              eventKey: `${child.props.eventKey}-hidden`,
              className: MENUITEM_OVERFLOWED_CLASSNAME,
            });
          }

          if (index === lastVisibleIndex + 1) {
            this.overflowedItems = children.slice(lastVisibleIndex + 1).map((item) =>
              cloneElement(item, {
                key: item.props.eventKey,
                mode: 'vertical-left',
              })
            );

            overflowedSubMenu = this.getOverflowedSubMenuItem(
              child.props.eventKey,
              this.overflowedItems
            );
          }

          const newResult = [...result, overflowedSubMenu, renderedChild];

          if (index === children.length - 1) {
            newResult.push(this.getOverflowedSubMenuItem(child.props.eventKey, [], true));
          }

          return newResult;
        }
      }

      return [...result, renderedChild];
    }, []);
  }

  render(): ReactElement {
    const {
      visible,
      prefixCls,
      overflowedIndicator,
      mode,
      level,
      tag,
      children,
      theme,
      ...restProps
    } = this.props;

    const TagComponent = tag as keyof JSX.IntrinsicElements;

    return (
      <TagComponent ref={this.childRef as RefObject<any>} {...restProps}>
        {this.renderChildren(children)}
      </TagComponent>
    );
  }
}

export default OverflowableMenu;