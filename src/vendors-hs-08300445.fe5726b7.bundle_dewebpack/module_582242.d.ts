/**
 * Pagination item component props
 */
export interface PaginationItemProps {
  /** Root CSS class prefix for the pagination component */
  rootPrefixCls: string;
  
  /** Page number to display */
  page: number;
  
  /** Whether this pagination item is currently active/selected */
  active: boolean;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Whether to show the page number as a title tooltip */
  showTitle?: boolean;
  
  /** Click handler called when the pagination item is clicked */
  onClick: (page: number) => void;
  
  /** Keyboard press handler for accessibility */
  onKeyPress: (event: React.KeyboardEvent, onClick: (page: number) => void, page: number) => void;
  
  /** 
   * Custom render function for pagination items
   * @param page - The page number
   * @param type - The type of element being rendered (e.g., 'page', 'prev', 'next')
   * @param element - Default React element to render
   * @returns Custom rendered element
   */
  itemRender: (page: number, type: string, element: React.ReactElement) => React.ReactNode;
}

/**
 * Renders a single pagination item (page number button)
 * 
 * @param props - Pagination item configuration
 * @returns React list item element representing a pagination page button
 */
export default function PaginationItem(props: PaginationItemProps): React.ReactElement<HTMLLIElement>;