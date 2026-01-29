import React, { useContext, useState, useEffect, useRef, createRef, forwardRef, ReactNode, MouseEvent, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { SizeContext } from './SizeContext';
import Wave from './Wave';
import Group from './ButtonGroup';
import LoadingIcon from './LoadingIcon';
import { cloneElement } from './utils';
import warning from './warning';

type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
type ButtonShape = 'circle' | 'round';
type ButtonHTMLType = 'submit' | 'button' | 'reset';
type SizeType = 'small' | 'middle' | 'large';

interface LoadingConfig {
  delay?: number;
}

interface BaseButtonProps {
  prefixCls?: string;
  type?: ButtonType;
  danger?: boolean;
  shape?: ButtonShape;
  size?: SizeType;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  ghost?: boolean;
  block?: boolean;
  loading?: boolean | LoadingConfig;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface NativeButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  htmlType?: ButtonHTMLType;
  href?: never;
}

interface AnchorButtonProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'> {
  htmlType?: never;
  href?: string;
}

type ButtonProps = NativeButtonProps | AnchorButtonProps;

interface LegacyButtonType {
  danger?: boolean;
  type?: ButtonType;
}

const CHINESE_CHAR_REGEX = /^[\u4e00-\u9fa5]{2}$/;

const isTwoCNChar = CHINESE_CHAR_REGEX.test.bind(CHINESE_CHAR_REGEX);

function isUnborderedButtonType(type?: ButtonType): boolean {
  return type === 'text' || type === 'link';
}

function splitCNCharsBySpace(children: ReactNode, needInserted: boolean): ReactNode[] {
  let previousValueIsString = false;
  const childrenArray: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    const type = typeof child;
    const isValueType = type === 'string' || type === 'number';

    if (previousValueIsString && isValueType) {
      const lastIndex = childrenArray.length - 1;
      const lastChild = childrenArray[lastIndex];
      childrenArray[lastIndex] = `${lastChild}${child}`;
    } else {
      childrenArray.push(child);
    }

    previousValueIsString = isValueType;
  });

  return React.Children.map(childrenArray, (child) => 
    insertSpace(child, needInserted)
  ) ?? [];
}

function insertSpace(child: ReactNode, needInserted: boolean): ReactNode {
  if (child == null) {
    return null;
  }

  const SPACE = needInserted ? ' ' : '';

  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    typeof child === 'object' &&
    'type' in child &&
    typeof child.type === 'string' &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }

  if (typeof child === 'string') {
    return isTwoCNChar(child) ? (
      <span>{child.split('').join(SPACE)}</span>
    ) : (
      <span>{child}</span>
    );
  }

  return child;
}

function omit<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  const result: Partial<T> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (keys.indexOf(symbol as unknown as string) < 0 && Object.prototype.propertyIsEnumerable.call(obj, symbol)) {
        result[symbol as unknown as keyof T] = obj[symbol as unknown as keyof T];
      }
    }
  }

  return result;
}

export function convertLegacyProps(type?: ButtonType | 'danger'): LegacyButtonType {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement | HTMLAnchorElement, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type,
    danger,
    shape,
    size: customizeSize,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    htmlType = 'button',
    ...restProps
  } = props;

  const sizeContext = useContext(SizeContext);
  const [innerLoading, setInnerLoading] = useState<boolean>(!!loading);
  const [hasTwoCNChar, setHasTwoCNChar] = useState<boolean>(false);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = useContext(ConfigContext);

  const buttonRef = (ref as React.RefObject<HTMLButtonElement | HTMLAnchorElement>) || createRef<HTMLButtonElement | HTMLAnchorElement>();
  const delayTimeoutRef = useRef<number>();

  const isNeedInserted = (): boolean => {
    return React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type);
  };

  const loadingOrDelay = typeof loading === 'object' && loading.delay ? loading.delay || true : !!loading;

  useEffect(() => {
    clearTimeout(delayTimeoutRef.current);
    
    if (typeof loadingOrDelay === 'number') {
      delayTimeoutRef.current = window.setTimeout(() => {
        setInnerLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setInnerLoading(loadingOrDelay);
    }
  }, [loadingOrDelay]);

  useEffect(() => {
    if (buttonRef && 'current' in buttonRef && buttonRef.current && autoInsertSpaceInButton !== false) {
      const buttonText = buttonRef.current.textContent;
      if (isNeedInserted() && isTwoCNChar(buttonText ?? '')) {
        if (!hasTwoCNChar) {
          setHasTwoCNChar(true);
        }
      } else if (hasTwoCNChar) {
        setHasTwoCNChar(false);
      }
    }
  }, [buttonRef]);

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    const { onClick } = props;
    if (innerLoading || !onClick) {
      return;
    }
    (onClick as (event: MouseEvent<HTMLElement>) => void)(event);
  };

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Button',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`
  );

  warning(
    !(ghost && isUnborderedButtonType(type)),
    'Button',
    "`link` or `text` button can't be a `ghost` button."
  );

  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const autoInsertSpace = autoInsertSpaceInButton !== false;

  const size = customizeSize || sizeContext;
  let sizeCls = '';
  
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const iconNode = innerLoading ? icon : icon;
  const iconType = innerLoading ? 'loading' : icon;

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-dangerous`]: !!danger,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const iconElement = icon && !innerLoading ? (
    icon
  ) : (
    <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
  );

  const kids = children || children === 0 ? splitCNCharsBySpace(children, isNeedInserted() && autoInsertSpace) : null;

  const htmlProps = omit(restProps, ['navigate']);

  if ('href' in props && props.href !== undefined) {
    return (
      <a
        {...(htmlProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
        onClick={handleClick as (event: MouseEvent<HTMLAnchorElement>) => void}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
      >
        {iconElement}
        {kids}
      </a>
    );
  }

  const buttonNode = (
    <button
      {...(htmlProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      type={htmlType}
      className={classes}
      onClick={handleClick as (event: MouseEvent<HTMLButtonElement>) => void}
      ref={buttonRef as React.Ref<HTMLButtonElement>}
    >
      {iconElement}
      {kids}
    </button>
  );

  if (isUnborderedButtonType(type)) {
    return buttonNode;
  }

  return <Wave>{buttonNode}</Wave>;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(InternalButton);

Button.displayName = 'Button';
(Button as typeof Button & { Group: typeof Group; __ANT_BUTTON: boolean }).Group = Group;
(Button as typeof Button & { Group: typeof Group; __ANT_BUTTON: boolean }).__ANT_BUTTON = true;

export default Button;