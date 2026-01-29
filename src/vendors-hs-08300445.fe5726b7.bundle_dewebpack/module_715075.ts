import React, { Component, ReactNode, CSSProperties, KeyboardEvent } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import PanelContent from './PanelContent';

type CollapsibleType = 'header' | 'disabled' | 'icon';

interface OpenMotionConfig {
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  onAppearStart?: () => void;
  onEnterStart?: () => void;
  onLeaveStart?: () => void;
}

interface CollapsePanelProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
  prefixCls: string;
  header: ReactNode;
  headerClass?: string;
  children: ReactNode;
  isActive: boolean;
  showArrow: boolean;
  destroyInactivePanel: boolean;
  accordion: boolean;
  forceRender: boolean;
  openMotion?: OpenMotionConfig;
  expandIcon?: (props: CollapsePanel Props) => ReactNode;
  extra?: ReactNode;
  collapsible?: CollapsibleType;
  panelKey: string | number;
  onItemClick?: (key: string | number) => void;
}

interface MotionRenderProps {
  className?: string;
  style?: CSSProperties;
}

type MotionRenderFunction = (
  props: MotionRenderProps,
  ref: React.Ref<HTMLDivElement>
) => ReactNode;

class CollapsePanel extends Component<CollapsePanelProps> {
  static defaultProps = {
    showArrow: true,
    isActive: false,
    onItemClick: () => {},
    headerClass: '',
    forceRender: false,
  };

  shouldComponentUpdate(nextProps: CollapsePanelProps): boolean {
    return !this.shallowEqual(this.props, nextProps);
  }

  private shallowEqual(objA: CollapsePanelProps, objB: CollapsePanelProps): boolean {
    if (objA === objB) {
      return true;
    }

    const keysA = Object.keys(objA) as Array<keyof CollapsePanelProps>;
    const keysB = Object.keys(objB) as Array<keyof CollapsePanelProps>;

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(key => objA[key] === objB[key]);
  }

  private handleItemClick = (): void => {
    const { onItemClick, panelKey } = this.props;
    if (typeof onItemClick === 'function') {
      onItemClick(panelKey);
    }
  };

  private handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    const ENTER_KEY = 'Enter';
    const ENTER_KEY_CODE = 13;

    if (
      event.key === ENTER_KEY ||
      event.keyCode === ENTER_KEY_CODE ||
      event.which === ENTER_KEY_CODE
    ) {
      this.handleItemClick();
    }
  };

  render(): ReactNode {
    const {
      className,
      id,
      style,
      prefixCls,
      header,
      headerClass,
      children,
      isActive,
      showArrow,
      destroyInactivePanel,
      accordion,
      forceRender,
      openMotion,
      expandIcon,
      extra,
      collapsible,
    } = this.props;

    const isDisabled = collapsible === 'disabled';
    const isHeaderCollapsible = collapsible === 'header';

    const headerClassName = classNames(`${prefixCls}-header`, {
      [headerClass ?? '']: headerClass,
      [`${prefixCls}-header-collapsible-only`]: isHeaderCollapsible,
    });

    const itemClassName = classNames(
      {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-active`]: isActive,
        [`${prefixCls}-item-disabled`]: isDisabled,
      },
      className
    );

    let arrowIcon: ReactNode = <i className="arrow" />;
    if (showArrow && typeof expandIcon === 'function') {
      arrowIcon = expandIcon(this.props);
    }

    const hasExtra = extra != null && typeof extra !== 'boolean';

    return (
      <div className={itemClassName} style={style} id={id}>
        <div
          className={headerClassName}
          onClick={() => {
            if (collapsible !== 'header') {
              this.handleItemClick();
            }
          }}
          role={accordion ? 'tab' : 'button'}
          tabIndex={isDisabled ? -1 : 0}
          aria-expanded={isActive}
          onKeyPress={this.handleKeyPress}
        >
          {showArrow && arrowIcon}
          {isHeaderCollapsible ? (
            <span
              onClick={this.handleItemClick}
              className={`${prefixCls}-header-text`}
            >
              {header}
            </span>
          ) : (
            header
          )}
          {hasExtra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
        <CSSMotion
          visible={isActive}
          leavedClassName={`${prefixCls}-content-hidden`}
          {...openMotion}
          forceRender={forceRender}
          removeOnLeave={destroyInactivePanel}
        >
          {(motionProps: MotionRenderProps, ref: React.Ref<HTMLDivElement>) => {
            const { className: motionClassName, style: motionStyle } = motionProps;
            return (
              <PanelContent
                ref={ref}
                prefixCls={prefixCls}
                className={motionClassName}
                style={motionStyle}
                isActive={isActive}
                forceRender={forceRender}
                role={accordion ? 'tabpanel' : null}
              >
                {children}
              </PanelContent>
            );
          }}
        </CSSMotion>
      </div>
    );
  }
}

export default CollapsePanel;