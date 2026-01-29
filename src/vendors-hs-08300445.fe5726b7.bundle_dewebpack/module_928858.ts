import * as React from 'react';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export default function TableRow(props: TableRowProps): React.ReactElement {
  return React.createElement('tr', props);
}