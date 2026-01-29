import React, { createContext, useContext, useState, useEffect, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import { cloneElement, isValidElement } from 'react';
import warning from 'rc-util/lib/warning';
import toArray from 'rc-util/lib/Children/toArray';
import { ConfigContext } from '../config-provider';
import ResponsiveObserve, { responsiveArray, Breakpoint, ScreenMap } from '../_util/responsiveObserve';
import DescriptionsRow from './Row';
import DescriptionsItem from './Item';

type ColumnType = number | Partial<Record<Breakpoint, number>>;

interface DescriptionsContextValue {
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

export const DescriptionsContext = createContext<DescriptionsContextValue>({});

const DEFAULT_COLUMN_MAP: Record<Breakpoint, number> = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};

function getColumn(column: ColumnType, screens: ScreenMap): number {
  if (typeof column === 'number') {
    return column;
  }

  if (typeof column === 'object') {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i];
      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }

  return 3;
}

function cloneElementWithSpan(
  element: React.ReactElement,
  span: number | undefined,
  maxSpan: number
): React.ReactElement {
  let result = element;

  if (span === undefined || span > maxSpan) {
    result = cloneElement(element, { span: maxSpan });
    warning(
      span === undefined,
      'Descriptions',
      'Sum of column `span` in a line not match `column` of Descriptions.'
    );
  }

  return result;
}

function generateRows(
  children: ReactNode,
  columnCount: number
): React.ReactElement[][] {
  const items = toArray(children).filter((item) => item);
  const rows: React.ReactElement[][] = [];
  let currentRow: React.ReactElement[] = [];
  let remainingColumns = columnCount;

  items.forEach((item, index) => {
    const itemSpan = item.props?.span;
    const span = itemSpan || 1;

    if (index === items.length - 1) {
      currentRow.push(cloneElementWithSpan(item, itemSpan, remainingColumns));
      rows.push(currentRow);
      return;
    }

    if (span < remainingColumns) {
      remainingColumns -= span;
      currentRow.push(item);
    } else {
      currentRow.push(cloneElementWithSpan(item, span, remainingColumns));
      rows.push(currentRow);
      remainingColumns = columnCount;
      currentRow = [];
    }
  });

  return rows;
}

export interface DescriptionsProps {
  prefixCls?: string;
  title?: ReactNode;
  extra?: ReactNode;
  column?: ColumnType;
  colon?: boolean;
  bordered?: boolean;
  layout?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: 'default' | 'middle' | 'small';
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

function Descriptions(props: DescriptionsProps): React.ReactElement {
  const {
    prefixCls: customizePrefixCls,
    title,
    extra,
    column = DEFAULT_COLUMN_MAP,
    colon = true,
    bordered,
    layout,
    children,
    className,
    style,
    size,
    labelStyle,
    contentStyle
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

  const [screens, setScreens] = useState<ScreenMap>({});
  const columnCount = getColumn(column, screens);

  useEffect(() => {
    const token = ResponsiveObserve.subscribe((currentScreens) => {
      if (typeof column === 'object') {
        setScreens(currentScreens);
      }
    });

    return () => {
      ResponsiveObserve.unsubscribe(token);
    };
  }, [column]);

  const rows = generateRows(children, columnCount);

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size && size !== 'default',
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl'
    },
    className
  );

  return (
    <DescriptionsContext.Provider value={{ labelStyle, contentStyle }}>
      <div className={classString} style={style}>
        {(title || extra) && (
          <div className={`${prefixCls}-header`}>
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
        )}
        <div className={`${prefixCls}-view`}>
          <table>
            <tbody>
              {rows.map((row, index) => (
                <DescriptionsRow
                  key={index}
                  index={index}
                  colon={colon}
                  prefixCls={prefixCls}
                  vertical={layout === 'vertical'}
                  bordered={bordered}
                  row={row}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DescriptionsContext.Provider>
  );
}

Descriptions.Item = DescriptionsItem;

export default Descriptions;