/**
 * Pointer tooltip component for displaying contextual information near the cursor.
 * Provides a singleton API for creating and destroying tooltip instances.
 */

/**
 * Tooltip data configuration
 */
export interface PointerToolTipData {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** X coordinate of the mouse position */
  mouseX: number;
  /** Y coordinate of the mouse position */
  mouseY: number;
}

/**
 * Props for the PointerToolTip component
 */
export interface PointerToolTipProps {
  /** Tooltip configuration data */
  data: PointerToolTipData;
}

/**
 * Component state for managing tooltip display
 */
export interface PointerToolTipState {
  /** Current content to display */
  content: React.ReactNode;
  /** Current mouse X position */
  mouseX: number;
  /** Current mouse Y position */
  mouseY: number;
}

/**
 * Internal React component for rendering the tooltip
 * Handles positioning, animations, and auto-dismiss behavior
 */
declare class PointerToolTipComponent extends React.Component<
  PointerToolTipProps,
  PointerToolTipState
> {
  /** Timer for delayed tooltip creation */
  private createTimer?: NodeJS.Timeout;
  
  /** Timer for auto-dismiss functionality */
  private destroyTimer?: NodeJS.Timeout;
  
  /** Timer for animation control */
  private animationTimer?: NodeJS.Timeout;
  
  /** Horizontal offset from cursor position (pixels) */
  private readonly offsetX: number;
  
  /** Vertical offset from cursor position (pixels) */
  private readonly offsetY: number;

  /**
   * Adjusts tooltip position to keep it within viewport bounds
   * Automatically flips position if tooltip would overflow screen edges
   */
  private _changeTipPosition(): void;

  /**
   * Triggers CSS animation for tooltip appearance
   * Uses temporary class for animation then removes it after 300ms
   */
  private _showTipAnimation(): void;

  componentDidMount(): void;
  
  /**
   * Updates tooltip position and content with debouncing
   * Auto-dismisses after 5 seconds
   * @deprecated Use componentDidUpdate in new code
   */
  UNSAFE_componentWillReceiveProps(nextProps: PointerToolTipProps): void;

  render(): React.ReactElement;
}

/**
 * Singleton API for managing pointer tooltips
 * Provides static methods to create and destroy tooltip instances
 */
export default class PointerToolTip {
  /**
   * Creates and displays a tooltip at the specified position
   * If a tooltip already exists, it will be updated with new data
   * 
   * @param data - Tooltip configuration including content and position
   * 
   * @example
   *