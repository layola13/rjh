import React, { useContext, useState, useEffect, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { cloneElement } from './utils';
import { responsiveArray, ResponsiveObserver } from './responsive';
import DescriptionsRow from './DescriptionsRow';
import DescriptionsItem from './DescriptionsItem';

/**
 * 响应式断点列数配置
 */
interface ResponsiveMap {
  xxl: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

/**
 * Descriptions 组件的 Context 类型
 */
interface DescriptionsContextValue {
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /** 内容样式 */
  contentStyle?: CSSProperties;
}

/**
 * Descriptions Context
 * 用于向子组件传递样式配置
 */
export const DescriptionsContext = React.createContext<DescriptionsContextValue>({});

/**
 * Descriptions 组件属性
 */
interface DescriptionsProps {
  /** 样式前缀 */
  prefixCls?: string;
  /** 标题 */
  title?: ReactNode;
  /** 额外内容（显示在右上角） */
  extra?: ReactNode;
  /** 列数配置，可以是数字或响应式对象 */
  column?: number | Partial<ResponsiveMap>;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 布局方式 */
  layout?: 'horizontal' | 'vertical';
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 尺寸 */
  size?: 'default' | 'middle' | 'small';
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /** 内容样式 */
  contentStyle?: CSSProperties;
}

/**
 * 默认响应式列数配置
 */
const DEFAULT_COLUMN_MAP: ResponsiveMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

/**
 * 调整子元素的 span 属性以适应列数
 * @param element - React 元素
 * @param itemSpan - 元素的 span 值
 * @param columnCount - 当前列数
 * @returns 调整后的元素
 */
function adjustElementSpan(
  element: React.ReactElement,
  itemSpan: number | undefined,
  columnCount: number
): React.ReactElement {
  let adjustedElement = element;

  // 如果 span 未定义或超过列数，则调整为列数
  if (itemSpan === undefined || itemSpan > columnCount) {
    adjustedElement = cloneElement(element, {
      span: columnCount,
    });

    // 开发环境警告
    if (process.env.NODE_ENV !== 'production' && itemSpan === undefined) {
      console.warn(
        'Descriptions',
        'Sum of column `span` in a line not match `column` of Descriptions.'
      );
    }
  }

  return adjustedElement;
}

/**
 * 根据列数配置和响应式状态计算实际列数
 * @param column - 列数配置
 * @param screens - 当前响应式状态
 * @returns 实际列数
 */
function getActualColumn(
  column: number | Partial<ResponsiveMap>,
  screens: Partial<Record<keyof ResponsiveMap, boolean>>
): number {
  // 如果是数字，直接返回
  if (typeof column === 'number') {
    return column;
  }

  // 如果是响应式对象，根据当前屏幕尺寸返回对应列数
  if (typeof column === 'object') {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i] as keyof ResponsiveMap;
      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }

  // 默认返回 3 列
  return 3;
}

/**
 * 将子元素按列数分组为行
 * @param children - 子元素
 * @param columnCount - 列数
 * @returns 分组后的行数组
 */
function groupChildrenIntoRows(
  children: ReactNode,
  columnCount: number
): React.ReactElement[][] {
  // 过滤掉无效子元素
  const validChildren = React.Children.toArray(children).filter(
    (child) => child
  ) as React.ReactElement[];

  const rows: React.ReactElement[][] = [];
  let currentRow: React.ReactElement[] = [];
  let remainingColumns = columnCount;

  validChildren.forEach((child, index) => {
    const itemSpan = child.props?.span;
    const span = itemSpan || 1;

    // 如果是最后一个元素
    if (index === validChildren.length - 1) {
      currentRow.push(adjustElementSpan(child, itemSpan, remainingColumns));
      rows.push(currentRow);
      return;
    }

    // 如果当前行还能容纳这个元素
    if (span < remainingColumns) {
      remainingColumns -= span;
      currentRow.push(child);
    } else {
      // 当前行已满，开始新行
      currentRow.push(adjustElementSpan(child, span, remainingColumns));
      rows.push(currentRow);
      remainingColumns = columnCount;
      currentRow = [];
    }
  });

  return rows;
}

/**
 * Descriptions 组件
 * 用于展示成组的只读数据
 */
function Descriptions(props: DescriptionsProps): JSX.Element {
  const {
    prefixCls: customPrefixCls,
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
    contentStyle,
  } = props;

  // 获取配置上下文
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('descriptions', customPrefixCls);

  // 响应式状态
  const [screens, setScreens] = useState<Partial<Record<keyof ResponsiveMap, boolean>>>({});

  // 计算实际列数
  const actualColumn = getActualColumn(column, screens);

  // 监听响应式变化
  useEffect(() => {
    const token = ResponsiveObserver.subscribe((currentScreens) => {
      if (typeof column === 'object') {
        setScreens(currentScreens);
      }
    });

    return () => {
      ResponsiveObserver.unsubscribe(token);
    };
  }, [column]);

  // 将子元素分组为行
  const rows = groupChildrenIntoRows(children, actualColumn);

  // 构建类名
  const descriptionClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size && size !== 'default',
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <DescriptionsContext.Provider value={{ labelStyle, contentStyle }}>
      <div className={descriptionClassName} style={style}>
        {/* 标题和额外内容 */}
        {(title || extra) && (
          <div className={`${prefixCls}-header`}>
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
        )}

        {/* 内容区域 */}
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

// 绑定 Item 子组件
Descriptions.Item = DescriptionsItem;

export default Descriptions;