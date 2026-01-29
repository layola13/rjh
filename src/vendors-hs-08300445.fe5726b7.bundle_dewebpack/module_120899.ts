import React, { Component, ReactNode, CSSProperties, MouseEvent } from 'react';
import DrawerChild from './DrawerChild';
import Portal from './Portal';

interface DrawerProps {
  prefixCls?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  getContainer?: string | HTMLElement | (() => HTMLElement);
  defaultOpen?: boolean;
  open?: boolean;
  level?: string | string[];
  duration?: string;
  ease?: string;
  onChange?: (open: boolean) => void;
  afterVisibleChange?: (open: boolean) => void;
  handler?: ReactNode;
  showMask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  wrapperClassName?: string;
  className?: string;
  keyboard?: boolean;
  forceRender?: boolean;
  onHandleClick?: (event: MouseEvent) => void;
  onClose?: (event: MouseEvent | KeyboardEvent) => void;
  onMaskClick?: (event: MouseEvent) => void;
}

interface DrawerState {
  open: boolean;
  prevProps?: DrawerProps;
}

interface PortalChildrenProps {
  visible: boolean;
  afterClose?: (open: boolean) => void;
}

class Drawer extends Component<DrawerProps, DrawerState> {
  static defaultProps: Partial<DrawerProps> = {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    defaultOpen: false,
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    onChange: () => {},
    afterVisibleChange: () => {},
    handler: (
      <div className="drawer-handle">
        <i className="drawer-handle-icon" />
      </div>
    ),
    showMask: true,
    maskClosable: true,
    maskStyle: {},
    wrapperClassName: '',
    className: '',
    keyboard: true,
    forceRender: false,
  };

  static getDerivedStateFromProps(props: DrawerProps, state: DrawerState): Partial<DrawerState> {
    const { prevProps } = state;
    const result: Partial<DrawerState> = {
      prevProps: props,
    };

    if (prevProps !== undefined && props.open !== prevProps.open) {
      result.open = props.open;
    }

    return result;
  }

  private dom?: HTMLDivElement;

  constructor(props: DrawerProps) {
    super(props);

    const initialOpen = props.open !== undefined ? props.open : !!props.defaultOpen;
    this.state = {
      open: initialOpen,
    };

    if ('onMaskClick' in props) {
      console.warn('`onMaskClick` are removed, please use `onClose` instead.');
    }
  }

  onHandleClick = (event: MouseEvent): void => {
    const { onHandleClick, open } = this.props;

    if (onHandleClick) {
      onHandleClick(event);
    }

    if (open === undefined) {
      const currentOpen = this.state.open;
      this.setState({
        open: !currentOpen,
      });
    }
  };

  onClose = (event: MouseEvent | KeyboardEvent): void => {
    const { onClose, open } = this.props;

    if (onClose) {
      onClose(event);
    }

    if (open === undefined) {
      this.setState({
        open: false,
      });
    }
  };

  render(): ReactNode {
    const { 
      defaultOpen, 
      getContainer, 
      wrapperClassName, 
      forceRender, 
      handler,
      ...restProps 
    } = this.props;
    const { open } = this.state;

    if (!getContainer) {
      return (
        <div
          className={wrapperClassName}
          ref={(node) => {
            this.dom = node ?? undefined;
          }}
        >
          <DrawerChild
            {...restProps}
            open={open}
            handler={handler}
            getContainer={() => this.dom!}
            onClose={this.onClose}
            onHandleClick={this.onHandleClick}
          />
        </div>
      );
    }

    const shouldForceRender = !!handler || forceRender;

    return (
      <Portal
        visible={open}
        forceRender={shouldForceRender}
        getContainer={getContainer}
        wrapperClassName={wrapperClassName}
      >
        {({ visible, afterClose }: PortalChildrenProps) => (
          <DrawerChild
            {...restProps}
            open={visible !== undefined ? visible : open}
            afterVisibleChange={afterClose !== undefined ? afterClose : restProps.afterVisibleChange}
            handler={handler}
            onClose={this.onClose}
            onHandleClick={this.onHandleClick}
          />
        )}
      </Portal>
    );
  }
}

export default Drawer;