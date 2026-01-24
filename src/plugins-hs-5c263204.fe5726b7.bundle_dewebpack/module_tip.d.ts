/**
 * Tip module configuration
 * @module module_tip
 * @originalId tip
 */

/**
 * Position offset configuration for tooltip target
 */
interface TargetDiff {
  /** Left offset in pixels */
  left: number;
  /** Right offset in pixels */
  right: number;
  /** Top offset in pixels */
  top: number;
  /** Bottom offset in pixels */
  bottom: number;
}

/**
 * Tooltip information configuration
 */
interface TooltipInfo {
  /** Tooltip title text content */
  title: string;
}

/**
 * Tooltip placement position
 */
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip type
 */
type TooltipType = 'tooltip' | 'popover';

/**
 * Tip module configuration object
 */
interface TipModuleConfig {
  /** CSS selector for the tooltip target element */
  target: string;
  /** Position offset adjustments for the tooltip target */
  targetDiff: TargetDiff;
  /** Whether clicking on the target is enabled */
  targetEnableClick: boolean;
  /** Whether to listen for target element changes */
  listenTargetChange: boolean;
  /** Type of tooltip component */
  type: TooltipType;
  /** Placement position of the tooltip relative to target */
  tooltipPlacement: TooltipPlacement;
  /** Tooltip content configuration */
  tooltipInfo: TooltipInfo;
}

/**
 * Creates and returns the tip module configuration
 * @returns Tip module configuration object
 */
declare function createTipConfig(): TipModuleConfig;