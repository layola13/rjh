import React, { useContext, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import Button from '../button';
import DownOutlined from '@ant-design/icons/DownOutlined';
import Dropdown from '../dropdown';
import { ConfigContext } from '../config-provider';

const { Group: ButtonGroup } = Button;

type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
type ButtonHTMLType = 'submit' | 'button' | 'reset';
type Placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

interface DropdownButtonProps {
  prefixCls?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  htmlType?: ButtonHTMLType;
  children?: ReactNode;
  className?: string;
  overlay: ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  align?: Record<string, unknown>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  placement?: Placement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  href?: string;
  icon?: ReactNode;
  title?: string;
  buttonsRender?: (buttons: [ReactNode, ReactNode]) => [ReactNode, ReactNode];
  style?: CSSProperties;
}

interface DropdownButtonComponent extends React.FC<DropdownButtonProps> {
  __ANT_BUTTON: boolean;
}

const DropdownButton: DropdownButtonComponent = (props) => {
  const {
    getPopupContainer: contextGetPopupContainer,
    getPrefixCls,
    direction,
  } = useContext(ConfigContext);

  const {
    prefixCls: customPrefixCls,
    type = 'default',
    disabled,
    onClick,
    htmlType,
    children,
    className,
    overlay,
    trigger,
    align,
    visible,
    onVisibleChange,
    placement,
    getPopupContainer,
    href,
    icon = <DownOutlined />,
    title,
    buttonsRender = (buttons) => buttons,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('dropdown-button', customPrefixCls);

  const dropdownProps: {
    align?: Record<string, unknown>;
    overlay: ReactNode;
    disabled?: boolean;
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    onVisibleChange?: (visible: boolean) => void;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    visible?: boolean;
    placement?: Placement;
  } = {
    align,
    overlay,
    disabled,
    trigger: disabled ? [] : trigger,
    onVisibleChange,
    getPopupContainer: getPopupContainer || contextGetPopupContainer,
  };

  if (visible !== undefined) {
    dropdownProps.visible = visible;
  }

  if (placement !== undefined) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight';
  }

  const leftButton = (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      htmlType={htmlType}
      href={href}
      title={title}
    >
      {children}
    </Button>
  );

  const rightButton = (
    <Button type={type} icon={icon} />
  );

  const [renderedLeftButton, renderedRightButton] = buttonsRender([leftButton, rightButton]);

  return (
    <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
      {renderedLeftButton}
      <Dropdown {...dropdownProps}>{renderedRightButton}</Dropdown>
    </ButtonGroup>
  );
};

DropdownButton.__ANT_BUTTON = true;

export default DropdownButton;