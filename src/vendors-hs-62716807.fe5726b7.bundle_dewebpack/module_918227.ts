import React, { useContext, ReactElement, CSSProperties } from 'react';
import DescriptionsCell from './DescriptionsCell';
import { DescriptionsContext } from './DescriptionsContext';

interface DescriptionsItemProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  span?: number;
  key?: string | number;
}

interface RowProps {
  prefixCls: string;
  vertical?: boolean;
  row: ReactElement<DescriptionsItemProps>[];
  index: number;
  bordered?: boolean;
  colon?: boolean;
}

interface RenderCellOptions {
  component: string | [string, string];
  type: 'label' | 'content' | 'item';
  showLabel?: boolean;
  showContent?: boolean;
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

interface DescriptionsContextValue {
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

function renderCells(
  items: ReactElement<DescriptionsItemProps>[],
  rowProps: RowProps,
  options: RenderCellOptions
): (ReactElement | ReactElement[])[] {
  const { colon, prefixCls, bordered } = rowProps;
  const { component, type, showLabel, showContent, labelStyle, contentStyle } = options;

  return items.map((item, index) => {
    const {
      label,
      children,
      prefixCls: itemPrefixCls = prefixCls,
      className,
      style,
      labelStyle: itemLabelStyle,
      contentStyle: itemContentStyle,
      span = 1,
    } = item.props;

    const key = item.key;

    if (typeof component === 'string') {
      return React.createElement(DescriptionsCell, {
        key: `${type}-${key ?? index}`,
        className,
        style,
        labelStyle: { ...labelStyle, ...itemLabelStyle },
        contentStyle: { ...contentStyle, ...itemContentStyle },
        span,
        colon,
        component,
        itemPrefixCls,
        bordered,
        label: showLabel ? label : null,
        content: showContent ? children : null,
      });
    }

    return [
      React.createElement(DescriptionsCell, {
        key: `label-${key ?? index}`,
        className,
        style: { ...labelStyle, ...style, ...itemLabelStyle },
        span: 1,
        colon,
        component: component[0],
        itemPrefixCls,
        bordered,
        label,
      }),
      React.createElement(DescriptionsCell, {
        key: `content-${key ?? index}`,
        className,
        style: { ...contentStyle, ...style, ...itemContentStyle },
        span: 2 * span - 1,
        component: component[1],
        itemPrefixCls,
        bordered,
        content: children,
      }),
    ];
  });
}

export default function DescriptionsRow(props: RowProps): ReactElement {
  const contextValue = useContext<DescriptionsContextValue>(DescriptionsContext);
  const { prefixCls, vertical, row, index, bordered } = props;

  if (vertical) {
    return (
      <React.Fragment>
        <tr key={`label-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'th',
            type: 'label',
            showLabel: true,
            ...contextValue,
          })}
        </tr>
        <tr key={`content-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
            ...contextValue,
          })}
        </tr>
      </React.Fragment>
    );
  }

  return (
    <tr key={index} className={`${prefixCls}-row`}>
      {renderCells(row, props, {
        component: bordered ? ['th', 'td'] : 'td',
        type: 'item',
        showLabel: true,
        showContent: true,
        ...contextValue,
      })}
    </tr>
  );
}