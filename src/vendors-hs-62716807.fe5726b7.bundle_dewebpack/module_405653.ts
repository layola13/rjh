import React, { forwardRef, useState, useEffect, useContext, isValidElement, ReactElement, ReactNode, CSSProperties } from 'react';
import Button from './Button';
import Popover from './Popover';
import KeyCode from './KeyCode';
import { convertLegacyProps } from './utils/convertLegacyProps';
import LocaleReceiver from './LocaleReceiver';
import defaultLocale from './locale/default';
import { ConfigContext } from './ConfigContext';
import { getRenderPropValue } from './utils/getRenderPropValue';
import { cloneElement } from './utils/reactNode';
import classNames from 'classnames';
import ExclamationCircleFilled from './icons/ExclamationCircleFilled';

interface PopconfirmProps {
  prefixCls?: string;
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  children?: ReactElement;
  overlayClassName?: string;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean, event?: React.MouseEvent | React.KeyboardEvent) => void;
  onConfirm?: (event?: React.MouseEvent) => void;
  onCancel?: (event?: React.MouseEvent) => void;
  okButtonProps?: Record<string, unknown>;
  cancelButtonProps?: Record<string, unknown>;
  title?: ReactNode | (() => ReactNode);
  cancelText?: ReactNode;
  okText?: ReactNode;
  okType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text';
  icon?: ReactNode;
  disabled?: boolean;
  transitionName?: string;
  trigger?: string;
  style?: CSSProperties;
}

interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

const Popconfirm = forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(props.visible ?? false);

  useEffect(() => {
    if ('visible' in props) {
      setInternalVisible(props.visible ?? false);
    }
  }, [props.visible]);

  useEffect(() => {
    if ('defaultVisible' in props) {
      setInternalVisible(props.defaultVisible ?? false);
    }
  }, [props.defaultVisible]);

  const handleVisibleChange = (visible: boolean, event?: React.MouseEvent | React.KeyboardEvent): void => {
    if (!('visible' in props)) {
      setInternalVisible(visible);
    }
    props.onVisibleChange?.(visible, event);
  };

  const handleConfirm = (event: React.MouseEvent): void => {
    handleVisibleChange(false, event);
    props.onConfirm?.(event);
  };

  const handleCancel = (event: React.MouseEvent): void => {
    handleVisibleChange(false, event);
    props.onCancel?.(event);
  };

  const { getPrefixCls } = useContext(ConfigContext);

  const {
    prefixCls: customPrefixCls,
    placement,
    children,
    overlayClassName,
    okButtonProps,
    cancelButtonProps,
    title,
    cancelText,
    okText,
    okType,
    icon,
    disabled,
    ...restProps
  } = props;

  const popoverPrefixCls = getPrefixCls('popover', customPrefixCls);
  const popconfirmPrefixCls = getPrefixCls('popconfirm', customPrefixCls);
  const mergedOverlayClassName = classNames(popconfirmPrefixCls, overlayClassName);

  const renderOverlay = (locale: PopconfirmLocale): ReactNode => {
    return (
      <div className={`${popoverPrefixCls}-inner-content`}>
        <div className={`${popoverPrefixCls}-message`}>
          {icon}
          <div className={`${popoverPrefixCls}-message-title`}>
            {getRenderPropValue(title)}
          </div>
        </div>
        <div className={`${popoverPrefixCls}-buttons`}>
          <Button
            onClick={handleCancel}
            size="small"
            {...cancelButtonProps}
          >
            {cancelText ?? locale.cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            {...convertLegacyProps(okType)}
            size="small"
            {...okButtonProps}
          >
            {okText ?? locale.okText}
          </Button>
        </div>
      </div>
    );
  };

  const overlay = (
    <LocaleReceiver
      componentName="Popconfirm"
      defaultLocale={defaultLocale.Popconfirm}
    >
      {renderOverlay}
    </LocaleReceiver>
  );

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (isValidElement(children)) {
      children.props.onKeyDown?.(event);
    }

    if (event.keyCode === KeyCode.ESC && internalVisible) {
      handleVisibleChange(false, event);
    }
  };

  return (
    <Popover
      {...restProps}
      prefixCls={popoverPrefixCls}
      placement={placement}
      onVisibleChange={(visible: boolean) => {
        if (!disabled) {
          handleVisibleChange(visible);
        }
      }}
      visible={internalVisible}
      overlay={overlay}
      overlayClassName={mergedOverlayClassName}
      ref={ref}
    >
      {cloneElement(children, {
        onKeyDown: handleKeyDown,
      })}
    </Popover>
  );
});

Popconfirm.defaultProps = {
  transitionName: 'zoom-big',
  placement: 'top',
  trigger: 'click',
  okType: 'primary',
  icon: <ExclamationCircleFilled />,
  disabled: false,
};

export default Popconfirm;