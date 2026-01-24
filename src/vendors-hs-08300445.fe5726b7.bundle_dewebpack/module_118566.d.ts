/**
 * Tooltip content component props interface
 */
interface TooltipContentProps {
  /** Whether to show the arrow pointing to the trigger element */
  showArrow?: boolean;
  /** Custom content to render inside the arrow element */
  arrowContent?: React.ReactNode;
  /** The main content to display in the tooltip */
  children: React.ReactNode | (() => React.ReactNode);
  /** CSS class prefix for BEM-style naming */
  prefixCls: string;
  /** Unique identifier for the tooltip inner element */
  id?: string;
  /** Inline styles for the tooltip inner container */
  overlayInnerStyle?: React.CSSProperties;
  /** Additional CSS class name for the content wrapper */
  className?: string;
  /** Inline styles for the content wrapper */
  style?: React.CSSProperties;
}

/**
 * Renders the content of a tooltip with optional arrow indicator.
 * 
 * @param props - Component properties
 * @returns A React element representing the tooltip content structure
 * 
 * @example
 *