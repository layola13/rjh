/**
 * Commission bar manager class
 * Handles initialization and positioning of the commission toggle bar in the layout
 */
declare class CommissionBarManager {
  /**
   * Container element for the commission bar
   */
  private barContainer: HTMLElement | null;

  /**
   * Initialize the commission bar container and render the component
   * Creates the container if it doesn't exist and registers it with the layout manager
   */
  init(): void;

  /**
   * Handle position changes of the commission bar based on layout constraints
   * @param config - Configuration object controlling the bar's position
   */
  positionChange(config: PositionConfig): void;
}

/**
 * Configuration for commission bar positioning
 */
interface PositionConfig {
  /**
   * Whether the bar is in modal mode
   * When true, positions the bar at right: 0px
   * When false, positions the bar at right: 248px
   */
  isModal?: boolean;

  /**
   * Left position of related element (in pixels)
   * Used to calculate the right offset based on viewport width
   */
  left?: number;

  /**
   * Display mode of related element
   * "block" positions the bar at right: 248px
   * "none" positions the bar at right: 0px
   */
  display?: 'block' | 'none' | string;
}

/**
 * Default export: Instance of CommissionBarManager
 */
declare const _default: CommissionBarManager;
export default _default;