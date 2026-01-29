import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import KeyCode from './KeyCode';
import EditOutlined from './EditOutlined';
import TextArea from './TextArea';

interface EditableContentProps {
  prefixCls: string;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'ltr' | 'rtl';
  maxLength?: number;
  autoSize?: boolean;
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

interface TextAreaRef {
  resizableTextArea?: {
    textArea: HTMLTextAreaElement;
  };
}

const EditableContent: React.FC<EditableContentProps> = (props) => {
  const {
    prefixCls,
    'aria-label': ariaLabel,
    className,
    style,
    direction,
    maxLength,
    autoSize = true,
    value,
    onSave,
    onCancel,
  } = props;

  const textAreaRef = useRef<TextAreaRef>(null);
  const isComposingRef = useRef<boolean>(false);
  const lastKeyCodeRef = useRef<number | undefined>();
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (textAreaRef.current?.resizableTextArea) {
      const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
      textAreaElement.focus();
      const length = textAreaElement.value.length;
      textAreaElement.setSelectionRange(length, length);
    }
  }, []);

  const handleSave = (): void => {
    onSave(currentValue.trim());
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value: newValue } = event.target;
    setCurrentValue(newValue.replace(/[\n\r]/g, ''));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { keyCode } = event;
    if (!isComposingRef.current) {
      lastKeyCodeRef.current = keyCode;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { keyCode, ctrlKey, altKey, metaKey, shiftKey } = event;

    if (
      lastKeyCodeRef.current !== keyCode ||
      isComposingRef.current ||
      ctrlKey ||
      altKey ||
      metaKey ||
      shiftKey
    ) {
      return;
    }

    if (keyCode === KeyCode.ENTER) {
      handleSave();
    } else if (keyCode === KeyCode.ESC) {
      onCancel();
    }
  };

  const handleCompositionStart = (): void => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (): void => {
    isComposingRef.current = false;
  };

  const handleBlur = (): void => {
    handleSave();
  };

  const contentClassName = classNames(
    prefixCls,
    `${prefixCls}-edit-content`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <div className={contentClassName} style={style}>
      <TextArea
        ref={textAreaRef}
        maxLength={maxLength}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        autoSize={autoSize}
      />
      <EditOutlined className={`${prefixCls}-edit-content-confirm`} />
    </div>
  );
};

export default EditableContent;