import React, { useState, useRef, useContext, CSSProperties, MouseEvent, ReactNode } from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { ConfigContext } from '../config-provider/context';
import { replaceElement } from '../_util/reactNode';
import { getDataOrAriaProps } from '../_util/pickAttrs';
import ErrorBoundary from './ErrorBoundary';

type AlertType = 'success' | 'info' | 'error' | 'warning';

interface IconMapType {
  success: React.ComponentType<{ className?: string }>;
  info: React.ComponentType<{ className?: string }>;
  error: React.ComponentType<{ className?: string }>;
  warning: React.ComponentType<{ className?: string }>;
}

const FILLED_ICON_MAP: IconMapType = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

const OUTLINED_ICON_MAP: IconMapType = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

interface AlertProps {
  description?: ReactNode;
  prefixCls?: string;
  message?: ReactNode;
  banner?: boolean;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  afterClose?: () => void;
  showIcon?: boolean;
  closable?: boolean;
  closeText?: ReactNode;
  action?: ReactNode;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: AlertType;
  icon?: ReactNode;
}

const Alert: React.FC<AlertProps> & { ErrorBoundary: typeof ErrorBoundary } = (props) => {
  const {
    description,
    prefixCls: customizePrefixCls,
    message,
    banner,
    className = '',
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    action,
    onClose,
    type: customType,
    icon: customIcon,
    ...restProps
  } = props;

  const [closed, setClosed] = useState<boolean>(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const { getPrefixCls, direction } = useContext(ConfigContext);
  
  const prefixCls = getPrefixCls('alert', customizePrefixCls);

  const handleClose = (e: MouseEvent<HTMLButtonElement>): void => {
    setClosed(true);
    onClose?.(e);
  };

  const isClosable = !!closeText || closable;

  const getAlertType = (): AlertType => {
    if (customType !== undefined) {
      return customType;
    }
    return banner ? 'warning' : 'info';
  };

  const alertType = getAlertType();

  const shouldShowIcon = banner && showIcon === undefined ? true : showIcon;

  const alertClassName = classNames(
    prefixCls,
    `${prefixCls}-${alertType}`,
    {
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !shouldShowIcon,
      [`${prefixCls}-banner`]: !!banner,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const dataOrAriaProps = getDataOrAriaProps(restProps);

  const renderIconNode = (): ReactNode => {
    if (!shouldShowIcon) {
      return null;
    }

    const iconMap = description ? OUTLINED_ICON_MAP : FILLED_ICON_MAP;
    const IconComponent = iconMap[alertType] || null;

    if (customIcon) {
      return replaceElement(
        customIcon,
        <span className={`${prefixCls}-icon`}>{customIcon}</span>,
        () => ({
          className: classNames(`${prefixCls}-icon`, {
            [(customIcon as any).props?.className]: (customIcon as any).props?.className,
          }),
        })
      );
    }

    return <IconComponent className={`${prefixCls}-icon`} />;
  };

  return (
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(element) => ({
        maxHeight: element.offsetHeight,
      })}
      onLeaveEnd={afterClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          ref={alertRef}
          data-show={!closed}
          className={classNames(alertClassName, motionClassName)}
          style={{ ...style, ...motionStyle }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          role="alert"
          {...dataOrAriaProps}
        >
          {renderIconNode()}
          <div className={`${prefixCls}-content`}>
            <div className={`${prefixCls}-message`}>{message}</div>
            <div className={`${prefixCls}-description`}>{description}</div>
          </div>
          {action && <div className={`${prefixCls}-action`}>{action}</div>}
          {isClosable && (
            <button
              type="button"
              onClick={handleClose}
              className={`${prefixCls}-close-icon`}
              tabIndex={0}
            >
              {closeText ? (
                <span className={`${prefixCls}-close-text`}>{closeText}</span>
              ) : (
                <CloseOutlined />
              )}
            </button>
          )}
        </div>
      )}
    </CSSMotion>
  );
};

Alert.ErrorBoundary = ErrorBoundary;

export default Alert;