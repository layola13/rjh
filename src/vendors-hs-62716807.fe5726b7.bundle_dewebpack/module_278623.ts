import React, { useState, forwardRef, cloneElement, isValidElement, createElement, type Ref } from 'react';
import classNames from 'classnames';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { ConfigConsumer } from '../config-provider';
import Input from './Input';
import type { InputProps } from './Input';

type ActionType = 'click' | 'hover';

interface VisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  className?: string;
  prefixCls?: string;
  inputPrefixCls?: string;
  size?: 'small' | 'middle' | 'large';
  visibilityToggle?: boolean | VisibilityToggle;
  action?: ActionType;
  iconRender?: (visible: boolean) => React.ReactNode;
  disabled?: boolean;
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

const ACTION_EVENT_MAP: Record<ActionType, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref: Ref<HTMLInputElement>) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleToggle = (): void => {
    if (props.disabled) {
      return;
    }
    setVisible(!visible);
  };

  const renderPassword = (configProps: ConfigConsumerProps): React.ReactElement => {
    const { getPrefixCls } = configProps;
    const {
      className,
      prefixCls: customizePrefixCls,
      inputPrefixCls,
      size,
      visibilityToggle,
      action,
      iconRender,
      disabled,
      ...restProps
    } = props;

    const inputPrefixClsName = getPrefixCls('input', inputPrefixCls);
    const passwordPrefixCls = getPrefixCls('input-password', customizePrefixCls);

    const suffixIcon = visibilityToggle ? renderVisibilityIcon(passwordPrefixCls) : undefined;

    const passwordClassName = classNames(passwordPrefixCls, className, {
      [`${passwordPrefixCls}-${size}`]: !!size,
    });

    const inputProps: InputProps = {
      ...restProps,
      type: visible ? 'text' : 'password',
      className: passwordClassName,
      prefixCls: inputPrefixClsName,
      suffix: suffixIcon,
    };

    if (size) {
      inputProps.size = size;
    }

    return createElement(Input, { ref, ...inputProps });
  };

  const renderVisibilityIcon = (prefixCls: string): React.ReactElement | null => {
    const { action = 'click', iconRender } = props;
    
    const eventName = ACTION_EVENT_MAP[action] || '';
    
    const defaultIconRender = (isVisible: boolean): React.ReactNode => {
      return isVisible ? createElement(EyeOutlined) : createElement(EyeInvisibleOutlined);
    };

    const iconNode = (iconRender ?? defaultIconRender)(visible);

    const iconProps = {
      [eventName]: handleToggle,
      className: `${prefixCls}-icon`,
      key: 'passwordIcon',
      onMouseDown: (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
      },
      onMouseUp: (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
      },
    };

    return cloneElement(
      isValidElement(iconNode) ? iconNode : createElement('span', null, iconNode),
      iconProps
    );
  };

  return createElement(ConfigConsumer, null, renderPassword);
});

Password.displayName = 'Password';

export default Password;