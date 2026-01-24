import { VNode } from 'vue';
import { ComponentOptions } from 'vue/types/options';

/**
 * VMain component - Main content container that handles application layout padding
 * Automatically adjusts padding based on Vuetify's application layout system (app bars, navigation drawers, footers, etc.)
 */
declare const VMain: ComponentOptions<Vue>;

export default VMain;

/**
 * VMain component interface
 */
export interface VMainComponent extends Vue {
  /**
   * HTML tag to render as the main container
   * @default 'main'
   */
  tag: string;

  /**
   * Computed styles for the main content area
   * Dynamically calculates padding based on application layout elements
   */
  readonly styles: VMainStyles;

  /**
   * Render function that creates the main content wrapper
   * @param createElement - Vue's render function
   * @returns Virtual DOM node
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * Props for VMain component
 */
export interface VMainProps {
  /**
   * HTML tag name for the root element
   * @default 'main'
   */
  tag?: string;
}

/**
 * Computed style object for VMain
 * Contains padding values calculated from Vuetify application layout
 */
export interface VMainStyles {
  /**
   * Top padding (includes app bar and system bar heights)
   */
  paddingTop: string;

  /**
   * Right padding (includes right drawer width)
   */
  paddingRight: string;

  /**
   * Bottom padding (includes footer and bottom navigation heights)
   */
  paddingBottom: string;

  /**
   * Left padding (includes left drawer width)
   */
  paddingLeft: string;
}

/**
 * Vuetify application layout system interface
 * Used to calculate spacing for main content area
 */
export interface VuetifyApplication {
  /**
   * Top offset (app bar height)
   */
  top: number;

  /**
   * System bar height
   */
  bar: number;

  /**
   * Right offset (right drawer width)
   */
  right: number;

  /**
   * Footer height
   */
  footer: number;

  /**
   * Inset footer height
   */
  insetFooter: number;

  /**
   * Bottom navigation height
   */
  bottom: number;

  /**
   * Left offset (left drawer width)
   */
  left: number;
}