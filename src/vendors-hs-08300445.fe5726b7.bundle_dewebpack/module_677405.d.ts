/**
 * Module: module_677405
 * Original ID: 677405
 * Motion configuration utility for menu components
 */

/**
 * Motion configuration options
 */
export interface MotionConfig {
  /** CSS class prefix for the component */
  prefixCls: string;
  /** Custom motion configuration */
  motion?: MotionObject | null;
  /** Default motion configurations for different modes */
  defaultMotions?: DefaultMotions;
  /** Legacy: Animation name (deprecated) */
  openAnimation?: string | object;
  /** Legacy: Transition class name */
  openTransitionName?: string;
}

/**
 * Motion object defining animation behavior
 */
export interface MotionObject {
  /** CSS class name for the motion/transition */
  motionName: string;
}

/**
 * Default motion configurations by mode
 */
export interface DefaultMotions {
  /** Motion for inline mode */
  inline?: MotionObject;
  /** Motion for horizontal mode */
  horizontal?: MotionObject;
  /** Motion for vertical mode */
  vertical?: MotionObject;
  /** Fallback motion for other modes */
  other?: MotionObject;
  [key: string]: MotionObject | undefined;
}

/**
 * Menu state information
 */
export interface MenuState {
  /** Whether the menu is switching from inline mode */
  switchingModeFromInline?: boolean;
}

/**
 * Menu mode type
 */
export type MenuMode = 'inline' | 'horizontal' | 'vertical' | string;

/**
 * Get motion configuration for menu based on current mode and settings
 * 
 * @param config - Motion configuration options
 * @param state - Current menu state
 * @param mode - Current menu mode (e.g., 'inline', 'horizontal', 'vertical')
 * @returns Motion object with animation settings, or null if switching from inline mode
 */
export function getMotion(
  config: MotionConfig,
  state: MenuState,
  mode: MenuMode
): MotionObject | null;