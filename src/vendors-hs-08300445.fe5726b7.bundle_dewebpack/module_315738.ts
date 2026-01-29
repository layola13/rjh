import { useEffect, useRef, useState, useImperativeHandle, forwardRef, Fragment, createElement, isValidElement, RefObject, CSSProperties, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import KeyCode from './KeyCode';
import { getOptionProps } from './utils';
import { useMemo } from './hooks';
import classNames from 'classnames';
import VirtualList from './VirtualList';
import TransBtn from './TransBtn';

interface OptionData {
  value: string | number;
  label?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  title?: string;
  key?: string | number;
  style?: CSSProperties;
  className?: string;
  [key: string]: unknown;
}

interface FlattenOptionData {
  group?: boolean;
  groupOption?: boolean;
  data: OptionData;
  key: string | number;
}

interface SelectionInfo {
  selected: boolean;
}

interface ActiveValueInfo {
  source: 'keyboard' | 'mouse';
}

interface OptionListProps {
  prefixCls: string;
  id: string;
  flattenOptions: FlattenOptionData[];
  childrenAsData: boolean;
  values: Set<string | number>;
  searchValue: string;
  multiple: boolean;
  defaultActiveFirstOption: boolean | undefined;
  height: number;
  itemHeight: number;
  notFoundContent?: ReactNode;
  open: boolean;
  menuItemSelectedIcon?: ReactNode | ((props: { isSelected: boolean }) => ReactNode);
  virtual: boolean;
  onSelect: (value: string | number, info: SelectionInfo) => void;
  onToggleOpen: (open: boolean) => void;
  onActiveValue: (value: string | number | null, index: number, info: ActiveValueInfo) => void;
  onScroll: (e: Event) => void;
  onMouseEnter: (e: MouseEvent) => void;
}

export interface OptionListRef {
  onKeyDown: (e: KeyboardEvent) => void;
  onKeyUp: () => void;
  scrollTo: (index: number) => void;
}

const OptionList = forwardRef<OptionListRef, OptionListProps>((props, ref) => {
  const {
    prefixCls,
    id,
    flattenOptions,
    childrenAsData,
    values,
    searchValue,
    multiple,
    defaultActiveFirstOption,
    height,
    itemHeight,
    notFoundContent,
    open,
    menuItemSelectedIcon,
    virtual,
    onSelect,
    onToggleOpen,
    onActiveValue,
    onScroll,
    onMouseEnter
  } = props;

  const itemPrefixCls = `${prefixCls}-item`;

  const memoizedFlattenOptions = useMemo(
    () => flattenOptions,
    [open, flattenOptions],
    (prev, next) => next[0] && prev[1] !== next[1]
  );

  const listRef = useRef<{ scrollTo: (config: { index: number } | undefined) => void }>(null);

  const preventDefault = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const scrollIntoView = (index: number): void => {
    if (listRef.current) {
      listRef.current.scrollTo({ index });
    }
  };

  const getEnabledActiveIndex = (startIndex: number, step: number = 1): number => {
    const total = memoizedFlattenOptions.length;
    for (let i = 0; i < total; i += 1) {
      const currentIndex = (startIndex + i * step + total) % total;
      const option = memoizedFlattenOptions[currentIndex];
      const { group, data } = option;
      if (!group && !data.disabled) {
        return currentIndex;
      }
    }
    return -1;
  };

  const [activeIndex, setActiveIndex] = useState<number>(() => getEnabledActiveIndex(0));

  const setActive = (index: number, fromKeyboard: boolean = false): void => {
    setActiveIndex(index);
    const info: ActiveValueInfo = {
      source: fromKeyboard ? 'keyboard' : 'mouse'
    };
    const option = memoizedFlattenOptions[index];
    if (option) {
      onActiveValue(option.data.value, index, info);
    } else {
      onActiveValue(null, -1, info);
    }
  };

  useEffect(() => {
    setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
  }, [memoizedFlattenOptions.length, searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!multiple && open && values.size === 1) {
        const selectedValue = Array.from(values)[0];
        const selectedIndex = memoizedFlattenOptions.findIndex(
          (option) => option.data.value === selectedValue
        );
        setActive(selectedIndex);
        scrollIntoView(selectedIndex);
      }
    });

    if (open) {
      listRef.current?.scrollTo(undefined);
    }

    return () => clearTimeout(timer);
  }, [open]);

  const selectValue = (value: string | number | undefined): void => {
    if (value !== undefined) {
      onSelect(value, { selected: !values.has(value) });
    }
    if (!multiple) {
      onToggleOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: (e: KeyboardEvent): void => {
      const { which } = e;
      switch (which) {
        case KeyCode.UP:
        case KeyCode.DOWN: {
          let offset = 0;
          if (which === KeyCode.UP) {
            offset = -1;
          } else if (which === KeyCode.DOWN) {
            offset = 1;
          }
          if (offset !== 0) {
            const nextIndex = getEnabledActiveIndex(activeIndex + offset, offset);
            scrollIntoView(nextIndex);
            setActive(nextIndex, true);
          }
          break;
        }
        case KeyCode.ENTER: {
          const activeOption = memoizedFlattenOptions[activeIndex];
          if (activeOption && !activeOption.data.disabled) {
            selectValue(activeOption.data.value);
          } else {
            selectValue(undefined);
          }
          if (open) {
            e.preventDefault();
          }
          break;
        }
        case KeyCode.ESC: {
          onToggleOpen(false);
          if (open) {
            e.stopPropagation();
          }
          break;
        }
      }
    },
    onKeyUp: (): void => {},
    scrollTo: (index: number): void => {
      scrollIntoView(index);
    }
  }));

  if (memoizedFlattenOptions.length === 0) {
    return createElement('div', {
      role: 'listbox',
      id: `${id}_list`,
      className: `${itemPrefixCls}-empty`,
      onMouseDown: preventDefault
    }, notFoundContent);
  }

  function renderOption(index: number): ReactNode {
    const option = memoizedFlattenOptions[index];
    if (!option) return null;

    const optionData = option.data || {};
    const { value, label, children } = optionData;
    const optionProps = getOptionProps(optionData, true);
    const content = childrenAsData ? children : label;

    return createElement('div', {
      'aria-label': typeof content === 'string' ? content : null,
      ...optionProps,
      key: index,
      role: 'option',
      id: `${id}_list_${index}`,
      'aria-selected': values.has(value)
    }, value);
  }

  return createElement(Fragment, null,
    createElement('div', {
      role: 'listbox',
      id: `${id}_list`,
      style: {
        height: 0,
        width: 0,
        overflow: 'hidden'
      }
    }, renderOption(activeIndex - 1), renderOption(activeIndex), renderOption(activeIndex + 1)),
    createElement(VirtualList, {
      itemKey: 'key',
      ref: listRef,
      data: memoizedFlattenOptions,
      height,
      itemHeight,
      fullHeight: false,
      onMouseDown: preventDefault,
      onScroll,
      virtual,
      onMouseEnter
    }, (option: FlattenOptionData, index: number) => {
      const { group, groupOption, data } = option;
      const { label, key } = data;

      if (group) {
        return createElement('div', {
          className: classNames(itemPrefixCls, `${itemPrefixCls}-group`)
        }, label !== undefined ? label : key);
      }

      const { disabled, value, title, children, style, className, ...restProps } = data;
      const isSelected = values.has(value);
      const optionClassName = `${itemPrefixCls}-option`;
      const optionClasses = classNames(
        itemPrefixCls,
        optionClassName,
        className,
        {
          [`${optionClassName}-grouped`]: groupOption,
          [`${optionClassName}-active`]: activeIndex === index && !disabled,
          [`${optionClassName}-disabled`]: disabled,
          [`${optionClassName}-selected`]: isSelected
        }
      );

      const showIcon = !menuItemSelectedIcon || typeof menuItemSelectedIcon === 'function' || isSelected;
      const content = (childrenAsData ? children : label) || value;
      let ariaLabel: string | undefined = typeof content === 'string' || typeof content === 'number' 
        ? content.toString() 
        : undefined;
      
      if (title !== undefined) {
        ariaLabel = title;
      }

      return createElement('div', {
        ...restProps,
        'aria-selected': isSelected,
        className: optionClasses,
        title: ariaLabel,
        onMouseMove: () => {
          if (activeIndex === index || disabled) return;
          setActive(index);
        },
        onClick: () => {
          if (!disabled) {
            selectValue(value);
          }
        },
        style
      },
        createElement('div', {
          className: `${optionClassName}-content`
        }, content),
        (isValidElement(menuItemSelectedIcon) || isSelected) && showIcon && createElement(TransBtn, {
          className: `${itemPrefixCls}-option-state`,
          customizeIcon: menuItemSelectedIcon,
          customizeIconProps: { isSelected }
        }, isSelected ? '✓' : null)
      );
    })
  );
});

OptionList.displayName = 'OptionList';

export default OptionList;