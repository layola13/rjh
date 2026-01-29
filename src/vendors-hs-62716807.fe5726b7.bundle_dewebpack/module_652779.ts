import React, { useContext } from 'react';
import classNames from 'classnames';
import RcPagination from 'rc-pagination';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import MiniSelect from './MiniSelect';
import Select from '../select';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from '../locale/en_US';
import { ConfigContext } from '../config-provider';
import useBreakpoint from '../grid/hooks/useBreakpoint';

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
}

type PaginationSize = 'default' | 'small';

interface PaginationProps {
  prefixCls?: string;
  selectPrefixCls?: string;
  className?: string;
  size?: PaginationSize;
  locale?: PaginationLocale;
  responsive?: boolean;
  [key: string]: unknown;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    prefixCls,
    selectPrefixCls,
    className,
    size,
    locale,
    ...restProps
  } = props;

  const screens = useBreakpoint();
  const isExtraSmall = screens.xs;

  const { getPrefixCls, direction } = useContext(ConfigContext);

  const paginationPrefixCls = getPrefixCls('pagination', prefixCls);

  const renderPagination = (contextLocale: PaginationLocale) => {
    const mergedLocale: PaginationLocale = {
      ...contextLocale,
      ...locale,
    };

    const isSmall = size === 'small' || (!isExtraSmall && size && !restProps.responsive);
    const selectPrefixClsValue = getPrefixCls('select', selectPrefixCls);

    const paginationClassName = classNames(
      {
        mini: isSmall,
        [`${paginationPrefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    const getIconsProps = () => {
      const itemEllipsis = (
        <span className={`${paginationPrefixCls}-item-ellipsis`}>•••</span>
      );

      let prevIcon = (
        <button
          className={`${paginationPrefixCls}-item-link`}
          type="button"
          tabIndex={-1}
        >
          <LeftOutlined />
        </button>
      );

      let nextIcon = (
        <button
          className={`${paginationPrefixCls}-item-link`}
          type="button"
          tabIndex={-1}
        >
          <RightOutlined />
        </button>
      );

      let jumpPrevIcon = (
        <a className={`${paginationPrefixCls}-item-link`}>
          <div className={`${paginationPrefixCls}-item-container`}>
            <DoubleLeftOutlined className={`${paginationPrefixCls}-item-link-icon`} />
            {itemEllipsis}
          </div>
        </a>
      );

      let jumpNextIcon = (
        <a className={`${paginationPrefixCls}-item-link`}>
          <div className={`${paginationPrefixCls}-item-container`}>
            <DoubleRightOutlined className={`${paginationPrefixCls}-item-link-icon`} />
            {itemEllipsis}
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
        prefixCls={paginationPrefixCls}
        selectPrefixCls={selectPrefixClsValue}
        {...getIconsProps()}
        className={paginationClassName}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={mergedLocale}
      />
    );
  };

  return (
    <LocaleReceiver componentName="Pagination" defaultLocale={enUS}>
      {renderPagination}
    </LocaleReceiver>
  );
};

export default Pagination;