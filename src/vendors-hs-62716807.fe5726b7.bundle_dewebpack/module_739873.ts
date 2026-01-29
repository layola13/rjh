import React, { Component, useContext, ReactNode, CSSProperties } from 'react';
import RcDrawer from 'rc-drawer';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import { getScrollBarSize } from '../_util/getScrollBarSize';
import { omit } from '../_util/omit';
import classNames from 'classnames';

type PlacementType = 'top' | 'right' | 'bottom' | 'left';

interface PushConfig {
  distance: number;
}

interface DrawerProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  placement?: PlacementType;
  visible?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  push?: boolean | PushConfig;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  destroyOnClose?: boolean;
  drawerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  footer?: ReactNode;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  level?: string | string[] | null;
  direction?: 'ltr' | 'rtl';
}

interface DrawerState {
  push: boolean;
}

const DrawerContext = React.createContext<Drawer | null>(null);

const DEFAULT_PUSH_CONFIG: PushConfig = {
  distance: 180
};

class Drawer extends Component<DrawerProps, DrawerState> {
  static defaultProps: Partial<DrawerProps> = {
    width: 256,
    height: 256,
    closable: true,
    placement: 'right',
    maskClosable: true,
    mask: true,
    level: null,
    keyboard: true,
    push: DEFAULT_PUSH_CONFIG
  };

  state: DrawerState = {
    push: false
  };

  private parentDrawer: Drawer | null = null;
  private destroyClose: boolean = false;

  componentDidMount(): void {
    if (this.props.visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  }

  componentDidUpdate(prevProps: DrawerProps): void {
    const { visible } = this.props;
    if (prevProps.visible !== visible && this.parentDrawer) {
      if (visible) {
        this.parentDrawer.push();
      } else {
        this.parentDrawer.pull();
      }
    }
  }

  componentWillUnmount(): void {
    if (this.parentDrawer) {
      this.parentDrawer.pull();
      this.parentDrawer = null;
    }
  }

  push = (): void => {
    if (this.props.push) {
      this.setState({ push: true });
    }
  };

  pull = (): void => {
    if (this.props.push) {
      this.setState({ push: false });
    }
  };

  onDestroyTransitionEnd = (): void => {
    if (this.getDestroyOnClose() && !this.props.visible) {
      this.destroyClose = true;
      this.forceUpdate();
    }
  };

  getDestroyOnClose = (): boolean => {
    return this.props.destroyOnClose === true && !this.props.visible;
  };

  getPushDistance = (): number => {
    const { push } = this.props;
    let distance: number;

    if (typeof push === 'boolean') {
      distance = push ? DEFAULT_PUSH_CONFIG.distance : 0;
    } else {
      distance = push?.distance ?? 0;
    }

    return parseFloat(String(distance));
  };

  getPushTransform = (placement: PlacementType): string | undefined => {
    const distance = this.getPushDistance();

    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? distance : -distance}px)`;
    }

    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? distance : -distance}px)`;
    }

    return undefined;
  };

  getOffsetStyle = (): CSSProperties => {
    const { placement, width, height, visible, mask } = this.props;

    if (!visible && !mask) {
      return {};
    }

    const offsetStyle: CSSProperties = {};

    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }

    return offsetStyle;
  };

  getRcDrawerStyle = (): CSSProperties => {
    const { zIndex, placement, mask, style } = this.props;
    const { push } = this.state;
    const offsetStyle = mask ? {} : this.getOffsetStyle();

    return {
      zIndex,
      transform: push ? this.getPushTransform(placement!) : undefined,
      ...offsetStyle,
      ...style
    };
  };

  renderHeader = (): ReactNode => {
    const { title, prefixCls, closable, headerStyle } = this.props;

    if (!title && !closable) {
      return null;
    }

    const headerClassName = `${prefixCls}${title ? '-header' : '-header-no-title'}`;

    return (
      <div className={headerClassName} style={headerStyle}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {closable && this.renderCloseIcon()}
      </div>
    );
  };

  renderFooter = (): ReactNode => {
    const { footer, footerStyle, prefixCls } = this.props;

    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-footer`;

    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  };

  renderCloseIcon = (): ReactNode => {
    const { closable, closeIcon = <CloseOutlined />, prefixCls, onClose } = this.props;

    return (
      closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`${prefixCls}-close`}
          style={{ '--scroll-bar': `${getScrollBarSize()}px` } as CSSProperties}
        >
          {closeIcon}
        </button>
      )
    );
  };

  renderBody = (): ReactNode => {
    const { bodyStyle, drawerStyle, prefixCls, visible } = this.props;

    if (this.destroyClose && !visible) {
      return null;
    }

    this.destroyClose = false;

    let transitionStyle: CSSProperties = {};
    if (this.getDestroyOnClose()) {
      transitionStyle = {
        opacity: 0,
        transition: 'opacity .3s'
      };
    }

    return (
      <div
        className={`${prefixCls}-wrapper-body`}
        style={{ ...transitionStyle, ...drawerStyle }}
        onTransitionEnd={this.onDestroyTransitionEnd}
      >
        {this.renderHeader()}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  };

  renderProvider = (parentDrawer: Drawer | null): ReactNode => {
    this.parentDrawer = parentDrawer;

    const {
      prefixCls,
      placement,
      className,
      mask,
      direction,
      visible,
      ...restProps
    } = this.props;

    const drawerClassName = classNames(
      {
        'no-mask': !mask,
        [`${prefixCls}-rtl`]: direction === 'rtl'
      },
      className
    );

    const offsetStyle = mask ? this.getOffsetStyle() : {};

    const rcDrawerProps = omit(restProps, [
      'zIndex',
      'closable',
      'closeIcon',
      'destroyOnClose',
      'drawerStyle',
      'headerStyle',
      'bodyStyle',
      'footerStyle',
      'footer',
      'title',
      'push',
      'width',
      'height'
    ]);

    return (
      <DrawerContext.Provider value={this}>
        <RcDrawer
          handler={false}
          {...rcDrawerProps}
          {...offsetStyle}
          prefixCls={prefixCls}
          open={visible}
          showMask={mask}
          placement={placement}
          style={this.getRcDrawerStyle()}
          className={drawerClassName}
        >
          {this.renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    );
  };

  render(): ReactNode {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}

const DrawerWrapper: React.FC<DrawerProps> = (props) => {
  const { prefixCls, getContainer } = props;
  const { getPopupContainer, getPrefixCls, direction } = useContext(ConfigContext);

  const drawerPrefixCls = getPrefixCls('drawer', prefixCls);
  const containerGetter =
    getContainer === undefined && getPopupContainer
      ? () => getPopupContainer(document.body)
      : getContainer;

  return (
    <Drawer
      {...props}
      prefixCls={drawerPrefixCls}
      getContainer={containerGetter}
      direction={direction}
    />
  );
};

DrawerWrapper.displayName = 'DrawerWrapper';

export default DrawerWrapper;