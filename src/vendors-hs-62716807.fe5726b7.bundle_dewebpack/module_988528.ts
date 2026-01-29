import React, { useRef, useEffect, useContext, useImperativeHandle, forwardRef, CSSProperties, ChangeEvent } from 'react';
import { ConfigContext } from './ConfigContext';
import SizeContext from './SizeContext';
import TextArea from './TextArea';
import ClearableLabeledInput from './ClearableLabeledInput';
import { triggerFocus, resolveOnChange, fixControlledValue } from './utils';
import useMergedState from './hooks/useMergedState';
import classNames from 'classnames';

interface ShowCountFormatter {
  formatter: (options: { count: number; maxLength?: number }) => string;
}

type ShowCount = boolean | ShowCountFormatter;

interface TextAreaProps {
  prefixCls?: string;
  bordered?: boolean;
  showCount?: ShowCount;
  maxLength?: number;
  className?: string;
  style?: CSSProperties;
  size?: 'small' | 'middle' | 'large';
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  allowClear?: boolean;
  [key: string]: unknown;
}

interface TextAreaRef {
  resizableTextArea?: {
    textArea: HTMLTextAreaElement;
  };
  focus: (options?: FocusOptions) => void;
  blur: () => void;
}

interface InternalTextAreaRef {
  resizableTextArea?: {
    textArea: HTMLTextAreaElement;
  };
  blur: () => void;
}

type OmittedProps = 'prefixCls' | 'bordered' | 'showCount' | 'maxLength' | 'className' | 'style' | 'size';

const TextAreaWithCount = forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    bordered = true,
    showCount = false,
    maxLength,
    className,
    style,
    size,
    value,
    defaultValue,
    onChange,
    allowClear,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const contextSize = useContext(SizeContext);
  
  const textAreaRef = useRef<InternalTextAreaRef>(null);
  const clearableLabeledInputRef = useRef(null);
  
  const [mergedValue, setMergedValue] = useMergedState(defaultValue, { value });
  const previousValueRef = useRef<string | undefined>(value);

  useEffect(() => {
    if (value === undefined && previousValueRef.current === value) {
      return;
    }
    setMergedValue(value);
    previousValueRef.current = value;
  }, [value, previousValueRef.current]);

  const handleSetValue = (newValue: string, callback?: () => void): void => {
    if (value === undefined) {
      setMergedValue(newValue);
      callback?.();
    }
  };

  const prefixCls = getPrefixCls('input', customPrefixCls);

  useImperativeHandle(ref, () => ({
    resizableTextArea: textAreaRef.current?.resizableTextArea,
    focus: (options?: FocusOptions) => {
      const textArea = textAreaRef.current?.resizableTextArea?.textArea;
      triggerFocus(textArea, options);
    },
    blur: () => {
      textAreaRef.current?.blur();
    }
  }));

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    handleSetValue(e.target.value);
    resolveOnChange(textAreaRef.current, e, onChange);
  };

  const handleReset = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSetValue('', () => {
      textAreaRef.current?.focus();
    });
    resolveOnChange(textAreaRef.current, e, onChange);
  };

  const textAreaClassName = classNames({
    [`${prefixCls}-borderless`]: !bordered,
    [className as string]: className && !showCount,
    [`${prefixCls}-sm`]: contextSize === 'small' || size === 'small',
    [`${prefixCls}-lg`]: contextSize === 'large' || size === 'large'
  });

  const omitAllowClear = (obj: TextAreaProps): Omit<TextAreaProps, 'allowClear'> => {
    const { allowClear: _, ...rest } = obj;
    return rest;
  };

  const textAreaElement = (
    <TextArea
      {...omitAllowClear(restProps)}
      maxLength={maxLength}
      className={textAreaClassName}
      style={showCount ? undefined : style}
      prefixCls={prefixCls}
      onChange={handleChange}
      ref={textAreaRef}
    />
  );

  let fixedValue = fixControlledValue(mergedValue);
  const hasMaxLength = Number(maxLength) > 0;
  
  if (hasMaxLength) {
    const chars = Array.from(fixedValue ?? '');
    fixedValue = chars.slice(0, maxLength).join('');
  }

  const clearableLabeledInput = (
    <ClearableLabeledInput
      {...restProps}
      prefixCls={prefixCls}
      direction={direction}
      inputType="text"
      value={fixedValue}
      element={textAreaElement}
      handleReset={handleReset}
      ref={clearableLabeledInputRef}
      bordered={bordered}
    />
  );

  if (showCount) {
    const valueLength = Array.from(fixedValue ?? '').length;
    let countText = '';

    if (typeof showCount === 'object') {
      countText = showCount.formatter({ count: valueLength, maxLength });
    } else {
      countText = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;
    }

    return (
      <div
        className={classNames(
          `${prefixCls}-textarea`,
          {
            [`${prefixCls}-textarea-rtl`]: direction === 'rtl'
          },
          `${prefixCls}-textarea-show-count`,
          className
        )}
        style={style}
        data-count={countText}
      >
        {clearableLabeledInput}
      </div>
    );
  }

  return clearableLabeledInput;
});

export default TextAreaWithCount;