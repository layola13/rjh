import { useState, useEffect, createElement, Fragment } from 'react';
import type { ReactElement, RefObject, KeyboardEvent, MouseEvent, ChangeEvent, ClipboardEvent, CompositionEvent } from 'react';

interface OptionValue {
  label: string | number;
  [key: string]: unknown;
}

interface SelectInputProps {
  inputElement: ReactElement;
  prefixCls: string;
  id: string;
  inputRef: RefObject<HTMLInputElement>;
  disabled: boolean;
  autoFocus: boolean;
  autoComplete: string;
  accessibilityIndex: number;
  mode: 'combobox' | 'multiple' | 'tags' | string;
  open: boolean;
  values: OptionValue[];
  placeholder: string;
  tabIndex: number;
  showSearch: boolean;
  searchValue: string;
  activeValue: string;
  maxLength?: number;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onInputMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInputPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onInputCompositionStart: (event: CompositionEvent<HTMLInputElement>) => void;
  onInputCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

interface InputCoreProps {
  ref: RefObject<HTMLInputElement>;
  prefixCls: string;
  id: string;
  open: boolean;
  inputElement: ReactElement;
  disabled: boolean;
  autoFocus: boolean;
  autoComplete: string;
  editable: boolean;
  accessibilityIndex: number;
  value: string;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onCompositionStart: (event: CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => void;
  tabIndex: number;
  attrs: Record<string, unknown>;
  maxLength?: number;
}

declare const pickAttrs: (props: SelectInputProps, ariaOnly: boolean) => Record<string, unknown>;
declare const InputCore: (props: InputCoreProps) => ReactElement;

export default function SelectInput(props: SelectInputProps): ReactElement {
  const {
    inputElement,
    prefixCls,
    id,
    inputRef,
    disabled,
    autoFocus,
    autoComplete,
    accessibilityIndex,
    mode,
    open,
    values,
    placeholder,
    tabIndex,
    showSearch,
    searchValue,
    activeValue,
    maxLength,
    onInputKeyDown,
    onInputMouseDown,
    onInputChange,
    onInputPaste,
    onInputCompositionStart,
    onInputCompositionEnd,
  } = props;

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const isComboboxMode = mode === 'combobox';
  const isEditable = isComboboxMode || showSearch;
  const firstValue = values[0];

  let displayValue = searchValue || '';
  if (isComboboxMode && activeValue && !isTyping) {
    displayValue = activeValue;
  }

  useEffect(() => {
    if (isComboboxMode) {
      setIsTyping(false);
    }
  }, [isComboboxMode, activeValue]);

  const shouldShowInput = (mode === 'combobox' || open) && !!displayValue;

  const itemTitle =
    !firstValue || (typeof firstValue.label !== 'string' && typeof firstValue.label !== 'number')
      ? undefined
      : firstValue.label.toString();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsTyping(true);
    onInputChange(event);
  };

  return createElement(
    Fragment,
    null,
    createElement(
      'span',
      {
        className: `${prefixCls}-selection-search`,
      },
      createElement(InputCore, {
        ref: inputRef,
        prefixCls,
        id,
        open,
        inputElement,
        disabled,
        autoFocus,
        autoComplete,
        editable: isEditable,
        accessibilityIndex,
        value: displayValue,
        onKeyDown: onInputKeyDown,
        onMouseDown: onInputMouseDown,
        onChange: handleInputChange,
        onPaste: onInputPaste,
        onCompositionStart: onInputCompositionStart,
        onCompositionEnd: onInputCompositionEnd,
        tabIndex,
        attrs: pickAttrs(props, true),
        maxLength: isComboboxMode ? maxLength : undefined,
      })
    ),
    !isComboboxMode &&
      firstValue &&
      !shouldShowInput &&
      createElement(
        'span',
        {
          className: `${prefixCls}-selection-item`,
          title: itemTitle,
        },
        firstValue.label
      ),
    !firstValue &&
      !shouldShowInput &&
      createElement(
        'span',
        {
          className: `${prefixCls}-selection-placeholder`,
        },
        placeholder
      )
  );
}