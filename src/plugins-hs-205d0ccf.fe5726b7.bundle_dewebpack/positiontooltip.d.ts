/**
 * Position tooltip component props
 */
export interface PositionTooltipProps {
  /**
   * Target element's bounding rectangle for positioning the tooltip
   */
  targetRect?: DOMRect | {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  /**
   * Tooltip content to be rendered
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name for the tooltip wrapper
   */
  className?: string;

  /**
   * Additional CSS class name for the arrow element
   */
  arrowClassName?: string;

  /**
   * Whether to hide the arrow indicator
   * @default false
   */
  hideArrow?: boolean;

  /**
   * Controls the visibility state of the tooltip
   */
  visible: boolean;

  /**
   * Callback invoked when the tooltip close transition completes
   */
  onClosed?: () => void;

  /**
   * Width of the arrow indicator in pixels
   * @default 22
   */
  arrowWidth?: number;

  /**
   * Duration of the show/hide transition in milliseconds
   * @default 400
   */
  transitionDuration?: number;
}

/**
 * Internal positioning state
 */
interface TooltipPosition {
  /**
   * Left offset in pixels
   */
  left: number;

  /**
   * Top offset in pixels
   */
  top: number;

  /**
   * Arrow left offset relative to tooltip
   */
  arrowLeft: number;
}

/**
 * Computed styles for wrapper and arrow
 */
interface ComputedStyles {
  wrapperStyle?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
}

/**
 * A positioned tooltip component that automatically adjusts its position
 * relative to a target element. Includes smooth transitions and an optional arrow.
 * 
 * @param props - Component properties
 * @returns Positioned tooltip React element
 */
export declare function PositionTooltip(props: PositionTooltipProps): React.ReactElement;