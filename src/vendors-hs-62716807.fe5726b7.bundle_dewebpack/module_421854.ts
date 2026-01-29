import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import defaultLocale from './defaultLocale';
import LocaleReceiver from './LocaleReceiver';
import RcPagination from 'rc-pagination';
import useBreakpoint from './useBreakpoint';
import LeftOutlined from './icons/LeftOutlined';
import RightOutlined from './icons/RightOutlined';
import DoubleLeftOutlined from './icons/DoubleLeftOutlined';
import DoubleRightOutlined from './icons/DoubleRightOutlined';
import MiniSelect from './MiniSelect';
import Select from './Select';

interface PaginationLocale {
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
  [key: string]: string | undefined;
}

interface PaginationProps {
  prefixCls?: string;
  selectPrefixCls?: string;
  className?: string;
  size?: 'small' | 'default';
  locale?: PaginationLocale;
  responsive?: boolean;
  [key: string]: unknown;
}

type OmittedPaginationProps = Omit<
  PaginationProps,
  'prefixCls' | 'selectPrefixCls' | 'className' | 'size' | 'locale'
>;

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    selectPrefixCls: customizeSelectPrefixCls,
    className,
    size,
    locale: customLocale,
    ...restProps
  } = props;

  const { xs: isExtraSmall } = useBreakpoint();
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  const renderPagination = (contextLocale: PaginationLocale) => {
    const mergedLocale: PaginationLocale = {
      ...contextLocale,
      ...customLocale,
    };

    const isSmall = size === 'small' || (!!(isExtraSmall && !size && restProps.responsive));
    const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);

    const mergedClassName = classNames(
      {
        mini: isSmall,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    const getIcons = () => {
      const ellipsis = (
        <span className={`${prefixCls}-item-ellipsis`}>•••</span>
      );

      let prevIcon = (
        <button
          className={`${prefixCls}-item-link`}
          type="button"
          tabIndex={-1}
        >
          <LeftOutlined />
        </button>
      );

      let nextIcon = (
        <button
          className={`${prefixCls}-item-link`}
          type="button"
          tabIndex={-1}
        >
          <RightOutlined />
        </button>
      );

      let jumpPrevIcon = (
        <a className={`${prefixCls}-item-link`}>
          <div className={`${prefixCls}-item-container`}>
            <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
            {ellipsis}
          </div>
        </a>
      );

      let jumpNextIcon = (
        <a className={`${prefixCls}-item-link`}>
          <div className={`${prefixCls}-item-container`}>
            <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
            {ellipsis}
          </div>
        </a>
      );

      if (direction === 'rtl') {
        [prevIcon, nextIcon] = [nextIcon, prevIcon];
        [jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon];
      }

      return {
        prevIcon,
        nextIcon,
        jumpPrevIcon,
        jumpNextIcon,
      };
    };

    return (
      <RcPagination
        {...restProps}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        {...getIcons()}
        className={mergedClassName}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={mergedLocale}
      />
    );
  };

  return (
    <LocaleReceiver componentName="Pagination" defaultLocale={defaultLocale}>
      {renderPagination}
    </LocaleReceiver>
  );
};

export default Pagination;