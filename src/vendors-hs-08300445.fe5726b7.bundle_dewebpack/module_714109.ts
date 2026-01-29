import React, { useContext, useState, useEffect, Fragment, CSSProperties, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { getColumnsKey } from './utils';
import TableContext from './TableContext';
import BodyContext from './BodyContext';
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

interface Column {
  render?: (value: any, record: any, index: number) => React.ReactNode;
  dataIndex?: string | string[];
  className?: string;
  ellipsis?: boolean;
  align?: 'left' | 'right' | 'center';
  shouldCellUpdate?: (record: any, prevRecord: any) => boolean;
  onCell?: (record: any, index: number) => HTMLAttributes<HTMLElement>;
}

interface FixedInfo {
  fixLeft?: number | boolean;
  fixRight?: number | boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
}

interface BodyRowProps {
  className?: string;
  style?: CSSProperties;
  record: any;
  index: number;
  rowKey: string;
  recordKey: string;
  getRowKey: (record: any, index: number) => string;
  rowExpandable?: (record: any) => boolean;
  expandedKeys?: Set<string>;
  onRow?: (record: any, index: number) => HTMLAttributes<HTMLElement>;
  indent?: number;
  rowComponent: React.ComponentType<any>;
  cellComponent: React.ComponentType<any>;
  childrenColumnName: string;
}

interface TableContextValue {
  prefixCls: string;
  fixedInfoList: FixedInfo[];
}

interface BodyContextValue {
  fixHeader: boolean;
  fixColumn: boolean;
  horizonScroll: boolean;
  componentWidth: number;
  flattenColumns: Column[];
  expandableType: 'row' | 'nest' | false;
  expandRowByClick: boolean;
  onTriggerExpand: (record: any, event: React.MouseEvent) => void;
  rowClassName?: string | ((record: any, index: number, indent: number) => string);
  expandedRowClassName?: string | ((record: any, index: number, indent: number) => string);
  indentSize: number;
  expandIcon: (props: ExpandIconProps) => React.ReactNode;
  expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => React.ReactNode;
  expandIconColumnIndex?: number;
}

interface ExpandIconProps {
  prefixCls: string;
  expanded: boolean;
  expandable: boolean;
  record: any;
  onExpand: (record: any, event: React.MouseEvent) => void;
}

function BodyRow(props: BodyRowProps): JSX.Element {
  const {
    className,
    style,
    record,
    index,
    rowKey,
    getRowKey,
    rowExpandable,
    expandedKeys,
    onRow,
    indent = 0,
    rowComponent: RowComponent,
    cellComponent: CellComponent,
    childrenColumnName,
  } = props;

  const {
    prefixCls,
    fixedInfoList,
  } = useContext<TableContextValue>(TableContext);

  const {
    fixHeader,
    fixColumn,
    horizonScroll,
    componentWidth,
    flattenColumns,
    expandableType,
    expandRowByClick,
    onTriggerExpand,
    rowClassName,
    expandedRowClassName,
    indentSize,
    expandIcon,
    expandedRowRender,
    expandIconColumnIndex,
  } = useContext<BodyContextValue>(BodyContext);

  const [hasExpanded, setHasExpanded] = useState(false);
  const isExpanded = expandedKeys && expandedKeys.has(props.recordKey);

  useEffect(() => {
    if (isExpanded) {
      setHasExpanded(true);
    }
  }, [isExpanded]);

  const isRowExpandable = expandableType === 'row' && (!rowExpandable || rowExpandable(record));
  const isNestExpandable = expandableType === 'nest';
  const childrenData = childrenColumnName && record && record[childrenColumnName];
  const hasExpandable = isRowExpandable || isNestExpandable;

  let rowProps: HTMLAttributes<HTMLElement> | undefined;
  if (onRow) {
    rowProps = onRow(record, index);
  }

  let computedRowClassName: string | undefined;
  if (typeof rowClassName === 'string') {
    computedRowClassName = rowClassName;
  } else if (typeof rowClassName === 'function') {
    computedRowClassName = rowClassName(record, index, indent);
  }

  const columnsKey = getColumnsKey(flattenColumns);

  const handleRowClick = (event: React.MouseEvent): void => {
    if (expandRowByClick && hasExpandable) {
      onTriggerExpand(record, event);
    }

    if (rowProps?.onClick) {
      rowProps.onClick(event);
    }
  };

  const rowElement = (
    <RowComponent
      {...rowProps}
      data-row-key={rowKey}
      className={classNames(
        className,
        `${prefixCls}-row`,
        `${prefixCls}-row-level-${indent}`,
        computedRowClassName,
        rowProps?.className
      )}
      style={{ ...style, ...rowProps?.style }}
      onClick={handleRowClick}
    >
      {flattenColumns.map((column, columnIndex) => {
        const {
          render,
          dataIndex,
          className: columnClassName,
        } = column;

        const key = columnsKey[columnIndex];
        const fixedInfo = fixedInfoList[columnIndex];

        let appendNode: React.ReactNode;
        if (columnIndex === (expandIconColumnIndex || 0) && isNestExpandable) {
          appendNode = (
            <Fragment>
              <span
                style={{ paddingLeft: `${indentSize * indent}px` }}
                className={`${prefixCls}-row-indent indent-level-${indent}`}
              />
              {expandIcon({
                prefixCls,
                expanded: isExpanded,
                expandable: childrenData,
                record,
                onExpand: onTriggerExpand,
              })}
            </Fragment>
          );
        }

        let cellProps: HTMLAttributes<HTMLElement> | undefined;
        if (column.onCell) {
          cellProps = column.onCell(record, index);
        }

        return (
          <Cell
            className={columnClassName}
            ellipsis={column.ellipsis}
            align={column.align}
            component={CellComponent}
            prefixCls={prefixCls}
            key={key}
            record={record}
            index={index}
            dataIndex={dataIndex}
            render={render}
            shouldCellUpdate={column.shouldCellUpdate}
            {...fixedInfo}
            appendNode={appendNode}
            additionalProps={cellProps}
          />
        );
      })}
    </RowComponent>
  );

  let expandedRowElement: React.ReactNode;
  if (isRowExpandable && (hasExpanded || isExpanded)) {
    const expandedContent = expandedRowRender!(record, index, indent + 1, isExpanded);
    const expandedClassName =
      expandedRowClassName &&
      (typeof expandedRowClassName === 'function'
        ? expandedRowClassName(record, index, indent)
        : expandedRowClassName);

    expandedRowElement = (
      <ExpandedRow
        expanded={isExpanded}
        className={classNames(
          `${prefixCls}-expanded-row`,
          `${prefixCls}-expanded-row-level-${indent + 1}`,
          expandedClassName
        )}
        prefixCls={prefixCls}
        fixHeader={fixHeader}
        fixColumn={fixColumn}
        horizonScroll={horizonScroll}
        component={RowComponent}
        componentWidth={componentWidth}
        cellComponent={CellComponent}
        colSpan={flattenColumns.length}
      >
        {expandedContent}
      </ExpandedRow>
    );
  }

  let nestedRows: React.ReactNode;
  if (childrenData && isExpanded) {
    nestedRows = (record[childrenColumnName] || []).map((childRecord: any, childIndex: number) => {
      const childKey = getRowKey(childRecord, childIndex);
      return (
        <BodyRow
          {...props}
          key={childKey}
          rowKey={childKey}
          record={childRecord}
          recordKey={childKey}
          index={childIndex}
          indent={indent + 1}
        />
      );
    });
  }

  return (
    <Fragment>
      {rowElement}
      {expandedRowElement}
      {nestedRows}
    </Fragment>
  );
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;