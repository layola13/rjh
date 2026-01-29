import { useTheme } from './theme-hook';
import { Pagination, PaginationProps } from './pagination-component';
import React from 'react';

export { PaginationProps };

export default function TeachingPagination(props: PaginationProps): React.ReactElement {
  const theme = useTheme();
  
  return React.createElement(Pagination, {
    className: `teaching-pagination ${theme}`,
    simple: true,
    size: "small",
    ...props
  });
}