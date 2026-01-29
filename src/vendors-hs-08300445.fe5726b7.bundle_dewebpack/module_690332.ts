import type { CSSProperties, MouseEvent, FocusEvent, KeyboardEvent, ReactNode } from 'react';
import { useRef, useState, useEffect, Component, createRef, createElement } from 'react';
import classNames from 'classnames';
import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';
import { PickerContext } from './context';
import usePickerInput from './hooks/usePickerInput';
import useTextValueMapping from './hooks/useTextValueMapping';
import useValueTexts from './hooks/useValueTexts';
import useHoverValue from './hooks/useHoverValue';
import useMergedState from './hooks/useMergedState';
import { 
  parseValue, 
  isEqual, 
  formatValue, 
  getDefaultFormat, 
  elementsContains, 
  getInputSize,
  toArray,
  pickAttrs 
} from './utils';
import warning from './utils/warning';

type PickerMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

interface GenerateConfig<DateType> {
  // Add specific methods as needed
  [key: string]: any;
}

interface Locale {
  [key: string]: any;
}

interface PickerRef {
  focus: () => void;
  blur: () => void;
}

interface OperationRef {
  onKeyDown?: (event: KeyboardEvent) => boolean;
  onClose?: () => void;
}

interface PickerSharedProps<DateType> {
  prefixCls?: string;
  id?: string;
  tabIndex?: number;
  style?: CSSProperties;
  className?: string;
  dropdownClassName?: string;
  dropdownAlign?: Record<string, any>;
  popupStyle?: CSSProperties;
  transitionName?: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  inputReadOnly?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  showTime?: boolean | Record<string, any>;
  picker?: PickerMode;
  format?: string | string[] | ((value: DateType) => string);
  use12Hours?: boolean;
  value?: DateType | null;
  defaultValue?: DateType | null;
  open?: boolean;
  defaultOpen?: boolean;
  defaultOpenValue?: DateType;
  suffixIcon?: ReactNode;
  clearIcon?: ReactNode;
  disabled?: boolean;
  disabledDate?: (date: DateType) => boolean;
  placeholder?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  pickerRef?: React.RefObject<PickerRef>;
  panelRender?: (panel: ReactNode) => ReactNode;
  onChange?: (value: DateType | null, dateString: string) => void;
  onOpenChange?: (open: boolean) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => void;
  onSelect?: (value: DateType) => void;
  onPanelChange?: (value: DateType, mode: PickerMode) => void;
  direction?: 'ltr' | 'rtl';
  autoComplete?: string;
}

