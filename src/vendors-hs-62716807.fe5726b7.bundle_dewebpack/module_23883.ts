import React, { useContext, useMemo, forwardRef, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import SizeContext from './SizeContext';
import RcSelect, { Option, OptGroup } from 'rc-select';
import { getIcons } from './utils/iconUtil';
import { omit } from './utils/omit';

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
    notFoundContent: customizeNotFoundContent,
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
  } = useContext(ConfigContext);

  const contextSize = useContext(SizeContext);
  const prefixCls = getPrefixCls('select', customizePrefixCls);

  const mode = useMemo(() => {
    const { mode: propsMode } = props;
    if (propsMode === 'combobox') {
      return undefined;
    }
    if (propsMode === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return propsMode;
  }, [props.mode]);

  const isMultiple = mode === 'multiple' || mode === 'tags';

  const notFoundContent = customizeNotFoundContent !== undefined
    ? customizeNotFoundContent
    : mode === 'combobox'
    ? null
    : renderEmpty('Select');

  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    prefixCls,
  });

  const rcSelectProps = omit(props, ['suffixIcon', 'itemIcon']);

  const mergedDropdownClassName = classNames(
    dropdownClassName,
    {
      [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
    }
  );

  const mergedSize = customizeSize || contextSize;

  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
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
      {...rcSelectProps}
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
      notFoundContent={notFoundContent}
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