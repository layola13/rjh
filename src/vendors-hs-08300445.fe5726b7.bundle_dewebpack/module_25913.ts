import React, { forwardRef, cloneElement, ReactElement, RefObject } from 'react';
import classNames from 'classnames';
import { composeRef } from '../utils/ref';

interface InputProps {
  prefixCls: string;
  id: string;
  inputElement?: ReactElement;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  autoComplete?: string;
  editable: boolean;
  accessibilityIndex: number;
  value: string;
  maxLength?: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onCompositionStart: (event: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd: (event: React.CompositionEvent<HTMLInputElement>) => void;
  open: boolean;
  attrs?: Record<string, unknown>;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    prefixCls,
    id,
    inputElement,
    disabled,
    tabIndex,
    autoFocus,
    autoComplete,
    editable,
    accessibilityIndex,
    value,
    maxLength,
    onKeyDown,
    onMouseDown,
    onChange,
    onPaste,
    onCompositionStart,
    onCompositionEnd,
    open,
    attrs
  } = props;

  const element = inputElement || <input />;
  const elementRef = (element as any).ref;
  const elementProps = element.props;
  const {
    onKeyDown: originalOnKeyDown,
    onChange: originalOnChange,
    onMouseDown: originalOnMouseDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd,
    style: originalStyle
  } = elementProps;

  const inputClassName = classNames(
    `${prefixCls}-selection-search-input`,
    elementProps?.className
  );

  const inputStyle = {
    ...originalStyle,
    opacity: editable ? undefined : 0
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(event);
    originalOnKeyDown?.(event);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    onMouseDown(event);
    originalOnMouseDown?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    originalOnChange?.(event);
  };

  const handleCompositionStart = (event: React.CompositionEvent<HTMLInputElement>) => {
    onCompositionStart(event);
    originalOnCompositionStart?.(event);
  };

  const handleCompositionEnd = (event: React.CompositionEvent<HTMLInputElement>) => {
    onCompositionEnd(event);
    originalOnCompositionEnd?.(event);
  };

  const mergedProps = {
    ...elementProps,
    ...attrs,
    id,
    ref: composeRef(ref, elementRef),
    disabled,
    tabIndex,
    autoComplete: autoComplete || 'off',
    type: 'search',
    autoFocus,
    className: inputClassName,
    style: inputStyle,
    role: 'combobox',
    'aria-expanded': open,
    'aria-haspopup': 'listbox' as const,
    'aria-owns': `${id}_list`,
    'aria-autocomplete': 'list' as const,
    'aria-controls': `${id}_list`,
    'aria-activedescendant': `${id}_list_${accessibilityIndex}`,
    value: editable ? value : '',
    maxLength,
    readOnly: !editable,
    unselectable: editable ? undefined : ('on' as const),
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onChange: handleChange,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onPaste
  };

  return cloneElement(element, mergedProps);
});

Input.displayName = 'Input';

export default Input;