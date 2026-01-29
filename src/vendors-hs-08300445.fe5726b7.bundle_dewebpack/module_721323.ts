import React from 'react';

interface ColumnDefine {
  [key: string]: unknown;
}

interface Column {
  [INTERNAL_COL_DEFINE]?: ColumnDefine;
}

interface ColGroupProps {
  colWidths: (string | number | undefined)[];
  columns: Column[];
  columCount?: number;
}

const INTERNAL_COL_DEFINE = Symbol('INTERNAL_COL_DEFINE');

export default function ColGroup(props: ColGroupProps): React.ReactElement {
  const { colWidths, columns, columCount } = props;
  const colElements: React.ReactElement[] = [];
  let hasContent = false;
  const totalColumns = (columCount ?? columns.length) - 1;

  for (let index = totalColumns; index >= 0; index -= 1) {
    const colWidth = colWidths[index];
    const column = columns?.[index];
    const columnDefine = column?.[INTERNAL_COL_DEFINE];

    if (colWidth || columnDefine || hasContent) {
      colElements.unshift(
        React.createElement('col', {
          key: index,
          style: {
            width: colWidth,
            minWidth: colWidth,
          },
          ...columnDefine,
        })
      );
      hasContent = true;
    }
  }

  return React.createElement('colgroup', null, colElements);
}