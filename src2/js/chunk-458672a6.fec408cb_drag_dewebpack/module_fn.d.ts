/**
 * Windoor item rendering function
 * Renders a windoor (window/door) component with image, checkbox, and action buttons
 */

/**
 * Windoor data model
 */
interface WindoorItem {
  /** Windoor identifier */
  id: string | number;
  /** Display name of the windoor */
  name?: string;
  /** URL to the windoor image */
  pic_url: string;
  /** Whether this is the default windoor */
  is_default?: boolean;
  /** Hover state */
  hover?: boolean;
}

/**
 * Component context interface
 */
interface WindoorComponentContext {
  /** Whether windoor selection mode is active */
  choosewindoor: boolean;
  /** Currently selected windoor(s) */
  windoorselected: WindoorItem | WindoorItem[];
  /** Whether single selection mode is enabled */
  singleChoose: boolean;
  /** Whether user has superman (admin) privileges */
  superman: boolean;
  /** Whether screen size is small (mobile) */
  is_small_screen: boolean;
  /** OSS (Object Storage Service) zip parameter */
  OSS_ZIP: string;
  
  /** Vue translation function */
  $t(key: string): string;
  /** Vue text node renderer */
  _v(text: string): VNode;
  /** Vue string converter */
  _s(value: unknown): string;
  /** Vue empty node renderer */
  _e(): VNode;
  
  /** Navigate to windoor type editor */
  toWindoorType(item: WindoorItem): void;
  /** Prepare windoor for deletion */
  deleteReady(item: WindoorItem, type: string): void;
}

/**
 * Vue VNode type
 */
interface VNode {
  tag?: string;
  data?: Record<string, unknown>;
  children?: VNode[];
  text?: string;
}

/**
 * Vue render function type
 */
type CreateElement = (
  tag: string,
  data?: Record<string, unknown>,
  children?: VNode[]
) => VNode;

/**
 * Renders a windoor item component
 * @param context - Component instance context (this)
 * @param createElement - Vue createElement function (h)
 * @param windoorItem - The windoor data to render
 * @returns VNode representing the windoor component
 */
declare function renderWindoorItem(
  this: WindoorComponentContext,
  createElement: CreateElement,
  windoorItem: WindoorItem
): VNode;

/**
 * Determines if hover actions should be displayed
 * @param windoorItem - The windoor item
 * @param context - Component context
 * @returns true if hover tips should be shown
 */
declare function shouldShowHoverTips(
  windoorItem: WindoorItem,
  context: WindoorComponentContext
): boolean;

/**
 * Image configuration for windoor display
 */
interface WindoorImageConfig {
  /** Image source URL with cache-busting parameter */
  src: string;
  /** Whether to contain the image within bounds */
  contain: boolean;
  /** Image height in pixels */
  height: string;
  /** Image width in pixels */
  width: string;
}

/**
 * Checkbox model configuration
 */
interface CheckboxModel {
  /** Current value binding */
  value: WindoorItem | WindoorItem[];
  /** Value change callback */
  callback(newValue: WindoorItem | WindoorItem[]): void;
  /** Expression string for debugging */
  expression: string;
}