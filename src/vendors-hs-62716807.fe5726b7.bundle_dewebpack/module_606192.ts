import React, { Component, createRef, RefObject } from 'react';
import classNames from 'classnames';

type InputType = 'text' | 'input';

interface ClearIconProps {
  onClick?: () => void;
  className: string;
  role: string;
}

interface InputWithLabelProps {
  allowClear?: boolean;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  handleReset?: () => void;
  triggerFocus?: () => void;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  focused?: boolean;
  className?: string;
  size?: 'small' | 'large' | 'default';
  direction?: 'ltr' | 'rtl';
  style?: React.CSSProperties;
  bordered?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefixCls: string;
  inputType: InputType;
  element: React.ReactElement;
}

export function hasPrefixSuffix(props: InputWithLabelProps): boolean {
  return !!(props.prefix || props.suffix || props.allowClear);
}

function hasAddon(props: InputWithLabelProps): boolean {
  return !!(props.addonBefore || props.addonAfter);
}

function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: 'small' | 'large' | 'default',
  disabled?: boolean
): string {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-borderless`]: !bordered,
  });
}

function cloneElement(
  element: React.ReactElement,
  props: Record<string, unknown>
): React.ReactElement {
  return React.cloneElement(element, props);
}

export default class InputWithLabel extends Component<InputWithLabelProps> {
  containerRef: RefObject<HTMLSpanElement> = createRef();

  onInputMouseUp = (event: React.MouseEvent): void => {
    if (this.containerRef.current?.contains(event.target as Node)) {
      const { triggerFocus } = this.props;
      triggerFocus?.();
    }
  };

  renderClearIcon(prefixCls: string): React.ReactElement | null {
    const { allowClear, value, disabled, readOnly, handleReset } = this.props;

    if (!allowClear) {
      return null;
    }

    const shouldShow = !disabled && !readOnly && value;
    const className = `${prefixCls}-clear-icon`;

    return React.createElement('span' as any, {
      onClick: handleReset,
      className: classNames(className, {
        [`${className}-hidden`]: !shouldShow,
      }),
      role: 'button',
    });
  }

  renderSuffix(prefixCls: string): React.ReactElement | null {
    const { suffix, allowClear } = this.props;

    if (!suffix && !allowClear) {
      return null;
    }

    return (
      <span className={`${prefixCls}-suffix`}>
        {this.renderClearIcon(prefixCls)}
        {suffix}
      </span>
    );
  }

  renderLabeledIcon(prefixCls: string, element: React.ReactElement): React.ReactElement {
    const {
      focused,
      value,
      prefix,
      className,
      size,
      suffix,
      disabled,
      allowClear,
      direction,
      style,
      readOnly,
      bordered,
    } = this.props;

    const suffixNode = this.renderSuffix(prefixCls);

    if (!hasPrefixSuffix(this.props)) {
      return cloneElement(element, { value });
    }

    const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null;

    const affixWrapperClassName = classNames(`${prefixCls}-affix-wrapper`, {
      [`${prefixCls}-affix-wrapper-focused`]: focused,
      [`${prefixCls}-affix-wrapper-disabled`]: disabled,
      [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
      [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
      [className!]: !hasAddon(this.props) && className,
    });

    return (
      <span
        ref={this.containerRef}
        className={affixWrapperClassName}
        style={style}
        onMouseUp={this.onInputMouseUp}
      >
        {prefixNode}
        {cloneElement(element, {
          style: null,
          value,
          className: getInputClassName(prefixCls, bordered ?? true, size, disabled),
        })}
        {suffixNode}
      </span>
    );
  }

  renderInputWithLabel(prefixCls: string, element: React.ReactElement): React.ReactElement {
    const { addonBefore, addonAfter, style, size, className, direction } = this.props;

    if (!hasAddon(this.props)) {
      return element;
    }

    const groupPrefixCls = `${prefixCls}-group`;
    const addonClassName = `${groupPrefixCls}-addon`;

    const addonBeforeNode = addonBefore ? <span className={addonClassName}>{addonBefore}</span> : null;
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null;

    const wrapperClassName = classNames(`${prefixCls}-wrapper`, groupPrefixCls, {
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    });

    const groupWrapperClassName = classNames(`${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: size === 'small',
      [`${prefixCls}-group-wrapper-lg`]: size === 'large',
      [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
    }, className);

    return (
      <span className={groupWrapperClassName} style={style}>
        <span className={wrapperClassName}>
          {addonBeforeNode}
          {cloneElement(element, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    );
  }

  renderTextAreaWithClearIcon(prefixCls: string, element: React.ReactElement): React.ReactElement {
    const { value, allowClear, className, style, direction, bordered } = this.props;

    if (!allowClear) {
      return cloneElement(element, { value });
    }

    const affixWrapperClassName = classNames(
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [className!]: !hasAddon(this.props) && className,
      }
    );

    return (
      <span className={affixWrapperClassName} style={style}>
        {cloneElement(element, { style: null, value })}
        {this.renderClearIcon(prefixCls)}
      </span>
    );
  }

  render(): React.ReactElement {
    const { prefixCls, inputType, element } = this.props;

    if (inputType === 'text') {
      return this.renderTextAreaWithClearIcon(prefixCls, element);
    }

    return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
  }
}