function InternalPicker<DateType>(props: PickerSharedProps<DateType>): JSX.Element {
  const {
    prefixCls = 'rc-picker',
    id,
    tabIndex,
    style,
    className,
    dropdownClassName,
    dropdownAlign,
    popupStyle,
    transitionName,
    generateConfig,
    locale,
    inputReadOnly,
    allowClear,
    autoFocus,
    showTime,
    picker = 'date',
    format,
    use12Hours,
    value,
    defaultValue,
    open,
    defaultOpen,
    defaultOpenValue,
    suffixIcon,
    clearIcon,
    disabled,
    disabledDate,
    placeholder,
    getPopupContainer,
    pickerRef,
    panelRender,
    onChange,
    onOpenChange,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    onKeyDown,
    onSelect,
    direction,
    autoComplete = 'off',
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const needConfirmButton = (picker === 'date' && !!showTime) || picker === 'time';
  const formatList = toArray(getDefaultFormat(format, picker, showTime, use12Hours));

  const operationRef = useRef<OperationRef | null>(null);
  const panelDivRef = useRef<HTMLDivElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mergedValue, setInnerValue] = useMergedState<DateType | null>(null, {
    value,
    defaultValue,
  });

  const [selectedValue, setSelectedValue] = useState<DateType | null>(mergedValue);
  const [hoverValue, setHoverValue, clearHoverValue] = useHoverValue<DateType>(selectedValue, {
    formatList,
    generateConfig,
    locale,
  });

  const [mergedOpen, triggerInnerOpen] = useMergedState<boolean>(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: (openValue) => !disabled && openValue,
    onChange: (openValue) => {
      if (onOpenChange) {
        onOpenChange(openValue);
      }
      if (!openValue && operationRef.current?.onClose) {
        operationRef.current.onClose();
      }
    },
  });

  const [valueTexts, triggerTextChange, resetText] = useTextValueMapping({
    valueTexts: useValueTexts(selectedValue, { formatList, generateConfig, locale }),
    onTextChange: (text: string) => {
      const parsed = parseValue(text, {
        locale,
        formatList,
        generateConfig,
      });

      if (parsed && (!disabledDate || !disabledDate(parsed))) {
        setSelectedValue(parsed);
      }
    },
  });

  const triggerChange = (newValue: DateType | null) => {
    setSelectedValue(newValue);
    setInnerValue(newValue);

    if (onChange && !isEqual(generateConfig, mergedValue, newValue)) {
      onChange(
        newValue,
        newValue ? formatValue(newValue, { generateConfig, locale, format: formatList[0] }) : ''
      );
    }
  };

  const triggerOpen = (nextOpen: boolean) => {
    if (disabled && nextOpen) {
      return;
    }
    triggerInnerOpen(nextOpen);
  };

  const [inputProps, { focused, typing }] = usePickerInput({
    blurToCancel: needConfirmButton,
    open: mergedOpen,
    value: valueTexts,
    triggerOpen,
    forwardKeyDown: (event: KeyboardEvent) => {
      if (mergedOpen && operationRef.current?.onKeyDown) {
        return operationRef.current.onKeyDown(event);
      }

      warning(false, 'Picker not correct forward KeyDown operation. Please help to fire issue about this.');
      return false;
    },
    isClickOutside: (target: EventTarget | null) => {
      return !elementsContains([panelDivRef.current, inputDivRef.current, containerRef.current], target as HTMLElement);
    },
    onSubmit: () => {
      if (!selectedValue || (disabledDate && disabledDate(selectedValue))) {
        return false;
      }

      triggerChange(selectedValue);
      triggerOpen(false);
      resetText();
      return true;
    },
    onCancel: () => {
      triggerOpen(false);
      setSelectedValue(mergedValue);
      resetText();
    },
    onKeyDown: (event: KeyboardEvent, preventDefault: () => void) => {
      onKeyDown?.(event, preventDefault);
    },
    onFocus,
    onBlur,
  });

  useEffect(() => {
    if (!mergedOpen) {
      setSelectedValue(mergedValue);

      if (valueTexts.length && valueTexts[0] !== '') {
        if (triggerTextChange !== valueTexts) {
          resetText();
        }
      } else {
        triggerTextChange('');
      }
    }
  }, [mergedOpen, valueTexts]);

  useEffect(() => {
    if (!mergedOpen) {
      resetText();
    }
  }, [picker]);

  useEffect(() => {
    setSelectedValue(mergedValue);
  }, [mergedValue]);

  if (pickerRef) {
    pickerRef.current = {
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    };
  }

  const [text, onDateMouseEnter, onDateMouseLeave] = useHoverValue(valueTexts, {
    formatList,
    generateConfig,
    locale,
  });

  const panelProps = {
    ...props,
    className: undefined,
    style: undefined,
    pickerValue: undefined,
    onPickerValueChange: undefined,
    onChange: null,
  };

  let panel = createElement(PickerPanel, {
    ...panelProps,
    generateConfig,
    className: classNames({
      [`${prefixCls}-panel-focused`]: !typing,
    }),
    value: selectedValue,
    locale,
    tabIndex: -1,
    onSelect: (date: DateType) => {
      onSelect?.(date);
      setSelectedValue(date);
    },
    direction,
    onPanelChange: (date: DateType, mode: PickerMode) => {
      const { onPanelChange } = props;
      clearHoverValue();
      onPanelChange?.(date, mode);
    },
  });

  if (panelRender) {
    panel = panelRender(panel);
  }

  const panelNode = createElement('div', {
    className: `${prefixCls}-panel-container`,
    onMouseDown: (event: MouseEvent) => {
      event.preventDefault();
    },
  }, panel);

  let suffixNode: ReactNode;
  let clearNode: ReactNode;

  if (suffixIcon) {
    suffixNode = createElement('span', {
      className: `${prefixCls}-suffix`,
    }, suffixIcon);
  }

  if (allowClear && mergedValue && !disabled) {
    clearNode = createElement('span', {
      onMouseDown: (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
      onMouseUp: (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        triggerChange(null);
        triggerOpen(false);
      },
      className: `${prefixCls}-clear`,
      role: 'button',
    }, clearIcon || createElement('span', {
      className: `${prefixCls}-clear-btn`,
    }));
  }

  const popupPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';

  return createElement(PickerContext.Provider, {
    value: {
      operationRef,
      hideHeader: picker === 'time',
      panelRef: panelDivRef,
      onSelect: (date: DateType, type: 'key' | 'mouse' | 'submit') => {
        if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
          triggerChange(date);
          triggerOpen(false);
        }
      },
      open: mergedOpen,
      defaultOpenValue,
      onDateMouseEnter,
      onDateMouseLeave,
    },
  }, createElement(PickerTrigger, {
    visible: mergedOpen,
    popupElement: panelNode,
    popupStyle,
    prefixCls,
    dropdownClassName,
    dropdownAlign,
    getPopupContainer,
    transitionName,
    popupPlacement,
    direction,
  }, createElement('div', {
    ref: containerRef,
    className: classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    }),
    style,
    onMouseDown,
    onMouseUp: (event: MouseEvent<HTMLDivElement>) => {
      onMouseUp?.(event);
      if (inputRef.current) {
        inputRef.current.focus();
        triggerOpen(true);
      }
    },
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
  }, createElement('div', {
    className: classNames(`${prefixCls}-input`, {
      [`${prefixCls}-input-placeholder`]: !!text,
    }),
    ref: inputDivRef,
  }, createElement('input', {
    id,
    tabIndex,
    disabled,
    readOnly: inputReadOnly || typeof formatList[0] === 'function' || !typing,
    value: text || valueTexts,
    onChange: (event) => {
      triggerTextChange(event.target.value);
    },
    autoFocus,
    placeholder,
    ref: inputRef,
    title: valueTexts,
    ...inputProps,
    size: getInputSize(picker, formatList[0], generateConfig),
    ...pickAttrs(props),
    autoComplete,
  }), suffixNode, clearNode))));
}

class Picker<DateType> extends Component<PickerSharedProps<DateType>> {
  pickerRef = createRef<PickerRef>();

  focus = (): void => {
    this.pickerRef.current?.focus();
  };

  blur = (): void => {
    this.pickerRef.current?.blur();
  };

  render(): JSX.Element {
    return createElement(InternalPicker, {
      ...this.props,
      pickerRef: this.pickerRef,
    });
  }
}

export default Picker;