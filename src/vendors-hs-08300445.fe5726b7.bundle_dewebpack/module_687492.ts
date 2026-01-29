import React, { useContext, ReactNode } from 'react';
import CellComponent from './CellComponent';
import TableContext from './TableContext';

interface CellProps {
  className?: string;
  index: number;
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
}

interface TableContextValue {
  prefixCls: string;
  fixedInfoList: Array<FixedInfo>;
}

interface FixedInfo {
  fixLeft?: number | boolean;
  fixRight?: number | boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  isSticky?: boolean;
}

interface CellRenderResult {
  children: ReactNode;
  props: {
    colSpan?: number;
    rowSpan?: number;
  };
}

export default function Cell(props: CellProps): JSX.Element {
  const { className, index, children, colSpan, rowSpan, align } = props;
  
  const tableContext = useContext<TableContextValue>(TableContext);
  const { prefixCls, fixedInfoList } = tableContext;
  const fixedInfo = fixedInfoList[index];

  return (
    <CellComponent
      className={className}
      index={index}
      component="td"
      prefixCls={prefixCls}
      record={null}
      dataIndex={null}
      align={align}
      render={(): CellRenderResult => ({
        children,
        props: {
          colSpan,
          rowSpan
        }
      })}
      {...fixedInfo}
    />
  );
}