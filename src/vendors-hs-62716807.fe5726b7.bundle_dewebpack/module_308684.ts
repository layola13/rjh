import React, { useContext, useMemo, forwardRef, ForwardRefRenderFunction } from 'react';
import { ConfigContext } from './ConfigContext';
import { SizeContext } from './SizeContext';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import { getIcons } from './utils/iconUtil';

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

type SizeType = 'small' | 'middle' | 'large';
type DirectionType = 'ltr' | 'rtl';

interface SelectProps<T = any> {
  prefixCls?: string;
  bordered?: boolean;
  className?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  dropdownClassName?: string;
  listHeight?: number;
  listItemHeight?: number;
  size?: SizeType;
  notFoundContent?: React.ReactNode;
  transitionName?: string;
  mode?: 'multiple' | 'tags' | 'combobox' | typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;
  suffixIcon?: React.ReactNode;
  itemIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
  direction?: DirectionType;
  [key: string]: any;
}

interface ConfigContextType {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  renderEmpty: (componentName: string) => React.ReactNode;
  direction?: DirectionType;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
}

const InternalSelect: ForwardRefRenderFunction<any, SelectProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    getPopupContainer: customizeGetPopupContainer,
    dropdownClassName,
    listHeight = 256,
    listItemHeight = 24,
    size: customizeSize,
    notFoundContent,
    transitionName = 'slide-up',
    ...restProps
  } = props;

  const {
    getPopupContainer: contextGetPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  } = useContext<ConfigContextType>(ConfigContext);

  const contextSize = useContext(SizeContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);

  const mode = useMemo(() => {
    const { mode: propsMode } = restProps;
    if (propsMode === 'combobox') {
      return undefined;
    }
    if (propsMode === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return propsMode;
  }, [restProps.mode]);

  const isMultiple = mode === 'multiple' || mode === 'tags';

  const mergedNotFoundContent = notFoundContent !== undefined 
    ? notFoundContent 
    : mode === 'combobox' 
      ? null 
      : renderEmpty('Select');

  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...restProps,
    multiple: isMultiple,
    prefixCls,
  });

  const omittedProps = omit(restProps, ['suffixIcon', 'itemIcon']);

  const mergedDropdownClassName = classNames(
    dropdownClassName,
    {
      [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
    }
  );

  const size = customizeSize || contextSize;

  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className
  );

  return (
    <RcSelect
      ref={ref}
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...omittedProps}
      transitionName={transitionName}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode}
      prefixCls={prefixCls}
      direction={direction}
      inputIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      notFoundContent={mergedNotFoundContent}
      className={mergedClassName}
      getPopupContainer={customizeGetPopupContainer || contextGetPopupContainer}
      dropdownClassName={mergedDropdownClassName}
    />
  );
};

const Select = forwardRef(InternalSelect);

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;