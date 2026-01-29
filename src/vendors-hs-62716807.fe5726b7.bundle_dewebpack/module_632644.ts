import React, { useState, useEffect, useContext, forwardRef, Fragment, CSSProperties, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import CloseIcon from './CloseIcon';
import CheckableTag from './CheckableTag';
import Wave from './Wave';
import { PresetColorTypes, PresetStatusColorTypes } from './constants';
import { omit } from './utils';

interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'ref'> {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  icon?: ReactNode;
  color?: string;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
  closeIcon?: ReactNode;
  closable?: boolean;
  visible?: boolean;
}

const PRESET_COLOR_REGEX = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
const PRESET_STATUS_COLOR_REGEX = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);

const InternalTag = (props: TagProps, ref: React.Ref<HTMLSpanElement>) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    icon,
    color,
    onClose,
    closeIcon,
    closable = false,
    visible: controlledVisible,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const [internalVisible, setInternalVisible] = useState<boolean>(true);

  useEffect(() => {
    if (controlledVisible !== undefined) {
      setInternalVisible(controlledVisible);
    }
  }, [controlledVisible]);

  const isPresetColor = (): boolean => {
    if (!color) {
      return false;
    }
    return PRESET_COLOR_REGEX.test(color) || PRESET_STATUS_COLOR_REGEX.test(color);
  };

  const mergedStyle: CSSProperties = {
    backgroundColor: color && !isPresetColor() ? color : undefined,
    ...style,
  };

  const isPreset = isPresetColor();
  const prefixCls = getPrefixCls('tag', customizePrefixCls);

  const tagClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${color}`]: isPreset,
      [`${prefixCls}-has-color`]: color && !isPreset,
      [`${prefixCls}-hidden`]: !internalVisible,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const handleCloseClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    if (onClose) {
      onClose(e);
    }

    if (e.defaultPrevented) {
      return;
    }

    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
  };

  const isInteractive = 'onClick' in restProps || (children && (children as any).type === 'a');
  const filteredProps = omit(restProps, ['visible']);

  const iconElement = icon ?? null;
  const content = iconElement ? (
    <Fragment>
      {iconElement}
      <span>{children}</span>
    </Fragment>
  ) : (
    children
  );

  const closeIconElement = closable ? (
    closeIcon ? (
      <span className={`${prefixCls}-close-icon`} onClick={handleCloseClick}>
        {closeIcon}
      </span>
    ) : (
      <CloseIcon className={`${prefixCls}-close-icon`} onClick={handleCloseClick} />
    )
  ) : null;

  const tagElement = (
    <span {...filteredProps} ref={ref} className={tagClassName} style={mergedStyle}>
      {content}
      {closeIconElement}
    </span>
  );

  return isInteractive ? <Wave>{tagElement}</Wave> : tagElement;
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(InternalTag);

Tag.displayName = 'Tag';
(Tag as any).CheckableTag = CheckableTag;

export default Tag;