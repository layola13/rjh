import React, { useRef, useImperativeHandle, forwardRef, MouseEvent, KeyboardEvent, ClipboardEvent, CompositionEvent, Ref } from 'react';
import KeyCode from './KeyCode';
import useDelayReset from './useDelayReset';
import MultipleSelector from './MultipleSelector';
import SingleSelector from './SingleSelector';

interface SelectorProps {
  prefixCls: string;
  multiple: boolean;
  open: boolean;
  mode: 'combobox' | 'tags' | 'multiple' | 'single';
  showSearch: boolean;
  tokenWithEnter: boolean;
  onSearch: (value: string, fromTyping: boolean, isComposing: boolean) => boolean | void;
  onSearchSubmit: (value: string) => void;
  onToggleOpen: (open?: boolean) => void;
  onInputKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  domRef: Ref<HTMLDivElement>;
}

interface SelectorRef {
  focus: () => void;
  blur: () => void;
}

const Selector = forwardRef<SelectorRef, SelectorProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef<boolean>(false);
  const pasteTextRef = useRef<string | null>(null);

  const {
    prefixCls,
    multiple,
    open,
    mode,
    showSearch,
    tokenWithEnter,
    onSearch,
    onSearchSubmit,
    onToggleOpen,
    onInputKeyDown,
    domRef
  } = props;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    }
  }));

  const [isMouseDown, triggerMouseDown] = useDelayReset(0);

  const handleSearch = (value: string): void => {
    const searchResult = onSearch(value, true, isComposingRef.current);
    if (searchResult !== false) {
      onToggleOpen(true);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = event.which;

    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      event.preventDefault();
    }

    onInputKeyDown?.(event);

    if (keyCode === KeyCode.ENTER && mode === 'tags' && !isComposingRef.current && !open) {
      onSearchSubmit((event.target as HTMLInputElement).value);
    }

    const ignoredKeys = [KeyCode.SHIFT, KeyCode.TAB, KeyCode.BACKSPACE, KeyCode.ESC];
    if (!ignoredKeys.includes(keyCode)) {
      onToggleOpen(true);
    }
  };

  const handleInputMouseDown = (): void => {
    triggerMouseDown(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value;

    if (tokenWithEnter && pasteTextRef.current && /[\r\n]/.test(pasteTextRef.current)) {
      const normalizedPasteText = pasteTextRef.current
        .replace(/[\r\n]+$/, '')
        .replace(/\r\n/g, ' ')
        .replace(/[\r\n]/g, ' ');
      value = value.replace(normalizedPasteText, pasteTextRef.current);
    }

    pasteTextRef.current = null;
    handleSearch(value);
  };

  const handleInputPaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    const pastedText = event.clipboardData.getData('text');
    pasteTextRef.current = pastedText;
  };

  const handleInputCompositionStart = (): void => {
    isComposingRef.current = true;
  };

  const handleInputCompositionEnd = (event: CompositionEvent<HTMLInputElement>): void => {
    isComposingRef.current = false;
    if (mode !== 'combobox') {
      handleSearch((event.target as HTMLInputElement).value);
    }
  };

  const handleSelectorClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target !== inputRef.current) {
      if (document.body.style.msTouchAction !== undefined) {
        setTimeout(() => {
          inputRef.current?.focus();
        });
      } else {
        inputRef.current?.focus();
      }
    }
  };

  const handleSelectorMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    const currentMouseDown = isMouseDown();

    if (event.target !== inputRef.current && !currentMouseDown) {
      event.preventDefault();
    }

    const shouldPreventToggle = (mode === 'combobox' || (showSearch && currentMouseDown)) && open;
    if (!shouldPreventToggle) {
      if (open) {
        onSearch('', true, false);
      }
      onToggleOpen();
    }
  };

  const sharedProps = {
    ...props,
    inputRef,
    onInputKeyDown: handleInputKeyDown,
    onInputMouseDown: handleInputMouseDown,
    onInputChange: handleInputChange,
    onInputPaste: handleInputPaste,
    onInputCompositionStart: handleInputCompositionStart,
    onInputCompositionEnd: handleInputCompositionEnd
  };

  const selectorContent = multiple ? (
    <MultipleSelector {...sharedProps} />
  ) : (
    <SingleSelector {...sharedProps} />
  );

  return (
    <div
      ref={domRef}
      className={`${prefixCls}-selector`}
      onClick={handleSelectorClick}
      onMouseDown={handleSelectorMouseDown}
    >
      {selectorContent}
    </div>
  );
});

Selector.displayName = 'Selector';

export default Selector;