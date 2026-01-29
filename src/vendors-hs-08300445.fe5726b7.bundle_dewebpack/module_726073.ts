import React from 'react';
import classNames from 'classnames';
import { getPathValue } from './utils';
import { supportRef } from './ref-utils';

interface CellProps<RecordType = any> {
  prefixCls: string;
  className?: string;
  record: RecordType;
  index: number;
  dataIndex?: string | number | readonly (string | number)[];
  render?: (value: any, record: RecordType, index: number) => React.ReactNode | RenderedCell<any>;
  children?: React.ReactNode;
  component?: React.ElementType;
  colSpan?: number;
  rowSpan?: number;
  fixLeft?: number | boolean;
  fixRight?: number | boolean;
  firstFixLeft?: boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  lastFixRight?: boolean;
  appendNode?: React.ReactNode;
  additionalProps?: React.HTMLAttributes<HTMLElement>;
  ellipsis?: boolean | EllipsisConfig;
  align?: 'left' | 'center' | 'right';
  rowType?: 'header' | 'body' | 'footer';
  isSticky?: boolean;
  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
}

interface RenderedCell<ValueType> {
  children?: React.ReactNode;
  props?: React.HTMLAttributes<HTMLElement> & {
    colSpan?: number;
    rowSpan?: number;
    style?: React.CSSProperties;
    className?: string;
  };
}

interface EllipsisConfig {
  showTitle?: boolean;
}

function CellComponent<RecordType = any>(
  props: CellProps<RecordType>,
  ref: React.Ref<HTMLElement>
): React.ReactElement | null {
  const {
    prefixCls,
    className,
    record,
    index,
    dataIndex,
    render,
    children,
    component: Component = 'td',
    colSpan,
    rowSpan,
    fixLeft,
    fixRight,
    firstFixLeft,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    appendNode,
    additionalProps = {},
    ellipsis,
    align,
    rowType,
    isSticky,
  } = props;

  const cellPrefixCls = `${prefixCls}-cell`;

  let cellContent: React.ReactNode;
  let cellProps: RenderedCell<any>['props'];

  if (children !== undefined) {
    cellContent = children;
  } else {
    const cellValue = getPathValue(record, dataIndex);
    cellContent = cellValue;

    if (render) {
      const renderResult = render(cellValue, record, index);
      
      if (isRenderedCell(renderResult)) {
        cellContent = renderResult.children;
        cellProps = renderResult.props;
      } else {
        cellContent = renderResult;
      }
    }
  }

  if (!isValidCellContent(cellContent)) {
    cellContent = null;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    cellContent = (
      <span className={`${cellPrefixCls}-content`}>
        {cellContent}
      </span>
    );
  }

  const mergedCellProps = cellProps ?? {};
  const {
    colSpan: cellColSpan,
    rowSpan: cellRowSpan,
    style: cellStyle,
    className: cellClassName,
    ...restCellProps
  } = mergedCellProps;

  const finalColSpan = cellColSpan !== undefined ? cellColSpan : colSpan;
  const finalRowSpan = cellRowSpan !== undefined ? cellRowSpan : rowSpan;

  if (finalColSpan === 0 || finalRowSpan === 0) {
    return null;
  }

  const fixedStyle: React.CSSProperties = {};
  const hasFixLeft = typeof fixLeft === 'number';
  const hasFixRight = typeof fixRight === 'number';

  if (hasFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }

  if (hasFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight;
  }

  const alignStyle: React.CSSProperties = {};
  if (align) {
    alignStyle.textAlign = align;
  }

  const ellipsisConfig: EllipsisConfig | boolean = ellipsis === true 
    ? { showTitle: true } 
    : ellipsis || false;

  let title: string | undefined;
  if (ellipsisConfig && (typeof ellipsisConfig === 'object' && ellipsisConfig.showTitle || rowType === 'header')) {
    if (typeof cellContent === 'string' || typeof cellContent === 'number') {
      title = cellContent.toString();
    } else if (React.isValidElement(cellContent) && typeof cellContent.props.children === 'string') {
      title = cellContent.props.children;
    }
  }

  const cellClassNames = classNames(
    cellPrefixCls,
    className,
    {
      [`${cellPrefixCls}-fix-left`]: hasFixLeft,
      [`${cellPrefixCls}-fix-left-first`]: firstFixLeft,
      [`${cellPrefixCls}-fix-left-last`]: lastFixLeft,
      [`${cellPrefixCls}-fix-right`]: hasFixRight,
      [`${cellPrefixCls}-fix-right-first`]: firstFixRight,
      [`${cellPrefixCls}-fix-right-last`]: lastFixRight,
      [`${cellPrefixCls}-ellipsis`]: ellipsis,
      [`${cellPrefixCls}-with-append`]: appendNode,
      [`${cellPrefixCls}-fix-sticky`]: (hasFixLeft || hasFixRight) && isSticky,
    },
    additionalProps.className,
    cellClassName
  );

  const finalProps: React.HTMLAttributes<HTMLElement> & {
    colSpan?: number | null;
    rowSpan?: number | null;
    ref?: React.Ref<HTMLElement>;
  } = {
    ...restCellProps,
    ...additionalProps,
    title,
    colSpan: finalColSpan && finalColSpan !== 1 ? finalColSpan : null,
    rowSpan: finalRowSpan && finalRowSpan !== 1 ? finalRowSpan : null,
    className: cellClassNames,
    style: {
      ...additionalProps.style,
      ...alignStyle,
      ...fixedStyle,
      ...cellStyle,
    },
    ref: typeof Component === 'string' || supportRef(Component) ? ref : null,
  };

  return React.createElement(Component, finalProps, appendNode, cellContent);
}

function isRenderedCell(value: any): value is RenderedCell<any> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !React.isValidElement(value)
  );
}

function isValidCellContent(content: any): boolean {
  return !(
    typeof content === 'object' &&
    !Array.isArray(content) &&
    !React.isValidElement(content)
  );
}

const CellWithRef = React.forwardRef(CellComponent);
CellWithRef.displayName = 'Cell';

const MemoizedCell = React.memo(CellWithRef, (prevProps, nextProps) => {
  return !!nextProps.shouldCellUpdate && !nextProps.shouldCellUpdate(nextProps.record, prevProps.record);
});

export default MemoizedCell;