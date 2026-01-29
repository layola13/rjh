import React, { useRef, useState, useCallback, Fragment, MouseEvent, KeyboardEvent, CompositionEvent, FocusEvent, ClipboardEvent } from 'react';
import classNames from 'classnames';
import useLayoutEffect from '../hooks/useLayoutEffect';
import pickAttrs from '../utils/pickAttrs';
import Overflow from './Overflow';
import TransBtn from './TransBtn';
import Input from './Input';

interface SelectValue {
  key: string;
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
}

interface TagRenderProps {
  label: React.ReactNode;
  value: any;
  disabled?: boolean;
  closable?: boolean;
  onClose: () => void;
}

type MaxTagPlaceholder = React.ReactNode | ((omittedValues: SelectValue[]) => React.ReactNode);

interface SelectorProps {
  id: string;
  prefixCls: string;
  values: SelectValue[];
  open: boolean;
  searchValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  mode: 'multiple' | 'tags' | 'combobox';
  showSearch?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  accessibilityIndex: number;
  tabIndex?: number;
  removeIcon?: React.ReactNode;
  maxTagCount?: number;
  maxTagTextLength?: number;
  maxTagPlaceholder?: MaxTagPlaceholder;
  tagRender?: (props: TagRenderProps) => React.ReactElement;
  onToggleOpen: (open: boolean) => void;
  onSelect: (value: any, option: { selected: boolean }) => void;
  onInputChange: (value: string) => void;
  onInputPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onInputMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
  onInputCompositionStart: (event: CompositionEvent<HTMLInputElement>) => void;
  onInputCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => void;
}

const preventDefault = (event: MouseEvent): void => {
  event.preventDefault();
  event.stopPropagation();
};

const Selector: React.FC<SelectorProps> = (props) => {
  const {
    id,
    prefixCls,
    values,
    open,
    searchValue,
    inputRef,
    placeholder,
    disabled = false,
    mode,
    showSearch,
    autoFocus,
    autoComplete,
    accessibilityIndex,
    tabIndex,
    removeIcon,
    maxTagCount,
    maxTagTextLength,
    maxTagPlaceholder = (omittedValues: SelectValue[]) => `+ ${omittedValues.length} ...`,
    tagRender,
    onToggleOpen,
    onSelect,
    onInputChange,
    onInputPaste,
    onInputKeyDown,
    onInputMouseDown,
    onInputCompositionStart,
    onInputCompositionEnd,
  } = props;

  const measureRef = useRef<HTMLSpanElement>(null);
  const [searchWidth, setSearchWidth] = useState<number>(0);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const selectionPrefixCls = `${prefixCls}-selection`;
  const displaySearchValue = open || mode === 'tags' ? searchValue : '';
  const isEditable = mode === 'tags' || (showSearch && (open || inputFocused));

  const renderItem = (
    label: React.ReactNode,
    itemDisabled: boolean,
    closable: boolean,
    onClose: (event: MouseEvent) => void
  ): React.ReactElement => {
    return (
      <span
        className={classNames(`${selectionPrefixCls}-item`, {
          [`${selectionPrefixCls}-item-disabled`]: itemDisabled,
        })}
      >
        <span className={`${selectionPrefixCls}-item-content`}>{label}</span>
        {closable && (
          <TransBtn
            className={`${selectionPrefixCls}-item-remove`}
            onMouseDown={preventDefault}
            onClick={onClose}
            customizeIcon={removeIcon}
          >
            ×
          </TransBtn>
        )}
      </span>
    );
  };

  const renderCustomTag = (
    value: any,
    label: React.ReactNode,
    itemDisabled: boolean,
    closable: boolean,
    onClose: () => void
  ): React.ReactElement => {
    return (
      <span
        onMouseDown={(event) => {
          preventDefault(event);
          onToggleOpen(!open);
        }}
      >
        {tagRender?.({
          label,
          value,
          disabled: itemDisabled,
          closable,
          onClose,
        })}
      </span>
    );
  };

  useLayoutEffect(() => {
    setSearchWidth(measureRef.current?.scrollWidth ?? 0);
  }, [displaySearchValue]);

  const handleFocus = (): void => {
    setInputFocused(true);
  };

  const handleBlur = (): void => {
    setInputFocused(false);
  };

  const searchNode = (
    <div
      className={`${selectionPrefixCls}-search`}
      style={{ width: searchWidth }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Input
        ref={inputRef}
        open={open}
        prefixCls={prefixCls}
        id={id}
        inputElement={null}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        editable={isEditable}
        accessibilityIndex={accessibilityIndex}
        value={displaySearchValue}
        onKeyDown={onInputKeyDown}
        onMouseDown={onInputMouseDown}
        onChange={onInputChange}
        onPaste={onInputPaste}
        onCompositionStart={onInputCompositionStart}
        onCompositionEnd={onInputCompositionEnd}
        tabIndex={tabIndex}
        attrs={pickAttrs(props, true)}
      />
      <span
        ref={measureRef}
        className={`${selectionPrefixCls}-search-mirror`}
        aria-hidden="true"
      >
        {displaySearchValue}&nbsp;
      </span>
    </div>
  );

  const overflowNode = (
    <Overflow
      prefixCls={`${selectionPrefixCls}-overflow`}
      data={values}
      renderItem={(item: SelectValue) => {
        const { disabled: itemDisabled = false, label, value } = item;
        const closable = !disabled && !itemDisabled;

        let displayLabel: React.ReactNode = label;
        if (typeof maxTagTextLength === 'number' && (typeof label === 'string' || typeof label === 'number')) {
          const labelString = String(displayLabel);
          if (labelString.length > maxTagTextLength) {
            displayLabel = `${labelString.slice(0, maxTagTextLength)}...`;
          }
        }

        const handleRemove = (event?: MouseEvent): void => {
          if (event) {
            event.stopPropagation();
          }
          onSelect(value, { selected: false });
        };

        return typeof tagRender === 'function'
          ? renderCustomTag(value, displayLabel, itemDisabled, closable, handleRemove)
          : renderItem(displayLabel, itemDisabled, closable, handleRemove);
      }}
      renderRest={(omittedValues: SelectValue[]) => {
        const restContent =
          typeof maxTagPlaceholder === 'function'
            ? maxTagPlaceholder(omittedValues)
            : maxTagPlaceholder;
        return renderItem(restContent, false, false, () => {});
      }}
      suffix={searchNode}
      itemKey="key"
      maxCount={maxTagCount}
    />
  );

  return (
    <Fragment>
      {overflowNode}
      {!values.length && !displaySearchValue && (
        <span className={`${selectionPrefixCls}-placeholder`}>{placeholder}</span>
      )}
    </Fragment>
  );
};

export default Selector;